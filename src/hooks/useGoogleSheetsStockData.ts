import { useQuery } from '@tanstack/react-query';

interface StockData {
  symbol: string;
  price: string;
  change: string;
  changePercent: string;
  volume?: string;
  marketCap?: string;
  date?: string;
}

interface TechnicalData {
  symbol: string;
  rsi?: string;
  macd?: string;
  macdSignal?: string;
  macdHistogram?: string;
}

// Fetch stock data from Google Sheets
const fetchStockData = async (): Promise<StockData[]> => {
  const baseURL = typeof window !== 'undefined' && window.location.hostname === 'localhost' 
    ? 'http://localhost:3001/api' 
    : '/api';
  const response = await fetch(`${baseURL}/sheets/10F2ON8N3phmbvKQNQFfKet44XoytFxA3SgUiIlHl6VY/read?range=Watchlist!A:H`);
  const result = await response.json();
  
  if (!result.values) {
    throw new Error('No data available from Google Sheets');
  }

  // Skip header row and map data
  return result.values.slice(1).map((row: any[]) => ({
    symbol: row[1] || '', // Column B
    price: row[4] || '0', // Column E
    change: row[5] || '0', // Column F
    changePercent: row[6] || '0%', // Column G
    volume: row[3] || '', // Column D (company name, not volume)
    marketCap: row[7] || '', // Column H (market cap)
    date: new Date().toISOString() // Current date since we don't have date in sheet
  }));
};

// Fetch technical data from Google Sheets
const fetchTechnicalData = async (): Promise<TechnicalData[]> => {
  try {
    const baseURL = typeof window !== 'undefined' && window.location.hostname === 'localhost' 
      ? 'http://localhost:3001/api' 
      : '/api';
    
    // Fetch RSI data
    const rsiResponse = await fetch(`${baseURL}/sheets/10F2ON8N3phmbvKQNQFfKet44XoytFxA3SgUiIlHl6VY/read?range=Latest%20RSI!A:B`);
    const rsiResult = await rsiResponse.json();
    
    // Fetch MACD data
    const macdResponse = await fetch(`${baseURL}/sheets/10F2ON8N3phmbvKQNQFfKet44XoytFxA3SgUiIlHl6VY/read?range=Latest%20MACD!A:D`);
    const macdResult = await macdResponse.json();

    const rsiData = rsiResult.values ? rsiResult.values.slice(1).map((row: any[]) => ({
      symbol: row[0],
      rsi: row[1]
    })) : [];

    const macdData = macdResult.values ? macdResult.values.slice(1).map((row: any[]) => ({
      symbol: row[0],
      macd: row[1],
      macdSignal: row[2],
      macdHistogram: row[3]
    })) : [];

    // Combine RSI and MACD data
    return rsiData.map(rsiItem => {
      const macdItem = macdData.find(m => m.symbol === rsiItem.symbol);
      return { ...rsiItem, ...macdItem };
    });
  } catch (error) {
    throw new Error('Failed to fetch technical data from Google Sheets');
  }
};

// Hook for getting all stock data
export const useGoogleSheetsStockData = () => {
  return useQuery<StockData[]>({
    queryKey: ['googleSheetsStockData'],
    queryFn: fetchStockData,
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000, // 1 minute
  });
};

// Hook for getting technical data
export const useGoogleSheetsTechnicalData = () => {
  return useQuery<TechnicalData[]>({
    queryKey: ['googleSheetsTechnicalData'],
    queryFn: fetchTechnicalData,
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000, // 1 minute
  });
};

// Hook for getting specific stock data
export const useGoogleSheetsStockQuote = (symbol: string) => {
  return useQuery<StockData | null>({
    queryKey: ['googleSheetsStockQuote', symbol],
    queryFn: async () => {
      const allData = await fetchStockData();
      return allData.find(stock => stock.symbol === symbol) || null;
    },
    enabled: !!symbol,
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000, // 1 minute
  });
};

// Hook for getting specific technical data
export const useGoogleSheetsTechnicalQuote = (symbol: string) => {
  return useQuery<TechnicalData | null>({
    queryKey: ['googleSheetsTechnicalQuote', symbol],
    queryFn: async () => {
      const allData = await fetchTechnicalData();
      return allData.find(stock => stock.symbol === symbol) || null;
    },
    enabled: !!symbol,
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000, // 1 minute
  });
};

// Helper function to parse price and change data
export const parseStockData = (stock: StockData) => {
  const price = parseFloat(stock.price.replace(/[$,]/g, '')) || 0;
  const change = parseFloat(stock.change.replace(/[+%,]/g, '')) || 0;
  const changePercent = parseFloat(stock.changePercent.replace(/[+%,]/g, '')) || 0;
  
  // Enhanced market cap parsing
  let marketCap = 0;
  if (stock.marketCap) {
    // Remove common formatting characters
    const cleanMarketCap = stock.marketCap.toString().replace(/[$,BMTK\s]/gi, '');
    marketCap = parseFloat(cleanMarketCap) || 0;
    
    // Handle suffixes (B for billions, T for trillions, etc.)
    if (stock.marketCap.toString().toUpperCase().includes('T')) {
      marketCap *= 1e12;
    } else if (stock.marketCap.toString().toUpperCase().includes('B')) {
      marketCap *= 1e9;
    } else if (stock.marketCap.toString().toUpperCase().includes('M')) {
      marketCap *= 1e6;
    } else if (stock.marketCap.toString().toUpperCase().includes('K')) {
      marketCap *= 1e3;
    }
  }
  
  return {
    ...stock,
    price,
    change,
    changePercent,
    marketCap,
    isPositive: change >= 0,
    isNegative: change < 0
  };
}; 