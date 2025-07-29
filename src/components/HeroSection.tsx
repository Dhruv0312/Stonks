import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { StockSearchCard } from "./StockSearchCard";
import { CompanyLogoWithFallback } from "@/components/CompanyLogo";

const HeroSection = () => {
  const tickerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const popularStocks = [
    { symbol: "AAPL", name: "Apple Inc." },
    { symbol: "GOOGL", name: "Alphabet Inc." },
    { symbol: "MSFT", name: "Microsoft Corp." },
    { symbol: "TSLA", name: "Tesla Inc." },
    { symbol: "AMZN", name: "Amazon.com Inc." },
    { symbol: "NVDA", name: "NVIDIA Corp." }
  ];

  return (
    <section className="w-full flex flex-col items-center justify-center py-12 bg-background">
      {/* Hero Title and Description */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          AI-Powered Stock Predictions
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
          Get accurate stock predictions using real market data, advanced technical analysis, and AI insights. 
          All completely free and updated in real-time.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Real-time Data
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            AI Analysis
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
            100% Free
          </span>
        </div>
      </div>

      {/* Minimal Popular Stocks Row */}
      <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
        <span className="text-muted-foreground text-sm font-medium">Popular Stocks:</span>
        {popularStocks.map((stock) => (
          <div
            key={stock.symbol}
            className="flex items-center gap-2 px-3 py-2 card-matte border border-border cursor-pointer"
            onClick={() => navigate(`/dashboard?symbol=${stock.symbol}`)}
          >
            <CompanyLogoWithFallback 
              symbol={stock.symbol}
              companyName={stock.name}
              size="w-6 h-6"
            />
            <span className="text-foreground font-medium text-sm">
              {stock.symbol}
              </span>
          </div>
        ))}
        </div>
        {/* Search Card */}
      <div className="w-full max-w-xl">
          <StockSearchCard />
      </div>
    </section>
  );
};

export default HeroSection;