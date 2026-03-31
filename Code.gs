function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("RSVPs");

    if (!sheet) {
      sheet = ss.insertSheet("RSVPs");
      sheet.appendRow([
        "Timestamp", "Guest ID", "First Name", "Last Name",
        "Email", "Attending", "# Guests", "Dietary", "Message"
      ]);
      sheet.getRange(1, 1, 1, 9).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date(),
      data.id        || "",
      data.firstName || "",
      data.lastName  || "",
      data.email     || "",
      data.attending || "",
      data.guests    || "",
      data.dietary   || "",
      data.message   || ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ result: "ok", message: "RSVP endpoint live" }))
    .setMimeType(ContentService.MimeType.JSON);
}
