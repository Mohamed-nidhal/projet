// UtilQuestionnaire.jsx

import React, { useEffect, useState } from "react";
import "./UtilQuestionnaire.css";
import UtilConfirmPage from "./UtilQuestPage/UtilConfimPage";
import UtilQuest from "./UtilQuestPage/UtilQuest";
import UtilHomePage from "./UtilQuestPage/UtilHomePage";
import axios from "../../../../node_modules/axios/index";




const UtilQuestionnaire = () => {
  const [start, setStart] = useState(false);
  const [language, setLanguage] = useState("fr");
  const [completed, setCompleted] = useState(false);

  const [questions,setQuestions]=useState([])

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

  // const questions = translations[language].questions;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/question`);
        const resQuestions=res.data.data.map((e,i)=>{
          return{
            id:i+1,
            text:e.title,
            type:e.type==="radio"?"likert":e.type==="textArea"?"long-text":e.type==="checkbox"?"multiple-choice":e.type,
            options:e.type==="radio"?undefined:e.options,
            scale:e.type==="radio"?e.options:undefined
          }
        })
        console.log(resQuestions)
        setQuestions(resQuestions); 
        
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchData();
  }, []); 

  return (
    <div className="App">
      {completed ? (
        <UtilConfirmPage onRestart={handleRestart} language={language} />
      ) : start && questions.length > 0 ? (
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
