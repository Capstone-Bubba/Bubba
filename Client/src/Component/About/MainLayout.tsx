import React from 'react'
import styled from 'styled-components'

const Layout = styled.div`
  width:100vw;
  min-height: 100vh;
  background: #ededed;
  margin: 0;
  padding: 0;
`;
const Sidebar = styled.div`
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
const List = styled.ul`
&:hover{  
  padding-left:50px;
}
  padding:0;
  text-align: center;
  display: block;
  width:100%;
  line-height: 65px;
  font-size: 19px;
  color: #fff;
  box-sizing: border-box;
  border-top: rgba(255, 255, 255, .1);
  border-bottom: 1px solid black;
`


function MainLayout() {
  return (
    <div>
     
      <Layout>
        <Sidebar>
          <Head>Bubba</Head>
          <List>Home</List>
          <List>Notice</List>
          <List>Gallery</List>
          <List>Calendar</List>
          <List>Diary</List>
          <List>CCTV</List>
        </Sidebar>
      </Layout>
    </div>
  )
}

export default MainLayout