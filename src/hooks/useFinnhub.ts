import { useQuery } from '@tanstack/react-query';
import { finnhubService, StockQuote, CompanyProfile, NewsItem, CandleData } from '@/services/finnhub';

export const useStockQuote = (symbol: string) => {
  return useQuery({
    queryKey: ['stockQuote', symbol],
    queryFn: () => finnhubService.getStockQuote(symbol),
    enabled: !!symbol,
    refetchInterval: 300000, // Refetch every 5 minutes instead of 30 seconds
    staleTime: 240000, // Consider data stale after 4 minutes
  });
};

export const useCompanyProfile = (symbol: string) => {
  return useQuery({
    queryKey: ['companyProfile', symbol],
    queryFn: () => finnhubService.getCompanyProfile(symbol),
    enabled: !!symbol,
    staleTime: 300000, // Consider data stale after 5 minutes
  });
};

export const useCompanyNews = (symbol: string) => {
  // Get news from the last 7 days
  const to = new Date().toISOString().split('T')[0];
  const from = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  return useQuery({
    queryKey: ['companyNews', symbol, from, to],
    queryFn: () => finnhubService.getCompanyNews(symbol, from, to),
    enabled: !!symbol,
    staleTime: 600000, // Consider data stale after 10 minutes
  });
};

export const useMarketNews = (category: string = 'general') => {
  return useQuery({
    queryKey: ['marketNews', category],
    queryFn: () => finnhubService.getMarketNews(category),
    staleTime: 300000, // Consider data stale after 5 minutes
  });
};

export const useStockCandles = (symbol: string, resolution: string = 'D', days: number = 30) => {
  const to = Math.floor(Date.now() / 1000);
  const from = to - (days * 24 * 60 * 60);

  return useQuery<CandleData>({
    queryKey: ['stockCandles', symbol, resolution, from, to],
    queryFn: () => finnhubService.getCandles(symbol, resolution, from, to),
    enabled: !!symbol,
    staleTime: 300000, // Consider data stale after 5 minutes
  });
}; 