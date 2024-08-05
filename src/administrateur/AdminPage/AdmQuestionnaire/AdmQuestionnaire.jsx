import React, { useState } from "react";
import "./AdmQuestionnaire.css";
import AdConfirmPage from "./AdQuestPage/AdConfirmPage";
import AdQuest from "./AdQuestPage/AdQuest";
import AdHomePage from "./AdQuestPage/AdHomePage";

const AdmQuestionnaire = () => {
  const [start, setStart] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const handleStart = () => {
    setStart(true);
  };

  const handleCompletion = () => {
    setCompleted(true);
  };

  const handleRestart = () => {
    setStart(false);
    setCompleted(false);
    setConfirmationMessage("");  // Clear confirmation message on restart
  };

  const handleRestore = () => {
    setQuestions([]);
    setConfirmationMessage("Questionnaire restored to initial state.");
  };

  const addQuestion = (questionText, questionType, options = []) => {
    const newQuestion = {
      id: questions.length + 1,
      text: questionText,
      type: questionType,
      options: options,
    };
    setQuestions([...questions, newQuestion]);
  };

  // Dummy save function
  const handleSave = () => {
    setConfirmationMessage("Questionnaire saved successfully!");
    // Here you would handle saving the questions as needed
  };

  // Dummy delete all function
  const handleDeleteAll = () => {
    setQuestions([]);
    setConfirmationMessage("All questions deleted successfully!");
  };

  return (
    <div className="App">
      {completed ? (
        <AdConfirmPage
          onRestart={handleRestart}
          onSave={handleSave}
          onDeleteAll={handleDeleteAll}
        />
      ) : start ? (
        <AdQuest
          questions={questions}
          onComplete={handleCompletion}
          onAddQuestion={addQuestion}
          onSave={handleSave}
        />
      ) : (
        <AdHomePage
          onStart={handleStart}
        />
      )}
    </div>
  );
};

export default AdmQuestionnaire;
