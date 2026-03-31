import requests
import sys
import json
from datetime import datetime

class AeroExoticAPITester:
    def __init__(self, base_url="https://exotic-cars-2.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/api/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                except:
                    print(f"   Response: {response.text[:200]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")
                self.failed_tests.append({
                    "test": name,
                    "expected": expected_status,
                    "actual": response.status_code,
                    "response": response.text[:200]
                })

            return success, response.json() if success and response.text else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.failed_tests.append({
                "test": name,
                "error": str(e)
            })
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        return self.run_test("Root API", "GET", "", 200)

    def test_get_testimonials(self):
        """Test getting testimonials"""
        success, response = self.run_test("Get Testimonials", "GET", "testimonials", 200)
        if success and isinstance(response, list) and len(response) > 0:
            print(f"   Found {len(response)} testimonials")
            return True
        return success

    def test_get_gallery(self):
        """Test getting gallery images"""
        success, response = self.run_test("Get Gallery", "GET", "gallery", 200)
        if success and isinstance(response, list) and len(response) > 0:
            print(f"   Found {len(response)} gallery images")
            return True
        return success

    def test_create_contact(self):
        """Test creating a contact submission"""
        test_data = {
            "name": f"Test User {datetime.now().strftime('%H%M%S')}",
            "email": f"test{datetime.now().strftime('%H%M%S')}@example.com",
            "phone": "(555) 123-4567",
            "vehicle_type": "sedan",
            "message": "This is a test contact message for API testing."
        }
        success, response = self.run_test("Create Contact", "POST", "contact", 200, test_data)
        if success and response.get('id'):
            print(f"   Created contact with ID: {response.get('id')}")
            return True
        return success

    def test_create_booking(self):
        """Test creating a booking"""
        test_data = {
            "category": "automotive",
            "vehicle_type": "Sedan / Sports Car",
            "vehicle_size": "medium",
            "package_name": "Society Signature",
            "add_ons": ["Pet Hair Removal", "Ceramic Coating"],
            "preferred_date": "2024-12-25",
            "preferred_time": "10:00 AM",
            "name": f"Test Booking {datetime.now().strftime('%H%M%S')}",
            "email": f"booking{datetime.now().strftime('%H%M%S')}@example.com",
            "phone": "(555) 987-6543",
            "notes": "Test booking for API validation"
        }
        success, response = self.run_test("Create Booking", "POST", "bookings", 200, test_data)
        if success and response.get('id'):
            print(f"   Created booking with ID: {response.get('id')}")
            return True
        return success

    def test_get_bookings(self):
        """Test getting bookings"""
        return self.run_test("Get Bookings", "GET", "bookings", 200)

    def test_create_notify_aircraft(self):
        """Test creating aircraft notification"""
        test_data = {
            "email": f"aircraft{datetime.now().strftime('%H%M%S')}@example.com",
            "service_type": "aircraft"
        }
        success, response = self.run_test("Create Aircraft Notification", "POST", "notify", 200, test_data)
        if success and response.get('id'):
            print(f"   Created notification with ID: {response.get('id')}")
            return True
        return success

    def test_create_notify_watercraft(self):
        """Test creating watercraft notification"""
        test_data = {
            "email": f"watercraft{datetime.now().strftime('%H%M%S')}@example.com",
            "service_type": "watercraft"
        }
        success, response = self.run_test("Create Watercraft Notification", "POST", "notify", 200, test_data)
        if success and response.get('id'):
            print(f"   Created notification with ID: {response.get('id')}")
            return True
        return success

    def test_duplicate_notify(self):
        """Test duplicate notification (should return 400)"""
        email = f"duplicate{datetime.now().strftime('%H%M%S')}@example.com"
        test_data = {
            "email": email,
            "service_type": "aircraft"
        }
        # First submission should succeed
        success1, _ = self.run_test("First Notification", "POST", "notify", 200, test_data)
        if not success1:
            return False
        
        # Second submission should fail with 400
        success2, _ = self.run_test("Duplicate Notification (should fail)", "POST", "notify", 400, test_data)
        return success2

def main():
    print("🚀 Starting AeroExotic API Testing...")
    print("=" * 50)
    
    tester = AeroExoticAPITester()
    
    # Run all tests
    tests = [
        tester.test_root_endpoint,
        tester.test_get_testimonials,
        tester.test_get_gallery,
        tester.test_create_contact,
        tester.test_create_booking,
        tester.test_get_bookings,
        tester.test_create_notify_aircraft,
        tester.test_create_notify_watercraft,
        tester.test_duplicate_notify,
    ]
    
    for test in tests:
        try:
            test()
        except Exception as e:
            print(f"❌ Test {test.__name__} failed with exception: {str(e)}")
            tester.failed_tests.append({
                "test": test.__name__,
                "error": str(e)
            })

    # Print results
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} passed")
    
    if tester.failed_tests:
        print("\n❌ Failed Tests:")
        for failure in tester.failed_tests:
            print(f"   - {failure.get('test', 'Unknown')}: {failure.get('error', failure.get('response', 'Unknown error'))}")
    
    success_rate = (tester.tests_passed / tester.tests_run * 100) if tester.tests_run > 0 else 0
    print(f"📈 Success Rate: {success_rate:.1f}%")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())