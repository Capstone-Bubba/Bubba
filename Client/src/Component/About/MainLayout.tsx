import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components'

// const Layout = styled.div`

// `;
const Sidebar = styled.div`
  width:100vw;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  position: fixed;
  height:100vh;
  width:250px;
  background: #121827;;
  
`
const Head = styled.div`
  font-size: 22px;
  color: #fff;
  text-align: center;
  line-height: 70px;
  background: #081922;
  user-select: none;

`
const List = styled(Link)`
&:hover{  
  padding-left:50px;
}
  padding:0;
  text-align: center;
  display: block;
  width:100%;
  line-height: 94px;
  font-size: 19px;
  color: #fff;
  box-sizing: border-box;
  border-top: rgba(255, 255, 255, .1);
  border-bottom: 1px solid black;
  cursor: pointer;
  text-decoration: none;
`







function MainLayout() {
  return (
    <div>

      {/* <Layout> */}
        <Sidebar>
          <Head>Bubba</Head>
          <List to="/home">
           Home
          </List>
          <List to="/notice">
           Notice
          </List>
          <List  to="/gallery">
           Gallery
          </List>
          <List to="/calendar">
           Calendar
          </List>
          <List to="/diary">
            Diary
            </List>
          <List to="/cctv">
           CCTV 
            </List>
        </Sidebar>
      {/* </Layout> */}
      <Outlet />

    </div>
  )
}

export default MainLayout