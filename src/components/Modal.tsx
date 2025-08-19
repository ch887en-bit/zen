import React from 'react';
import { useTranslation } from 'react-i18next';
import MusicPlayer from './MusicPlayer';
import './Modal.css';
import { CloseOutlined } from '@ant-design/icons';
import Lang from './lang';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* 关闭按钮 */}
        <div className="modal-close" onClick={onClose}>
          <CloseOutlined style={{ color: '#fff' }} />
        </div>
        
        {/* 弹窗内容 */}
        <div className="modal-body">
          <div className="modal-brand">
            <h1 className="modal-title">{t('brand.title')}</h1>
            <p className="modal-tagline">
              {t('brand.tagline')}
            </p>
          </div>
          
          <div className="modal-controls">
            <div className="control-item">
              <MusicPlayer />
            </div>
            <div className="control-divider"></div>
            <div className="control-item">
              <Lang />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
