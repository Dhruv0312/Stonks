import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, ExternalLink, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GoogleFinanceChartProps {
  symbol: string;
  period?: '1D' | '5D' | '1M' | '6M' | 'YTD' | '1Y' | '5Y' | 'MAX';
}

const GoogleFinanceChart = ({ symbol, period = '1M' }: GoogleFinanceChartProps) => {
  // Google Finance chart URL
  const getGoogleFinanceUrl = (symbol: string, period: string) => {
    const baseUrl = 'https://www.google.com/finance/quote';
    const periodMap: Record<string, string> = {
      '1D': '1d',
      '5D': '5d', 
      '1M': '1mo',
      '6M': '6mo',
      'YTD': 'ytd',
      '1Y': '1y',
      '5Y': '5y',
      'MAX': 'max'
    };
    
    return `${baseUrl}/${symbol}:NASDAQ?window=${periodMap[period] || '1mo'}`;
  };

  const chartUrl = getGoogleFinanceUrl(symbol, period);

  return (
    <Card className="card-matte animate-fade-in">
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="icon-rounded">
              <BarChart3 className="h-6 w-6 text-foreground" />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">
              Google Finance Chart
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Chart Placeholder */}
        <div className="relative h-96 bg-secondary border border-border rounded-xl overflow-hidden">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
            <div className="icon-rounded mb-4">
              <BarChart3 className="h-16 w-16 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Interactive Google Finance Chart
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Due to security restrictions, Google Finance charts cannot be embedded directly. 
              Click below to view the full interactive chart on Google Finance.
            </p>
            <Button
              size="lg"
              className="btn-matte"
              onClick={() => window.open(chartUrl, '_blank')}
            >
              <ExternalLink className="h-5 w-5 mr-2" />
              Open Google Finance Chart
              <ArrowUpRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Chart Info */}
        <div className="text-center p-4 card-matte">
          <div className="text-foreground font-medium mb-2">
            📊 {symbol} • {period} Chart
          </div>
          <div className="text-muted-foreground text-sm">
            Real-time data from Google Finance
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            Interactive chart with zoom, pan, and technical indicators
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

        {/* Additional Info */}
        <div className="text-center p-4 card-matte">
          <div className="text-sm text-muted-foreground">
            <p className="mb-2">
              <strong>Why can't we embed Google Finance?</strong>
            </p>
            <p className="text-xs leading-relaxed">
              Google Finance uses X-Frame-Options headers to prevent embedding for security reasons. 
              This is common practice for financial websites to protect user data and prevent clickjacking attacks.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoogleFinanceChart; 