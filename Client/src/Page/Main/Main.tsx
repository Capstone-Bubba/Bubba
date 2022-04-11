import React from 'react'
import styled from 'styled-components'
import Graph from '../../Component/Main/Graph'
const Layout = styled.div`
  background: #eaeaea;
  display: grid;
  width:100vw;
  min-height: 100vh;
  margin: 0;
  padding: 0;
`
const HeadContainer = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 0.5fr;
  grid-column-gap: 20px;
  margin-left: 15%;
`
const BodyContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-column-gap: 20px;
  margin-left: 15%;
  
`
const GraphBox = styled.div`
  background: white;
  box-shadow: 10px 5px 5px #C0C0C0;
  margin-top : 30px;
  height: 400px;
  justify-content: center;
`
const PatternBox = styled.div`
  background: white;
  box-shadow: 5px 5px 5px #C0C0C0;
  margin-top : 30px;
  height: 400px;
`
const PushBox = styled.div`
  background: rgba(18,20,34, 0.2);
  box-shadow: 10px 5px 5px #C0C0C0;
  height: 200px;
  

`
const MemberBox = styled.div`
  background: white;
  box-shadow: 10px 5px 5px #C0C0C0;
  height: 350px;
`
function main() {
  return (
    <Layout>
      <HeadContainer>
        <GraphBox>
          <h3 style={{textAlign:"center"}}>아기 상태</h3>
          <Graph />
          </GraphBox>
        <PatternBox>fdsa</PatternBox>
      </HeadContainer>
      <BodyContainer>
        <PushBox>ddsfa</PushBox>
        <MemberBox>fdsa</MemberBox>
      </BodyContainer>
    </Layout>
  )
}

export default main
