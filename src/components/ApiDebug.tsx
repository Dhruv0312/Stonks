import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ApiDebug = () => {
  const [testResult, setTestResult] = useState<string>('Not tested');
  const [isLoading, setIsLoading] = useState(false);
  const [detailedError, setDetailedError] = useState<string>('');

  const testApi = async () => {
    setIsLoading(true);
    setTestResult('Testing...');
    setDetailedError('');
    
    try {
      // Test Alpha Vantage API directly
      const response = await fetch('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL&apikey=GXWC1XDGX22TOE92');
      const data = await response.json();
      
      console.log('API Response:', data);
      console.log('Response status:', response.status);
      
      if (data['Error Message']) {
        setTestResult(`❌ API Error: ${data['Error Message']}`);
        setDetailedError(`Status: ${response.status}, Error: ${JSON.stringify(data, null, 2)}`);
      } else if (data['Global Quote']) {
        const quote = data['Global Quote'];
        setTestResult(`✅ API Working! AAPL Price: $${quote['05. price']}`);
        setDetailedError(`Status: ${response.status}, Data: ${JSON.stringify(data, null, 2)}`);
      } else {
        setTestResult(`❌ No quote data available`);
        setDetailedError(`Status: ${response.status}, Response: ${JSON.stringify(data, null, 2)}`);
      }
    } catch (error) {
      setTestResult(`❌ Network Error: ${error}`);
      setDetailedError(`Error details: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testService = async () => {
    setIsLoading(true);
    setTestResult('Testing service...');
    setDetailedError('');
    
    try {
      // Import and test the actual service
      const { alphaVantageService } = await import('@/services/alphaVantage');
      const data = await alphaVantageService.getStockQuote('AAPL');
      setTestResult(`✅ Service Working! AAPL Price: $${data.c}`);
      setDetailedError(`Service data: ${JSON.stringify(data, null, 2)}`);
    } catch (error) {
      setTestResult(`❌ Service Error: ${error}`);
      setDetailedError(`Service error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="card-matte mb-4">
      <CardHeader>
        <CardTitle className="text-lg">Alpha Vantage API Debug Test</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button onClick={testApi} disabled={isLoading} className="mr-4">
            {isLoading ? 'Testing...' : 'Test Direct API'}
          </Button>
          <Button onClick={testService} disabled={isLoading}>
            {isLoading ? 'Testing...' : 'Test Service'}
          </Button>
          
          <div className="text-sm">
            <strong>Result:</strong> {testResult}
          </div>
          
          {detailedError && (
            <div className="text-xs bg-muted p-2 rounded">
              <strong>Details:</strong><br />
              <pre className="whitespace-pre-wrap">{detailedError}</pre>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiDebug; 