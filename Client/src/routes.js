import React from "react";
import { useRoutes, useNavigate } from "react-router-dom";
import AboutT from "./Page/About/About_T";
import MainLayout from "./Component/Nav/MainLayout";
import Main from "./Page/Main/Main";
import Notice from "./Page/Main/Notice/Notice";
import Gallery from "./Page/Main/Gallery";
import Calendar from "./Page/Main/Calendar/Calendar";
import CCTV from "./Page/Main/CCTV";
import Baby from './Page/Baby/Baby'

export default function Router({userData}) {
  const check = userData
  const navigate = useNavigate();
  let element = useRoutes([
    check ? 
    {
      element: <MainLayout />,
      children: [  
        { path: "/", element: <Main /> },
        { path: "baby", element: <Baby />},
        { path: "home", element: <Main /> },
        { path: "notice", element: <Notice {...userData} /> },
        { path: "gallery", element: <Gallery /> },
        { path: "calendar", element: <Calendar {...userData}/> },
        { path: "cctv", element: <CCTV /> }
      
      ],
    }
   :
   {
    children: [
      { path: "/",  element: <AboutT /> },
    ]
  }
   
  ]);

  return element;
}