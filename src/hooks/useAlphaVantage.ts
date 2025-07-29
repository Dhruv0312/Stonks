import { useQuery } from '@tanstack/react-query';
import { alphaVantageService, StockQuote, CompanyProfile, NewsItem, CandleData } from '@/services/alphaVantage';

export const useStockQuote = (symbol: string) => {
  return useQuery({
    queryKey: ['stockQuote', symbol],
    queryFn: () => alphaVantageService.getStockQuote(symbol),
    enabled: !!symbol,
    refetchInterval: false, // Disable auto-refetch to save API calls
    staleTime: 1000 * 60 * 60 * 24, // Consider data fresh for 24 hours
    gcTime: 1000 * 60 * 60 * 24 * 7, // Keep in cache for 7 days
    retry: 1, // Only retry once to save API calls
  });
};

export const useCompanyProfile = (symbol: string) => {
  return useQuery({
    queryKey: ['companyProfile', symbol],
    queryFn: () => alphaVantageService.getCompanyProfile(symbol),
    enabled: !!symbol,
    staleTime: 1000 * 60 * 60 * 24 * 7, // Company profiles rarely change
    gcTime: 1000 * 60 * 60 * 24 * 30, // Keep in cache for 30 days
    retry: 1,
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
    staleTime: 1000 * 60 * 60 * 6, // News updates every 6 hours
    gcTime: 1000 * 60 * 60 * 24, // Keep in cache for 24 hours
    retry: 1,
  });
};

export const useMarketNews = (category: string = 'general') => {
  return useQuery({
    queryKey: ['marketNews', category],
    queryFn: () => alphaVantageService.getMarketNews(category),
    staleTime: 1000 * 60 * 60 * 6, // News updates every 6 hours
    gcTime: 1000 * 60 * 60 * 24, // Keep in cache for 24 hours
    retry: 1,
  });
};

export const useStockCandles = (symbol: string, resolution: string = 'D', days: number = 30) => {
  return useQuery<CandleData>({
    queryKey: ['stockCandles', symbol, resolution, days],
    queryFn: () => alphaVantageService.getCandles(symbol, resolution, days),
    enabled: !!symbol,
    staleTime: 1000 * 60 * 60 * 24, // Historical data doesn't change often
    gcTime: 1000 * 60 * 60 * 24 * 7, // Keep in cache for 7 days
    retry: 1,
  });
}; 