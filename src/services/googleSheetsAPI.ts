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
      console.log('Fetching stock data from Google Sheets...');
      const response = await fetch(
        `${this.baseURL}/${SPREADSHEET_ID}/values/Watchlist!A:Z?key=${API_KEY}`
      );
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        console.log('Using fallback stock data due to API error');
        return fallbackStockData;
      }
      
      const data = await response.json();
      console.log('Stock data received:', data);
      
      // Log the number of rows
      if (data.values) {
        console.log(`Watchlist has ${data.values.length} rows total`);
        console.log(`Watchlist has ${data.values.length - 1} data rows (excluding header)`);
        console.log('First few rows:', data.values.slice(0, 5));
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching stock data:', error);
      console.log('Using fallback stock data due to network error');
      return fallbackStockData;
    }
  }

  // Get technical data from Google Sheets
  async getTechnicalData(): Promise<any> {
    try {
      console.log('Fetching technical data from Google Sheets...');
      const response = await fetch(
        `${this.baseURL}/${SPREADSHEET_ID}/values/Latest RSI!A:Z?key=${API_KEY}`
      );
      
      if (!response.ok) {
        console.log('Using fallback technical data due to API error');
        return fallbackTechnicalData;
      }
      
      const data = await response.json();
      console.log('Technical data received:', data);
      return data;
    } catch (error) {
      console.error('Error fetching technical data:', error);
      console.log('Using fallback technical data due to network error');
      return fallbackTechnicalData;
    }
  }

  // Get watchlist data from Google Sheets
  async getWatchlistData(): Promise<any> {
    try {
      console.log('Fetching watchlist data from Google Sheets...');
      const response = await fetch(
        `${this.baseURL}/${SPREADSHEET_ID}/values/Watchlist!A:Z?key=${API_KEY}`
      );
      
      if (!response.ok) {
        console.log('Using fallback watchlist data due to API error');
        return fallbackWatchlistData;
      }
      
      const data = await response.json();
      console.log('Watchlist data received:', data);
      
      // Log the number of rows
      if (data.values) {
        console.log(`Watchlist has ${data.values.length} rows total`);
        console.log(`Watchlist has ${data.values.length - 1} data rows (excluding header)`);
        console.log('First few rows:', data.values.slice(0, 5));
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching watchlist data:', error);
      console.log('Using fallback watchlist data due to network error');
      return fallbackWatchlistData;
    }
  }

  // Get MACD data from Google Sheets
  async getMACDData(): Promise<any> {
    try {
      console.log('Fetching MACD data from Google Sheets...');
      const response = await fetch(
        `${this.baseURL}/${SPREADSHEET_ID}/values/Latest MACD!A:Z?key=${API_KEY}`
      );
      
      if (!response.ok) {
        console.log('Using fallback MACD data due to API error');
        return fallbackMACDData;
      }
      
      const data = await response.json();
      console.log('MACD data received:', data);
      
      // Log the number of rows
      if (data.values) {
        console.log(`Latest MACD has ${data.values.length} rows total`);
        console.log(`Latest MACD has ${data.values.length - 1} data rows (excluding header)`);
        console.log('First few rows:', data.values.slice(0, 5));
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching MACD data:', error);
      console.log('Using fallback MACD data due to network error');
      return fallbackMACDData;
    }
  }
}

// Fallback data in case API fails
const fallbackStockData = {
  values: [
    ['Symbol', 'Name', 'Price', 'Change', 'Change%', 'Market Cap', 'Volume'],
    ['AAPL', 'Apple Inc.', '150.00', '+2.50', '+1.69%', '2.5T', '50M'],
    ['GOOGL', 'Alphabet Inc.', '2800.00', '+15.00', '+0.54%', '1.8T', '25M'],
    ['MSFT', 'Microsoft Corporation', '320.00', '+5.00', '+1.59%', '2.4T', '30M'],
    ['TSLA', 'Tesla Inc.', '250.00', '-5.00', '-1.96%', '800B', '40M'],
    ['AMZN', 'Amazon.com Inc.', '3300.00', '+20.00', '+0.61%', '1.7T', '35M'],
    ['META', 'Meta Platforms Inc.', '350.00', '+8.00', '+2.34%', '900B', '45M']
  ]
};

const fallbackTechnicalData = {
  values: [
    ['Symbol', 'RSI', 'MACD', 'Signal', 'Recommendation'],
    ['AAPL', '65', '0.5', '0.3', 'BUY'],
    ['GOOGL', '45', '0.2', '0.4', 'HOLD'],
    ['MSFT', '70', '0.8', '0.2', 'BUY'],
    ['TSLA', '30', '-0.3', '0.1', 'SELL'],
    ['AMZN', '55', '0.4', '0.3', 'HOLD'],
    ['META', '75', '1.2', '0.5', 'BUY']
  ]
};

const fallbackWatchlistData = {
  values: [
    ['Symbol', 'Name', 'Price', 'Change%'],
    ['AAPL', 'Apple Inc.', '150.00', '+1.69%'],
    ['GOOGL', 'Alphabet Inc.', '2800.00', '+0.54%'],
    ['MSFT', 'Microsoft Corporation', '320.00', '+1.59%']
  ]
};

const fallbackMACDData = {
  values: [
    ['Symbol', 'MACD', 'Signal', 'Histogram'],
    ['AAPL', '0.5', '0.3', '0.2'],
    ['GOOGL', '0.2', '0.4', '-0.2'],
    ['MSFT', '0.8', '0.2', '0.6'],
    ['TSLA', '-0.3', '0.1', '-0.4'],
    ['AMZN', '0.4', '0.3', '0.1'],
    ['META', '1.2', '0.5', '0.7']
  ]
};

export default new GoogleSheetsAPI(); 