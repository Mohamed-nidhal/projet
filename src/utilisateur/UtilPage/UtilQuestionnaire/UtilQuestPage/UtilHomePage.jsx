import React from 'react';

const UtilHomePage = ({ onStart, language, onLanguageChange }) => {
  return (
    <div className="home-page">
      <h1 className='titre'>Welcome to the Questionnaire</h1>
      <label>
        Select Language:
        <select value={language} onChange={onLanguageChange} className='select-lang'>
          <option value="fr">Français</option>
          <option value="en">English</option>
          <option value="ar">العربية</option>
        </select>
      </label>
      <button className="btn-start" onClick={onStart}>
        Start Questionnaire
      </button>
    </div>
  );
};

export default UtilHomePage;
