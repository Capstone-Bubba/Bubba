import { useRoutes } from "react-router-dom";
import About_T from "./Page/About/About_T"
import About_M from "./Page/About/About_M";
import About_B from "./Page/About/About_B";
import AboutLayout from "./Component/About/AboutLayout"
import MainLayout from "./Component/About/MainLayout";
import Main from "./Page/Main/Main";

export default function Router() {
  let element = useRoutes([
    {
        element: <AboutLayout />,
      children: [
        { path: "/", element: <About_T /> },
        { path: "about_m", element: <About_M /> },
        { path: "about_b", element: <About_B /> }
      ]
    },
    {
        element: <MainLayout />,
        children: [
            { path: "home", element: <Main /> },
        ],
    },
  ]);

  return element;
}