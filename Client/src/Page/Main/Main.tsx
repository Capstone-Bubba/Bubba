import React from 'react'
import styled from 'styled-components'
import Body from '../../Component/Main/Body'
import Head from '../../Component/Main/Head'
const Layout = styled.div`
  background: #eaeaea;
  display: grid;
  width:100vw;
  min-height: 100vh;
  margin: 0;
  padding: 0;
`
function main() {
  return (
    <Layout>
      <Head/>
      <Body/>
    </Layout>
  )
}

export default main
