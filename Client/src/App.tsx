import React from 'react'
import About_list from './Component/About/About_list'
import styled from 'styled-components'
import imgA from './images/main_1.png'
import './App.css';

const Layout = styled.img`
  width: 100vw;
  min-height: 100vh;
  background-image: url(${imgA}) ;
  border: 1px solid red;
`;
const Button = styled.button`
width: 200px;
height:60px;
background-color:skyblue;
`

function App() {
  return (

    <div className="App">
      <About_list />
      <header className="App-header">
        <img src={imgA} className="App-logo" alt="logo" />
        <p>
          App Download
        </p>
       <Button>APP</Button>
      </header>
    </div>
  )
}

export default App