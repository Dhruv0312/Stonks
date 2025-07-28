import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStockQuote } from "@/hooks/useFinnhub";
import { TrendingUp, TrendingDown, Minus, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CompanyLogoWithFallback } from "@/components/CompanyLogo";
import { formatPrice, formatChange, formatPercent } from "@/lib/utils";

interface LiveStock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

const popularSymbols = ['AAPL', 'TSLA', 'GOOGL', 'MSFT', 'NVDA', 'AMZN', 'META', 'NFLX'];

const getStockName = (symbol: string): string => {
  const names: Record<string, string> = {
    AAPL: 'Apple Inc.',
    TSLA: 'Tesla Inc.',
    GOOGL: 'Alphabet Inc.',
    MSFT: 'Microsoft Corp.',
    NVDA: 'NVIDIA Corp.',
    AMZN: 'Amazon.com Inc.',
    META: 'Meta Platforms Inc.',
    NFLX: 'Netflix Inc.',
  };
  return names[symbol] || symbol;
};

const getChangeIcon = (change: number) => {
  if (change > 0) return <TrendingUp className="h-4 w-4 text-green-500" />;
  if (change < 0) return <TrendingDown className="h-4 w-4 text-red-500" />;
  return <Minus className="h-4 w-4 text-muted-foreground" />;
};

const LiveStockTicker = () => {
  const navigate = useNavigate();
  const [stocks, setStocks] = useState<LiveStock[]>([]);
  const stockQuotes = popularSymbols.map(symbol => useStockQuote(symbol));

  useEffect(() => {
    const newStocks: LiveStock[] = stockQuotes
      .filter(quote => quote.data && !quote.isLoading)
      .map((quote, index) => ({
        symbol: popularSymbols[index],
        name: getStockName(popularSymbols[index]),
        price: quote.data?.c || 0,
        change: quote.data?.d || 0,
        changePercent: quote.data?.dp || 0,
      }))
      .filter(stock => stock.price > 0);
    setStocks(newStocks);
  }, [stockQuotes]);

  const handleStockClick = (symbol: string) => {
    navigate(`/dashboard?symbol=${symbol}`);
  };

  return (
    <Card className="card-matte animate-fade-in">
      <CardHeader className="text-center pb-6">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="icon-rounded">
            <Activity className="h-6 w-6 text-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            Live Market Ticker
          </CardTitle>
        </div>
        <p className="text-muted-foreground text-lg">
          Real-time stock prices and market movements
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Desktop Grid View */}
        <div className="hidden md:grid md:grid-cols-4 gap-4">
          {stocks.slice(0, 8).map((stock, index) => (
            <div 
              key={stock.symbol} 
              className="group cursor-pointer p-4 card-matte hover:bg-accent transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleStockClick(stock.symbol)}
            >
              <div className="flex items-center gap-3 mb-3">
                <CompanyLogoWithFallback 
                  symbol={stock.symbol}
                  companyName={stock.name}
                  size="w-10 h-10"
                />
                <div>
                  <div className="text-foreground font-bold text-lg">{stock.symbol}</div>
                  <div className="text-muted-foreground text-xs truncate max-w-20">{stock.name}</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-foreground font-bold text-xl flex items-center gap-2">
                  {formatPrice(stock.price)}
                  {getChangeIcon(stock.change)}
                </div>
                <div className={`text-sm font-semibold ${stock.change > 0 ? 'text-green-500' : stock.change < 0 ? 'text-red-500' : 'text-muted-foreground'}`}>
                  {formatChange(stock.change)} ({formatPercent(stock.changePercent)})
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Scrolling Ticker */}
        <div className="md:hidden">
          <div className="relative overflow-hidden">
            <div className="flex gap-4">
              {stocks.map((stock, index) => (
                <div 
                  key={stock.symbol} 
                  className="flex-shrink-0 w-64 p-4 card-matte cursor-pointer hover:bg-accent transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleStockClick(stock.symbol)}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <CompanyLogoWithFallback 
                      symbol={stock.symbol}
                      companyName={stock.name}
                      size="w-8 h-8"
                    />
                    <div>
                      <div className="text-foreground font-bold">{stock.symbol}</div>
                      <div className="text-muted-foreground text-xs truncate">{stock.name}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-foreground font-bold text-lg flex items-center gap-2">
                      {formatPrice(stock.price)}
                      {getChangeIcon(stock.change)}
                    </div>
                    <div className={`text-xs font-semibold ${stock.change > 0 ? 'text-green-500' : stock.change < 0 ? 'text-red-500' : 'text-muted-foreground'}`}>
                      {formatChange(stock.change)} ({formatPercent(stock.changePercent)})
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Market Status */}
        <div className="flex items-center justify-center gap-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground">Live data</span>
          </div>
          <div className="text-muted-foreground">|</div>
          <div className="text-sm text-muted-foreground">
            {stocks.length} stocks tracked
          </div>
          <div className="text-muted-foreground">|</div>
          <div className="text-sm text-muted-foreground">
            Click any stock for detailed analysis
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveStockTicker; 