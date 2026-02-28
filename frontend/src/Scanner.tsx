import React, { useState } from 'react';
import { RefreshCw, Loader2, ExternalLink, Database } from 'lucide-react';
import './Scanner.css'; // Import file CSS murni di sini

// Interface data
interface Product {
  id: number;
  name: string;
  category: string;
  aiScore: number;
  trend: string;
  margin: string;
  roi: string;
}

const Scanner: React.FC = () => {
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);

  const handleSync = (): void => {
    setIsSyncing(true);
    setTimeout(() => {
      setProducts(MOCK_DATA);
      setIsSyncing(false);
    }, 2000);
  };

  return (
    <div className="container">
      <header className="header">
        <div>
          <h1 className="title">Opportunity <span className="gradientText">Scanner</span></h1>
          <p style={{ color: '#9ca3af' }}>AI-powered analysis for Paylabs Merchants.</p>
        </div>
        
        <button className="syncBtn" onClick={handleSync} disabled={isSyncing}>
          {isSyncing ? <Loader2 className="animateSpin" size={18} /> : <RefreshCw size={18} />}
          {isSyncing ? 'Analysing...' : 'Sync Data'}
        </button>
      </header>

      <main>
        {isSyncing ? (
          <div className="loadingArea">
            <Loader2 className="animateSpin" size={40} color="#9333ea" />
            <h2 style={{ marginTop: '20px' }}>Processing Big Data...</h2>
          </div>
        ) : products.length === 0 ? (
          <div className="loadingArea" style={{ border: '1px dashed #333' }}>
            <Database size={48} color="#2563eb" style={{ marginBottom: '15px' }} />
            <h2>Ready to Scan</h2>
            <p style={{ color: '#9ca3af', marginBottom: '20px' }}>Fetch your merchant data to start AI analysis.</p>
            <button className="syncBtn" style={{ margin: '0 auto' }} onClick={handleSync}>Connect Now</button>
          </div>
        ) : (
          <div className="productGrid">
            {products.map(item => (
              <div key={item.id} className="card">
                <div className="cardHeader">
                  <div className="scoreWrapper">
                    <svg viewBox="0 0 64 64" style={{ width: '100%', height: '100%' }}>
                      <circle cx="32" cy="32" r="28" stroke="#1f1a36" strokeWidth="4" fill="none" />
                      <circle cx="32" cy="32" r="28" stroke="#9333ea" strokeWidth="4" fill="none" 
                        strokeDasharray="175" strokeDashoffset={175 - (175 * item.aiScore / 100)} 
                        style={{ transition: 'all 1s' }}
                      />
                    </svg>
                    <div className="scoreText">
                      <span className="scoreNumber">{item.aiScore}</span>
                      <span className="scoreLabel">Score</span>
                    </div>
                  </div>
                  <span className="badge">{item.trend}</span>
                </div>

                <h3 style={{ margin: '0 0 5px 0' }}>{item.name}</h3>
                <p style={{ fontSize: '0.8rem', color: '#9ca3af', marginBottom: '20px' }}>{item.category}</p>

                <div className="dataRow">
                  <span className="label">Profit Margin</span>
                  <span style={{ color: '#22c55e', fontWeight: 'bold' }}>{item.margin}</span>
                </div>
                <div className="dataRow">
                  <span className="label">Est. ROI</span>
                  <span style={{ color: '#c084fc', fontWeight: 'bold' }}>{item.roi}</span>
                </div>

                <button className="detailBtn">
                  Analyze Trend <ExternalLink size={14} style={{ marginLeft: '8px' }} />
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

const MOCK_DATA: Product[] = [
  { id: 1, name: "Viral Korean Sunscreen", category: "Beauty", aiScore: 94, trend: "Rising", margin: "45%", roi: "3.2x" },
  { id: 2, name: "Smart LED Desk Lamp", category: "Tech", aiScore: 89, trend: "Stable", margin: "52%", roi: "2.8x" },
  { id: 3, name: "Minimalist Crossbody Bag", category: "Fashion", aiScore: 82, trend: "Rising", margin: "38%", roi: "2.1x" }
];

export default Scanner;