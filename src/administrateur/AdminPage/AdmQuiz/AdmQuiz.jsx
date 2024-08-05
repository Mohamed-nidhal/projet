import React, { useState } from "react";
import "./AdmQuiz.css";
import AdHeader from "./AdQuizPage/AdHeader";
import AdQuestion from "./AdQuizPage/AdQuestion";
import AdNavigation from "./AdQuizPage/AdNavigation";


const translations = {
  en: {
    startQuiz: "Start Quiz",
    nextQuestion: "Next Question",
    prevQuestion: "Previous Question",
    finishQuiz: "Finish Quiz",
    quizFinished: "Quiz Finished!",
    yourScore: "Your score is",
    restartQuiz: "Restart Quiz",
    correct: "Correct",
    incorrect: "Incorrect",
  },
  fr: {
    startQuiz: "Commencer le quiz",
    nextQuestion: "Question suivante",
    prevQuestion: "Question précédente",
    finishQuiz: "Terminer le quiz",
    quizFinished: "Quiz terminé !",
    yourScore: "Votre score est de",
    restartQuiz: "Recommencer le quiz",
    correct: "Correct",
    incorrect: "Incorrect",
  },
  ar: {
    startQuiz: "ابدأ الاختبار",
    nextQuestion: "السؤال التالي",
    prevQuestion: "السؤال السابق",
    finishQuiz: "إنهاء الاختبار",
    quizFinished: "تم الانتهاء من الاختبار!",
    yourScore: "درجتك هي",
    restartQuiz: "إعادة الاختبار",
    correct: "صحيح",
    incorrect: "غير صحيح",
  },
};

const questions = {
  en: [
    {
      questionText: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      correctOptionIndex: 0,
    },
    {
      questionText: "What is the largest planet in our solar system?",
      options: ["Earth", "Jupiter", "Saturn", "Mars"],
      correctOptionIndex: 1,
    },
    {
      questionText: "Who wrote 'Romeo and Juliet'?",
      options: [
        "William Shakespeare",
        "Charles Dickens",
        "J.K. Rowling",
        "Ernest Hemingway",
      ],
      correctOptionIndex: 0,
    },
    {
      questionText: "What is the chemical symbol for water?",
      options: ["O2", "H2O", "CO2", "H2"],
      correctOptionIndex: 1,
    },
    {
      questionText: "Which element is known as the 'King of the Jungle'?",
      options: ["Lion", "Tiger", "Elephant", "Cheetah"],
      correctOptionIndex: 0,
    },
  ],

  fr: [
    {
      questionText: "Quelle est la capitale de la France ?",
      options: ["Paris", "Londres", "Berlin", "Madrid"],
      correctOptionIndex: 0,
    },
    {
      questionText:
        "Quelle est la plus grande planète de notre système solaire ?",
      options: ["Terre", "Jupiter", "Saturne", "Mars"],
      correctOptionIndex: 1,
    },
    {
      questionText: "Qui a écrit 'Roméo et Juliette' ?",
      options: [
        "William Shakespeare",
        "Charles Dickens",
        "J.K. Rowling",
        "Ernest Hemingway",
      ],
      correctOptionIndex: 0,
    },
    {
      questionText: "Quel est le symbole chimique de l'eau ?",
      options: ["O2", "H2O", "CO2", "H2"],
      correctOptionIndex: 1,
    },
    {
      questionText:
        "Quel élément est connu sous le nom de 'Roi de la Jungle' ?",
      options: ["Lion", "Tigre", "Éléphant", "Guépard"],
      correctOptionIndex: 0,
    },
  ],
  ar: [
    {
      questionText: "ما هي عاصمة فرنسا؟",
      options: ["باريس", "لندن", "برلين", "مدريد"],
      correctOptionIndex: 0,
    },
    {
      questionText: "ما هو أكبر كوكب في نظامنا الشمسي؟",
      options: ["الأرض", "المشتري", "زحل", "المريخ"],
      correctOptionIndex: 1,
    },
    {
      questionText: "من كتب 'روميو وجولييت'؟",
      options: [
        "ويليام شكسبير",
        "تشارلز ديكنز",
        "جيه كيه رولينج",
        "إرنست همنغواي",
      ],
      correctOptionIndex: 0,
    },
    {
      questionText: "ما هو الرمز الكيميائي للماء؟",
      options: ["O2", "H2O", "CO2", "H2"],
      correctOptionIndex: 1,
    },
    {
      questionText: "أي عنصر معروف باسم 'ملك الغابة'؟",
      options: ["الأسد", "النمر", "الفيل", "الفهد"],
      correctOptionIndex: 0,
    },
  ],
};

const AdmQuiz = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [showScore, setShowScore] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [language, setLanguage] = useState("fr");
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set()); // Track answered questions

  const handleOptionClick = (index) => {
    setSelectedOptionIndex(index);
  };

  const handleNextQuestion = () => {
    if (selectedOptionIndex === null) return;

    const isCorrect =
      selectedOptionIndex ===
      questions[language][currentQuestionIndex].correctOptionIndex;
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = {
      question: questions[language][currentQuestionIndex].questionText,
      selectedOptionIndex,
      isCorrect,
    };
    setAnswers(updatedAnswers);
    setAnsweredQuestions(new Set([answeredQuestions, currentQuestionIndex])); // Mark current question as answered

    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;

    if (nextQuestionIndex < questions[language].length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setShowScore(true);
    }

    setSelectedOptionIndex(null);
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOptionIndex(
        answers[currentQuestionIndex - 1]?.selectedOptionIndex || null
      );
    }
  };

  const handleStart = () => {
    setIsStarted(true);
  };

  const handleRestart = () => {
    setIsStarted(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOptionIndex(null);
    setShowScore(false);
    setAnswers([]);
    setAnsweredQuestions(new Set()); // Reset answered questions
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const canNavigateToQuestion = (index) => {
    if (index === currentQuestionIndex) return true; // Allow current question
    return answeredQuestions.has(currentQuestionIndex); // Allow if current question is answered
  };

  if (!isStarted) {
    return (
      <div className="quiz-container start-page">
        <AdHeader />
        <hr />
        <div>
          <label htmlFor="language-select">Select Language: </label>
          <select
            id="language-select"
            onChange={handleLanguageChange}
            value={language}
            className="language-select"
          >
            <option value="fr">Français</option>
            <option value="en">English</option>
            <option value="ar">العربية</option>
          </select>
        </div>
        <button className="start-button" onClick={handleStart}>
          {translations[language].startQuiz}
        </button>
      </div>
    );
  }

  if (showScore) {
    return (
      <div className="final-score">
        <h2>{translations[language].quizFinished}</h2>
        <p>
          {translations[language].yourScore} {score} /{" "}
          {questions[language].length}
        </p>
        <ul>
          {answers.map((answer, index) => (
            <li
              key={index}
              className={answer.isCorrect ? "correct" : "incorrect"}
            >
              {answer.question} -{" "}
              {answer.isCorrect
                ? translations[language].correct
                : translations[language].incorrect}
            </li>
          ))}
        </ul>
        <button className="restart-button" onClick={handleRestart}>
          {translations[language].restartQuiz}
        </button>
      </div>
    );
  }

  const isLastQuestion =
    currentQuestionIndex === questions[language].length - 1;

  return (
    <div className="quiz-container">
      <AdHeader />
      <div className="quiz-content">
        <div className="quiz-sidebar">
          <h3>Questions</h3>
          <ul>
            {questions[language].map((question, index) => (
              <li
                key={index}
                className={
                  index === currentQuestionIndex
                    ? "current-question"
                    : "question-item"
                }
                onClick={() => canNavigateToQuestion(index) && setCurrentQuestionIndex(index)}
                style={{ cursor: canNavigateToQuestion(index) ? 'pointer' : 'not-allowed' }}
              >
                Question {index + 1}
              </li>
            ))}
          </ul>
        </div>
        <div className="quiz-main">
          <AdQuestion
            question={questions[language][currentQuestionIndex].questionText}
            options={questions[language][currentQuestionIndex].options}
            onOptionClick={handleOptionClick}
            selectedOptionIndex={selectedOptionIndex}
          />
          <AdNavigation
            onNextQuestion={handleNextQuestion}
            onPrevQuestion={handlePrevQuestion}
            isLastQuestion={isLastQuestion}
            translations={translations}
            language={language}
            isNextDisabled={selectedOptionIndex === null}
            isFirstQuestion={currentQuestionIndex === 0}
          />
        </div>
      </div>
    </div>
  );
};

export default AdmQuiz;
