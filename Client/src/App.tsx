import React from 'react'
import styled from 'styled-components'
import './App.css';
import About_T from './Page/About/About_T'
import About_M from './Page/About/About_M';
import About_B from './Page/About/About_B';
import About_list from './Component/About/About_list';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './Page/Main/Main';

const Button = styled.img`
width: 200px;
height:60px;
`

function App() {
  return (
    <div>
      <BrowserRouter>
        <About_list />
        <Routes>
          <Route path='/about_t' element={<About_T />} />
          <Route path='/about_m' element={<About_M />} />
          <Route path='/about_b' element={<About_B />} />
          <Route path='/main' element={<Main/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App