import React from 'react'
import * as FaIcons from "react-icons/fa";
import * as GiIcons from "react-icons/gi";
import * as BsIcons from "react-icons/bs";
import * as AiIcons from "react-icons/ai";

export const SidebarData= [
    {
        title: 'Home',
        path: '/home',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Notice',
        path: '/notice',
        icon: <GiIcons.GiSwordsPower/>,
        cName: 'nav-text'
    },
    {
        title: 'Gallery',
        path: '/gallery',
        icon: <BsIcons.BsPersonBoundingBox/>,
        cName: 'nav-text'
    },
    {
        title: 'Calendar',
        path: '/calendar',
        icon: <GiIcons.GiFamilyTree/>,
        cName: 'nav-text'
    },
    {
        title: 'Cctv',
        path: '/cctv',
        icon: <FaIcons.FaRobot />,
        cName: 'nav-text'
    },
]