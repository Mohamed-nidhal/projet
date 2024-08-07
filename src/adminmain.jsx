import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import AppAdmin from './administrateur/AppAdmin';
import AdmDash from './administrateur/AdminPage/AdmDashboard/AdmDash';
import AdmQuestionnaire from './administrateur/AdminPage/AdmQuestionnaire/AdmQuestionnaire';
import Participant from './administrateur/AdminPage/Participant/Participant';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppAdmin />}>
      <Route index element={<AdmDash />} />
      <Route path='Questionnaire' element={<AdmQuestionnaire />} />
      <Route path='Participant' element={<Participant />} />
    </Route>
  )
);



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
