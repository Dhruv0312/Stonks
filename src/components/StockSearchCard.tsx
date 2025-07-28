import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, TrendingUp, BarChart3, Brain } from "lucide-react";

const StockSearchCard = () => {
  const [symbol, setSymbol] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!symbol.trim()) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to dashboard with symbol
      window.location.href = `/dashboard?symbol=${symbol.toUpperCase()}`;
    }, 1000);
  };

  const popularStocks = [
    { symbol: "AAPL", name: "Apple Inc." },
    { symbol: "TSLA", name: "Tesla Inc." },
    { symbol: "GOOGL", name: "Alphabet Inc." },
    { symbol: "MSFT", name: "Microsoft Corp." },
    { symbol: "NVDA", name: "NVIDIA Corp." },
    { symbol: "AMZN", name: "Amazon.com Inc." }
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-card shadow-card border-border/50">
      <CardContent className="p-8">
        <div className="space-y-6">
          {/* Search Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Enter Stock Symbol
            </label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="e.g., AAPL, TSLA, GOOGL"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-10 h-12 bg-background/50 border-border/50 focus:border-primary"
                />
              </div>
              <Button
                onClick={handleSearch}
                disabled={!symbol.trim() || isLoading}
                className="h-12 px-8 bg-gradient-primary hover:opacity-90"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Analyzing...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    Predict
                  </div>
                )}
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-background/30">
              <TrendingUp className="h-5 w-5 text-success" />
              <div>
                <div className="text-sm font-medium">AI Predictions</div>
                <div className="text-xs text-muted-foreground">1-day & 7-day forecasts</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-background/30">
              <BarChart3 className="h-5 w-5 text-primary" />
              <div>
                <div className="text-sm font-medium">Live Charts</div>
                <div className="text-xs text-muted-foreground">Real-time market data</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-background/30">
              <Brain className="h-5 w-5 text-accent" />
              <div>
                <div className="text-sm font-medium">Smart Insights</div>
                <div className="text-xs text-muted-foreground">Technical indicators</div>
              </div>
            </div>
          </div>

          {/* Popular Stocks */}
          <div className="space-y-3">
            <div className="text-sm font-medium text-muted-foreground">Popular Stocks</div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {popularStocks.map((stock) => (
                <button
                  key={stock.symbol}
                  onClick={() => setSymbol(stock.symbol)}
                  className="p-3 text-left rounded-lg bg-background/30 hover:bg-background/50 transition-colors border border-border/30 hover:border-primary/30"
                >
                  <div className="text-sm font-medium">{stock.symbol}</div>
                  <div className="text-xs text-muted-foreground truncate">{stock.name}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StockSearchCard;