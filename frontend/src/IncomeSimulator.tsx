import React, { useState, useEffect, useMemo } from 'react';
import { 
  Users, 
  BarChart3, 
  RotateCcw, 
  Sparkles, 
  Loader2, 
  TrendingUp, 
  Wallet 
} from 'lucide-react';
import './IncomeSimulator.css';

const IncomeSimulator: React.FC = () => {
  const [userId, setUserId] = useState<number>(1);
  const [productName, setProductName] = useState<string>('Tshirt');
  const [traffic, setTraffic] = useState<number>(5000);
  const [commRate, setCommRate] = useState<number>(15);
  const [opCosts, setOpCosts] = useState<number>(200);

  const [baseline, setBaseline] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    
    fetch(`${API_BASE_URL}/analyze?user_id=${userId}&product_name=${productName}`)
      .then(res => {
        if (!res.ok) throw new Error('Produk atau User tidak ditemukan');
        return res.json();
      })
      .then(data => {
        setBaseline(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId, productName]);

  const simulation = useMemo(() => {
    if (!baseline) return null;

    const clicks = traffic * (baseline.base_ctr / 100);
    const sales = clicks * (baseline.base_cr / 100);
    const grossRevenue = sales * baseline.avg_price;
    const commission = grossRevenue * (commRate / 100);
    const netIncome = commission - opCosts;
    const roi = opCosts > 0 ? (netIncome / opCosts) * 100 : 0;

    return {
      clicks: Math.floor(clicks),
      sales: sales.toFixed(1),
      commission: Math.floor(commission),
      netIncome: Math.floor(netIncome),
      roi: roi.toFixed(1),
      productRealName: baseline.product_name,
      aiInsight: baseline.ai_insight || "Gunakan slider untuk melihat potensi strategi."
    };
  }, [traffic, commRate, opCosts, baseline]);

  const resetToDefaults = () => {
    setTraffic(5000);
    setCommRate(15);
    setOpCosts(200);
  };

  return (
    <div className="simulator-container">
      <div className="simulator-header">
        <h2><TrendingUp size={20} style={{marginRight: '8px'}} /> Income Simulator</h2>
        <p>Real-time projection based on CSV historical data</p>
      </div>

      <div className="simulator-grid">
        {/* LEFT PANEL: PARAMETERS */}
        <section className="panel parameter-panel">
          <div className="input-group">
            <label><Users size={14} /> User ID </label>
            <input type="number" value={userId} onChange={(e) => setUserId(Number(e.target.value))} className="custom-input" />
          </div>

          <div className="input-group">
            <label><BarChart3 size={14} /> Product Search</label>
            <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} className="custom-input" />
            {simulation && <small className="found-tag">Matched: {simulation.productRealName}</small>}
          </div>

          <div className="input-group">
            <div className="input-header">
              <span>Monthly Traffic</span>
              <span className="badge-purple">{traffic.toLocaleString()}</span>
            </div>
            <input type="range" min="1000" max="100000" step="500" value={traffic} onChange={(e) => setTraffic(Number(e.target.value))} />
          </div>

          <div className="input-group">
            <div className="input-header">
              <span>Commission Rate (%)</span>
              <span className="badge-purple">{commRate}%</span>
            </div>
            <input type="range" min="1" max="50" value={commRate} onChange={(e) => setCommRate(Number(e.target.value))} />
          </div>

          <div className="input-group">
            <div className="input-header">
              <span>Operational Costs ($)</span>
              <span className="badge-purple">${opCosts}</span>
            </div>
            <input type="range" min="0" max="2000" step="50" value={opCosts} onChange={(e) => setOpCosts(Number(e.target.value))} />
          </div>

          <button className="btn-reset" onClick={resetToDefaults}><RotateCcw size={16} /> Reset Sliders</button>
        </section>

        {/* RIGHT PANEL: RESULTS */}
        <section className="results-column">
          <div className={`panel results-panel ${loading ? 'loading-blur' : ''}`}>
             <div className="main-income">
                <p>ESTIMATED NET INCOME</p>
                <h2 className={simulation && simulation.netIncome >= 0 ? "text-green" : "text-red"}>
                  {simulation ? `$${simulation.netIncome.toLocaleString()}` : "$0"}
                </h2>
                {simulation && <div className="roi-badge">ROI: {simulation.roi}%</div>}
             </div>

             <div className="mini-stats">
                <div className="stat-box">
                  <span className="label">Est. Sales</span>
                  <span className="value">{simulation?.sales || 0}</span>
                </div>
                <div className="stat-box">
                  <span className="label">Comm. Earned</span>
                  <span className="value">${simulation?.commission.toLocaleString() || 0}</span>
                </div>
             </div>
          </div>
        </section>
      </div>

      {/* BOTTOM PANEL: AI INSIGHTS */}
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
              {simulation?.aiInsight.replace(/\*\*/g, '')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IncomeSimulator;