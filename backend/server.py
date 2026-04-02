from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import httpx

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

# --- Models ---

class BookingCreate(BaseModel):
    category: str
    vehicle_type: str
    vehicle_size: str
    package_name: str
    add_ons: List[str] = []
    preferred_date: str
    preferred_time: str
    name: str
    email: str
    phone: str
    notes: Optional[str] = ""

class BookingResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    category: str
    vehicle_type: str
    vehicle_size: str
    package_name: str
    add_ons: List[str]
    preferred_date: str
    preferred_time: str
    name: str
    email: str
    phone: str
    notes: str
    status: str
    created_at: str

class ContactCreate(BaseModel):
    name: str
    email: str
    phone: Optional[str] = ""
    vehicle_type: Optional[str] = ""
    message: str

class ContactResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    name: str
    email: str
    phone: str
    vehicle_type: str
    message: str
    created_at: str

class NotifyCreate(BaseModel):
    email: str
    service_type: str  # "aircraft" or "watercraft"

class NotifyResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    email: str
    service_type: str
    created_at: str

class QuoteCreate(BaseModel):
    name: str
    phone: str
    zip_code: str
    service_type: str
    vehicle_type: str
    year_make_model: str
    notes: Optional[str] = ""
    source: Optional[str] = "Website Form"

class QuoteResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    name: str
    phone: str
    zip_code: str
    service_type: str
    vehicle_type: str
    year_make_model: str
    notes: str
    source: str
    status: str
    created_at: str

# --- Routes ---

GSHEET_WEBHOOK = os.environ.get("GSHEET_WEBHOOK_URL", "")

async def sync_to_sheet(payload: dict):
    """Fire-and-forget POST to Google Apps Script webhook"""
    if not GSHEET_WEBHOOK:
        return
    try:
        async with httpx.AsyncClient(timeout=15) as client:
            await client.post(GSHEET_WEBHOOK, json=payload, follow_redirects=True)
    except Exception as e:
        logger.warning(f"Google Sheet sync failed: {e}")

@api_router.get("/")
async def root():
    return {"message": "AeroExotic API"}

@api_router.get("/availability")
async def get_availability():
    """Fetch available slots from Google Sheet"""
    if not GSHEET_WEBHOOK:
        return {"success": True, "slots": [], "message": "Google Sheet not configured"}
    try:
        async with httpx.AsyncClient(timeout=15) as client:
            resp = await client.get(GSHEET_WEBHOOK, follow_redirects=True)
            return resp.json()
    except Exception as e:
        logger.warning(f"Failed to fetch availability: {e}")
        return {"success": False, "slots": []}

@api_router.post("/bookings", response_model=BookingResponse)
async def create_booking(data: BookingCreate):
    doc = {
        "id": str(uuid.uuid4()),
        "category": data.category,
        "vehicle_type": data.vehicle_type,
        "vehicle_size": data.vehicle_size,
        "package_name": data.package_name,
        "add_ons": data.add_ons,
        "preferred_date": data.preferred_date,
        "preferred_time": data.preferred_time,
        "name": data.name,
        "email": data.email,
        "phone": data.phone,
        "notes": data.notes or "",
        "status": "pending",
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.bookings.insert_one(doc)
    # Sync to Google Sheet
    await sync_to_sheet({
        "action": "book",
        "name": data.name,
        "phone": data.phone,
        "email": data.email,
        "service_type": data.package_name,
        "vehicle_type": data.vehicle_type,
        "year_make_model": data.vehicle_size,
        "preferred_date": data.preferred_date,
        "preferred_time": data.preferred_time,
        "add_ons": ", ".join(data.add_ons),
        "zip_code": "",
        "notes": data.notes or "",
        "source": "Booking Wizard"
    })
    return {k: v for k, v in doc.items() if k != "_id"}

@api_router.get("/bookings", response_model=List[BookingResponse])
async def get_bookings():
    bookings = await db.bookings.find({}, {"_id": 0}).to_list(100)
    return bookings

@api_router.post("/contact", response_model=ContactResponse)
async def create_contact(data: ContactCreate):
    doc = {
        "id": str(uuid.uuid4()),
        "name": data.name,
        "email": data.email,
        "phone": data.phone or "",
        "vehicle_type": data.vehicle_type or "",
        "message": data.message,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.contacts.insert_one(doc)
    return {k: v for k, v in doc.items() if k != "_id"}

@api_router.post("/quotes", response_model=QuoteResponse)
async def create_quote(data: QuoteCreate):
    doc = {
        "id": str(uuid.uuid4()),
        "name": data.name,
        "phone": data.phone,
        "zip_code": data.zip_code,
        "service_type": data.service_type,
        "vehicle_type": data.vehicle_type,
        "year_make_model": data.year_make_model,
        "notes": data.notes or "",
        "source": data.source or "Website Form",
        "status": "new",
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.quotes.insert_one(doc)
    # Sync to Google Sheet
    await sync_to_sheet({
        "action": "book",
        "name": data.name,
        "phone": data.phone,
        "email": "",
        "service_type": data.service_type,
        "vehicle_type": data.vehicle_type,
        "year_make_model": data.year_make_model,
        "preferred_date": "",
        "preferred_time": "",
        "add_ons": "",
        "zip_code": data.zip_code,
        "notes": data.notes or "",
        "source": "Quote Form"
    })
    return {k: v for k, v in doc.items() if k != "_id"}

@api_router.post("/notify", response_model=NotifyResponse)
async def create_notify(data: NotifyCreate):
    existing = await db.notifications.find_one(
        {"email": data.email, "service_type": data.service_type},
        {"_id": 0}
    )
    if existing:
        raise HTTPException(status_code=400, detail="Already subscribed for notifications")
    doc = {
        "id": str(uuid.uuid4()),
        "email": data.email,
        "service_type": data.service_type,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.notifications.insert_one(doc)
    return {k: v for k, v in doc.items() if k != "_id"}

@api_router.get("/testimonials")
async def get_testimonials():
    return [
        {"id": "1", "name": "James R.", "rating": 5, "text": "AeroExotic transformed my Porsche 911 GT3. The paint correction and ceramic coating look absolutely flawless. True white-glove service.", "vehicle": "Porsche 911 GT3", "category": "automotive"},
        {"id": "2", "name": "Sarah M.", "rating": 5, "text": "Had my Range Rover detailed before a big event. The interior was spotless and the exterior had a mirror finish. Highly recommend the Black Label package.", "vehicle": "Range Rover", "category": "automotive"},
        {"id": "3", "name": "David K.", "rating": 5, "text": "The convenience of mobile detailing for my McLaren is unmatched. They came to my home and delivered showroom-quality results.", "vehicle": "McLaren 720S", "category": "automotive"},
        {"id": "4", "name": "Michael T.", "rating": 5, "text": "Best detailing service in Spokane. My Mercedes AMG GT looks better than when I bought it. The attention to detail is remarkable.", "vehicle": "Mercedes AMG GT", "category": "automotive"},
        {"id": "5", "name": "Lisa C.", "rating": 5, "text": "Had the Society Signature package done on my Tesla Model X. The wax sealant has kept it looking incredible for weeks. Worth every penny.", "vehicle": "Tesla Model X", "category": "automotive"},
    ]

@api_router.get("/gallery")
async def get_gallery():
    return [
        {"id": "1", "url": "https://d2xsxph8kpxj0f.cloudfront.net/310519663449353326/5LTm2mWiJD2WntxvpmBGXZ/red_car_8b9e195a.jpeg", "alt": "Exotic red sports car detail", "category": "automotive"},
        {"id": "2", "url": "https://d2xsxph8kpxj0f.cloudfront.net/310519663449353326/5LTm2mWiJD2WntxvpmBGXZ/plane_car_b9c06900.jpeg", "alt": "Luxury car with private jet", "category": "automotive"},
        {"id": "3", "url": "https://d2xsxph8kpxj0f.cloudfront.net/310519663449353326/5LTm2mWiJD2WntxvpmBGXZ/van_plane_1861a11c.jpeg", "alt": "AeroExotic mobile detailing van", "category": "automotive"},
        {"id": "4", "url": "https://images.pexels.com/photos/14231684/pexels-photo-14231684.jpeg", "alt": "Premium automotive detailing", "category": "automotive"},
        {"id": "5", "url": "https://images.pexels.com/photos/14777212/pexels-photo-14777212.jpeg", "alt": "Luxury vehicle closeup", "category": "automotive"},
        {"id": "6", "url": "https://images.pexels.com/photos/25724429/pexels-photo-25724429.jpeg", "alt": "Private aircraft", "category": "aircraft"},
        {"id": "7", "url": "https://images.pexels.com/photos/9716320/pexels-photo-9716320.jpeg", "alt": "Luxury yacht", "category": "watercraft"},
    ]

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
