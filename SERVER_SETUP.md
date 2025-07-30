# 🚀 Server Setup Guide

## Quick Start Options

### Option 1: Run Both Servers Together (Recommended)
```bash
npm install
npm run start
```
This will start both the React app and Google Sheets server simultaneously.

### Option 2: Run Servers Separately

#### Terminal 1 - Google Sheets Server:
```bash
npm run server
```

#### Terminal 2 - React App:
```bash
npm run dev
```

### Option 3: Use Batch/PowerShell Scripts

#### Windows Batch File:
```bash
start-server.bat
```

#### PowerShell Script:
```powershell
.\start-server.ps1
```

## 🔧 Server Management

### Start Google Sheets Server:
- **Simple:** `npm run server`
- **With Auto-restart:** `npm run server:dev`
- **Manual:** `node server.js`

### Start React App:
- **Development:** `npm run dev`
- **Build:** `npm run build`
- **Preview:** `npm run preview`

## 🌐 Access Points

- **React App:** http://localhost:8083 (or next available port)
- **Google Sheets API:** http://localhost:3001
- **API Test:** http://localhost:3001/api/test

## 📋 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run start` | Start both servers together |
| `npm run server` | Start Google Sheets server only |
| `npm run server:dev` | Start server with auto-restart |
| `npm run dev` | Start React development server |
| `npm run build` | Build React app for production |

## 🛠️ Troubleshooting

### Server Won't Start?
1. Check if port 3001 is in use
2. Ensure all dependencies are installed: `npm install`
3. Verify Google Sheets credentials are present

### Data Not Loading?
1. Ensure Google Sheets server is running on port 3001
2. Check browser console for errors
3. Test API endpoint: http://localhost:3001/api/test

### Port Already in Use?
- React app will automatically find the next available port
- Google Sheets server can be changed in `server.js`

## 🔒 Security Notes

- Keep `stocksprediction-5fbb91ce5bb2.json` secure
- Don't commit credentials to version control
- Use environment variables in production

## 📁 File Structure

```
Stonks/
├── server.js                 # Google Sheets API server
├── start-server.bat         # Windows batch file
├── start-server.ps1         # PowerShell script
├── package.json             # Project dependencies
└── SERVER_SETUP.md         # This file
``` 