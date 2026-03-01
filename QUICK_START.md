# 🚀 Quick Start Guide - AFFILI.IO with New Features

## What's New? ✨

Your AFFILI.IO platform now has these incredible features:

### 1. 🔔 **Notification Panel** (Bell Icon)
- Click the **bell icon** in the top navbar
- View real-time business alerts and updates
- Click **"View All Notifications"** to go to the Alerts page

### 2. ⚙️ **Settings Panel** (Settings Icon)
- Click the **gear icon** in the navbar
- Customize notifications, sound, and email preferences
- Choose update frequency: Real-time, Hourly, or Daily

### 3. 📊 **Trend Analysis Detail Page** (Click "Analyze Trend")
When you click the **"Analyze Trend"** button on any product in the Scanner:

**You'll see:**
- **🧠 AI Insight**: Smart business analysis and recommendations
- **📈 Revenue Trend**: 7-day performance chart with growth badge
- **📦 Transactions**: Success/refund breakdown with health indicators  
- **📊 Product Movements**: Which products are rising or cooling
- **💯 Business Health Score**: Overall performance on a 0-100 scale

### 4. 💰 **Paylabs Integration** (Scanner Page)
The Scanner page now shows your business metrics:
- **Total Revenue**: Your 30-day earnings
- **Profit Margin**: Net profit amount
- **Transaction Count**: Total orders processed
- **Refund Rate**: Percentage of refunded orders

A **"View Detailed Analytics"** button takes you to the full trend analysis page.

---

## 🎯 How To Use

### Starting the Application

```bash
# Terminal 1: Start Backend
cd backend
pip install -r requirements.txt
python3 main.py
# Runs on http://localhost:8000

# Terminal 2: Start Frontend
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

### Using the Features

#### **Explore Notifications**
1. Open the app
2. Click the **🔔 Bell** in the top right
3. See your latest business alerts
4. Click **"View All Notifications"** to see more

#### **Customize Settings**
1. Click the **⚙️ Settings** gear icon
2. Toggle notifications, sound, email options
3. Choose your preferred update frequency
4. Settings save automatically

#### **View Trend Analysis**
1. Go to **Scanner** page
2. See **"💰 Business Performance"** section with your metrics
3. Click **"View Detailed Analytics"** button
4. Explore 7-day trends, AI insights, and product movements
5. Or click **"Analyze Trend"** on any product card

#### **Check Paylabs Metrics**
1. On the **Scanner** page
2. Look for the **"💰 Business Performance (Paylabs)"** section
3. See your revenue, profit, transactions, and refund rate
4. Click the button below to get detailed insights

---

## 📊 Understanding the Insights

### AI Insight Panel
- Shows your business health with a score (0-100)
- Provides revenue analysis and growth trends
- Highlights top-performing products
- Gives actionable recommendations

### Revenue Trend
- 7-day chart showing daily performance
- Growth badges show if you're trending up or down
- Compare daily vs weekly vs peak revenue

### Transaction Overview  
- **Paid**: Successful completed transactions
- **Refunded**: Orders that were refunded
- **Refund Rate**: Percentage of refunds
- ⚠️ Warning badge if refund rate exceeds 5%

### Product Trends
- **🔥 Rising**: Products gaining momentum (positive growth)
- **❄️ Cooling**: Products losing momentum (negative growth)
- Growth percentage calculated from 7-day comparison

### Business Score
- **80-100**: Excellent! Your business is thriving
- **60-79**: Good! Keep improving metrics  
- **Below 60**: Focus on reducing refunds and growing revenue

---

## 🎨 Design Features

All new components feature:
- ✅ Smooth animations and transitions
- ✅ Color-coded indicators (green=good, red=warning, blue=neutral)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Professional gradient backgrounds
- ✅ Interactive hover effects
- ✅ Accessibility-first design

---

## 💡 Pro Tips

1. **Click "View All Notifications"** to quickly jump to the Alerts page
2. **Watch the Business Score** - it updates whenever you sync data
3. **Check Product Trends** to focus on your winners (🔥 Rising products)
4. **Monitor Refund Rate** - high refunds indicate product or service issues
5. **Generate Reports** - Click through to Trend Analysis for in-depth data

---

## 📱 Mobile Users

All features work perfectly on mobile:
- Notifications and Settings panels slide in from the right
- Charts and tables adapt to screen size
- Touch-friendly buttons and interactions
- Readable text and proper spacing

---

## 🔧 Troubleshooting

**"Can't see Paylabs metrics?"**
- Make sure backend is running on http://localhost:8000
- Check that `/paylabs/analytics` endpoint is responding
- Try clicking "Sync Data" again

**"Notifications not showing?"**
- Backend must be running
- Check browser console for errors (F12)
- Refresh the page

**"Settings not saving?"**
- Settings are preference-based; preferences persist per session
- For permanent storage, backend persistence is needed

---

## 🌟 Features Highlight

| Feature | Location | What It Does |
|---------|----------|-------------|
| 📬 Notifications | Bell icon | View and manage business alerts |
| ⚙️ Settings | Gear icon | Customize preferences |
| 📊 Analytics | Scanner Detail | 7-day trends & AI insights |
| 💰 Metrics | Scanner Page | Real-time business stats |
| 📈 Growth | All pages | Color-coded status indicators |

---

## 📞 API Endpoints

### For Developers

**Get Analytics Data:**
```
GET http://localhost:8000/paylabs/analytics
```

Response includes:
- Transaction metrics
- Revenue trends (7-day)
- Product performance
- Business score
- Weekly growth badges

---

## 🎓 Learn More

Check out **FEATURES.md** for detailed technical documentation of all implementations.

---

## ✅ Verification Checklist

- [x] Bell icon opens notification panel
- [x] Settings icon opens settings panel  
- [x] "Show All Notifications" button redirects to Alerts
- [x] Trend Analysis page shows all required data
- [x] AI Insights panel displays analysis
- [x] Revenue trend chart renders
- [x] Transaction data appears
- [x] Product movements list shows
- [x] Business score circle animates
- [x] Paylabs metrics show on Scanner
- [x] "View Detailed Analytics" button works
- [x] UI theme matches throughout
- [x] Mobile responsive
- [x] All animations smooth

---

**Team SYNC1** | March 2026 | AFFILI.IO v2.0 🚀
