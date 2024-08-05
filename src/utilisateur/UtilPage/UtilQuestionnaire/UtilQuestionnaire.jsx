// UtilQuestionnaire.jsx

import React, { useState } from "react";
import "./UtilQuestionnaire.css";
import UtilConfirmPage from "./UtilQuestPage/UtilConfimPage";
import UtilQuest from "./UtilQuestPage/UtilQuest";
import UtilHomePage from "./UtilQuestPage/UtilHomePage";


const translations = {
  en: {
    questions: [
      { id: 1, text: "What is your name?", type: "text" },
      { id: 2, text: "What is your first name?", type: "text" },
      { id: 3, text: "How old are you?", type: "number" },
      { id: 4, text: "What is your email?", type: "email" },
      {
        id: 5,
        text: "How would you rate your experience with our service?",
        type: "likert",
        scale: ["Very bad", "Bad", "Average", "Good", "Very good"],
      },
      {
        id: 6,
        text: "Have you ever participated in an online questionnaire?",
        type: "multiple-choice",
        options: ["Yes", "No"],
      },
      {
        id: 7,
        text: "What was your experience?",
        type: "long-text",
        dependentOn: 6,
      },
    ],
  },
  fr: {
    questions: [
      { id: 1, text: "Quel est votre nom?", type: "text" },
      { id: 2, text: "Quel est votre prénom?", type: "text" },
      { id: 3, text: "Quel âge avez-vous?", type: "number" },
      { id: 4, text: "Quel est votre email?", type: "email" },
      {
        id: 5,
        text: "Comment évalueriez-vous votre expérience avec notre service?",
        type: "likert",
        scale: ["Très mauvais", "Mauvais", "Moyenne", "Bon", "Très bon"],
      },
      {
        id: 6,
        text: "Avez-vous déjà participé à un questionnaire en ligne?",
        type: "multiple-choice",
        options: ["Oui", "Non"],
      },
      {
        id: 7,
        text: "Quelle a été votre expérience?",
        type: "long-text",
        dependentOn: 6,
      },
    ],
  },
  ar: {
    questions: [
      { id: 1, text: "ما اسمك؟", type: "text" },
      { id: 2, text: "ما هو اسمك الأول؟", type: "text" },
      { id: 3, text: "كم عمرك؟", type: "number" },
      { id: 4, text: "ما هو بريدك الإلكتروني؟", type: "email" },
      {
        id: 5,
        text: "كيف تقيم تجربتك مع خدمتنا؟",
        type: "likert",
        scale: ["سيء جدا", "سيء", "متوسط", "جيد", "جيد جدا"],
      },
      {
        id: 6,
        text: "هل سبق لك أن شاركت في استبيان عبر الإنترنت؟",
        type: "multiple-choice",
        options: ["نعم", "لا"],
      },
      { id: 7, text: "كيف كانت تجربتك؟", type: "long-text", dependentOn: 6 },
    ],
  },
};

const UtilQuestionnaire = () => {
  const [start, setStart] = useState(false);
  const [language, setLanguage] = useState("fr");
  const [completed, setCompleted] = useState(false);

  const handleStart = () => {
    setStart(true);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleCompletion = () => {
    setCompleted(true);
  };

  const handleRestart = () => {
    setStart(false);
    setCompleted(false);
  };

  const questions = translations[language].questions;

  return (
    <div className="App">
      {completed ? (
        <UtilConfirmPage onRestart={handleRestart} language={language} />
      ) : start ? (
        <UtilQuest questions={questions} onComplete={handleCompletion} />
      ) : (
        <UtilHomePage
          onStart={handleStart}
          language={language}
          onLanguageChange={handleLanguageChange}
        />
      )}
    </div>
  );
};

export default UtilQuestionnaire;
