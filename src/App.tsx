import React, { useState } from 'react';
import './App.css';
import InteractionPage from './components/interaction';
import DefaultPanel from './components/defaultPanel';
import H5Navbar from './components/H5Navbar';
import './components/interaction.css';

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [isDefaultPanel, setIsDefaultPanel] = useState(true);
  
  const handleQuest = () => {
    setIsDefaultPanel(false);
  };
  const handleMenuClick = () => {
    // setIsDefaultPanel(true);
  };
  return (
    <div className="app">
      {/* 左侧视觉模块 */}
      <H5Navbar onMenuClick={handleMenuClick} />

      {/* 右侧交互模块 - 使用新的 InteractionPage */}
      { isDefaultPanel ? (
        <DefaultPanel
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleQuest={handleQuest}
        />
      ) : (
        <InteractionPage title={inputValue} />
      )}
    </div>
  );
};

export default App;
