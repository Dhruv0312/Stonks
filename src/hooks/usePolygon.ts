import { useQuery } from '@tanstack/react-query';
import { polygonService, PolygonAggregatesResponse, PolygonTickerDetails } from '@/services/polygon';

export const usePolygonAggregates = (ticker: string, period: string = '1M') => {
  const { from, to } = polygonService.getDateRange(period);
  
  return useQuery<PolygonAggregatesResponse>({
    queryKey: ['polygonAggregates', ticker, period, from, to],
    queryFn: () => polygonService.getAggregates(ticker, 1, 'day', from, to),
    enabled: !!ticker,
    staleTime: 300000, // Consider data stale after 5 minutes
    refetchInterval: 60000, // Refetch every minute for real-time data
  });
};

export const usePolygonTickerDetails = (ticker: string) => {
  return useQuery<PolygonTickerDetails>({
    queryKey: ['polygonTickerDetails', ticker],
    queryFn: () => polygonService.getTickerDetails(ticker),
    enabled: !!ticker,
    staleTime: 300000, // Consider data stale after 5 minutes
  });
};

export const usePolygonPreviousClose = (ticker: string) => {
  return useQuery({
    queryKey: ['polygonPreviousClose', ticker],
    queryFn: () => polygonService.getPreviousClose(ticker),
    enabled: !!ticker,
    staleTime: 300000, // Consider data stale after 5 minutes
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};

export const usePolygonNews = (ticker: string, limit: number = 10) => {
  const now = new Date();
  const published_utc_gte = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const published_utc_lte = now.toISOString();

  return useQuery({
    queryKey: ['polygonNews', ticker, published_utc_gte, published_utc_lte, limit],
    queryFn: () => polygonService.getTickerNews(ticker, published_utc_gte, published_utc_lte, limit),
    enabled: !!ticker,
    staleTime: 600000, // Consider data stale after 10 minutes
  });
}; 