import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

// Initialize Google Sheets API with environment variables
const getAuth = () => {
  try {
    // For Vercel deployment, credentials are stored as environment variable
    const credentials = process.env.GOOGLE_SHEETS_CREDENTIALS 
      ? JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS)
      : require('../stocksprediction-5fbb91ce5bb2.json');

    return new JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive'
      ],
    });
  } catch (error) {
    console.error('Error initializing auth:', error);
    throw new Error('Failed to initialize Google Sheets authentication');
  }
};

const sheets = google.sheets({ version: 'v4', auth: getAuth() });

// Your existing spreadsheet ID
const EXISTING_SPREADSHEET_ID = '10F2ON8N3phmbvKQNQFfKet44XoytFxA3SgUiIlHl6VY';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { method, url } = req;
    const urlParts = url.split('/');
    const endpoint = urlParts[urlParts.length - 1];

    // Route handling
    if (method === 'GET') {
      if (endpoint === 'test') {
        return res.json({ message: 'Google Sheets API server is running!' });
      }

      if (url.includes('/sheets/') && url.includes('/read')) {
        const spreadsheetId = urlParts[urlParts.length - 2] || EXISTING_SPREADSHEET_ID;
        const range = req.query.range || 'A:Z';
        
        const response = await sheets.spreadsheets.values.get({
          spreadsheetId,
          range,
        });
        
        return res.json(response.data);
      }

      if (url.includes('/sheets/') && url.includes('/info')) {
        const spreadsheetId = urlParts[urlParts.length - 2] || EXISTING_SPREADSHEET_ID;
        
        const response = await sheets.spreadsheets.get({
          spreadsheetId,
        });
        
        return res.json(response.data);
      }
    }

    if (method === 'POST') {
      if (url.includes('/sheets/') && url.includes('/write')) {
        const spreadsheetId = urlParts[urlParts.length - 2] || EXISTING_SPREADSHEET_ID;
        const { range, values } = req.body;
        
        const response = await sheets.spreadsheets.values.update({
          spreadsheetId,
          range,
          valueInputOption: 'RAW',
          requestBody: { values },
        });
        
        return res.json(response.data);
      }

      if (url.includes('/sheets/') && url.includes('/append')) {
        const spreadsheetId = urlParts[urlParts.length - 2] || EXISTING_SPREADSHEET_ID;
        const { range, values } = req.body;
        
        const response = await sheets.spreadsheets.values.append({
          spreadsheetId,
          range,
          valueInputOption: 'RAW',
          requestBody: { values },
        });
        
        return res.json(response.data);
      }
    }

    if (method === 'DELETE') {
      if (url.includes('/sheets/') && url.includes('/clear')) {
        const spreadsheetId = urlParts[urlParts.length - 2] || EXISTING_SPREADSHEET_ID;
        const range = req.query.range || 'A:Z';
        
        const response = await sheets.spreadsheets.values.clear({
          spreadsheetId,
          range,
        });
        
        return res.json(response.data);
      }
    }

    res.status(404).json({ error: 'Endpoint not found' });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: error.message });
  }
} 