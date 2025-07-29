# Google Sheets + Google Finance Integration Setup

## 🎯 Overview
This integration uses Google Sheets as a bridge to fetch Google Finance data, providing real-time stock prices and historical data for your app.

## 📋 Prerequisites
1. Google Account
2. Google Cloud Console access
3. Your Google Sheet: https://docs.google.com/spreadsheets/d/14-w8T7IjI77VprOohau29sPpjZIH1nNHEkB-hiSY5g0/edit?usp=sharing

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

### Step 2: Configure Your Google Sheet

#### 2.1 Add Headers
In your Google Sheet, add these headers in row 1:
```
A1: Date
B1: Close
C1: Open
D1: High
E1: Low
F1: Volume
```

#### 2.2 Add Google Finance Formula
In cell A2, add this formula:
```
=GOOGLEFINANCE("AAPL", "all", TODAY()-30, TODAY())
```

This will fetch 30 days of AAPL data automatically.

#### 2.3 Create Multiple Stock Tabs
1. **Rename the current tab to "AAPL"**
2. **Add new tabs for other stocks:**
   - Right-click on tab → "Duplicate"
   - Rename to stock symbol (e.g., "GOOGL", "MSFT", "TSLA")
   - Update the formula in each tab:
     - GOOGL tab: `=GOOGLEFINANCE("GOOGL", "all", TODAY()-30, TODAY())`
     - MSFT tab: `=GOOGLEFINANCE("MSFT", "all", TODAY()-30, TODAY())`
     - TSLA tab: `=GOOGLEFINANCE("TSLA", "all", TODAY()-30, TODAY())`

### Step 3: Publish Your Sheet
1. Go to **File → Share → Publish to web**
2. Choose **Entire Document**
3. Click **Publish**
4. Make sure the sheet is viewable by anyone with the link

### Step 4: Configure Environment Variables
Create or update your `.env` file:
```env
VITE_GOOGLE_SHEET_ID=14-w8T7IjI77VprOohau29sPpjZIH1nNHEkB-hiSY5g0
VITE_GOOGLE_SHEETS_API_KEY=YOUR_API_KEY_HERE
```

Replace `YOUR_API_KEY_HERE` with the API key from Step 1.

## 🚀 Usage in Your App

### Basic Usage
```typescript
import { useGoogleStockQuote, useGoogleCandles } from '@/hooks/useGoogleSheets';

// In your component
const { data: quote, isLoading } = useGoogleStockQuote('AAPL');
const { data: candles } = useGoogleCandles('AAPL');

if (isLoading) return <div>Loading...</div>;
if (quote) {
  console.log('Current price:', quote.c);
  console.log('Change:', quote.d);
  console.log('Percent change:', quote.dp);
}
```

### Available Hooks
- `useGoogleStockQuote(symbol)` - Get current stock quote
- `useGoogleCandles(symbol)` - Get historical data for charts
- `useGoogleStockHistory(symbol)` - Get raw historical data
- `useGoogleAvailableSymbols()` - Get list of available stocks
- `useGoogleSheetsConnection()` - Test connection

## 📊 Data Structure

### Stock Quote Format
```typescript
{
  c: number;    // Current price (close)
  d: number;    // Change
  dp: number;   // Percent change
  h: number;    // High price
  l: number;    // Low price
  o: number;    // Open price
  pc: number;   // Previous close
  t: number;    // Timestamp
}
```

### Candle Data Format
```typescript
{
  c: number[];  // Close prices
  h: number[];  // High prices
  l: number[];  // Low prices
  o: number[];  // Open prices
  s: string;    // Status ('ok', 'no_data', 'error')
  t: number[];  // Timestamps
  v: number[];  // Volumes
}
```

## 🔍 Troubleshooting

### Common Issues

1. **"No data found" error**
   - Check if the Google Finance formula is working in your sheet
   - Verify the stock symbol is correct
   - Make sure the sheet is published to web

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

## 📈 Google Finance Formulas

### Available Attributes
- `"price"` - Current price
- `"open"` - Opening price
- `"high"` - Day's high
- `"low"` - Day's low
- `"volume"` - Trading volume
- `"all"` - All data (recommended)

### Example Formulas
```
=GOOGLEFINANCE("AAPL", "price")           // Current price only
=GOOGLEFINANCE("AAPL", "all", TODAY()-7)  // Last 7 days
=GOOGLEFINANCE("AAPL", "all", "1/1/2024", TODAY())  // Since Jan 1, 2024
```

## 🔄 Auto-Refresh
- Google Finance data updates automatically
- Your app refreshes every 5 minutes
- Historical data is cached for performance

## 🎉 Success!
Once set up, you'll have:
- ✅ Real-time stock data from Google Finance
- ✅ Historical data for charts
- ✅ No API rate limits
- ✅ Free and reliable data source
- ✅ Automatic updates

Your app will now use Google Finance data through Google Sheets! 