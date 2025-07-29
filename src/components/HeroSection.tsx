import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { StockSearchCard } from "./StockSearchCard";
import { CompanyLogoWithFallback } from "@/components/CompanyLogo";
import { Button } from "./ui/button";
import { ArrowRight, Lightbulb } from "lucide-react";

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
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
          Stonks
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Real-time stock data, professional charts, and market insights
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => navigate('/all-stocks')} 
            className="btn-matte text-lg px-8 py-3"
          >
            Browse Stocks
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
          <Button 
            onClick={() => navigate('/how-it-works')} 
            variant="outline"
            className="btn-matte-outline text-lg px-8 py-3"
          >
            Learn More
            <Lightbulb className="h-5 w-5 ml-2" />
          </Button>
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