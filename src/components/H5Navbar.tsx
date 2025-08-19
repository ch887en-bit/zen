import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './H5Navbar.css';
import { Carousel } from 'antd';
import MusicPlayer from './MusicPlayer';
import Modal from './Modal';
import Lang from './lang';

const H5Navbar: React.FC<any> = ({ onMenuClick }) => {
  const { t, i18n } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMenuClick = () => {
    setIsModalOpen(true);
    if (onMenuClick) {
      onMenuClick();
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 构建quotes数组，使用展平后的键名
  const quotes = [
    {
      text: t('quotes.item1.text'),
      author: t('quotes.item1.author')
    },
    {
      text: t('quotes.item2.text'),
      author: t('quotes.item2.author')
    },
    {
      text: t('quotes.item3.text'),
      author: t('quotes.item3.author')
    },
    {
      text: t('quotes.item4.text'),
      author: t('quotes.item4.author')
    },
    {
      text: t('quotes.item5.text'),
      author: t('quotes.item5.author')
    },
    {
      text: t('quotes.item6.text'),
      author: t('quotes.item6.author')
    }
  ];

  return (
    <div className="left-panel">
      {/* 左侧汉堡菜单 */}
      <div className='h5-navbar-container'>
        <div className="hamburger-menu" onClick={handleMenuClick}>
        </div>
        <div className='hamburger-menu-text'>
          <div className='text-title'>{t('brand.title')}</div>
        </div>
        <div></div>
      </div>

      {/* 顶部导航 */}
      <div className="top-nav">
        <div className="nav-item">
          <MusicPlayer />
          <Lang />
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="main-content">
        {/* 品牌标题 */}
        <div className="brand-section">
          <h1 className="main-title">{t('brand.title')}</h1>
          <p className="tagline">{t('brand.tagline')}</p>
        </div>
      </div>

      {/* 底部引用 */}
      <div className="quote-section">
        <div className="quote-section-title">{t('quotes.title')}</div>
        <Carousel speed={1000} dots={{ className: 'custom-dots' }}>
          {quotes.map((quote, index) => (
            <div key={index} className="quote-item">
              <p className="quote-text">{quote.text}{quote.author}</p>
              {/* <p className="quote-author">{quote.author}</p> */}
            </div>
          ))}
        </Carousel>
      </div>
      
      {/* 弹窗 */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default H5Navbar;
