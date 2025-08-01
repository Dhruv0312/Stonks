import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import Index from "@/pages/Index";
import AllStocks from "@/pages/AllStocks";
import StockDetail from "@/pages/StockDetail";

import NotFound from "@/pages/NotFound";
import HowItWorks from "@/pages/HowItWorks";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30, // 30 seconds
      gcTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

function App() {
  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <Header />
            <div className="pt-16">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/all-stocks" element={<AllStocks />} />
          <Route path="/stock/:symbol" element={<StockDetail />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
            </div>
            <Toaster />
          </div>
        </Router>
    </TooltipProvider>
  </QueryClientProvider>
);
}

export default App;
