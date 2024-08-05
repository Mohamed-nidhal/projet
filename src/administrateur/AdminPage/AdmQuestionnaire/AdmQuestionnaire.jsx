import React, { useEffect, useState } from "react";
import "./AdmQuestionnaire.css";
import AdConfirmPage from "./AdQuestPage/AdConfirmPage";
import AdQuest from "./AdQuestPage/AdQuest";
import AdHomePage from "./AdQuestPage/AdHomePage";
import axios from "axios";

const AdmQuestionnaire = () => {
  const [start, setStart] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/question`);
        const resQuestions=res.data.data.map((e,i)=>{
          return{
            id:i+1,
            text:e.title,
            type:e.type==="radio"?"likert":e.type==="textArea"?"long-text":e.type==="checkbox"?"multiple-choice":e.type,
            options:e.options
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

  const addQuestion = async(questionText, questionType, options = []) => {
    const newQuestion = {
      id: questions.length + 1, 
      text: questionText,
      type: questionType,
      options: options,
    };
    // const form = new FormData();
    // form.append('text', newQuestion.text);
    // form.append('type', newQuestion.type);
    // form.append('options', JSON.stringify(newQuestion.options));
    // console.log(form)
    // const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/question`)
    // const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/question`, form, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   }
    // });

    

    const question ={title:newQuestion.text,type:newQuestion.type,options:newQuestion.options}
    switch(question.type){
      case "likert":
        question.type="radio"
        break;
      case "long-text":
        question.type="textArea"
        break;
      case "multiple-choice":
        question.type="checkbox"
        break;
      default:
        break;
    }
    const res=await fetch(`${import.meta.env.VITE_BASE_URL}/question`, {
      method: 'POST',
      body: JSON.stringify(question),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(newQuestion)
    console.log(res)
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
