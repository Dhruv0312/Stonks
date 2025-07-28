import { Brain, TrendingUp, AlertTriangle } from 'lucide-react';
import { Card } from './ui/card';

const PredictionsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-background/90">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 gradient-text">About Predictions</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Our AI-powered predictions leverage historical data and machine learning models
            to forecast potential market movements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Data Collection Card */}
          <Card className="stock-card">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Data Collection</h3>
                <p className="text-white/70">
                  Real-time and historical data from Finnhub API, including price metrics
                  and trading volumes.
                </p>
              </div>
            </div>
          </Card>

          {/* ML Models Card */}
          <Card className="stock-card">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-secondary/10">
                <Brain className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">ML Models</h3>
                <p className="text-white/70">
                  LSTM networks analyze time-series data for short-term and medium-term
                  predictions.
                </p>
              </div>
            </div>
          </Card>

          {/* Limitations Card */}
          <Card className="stock-card">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-warning/10">
                <AlertTriangle className="h-6 w-6 text-warning" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Limitations</h3>
                <p className="text-white/70">
                  Predictions are based on historical data and should be used as a
                  supplementary tool only.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Confidence Score Demo */}
        <div className="mt-16">
          <Card className="stock-card max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-white mb-4">Sample Prediction</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white/70">1-Day Forecast</span>
                <span className="text-success">+2.3%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-success h-full rounded-full w-[85%]"></div>
              </div>
              <p className="text-sm text-white/60">
                Confidence Score: 85%
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PredictionsSection;
