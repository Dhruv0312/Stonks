// Client-side API service for Google Sheets
// This calls backend endpoints that handle the actual Google Sheets API

export interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  date: string;
}

export interface PredictionData {
  symbol: string;
  predictedPrice: number;
  confidence: number;
  predictionDate: string;
  algorithm: string;
}

// For now, we'll use mock data since we don't have a backend
// In production, you would replace these with actual API calls

export class GoogleSheetsAPIService {
  private spreadsheetId: string;
  private baseURL: string;

  constructor(spreadsheetId: string, baseURL: string = 'http://localhost:3001/api') {
    this.spreadsheetId = spreadsheetId;
    this.baseURL = baseURL;
  }

  // API calls - requires backend server to be running
  async createSpreadsheet(title: string) {
    console.log('API: Creating spreadsheet with title:', title);
    try {
      const response = await this.makeAPICall('/sheets/create', {
        method: 'POST',
        body: JSON.stringify({ title })
      });
      return { data: response };
    } catch (error) {
      throw new Error('Data not available - Backend server is not running');
    }
  }

  async readStockData(range: string = 'Stock Data!A:F') {
    console.log('API: Reading stock data from range:', range);
    
    try {
      // Try to call the backend API first
      const response = await this.makeAPICall(`/sheets/${this.spreadsheetId}/read?range=${range}`);
      return response.values || [];
    } catch (error) {
      console.log('Backend not available, data not available');
      throw new Error('Data not available - Backend server is not running');
    }
  }

  async writeStockData(data: StockData[], range: string = 'Stock Data!A:F') {
    console.log('API: Writing stock data to range:', range, data);
    try {
      const response = await this.makeAPICall(`/sheets/${this.spreadsheetId}/write`, {
        method: 'POST',
        body: JSON.stringify({ range, values: data.map(item => Object.values(item)) })
      });
      return { data: response };
    } catch (error) {
      throw new Error('Data not available - Backend server is not running');
    }
  }

  async writePredictionData(data: PredictionData[], range: string = 'Predictions!A:F') {
    console.log('API: Writing prediction data to range:', range, data);
    try {
      const response = await this.makeAPICall(`/sheets/${this.spreadsheetId}/write`, {
        method: 'POST',
        body: JSON.stringify({ range, values: data.map(item => Object.values(item)) })
      });
      return { data: response };
    } catch (error) {
      throw new Error('Data not available - Backend server is not running');
    }
  }

  async appendStockData(data: StockData[], range: string = 'Stock Data!A:F') {
    console.log('API: Appending stock data to range:', range, data);
    try {
      const response = await this.makeAPICall(`/sheets/${this.spreadsheetId}/append`, {
        method: 'POST',
        body: JSON.stringify({ range, values: data.map(item => Object.values(item)) })
      });
      return { data: response };
    } catch (error) {
      throw new Error('Data not available - Backend server is not running');
    }
  }

  async getSpreadsheetInfo() {
    console.log('API: Getting spreadsheet info for:', this.spreadsheetId);
    
    try {
      // Try to call the backend API first
      const response = await this.makeAPICall(`/sheets/${this.spreadsheetId}/info`);
      return { data: response };
    } catch (error) {
      console.log('Backend not available, data not available');
      throw new Error('Data not available - Backend server is not running');
    }
  }

  async clearRange(range: string) {
    console.log('API: Clearing range:', range);
    try {
      const response = await this.makeAPICall(`/sheets/${this.spreadsheetId}/clear?range=${range}`, {
        method: 'DELETE'
      });
      return { data: response };
    } catch (error) {
      throw new Error('Data not available - Backend server is not running');
    }
  }

  // Helper method to make actual API calls (for when you have a backend)
  private async makeAPICall(endpoint: string, options: RequestInit = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API call error:', error);
      throw error;
    }
  }
}

// Example usage function
export async function initializeGoogleSheetsAPI(spreadsheetId?: string) {
  try {
    // If no spreadsheet ID provided, create a new one
    if (!spreadsheetId) {
      const sheetsService = new GoogleSheetsAPIService('');
      const newSpreadsheet = await sheetsService.createSpreadsheet('Stock Predictions Dashboard');
      spreadsheetId = newSpreadsheet.data.spreadsheetId!;
      console.log('Created new spreadsheet with ID:', spreadsheetId);
    }

    return new GoogleSheetsAPIService(spreadsheetId);
  } catch (error) {
    console.error('Error initializing Google Sheets API:', error);
    throw new Error('Data not available - Backend server is not running');
  }
} 