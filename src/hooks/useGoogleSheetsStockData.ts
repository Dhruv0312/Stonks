import { useQuery } from '@tanstack/react-query';
import googleSheetsAPI from '../services/googleSheetsAPI';

// Hook to fetch stock data from Google Sheets
export const useStockData = () => {
  return useQuery({
    queryKey: ['stockData'],
    queryFn: async () => {
      const response = await googleSheetsAPI.getStockData();
      return response.values || [];
    },
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
  });
};

// Hook to fetch technical data from Google Sheets
export const useTechnicalData = () => {
  return useQuery({
    queryKey: ['technicalData'],
    queryFn: async () => {
      const response = await googleSheetsAPI.getTechnicalData();
      return response.values || [];
    },
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
  });
};

// Hook to fetch watchlist data from Google Sheets
export const useWatchlistData = () => {
  return useQuery({
    queryKey: ['watchlistData'],
    queryFn: async () => {
      const response = await googleSheetsAPI.getWatchlistData();
      return response.values || [];
    },
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
  });
}; 