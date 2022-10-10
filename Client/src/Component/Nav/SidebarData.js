import React from 'react'
import * as FaIcons from "react-icons/fa";
import * as GiIcons from "react-icons/gi";
import * as BsIcons from "react-icons/bs";
import * as AiIcons from "react-icons/ai";
import * as RiIcons from 'react-icons/ri';

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
        icon: <FaIcons.FaClipboardList/>,
        cName: 'nav-text'
    },
   
    {
        title: 'Calendar',
        path: '/calendar',
        icon: <BsIcons.BsFillCalendarWeekFill/>,
        cName: 'nav-text'
    },
    {
        title: 'Cctv',
        path: '/cctv',
        icon: <GiIcons.GiCctvCamera />,
        cName: 'nav-text'
    },
    {
        title: 'Rtsp',
        path: '/rtsp',
        icon: <FaIcons.FaRegAddressCard />,
        cName: 'nav-text'
    },
]