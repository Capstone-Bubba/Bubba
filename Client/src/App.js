import React, { useCallback } from 'react'
import styled from 'styled-components'
import './App.css';
import Router from './routes';

function App() {
  // const router = useRouter();
  // const onClickGoogleLogin = useCallback(() => {
  //   const page = 'http://localhost:3000/auth/google'
  //   router.push(`http://localhost:3000/auth/google`);
  // }, [])
  return (
    <>
      {/* <a href='http://localhost:8000/auth/google'>google</a>
      <a href='http://localhost:8000/auth/naver'>Naver</a>
      <a href='http://localhost:8000/auth/kakao'>apple</a> */}

      <Router/>
    </>  
  )
}
export default App