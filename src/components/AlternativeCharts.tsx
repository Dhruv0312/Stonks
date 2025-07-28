import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, ExternalLink, ArrowUpRight, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStockCandles } from '@/hooks/useFinnhub';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AlternativeChartsProps {
  symbol: string;
  period?: '1D' | '5D' | '1M' | '6M' | 'YTD' | '1Y' | '5Y' | 'MAX';
}

const AlternativeCharts = ({ symbol, period = '1M' }: AlternativeChartsProps) => {
  const [chartType, setChartType] = useState<'tradingview' | 'yahoo' | 'finnhub' | 'marketwatch' | 'alphavantage'>('tradingview');

  // Convert period to days for Finnhub API
  const getDaysFromPeriod = (period: string) => {
    switch (period) {
      case '1D': return 1;
      case '5D': return 5;
      case '1M': return 30;
      case '6M': return 180;
      case 'YTD': return Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 1).getTime()) / (1000 * 60 * 60 * 24));
      case '1Y': return 365;
      case '5Y': return 1825;
      case 'MAX': return 2555;
      default: return 30;
    }
  };

  const days = getDaysFromPeriod(period);
  const { data: candleData, isLoading: dataLoading, error: dataError } = useStockCandles(symbol, 'D', days);

  // Chart URLs for different platforms - WORKING URLs
  const getChartUrls = () => {
    const baseSymbol = symbol.toUpperCase();
    return {
      tradingview: `https://www.tradingview.com/symbols/NASDAQ-${baseSymbol}/`,
      yahoo: `https://finance.yahoo.com/quote/${baseSymbol}`,
      finnhub: `https://finnhub.io/quote?symbol=${baseSymbol}`,
      marketwatch: `https://www.marketwatch.com/investing/stock/${baseSymbol.toLowerCase()}`,
      alphavantage: `https://www.alphavantage.co/quote/${baseSymbol}`
    };
  };

  const urls = getChartUrls();

  // Prepare data for Recharts
  const prepareChartData = () => {
    if (!candleData || !candleData.c || !candleData.t) return [];
    
    return candleData.t.map((timestamp, index) => ({
      date: new Date(timestamp * 1000).toLocaleDateString(),
      price: candleData.c[index],
      volume: candleData.v[index]
    }));
  };

  const chartData = prepareChartData();

  const renderChart = () => {
    switch (chartType) {
      case 'finnhub':
        return (
          <div className="h-96 bg-secondary border border-border rounded-xl overflow-hidden">
            {dataLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto mb-2" />
                  <p className="text-muted-foreground text-sm">Loading chart data...</p>
                </div>
              </div>
            ) : chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
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
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--foreground))'
                    }}
                    formatter={(value: any) => [`$${value}`, 'Price']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">No data available</p>
              </div>
            )}
          </div>
        );
      
      default:
        const getChartName = () => {
          switch (chartType) {
            case 'tradingview': return 'TradingView';
            case 'yahoo': return 'Yahoo Finance';
            case 'marketwatch': return 'MarketWatch';
            case 'alphavantage': return 'Alpha Vantage';
            default: return 'Chart';
          }
        };

        return (
          <div className="h-96 bg-secondary border border-border rounded-xl overflow-hidden">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <div className="icon-rounded mb-4">
                <BarChart3 className="h-16 w-16 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {getChartName()} Chart
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Click below to view the interactive chart on {getChartName()}.
              </p>
              <Button
                size="lg"
                className="btn-matte"
                onClick={() => window.open(urls[chartType], '_blank')}
              >
                <ExternalLink className="h-5 w-5 mr-2" />
                Open {getChartName()}
                <ArrowUpRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        );
    }
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
              Alternative Charts
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Chart Type Selector */}
        <div className="flex flex-wrap gap-2 justify-center">
          <Button
            variant={chartType === 'tradingview' ? "default" : "outline"}
            size="sm"
            onClick={() => setChartType('tradingview')}
            className={chartType === 'tradingview' ? 'btn-matte' : 'btn-matte-outline'}
          >
            TradingView
          </Button>
          <Button
            variant={chartType === 'yahoo' ? "default" : "outline"}
            size="sm"
            onClick={() => setChartType('yahoo')}
            className={chartType === 'yahoo' ? 'btn-matte' : 'btn-matte-outline'}
          >
            Yahoo Finance
          </Button>
          <Button
            variant={chartType === 'finnhub' ? "default" : "outline"}
            size="sm"
            onClick={() => setChartType('finnhub')}
            className={chartType === 'finnhub' ? 'btn-matte' : 'btn-matte-outline'}
          >
            Finnhub Chart
          </Button>
          <Button
            variant={chartType === 'marketwatch' ? "default" : "outline"}
            size="sm"
            onClick={() => setChartType('marketwatch')}
            className={chartType === 'marketwatch' ? 'btn-matte' : 'btn-matte-outline'}
          >
            MarketWatch
          </Button>
          <Button
            variant={chartType === 'alphavantage' ? "default" : "outline"}
            size="sm"
            onClick={() => setChartType('alphavantage')}
            className={chartType === 'alphavantage' ? 'btn-matte' : 'btn-matte-outline'}
          >
            Alpha Vantage
          </Button>
        </div>

        {/* Chart Display */}
        {renderChart()}

        {/* Chart Info */}
        <div className="text-center p-4 card-matte">
          <div className="text-foreground font-medium mb-2">
            📊 {symbol} • {period} Chart
          </div>
          <div className="text-muted-foreground text-sm">
            {chartType === 'finnhub' ? 'Real-time data from Finnhub API' : 
             `Interactive chart from ${chartType === 'tradingview' ? 'TradingView' : 
             chartType === 'yahoo' ? 'Yahoo Finance' : 
             chartType === 'marketwatch' ? 'MarketWatch' :
             'Alpha Vantage'}`}
          </div>
        </div>

        {/* Period Selector */}
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
      </CardContent>
    </Card>
  );
};

export default AlternativeCharts; 