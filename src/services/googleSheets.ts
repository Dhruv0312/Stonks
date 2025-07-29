// Google Sheets + Google Finance Integration Service
// -----------------------------------------------
// Sheet ID: 1dp-KRG5d9rXuR_RDCEzjQqWBQfi71Rm7bbX2VhCDqa0
// URL: https://docs.google.com/spreadsheets/d/1dp-KRG5d9rXuR_RDCEzjQqWBQfi71Rm7bbX2VhCDqa0/edit?usp=sharing
// 
// This sheet contains:
// - Stock symbols in column A
// - Exchange info in column B  
// - Company names in column C
// - Current prices in column D
// - Price changes in column E
// - Percent changes in column F
// 
// Setup Instructions:
// 1. Sheet is already populated with real stock data
// 2. Publish sheet to web (File > Share > Publish to web)
// 3. Get Google Sheets API key from Google Cloud Console
// 4. Add API key to .env file

const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID || '1dp-KRG5d9rXuR_RDCEzjQqWBQfi71Rm7bbX2VhCDqa0';
const API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY || 'YOUR_API_KEY';

// Stock data structure from the sheet
export interface GoogleSheetStockRow {
  symbol: string;
  exchange: string;
  companyName: string;
  currentPrice: number;
  priceChange: number;
  percentChange: number;
}

// Stock quote interface matching your app's format
export interface GoogleStockQuote {
  c: number; // Current price
  d: number; // Change
  dp: number; // Percent change
  h: number; // High price (estimated)
  l: number; // Low price (estimated)
  o: number; // Open price (estimated)
  pc: number; // Previous close
  t: number; // Timestamp
  symbol: string;
  companyName: string;
}

// Candle data interface for charts (will need historical data)
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

  // Fetch all stock data from the sheet
  async getAllStocks(): Promise<GoogleSheetStockRow[]> {
    try {
      const range = 'A2:F'; // Skip header row, get columns A-F
      const data = await this.makeRequest(range);
      
      if (!data.values || data.values.length === 0) {
        console.warn('No stock data found in sheet');
        return [];
      }

      return data.values.map((row: any[]) => {
        // Parse price change (remove + or - signs and convert to number)
        const priceChangeStr = row[4] || '0';
        const priceChange = parseFloat(priceChangeStr.replace(/[+-]/g, '')) || 0;
        const isPositive = priceChangeStr.includes('+');
        
        // Parse percent change (remove % sign and convert to number)
        const percentChangeStr = row[5] || '0%';
        const percentChange = parseFloat(percentChangeStr.replace(/[+\-%]/g, '')) || 0;
        const isPercentPositive = percentChangeStr.includes('+');

        return {
          symbol: row[0] || '',
          exchange: row[1] || '',
          companyName: row[2] || '',
          currentPrice: parseFloat(row[3]) || 0,
          priceChange: isPositive ? priceChange : -priceChange,
          percentChange: isPercentPositive ? percentChange : -percentChange
        };
      }).filter(row => row.symbol && row.currentPrice > 0); // Filter out invalid data
    } catch (error) {
      console.error('Error fetching all stocks:', error);
      return [];
    }
  }

  // Get specific stock by symbol
  async getStockBySymbol(symbol: string): Promise<GoogleSheetStockRow | null> {
    try {
      const allStocks = await this.getAllStocks();
      return allStocks.find(stock => stock.symbol.toUpperCase() === symbol.toUpperCase()) || null;
    } catch (error) {
      console.error(`Error fetching stock ${symbol}:`, error);
      return null;
    }
  }

  // Get stock quote in format compatible with your app
  async getStockQuote(symbol: string): Promise<GoogleStockQuote | null> {
    try {
      const stock = await this.getStockBySymbol(symbol);
      if (!stock) return null;

      // Estimate previous close from current price and change
      const previousClose = stock.currentPrice - stock.priceChange;
      
      // Estimate high/low/open (using current price as approximation)
      const estimatedHigh = stock.currentPrice * 1.02; // 2% above current
      const estimatedLow = stock.currentPrice * 0.98;  // 2% below current
      const estimatedOpen = stock.currentPrice - (stock.priceChange * 0.5); // Rough estimate

      return {
        c: stock.currentPrice,
        d: stock.priceChange,
        dp: stock.percentChange,
        h: estimatedHigh,
        l: estimatedLow,
        o: estimatedOpen,
        pc: previousClose,
        t: Date.now(),
        symbol: stock.symbol,
        companyName: stock.companyName
      };
    } catch (error) {
      console.error(`Error fetching quote for ${symbol}:`, error);
      return null;
    }
  }

  // Get multiple stock quotes
  async getMultipleQuotes(symbols: string[]): Promise<GoogleStockQuote[]> {
    try {
      const quotes: GoogleStockQuote[] = [];
      for (const symbol of symbols) {
        const quote = await this.getStockQuote(symbol);
        if (quote) quotes.push(quote);
      }
      return quotes;
    } catch (error) {
      console.error('Error fetching multiple quotes:', error);
      return [];
    }
  }

  // Get top gainers (stocks with highest positive change)
  async getTopGainers(limit: number = 10): Promise<GoogleSheetStockRow[]> {
    try {
      const allStocks = await this.getAllStocks();
      return allStocks
        .filter(stock => stock.percentChange > 0)
        .sort((a, b) => b.percentChange - a.percentChange)
        .slice(0, limit);
    } catch (error) {
      console.error('Error fetching top gainers:', error);
      return [];
    }
  }

  // Get top losers (stocks with highest negative change)
  async getTopLosers(limit: number = 10): Promise<GoogleSheetStockRow[]> {
    try {
      const allStocks = await this.getAllStocks();
      return allStocks
        .filter(stock => stock.percentChange < 0)
        .sort((a, b) => a.percentChange - b.percentChange)
        .slice(0, limit);
    } catch (error) {
      console.error('Error fetching top losers:', error);
      return [];
    }
  }

  // Search stocks by name or symbol
  async searchStocks(query: string): Promise<GoogleSheetStockRow[]> {
    try {
      const allStocks = await this.getAllStocks();
      const searchTerm = query.toLowerCase();
      
      return allStocks.filter(stock => 
        stock.symbol.toLowerCase().includes(searchTerm) ||
        stock.companyName.toLowerCase().includes(searchTerm)
      );
    } catch (error) {
      console.error('Error searching stocks:', error);
      return [];
    }
  }

  // Get available symbols
  async getAvailableSymbols(): Promise<string[]> {
    try {
      const allStocks = await this.getAllStocks();
      return allStocks.map(stock => stock.symbol);
    } catch (error) {
      console.error('Error fetching available symbols:', error);
      return [];
    }
  }

  // Test connection to the sheet
  async testConnection(): Promise<boolean> {
    try {
      const stocks = await this.getAllStocks();
      console.log('Available stocks:', stocks.length);
      return stocks.length > 0;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  }

  // Note: Historical candle data would need a separate sheet with daily data
  // For now, we'll return empty data structure
  async getCandles(symbol: string): Promise<GoogleCandleData> {
    console.warn('Historical candle data not available in current sheet format');
    return {
      c: [], h: [], l: [], o: [], s: 'no_data', t: [], v: []
    };
  }
}

export const googleSheetsService = new GoogleSheetsService(); 