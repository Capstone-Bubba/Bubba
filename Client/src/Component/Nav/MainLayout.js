import React, { useState, useEffect } from 'react';
import * as BsIcons from "react-icons/bs";
import * as IoIcons from "react-icons/io";
import styled from 'styled-components'
//import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Nav.css';
import { IconContext } from 'react-icons'
import { Button, Typography } from '@mui/material';
import axios from 'axios';
const Font =  styled.h1`
  color:#fff;

`
const FontItem = styled.span`
  animation-delay: ${props => props.fontAni};
  animation: font 1.2s infinite alternate;
  @keyframes font {
    0% {
      filter: blur(0);
      opacity: 1;
    }
    100% {
      filter: blur(5px);
      opacity: .2;
    }
  }
`
function MainLayout() {
  const navigate = useNavigate()
  const [sidebar, setSidebar] = useState(false);
  const [logout, setLogout] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
 
  const postLogout = async () => {
    await axios.get('http://localhost:8000/auth/logout')
      .then((res) => {
        console.log(res.status);
        if (res.status == 200) {
          setLogout(true);
          alert('로그아웃 성공');
          navigate('/')
          window.location.reload();

        } else {
          console.log('Error');
        }
      })
  }
  const onRemove = () => {
    if(window.confirm('로그아웃 하시겠습니까?')){
        postLogout();
    } else{
        alert('실패');
    }
}


  return (
    <>
      <IconContext.Provider value={{ color: 'fff' }}>
        <div className="nav">
          <Link to="#" className='menu-bar'>
            <BsIcons.BsReverseLayoutTextSidebarReverse onClick={showSidebar} />
          </Link>
          <Typography  component="div" sx={{ flexGrow: 1 , textAlign: 'center'  }}>
            <Font>
            <FontItem>B</FontItem>
            <FontItem>U</FontItem>
            <FontItem>B</FontItem>
            <FontItem>B</FontItem>
            <FontItem>A</FontItem>
            </Font>
          </Typography>
            <Button style ={{color:"#fff",marginRight:"1%"}}onClick={onRemove}><IoIcons.IoIosLogOut size="40" /></Button>
        </div>

        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </IconContext.Provider>
      <Outlet />
    </>
  )
}

export default MainLayout;
