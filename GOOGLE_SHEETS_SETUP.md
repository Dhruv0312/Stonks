# Google Sheets + Google Finance Integration Setup

## 🎯 Overview
This integration uses Google Sheets as a bridge to fetch real stock data, providing current prices, price changes, and company information for your app.

## 📋 Prerequisites
1. Google Account
2. Google Cloud Console access
3. Your Google Sheet: https://docs.google.com/spreadsheets/d/1dp-KRG5d9rXuR_RDCEzjQqWBQfi71Rm7bbX2VhCDqa0/edit?usp=sharing

## 🔧 Step-by-Step Setup

### Step 1: Set Up Google Cloud Console
1. Go to [Google Cloud Console](https://console.developers.google.com/)
2. Create a new project or select existing one
3. Enable the **Google Sheets API**:
   - Go to "APIs & Services" → "Library"
   - Search for "Google Sheets API"
   - Click "Enable"
4. Create API credentials:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy the API key (you'll need this later)

### Step 2: Your Google Sheet Structure
Your sheet already contains real stock data with this structure:
```
A1: Symbol
B1: Exchange(Optional)
C1: Stock Name
D1: Current Price
E1: Price Change
F1: % Change
```

**Sample Data:**
- AAPL - Apple Inc - $119.54 (-0.64, -0.53%)
- GOOGL - Alphabet Inc - $277.04 (-6.11, -2.16%)
- MSFT - Microsoft Corp - $374.69 (+2.56, +0.94%)
- TSLA - Tesla Inc - $25.79 (-0.22, -0.85%)

### Step 3: Publish Your Sheet
1. Go to **File → Share → Publish to web**
2. Choose **Entire Document**
3. Click **Publish**
4. Make sure the sheet is viewable by anyone with the link

### Step 4: Configure Environment Variables
Create or update your `.env` file:
```env
VITE_GOOGLE_SHEET_ID=1dp-KRG5d9rXuR_RDCEzjQqWBQfi71Rm7bbX2VhCDqa0
VITE_GOOGLE_SHEETS_API_KEY=YOUR_API_KEY_HERE
```

Replace `YOUR_API_KEY_HERE` with the API key from Step 1.

## 🚀 Usage in Your App

### Basic Usage
```typescript
import { useGoogleAllStocks, useGoogleStockQuote } from '@/hooks/useGoogleSheets';

// In your component
const { data: allStocks, isLoading } = useGoogleAllStocks();
const { data: quote } = useGoogleStockQuote('AAPL');

if (isLoading) return <div>Loading...</div>;
if (quote) {
  console.log('Current price:', quote.c);
  console.log('Change:', quote.d);
  console.log('Percent change:', quote.dp);
  console.log('Company:', quote.companyName);
}
```

### Available Hooks
- `useGoogleAllStocks()` - Get all stocks from the sheet
- `useGoogleStockQuote(symbol)` - Get specific stock quote
- `useGoogleMultipleQuotes(symbols)` - Get multiple stock quotes
- `useGoogleTopGainers(limit)` - Get top gaining stocks
- `useGoogleTopLosers(limit)` - Get top losing stocks
- `useGoogleStockSearch(query)` - Search stocks by name or symbol
- `useGoogleAvailableSymbols()` - Get list of available symbols
- `useGoogleSheetsConnection()` - Test connection

## 📊 Data Structure

### Stock Data Format
```typescript
{
  symbol: string;           // Stock symbol (e.g., "AAPL")
  exchange: string;         // Exchange (e.g., "NYSE")
  companyName: string;      // Company name (e.g., "Apple Inc")
  currentPrice: number;     // Current stock price
  priceChange: number;      // Price change (positive/negative)
  percentChange: number;    // Percentage change
}
```

### Stock Quote Format (Compatible with your app)
```typescript
{
  c: number;    // Current price
  d: number;    // Change
  dp: number;   // Percent change
  h: number;    // High price (estimated)
  l: number;    // Low price (estimated)
  o: number;    // Open price (estimated)
  pc: number;   // Previous close
  t: number;    // Timestamp
  symbol: string;
  companyName: string;
}
```

## 🔍 Testing the Integration

### Test Component
I've created a test component `GoogleSheetsTest.tsx` that you can add to your app:

```typescript
import { GoogleSheetsTest } from '@/components/GoogleSheetsTest';

// Add to any page to test
<GoogleSheetsTest />
```

This component will show:
- ✅ Connection status
- ✅ Available stock count
- ✅ Search functionality
- ✅ Individual stock quotes
- ✅ Top gainers and losers
- ✅ Sample stock list

### Manual Testing
```typescript
import { useGoogleSheetsConnection } from '@/hooks/useGoogleSheets';

const { data: isConnected } = useGoogleSheetsConnection();
console.log('Google Sheets connected:', isConnected);
```

## 🔍 Troubleshooting

### Common Issues

1. **"No stock data found" error**
   - Check if your sheet is published to web
   - Verify the sheet ID is correct
   - Make sure the data format matches the expected structure

2. **API key errors**
   - Verify your API key is correct
   - Check if Google Sheets API is enabled
   - Ensure the API key has proper permissions

3. **Rate limiting**
   - Google Sheets API has generous limits
   - If you hit limits, reduce refresh frequency

### Testing Connection
```typescript
import { useGoogleSheetsConnection } from '@/hooks/useGoogleSheets';

const { data: isConnected } = useGoogleSheetsConnection();
console.log('Google Sheets connected:', isConnected);
```

## 📈 Features Available

### ✅ What Works Now
- **Real-time stock data** from your Google Sheet
- **Current prices** and **price changes**
- **Company names** and **exchange information**
- **Search functionality** by symbol or company name
- **Top gainers/losers** sorting
- **Multiple stock quotes** fetching
- **Connection testing** and error handling

### 🔄 Auto-Refresh
- Data refreshes every 5 minutes
- Real-time updates when sheet data changes
- Cached for performance

### 📊 Sample Data Available
Your sheet contains data for stocks like:
- AAPL, GOOGL, MSFT, TSLA, AMZN, META
- NVDA, NFLX, AMD, INTC, ORCL
- And many more...

## 🎉 Success!
Once set up, you'll have:
- ✅ Real stock data from your Google Sheet
- ✅ Current prices and price changes
- ✅ Company information
- ✅ Search and filtering capabilities
- ✅ Top gainers/losers tracking
- ✅ No API rate limits
- ✅ Free and reliable data source

Your app will now use real stock data from Google Sheets! 