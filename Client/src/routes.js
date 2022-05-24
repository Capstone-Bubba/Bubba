import React from "react";
import { useRoutes } from "react-router-dom";
import AboutT from "./Page/About/About_T";
import MainLayout from "./Component/Nav/MainLayout";
import Main from "./Page/Main/Main";
import Notice from "./Page/Main/Notice";
import Gallery from "./Page/Main/Gallery";
import Calendar from "./Page/Main/Calendar";
import CCTV from "./Page/Main/CCTV";
import Baby from './Page/Baby/Baby'

export default function Router({ userData }) {
  // console.log(userData)
  let element;
  if (userData) {
    element = useRoutes  ([
      {
        element: <MainLayout />,
        children: [
          { path: "baby", element: <Baby /> },
          { path: "home", element: <Main /> },
          { path: "notice", element: <Notice /> },
          { path: "gallery", element: <Gallery /> },
          { path: "calendar", element: <Calendar {...userData} /> },
          { path: "cctv", element: <CCTV /> },
        ],
      },
    ])
  } else {
    element = useRoutes ([
      {
        children: [
          { path: "/", element: <AboutT /> },
        ]
      }
    ])
  }

  return element;
}