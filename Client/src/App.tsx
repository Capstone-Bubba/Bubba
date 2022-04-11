import React, { useCallback } from 'react'
import styled from 'styled-components'
import './App.css';
import Router from './routes';
// import { useRouter } from 'next/router'
// import { GoogleLoginButton } from 'react-social-login-buttons';
// import { Tooltip } from 'antd';

const Button = styled.img`
width: 200px;
height:60px;
`

function App() {
  // const router = useRouter();
  // const onClickGoogleLogin = useCallback(() => {
  //   const page = 'http://localhost:3000/auth/google'
  //   router.push(`http://localhost:3000/auth/google`);
  // }, [])
  return (
    <div>
      <a href='http://localhost:3000/auth/google'>google</a>
    </div>  
  )
}
export default App