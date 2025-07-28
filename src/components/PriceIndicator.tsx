import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus, DollarSign } from 'lucide-react';
import { StockQuote } from '@/services/finnhub';

interface PriceIndicatorProps {
  quote: StockQuote;
  symbol: string;
}

const PriceIndicator = ({ quote, symbol }: PriceIndicatorProps) => {
  const isPositive = quote.d >= 0;
  const isNeutral = quote.d === 0;

  // Calculate price range for visualization
  const priceRange = quote.h - quote.l;
  const currentPosition = ((quote.c - quote.l) / priceRange) * 100;

  return (
    <Card className="bg-gradient-card border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Price Overview</span>
          <div className={`flex items-center gap-1 ${isPositive ? 'text-success' : isNeutral ? 'text-muted-foreground' : 'text-destructive'}`}>
            {isPositive ? <TrendingUp className="h-4 w-4" /> : isNeutral ? <Minus className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            <span className="text-sm font-medium">
              {isPositive ? '+' : ''}{quote.d.toFixed(2)} ({isPositive ? '+' : ''}{quote.dp.toFixed(2)}%)
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Price Display */}
        <div className="text-center">
          <div className="text-3xl font-bold mb-2">${quote.c.toFixed(2)}</div>
          <div className="text-sm text-muted-foreground">
            {symbol} • {new Date().toLocaleDateString()}
          </div>
        </div>

        {/* Price Range Visualization */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Day Range</span>
            <span className="font-medium">${quote.l.toFixed(2)} - ${quote.h.toFixed(2)}</span>
          </div>
          
          <div className="relative h-3 bg-background/30 rounded-full overflow-hidden">
            <div 
              className={`absolute top-0 h-full transition-all duration-1000 ${
                isPositive ? 'bg-success' : isNeutral ? 'bg-muted' : 'bg-destructive'
              }`}
              style={{ 
                left: `${currentPosition}%`,
                width: '2px'
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-primary rounded-full shadow-lg" />
            </div>
          </div>
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Low: ${quote.l.toFixed(2)}</span>
            <span>High: ${quote.h.toFixed(2)}</span>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/30">
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Open</div>
            <div className="text-lg font-semibold">${quote.o.toFixed(2)}</div>
            <Badge 
              variant="secondary" 
              className={`mt-1 text-xs ${
                quote.c > quote.o ? 'bg-success/20 text-success' : quote.c < quote.o ? 'bg-destructive/20 text-destructive' : 'bg-muted'
              }`}
            >
              {quote.c > quote.o ? 'Above Open' : quote.c < quote.o ? 'Below Open' : 'At Open'}
            </Badge>
          </div>
          
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Previous Close</div>
            <div className="text-lg font-semibold">${quote.pc.toFixed(2)}</div>
            <Badge 
              variant="secondary" 
              className={`mt-1 text-xs ${
                quote.c > quote.pc ? 'bg-success/20 text-success' : quote.c < quote.pc ? 'bg-destructive/20 text-destructive' : 'bg-muted'
              }`}
            >
              {quote.c > quote.pc ? 'Above Close' : quote.c < quote.pc ? 'Below Close' : 'At Close'}
            </Badge>
          </div>
        </div>

        {/* Price Movement Indicator */}
        <div className="p-4 rounded-lg bg-background/30 border border-border/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Today's Movement</span>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Change</span>
              <span className={`font-medium ${isPositive ? 'text-success' : isNeutral ? 'text-muted-foreground' : 'text-destructive'}`}>
                {isPositive ? '+' : ''}{quote.d.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Change %</span>
              <span className={`font-medium ${isPositive ? 'text-success' : isNeutral ? 'text-muted-foreground' : 'text-destructive'}`}>
                {isPositive ? '+' : ''}{quote.dp.toFixed(2)}%
              </span>
            </div>
            <div className="w-full bg-background/50 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-1000 ${
                  isPositive ? 'bg-success' : isNeutral ? 'bg-muted' : 'bg-destructive'
                }`}
                style={{ 
                  width: `${Math.min(Math.abs(quote.dp) * 2, 100)}%`
                }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceIndicator; 