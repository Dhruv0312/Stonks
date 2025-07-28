import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, RefreshCw, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStockCandles } from '@/hooks/useFinnhub';

interface GoogleChartsAPIProps {
  symbol: string;
  period?: '1D' | '5D' | '1M' | '6M' | 'YTD' | '1Y' | '5Y' | 'MAX';
}

// Add Google Charts types to window object
declare global {
  interface Window {
    google: {
      charts: {
        load: (version: string, options: { packages: string[] }) => void;
        setOnLoadCallback: (callback: () => void) => void;
      };
      visualization: {
        LineChart: new (element: HTMLElement) => any;
        DataTable: new () => any;
      };
    };
  }
}

const GoogleChartsAPI = ({ symbol, period = '1M' }: GoogleChartsAPIProps) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  // Google Charts API configuration
  const getChartConfig = () => {
    return {
      width: '100%',
      height: '400',
      backgroundColor: 'transparent',
      colors: ['#3B82F6', '#10B981'],
      chartArea: {
        left: '10%',
        top: '10%',
        width: '80%',
        height: '70%'
      },
      hAxis: {
        textStyle: {
          color: '#9CA3AF'
        },
        gridlines: {
          color: '#374151'
        },
        format: 'MMM dd'
      },
      vAxis: {
        textStyle: {
          color: '#9CA3AF'
        },
        gridlines: {
          color: '#374151'
        },
        format: 'currency'
      },
      legend: {
        position: 'none'
      },
      curveType: 'function',
      pointSize: 3,
      lineWidth: 2
    };
  };

  useEffect(() => {
    if (dataLoading) {
      setIsLoading(true);
      return;
    }

    if (dataError) {
      setError('Failed to load stock data');
      setIsLoading(false);
      return;
    }

    if (!candleData || !candleData.c || candleData.c.length === 0) {
      setError('No data available for this period');
      setIsLoading(false);
      return;
    }

    const loadGoogleCharts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Load Google Charts API
        if (!window.google || !window.google.charts) {
          const script = document.createElement('script');
          script.src = 'https://www.gstatic.com/charts/loader.js';
          script.onload = () => {
            window.google.charts.load('current', { packages: ['corechart'] });
            window.google.charts.setOnLoadCallback(() => drawChart());
          };
          document.head.appendChild(script);
        } else {
          drawChart();
        }
      } catch (err) {
        setError('Failed to load Google Charts');
        setIsLoading(false);
      }
    };

    const drawChart = () => {
      if (!chartRef.current || !candleData) return;

      try {
        const chart = new window.google.visualization.LineChart(chartRef.current);
        const config = getChartConfig();

        // Create data table with real Finnhub data
        const data = new window.google.visualization.DataTable();
        data.addColumn('datetime', 'Date');
        data.addColumn('number', 'Close Price');
        data.addColumn('number', 'Volume');

        // Convert Finnhub data to Google Charts format
        // CandleData contains arrays: c (close), h (high), l (low), o (open), t (timestamp), v (volume)
        const chartData = candleData.t.map((timestamp, index) => [
          new Date(timestamp * 1000), // Convert timestamp to Date
          candleData.c[index], // Close price
          candleData.v[index]  // Volume
        ]);

        data.addRows(chartData);

        chart.draw(data, config);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to render chart');
        setIsLoading(false);
      }
    };

    loadGoogleCharts();
  }, [candleData, dataLoading, dataError]);

  const openGoogleFinance = () => {
    const url = `https://www.google.com/finance/quote/${symbol}:NASDAQ`;
    window.open(url, '_blank');
  };

  // Show current price if available
  const currentPrice = candleData && candleData.c && candleData.c.length > 0 ? candleData.c[candleData.c.length - 1] : null;
  const previousPrice = candleData && candleData.c && candleData.c.length > 1 ? candleData.c[candleData.c.length - 2] : null;
  const priceChange = currentPrice && previousPrice ? currentPrice - previousPrice : 0;
  const priceChangePercent = currentPrice && previousPrice ? ((priceChange / previousPrice) * 100) : 0;

  return (
    <Card className="card-matte animate-fade-in">
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="icon-rounded">
              <BarChart3 className="h-6 w-6 text-foreground" />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">
              Google Charts API
            </CardTitle>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="btn-matte-outline"
            onClick={openGoogleFinance}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Google Finance
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Price Display */}
        {currentPrice && (
          <div className="text-center p-4 card-matte">
            <div className="text-3xl font-bold text-foreground mb-2">
              ${currentPrice.toFixed(2)}
            </div>
            <div className={`text-sm font-medium ${
              priceChange > 0 ? 'text-green-500' : priceChange < 0 ? 'text-red-500' : 'text-muted-foreground'
            }`}>
              {priceChange > 0 ? '+' : ''}{priceChange.toFixed(2)} ({priceChangePercent > 0 ? '+' : ''}{priceChangePercent.toFixed(2)}%)
            </div>
          </div>
        )}

        {/* Chart Container */}
        <div className="relative h-96 bg-secondary border border-border rounded-xl overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-10">
              <div className="text-center">
                <RefreshCw className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
                <p className="text-muted-foreground text-sm">Loading chart data...</p>
              </div>
            </div>
          )}
          
          {error && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-10">
              <div className="text-center">
                <p className="text-red-500 text-sm mb-2">{error}</p>
                <Button 
                  size="sm" 
                  className="btn-matte"
                  onClick={() => window.location.reload()}
                >
                  Retry
                </Button>
              </div>
            </div>
          )}
          
          <div 
            ref={chartRef} 
            className="w-full h-full"
            style={{ minHeight: '400px' }}
          />
        </div>

        {/* Chart Info */}
        <div className="text-center p-4 card-matte">
          <div className="text-foreground font-medium mb-2">
            📊 {symbol} • {period} Chart
          </div>
          <div className="text-muted-foreground text-sm">
            Real-time data from Finnhub API
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            Interactive chart with historical price data
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

export default GoogleChartsAPI; 