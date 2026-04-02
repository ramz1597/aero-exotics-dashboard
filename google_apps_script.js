// ============================================
// AEROEXOTIC BOOKING INTEGRATION
// Paste this into Google Apps Script (Extensions > Apps Script)
// Deploy as Web App: Execute as Me, Anyone can access
// ============================================

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet();
    
    // Setup sheets if they don't exist
    var bookingsSheet = sheet.getSheetByName("Bookings") || createBookingsSheet(sheet);
    var availabilitySheet = sheet.getSheetByName("Availability") || createAvailabilitySheet(sheet);
    var settingsSheet = sheet.getSheetByName("Settings") || createSettingsSheet(sheet);
    
    var data = JSON.parse(e.postData.contents);
    
    if (data.action === "get_availability") {
      return getAvailability(availabilitySheet, settingsSheet);
    }
    
    if (data.action === "book") {
      return addBooking(bookingsSheet, availabilitySheet, data);
    }
    
    return ContentService.createTextOutput(JSON.stringify({success: false, error: "Unknown action"}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: err.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var availabilitySheet = sheet.getSheetByName("Availability") || createAvailabilitySheet(sheet);
  var settingsSheet = sheet.getSheetByName("Settings") || createSettingsSheet(sheet);
  return getAvailability(availabilitySheet, settingsSheet);
}

function addBooking(bookingsSheet, availabilitySheet, data) {
  var timestamp = new Date().toISOString();
  var row = [
    timestamp,
    data.name || "",
    data.phone || "",
    data.email || "",
    data.service_type || "",
    data.vehicle_type || "",
    data.year_make_model || "",
    data.preferred_date || "",
    data.preferred_time || "",
    data.add_ons || "",
    data.zip_code || "",
    data.notes || "",
    data.source || "Website",
    "New"
  ];
  
  bookingsSheet.appendRow(row);
  
  // Update availability - mark slot as booked
  if (data.preferred_date && data.preferred_time) {
    var avData = availabilitySheet.getDataRange().getValues();
    for (var i = 1; i < avData.length; i++) {
      var rowDate = Utilities.formatDate(new Date(avData[i][0]), Session.getScriptTimeZone(), "yyyy-MM-dd");
      if (rowDate === data.preferred_date && avData[i][2] === data.preferred_time && avData[i][3] === "available") {
        availabilitySheet.getRange(i + 1, 4).setValue("booked");
        availabilitySheet.getRange(i + 1, 5).setValue(data.name);
        availabilitySheet.getRange(i + 1, 6).setValue(data.phone);
        availabilitySheet.getRange(i + 1, 7).setValue(data.service_type);
        availabilitySheet.getRange(i + 1, 8).setValue(data.year_make_model);
        break;
      }
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify({success: true, message: "Booking added"}))
    .setMimeType(ContentService.MimeType.JSON);
}

function getAvailability(availabilitySheet, settingsSheet) {
  var data = availabilitySheet.getDataRange().getValues();
  var available = [];
  var today = new Date();
  today.setHours(0,0,0,0);
  
  for (var i = 1; i < data.length; i++) {
    var slotDate = new Date(data[i][0]);
    if (slotDate >= today && data[i][3] === "available") {
      available.push({
        date: Utilities.formatDate(slotDate, Session.getScriptTimeZone(), "yyyy-MM-dd"),
        day: data[i][1],
        time: data[i][2],
        status: data[i][3]
      });
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify({success: true, slots: available}))
    .setMimeType(ContentService.MimeType.JSON);
}

function createBookingsSheet(spreadsheet) {
  var sheet = spreadsheet.insertSheet("Bookings");
  sheet.appendRow([
    "Timestamp", "Name", "Phone", "Email", "Service", 
    "Vehicle Type", "Year/Make/Model", "Preferred Date", "Preferred Time",
    "Add-Ons", "ZIP Code", "Notes", "Source", "Status"
  ]);
  sheet.getRange(1, 1, 1, 14).setFontWeight("bold").setBackground("#111111").setFontColor("#ffffff");
  sheet.setFrozenRows(1);
  return sheet;
}

function createAvailabilitySheet(spreadsheet) {
  var sheet = spreadsheet.insertSheet("Availability");
  sheet.appendRow(["Date", "Day", "Time Slot", "Status", "Booked By (Name)", "Booked By (Phone)", "Service", "Vehicle"]);
  sheet.getRange(1, 1, 1, 8).setFontWeight("bold").setBackground("#111111").setFontColor("#ffffff");
  sheet.setFrozenRows(1);
  
  // Pre-populate next 30 days of availability
  var times = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var today = new Date();
  
  for (var d = 0; d < 30; d++) {
    var date = new Date(today);
    date.setDate(today.getDate() + d);
    var dayName = days[date.getDay()];
    
    // Skip Sundays
    if (date.getDay() === 0) continue;
    
    for (var t = 0; t < times.length; t++) {
      sheet.appendRow([date, dayName, times[t], "available", "", "", "", ""]);
    }
  }
  
  return sheet;
}

function createSettingsSheet(spreadsheet) {
  var sheet = spreadsheet.insertSheet("Settings");
  sheet.appendRow(["Setting", "Value"]);
  sheet.appendRow(["Service Area", "Spokane, WA"]);
  sheet.appendRow(["Max Bookings Per Day", "3"]);
  sheet.appendRow(["Operating Days", "Mon-Sat"]);
  sheet.appendRow(["Operating Hours Start", "8:00 AM"]);
  sheet.appendRow(["Operating Hours End", "5:00 PM"]);
  sheet.getRange(1, 1, 1, 2).setFontWeight("bold").setBackground("#111111").setFontColor("#ffffff");
  sheet.setFrozenRows(1);
  return sheet;
}

// Run this once to set up all sheets
function setupSheets() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  createBookingsSheet(spreadsheet);
  createAvailabilitySheet(spreadsheet);
  createSettingsSheet(spreadsheet);
}
