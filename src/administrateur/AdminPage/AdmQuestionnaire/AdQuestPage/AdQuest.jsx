// AdQuest.jsx

import React, { useState } from "react";

const Question = ({ question, disabled }) => {
  return (
    <div className={`question-item ${disabled ? "disabled" : ""}`}>
      <p>
        <strong>{question.text}</strong>
      </p>
      {question.type === "text" && (
        <input
          type="text"
          className="form-control"
          disabled={disabled}
        />
      )}
      {question.type === "number" && (
        <input
          type="number"
          className="form-control"
          disabled={disabled}
        />
      )}
      {question.type === "email" && (
        <input
          type="email"
          className="form-control"
          disabled={disabled}
        />
      )}
      {question.type === "long-text" && (
        <textarea
          className="form-control"
          disabled={disabled}
        ></textarea>
      )}
      {question.type === "multiple-choice" && (
        <div className="option-group">
          {question.options.map((option, index) => (
            <label key={index} className="option-label">
              <input
                type="checkbox"
                name={`question-${question.id}`}
                value={option}
                disabled={disabled}
              />
              <span className="custom-checkbox"></span>
              {option}
            </label>
          ))}
        </div>
      )}
      {question.type === "likert" && (
        <ul className="likert-scale">
          {question.options.map((option, index) => (
            <li key={index}>
              <label className="likert-option">
                <input
                  type="radio"
                  name={`likert-${question.id}`}
                  value={option}
                  disabled={disabled}
                />
                <span className="checkmark"></span>
                {option}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const AdQuest = ({ questions, onComplete, onAddQuestion, onSave }) => {
  const [newQuestionText, setNewQuestionText] = useState("");
  const [newQuestionType, setNewQuestionType] = useState("text");
  const [likertOptions, setLikertOptions] = useState([]);
  const [multipleChoiceOptions, setMultipleChoiceOptions] = useState([]);
  const [error, setError] = useState("");

  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (newQuestionText.trim() !== "") {
      // Avoid adding duplicate questions
      if (!questions.some(q => q.text === newQuestionText && q.type === newQuestionType)) {
        let options = [];
        if (newQuestionType === "likert") {
          options = likertOptions;
        } else if (newQuestionType === "multiple-choice") {
          options = multipleChoiceOptions;
        }
        onAddQuestion(newQuestionText, newQuestionType, options);
        setNewQuestionText("");
        setNewQuestionType("text");
        setLikertOptions([]);
        setMultipleChoiceOptions([]);
      } else {
        setError("This question already exists.");
      }
    }
  };

  const handleAddLikertOption = () => {
    setLikertOptions([...likertOptions, ""]);
  };

  const handleAddMultipleChoiceOption = () => {
    setMultipleChoiceOptions([...multipleChoiceOptions, ""]);
  };

  const handleSave = () => {
    // Call the onSave function to perform the saving operation
    onSave();
  };

  const handleValidateAndConfirm = () => {
    // Perform validation here
    // Assuming validation is successful, navigate to confirmation page
    onComplete();
  };

  return (
    <div>
      <form className="questionnaire-form">
        {questions.map((question) => (
          <Question
            key={question.id}
            question={question}
            disabled={true}  // Disable interaction since answers are not needed
          />
        ))}
        {error && <p className="error-message">{error}</p>}
        <div className="add-question-form">
          <input
            type="text"
            value={newQuestionText}
            onChange={(e) => setNewQuestionText(e.target.value)}
            placeholder="New question"
            className="form-control"
          />
          <select
            value={newQuestionType}
            onChange={(e) => setNewQuestionType(e.target.value)}
            className="form-control"
          >
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="email">Email</option>
            <option value="long-text">Long Text</option>
            <option value="multiple-choice">Multiple Choice</option>
            <option value="likert">Likert Scale</option>
          </select>
          {newQuestionType === "likert" && (
            <div className="likert-options">
              <button type="button" onClick={handleAddLikertOption} className="btn-add-option">
                Add Likert Option
              </button>
              {likertOptions.map((option, index) => (
                <input
                  key={index}
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...likertOptions];
                    newOptions[index] = e.target.value;
                    setLikertOptions(newOptions);
                  }}
                  placeholder={`Likert Option ${index + 1}`}
                  className="form-control"
                />
              ))}
            </div>
          )}
          {newQuestionType === "multiple-choice" && (
            <div className="multiple-choice-options">
              <button type="button" onClick={handleAddMultipleChoiceOption} className="btn-add-option">
                Add Multiple Choice Option
              </button>
              {multipleChoiceOptions.map((option, index) => (
                <input
                  key={index}
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...multipleChoiceOptions];
                    newOptions[index] = e.target.value;
                    setMultipleChoiceOptions(newOptions);
                  }}
                  placeholder={`Option ${index + 1}`}
                  className="form-control"
                />
              ))}
            </div>
          )}
          <button type="button" onClick={handleAddQuestion} className="btn-add-question">
            Ajouter Question
          </button>
          <button type="button" onClick={handleValidateAndConfirm} className="btn-validate">
            Valider
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdQuest;
