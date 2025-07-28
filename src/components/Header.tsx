import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Activity } from "lucide-react";

const Header = () => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('light');
  };

  return (
    <header className="border-b border-border bg-gradient-card backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            StockSight
          </span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="/" className="text-foreground hover:text-primary transition-colors font-medium">
            Home
          </a>
          <a href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
            Dashboard
          </a>
          <a href="/how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
            How It Works
          </a>
          <a href="/about" className="text-muted-foreground hover:text-primary transition-colors">
            About
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-muted-foreground hover:text-foreground"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button variant="outline" className="hidden sm:flex">
            Sign In
          </Button>
          <Button className="bg-gradient-primary hover:opacity-90">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;