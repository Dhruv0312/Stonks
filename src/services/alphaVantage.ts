const ALPHA_VANTAGE_API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY || 'GXWC1XDGX22TOE92';
const BASE_URL = 'https://www.alphavantage.co/query';

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

class AlphaVantageService {
  private async makeRequest(params: Record<string, string>) {
    const url = new URL(BASE_URL);
    url.searchParams.append('apikey', ALPHA_VANTAGE_API_KEY);
    
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
      console.error('Alpha Vantage API request failed:', error);
      throw error;
    }
  }

  async getStockQuote(symbol: string): Promise<StockQuote> {
    const data = await this.makeRequest({
      function: 'GLOBAL_QUOTE',
      symbol: symbol
    });

    if (data['Error Message']) {
      throw new Error(data['Error Message']);
    }

    const quote = data['Global Quote'];
    if (!quote) {
      throw new Error('No quote data available');
    }

    return {
      c: parseFloat(quote['05. price'] || '0'),
      d: parseFloat(quote['09. change'] || '0'),
      dp: parseFloat(quote['10. change percent']?.replace('%', '') || '0'),
      h: parseFloat(quote['03. high'] || '0'),
      l: parseFloat(quote['04. low'] || '0'),
      o: parseFloat(quote['02. open'] || '0'),
      pc: parseFloat(quote['08. previous close'] || '0'),
      t: Date.now()
    };
  }

  async getCompanyProfile(symbol: string): Promise<CompanyProfile> {
    const data = await this.makeRequest({
      function: 'OVERVIEW',
      symbol: symbol
    });

    if (data['Error Message']) {
      throw new Error(data['Error Message']);
    }

    return {
      country: data['Country'] || '',
      currency: data['Currency'] || 'USD',
      exchange: data['Exchange'] || '',
      ipo: data['IPO Date'] || '',
      marketCapitalization: parseFloat(data['MarketCapitalization'] || '0'),
      name: data['Name'] || symbol,
      phone: data['Phone'] || '',
      shareOutstanding: parseFloat(data['SharesOutstanding'] || '0'),
      ticker: symbol,
      weburl: data['Website'] || '',
      logo: '', // Alpha Vantage doesn't provide logos
      finnhubIndustry: data['Industry'] || ''
    };
  }

  async getCompanyNews(symbol: string, from: string, to: string): Promise<NewsItem[]> {
    const data = await this.makeRequest({
      function: 'NEWS_SENTIMENT',
      tickers: symbol,
      time_from: from,
      time_to: to
    });

    if (data['Error Message']) {
      throw new Error(data['Error Message']);
    }

    const feed = data['feed'] || [];
    return feed.map((item: any, index: number) => ({
      category: item['category_within_source'] || 'general',
      datetime: new Date(item['time_published']).getTime(),
      headline: item['title'] || '',
      id: index,
      image: item['banner_image'] || '',
      related: symbol,
      source: item['source'] || '',
      summary: item['summary'] || '',
      url: item['url'] || ''
    }));
  }

  async getMarketNews(category: string = 'general'): Promise<NewsItem[]> {
    const data = await this.makeRequest({
      function: 'NEWS_SENTIMENT',
      topics: category
    });

    if (data['Error Message']) {
      throw new Error(data['Error Message']);
    }

    const feed = data['feed'] || [];
    return feed.map((item: any, index: number) => ({
      category: item['category_within_source'] || 'general',
      datetime: new Date(item['time_published']).getTime(),
      headline: item['title'] || '',
      id: index,
      image: item['banner_image'] || '',
      related: '',
      source: item['source'] || '',
      summary: item['summary'] || '',
      url: item['url'] || ''
    }));
  }

  async getCandles(symbol: string, resolution: string = 'D', days: number = 30): Promise<CandleData> {
    const function_name = resolution === 'D' ? 'TIME_SERIES_DAILY' : 'TIME_SERIES_INTRADAY';
    const params: Record<string, string> = {
      function: function_name,
      symbol: symbol
    };

    if (resolution !== 'D') {
      params.interval = resolution === '1' ? '1min' : '5min';
    }

    const data = await this.makeRequest(params);

    if (data['Error Message']) {
      throw new Error(data['Error Message']);
    }

    const timeSeriesKey = resolution === 'D' ? 'Time Series (Daily)' : 'Time Series (1min)';
    const timeSeries = data[timeSeriesKey];

    if (!timeSeries) {
      throw new Error('No time series data available');
    }

    const dates = Object.keys(timeSeries).sort().slice(-days);
    const c: number[] = [];
    const h: number[] = [];
    const l: number[] = [];
    const o: number[] = [];
    const t: number[] = [];
    const v: number[] = [];

    dates.forEach(date => {
      const dayData = timeSeries[date];
      c.push(parseFloat(dayData['4. close']));
      h.push(parseFloat(dayData['2. high']));
      l.push(parseFloat(dayData['3. low']));
      o.push(parseFloat(dayData['1. open']));
      t.push(new Date(date).getTime());
      v.push(parseFloat(dayData['5. volume']));
    });

    return {
      c,
      h,
      l,
      o,
      s: 'ok',
      t,
      v
    };
  }

  async getAllNYSEStocks(): Promise<any[]> {
    const data = await this.makeRequest({
      function: 'LISTING_STATUS'
    });

    if (data['Error Message']) {
      throw new Error(data['Error Message']);
    }

    return data || [];
  }
}

export const alphaVantageService = new AlphaVantageService(); 