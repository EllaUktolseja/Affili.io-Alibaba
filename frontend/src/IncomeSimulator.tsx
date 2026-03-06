import React, { useState, useEffect } from 'react';
import { 
  Users, 
  BarChart3, 
  Percent, 
  DollarSign, 
  TrendingDown, 
  RotateCcw,
  Sparkles,
  Loader2 // Tambahkan ini untuk icon loading
} from 'lucide-react';
import './IncomeSimulator.css';

const IncomeSimulator: React.FC = () => {
  const [userId, setUserId] = useState<number>(1);
  const [productName, setProductName] = useState<string>('Test Product');
  const [traffic, setTraffic] = useState<number>(1000);
  const [commRate, setCommRate] = useState<number>(25);
  const [opCosts, setOpCosts] = useState<number>(500);

  const [results, setResults] = useState({
    conversions: 0,
    grossRevenue: 0,
    commissionEarned: 0,
    netIncome: 0,
    roi: 0,
    incomeMin: 0,
    incomeMax: 0,
    opportunityScore: 0,
    ctr: 0,
    cr: 0,
    aiInsight: ''
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    
    const timeoutId = setTimeout(() => {
      fetch(`${API_BASE_URL}/analyze?user_id=${userId}&product_name=${productName}`)
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch analysis data');
          return res.json();
        })
        .then((data) => {
          const metrics = data.metrics || {};
          const incomeMin = metrics.income_min || 0;
          const incomeMax = metrics.income_max || 0;
          const avgIncome = (incomeMin + incomeMax) / 2;
          
          const estimatedClicks = (traffic * (metrics.ctr || 0)) / 100;
          const estimatedSales = estimatedClicks * ((metrics.cr || 0) / 100);
          const commissionEarned = (avgIncome * (commRate / 100)) * Math.max(1, traffic / 1000);
          const netIncome = commissionEarned - opCosts;
          const roi = opCosts > 0 ? (netIncome / opCosts) * 100 : 0;

          setResults({
            conversions: Math.floor(estimatedSales),
            grossRevenue: Math.floor(avgIncome * Math.max(1, traffic / 1000)),
            commissionEarned: Math.floor(commissionEarned),
            netIncome: Math.floor(netIncome),
            roi: Math.round(roi * 10) / 10,
            incomeMin: Math.floor(incomeMin),
            incomeMax: Math.floor(incomeMax),
            opportunityScore: data.opportunity_score || 0,
            ctr: metrics.ctr || 0,
            cr: metrics.cr || 0,
            aiInsight: data.ai_insight || 'No AI insight available'
          });
          setLoading(false);
        })
        .catch((err) => {
          console.error('Analysis fetch error:', err);
          setError(err.message);
          setLoading(false);
        });
    }, 500); // Delay sedikit agar transisi loading terasa

    return () => clearTimeout(timeoutId);
  }, [userId, productName, traffic, commRate, opCosts]);

  const resetToDefaults = () => {
    setUserId(1);
    setProductName('Test Product');
    setTraffic(1000);
    setCommRate(25);
    setOpCosts(500);
  };

  return (
    <div className="simulator-container">
      <div className="simulator-header">
        <h2>Income Simulator</h2>
        <p>What-if analysis for strategic planning</p>
      </div>

      <div className="simulator-grid">
        <section className="panel parameter-panel">
          <h3>Simulation Parameters</h3>
          
          <div className="input-group">
            <div className="input-header">
              <span><Users size={16} /> User ID</span>
              <span className="badge">{userId}</span>
            </div>
            <input type="number" value={userId} onChange={(e) => setUserId(Number(e.target.value))} className="custom-input" />
          </div>

          <div className="input-group">
            <div className="input-header">
              <span><BarChart3 size={16} /> Product Name</span>
              <span className="badge">{productName}</span>
            </div>
            <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} className="custom-input" />
          </div>

          <div className="input-group">
            <div className="input-header">
              <span><Users size={16} /> Monthly Traffic</span>
              <span className="badge">{traffic.toLocaleString()}</span>
            </div>
            <input type="range" min="1000" max="50000" step="1000" value={traffic} onChange={(e) => setTraffic(Number(e.target.value))} />
          </div>

          <div className="input-group">
            <div className="input-header">
              <span><Percent size={16} /> Commission Rate</span>
              <span className="badge">{commRate}%</span>
            </div>
            <input type="range" min="5" max="50" value={commRate} onChange={(e) => setCommRate(Number(e.target.value))} />
          </div>

          <button className="btn-reset" onClick={resetToDefaults}>
            <RotateCcw size={16} /> Reset
          </button>
        </section>

        <section className="results-column">
          <div className={`panel results-panel ${loading ? 'loading-blur' : ''}`}>
            {/* ... isi panel hasil tetap sama ... */}
            <div className="result-card">
              <div><p>Net Income</p><h2 className="text-green">${results.netIncome.toLocaleString()}</h2></div>
              <div className="roi-badge">ROI: {results.roi}%</div>
            </div>
          </div>
        </section>
      </div>

      {/* AI Recommendations Section */}
      <div className="panel recommendations-box">
        <div className="ai-header">
          <Sparkles size={20} className={loading ? "animate-spin-slow" : "text-purple"} />
          <h3>AI Strategic Recommendations</h3>
          {loading && <Loader2 size={16} className="animate-spin" />}
        </div>

        <div className="ai-content-wrapper">
          {loading ? (
            <div className="ai-loading-placeholder">
              <div className="loading-line"></div>
              <div className="loading-line short"></div>
              <p>Analyzing market trends for {productName}...</p>
            </div>
          ) : error ? (
            <p className="text-red">Error: {error}</p>
          ) : (
            <div className="ai-text-display">
              {results.aiInsight.replace(/\*\*/g, '')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IncomeSimulator;