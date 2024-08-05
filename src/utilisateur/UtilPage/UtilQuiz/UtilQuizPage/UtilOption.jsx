import React from 'react';

const UtilOption = ({ options, onOptionClick, selectedOptionIndex }) => {
  return (
    <div className="options">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onOptionClick(index)}
          className={selectedOptionIndex === index ? 'selected' : ''}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default UtilOption;
