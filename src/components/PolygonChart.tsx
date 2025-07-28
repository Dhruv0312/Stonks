import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, TrendingDown, Minus, RefreshCw, Clock, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePolygonAggregates, usePolygonPreviousClose } from '@/hooks/usePolygon';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface PolygonChartProps {
  symbol: string;
  period?: '1D' | '5D' | '1M' | '6M' | 'YTD' | '1Y' | '5Y' | 'MAX';
}

const PolygonChart = ({ symbol, period = '1M' }: PolygonChartProps) => {
  const [chartType, setChartType] = useState<'line' | 'area'>('area');
  
  const { data: aggregates, isLoading: aggregatesLoading, error: aggregatesError } = usePolygonAggregates(symbol, period);
  const { data: previousClose, isLoading: previousLoading } = usePolygonPreviousClose(symbol);

  // Prepare data for Recharts
  const prepareChartData = () => {
    if (!aggregates || !aggregates.results) return [];
    
    return aggregates.results.map((item) => ({
      date: new Date(item.t).toLocaleDateString(),
      close: item.c,
      open: item.o,
      high: item.h,
      low: item.l,
      volume: item.v,
      timestamp: item.t
    }));
  };

  const chartData = prepareChartData();

  // Calculate price change
  const currentPrice = chartData.length > 0 ? chartData[chartData.length - 1].close : null;
  const previousPrice = previousClose?.results?.[0]?.c || (chartData.length > 1 ? chartData[chartData.length - 2].close : null);
  
  const priceChange = currentPrice && previousPrice ? currentPrice - previousPrice : 0;
  const priceChangePercent = currentPrice && previousPrice ? ((priceChange / previousPrice) * 100) : 0;

  // Get timestamp information
  const getTimestampInfo = () => {
    if (!chartData.length) return null;
    
    const firstDate = new Date(chartData[0].timestamp);
    const lastDate = new Date(chartData[chartData.length - 1].timestamp);
    const currentTime = new Date();
    
    return {
      startDate: firstDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }),
      endDate: lastDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }),
      currentTime: currentTime.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
      }),
      dataPoints: chartData.length,
      lastUpdate: lastDate.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      })
    };
  };

  const timestampInfo = getTimestampInfo();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatVolume = (value: number) => {
    if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
    if (value >= 1e3) return `${(value / 1e3).toFixed(2)}K`;
    return value.toString();
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground">{label}</p>
          <p className="text-sm text-muted-foreground">
            Open: {formatCurrency(data.open)}
          </p>
          <p className="text-sm text-muted-foreground">
            High: {formatCurrency(data.high)}
          </p>
          <p className="text-sm text-muted-foreground">
            Low: {formatCurrency(data.low)}
          </p>
          <p className="text-sm text-muted-foreground">
            Close: {formatCurrency(data.close)}
          </p>
          <p className="text-sm text-muted-foreground">
            Volume: {formatVolume(data.volume)}
          </p>
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    if (aggregatesLoading) {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
            <p className="text-muted-foreground text-sm">Loading Polygon.io data...</p>
          </div>
        </div>
      );
    }

    if (aggregatesError) {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-red-500 text-sm mb-2">Error loading chart data</p>
            <Button 
              size="sm" 
              className="btn-matte"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </div>
        </div>
      );
    }

    if (!chartData.length) {
      return (
        <div className="flex items-center justify-center h-96">
          <p className="text-muted-foreground">No data available for this period</p>
        </div>
      );
    }

    return (
      <ResponsiveContainer width="100%" height="100%">
        {chartType === 'area' ? (
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="date" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="close" 
              stroke="hsl(var(--primary))" 
              fillOpacity={1}
              fill="url(#colorPrice)"
              strokeWidth={2}
            />
          </AreaChart>
        ) : (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="date" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="close" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    );
  };

  return (
    <Card className="card-matte animate-fade-in">
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="icon-rounded">
              <BarChart3 className="h-6 w-6 text-foreground" />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">
              Polygon.io Chart
            </CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${
              priceChange > 0 
                ? 'bg-green-500/20 text-green-500 border border-green-500/30' 
                : priceChange < 0 
                ? 'bg-red-500/20 text-red-500 border border-red-500/30'
                : 'bg-muted text-muted-foreground border border-border'
            }`}>
              {priceChange > 0 ? <TrendingUp className="h-4 w-4" /> : priceChange < 0 ? <TrendingDown className="h-4 w-4" /> : <Minus className="h-4 w-4" />}
              <span>
                {priceChange > 0 ? '+' : ''}{formatCurrency(priceChange)} ({priceChangePercent > 0 ? '+' : ''}{priceChangePercent.toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Timestamp Information */}
        {timestampInfo && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 card-matte">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-xs text-muted-foreground">Date Range</div>
                <div className="text-sm font-medium text-foreground">
                  {timestampInfo.startDate} - {timestampInfo.endDate}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-xs text-muted-foreground">Current Time</div>
                <div className="text-sm font-medium text-foreground">
                  {timestampInfo.currentTime}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-xs text-muted-foreground">Data Points</div>
                <div className="text-sm font-medium text-foreground">
                  {timestampInfo.dataPoints} points
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-xs text-muted-foreground">Last Update</div>
                <div className="text-sm font-medium text-foreground">
                  {timestampInfo.lastUpdate}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Current Price Display */}
        {currentPrice && (
          <div className="text-center p-4 card-matte">
            <div className="text-3xl font-bold text-foreground mb-2">
              {formatCurrency(currentPrice)}
            </div>
            <div className="text-muted-foreground text-sm">
              Real-time data from Polygon.io
            </div>
          </div>
        )}

        {/* Chart Type Selector */}
        <div className="flex flex-wrap gap-2 justify-center">
          <Button
            variant={chartType === 'area' ? "default" : "outline"}
            size="sm"
            onClick={() => setChartType('area')}
            className={chartType === 'area' ? 'btn-matte' : 'btn-matte-outline'}
          >
            Area Chart
          </Button>
          <Button
            variant={chartType === 'line' ? "default" : "outline"}
            size="sm"
            onClick={() => setChartType('line')}
            className={chartType === 'line' ? 'btn-matte' : 'btn-matte-outline'}
          >
            Line Chart
          </Button>
        </div>

        {/* Period Selector - Now Above Chart */}
        <div className="flex flex-wrap gap-2 justify-center">
          {(['1D', '5D', '1M', '6M', 'YTD', '1Y', '5Y', 'MAX'] as const).map((p) => (
            <Button
              key={p}
              variant={period === p ? "default" : "outline"}
              size="sm"
              onClick={() => window.location.href = `?symbol=${symbol}&period=${p}`}
              className={`px-3 py-1 text-sm font-medium transition-all duration-200 ${
                period === p ? 'btn-matte' : 'btn-matte-outline'
              }`}
            >
              {p}
            </Button>
          ))}
        </div>

        {/* Chart Container */}
        <div className="h-96 bg-secondary border border-border rounded-xl overflow-hidden">
          {renderChart()}
        </div>

        {/* Chart Info */}
        <div className="text-center p-4 card-matte">
          <div className="text-foreground font-medium mb-2">
            📊 {symbol} • {period} Chart
          </div>
          <div className="text-muted-foreground text-sm">
            Real-time data from Polygon.io API
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            Interactive chart with OHLCV data and volume information
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PolygonChart; 