import React from 'react'
import * as FaIcons from "react-icons/fa";
import * as GiIcons from "react-icons/gi";
import * as BsIcons from "react-icons/bs";
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";
import * as IoIcons from "react-icons/io";

export const SidebarData= [
    {
        title: 'Home',
        path: '/chanyoung',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Forte',
        path: '/forte',
        icon: <GiIcons.GiSwordsPower/>,
        cName: 'nav-text'
    },
    {
        title: 'personality',
        path: '/personality',
        icon: <BsIcons.BsPersonBoundingBox/>,
        cName: 'nav-text'
    },
    {
        title: 'Family',
        path: '/family',
        icon: <GiIcons.GiFamilyTree/>,
        cName: 'nav-text'
    },
    {
        title: 'Future',
        path: '/future',
        icon: <FaIcons.FaRobot />,
        cName: 'nav-text'
    },
    {
        title: 'Login',
        path: '/Login',
        icon: <RiIcons.RiLoginBoxLine />,
        cName: 'nav-text'
    },
    {
        title: 'Signup',
        path: '/signup',
        icon: <AiIcons.AiOutlineUserAdd/>,
        cName:'nav-text'
    }
    
]