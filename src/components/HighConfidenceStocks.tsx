import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Target, Zap, ArrowRight, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStockQuote } from "@/hooks/useAlphaVantage";
import { CompanyLogoWithFallback } from "@/components/CompanyLogo";
import { formatPrice, formatChange, formatPercent } from "@/lib/utils";

// Popular stocks for display
const popularStocks = [
  { symbol: "AAPL", name: "Apple Inc." },
  { symbol: "MSFT", name: "Microsoft Corp." },
  { symbol: "GOOGL", name: "Alphabet Inc." },
  { symbol: "AMZN", name: "Amazon.com Inc." },
  { symbol: "NVDA", name: "NVIDIA Corp." },
  { symbol: "TSLA", name: "Tesla Inc." },
  { symbol: "META", name: "Meta Platforms Inc." },
  { symbol: "NFLX", name: "Netflix Inc." }
];

const PopularStocks = () => {
  const navigate = useNavigate();

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (change < 0) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Activity className="h-4 w-4 text-muted-foreground" />;
  };

  return (
    <section className="py-16 bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Target className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Popular Stocks</h2>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real-time data for the most popular stocks in the market
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularStocks.map((stock) => {
            const { data: quote, isLoading } = useStockQuote(stock.symbol);
            
            return (
              <Card
                key={stock.symbol}
                className="card-matte hover:bg-accent cursor-pointer transition-all duration-300 group"
                onClick={() => navigate(`/dashboard?symbol=${stock.symbol}`)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <CompanyLogoWithFallback
                      symbol={stock.symbol}
                      companyName={stock.name}
                      size="w-12 h-12"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-foreground text-lg">{stock.symbol}</h3>
                      <div className="text-muted-foreground text-sm truncate">{stock.name}</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-sm">Current Price</span>
                      <div className="flex items-center gap-1">
                        <span className="text-foreground font-medium">
                          {isLoading ? 'Loading...' : quote ? formatPrice(quote.c) : '-'}
                        </span>
                        <Zap className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>

                    {quote && (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground text-sm">Change</span>
                          <div className={`flex items-center gap-1 ${
                            quote.d > 0 ? 'text-green-500' : 
                            quote.d < 0 ? 'text-red-500' : 'text-muted-foreground'
                          }`}>
                            {getChangeIcon(quote.d)}
                            <span className="text-sm font-medium">
                              {formatChange(quote.d)} ({formatPercent(quote.dp)})
                            </span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground text-sm">Volume</span>
                          <div className="flex items-center gap-1">
                            <span className="text-foreground text-sm">
                              {quote.t ? new Date(quote.t).toLocaleTimeString() : '-'}
                            </span>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <Button 
                    className="w-full mt-4 btn-matte group-hover:bg-primary/90"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/dashboard?symbol=${stock.symbol}`);
                    }}
                  >
                    View Details
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Button 
            onClick={() => navigate('/all-stocks')} 
            className="btn-matte"
          >
            View All Stocks
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PopularStocks; 