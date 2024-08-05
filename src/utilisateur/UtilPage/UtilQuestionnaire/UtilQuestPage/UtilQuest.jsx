import React, { useState } from "react";

const Question = ({ question, onAnswer, disabled, error }) => {
  const [answer, setAnswer] = useState("");
  const [checkedOptions,setCheckedOptions]=useState("");
  const handleAnswerChange = (e,checkBox) => {
   
    
    const { value } = e.target;
    if(checkBox){
      setCheckedOptions(checkBox)
      console.log(checkBox)
      console.log(checkedOptions)
      setAnswer(checkBox);
      onAnswer(question.id, checkBox);
    }else{
      console.log(value)
      console.log(checkedOptions)
      setAnswer(value);
      onAnswer(question.id, value);
    }
    
    
  };

  const handleTextChange = (e) => {
    const { value } = e.target;
    setAnswer(value);
    onAnswer(question.id, value);
  };

  return (
    <div className={`question-item ${disabled ? "disabled" : ""} ${error ? "error" : ""}`}>
      <p>
        <strong>{question.text}</strong>
      </p>
      {question.type === "number" && question.id === 3 && (
        <input
          type="number"
          className="form-control"
          value={answer}
          onChange={handleTextChange}
          disabled={disabled}
        />
      )}
      {question.type === "email" && question.id === 4 && (
        <input
          type="email"
          className="form-control"
          value={answer}
          onChange={handleTextChange}
          disabled={disabled}
        />
      )}
      {question.type === "text" && question.id !== 3 && question.id !== 4 && (
        <input
          type="text"
          className="form-control"
          value={answer}
          onChange={handleTextChange}
          disabled={disabled}
        />
      )}
      {question.type === "long-text" && (
        <textarea
          className="form-control"
          value={answer}
          onChange={handleTextChange}
          disabled={disabled}
        ></textarea>
      )}
      {question.type === "multiple-choice" && (
        <div className="option-group">
          {question.options.map((option, index) => (
            <label key={index} className="option-label">
              <input
                type="checkbox"
                name={`question-${index}`}
                value={option}
                // checked={answer === option}
                // onChange={handleAnswerChange}
                onChange={(e)=>handleAnswerChange(e,e.target.value+" - "+checkedOptions)}
                disabled={disabled}
              />
              <span className="custom-radio"></span>
              {option}
            </label>
          ))}
        </div>
      )}
      {question.type === "likert" && (
        <ul className="likert-scale">
          {question.scale.map((option, index) => (
            <li key={index}>
              <label>
                <input
                  type="radio"
                  name={`likert-${question.id}`}
                  value={option}
                  checked={answer === option}
                  onChange={handleAnswerChange}
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

const UtilQuest = ({ questions, onComplete }) => {
  const [answers, setAnswers] = useState({});
  const [disabledQuestions, setDisabledQuestions] = useState(new Set());
  const [error, setError] = useState("");

  const handleAnswer = (id, answer) => {
    setAnswers((prevAnswers) => {
      const newAnswers = { ...prevAnswers, [id]: answer };
      const currentQuestion = questions.find((q) => q.id === id);
      const nextQuestionId = id + 1;

      if (
        currentQuestion.type === "multiple-choice" &&
        (answer === "Non" || answer === "No" || answer === "لا")
      ) {
        setDisabledQuestions((prev) => new Set(prev).add(nextQuestionId));
      } else {
        setDisabledQuestions((prev) => {
          const newSet = new Set(prev);
          newSet.delete(nextQuestionId);
          return newSet;
        });
      }
      return newAnswers;
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(answers)
    const unansweredQuestions = questions.filter(
      (question) => !disabledQuestions.has(question.id) && !answers[question.id]
    );
    if (unansweredQuestions.length > 0) {
      setError("Please answer all the questions before submitting.");
    } else {
      const res=await fetch(`${import.meta.env.VITE_BASE_URL}/answer`, {
        method: 'POST',
        body: JSON.stringify(answers),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(answers)
      console.log(res)
      setError("");
      onComplete();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="questionnaire-form">
      {questions.map((question) => (
        <Question
          key={question.id}
          question={question}
          onAnswer={handleAnswer}
          disabled={disabledQuestions.has(question.id)}
          error={!answers[question.id] && error}
        />
      ))}
      {error && <p className="error-message">{error}</p>}
      <button type="submit" className="btn-submit">
        Soumettre
      </button>
    </form>
  );
};

export default UtilQuest;
