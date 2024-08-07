import React from "react";

const AdConfirmPage = ({ onRestart, onSave, onDeleteAll }) => {
  return (
    <div className="confirmation-page">
      <p className="confirmation-message">
        The questionnaire has been completed.
      </p>
      <div className="confirmation-actions">
        <button className="btn" onClick={onRestart}>Restart</button>
      </div>
    </div>
  );
};

export default AdConfirmPage;
