import React, { useState } from 'react';
import './H5Navbar.css';
import { Carousel } from 'antd';
import MusicPlayer from './MusicPlayer';

interface H5NavbarProps {
  onMenuClick?: () => void;
}

const H5Navbar: React.FC<H5NavbarProps> = ({ onMenuClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('zh');

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
    onMenuClick?.();
  };
  const quotes = [
    {
      text: "善恶之报，如影随形。",
      author: "行善积德，福泽自来。"
    },
    {
      text: "人生的苦，源于欲望无穷。",
      author: "知足常乐，方能解脱。"
    },
    {
      text: "心宽一寸，路宽一丈",
      author: "心若计较，处处烦恼"
    },
    {
      text: "万物无常，瞬息万变",
      author: "珍惜当下，方不负此生"
    },
    {
      text: "嗔怒如火，烧毁善根。",
      author: "心平气和，方得安宁"
    },
    {
      text: "人生如戏，戏如人生",
      author: "莫被表象所迷惑,应洞察其本质"
    },
  ];
  return (
    <div className="left-panel">
      {/* 左侧汉堡菜单 */}
      <div className='h5-navbar-container'>
        <div className="hamburger-menu" onClick={handleMenuClick}>
        </div>
      </div>

      {/* 顶部导航 */}
      <div className="top-nav">
        <div className="nav-item">
          {/* 替换原有的Music按钮为MusicPlayer组件 */}
          <MusicPlayer />
        </div>
        <div className="nav-item-language">
          <div onClick={() => setLanguage('zh')}>中文</div>
          <div onClick={() => setLanguage('en')}>EN</div>
        </div>
      </div>

        {/* 主要内容区域 */}
        <div className="main-content">
          {/* 品牌标题 */}
          <div className="brand-section">
            <h1 className="main-title">禅问。</h1>
            <h2 className="subtitle">ZenQuest</h2>
            <p className="tagline">
              Clear answers to everything you ask - through a Buddhist lens.
            </p>
          </div>
        </div>

        {/* 底部引用 */}
        <div className="quote-section">
          <div className="quote-section-title">佛说</div>
          <Carousel autoplay speed={1000} dots={{ className: 'custom-dots' }}>
            {quotes.map((quote, index) => (
              <div key={index} className="quote-item">
                <p className="quote-text">{quote.text}</p>
                <p className="quote-author">{quote.author}</p>
              </div>
            ))}
          </Carousel>
        </div>

    </div>
  );
};

export default H5Navbar;
