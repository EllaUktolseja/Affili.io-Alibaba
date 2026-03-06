import React, { useState, useMemo } from 'react';
import { Users, BarChart3, Sparkles, Loader2, Search, Target, TrendingUp, DollarSign } from 'lucide-react';
import './IncomeSimulator.css';

const IncomeSimulator: React.FC = () => {
  const [userId, setUserId] = useState<number>(861);
  const [productName, setProductName] = useState<string>('Loaded Tea');
  
  // Slider states
  const [traffic, setTraffic] = useState<number>(1000);
  const [commRate, setCommRate] = useState<number>(15);
  const [opCosts, setOpCosts] = useState<number>(100);

  const [baseline, setBaseline] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1. Fungsi Fetch (Dengan Data Dummy untuk Testing)
  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // SIMULASI DATA DUMMY (Ganti bagian ini dengan fetch asli jika BE sudah ready)
      // Data 1: High Performer
      const dummy1 = {
        user_id: 861,
        product_name: "Loaded Tea Premium",
        ctr: 4.5, // 4.5%
        cr: 3.2,  // 3.2%
        estimated_clicks: 45,
        estimated_sales: 1.4,
        income_min: 150.0,
        income_max: 200.0
      };

      // Data 2: Low Performer
      const dummy2 = {
        user_id: 999,
        product_name: "Generic Water Bottle",
        ctr: 1.2,
        cr: 0.8,
        estimated_clicks: 12,
        estimated_sales: 0.1,
        income_min: 10.0,
        income_max: 15.0
      };

      // Logika pilih dummy berdasarkan ID untuk testing
      const selectedData = userId === 861 ? dummy1 : dummy2;
      
      // Simulasi delay network
      await new Promise(res => setTimeout(res, 800));
      
      setBaseline(selectedData);
    } catch (err: any) {
      setError("Gagal memuat data.");
    } finally {
      setLoading(false);
    }
  };

  // 2. Kalkulasi Real-time & AI Insight Generation
  const simulation = useMemo(() => {
    if (!baseline) return null;

    // Sesuai BE: ctr & cr (sudah dalam bentuk persen, misal 4.5)
    const currentCtr = baseline.ctr / 100;
    const currentCr = baseline.cr / 100;
    
    // Hitung harga rata-rata produk dari data BE
    const avgPrice = baseline.income_min / (baseline.estimated_sales || 1);

    // Hitung berdasarkan slider
    const clicks = traffic * currentCtr;
    const sales = clicks * currentCr;
    const grossRevenue = sales * avgPrice;
    const commissionEarned = grossRevenue * (commRate / 100);
    const netIncome = commissionEarned - opCosts;

    // GENERATE AI INSIGHT SECARA DINAMIS
    let aiText = "";
    if (netIncome > 500) {
      aiText = `🚀 Luar biasa! Produk ${baseline.product_name} sangat cocok dengan performa akun Anda. Dengan CTR ${baseline.ctr}%, Anda memiliki potensi keuntungan bersih yang sangat tinggi.`;
    } else if (netIncome > 0) {
      aiText = `💡 Potensi moderat. Produk ini menghasilkan profit, namun cobalah tingkatkan Traffic hingga ${traffic * 2} views atau cari produk dengan harga di atas $${Math.round(avgPrice * 1.5)} untuk memaksimalkan ROI.`;
    } else {
      aiText = `⚠️ Risiko Tinggi. Saat ini biaya operasional ($${opCosts}) menelan seluruh komisi Anda. Disarankan untuk optimasi konten guna menaikkan CTR di atas 2% sebelum memulai iklan.`;
    }

    return {
      clicks: Math.floor(clicks),
      sales: sales.toFixed(2),
      netIncome: netIncome,
      roi: opCosts > 0 ? ((netIncome / opCosts) * 100).toFixed(1) : "0",
      aiInsight: aiText
    };
  }, [traffic, commRate, opCosts, baseline]);

  return (
    <div className="simulator-container">
      <div className="simulator-grid">
        {/* PANEL KIRI: INPUT */}
        <section className="panel parameter-panel">
          <div className="input-group">
            <label><Users size={14} /> User ID (Coba 861 atau 999)</label>
            <input type="number" value={userId} onChange={(e) => setUserId(Number(e.target.value))} className="custom-input" />
          </div>

          <div className="input-group">
            <label><BarChart3 size={14} /> Product Name</label>
            <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} className="custom-input" />
          </div>

          <button className="btn-analyze" onClick={handleAnalyze} disabled={loading}>
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
            Analyze Opportunity
          </button>

          <hr className="divider" />

          {/* SLIDERS */}
          <div className="input-group">
            <div className="input-header">
              <span>Target Traffic (Views)</span>
              <span className="badge-purple">{traffic.toLocaleString()}</span>
            </div>
            <input type="range" min="500" max="50000" step="500" value={traffic} onChange={(e) => setTraffic(Number(e.target.value))} />
          </div>

          <div className="input-group">
            <div className="input-header">
              <span>Estimasi Komisi (%)</span>
              <span className="badge-purple">{commRate}%</span>
            </div>
            <input type="range" min="1" max="50" value={commRate} onChange={(e) => setCommRate(Number(e.target.value))} />
          </div>

          <div className="input-group">
            <div className="input-header">
              <span>Biaya Operasional ($)</span>
              <span className="badge-purple">${opCosts}</span>
            </div>
            <input type="range" min="0" max="1000" step="10" value={opCosts} onChange={(e) => setOpCosts(Number(e.target.value))} />
          </div>
        </section>

        {/* PANEL KANAN: OUTPUT */}
        <section className="results-column">
          <div className={`panel results-panel ${loading ? 'loading-blur' : ''}`}>
            <p className="label">ESTIMASI NET INCOME</p>
            <h2 className={simulation && simulation.netIncome >= 0 ? "text-green" : "text-red"}>
              {simulation ? `$${simulation.netIncome.toLocaleString(undefined, {maximumFractionDigits: 2})}` : "$0"}
            </h2>
            
            {simulation && (
              <div className="mini-stats">
                <div className="stat">ROI: <b>{simulation.roi}%</b></div>
                <div className="stat">Sales: <b>{simulation.sales}</b></div>
                <div className="stat">Clicks: <b>{simulation.clicks}</b></div>
              </div>
            )}
          </div>

          <div className="panel recommendations-box">
            <div className="ai-header">
              <Sparkles size={18} className="text-purple" />
              <h3>AI Strategic Insights</h3>
            </div>
            <div className="ai-content">
              {loading ? (
                <div className="ai-loading-placeholder">Sedang menganalisis data...</div>
              ) : simulation ? (
                <p className="ai-text-display">{simulation.aiInsight}</p>
              ) : (
                <p className="ai-text-display">Masukkan data dan klik Analyze untuk melihat ulasan AI.</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default IncomeSimulator;