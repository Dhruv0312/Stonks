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
    <Card className="w-full max-w-2xl mx-auto bg-gradient-card shadow-card border-border/30 rounded-2xl backdrop-blur-sm card-hover">
      <CardContent className="p-10">
        <div className="space-y-8">
          {/* Enhanced Search Input */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gradient-primary">
              Enter Stock Symbol
            </label>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="e.g., AAPL, TSLA, GOOGL"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-12 h-14 bg-background/50 border-border/50 focus:border-primary rounded-xl text-lg transition-all duration-300 hover:shadow-soft focus:shadow-glow"
                />
              </div>
              <Button
                onClick={handleSearch}
                disabled={!symbol.trim() || isLoading}
                className="h-14 px-8 bg-gradient-primary hover:bg-gradient-rainbow rounded-xl shadow-glow hover:shadow-purple transition-all duration-300 hover:scale-105"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Analyzing...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    Predict
                  </div>
                )}
              </Button>
            </div>
          </div>

          {/* Enhanced Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-success/10 to-success/5 border border-success/20 shadow-success hover:shadow-success transition-all duration-300 hover:scale-105">
              <div className="relative">
                <TrendingUp className="h-6 w-6 text-success" />
                <div className="absolute inset-0 h-6 w-6 text-success/20 blur-sm">
                  <TrendingUp className="h-6 w-6" />
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-success">AI Predictions</div>
                <div className="text-xs text-muted-foreground">1-day & 7-day forecasts</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-secondary-purple/10 to-secondary-purple/5 border border-secondary-purple/20 shadow-purple hover:shadow-purple transition-all duration-300 hover:scale-105">
              <div className="relative">
                <BarChart3 className="h-6 w-6 text-secondary-purple" />
                <div className="absolute inset-0 h-6 w-6 text-secondary-purple/20 blur-sm">
                  <BarChart3 className="h-6 w-6" />
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-secondary-purple">Live Charts</div>
                <div className="text-xs text-muted-foreground">Real-time market data</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-accent-orange/10 to-accent-orange/5 border border-accent-orange/20 shadow-accent hover:shadow-accent transition-all duration-300 hover:scale-105">
              <div className="relative">
                <Brain className="h-6 w-6 text-accent-orange" />
                <div className="absolute inset-0 h-6 w-6 text-accent-orange/20 blur-sm">
                  <Brain className="h-6 w-6" />
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-accent-orange">Smart Insights</div>
                <div className="text-xs text-muted-foreground">Technical indicators</div>
              </div>
            </div>
          </div>

          {/* Enhanced Popular Stocks */}
          <div className="space-y-4">
            <div className="text-sm font-medium text-gradient-primary">Popular Stocks</div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {popularStocks.map((stock, index) => (
                <button
                  key={stock.symbol}
                  onClick={() => setSymbol(stock.symbol)}
                  className={`p-4 text-left rounded-xl bg-gradient-to-r transition-all duration-300 border hover:scale-105 ${
                    index % 3 === 0 
                      ? 'from-primary/5 to-primary/10 border-primary/20 hover:border-primary/40 hover:shadow-glow' 
                      : index % 3 === 1 
                      ? 'from-accent/5 to-accent/10 border-accent/20 hover:border-accent/40 hover:shadow-success'
                      : 'from-secondary-purple/5 to-secondary-purple/10 border-secondary-purple/20 hover:border-secondary-purple/40 hover:shadow-purple'
                  }`}
                >
                  <div className={`text-sm font-medium ${
                    index % 3 === 0 ? 'text-primary' : index % 3 === 1 ? 'text-accent' : 'text-secondary-purple'
                  }`}>
                    {stock.symbol}
                  </div>
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