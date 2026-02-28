# Frontend & Backend Integration Setup

## Project Structure
- **Frontend**: React + TypeScript + Vite (runs on port 5173)
- **Backend**: FastAPI + Python (runs on port 8000)

## Prerequisites
- Node.js and npm installed
- Python 3.8+ installed
- Git (optional)

## Backend Setup

### 1. Install Python Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Set up Environment Variables
Create a `.env` file in the backend folder:
```
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Run the Backend
```bash
cd backend
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

Backend should be running at: `http://127.0.0.1:8000`
- API endpoints available at: `http://127.0.0.1:8000/docs`

## Frontend Setup

### 1. Install Node Dependencies
```bash
cd frontend
npm install
```

### 2. Run the Frontend Development Server
```bash
cd frontend
npm run dev
```

Frontend should be running at: `http://localhost:5173`

## API Endpoints

### Market Overview
- **GET** `/market-overview` - Get cached market data (proxied by frontend during development)
- **GET** `/refresh-trends` - Refresh trends from Google Trends API (proxied)
- **GET** `/ask` - Query the Gemini model
- **GET** `/analyze` - Analyze product performance using local analysis engine


### Example Response (Market Overview)
```json
{
  "rising_categories": [
    {
      "category": "fitness",
      "growth_percent": 12.3,
      "change_from_yesterday": 3
    },
    ...
  ],
  "declining_categories": [
    {
      "category": "baby",
      "growth_percent": -5.2,
      "change_from_yesterday": -1
    },
    ...
  ],
  "avg_trend_velocity": {
      "value_percent": 12.45,
      "momentum": "High Momentum"
  },
  "market_trend_growth": {...},
  "market_share": [...],
  "trend_velocity_score": [
    {
      "category": "fitness",
      "score": 78.5
    },
    ...
  ]
}
```

## Integration Details

### Frontend-Backend Communication
1. Frontend makes requests to `http://127.0.0.1:8000/*` but during development Vite proxies these paths to avoid CORS issues.
2. Backend has no CORS middleware; the proxy handles cross‑origin.
3. Data flows are:
   - **Market Overview**: Frontend → `/market-overview` → Backend returns cached data
   - **Refresh Trends**: Frontend → `/refresh-trends` → Backend fetches fresh Google Trends data
   - Error handling includes fallback to dummy data if Google Trends API fails

### Key Features
- ✅ Real-time market trend data from Google Trends
- ✅ Category-based trend velocity scoring
- ✅ Error handling with user-friendly messages
- ✅ Manual refresh button to update trends
- ✅ Fallback dummy data when API fails
- ✅ Responsive dashboard UI

## Troubleshooting

### Backend Connection Issues
If you see "Failed to load data" error:
1. Ensure backend is running on `http://127.0.0.1:8000`
2. Check CORS configuration in `main.py`
3. Check browser console for network errors

### Google Trends API Rate Limiting
If the backend returns dummy data:
- Google Trends may be rate limiting requests
- The application uses fallback dummy data automatically
- Try again in a few minutes or adjust `time.sleep()` in `market_service.py`

### Dependencies Issues
```bash
# Clear pip cache and reinstall
pip install --no-cache-dir -r requirements.txt

# Or use virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## Running Both Simultaneously

### Option 1: Two Terminal Windows
**Terminal 1 - Backend:**
```bash
cd backend
uvicorn main:app --reload
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Option 2: Use Process Manager (optional)
```bash
# Install pm2 globally (optional)
npm install -g pm2

# Create ecosystem.config.js in project root with:
module.exports = {
  apps: [
    {
      name: 'backend',
      cwd: './backend',
      script: 'uvicorn',
      args: 'main:app --reload'
    },
    {
      name: 'frontend',
      cwd: './frontend',
      script: 'npm',
      args: 'run dev'
    }
  ]
};

pm2 start ecosystem.config.js
```

## Features Working

- ✅ Dashboard displays real-time market trends
- ✅ Rising/Declining categories count
- ✅ Average trend velocity percentage
- ✅ Trend velocity scores per category
- ✅ Refresh button to update trends
- ✅ Error handling and retry mechanism
- ✅ CORS configured for frontend-backend communication
