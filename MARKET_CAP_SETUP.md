# Market Cap Setup Guide

## Overview
The Stonks application now supports real-time market cap data from Google Sheets. This guide explains how to set up your Google Sheets to include market cap information.

## Google Sheets Structure

Your Google Sheets should have the following column structure:

| Column | Data | Description |
|--------|------|-------------|
| A | Index/ID | Row identifier |
| B | Symbol | Stock symbol (e.g., AAPL, MSFT) |
| C | Company Name | Full company name |
| D | Company Name | Company name (used for display) |
| E | Price | Current stock price |
| F | Change | Price change from previous close |
| G | Change % | Percentage change from previous close |
| **H** | **Market Cap** | **Market capitalization value** |

## Market Cap Format

Market cap values should be entered as numbers without currency symbols or commas:

### Examples:
- `2500000000000` (for $2.5T)
- `150000000000` (for $150B)
- `50000000000` (for $50B)
- `1000000000` (for $1B)

## Application Features

### 1. All Stocks Page
- Market cap is displayed in both grid and list views
- Formatted automatically (e.g., $2.5T, $150B, $50B)
- Sortable by market cap value

### 2. Dashboard Page
- Market cap displayed in Overview tab
- Market cap displayed in Profile tab
- Real-time updates from Google Sheets

### 3. Data Processing
- Automatic parsing of market cap values
- Handles various number formats
- Fallback to $0 if data is missing

## Implementation Details

### Data Fetching
- Market cap data is fetched from Column H of your Google Sheets
- Updates every 60 seconds automatically
- Cached for 5 minutes to optimize performance

### Formatting
The application uses the `formatMarketCap` utility function to format values:
- Trillions: $X.XXT
- Billions: $X.XXB  
- Millions: $X.XXM
- Thousands: $X.XXK
- Smaller values: Full currency format

### Error Handling
- Missing market cap data defaults to $0
- Invalid number formats are handled gracefully
- Empty cells are treated as $0

## Troubleshooting

### Market Cap Not Displaying
1. Check that Column H contains market cap data
2. Ensure values are numbers (not text)
3. Remove any currency symbols or commas
4. Verify Google Sheets API access

### Incorrect Formatting
1. Market cap values should be raw numbers
2. Don't include "B", "T", or other suffixes
3. Use only digits and decimal points

### Data Not Updating
1. Check Google Sheets API connection
2. Verify sheet permissions
3. Ensure the correct sheet ID is configured

## Example Google Sheets Row

```
A1: 1
B1: AAPL
C1: Apple Inc.
D1: Apple Inc.
E1: 150.25
F1: 2.15
G1: 1.45%
H1: 2500000000000
```

This would display as:
- Symbol: AAPL
- Price: $150.25
- Change: +$2.15 (+1.45%)
- Market Cap: $2.5T 