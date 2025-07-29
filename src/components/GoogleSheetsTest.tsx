import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  useGoogleAllStocks, 
  useGoogleStockQuote, 
  useGoogleTopGainers, 
  useGoogleTopLosers,
  useGoogleStockSearch,
  useGoogleSheetsConnection 
} from '@/hooks/useGoogleSheets';
import { formatPrice } from '@/lib/utils';

export const GoogleSheetsTest: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSymbol, setSelectedSymbol] = useState('AAPL');

  // Test connection
  const { data: isConnected, isLoading: connectionLoading } = useGoogleSheetsConnection();
  
  // Get all stocks
  const { data: allStocks, isLoading: stocksLoading } = useGoogleAllStocks();
  
  // Get specific stock quote
  const { data: stockQuote, isLoading: quoteLoading } = useGoogleStockQuote(selectedSymbol);
  
  // Get top gainers and losers
  const { data: topGainers } = useGoogleTopGainers(5);
  const { data: topLosers } = useGoogleTopLosers(5);
  
  // Search stocks
  const { data: searchResults } = useGoogleStockSearch(searchQuery);

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Google Sheets Integration Test</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Connection Status */}
            <div className="flex items-center gap-2">
              <span className="font-medium">Connection Status:</span>
              {connectionLoading ? (
                <Badge variant="secondary">Testing...</Badge>
              ) : isConnected ? (
                <Badge variant="default" className="bg-green-500">Connected</Badge>
              ) : (
                <Badge variant="destructive">Failed</Badge>
              )}
            </div>

            {/* Stock Count */}
            {allStocks && (
              <div>
                <span className="font-medium">Available Stocks: </span>
                <Badge variant="outline">{allStocks.length}</Badge>
              </div>
            )}

            {/* Search */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Search Stocks:</label>
              <Input
                placeholder="Search by symbol or company name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchResults && searchResults.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {searchResults.slice(0, 6).map((stock) => (
                    <div
                      key={stock.symbol}
                      className="p-2 border rounded cursor-pointer hover:bg-gray-50"
                      onClick={() => setSelectedSymbol(stock.symbol)}
                    >
                      <div className="font-medium">{stock.symbol}</div>
                      <div className="text-sm text-gray-600">{stock.companyName}</div>
                      <div className="text-sm font-medium">{formatPrice(stock.currentPrice)}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Stock Quote */}
      {stockQuote && (
        <Card>
          <CardHeader>
            <CardTitle>{stockQuote.symbol} - {stockQuote.companyName}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-gray-600">Current Price</div>
                <div className="text-xl font-bold">{formatPrice(stockQuote.c)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Change</div>
                <div className={`text-lg font-medium ${stockQuote.d >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stockQuote.d >= 0 ? '+' : ''}{formatPrice(stockQuote.d)}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">% Change</div>
                <div className={`text-lg font-medium ${stockQuote.dp >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stockQuote.dp >= 0 ? '+' : ''}{stockQuote.dp.toFixed(2)}%
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Previous Close</div>
                <div className="text-lg font-medium">{formatPrice(stockQuote.pc)}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Top Gainers and Losers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Gainers */}
        <Card>
          <CardHeader>
            <CardTitle className="text-green-600">Top Gainers</CardTitle>
          </CardHeader>
          <CardContent>
            {topGainers ? (
              <div className="space-y-2">
                {topGainers.map((stock) => (
                  <div
                    key={stock.symbol}
                    className="flex justify-between items-center p-2 border rounded cursor-pointer hover:bg-gray-50"
                    onClick={() => setSelectedSymbol(stock.symbol)}
                  >
                    <div>
                      <div className="font-medium">{stock.symbol}</div>
                      <div className="text-sm text-gray-600">{stock.companyName}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{formatPrice(stock.currentPrice)}</div>
                      <div className="text-sm text-green-600">+{stock.percentChange.toFixed(2)}%</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500">Loading...</div>
            )}
          </CardContent>
        </Card>

        {/* Top Losers */}
        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">Top Losers</CardTitle>
          </CardHeader>
          <CardContent>
            {topLosers ? (
              <div className="space-y-2">
                {topLosers.map((stock) => (
                  <div
                    key={stock.symbol}
                    className="flex justify-between items-center p-2 border rounded cursor-pointer hover:bg-gray-50"
                    onClick={() => setSelectedSymbol(stock.symbol)}
                  >
                    <div>
                      <div className="font-medium">{stock.symbol}</div>
                      <div className="text-sm text-gray-600">{stock.companyName}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{formatPrice(stock.currentPrice)}</div>
                      <div className="text-sm text-red-600">{stock.percentChange.toFixed(2)}%</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500">Loading...</div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Sample Stock List */}
      {allStocks && (
        <Card>
          <CardHeader>
            <CardTitle>Sample Stocks (First 20)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
              {allStocks.slice(0, 20).map((stock) => (
                <div
                  key={stock.symbol}
                  className="p-2 border rounded cursor-pointer hover:bg-gray-50"
                  onClick={() => setSelectedSymbol(stock.symbol)}
                >
                  <div className="font-medium">{stock.symbol}</div>
                  <div className="text-sm text-gray-600 truncate">{stock.companyName}</div>
                  <div className="text-sm font-medium">{formatPrice(stock.currentPrice)}</div>
                  <div className={`text-xs ${stock.percentChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stock.percentChange >= 0 ? '+' : ''}{stock.percentChange.toFixed(2)}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}; 