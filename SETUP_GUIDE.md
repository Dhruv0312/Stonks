# Google Sheets Integration Setup Guide

## 🚀 **Quick Start**

### **Important: Backend Server Required**
Your app requires the backend server to be running to access Google Sheets data. No mock data is used.

1. **Install server dependencies:**
   ```bash
   npm install express cors
   ```

2. **Start the backend server:**
   ```bash
   node server.js
   ```

3. **Start your React app:**
   ```bash
   npm run dev
   ```

4. **Visit the demo pages:**
   - `/sheets-demo` - Test Google Sheets functionality
   - `/existing-sheet` - View your sheet data
   - `/sheet-integration` - See data analysis

### **Backend Server Setup**

The backend server is required to access your Google Sheets data. The app will show "Data not available" if the server is not running.

#### **Step 1: Install Server Dependencies**
```bash
# Install server dependencies
npm install express cors
```

#### **Step 2: Start the Backend Server**
```bash
# In a new terminal window
node server.js
```

The server will start on `http://localhost:3001` and automatically connect to your Google Sheet.

#### **Step 3: Test the Integration**
1. Start your React app: `npm run dev`
2. Visit `/existing-sheet` to see real data from your Google Sheet
3. If the server isn't running, you'll see clear instructions on how to start it

## 📊 **What You Can Do Now**

### **View Your Sheet Data**
- **Raw Data**: See all data from your Google Sheet in table format
- **Data Analysis**: Get statistics, trends, and insights
- **Symbol Tracking**: Click on stock symbols for detailed views
- **Real-time Updates**: Refresh data with one click

### **Your Sheet Structure**
Your Google Sheet (`10F2ON8N3phmbvKQNQFfKet44XoytFxA3SgUiIlHl6VY`) contains:
- **Stock Data**: Symbol, Price, Change, Volume, Date
- **Predictions**: Symbol, Predicted Price, Confidence, Algorithm
- **Historical Data**: Past performance and trends
- **Analysis**: Calculated metrics and insights

### **API Endpoints Available**
When the server is running, these endpoints are available:
- `GET /api/sheets/:id/info` - Get spreadsheet info
- `GET /api/sheets/:id/read?range=A:Z` - Read data
- `POST /api/sheets/:id/write` - Write data
- `POST /api/sheets/:id/append` - Append data
- `POST /api/sheets/create` - Create new spreadsheet
- `DELETE /api/sheets/:id/clear?range=A:Z` - Clear range

## 🔧 **Integration with Your App**

### **Using the Hook in Components**
```typescript
import { useExistingSheet } from '@/hooks/useExistingSheet';

function MyComponent() {
  const { 
    sheetData, 
    getColumnData, 
    filterByColumnValue,
    isStockData 
  } = useExistingSheet();

  // Get all stock prices
  const prices = getColumnData('price');
  
  // Get data for specific symbol
  const aaplData = filterByColumnValue('symbol', 'AAPL');
  
  // Check if it's stock data
  if (isStockData()) {
    // Use for stock analysis
  }
}
```

### **Available Functions**
- `getColumnData(columnName)` - Get all values from a column
- `getUniqueColumnValues(columnName)` - Get unique values
- `filterByColumnValue(columnName, value)` - Filter by specific value
- `isStockData()` - Check if data looks like stock data
- `isPredictionData()` - Check if data looks like predictions

## 🎯 **Next Steps**

### **1. Customize Data Display**
- Modify the table columns in `ExistingSheetData.tsx`
- Add charts and graphs using your existing chart components
- Create custom filters and search functionality

### **2. Add Real-time Updates**
```typescript
// Add to your component
useEffect(() => {
  const interval = setInterval(() => {
    refreshData();
  }, 30000); // Refresh every 30 seconds
  
  return () => clearInterval(interval);
}, [refreshData]);
```

### **3. Integrate with Your Dashboard**
- Add sheet data to your main dashboard
- Create widgets showing key metrics
- Add data export functionality

### **4. Add Write Operations**
- Enable users to add new stock data
- Allow prediction updates
- Add data validation

## 🔐 **Security Notes**

### **Production Setup**
1. **Move credentials to environment variables:**
   ```javascript
   // In server.js
   const auth = new JWT({
     email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
     key: process.env.GOOGLE_PRIVATE_KEY,
     scopes: ['https://www.googleapis.com/auth/spreadsheets']
   });
   ```

2. **Add authentication to your app**
3. **Use HTTPS in production**
4. **Implement rate limiting**

### **Environment Variables**
Create a `.env` file for the server:
```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

## 🚨 **Troubleshooting**

### **Common Issues**

1. **"Cannot find module 'googleapis'"**
   - Run: `npm install googleapis google-auth-library`

2. **"Invalid credentials"**
   - Check that the service account key file is in the project root
   - Verify the service account has access to Google Sheets API

3. **"CORS error"**
   - Make sure the server is running on port 3001
   - Check that CORS is enabled in the server

4. **"Permission denied"**
   - Ensure the service account has access to your Google Sheet
   - Share the sheet with the service account email

### **Debug Mode**
Enable detailed logging:
```javascript
// In server.js
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
```

## 📈 **Performance Tips**

1. **Cache frequently accessed data**
2. **Use pagination for large datasets**
3. **Implement request debouncing**
4. **Add loading states and error handling**

## 🔗 **Resources**

- [Google Sheets API Documentation](https://developers.google.com/sheets/api)
- [Express.js Documentation](https://expressjs.com/)
- [React Query for Data Fetching](https://tanstack.com/query)

---

**Your Google Sheets integration is now ready!** 🎉

The app now requires the backend server to be running. No mock data is used - you'll see clear error messages with instructions if the server isn't available. 