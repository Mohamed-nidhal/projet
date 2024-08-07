import React, { useState } from "react";

const AdQuest = ({ questions, onComplete, onAddQuestion, onSave }) => {
  const [newQuestionText, setNewQuestionText] = useState("");
  const [newQuestionType, setNewQuestionType] = useState("text");
  const [likertOptions, setLikertOptions] = useState([]);
  const [multipleChoiceOptions, setMultipleChoiceOptions] = useState([]);
  const [error, setError] = useState("");
  const [showShareOptions, setShowShareOptions] = useState(false);

  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (newQuestionText.trim() === "") {
      setError("Question text cannot be empty.");
      return;
    }
    if (questions.some((q) => q.text === newQuestionText && q.type === newQuestionType)) {
      setError("This question already exists.");
      return;
    }
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
    setError("");
  };

  const handleAddLikertOption = () => {
    setLikertOptions([...likertOptions, ""]);
  };

  const handleAddMultipleChoiceOption = () => {
    setMultipleChoiceOptions([...multipleChoiceOptions, ""]);
  };

  const handleSave = () => {
    onSave();
  };

  const handleValidateAndConfirm = () => {
    onComplete();
  };

  const handleShareViaEmail = () => {
    const questionnaireURL = "https://your-website.com/utilquest";
    const subject = "Check out this questionnaire";
    const body = `Hi there,\n\nPlease fill out this questionnaire: ${questionnaireURL}\n\nThank you!`;
    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  const handleShareViaWebsite = () => {
    const questionnaireURL = "https://your-website.com/utilquest";
    navigator.clipboard.writeText(questionnaireURL);
    alert("Questionnaire URL copied to clipboard!");
  };

  const handleShareOnSocialMedia = () => {
    const questionnaireURL = "https://your-website.com/utilquest";
    const shareText = `Check out this questionnaire: ${questionnaireURL}`;
    if (navigator.share) {
      navigator.share({
        title: "Questionnaire",
        text: shareText,
        url: questionnaireURL,
      }).catch((error) => console.log("Error sharing:", error));
    } else {
      alert("Sharing not supported on this browser.");
    }
  };

  const Question = ({ question, disabled }) => {
    return (
      <div className={`question-item ${disabled ? "disabled" : ""}`}>
        <p>
          <strong>{question.text}</strong>
        </p>
        {question.type === "text" && (
          <input type="text" className="form-control" disabled={disabled} />
        )}
        {question.type === "number" && (
          <input type="number" className="form-control" disabled={disabled} />
        )}
        {question.type === "email" && (
          <input type="email" className="form-control" disabled={disabled} />
        )}
        {question.type === "long-text" && (
          <textarea className="form-control" disabled={disabled}></textarea>
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

  return (
    <div className="adquest-container">
      <form className="questionnaire-form">
        {questions.map((question) => (
          <Question key={question.id} question={question} disabled={true} />
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
      <div className="share-button" onClick={() => setShowShareOptions(!showShareOptions)}>
        Share
      </div>
      {showShareOptions && (
        <div className="share-options">
          <button onClick={handleShareViaEmail}>Share via Email</button>
          <button onClick={handleShareViaWebsite}>Share via Website</button>
          <button onClick={handleShareOnSocialMedia}>Share on Social Media</button>
        </div>
      )}
    </div>
  );
};

export default AdQuest;
