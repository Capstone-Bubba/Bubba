import React from "react";
import { Route, useRoutes } from "react-router-dom";
import AboutT from "./Page/About/About_T";
import AboutM from "./Page/About/About_M";
import AboutB from "./Page/About/About_B";
import AboutLayout from "./Component/Nav/AboutLayout"
import MainLayout from "./Component/Nav/MainLayout";
import Main from "./Page/Main/Main";
import Notice from "./Page/Main/Notice";
import Gallery from "./Page/Main/Gallery";
import Calendar from "./Page/Main/Calendar";
import CCTV from "./Page/Main/CCTV";


export default function Router() {
  let element = useRoutes([
    {
      children: [
        { path: "/", element: <AboutT /> },
        { path: "about_m", element: <AboutM /> },
        { path: "about_b", element: <AboutB /> }
      ]
    },
    {
        element: <MainLayout />,
        children: [
            { path: "home", element: <Main /> },
            { path: "notice", element: <Notice /> },
            { path: "gallery", element: <Gallery /> },
            { path: "calendar", element: <Calendar /> },
            { path: "cctv", element: <CCTV /> },
        ],
    },
  ]);

  return element;
}