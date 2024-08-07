import React from 'react';

const translations = {
  fr: {
    welcomeMessage: "Bienvenue dans le questionnaire",
    selectLanguage: "Sélectionner la langue",
    startButton: "Démarrer le questionnaire"
  },
  en: {
    welcomeMessage: "Welcome to the Questionnaire",
    selectLanguage: "Select Language",
    startButton: "Start Questionnaire"
  },
  ar: {
    welcomeMessage: "مرحبا بك في الاستبيان",
    selectLanguage: "اختر اللغة",
    startButton: "بدء الاستبيان"
  }
};

const UtilHomePage = ({ onStart, language, onLanguageChange }) => {
  return (
    <div className="home-page">
      <h1 className='titre'>{translations[language].welcomeMessage}</h1>
      <label>
        {translations[language].selectLanguage}:
        <select value={language} onChange={onLanguageChange} className='select-lang'>
          <option value="fr">Français</option>
          <option value="en">English</option>
          <option value="ar">العربية</option>
        </select>
      </label>
      <button className="btn-start" onClick={onStart}>
        {translations[language].startButton}
      </button>
    </div>
  );
};

export default UtilHomePage;
