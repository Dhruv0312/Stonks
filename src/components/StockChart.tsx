import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { useStockCandles } from '@/hooks/useFinnhub';

interface StockChartProps {
  symbol: string;
}

const StockChart = ({ symbol }: StockChartProps) => {
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '3M'>('1M');
  
  // Map timeframe to days and resolution
  const getTimeframeConfig = (tf: string) => {
    switch (tf) {
      case '1D': return { days: 1, resolution: '5' }; // 5-minute intervals
      case '1W': return { days: 7, resolution: '60' }; // 1-hour intervals
      case '1M': return { days: 30, resolution: 'D' }; // Daily
      case '3M': return { days: 90, resolution: 'D' }; // Daily
      default: return { days: 30, resolution: 'D' };
    }
  };

  const { days, resolution } = getTimeframeConfig(timeframe);
  const { data: candles, isLoading, error } = useStockCandles(symbol, resolution, days);

  // Transform candle data for Recharts
  const chartData = candles?.t?.map((timestamp: number, index: number) => ({
    time: new Date(timestamp * 1000).toLocaleDateString(),
    open: candles.o?.[index],
    high: candles.h?.[index],
    low: candles.l?.[index],
    close: candles.c?.[index],
    volume: candles.v?.[index]
  })) || [];

  // Calculate price change for the selected period
  const getPriceChange = () => {
    if (chartData.length < 2) return { change: 0, percent: 0 };
    const firstPrice = chartData[0].close;
    const lastPrice = chartData[chartData.length - 1].close;
    const change = lastPrice - firstPrice;
    const percent = (change / firstPrice) * 100;
    return { change, percent };
  };

  const priceChange = getPriceChange();

  if (isLoading) {
    return (
      <Card className="card-matte">
        <CardHeader>
          <CardTitle className="text-foreground">Price Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-secondary rounded-lg flex items-center justify-center border border-border">
            <div className="text-center text-muted-foreground">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto mb-2" />
              <p>Loading chart data...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !chartData.length) {
    return (
      <Card className="card-matte">
        <CardHeader>
          <CardTitle className="text-foreground">Price Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-secondary rounded-lg flex items-center justify-center border border-border">
            <div className="text-center text-muted-foreground">
              <AlertCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Historical chart data requires premium subscription</p>
              <p className="text-sm">Current price data is available in the overview</p>
              <div className="mt-4 p-3 bg-background/30 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  <strong>Available with Free Tier:</strong><br/>
                  • Real-time quotes<br/>
                  • Company profiles<br/>
                  • News data<br/>
                  • Basic market data
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-matte">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-foreground">Price Chart</CardTitle>
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1 ${priceChange.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {priceChange.change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              <span className="text-sm font-medium">
                {priceChange.change >= 0 ? '+' : ''}{priceChange.change.toFixed(2)} ({priceChange.percent >= 0 ? '+' : ''}{priceChange.percent.toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>
        
        {/* Timeframe Selector */}
        <div className="flex gap-2 mt-2">
          {(['1D', '1W', '1M', '3M'] as const).map((tf) => (
            <Button
              key={tf}
              variant={timeframe === tf ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeframe(tf)}
              className={`h-8 px-3 ${
                timeframe === tf ? 'btn-matte' : 'btn-matte-outline'
              }`}
            >
              {tf}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis 
                dataKey="time" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--foreground))'
                }}
                formatter={(value: any) => [`$${value}`, 'Price']}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Area
                type="monotone"
                dataKey="close"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorPrice)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        {/* Chart Stats */}
        <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t border-border/30">
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Open</div>
            <div className="text-lg font-semibold text-foreground">${chartData[0]?.open?.toFixed(2)}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">High</div>
            <div className="text-lg font-semibold text-foreground">${Math.max(...chartData.map(d => d.high)).toFixed(2)}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Low</div>
            <div className="text-lg font-semibold text-foreground">${Math.min(...chartData.map(d => d.low)).toFixed(2)}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Close</div>
            <div className="text-lg font-semibold text-foreground">${chartData[chartData.length - 1]?.close?.toFixed(2)}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StockChart; 