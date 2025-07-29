// Google Sheets + Google Finance Integration Service
// -----------------------------------------------
// Sheet ID: 14-w8T7IjI77VprOohau29sPpjZIH1nNHEkB-hiSY5g0
// URL: https://docs.google.com/spreadsheets/d/14-w8T7IjI77VprOohau29sPpjZIH1nNHEkB-hiSY5g0/edit?usp=sharing
// 
// Setup Instructions:
// 1. Add Google Finance formulas like =GOOGLEFINANCE("AAPL", "all", TODAY()-30, TODAY())
// 2. Create tabs for each stock (AAPL, GOOGL, MSFT, TSLA, etc.)
// 3. Publish sheet to web (File > Share > Publish to web)
// 4. Get Google Sheets API key from Google Cloud Console
// 5. Add API key to .env file

const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID || '14-w8T7IjI77VprOohau29sPpjZIH1nNHEkB-hiSY5g0';
const API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY || 'YOUR_API_KEY';

// Google Finance data structure
export interface GoogleSheetStockRow {
  date: string;
  close: number;
  open: number;
  high: number;
  low: number;
  volume: number;
}

// Stock quote interface matching your app's format
export interface GoogleStockQuote {
  c: number; // Current price (close)
  d: number; // Change
  dp: number; // Percent change
  h: number; // High price
  l: number; // Low price
  o: number; // Open price
  pc: number; // Previous close
  t: number; // Timestamp
}

// Candle data interface for charts
export interface GoogleCandleData {
  c: number[]; // Close prices
  h: number[]; // High prices
  l: number[]; // Low prices
  o: number[]; // Open prices
  s: string;   // Status
  t: number[]; // Timestamps
  v: number[]; // Volumes
}

class GoogleSheetsService {
  private async makeRequest(range: string): Promise<any> {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Google Sheets API request failed:', error);
      throw error;
    }
  }

  // Fetch historical data for a symbol from a specific tab
  async getStockHistory(symbol: string): Promise<GoogleSheetStockRow[]> {
    try {
      const range = `${symbol}!A2:F`; // Skip header row, get columns A-F
      const data = await this.makeRequest(range);
      
      if (!data.values || data.values.length === 0) {
        console.warn(`No data found for symbol: ${symbol}`);
        return [];
      }

      return data.values.map((row: any[]) => {
        // Google Finance returns data in format: Date, Close, Open, High, Low, Volume
        return {
          date: row[0] || '',
          close: parseFloat(row[1]) || 0,
          open: parseFloat(row[2]) || 0,
          high: parseFloat(row[3]) || 0,
          low: parseFloat(row[4]) || 0,
          volume: parseInt(row[5], 10) || 0
        };
      }).filter(row => row.close > 0); // Filter out invalid data
    } catch (error) {
      console.error(`Error fetching history for ${symbol}:`, error);
      return [];
    }
  }

  // Get latest quote in format compatible with your app
  async getStockQuote(symbol: string): Promise<GoogleStockQuote | null> {
    try {
      const history = await this.getStockHistory(symbol);
      if (history.length < 2) return null;

      const latest = history[history.length - 1];
      const previous = history[history.length - 2];
      
      const change = latest.close - previous.close;
      const percentChange = (change / previous.close) * 100;

      return {
        c: latest.close,
        d: change,
        dp: percentChange,
        h: latest.high,
        l: latest.low,
        o: latest.open,
        pc: previous.close,
        t: new Date(latest.date).getTime()
      };
    } catch (error) {
      console.error(`Error fetching quote for ${symbol}:`, error);
      return null;
    }
  }

  // Get candle data for charts
  async getCandles(symbol: string): Promise<GoogleCandleData> {
    try {
      const history = await this.getStockHistory(symbol);
      
      if (history.length === 0) {
        return {
          c: [], h: [], l: [], o: [], s: 'no_data', t: [], v: []
        };
      }

      return {
        c: history.map(row => row.close),
        h: history.map(row => row.high),
        l: history.map(row => row.low),
        o: history.map(row => row.open),
        s: 'ok',
        t: history.map(row => new Date(row.date).getTime()),
        v: history.map(row => row.volume)
      };
    } catch (error) {
      console.error(`Error fetching candles for ${symbol}:`, error);
      return {
        c: [], h: [], l: [], o: [], s: 'error', t: [], v: []
      };
    }
  }

  // Get available symbols (tabs) in the sheet
  async getAvailableSymbols(): Promise<string[]> {
    try {
      const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}?key=${API_KEY}`);
      const data = await response.json();
      
      if (data.sheets) {
        return data.sheets.map((sheet: any) => sheet.properties.title);
      }
      return [];
    } catch (error) {
      console.error('Error fetching available symbols:', error);
      return [];
    }
  }

  // Test connection to the sheet
  async testConnection(): Promise<boolean> {
    try {
      const symbols = await this.getAvailableSymbols();
      console.log('Available symbols:', symbols);
      return symbols.length > 0;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  }
}

export const googleSheetsService = new GoogleSheetsService(); 