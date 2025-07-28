import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus, BarChart3 } from 'lucide-react';
import { StockQuote } from '@/services/finnhub';

interface SimpleChartProps {
  quote: StockQuote;
  symbol: string;
}

const SimpleChart = ({ quote, symbol }: SimpleChartProps) => {
  const isPositive = quote.d >= 0;
  const isNeutral = quote.d === 0;

  // Calculate the position of current price within the day's range
  const dayRange = quote.h - quote.l;
  const currentPosition = dayRange > 0 ? ((quote.c - quote.l) / dayRange) * 100 : 50;

  // Create a simple candlestick visualization
  const bodyHeight = Math.abs(quote.o - quote.c);
  const bodyPosition = Math.min(quote.o, quote.c);
  const bodyTop = ((quote.h - bodyPosition) / dayRange) * 100;
  const bodyBottom = ((quote.h - (bodyPosition + bodyHeight)) / dayRange) * 100;

  return (
    <Card className="card-matte animate-fade-in">
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="icon-rounded">
              <BarChart3 className="h-6 w-6 text-foreground" />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">
              Price Chart
            </CardTitle>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${
            isPositive 
              ? 'bg-green-500/20 text-green-500 border border-green-500/30' 
              : isNeutral 
              ? 'bg-muted text-muted-foreground border border-border'
              : 'bg-red-500/20 text-red-500 border border-red-500/30'
          }`}>
            {isPositive ? <TrendingUp className="h-4 w-4" /> : isNeutral ? <Minus className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            <span>
              {isPositive ? '+' : ''}{quote.d.toFixed(2)} ({isPositive ? '+' : ''}{quote.dp.toFixed(2)}%)
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Current Price Display */}
        <div className="text-center">
          <div className="text-4xl font-bold text-foreground mb-2">${quote.c.toFixed(2)}</div>
          <div className="text-muted-foreground text-lg">Current Price</div>
        </div>

        {/* Enhanced Candlestick Visualization */}
        <div className="space-y-6">
          <div className="relative h-40 bg-secondary border border-border rounded-xl p-6">
            {/* Price labels */}
            <div className="absolute left-2 top-2 text-xs text-muted-foreground font-medium">${quote.h.toFixed(2)}</div>
            <div className="absolute left-2 bottom-2 text-xs text-muted-foreground font-medium">${quote.l.toFixed(2)}</div>
            
            {/* Candlestick */}
            <div className="relative h-full flex items-center justify-center">
              {/* High-Low line */}
              <div className="absolute w-1 h-full bg-border rounded-full" />
              
              {/* Candlestick body */}
              {bodyHeight > 0 && (
                <div 
                  className={`absolute w-12 rounded-lg transition-all duration-1000 shadow-lg ${
                    quote.c >= quote.o ? 'bg-green-500' : 'bg-red-500'
                  }`}
                  style={{
                    top: `${bodyTop}%`,
                    height: `${Math.max(bodyHeight / dayRange * 100, 4)}%`
                  }}
                />
              )}
              
              {/* Current price indicator */}
              <div 
                className="absolute w-4 h-4 bg-primary rounded-full shadow-lg border-2 border-primary/20 animate-pulse"
                style={{
                  top: `${100 - currentPosition}%`
                }}
              />
            </div>
          </div>

          {/* Price levels grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 card-matte">
              <div className="text-muted-foreground text-sm mb-1">Open</div>
              <div className="text-xl font-bold text-foreground">${quote.o.toFixed(2)}</div>
            </div>
            <div className="text-center p-4 card-matte">
              <div className="text-muted-foreground text-sm mb-1">High</div>
              <div className="text-xl font-bold text-foreground">${quote.h.toFixed(2)}</div>
            </div>
            <div className="text-center p-4 card-matte">
              <div className="text-muted-foreground text-sm mb-1">Low</div>
              <div className="text-xl font-bold text-foreground">${quote.l.toFixed(2)}</div>
            </div>
          </div>
        </div>

        {/* Enhanced Price Movement Summary */}
        <div className="p-6 card-matte">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-foreground font-medium">Day's Range</span>
              <span className="text-foreground font-semibold">${quote.l.toFixed(2)} - ${quote.h.toFixed(2)}</span>
            </div>
            
            {/* Progress bar */}
            <div className="w-full bg-muted rounded-full h-3">
              <div 
                className={`h-3 rounded-full transition-all duration-1000 ${
                  isPositive ? 'bg-green-500' : isNeutral ? 'bg-muted-foreground' : 'bg-red-500'
                }`}
                style={{ 
                  width: `${Math.min(Math.abs(quote.dp) * 2, 100)}%`
                }}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Previous Close</span>
                <span className="text-foreground font-medium">${quote.pc.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Change</span>
                <span className={`font-medium ${
                  isPositive ? 'text-green-500' : isNeutral ? 'text-muted-foreground' : 'text-red-500'
                }`}>
                  {isPositive ? '+' : ''}{quote.d.toFixed(2)} ({isPositive ? '+' : ''}{quote.dp.toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Market Status */}
        <div className="text-center p-4 card-matte">
          <div className="text-foreground font-medium mb-2">
            {isPositive ? '📈 Bullish' : isNeutral ? '➡️ Neutral' : '📉 Bearish'} • {symbol}
          </div>
          <div className="text-muted-foreground text-sm">
            Data as of {new Date().toLocaleTimeString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SimpleChart; 