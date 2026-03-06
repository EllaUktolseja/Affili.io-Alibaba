import React, { useEffect, useState } from 'react';
import MainLayout from './MainLayout';
import MarketOverview from './MarketOverview';
import Scanner from './Scanner';
import IncomeSimulator from './IncomeSimulator';
import AlertInsight from './AlertInsight';
import HashtagAnalysis from './HashtagAnalysis';
import TrendAnalysisDetail from './TrendAnalysisDetail';
import ProfileComponent from './ProfileComponent'; //

function App() {
  const [currentTab, setCurrentTab] = useState<string>('Overview');
  const [showTrendDetail, setShowTrendDetail] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('selected-theme');
    if (savedTheme === 'dark' || !savedTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, []);

  const renderContent = () => {
    // Jika sedang melihat detail trend, prioritaskan ini
    if (showTrendDetail) {
      return <TrendAnalysisDetail onBack={() => setShowTrendDetail(false)} />;
    }

    switch (currentTab) {
      case 'Overview':
        return <MarketOverview />;
      case 'Scanner':
        return <Scanner onViewTrendAnalysis={() => setShowTrendDetail(true)} />;
      case 'Simulator':
        return <IncomeSimulator />;
      case 'Alerts':
        return <AlertInsight />;
      case 'Hashtags':
        return <HashtagAnalysis />;
      case 'Profile': // 2. Tambahkan case untuk Profile
        return <ProfileComponent onBack={() => setCurrentTab('Overview')} />;
      default:
        return <MarketOverview />;
    }
  };

  return (
    <MainLayout activeTab={currentTab} setActiveTab={setCurrentTab}>
      {renderContent()}
    </MainLayout>
  );
}

export default App;