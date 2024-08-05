import React from 'react';

const AdHomePage = ({ onStart }) => {
  return (
    <div className="home-page">
      <h1>Admin Questionnaire</h1>
      <button onClick={onStart} className="btn-start">
        Start Questionnaire
      </button>
    </div>
  );
};

export default AdHomePage;
