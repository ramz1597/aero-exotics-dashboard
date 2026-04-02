import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Car,
  Plane,
  Ship,
  ChevronLeft,
  ChevronRight,
  Check,
  Clock,
  User,
} from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const STEPS = ["Category", "Vehicle", "Package", "Add-Ons", "Schedule", "Contact"];

const CATEGORIES = [
  { id: "automotive", label: "Automotive", icon: Car, available: true },
  { id: "aircraft", label: "Aircraft", icon: Plane, available: false },
  { id: "watercraft", label: "Watercraft", icon: Ship, available: false },
];

const VEHICLE_SIZES = [
  { id: "small", label: "Compact / Coupe", desc: "2-door coupes, compact cars" },
  { id: "medium", label: "Sedan / Sports Car", desc: "4-door sedans, sports cars" },
  { id: "large", label: "SUV / Truck", desc: "Full-size SUVs, trucks, vans" },
  { id: "exotic", label: "Exotic / Supercar", desc: "Lamborghini, Ferrari, McLaren, etc." },
];

const PACKAGES = [
  { id: "founders-detail", name: "Founders Detail", price: "$100 (Limited Time)", popular: true, features: ["Double vacuum & trash removal", "Dash, console & plastic wipe down", "Floor mat clean, door jam wipe down", "Basic exterior wash + air freshener"] },
  { id: "black-label", name: "Black Label Detail", price: "Starting at $200", premium: true, features: ["Everything in Founders Detail", "Full interior detail (shampoo, steam, leather)", "Full exterior detail + wax sealant", "Door jams & trim dressed"] },
];

const ADD_ONS = [
  { id: "pet-hair", label: "Pet Hair Removal", price: "$50" },
  { id: "stain-extraction", label: "Heavy Stain Extraction", price: "$50+" },
  { id: "wax-sealant", label: "Exterior Wax Sealant", price: "$50 - $75" },
  { id: "leather-shampoo", label: "Leather & Carpet Shampoo + Conditioner", price: "$75" },
  { id: "ceramic-coating", label: "Ceramic Coating (1yr & 5yr options)", price: "Starting $200" },
];

const TIME_SLOTS = [
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
];

export default function BookingWizard({ open, onOpenChange }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    category: "",
    vehicle_type: "",
    vehicle_size: "",
    package_name: "",
    add_ons: [],
    preferred_date: null,
    preferred_time: "",
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);

  const update = (key, val) => setData((prev) => ({ ...prev, [key]: val }));
  const toggleAddon = (id) => {
    setData((prev) => ({
      ...prev,
      add_ons: prev.add_ons.includes(id)
        ? prev.add_ons.filter((a) => a !== id)
        : [...prev.add_ons, id],
    }));
  };

  const canNext = () => {
    switch (step) {
      case 0: return !!data.category;
      case 1: return !!data.vehicle_size;
      case 2: return !!data.package_name;
      case 3: return true;
      case 4: return !!data.preferred_date && !!data.preferred_time;
      case 5: return !!data.name && !!data.email && !!data.phone;
      default: return false;
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        ...data,
        vehicle_type: VEHICLE_SIZES.find((v) => v.id === data.vehicle_size)?.label || data.vehicle_size,
        preferred_date: data.preferred_date ? data.preferred_date.toISOString().split("T")[0] : "",
        add_ons: data.add_ons.map((id) => ADD_ONS.find((a) => a.id === id)?.label || id),
      };
      await axios.post(`${API}/bookings`, payload);
      toast.success("Booking submitted! We'll confirm your appointment shortly.");
      onOpenChange(false);
      setStep(0);
      setData({
        category: "", vehicle_type: "", vehicle_size: "", package_name: "",
        add_ons: [], preferred_date: null, preferred_time: "",
        name: "", email: "", phone: "", notes: "",
      });
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  const handleClose = () => {
    onOpenChange(false);
    setStep(0);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        data-testid="booking-wizard"
        className="bg-[#111111] border-white/10 text-white max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle className="font-heading text-xl font-bold text-white">Book Your Detail</DialogTitle>
          <DialogDescription className="text-gray-400">
            Step {step + 1} of {STEPS.length}: {STEPS[step]}
          </DialogDescription>
        </DialogHeader>

        {/* Step Indicators */}
        <div className="flex items-center gap-1 mb-6">
          {STEPS.map((s, i) => (
            <div key={i} className="flex-1 flex items-center">
              <div
                className={`h-1 w-full rounded-full transition-colors ${
                  i <= step ? "bg-[#D92323]" : "bg-white/10"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="min-h-[300px]">
          {/* Step 0: Category */}
          {step === 0 && (
            <div className="space-y-4">
              <p className="text-sm text-gray-400 mb-4">Select your vehicle category:</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      data-testid={`category-${cat.id}`}
                      disabled={!cat.available}
                      onClick={() => update("category", cat.id)}
                      className={`relative p-6 rounded-xl border text-center transition-all ${
                        data.category === cat.id
                          ? "border-[#D92323] bg-[#D92323]/10"
                          : cat.available
                          ? "border-white/10 bg-white/5 hover:border-white/20"
                          : "border-white/5 bg-white/5 opacity-50 cursor-not-allowed"
                      }`}
                    >
                      <Icon size={28} className="mx-auto mb-3 text-white" strokeWidth={1.5} />
                      <span className="font-heading font-semibold text-sm text-white">{cat.label}</span>
                      {!cat.available && (
                        <Badge className="absolute top-2 right-2 bg-[#D92323]/20 text-[#D92323] border-0 text-[9px]">
                          Soon
                        </Badge>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 1: Vehicle Size */}
          {step === 1 && (
            <div className="space-y-3">
              <p className="text-sm text-gray-400 mb-4">Select your vehicle size:</p>
              {VEHICLE_SIZES.map((v) => (
                <button
                  key={v.id}
                  data-testid={`vehicle-${v.id}`}
                  onClick={() => update("vehicle_size", v.id)}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    data.vehicle_size === v.id
                      ? "border-[#D92323] bg-[#D92323]/10"
                      : "border-white/10 bg-white/5 hover:border-white/20"
                  }`}
                >
                  <span className="font-heading font-semibold text-sm text-white">{v.label}</span>
                  <p className="text-xs text-gray-500 mt-1">{v.desc}</p>
                </button>
              ))}
            </div>
          )}

          {/* Step 2: Package */}
          {step === 2 && (
            <div className="space-y-3">
              <p className="text-sm text-gray-400 mb-4">Choose your detailing package:</p>
              {PACKAGES.map((pkg) => (
                <button
                  key={pkg.id}
                  data-testid={`package-${pkg.id}`}
                  onClick={() => update("package_name", pkg.name)}
                  className={`w-full p-4 rounded-xl border text-left transition-all relative ${
                    data.package_name === pkg.name
                      ? "border-[#D92323] bg-[#D92323]/10"
                      : "border-white/10 bg-white/5 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-heading font-semibold text-sm text-white">{pkg.name}</span>
                    <span className="text-sm font-semibold text-white">{pkg.price}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {pkg.features.map((f, i) => (
                      <span key={i} className="text-[11px] text-gray-400 bg-white/5 px-2 py-0.5 rounded">
                        {f}
                      </span>
                    ))}
                  </div>
                  {pkg.popular && (
                    <Badge className="absolute -top-2 right-3 bg-[#D92323] text-white border-0 text-[9px]">Popular</Badge>
                  )}
                  {pkg.premium && (
                    <Badge className="absolute -top-2 right-3 bg-white text-black border-0 text-[9px]">Ultimate</Badge>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Step 3: Add-Ons */}
          {step === 3 && (
            <div className="space-y-3">
              <p className="text-sm text-gray-400 mb-4">Select any add-on services (optional):</p>
              {ADD_ONS.map((addon) => (
                <label
                  key={addon.id}
                  data-testid={`addon-${addon.id}`}
                  className={`flex items-center gap-4 w-full p-4 rounded-xl border cursor-pointer transition-all ${
                    data.add_ons.includes(addon.id)
                      ? "border-[#D92323] bg-[#D92323]/10"
                      : "border-white/10 bg-white/5 hover:border-white/20"
                  }`}
                >
                  <Checkbox
                    checked={data.add_ons.includes(addon.id)}
                    onCheckedChange={() => toggleAddon(addon.id)}
                    className="border-white/30 data-[state=checked]:bg-[#D92323] data-[state=checked]:border-[#D92323]"
                  />
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-sm text-white">{addon.label}</span>
                    <span className="text-sm text-gray-400">{addon.price}</span>
                  </div>
                </label>
              ))}
            </div>
          )}

          {/* Step 4: Schedule */}
          {step === 4 && (
            <div className="space-y-6">
              <p className="text-sm text-gray-400 mb-2">Choose your preferred date and time:</p>
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={data.preferred_date}
                    onSelect={(d) => update("preferred_date", d)}
                    disabled={(date) => date < new Date()}
                    className="rounded-lg border border-white/10 bg-black/30"
                    data-testid="booking-calendar"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Clock size={12} /> Preferred Time
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {TIME_SLOTS.map((t) => (
                      <button
                        key={t}
                        data-testid={`time-${t.replace(/[: ]/g, "-").toLowerCase()}`}
                        onClick={() => update("preferred_time", t)}
                        className={`p-2 rounded-lg text-xs font-medium transition-all ${
                          data.preferred_time === t
                            ? "bg-[#D92323] text-white"
                            : "bg-white/5 text-gray-400 hover:bg-white/10 border border-white/5"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Contact Info */}
          {step === 5 && (
            <div className="space-y-4">
              <p className="text-sm text-gray-400 mb-4 flex items-center gap-2">
                <User size={14} /> Your contact information:
              </p>
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block">Full Name *</label>
                <Input
                  data-testid="booking-name"
                  value={data.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="John Smith"
                  className="bg-black/30 border-white/10 text-white placeholder:text-gray-600 h-11"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block">Email *</label>
                  <Input
                    data-testid="booking-email"
                    type="email"
                    value={data.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="john@email.com"
                    className="bg-black/30 border-white/10 text-white placeholder:text-gray-600 h-11"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block">Phone *</label>
                  <Input
                    data-testid="booking-phone"
                    type="tel"
                    value={data.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="(555) 123-4567"
                    className="bg-black/30 border-white/10 text-white placeholder:text-gray-600 h-11"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block">Notes (optional)</label>
                <Textarea
                  data-testid="booking-notes"
                  value={data.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  placeholder="Special requests, vehicle condition details, location instructions..."
                  className="bg-black/30 border-white/10 text-white placeholder:text-gray-600 min-h-[80px] resize-none"
                />
              </div>

              {/* Summary */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-3">Booking Summary</h4>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between"><span className="text-gray-400">Category:</span><span className="text-white capitalize">{data.category}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Vehicle:</span><span className="text-white">{VEHICLE_SIZES.find((v) => v.id === data.vehicle_size)?.label}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Package:</span><span className="text-white">{data.package_name}</span></div>
                  {data.add_ons.length > 0 && (
                    <div className="flex justify-between"><span className="text-gray-400">Add-Ons:</span><span className="text-white">{data.add_ons.length} selected</span></div>
                  )}
                  <div className="flex justify-between"><span className="text-gray-400">Date:</span><span className="text-white">{data.preferred_date?.toLocaleDateString()}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Time:</span><span className="text-white">{data.preferred_time}</span></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
          <Button
            data-testid="booking-back-btn"
            variant="ghost"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="text-gray-400 hover:text-white"
          >
            <ChevronLeft size={16} className="mr-1" /> Back
          </Button>

          {step < STEPS.length - 1 ? (
            <Button
              data-testid="booking-next-btn"
              onClick={() => setStep((s) => s + 1)}
              disabled={!canNext()}
              className="bg-white text-black hover:bg-gray-200 font-heading font-semibold"
            >
              Next <ChevronRight size={16} className="ml-1" />
            </Button>
          ) : (
            <Button
              data-testid="booking-submit-btn"
              onClick={handleSubmit}
              disabled={!canNext() || loading}
              className="bg-[#D92323] text-white hover:bg-[#b91c1c] font-heading font-semibold"
            >
              <Check size={16} className="mr-1" />
              {loading ? "Submitting..." : "Confirm Booking"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
