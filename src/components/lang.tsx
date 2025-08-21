import { useTranslation } from 'react-i18next';

const Lang = () => {
  const { t, i18n } = useTranslation();
  const toggleLanguage = () => {
    const newLang = i18n.language === 'zh' ? 'en' : 'zh';
    i18n.changeLanguage(newLang);
  };
  console.log(i18n.language);
  return (
    <div className="nav-item-language">
      <div className={i18n.language === 'zh' ? 'active lng' : 'lng'} onClick={toggleLanguage}>中文</div>
      <div className="nav-item-language-line">|</div>
      <div className={i18n.language === 'en' ? 'active lng' : 'lng'} onClick={toggleLanguage}>English</div>
    </div>
  );
};

export default Lang;