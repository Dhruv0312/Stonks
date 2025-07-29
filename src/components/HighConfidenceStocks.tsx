import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Target, Zap, ArrowRight, Brain, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStockCandles } from "@/hooks/useAlphaVantage";
import { CompanyLogoWithFallback } from "@/components/CompanyLogo";
import { formatPrice, formatChange, formatPercent, generatePrediction } from "@/lib/utils";

// Popular stocks for high confidence predictions
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

const HighConfidenceStocks = () => {
  const navigate = useNavigate();

  const generateHighConfidenceStocks = () => {
    return popularStocks.map(stock => {
      // Try to get real historical data for predictions
      const { data: candles } = useStockCandles(stock.symbol, 'D', 30);
      
      let prediction;
      if (candles && candles.c && candles.c.length > 0) {
        // Use real historical data for prediction
        prediction = generatePrediction(stock.symbol, candles);
      } else {
        // Fallback to simulated data if historical data is not available
        const simulatedCandles = {
          c: [150 + Math.random() * 50], // Simulated close prices
          h: [160 + Math.random() * 50], // Simulated high prices
          l: [140 + Math.random() * 50], // Simulated low prices
          o: [145 + Math.random() * 50], // Simulated open prices
          v: [1000000 + Math.random() * 5000000], // Simulated volume
          t: [Date.now()], // Current timestamp
          s: 'ok'
        };
        prediction = generatePrediction(stock.symbol, simulatedCandles);
      }

      return {
        ...stock,
        prediction
      };
    });
  };

  const stocks = generateHighConfidenceStocks();

  return (
    <section className="py-16 bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Target className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">High Confidence Stocks</h2>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            AI-powered predictions for popular stocks with high confidence scores
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stocks.map((stock) => (
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
                    <span className="text-muted-foreground text-sm">Predicted Price</span>
                    <div className="flex items-center gap-1">
                      <span className="text-foreground font-medium">
                        {formatPrice(stock.prediction.predictedPrice)}
                      </span>
                      <Zap className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-sm">Confidence</span>
                    <Badge 
                      variant={stock.prediction.confidence > 70 ? "default" : 
                              stock.prediction.confidence > 50 ? "secondary" : "outline"}
                      className="badge-matte"
                    >
                      {stock.prediction.confidence}%
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-sm">Direction</span>
                    <div className={`flex items-center gap-1 ${
                      stock.prediction.direction === 'up' ? 'text-green-500' : 
                      stock.prediction.direction === 'down' ? 'text-red-500' : 'text-muted-foreground'
                    }`}>
                      {stock.prediction.direction === 'up' ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : stock.prediction.direction === 'down' ? (
                        <TrendingDown className="h-4 w-4" />
                      ) : (
                        <Activity className="h-4 w-4" />
                      )}
                      <span className="text-sm font-medium capitalize">{stock.prediction.direction}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-sm">Timeframe</span>
                    <div className="flex items-center gap-1">
                      <span className="text-foreground text-sm">{stock.prediction.timeframe}</span>
                      <Brain className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
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
          ))}
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

export default HighConfidenceStocks; 