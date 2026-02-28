import React, { useState } from 'react';
import MainLayout from './MainLayout';
import MarketOverview from './MarketOverview';
import Scanner from './Scanner'; // Import komponen baru
import IncomeSimulator from './IncomeSimulator';
import AlertInsight from './AlertInsight';
import HashtagAnalysis from './HashtagAnalysis';

function App() {
  const [currentTab, setCurrentTab] = useState<string>('Overview');

  const renderContent = () => {
    switch (currentTab) {
      case 'Overview': 
        return <MarketOverview />;
      case 'Scanner': 
        return <Scanner />; // Render Scanner di sini
      case 'Simulator': 
        return <IncomeSimulator />;
      case 'Alerts': 
        return <AlertInsight />;
      case 'Hashtags': 
        return <HashtagAnalysis />;
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