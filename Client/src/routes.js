import React from "react";
import { useRoutes } from "react-router-dom";
import AboutT from "./Page/About/About_T";
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