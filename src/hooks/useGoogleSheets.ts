import { useState, useEffect, useCallback } from 'react';
import { GoogleSheetsAPIService, StockData, PredictionData, initializeGoogleSheetsAPI } from '../services/googleSheetsAPI';

export function useGoogleSheets(spreadsheetId?: string) {
  const [sheetsService, setSheetsService] = useState<GoogleSheetsAPIService | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize the service
  useEffect(() => {
    const initService = async () => {
      try {
        setLoading(true);
        setError(null);
        const service = await initializeGoogleSheetsAPI(spreadsheetId);
        setSheetsService(service);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize Google Sheets');
      } finally {
        setLoading(false);
      }
    };

    initService();
  }, [spreadsheetId]);

  // Read stock data
  const readStockData = useCallback(async (range?: string) => {
    if (!sheetsService) throw new Error('Google Sheets service not initialized');
    
    try {
      setLoading(true);
      setError(null);
      const data = await sheetsService.readStockData(range);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to read stock data';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [sheetsService]);

  // Write stock data
  const writeStockData = useCallback(async (data: StockData[], range?: string) => {
    if (!sheetsService) throw new Error('Google Sheets service not initialized');
    
    try {
      setLoading(true);
      setError(null);
      const result = await sheetsService.writeStockData(data, range);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to write stock data';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [sheetsService]);

  // Write prediction data
  const writePredictionData = useCallback(async (data: PredictionData[], range?: string) => {
    if (!sheetsService) throw new Error('Google Sheets service not initialized');
    
    try {
      setLoading(true);
      setError(null);
      const result = await sheetsService.writePredictionData(data, range);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to write prediction data';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [sheetsService]);

  // Append stock data
  const appendStockData = useCallback(async (data: StockData[], range?: string) => {
    if (!sheetsService) throw new Error('Google Sheets service not initialized');
    
    try {
      setLoading(true);
      setError(null);
      const result = await sheetsService.appendStockData(data, range);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to append stock data';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [sheetsService]);

  // Get spreadsheet info
  const getSpreadsheetInfo = useCallback(async () => {
    if (!sheetsService) throw new Error('Google Sheets service not initialized');
    
    try {
      setLoading(true);
      setError(null);
      const info = await sheetsService.getSpreadsheetInfo();
      return info;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get spreadsheet info';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [sheetsService]);

  // Clear range
  const clearRange = useCallback(async (range: string) => {
    if (!sheetsService) throw new Error('Google Sheets service not initialized');
    
    try {
      setLoading(true);
      setError(null);
      const result = await sheetsService.clearRange(range);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to clear range';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [sheetsService]);

  return {
    sheetsService,
    loading,
    error,
    readStockData,
    writeStockData,
    writePredictionData,
    appendStockData,
    getSpreadsheetInfo,
    clearRange,
  };
} 