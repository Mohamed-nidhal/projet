import React from "react";

const UtilNavigation = ({
  onNextQuestion,
  onPrevQuestion,
  isLastQuestion,
  translations,
  language,
  isNextDisabled,
  isFirstQuestion,  // New prop
}) => {
  return (
    <div className="navigation-buttons">
      <button
        onClick={onPrevQuestion}
        disabled={isFirstQuestion}  // Update condition to disable button
      >
        {translations[language].prevQuestion}
      </button>
      <button
        onClick={onNextQuestion}
        disabled={isNextDisabled}
      >
        {isLastQuestion
          ? translations[language].finishQuiz
          : translations[language].nextQuestion}
      </button>
    </div>
  );
};

export default UtilNavigation;
