// Simple Google Sheets API service
// Using Google Sheets API v4 with API key for public sheets

const API_KEY = 'AIzaSyBANy06jI96BJZYS5PBhrhK3bhoNsfWwZ0';
const SPREADSHEET_ID = '10F2ON8N3phmbvKQNQFfKet44XoytFxA3SgUiIlHl6VY';

class GoogleSheetsAPI {
  private baseURL: string;

  constructor() {
    // For now, let's use a simple approach with a public API
    this.baseURL = 'https://sheets.googleapis.com/v4/spreadsheets';
  }

  // Get stock data from Google Sheets
  async getStockData(): Promise<any> {
    try {
      const response = await fetch(
        `${this.baseURL}/${SPREADSHEET_ID}/values/Stock Data!A:Z?key=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching stock data:', error);
      throw error;
    }
  }

  // Get technical data from Google Sheets
  async getTechnicalData(): Promise<any> {
    try {
      const response = await fetch(
        `${this.baseURL}/${SPREADSHEET_ID}/values/Technical Data!A:Z?key=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching technical data:', error);
      throw error;
    }
  }

  // Get watchlist data from Google Sheets
  async getWatchlistData(): Promise<any> {
    try {
      const response = await fetch(
        `${this.baseURL}/${SPREADSHEET_ID}/values/Watchlist!A:Z?key=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching watchlist data:', error);
      throw error;
    }
  }
}

export default new GoogleSheetsAPI(); 