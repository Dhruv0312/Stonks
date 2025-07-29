import { useQuery } from '@tanstack/react-query';
import { googleSheetsService, GoogleStockQuote, GoogleCandleData, GoogleSheetStockRow } from '@/services/googleSheets';

// Hook to get all stocks from Google Sheets
export const useGoogleAllStocks = () => {
  return useQuery<GoogleSheetStockRow[]>({
    queryKey: ['googleAllStocks'],
    queryFn: () => googleSheetsService.getAllStocks(),
    refetchInterval: 300000, // Refetch every 5 minutes
    staleTime: 240000, // Consider data stale after 4 minutes
  });
};

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

// Hook to get multiple stock quotes
export const useGoogleMultipleQuotes = (symbols: string[]) => {
  return useQuery<GoogleStockQuote[]>({
    queryKey: ['googleMultipleQuotes', symbols],
    queryFn: () => googleSheetsService.getMultipleQuotes(symbols),
    enabled: symbols.length > 0,
    refetchInterval: 300000, // Refetch every 5 minutes
    staleTime: 240000, // Consider data stale after 4 minutes
  });
};

// Hook to get top gainers
export const useGoogleTopGainers = (limit: number = 10) => {
  return useQuery<GoogleSheetStockRow[]>({
    queryKey: ['googleTopGainers', limit],
    queryFn: () => googleSheetsService.getTopGainers(limit),
    refetchInterval: 300000, // Refetch every 5 minutes
    staleTime: 240000, // Consider data stale after 4 minutes
  });
};

// Hook to get top losers
export const useGoogleTopLosers = (limit: number = 10) => {
  return useQuery<GoogleSheetStockRow[]>({
    queryKey: ['googleTopLosers', limit],
    queryFn: () => googleSheetsService.getTopLosers(limit),
    refetchInterval: 300000, // Refetch every 5 minutes
    staleTime: 240000, // Consider data stale after 4 minutes
  });
};

// Hook to search stocks
export const useGoogleStockSearch = (query: string) => {
  return useQuery<GoogleSheetStockRow[]>({
    queryKey: ['googleStockSearch', query],
    queryFn: () => googleSheetsService.searchStocks(query),
    enabled: query.length > 0,
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

// Hook to get candle data for charts (limited functionality with current sheet)
export const useGoogleCandles = (symbol: string) => {
  return useQuery<GoogleCandleData>({
    queryKey: ['googleCandles', symbol],
    queryFn: () => googleSheetsService.getCandles(symbol),
    enabled: !!symbol,
    staleTime: 300000, // Consider data stale after 5 minutes
  });
}; 