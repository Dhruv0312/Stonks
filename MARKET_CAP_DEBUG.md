# Market Cap Debug Guide

## Issue: Market Caps Showing as $0

### Possible Causes:

1. **Google Sheets Range Issue**
   - The API call was only fetching columns A:G instead of A:H
   - **FIXED**: Updated to fetch A:H range

2. **Data Format Issues**
   - Market cap values might be formatted incorrectly in Google Sheets
   - Values might include currency symbols, commas, or suffixes

3. **Column Mapping Issue**
   - Market cap data might be in a different column than expected

### Debug Steps:

1. **Check Browser Console**
   - Open browser developer tools (F12)
   - Look for console logs showing market cap data
   - Should see logs like: "Market cap for AAPL: 2500000000000 Raw value: 2500000000000"

2. **Verify Google Sheets Data**
   - Ensure Column H contains market cap values
   - Check that values are numbers (not text)
   - Remove any formatting (currency symbols, commas)

3. **Test Data Formats**
   The parser now handles these formats:
   - `2500000000000` (raw number)
   - `2.5T` (with suffix)
   - `$2.5T` (with currency)
   - `2,500,000,000,000` (with commas)

### Expected Behavior:

1. **Raw Numbers**: `2500000000000` → `$2.5T`
2. **With Suffix**: `2.5T` → `$2.5T`
3. **With Currency**: `$2.5T` → `$2.5T`
4. **With Commas**: `2,500,000,000,000` → `$2.5T`

### Troubleshooting Commands:

```bash
# Check if the app is running
npm run dev

# Check for any build errors
npm run build
```

### Next Steps:

1. Check browser console for debug logs
2. Verify Google Sheets has data in Column H
3. Test with different market cap formats
4. If still showing $0, check the raw API response 