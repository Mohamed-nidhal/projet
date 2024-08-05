import React from "react";

const UtilQuestion = ({ question, options, onOptionClick, selectedOptionIndex }) => {
  return (
    <div className="question-container">
      <h2>{question}</h2>
      <ul>
        {options.map((option, index) => (
          <li
            key={index}
            className={index === selectedOptionIndex ? "selected" : ""}
            onClick={() => onOptionClick(index)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default UtilQuestion;