// Simple Node.js server for Google Sheets API
// Run with: node server.js

import express from 'express';
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Google Sheets API
const auth = new JWT({
  keyFile: './stocksprediction-5fbb91ce5bb2.json',
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive'
  ],
});

const sheets = google.sheets({ version: 'v4', auth });

// Your existing spreadsheet ID
const EXISTING_SPREADSHEET_ID = '10F2ON8N3phmbvKQNQFfKet44XoytFxA3SgUiIlHl6VY';

// API Routes

// Get spreadsheet info
app.get('/api/sheets/:spreadsheetId/info', async (req, res) => {
  try {
    const { spreadsheetId } = req.params;
    const response = await sheets.spreadsheets.get({
      spreadsheetId: spreadsheetId || EXISTING_SPREADSHEET_ID,
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error getting spreadsheet info:', error);
    res.status(500).json({ error: error.message });
  }
});

// Read data from spreadsheet
app.get('/api/sheets/:spreadsheetId/read', async (req, res) => {
  try {
    const { spreadsheetId } = req.params;
    const { range } = req.query;
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId || EXISTING_SPREADSHEET_ID,
      range: range || 'A:Z',
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Error reading spreadsheet data:', error);
    res.status(500).json({ error: error.message });
  }
});

// Write data to spreadsheet
app.post('/api/sheets/:spreadsheetId/write', async (req, res) => {
  try {
    const { spreadsheetId } = req.params;
    const { range, values } = req.body;
    
    const response = await sheets.spreadsheets.values.update({
      spreadsheetId: spreadsheetId || EXISTING_SPREADSHEET_ID,
      range,
      valueInputOption: 'RAW',
      requestBody: { values },
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Error writing spreadsheet data:', error);
    res.status(500).json({ error: error.message });
  }
});

// Append data to spreadsheet
app.post('/api/sheets/:spreadsheetId/append', async (req, res) => {
  try {
    const { spreadsheetId } = req.params;
    const { range, values } = req.body;
    
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: spreadsheetId || EXISTING_SPREADSHEET_ID,
      range,
      valueInputOption: 'RAW',
      requestBody: { values },
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Error appending spreadsheet data:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create new spreadsheet
app.post('/api/sheets/create', async (req, res) => {
  try {
    const { title } = req.body;
    
    const response = await sheets.spreadsheets.create({
      requestBody: {
        properties: { title },
        sheets: [
          {
            properties: {
              title: 'Stock Data',
              gridProperties: { rowCount: 1000, columnCount: 10 },
            },
          },
          {
            properties: {
              title: 'Predictions',
              gridProperties: { rowCount: 1000, columnCount: 10 },
            },
          },
        ],
      },
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Error creating spreadsheet:', error);
    res.status(500).json({ error: error.message });
  }
});

// Clear range in spreadsheet
app.delete('/api/sheets/:spreadsheetId/clear', async (req, res) => {
  try {
    const { spreadsheetId } = req.params;
    const { range } = req.query;
    
    const response = await sheets.spreadsheets.values.clear({
      spreadsheetId: spreadsheetId || EXISTING_SPREADSHEET_ID,
      range,
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Error clearing spreadsheet range:', error);
    res.status(500).json({ error: error.message });
  }
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Google Sheets API server is running!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Your existing spreadsheet ID: ${EXISTING_SPREADSHEET_ID}`);
  console.log('Available endpoints:');
  console.log('  GET  /api/test');
  console.log('  GET  /api/sheets/:spreadsheetId/info');
  console.log('  GET  /api/sheets/:spreadsheetId/read?range=A:Z');
  console.log('  POST /api/sheets/:spreadsheetId/write');
  console.log('  POST /api/sheets/:spreadsheetId/append');
  console.log('  POST /api/sheets/create');
  console.log('  DELETE /api/sheets/:spreadsheetId/clear?range=A:Z');
}); 