import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import AppUtil from './utilisateur/AppUtil';
import UtilQuestionnaire from './utilisateur/UtilPage/UtilQuestionnaire/UtilQuestionnaire';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppUtil />}>
      <Route index element={< UtilQuestionnaire />} />
    </Route>
  )
);



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
