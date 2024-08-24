// api/getSheetData.js
const { google } = require('googleapis');

const sheets = google.sheets('v4');

exports.handler = async (req, res) => {
    try {
        const apiKey = process.env.GOOGLE_API_KEY;  // Use environment variables for sensitive data
        const sheetId = process.env.GOOGLE_SHEET_ID;  // Use environment variables for sensitive data
        const range = 'Sheet1';  // Adjust range as needed

        const auth = new google.auth.APIKey(apiKey);

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: sheetId,
            range: range,
            key: apiKey,
            auth: auth
        });

        const rows = response.data.values;
        res.status(200).json({ rows });
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
};

