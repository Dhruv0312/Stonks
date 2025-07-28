import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, ExternalLink, ArrowUpRight, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface IframeChartsProps {
  symbol: string;
  period?: '1D' | '5D' | '1M' | '6M' | 'YTD' | '1Y' | '5Y' | 'MAX';
}

const IframeCharts = ({ symbol, period = '1M' }: IframeChartsProps) => {
  const [chartType, setChartType] = useState<'tradingview' | 'yahoo' | 'marketwatch' | 'investing'>('tradingview');
  const [iframeKey, setIframeKey] = useState(0);

  // Chart URLs for different platforms
  const getChartUrls = () => {
    const baseSymbol = symbol.toUpperCase();
    return {
      tradingview: `https://www.tradingview.com/symbols/NASDAQ-${baseSymbol}/`,
      yahoo: `https://finance.yahoo.com/quote/${baseSymbol}`,
      marketwatch: `https://www.marketwatch.com/investing/stock/${baseSymbol.toLowerCase()}`,
      investing: `https://www.investing.com/equities/${baseSymbol.toLowerCase()}`
    };
  };

  const urls = getChartUrls();

  const refreshIframe = () => {
    setIframeKey(prev => prev + 1);
  };

  const renderIframe = () => {
    const iframeUrl = urls[chartType];
    
    return (
      <div className="relative h-96 bg-secondary border border-border rounded-xl overflow-hidden">
        <iframe
          key={iframeKey}
          src={iframeUrl}
          className="w-full h-full border-0"
          title={`${chartType} Chart for ${symbol}`}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation"
          allow="fullscreen; camera; microphone; geolocation"
        />
        
        {/* Fallback overlay if iframe fails */}
        <div className="absolute inset-0 bg-background/80 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="text-center">
            <p className="text-muted-foreground text-sm mb-2">If chart doesn't load, click below</p>
            <Button
              size="sm"
              className="btn-matte"
              onClick={() => window.open(iframeUrl, '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open in New Tab
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const getChartName = () => {
    switch (chartType) {
      case 'tradingview': return 'TradingView';
      case 'yahoo': return 'Yahoo Finance';
      case 'marketwatch': return 'MarketWatch';
      case 'investing': return 'Investing.com';
      default: return 'Chart';
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
              iFrame Charts
            </CardTitle>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="btn-matte-outline"
              onClick={refreshIframe}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="btn-matte-outline"
              onClick={() => window.open(urls[chartType], '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open
            </Button>
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
            variant={chartType === 'marketwatch' ? "default" : "outline"}
            size="sm"
            onClick={() => setChartType('marketwatch')}
            className={chartType === 'marketwatch' ? 'btn-matte' : 'btn-matte-outline'}
          >
            MarketWatch
          </Button>
          <Button
            variant={chartType === 'investing' ? "default" : "outline"}
            size="sm"
            onClick={() => setChartType('investing')}
            className={chartType === 'investing' ? 'btn-matte' : 'btn-matte-outline'}
          >
            Investing.com
          </Button>
        </div>

        {/* iFrame Chart */}
        {renderIframe()}

        {/* Chart Info */}
        <div className="text-center p-4 card-matte">
          <div className="text-foreground font-medium mb-2">
            📊 {symbol} • {period} Chart
          </div>
          <div className="text-muted-foreground text-sm">
            Embedded {getChartName()} chart
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            Hover over chart area to see fallback options
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

        {/* Troubleshooting Info */}
        <div className="text-center p-4 card-matte">
          <div className="text-sm text-muted-foreground">
            <p className="mb-2">
              <strong>iFrame Troubleshooting:</strong>
            </p>
            <p className="text-xs leading-relaxed">
              If charts don't load, try refreshing or opening in a new tab. 
              Some platforms may block iframe embedding for security reasons.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IframeCharts; 