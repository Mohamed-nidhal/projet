import React from 'react';

const AdOptions = ({ options, onOptionClick, selectedOptionIndex }) => {
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

export default AdOptions;
