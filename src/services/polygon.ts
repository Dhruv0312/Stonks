const POLYGON_API_KEY = 'WqzF3uPFuVkTafqGBPjadRba3Hih8RqO';
const BASE_URL = 'https://api.polygon.io';

export interface PolygonAggregate {
  c: number; // Close price
  h: number; // High price
  l: number; // Low price
  n: number; // Number of transactions
  o: number; // Open price
  t: number; // Timestamp
  v: number; // Volume
  vw: number; // Volume weighted average price
}

export interface PolygonAggregatesResponse {
  ticker: string;
  queryCount: number;
  resultsCount: number;
  adjusted: boolean;
  results: PolygonAggregate[];
  status: string;
  request_id: string;
  count: number;
}

export interface PolygonTickerDetails {
  ticker: string;
  name: string;
  market: string;
  locale: string;
  primary_exchange: string;
  type: string;
  active: boolean;
  currency_name: string;
  cik?: string;
  composite_figi?: string;
  share_class_figi?: string;
  market_cap?: number;
  phone_number?: string;
  address?: {
    address1?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
  };
  description?: string;
  sic_code?: string;
  sic_description?: string;
  ticker_root?: string;
  homepage_url?: string;
  total_employees?: number;
  list_date?: string;
  branding?: {
    logo_url?: string;
    icon_url?: string;
  };
  share_class_shares_outstanding?: number;
  weighted_shares_outstanding?: number;
}

class PolygonService {
  private async makeRequest(endpoint: string, params: Record<string, string> = {}) {
    const url = new URL(`${BASE_URL}${endpoint}`);
    url.searchParams.append('apiKey', POLYGON_API_KEY);
    
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
      console.error('Polygon API request failed:', error);
      throw error;
    }
  }

  async getAggregates(
    ticker: string, 
    multiplier: number = 1, 
    timespan: 'minute' | 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year' = 'day',
    from: string,
    to: string,
    adjusted: boolean = true,
    sort: 'asc' | 'desc' = 'asc',
    limit: number = 5000
  ): Promise<PolygonAggregatesResponse> {
    return this.makeRequest(`/v2/aggs/ticker/${ticker}/range/${multiplier}/${timespan}/${from}/${to}`, {
      adjusted: adjusted.toString(),
      sort,
      limit: limit.toString()
    });
  }

  async getTickerDetails(ticker: string): Promise<PolygonTickerDetails> {
    return this.makeRequest(`/v3/reference/tickers/${ticker}`);
  }

  async getPreviousClose(ticker: string, adjusted: boolean = true): Promise<any> {
    return this.makeRequest(`/v2/aggs/ticker/${ticker}/prev`, {
      adjusted: adjusted.toString()
    });
  }

  async getTickerNews(ticker: string, published_utc_gte?: string, published_utc_lte?: string, limit: number = 10): Promise<any> {
    const params: Record<string, string> = {
      ticker,
      limit: limit.toString()
    };
    
    if (published_utc_gte) params.published_utc_gte = published_utc_gte;
    if (published_utc_lte) params.published_utc_lte = published_utc_lte;
    
    return this.makeRequest('/v2/reference/news', params);
  }

  // Helper method to get date range for different periods
  getDateRange(period: string): { from: string; to: string } {
    const now = new Date();
    const to = now.toISOString().split('T')[0];
    
    let from: Date;
    
    switch (period) {
      case '1D':
        from = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case '5D':
        from = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000);
        break;
      case '1M':
        from = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '6M':
        from = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
        break;
      case 'YTD':
        from = new Date(now.getFullYear(), 0, 1);
        break;
      case '1Y':
        from = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      case '5Y':
        from = new Date(now.getTime() - 5 * 365 * 24 * 60 * 60 * 1000);
        break;
      case 'MAX':
        from = new Date(now.getTime() - 10 * 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        from = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }
    
    return {
      from: from.toISOString().split('T')[0],
      to
    };
  }
}

export const polygonService = new PolygonService(); 