import CustomeInput from "./input";
import monkImage from '../assets/images/p1.png';
export default function DefaultPanel({
  inputValue,
  setInputValue,
  handleQuest
}: {
  inputValue: string,
  setInputValue: (value: string) => void,
  handleQuest: () => void
}) {
  return (
    <div className="right-panel">
        {/* 欢迎信息 */}
        <div className="welcome-section">
          <div className="welcome-content">
            <div className="quote-marks">&ldquo;</div>
            <p className="welcome-text">
              Welcome – let&apos;s explore what&apos;s on your heart today. A gentle invitation to share your worries, hold space, and discover clarity together.
            </p>
            <div className="quote-marks">&rdquo;</div>
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