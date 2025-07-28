const FINNHUB_API_KEY = import.meta.env.VITE_FINNHUB_API_KEY || 'd21p7ehr01qquiqnhoq0d21p7ehr01qquiqnhoqg';
const BASE_URL = 'https://finnhub.io/api/v1';

export interface StockQuote {
  c: number; // Current price
  d: number; // Change
  dp: number; // Percent change
  h: number; // High price of the day
  l: number; // Low price of the day
  o: number; // Open price of the day
  pc: number; // Previous close price
  t: number; // Timestamp
}

export interface CompanyProfile {
  country: string;
  currency: string;
  exchange: string;
  ipo: string;
  marketCapitalization: number;
  name: string;
  phone: string;
  shareOutstanding: number;
  ticker: string;
  weburl: string;
  logo: string;
  finnhubIndustry: string;
}

export interface NewsItem {
  category: string;
  datetime: number;
  headline: string;
  id: number;
  image: string;
  related: string;
  source: string;
  summary: string;
  url: string;
}

export interface CandleData {
  c: number[]; // Close prices
  h: number[]; // High prices
  l: number[]; // Low prices
  o: number[]; // Open prices
  s: string;   // Status
  t: number[]; // Timestamps
  v: number[]; // Volumes
}

class FinnhubService {
  private async makeRequest(endpoint: string, params: Record<string, string> = {}) {
    const url = new URL(`${BASE_URL}${endpoint}`);
    url.searchParams.append('token', FINNHUB_API_KEY);
    
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    try {
      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Finnhub API request failed:', error);
      throw error;
    }
  }

  async getStockQuote(symbol: string): Promise<StockQuote> {
    return this.makeRequest('/quote', { symbol });
  }

  async getCompanyProfile(symbol: string): Promise<CompanyProfile> {
    return this.makeRequest('/stock/profile2', { symbol });
  }

  async getCompanyNews(symbol: string, from: string, to: string): Promise<NewsItem[]> {
    return this.makeRequest('/company-news', { 
      symbol, 
      from, 
      to 
    });
  }

  async getMarketNews(category: string = 'general'): Promise<NewsItem[]> {
    return this.makeRequest('/news', { category });
  }

  async getCandles(symbol: string, resolution: string, from: number, to: number): Promise<CandleData> {
    return this.makeRequest('/stock/candle', {
      symbol,
      resolution,
      from: from.toString(),
      to: to.toString()
    });
  }

  async getAllNYSEStocks(): Promise<any[]> {
    return this.makeRequest('/stock/symbol', { exchange: 'US' });
  }
}

export const finnhubService = new FinnhubService();