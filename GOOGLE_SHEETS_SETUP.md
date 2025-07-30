# Google Sheets API Integration Setup

This project now includes Google Sheets API integration for storing and managing stock prediction data.

## 🚀 Quick Start

1. **Install Dependencies** (already done):
   ```bash
   npm install googleapis google-auth-library
   ```

2. **Service Account Setup**:
   - The service account key file `stocksprediction-5fbb91ce5bb2.json` is already in the project root
   - This file contains the credentials needed to access Google Sheets API

3. **Access the Demo**:
   - Navigate to `/sheets-demo` in your application
   - Or click "Sheets Demo" in the navigation menu

## 📊 What You Can Do

### **Create Spreadsheets**
- Automatically create new Google Sheets with predefined structure
- Two sheets: "Stock Data" and "Predictions"

### **Store Stock Data**
```typescript
const stockData: StockData = {
  symbol: 'AAPL',
  price: 150.25,
  change: 2.50,
  changePercent: 1.69,
  volume: 50000000,
  date: new Date().toISOString(),
};
```

### **Store Prediction Data**
```typescript
const predictionData: PredictionData = {
  symbol: 'AAPL',
  predictedPrice: 155.00,
  confidence: 0.85,
  predictionDate: new Date().toISOString(),
  algorithm: 'LSTM Neural Network',
};
```

### **API Operations**
- ✅ **Read Data**: Fetch stock and prediction data from sheets
- ✅ **Write Data**: Update entire ranges with new data
- ✅ **Append Data**: Add new rows to existing data
- ✅ **Clear Data**: Remove data from specific ranges
- ✅ **Get Info**: Retrieve spreadsheet metadata

## 🔧 Usage Examples

### Using the Hook
```typescript
import { useGoogleSheets } from '@/hooks/useGoogleSheets';

function MyComponent() {
  const {
    loading,
    error,
    writeStockData,
    readStockData,
    appendStockData
  } = useGoogleSheets('your-spreadsheet-id');

  const handleSaveData = async () => {
    try {
      await writeStockData(sampleStockData);
      console.log('Data saved successfully!');
    } catch (err) {
      console.error('Error saving data:', err);
    }
  };
}
```

### Using the Service Directly
```typescript
import { GoogleSheetsService } from '@/services/googleSheets';

const sheetsService = new GoogleSheetsService('your-spreadsheet-id');

// Create new spreadsheet
const newSpreadsheet = await sheetsService.createSpreadsheet('My Stock Data');

// Write data
await sheetsService.writeStockData(stockDataArray);

// Read data
const data = await sheetsService.readStockData('Stock Data!A:F');
```

## 📁 File Structure

```
src/
├── services/
│   └── googleSheets.ts          # Main service class
├── hooks/
│   └── useGoogleSheets.ts       # React hook for components
└── components/
    └── GoogleSheetsDemo.tsx     # Demo component
```

## 🔐 Security Notes

⚠️ **Important Security Considerations**:

1. **Never commit the service account key to version control**
2. **Use environment variables in production**
3. **Restrict API permissions to only what's needed**
4. **Regularly rotate service account keys**

### Production Setup
```typescript
// Use environment variables instead of file path
const auth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY,
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
});
```

## 🎯 Integration with Your App

### Connect to Existing Components
You can integrate Google Sheets with your existing stock prediction components:

```typescript
// In your stock prediction component
import { useGoogleSheets } from '@/hooks/useGoogleSheets';

function StockPredictionComponent() {
  const { writePredictionData } = useGoogleSheets();
  
  const handlePredictionComplete = async (prediction) => {
    await writePredictionData([prediction]);
    // Show success message
  };
}
```

### Automated Data Storage
Set up automatic saving of:
- Real-time stock data
- Prediction results
- User interactions
- Performance metrics

## 🚨 Troubleshooting

### Common Issues

1. **"Cannot find module 'googleapis'"**
   - Run: `npm install googleapis google-auth-library`

2. **"Invalid credentials"**
   - Check that the service account key file is in the project root
   - Verify the file path in `googleSheets.ts`

3. **"Permission denied"**
   - Ensure the service account has access to Google Sheets API
   - Check that the spreadsheet ID is correct

4. **"Spreadsheet not found"**
   - Verify the spreadsheet ID
   - Ensure the service account has access to the spreadsheet

### Debug Mode
Enable detailed logging by adding to your service:
```typescript
const sheets = google.sheets({ 
  version: 'v4', 
  auth,
  // Add this for debugging
  headers: {
    'User-Agent': 'Stonks-App/1.0'
  }
});
```

## 📈 Next Steps

1. **Set up automated data collection**
2. **Create data visualization from sheets**
3. **Implement real-time updates**
4. **Add data validation and error handling**
5. **Set up backup and archiving**

## 🔗 Resources

- [Google Sheets API Documentation](https://developers.google.com/sheets/api)
- [Google Auth Library](https://github.com/googleapis/google-auth-library-nodejs)
- [Google APIs Node.js Client](https://github.com/googleapis/google-api-nodejs-client) 