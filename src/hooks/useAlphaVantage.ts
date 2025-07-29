import { useQuery } from '@tanstack/react-query';
import { alphaVantageService, StockQuote, CompanyProfile, NewsItem, CandleData } from '@/services/alphaVantage';

export const useStockQuote = (symbol: string) => {
  return useQuery({
    queryKey: ['stockQuote', symbol],
    queryFn: () => alphaVantageService.getStockQuote(symbol),
    enabled: !!symbol,
    refetchInterval: 300000, // Refetch every 5 minutes
    staleTime: 240000, // Consider data stale after 4 minutes
  });
};

export const useCompanyProfile = (symbol: string) => {
  return useQuery({
    queryKey: ['companyProfile', symbol],
    queryFn: () => alphaVantageService.getCompanyProfile(symbol),
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
    queryFn: () => alphaVantageService.getCompanyNews(symbol, from, to),
    enabled: !!symbol,
    staleTime: 600000, // Consider data stale after 10 minutes
  });
};

export const useMarketNews = (category: string = 'general') => {
  return useQuery({
    queryKey: ['marketNews', category],
    queryFn: () => alphaVantageService.getMarketNews(category),
    staleTime: 300000, // Consider data stale after 5 minutes
  });
};

export const useStockCandles = (symbol: string, resolution: string = 'D', days: number = 30) => {
  return useQuery<CandleData>({
    queryKey: ['stockCandles', symbol, resolution, days],
    queryFn: () => alphaVantageService.getCandles(symbol, resolution, days),
    enabled: !!symbol,
    staleTime: 300000, // Consider data stale after 5 minutes
  });
}; 