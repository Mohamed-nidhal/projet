import React from "react";

const AdConfirmPage = ({ onRestart, onSave, onDeleteAll }) => {
  // Replace this with the URL of the shared questionnaire
  const questionnaireUrl = "http://questionnaire";

  const getShareLinks = () => {
    return {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(questionnaireUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(questionnaireUrl)}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(questionnaireUrl)}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(questionnaireUrl)}`,
      messenger: `https://www.messenger.com/t/?link=${encodeURIComponent(questionnaireUrl)}`,
      email: `mailto:?subject=Check out this questionnaire&body=${encodeURIComponent(questionnaireUrl)}`
    };
  };

  const links = getShareLinks();

  return (
    <div className="confirmation-page">
      <p className="confirmation-message">
        The questionnaire has been completed.
      </p>
      <div className="confirmation-actions">
        <button className="btn" onClick={onSave}>Save Questionnaire</button>
        <button className="btn" onClick={onDeleteAll}>Delete All Questions</button>
        <button className="btn" onClick={onRestart}>Restart</button>
        <div className="share-buttons">
          <a href={links.facebook} target="_blank" rel="noopener noreferrer" className="share-button">Share on Facebook</a>
          <a href={links.twitter} target="_blank" rel="noopener noreferrer" className="share-button">Share on Twitter</a>
          <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="share-button">Share on LinkedIn</a>
          <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" className="share-button">Share on WhatsApp</a>
          <a href={links.messenger} target="_blank" rel="noopener noreferrer" className="share-button">Share on Messenger</a>
          <a href={links.email} target="_blank" rel="noopener noreferrer" className="share-button">Share via Email</a>
        </div>
      </div>
    </div>
  );
};

export default AdConfirmPage;
