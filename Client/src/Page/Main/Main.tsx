import React from 'react'
import styled from 'styled-components'
import Body from '../../Component/Main/Body'
import Head from '../../Component/Main/Head'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

interface animation{
  fontAni: any;
}
const Layout = styled.div`
  background: #eaeaea;
  display: grid;
  width:100vw;
  min-height: 100vh;
  margin: 0;
  padding: 0;
`
const Title = styled.h3 `
  color: skyblue;
  text-align:center;
  margin-left: 15%;
`
const Font = styled.div`
  color: #008080;
  font-family: 'Mukta', sans-serif;
  font-size: 4rem;
  text-align: center;
  animation: font 1.2s infinite alternate;
  margin-left: 15%;
`
const FontItem = styled.span<animation>`
  animation-delay: ${(props:any) => props.fontAni};
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
function main() {
  return (
    <Layout>
       <Font>
        <FontItem fontAni={""}>B</FontItem>
        <FontItem fontAni={".4s"}>U</FontItem>
        <FontItem fontAni={".6s"}>B</FontItem>
        <FontItem fontAni={".8s"}>B</FontItem>
        <FontItem fontAni={""}>A</FontItem>
      </Font>
      <Head/>
      <Body/>
    </Layout>
  )
}

export default main
