import React from 'react';
import { useStockData } from '@/hooks/useGoogleSheetsStockData';
import { CompanyLogoWithFallback } from '@/components/CompanyLogo';
import { formatPrice, formatChange, formatPercent } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Helper function to parse stock data
const parseStockData = (stock: any) => {
  const price = parseFloat(stock.price?.replace(/[$,]/g, '')) || 0;
  const change = parseFloat(stock.change?.replace(/[+%,]/g, '')) || 0;
  const changePercent = parseFloat(stock.changePercent?.replace(/[+%,]/g, '')) || 0;
  
  return {
    ...stock,
    price,
    change,
    changePercent,
    isPositive: change >= 0,
    isNegative: change < 0
  };
};

// Reduced list of stocks for ticker to save API calls
const tickerStocks = [
  { symbol: "AAPL", name: "Apple" },
  { symbol: "MSFT", name: "Microsoft" },
  { symbol: "GOOGL", name: "Alphabet" },
  { symbol: "AMZN", name: "Amazon" },
  { symbol: "NVDA", name: "NVIDIA" }
];

const LiveStockTicker = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  // Only fetch data for the currently visible stock
  const currentStock = tickerStocks[currentIndex];
  const { data: allStockData, isLoading, error } = useStockData();
  const stockData = allStockData?.find((stock: any) => stock.symbol === currentStock.symbol);
  const parsedData = stockData ? parseStockData(stockData) : null;

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % tickerStocks.length);
    }, 3000); // Change stock every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (change < 0) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  };

  return (
    <Card className="card-matte">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Live Market Ticker
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between p-4 card-matte border border-border">
          <div className="flex items-center gap-3">
            <div className="text-foreground font-bold text-lg">
              {currentStock.symbol}
            </div>
            <div className="text-muted-foreground text-sm">
              {currentStock.name}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
                         {error ? (
               <div className="text-orange-500 text-sm flex items-center gap-1">
                 <Activity className="h-4 w-4" />
                 Data Unavailable
               </div>
             ) : (
              <>
                <div className="text-foreground font-bold text-lg">
                  {isLoading ? 'Loading...' : parsedData ? `$${parsedData.price.toFixed(2)}` : '-'}
                </div>
                {parsedData && (
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    parsedData.isPositive ? 'text-green-500' : parsedData.isNegative ? 'text-red-500' : 'text-muted-foreground'
                  }`}>
                    {getChangeIcon(parsedData.change)}
                    <span>
                      {parsedData.isPositive ? '+' : ''}{parsedData.change.toFixed(2)} ({parsedData.changePercent.toFixed(2)}%)
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        
        <div className="flex justify-center mt-4">
          <div className="flex gap-1">
            {tickerStocks.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveStockTicker; 