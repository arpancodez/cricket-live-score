# Cricket API Setup Guide

## 🏏 Get Live Cricket Data

This application is configured to fetch **real-time live cricket scores** including the **India A vs Australia A** match and other ongoing games.

## Current Status
✅ Auto-refresh every 30 seconds
✅ API-ready architecture
✅ Fallback sample data (currently showing)

## 🚀 Enable Live Data (3 Easy Steps)

### Step 1: Get a Free Cricket API Key

Choose one of these free cricket APIs:

#### Option A: CricketData.org (Recommended)
1. Visit: https://cricketdata.org
2. Click "Sign Up" (Free plan available)
3. Verify your email
4. Copy your API key from the dashboard
5. Free tier includes:
   - Live scores updated every 30 seconds
   - Current matches
   - Match details

#### Option B: RapidAPI - Cricbuzz
1. Visit: https://rapidapi.com/cricketapilive/api/cricbuzz-cricket
2. Sign up for free account
3. Subscribe to free plan
4. Copy your API key

### Step 2: Add API Key to Vercel

1. Go to your Vercel dashboard: https://vercel.com
2. Select your project: `cricket-live-score`
3. Go to **Settings** → **Environment Variables**
4. Add a new variable:
   - **Name**: `CRICKET_API_KEY`
   - **Value**: Your API key from Step 1
   - **Environment**: Select all (Production, Preview, Development)
5. Click **Save**

### Step 3: Redeploy

1. Go to **Deployments** tab
2. Click on the latest deployment
3. Click **Redeploy** button
4. Wait 1-2 minutes for deployment
5. Your app will now show LIVE cricket data! 🎉

## 🔄 How It Works

- **With API Key**: Fetches real live data from Cricket API
- **Without API Key**: Shows sample data with India A vs Australia A
- **Auto-Refresh**: Page updates every 30 seconds automatically
- **Error Handling**: Falls back to sample data if API fails

## 📊 What You'll See

### Live Data Includes:
- Current live matches
- Real-time scores
- Ball-by-ball updates
- Match status
- Team information
- Venue details

### Sample Data (Current):
- India A vs Australia A
- India vs South Africa  
- England vs New Zealand

## 🎯 Features

✅ Real-time score updates
✅ Auto-refresh every 30 seconds
✅ Multiple match support
✅ Mobile responsive design
✅ Clean Google-style UI
✅ Error handling and fallbacks

## 🔧 Troubleshooting

### No live data showing?
1. Check if `CRICKET_API_KEY` is set in Vercel
2. Verify API key is valid
3. Check API rate limits (free tier limits)
4. Redeploy after adding environment variable

### API Rate Limits:
- CricketData Free: 100 requests/day
- RapidAPI Free: Varies by plan
- App auto-refreshes: 120 requests/hour

## 📝 API Response Format

The API returns data in this format:
```json
{
  "success": true,
  "data": [
    {
      "matchType": "T20",
      "title": "India A vs Australia A",
      "team1": "India A",
      "score1": "185/5 (20.0)",
      "team2": "Australia A",
      "score2": "178/7 (20.0)",
      "status": "India A won by 7 runs"
    }
  ],
  "timestamp": "2025-11-07T12:00:00.000Z",
  "source": "live-api"
}
```

## 🌐 Live App

Your app is deployed at:
https://cricket-live-score-seven.vercel.app

## 💡 Pro Tips

1. **Free API Limits**: Most free plans limit requests. 30-second refresh is optimized.
2. **Multiple APIs**: Keep backup API keys for redundancy
3. **Monitor Usage**: Check your API dashboard regularly
4. **Upgrade**: Consider paid plans for production apps with high traffic

## 🆘 Need Help?

If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables are set
3. Test API key directly in Cricket API dashboard
4. Ensure API subscription is active

---

**Note**: Without an API key, the app shows sample data. To see real live cricket scores for India A vs Australia A and other matches, follow the setup steps above!
