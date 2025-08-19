import { useTranslation } from 'react-i18next';
import CustomeInput from "./input";
import monkImage from '../assets/images/p1.png';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'

export default function DefaultPanel({
  inputValue,
  setInputValue,
  handleQuest
}: {
  inputValue: string,
  setInputValue: (value: string) => void,
  handleQuest: () => void
}) {
  const { t, i18n } = useTranslation();
  
  return (
    <div className="right-panel">
        {/* 欢迎信息 */}
        <div className="welcome-section">
          <div className="welcome-content">
          <blockquote>
            <span className="quote-marks">“</span>
            <div className="welcome-text">{t('interaction.welcomeText')}</div>
            <p>{t('interaction.welcomeSubtext')}</p>
          </blockquote>
          
          </div>
        </div>

        <div className="input-section-monk">
          {/* 小和尚插图 */}
          <div className="monk-illustration">
            <img src={monkImage} alt="monk" className="monk-image" />
          </div>
          {/* 输入区域 */}
          <CustomeInput
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleQuest={handleQuest}
          />
        </div>
        
      </div>
  )
}