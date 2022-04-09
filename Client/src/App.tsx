import React from 'react'
import styled from 'styled-components'
import './App.css';
import Router from './routes';

const Button = styled.img`
width: 200px;
height:60px;
`

function App() {
  return (
    <div>
      <Router />
    </div>
  )
}
export default App