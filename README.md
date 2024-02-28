#Google Sheet CMS

##Documentation:
https://developers.google.com/apps-script/guides/web

##How to edit script:

1. Go to sheet file
2. Extensions
3. App Script

##How to remove icons:

1. Go to sheet file
2. Clear row

##Example sheet:
Facebook,fab fa-facebook fa-2x,https://www.yourlink.com
Instagram,fab fa-instagram fa-2x,https://www.yourlink.com
X,fa-brands fa-x-twitter fa-2x,https://www.yourlink.com
LinkedIn,fab fa-linkedin fa-2x,https://www.yourlink.com
GitHub,fab fa-github fa-2x,https://www.yourlink.com

##Apps Script example:
function doGet() {
const doc = SpreadsheetApp.getActiveSpreadsheet();
const sheet = doc.getSheetByName("Social");
// range: starts at column and row 1, check over 6 rows, and check 3 columns
const values = sheet.getRange(1, 1, 6, 3).getDisplayValues();
console.log("check values",values);
const result = values.map((s) => ({
name: s[0],
icon: s[1],
link: s[2],
}));
console.log("check result",result);
return ContentService.createTextOutput(JSON.stringify({data:result})).setMimeType(ContentService.MimeType.JSON);
}
