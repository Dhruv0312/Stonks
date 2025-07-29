import { useQuery } from '@tanstack/react-query';
import { googleSheetsService, GoogleStockQuote, GoogleCandleData } from '@/services/googleSheets';

// Hook to get stock quote from Google Sheets
export const useGoogleStockQuote = (symbol: string) => {
  return useQuery<GoogleStockQuote | null>({
    queryKey: ['googleStockQuote', symbol],
    queryFn: () => googleSheetsService.getStockQuote(symbol),
    enabled: !!symbol,
    refetchInterval: 300000, // Refetch every 5 minutes
    staleTime: 240000, // Consider data stale after 4 minutes
  });
};

// Hook to get historical data from Google Sheets
export const useGoogleStockHistory = (symbol: string) => {
  return useQuery({
    queryKey: ['googleStockHistory', symbol],
    queryFn: () => googleSheetsService.getStockHistory(symbol),
    enabled: !!symbol,
    staleTime: 300000, // Consider data stale after 5 minutes
  });
};

// Hook to get candle data for charts from Google Sheets
export const useGoogleCandles = (symbol: string) => {
  return useQuery<GoogleCandleData>({
    queryKey: ['googleCandles', symbol],
    queryFn: () => googleSheetsService.getCandles(symbol),
    enabled: !!symbol,
    staleTime: 300000, // Consider data stale after 5 minutes
  });
};

// Hook to get available symbols from Google Sheets
export const useGoogleAvailableSymbols = () => {
  return useQuery<string[]>({
    queryKey: ['googleAvailableSymbols'],
    queryFn: () => googleSheetsService.getAvailableSymbols(),
    staleTime: 600000, // Consider data stale after 10 minutes
  });
};

// Hook to test Google Sheets connection
export const useGoogleSheetsConnection = () => {
  return useQuery<boolean>({
    queryKey: ['googleSheetsConnection'],
    queryFn: () => googleSheetsService.testConnection(),
    staleTime: 300000, // Consider data stale after 5 minutes
  });
}; 