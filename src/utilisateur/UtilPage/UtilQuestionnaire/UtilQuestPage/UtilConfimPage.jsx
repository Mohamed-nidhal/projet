import React from 'react';

const translations = {
  en: {
    thankYou: "Thank you for completing the questionnaire!",
    restart: "Restart Questionnaire"
  },
  fr: {
    thankYou: "Merci d'avoir complété le questionnaire!",
    restart: "Recommencer le questionnaire"
  },
  ar: {
    thankYou: "شكرا لإكمال الاستبيان!",
    restart: "إعادة الاستبيان"
  }
};

const UtilConfirmPage = ({ onRestart, language }) => {
  const { thankYou, restart } = translations[language];

  return (
    <div className="confirmation-page">
      <h1>{thankYou}</h1>
      <button className="btn-restart" onClick={onRestart}>
        {restart}
      </button>
    </div>
  );
};

export default UtilConfirmPage;
