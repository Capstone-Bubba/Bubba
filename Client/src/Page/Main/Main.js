import { Container, Grid } from '@mui/material'
import React,{ useEffect, useState } from 'react';
import styled from 'styled-components'
import Graph from '../../Component/Main/Graph'
import Profile from '../../Component/Main/Profile'
import Notice from './Notice/Notice';

const GraphBox = styled.div`
  padding:1%;
  margin-top:3%;
  background: white;
  border-radius:5px;
  height: 400px;
  justify-content: center;
`
const Title = styled.div`
  height:100px;
  z-index: -1;
  width:100%;
  position:absolute;
  color: #fff;
  font-family: 'Mukta', sans-serif;
  font-size: 4rem;
  text-align: center;
  background-color:rgb(49, 130, 206)
`

const PatternBox = styled.div`
  margin-top:5%;
  margin-right: 30px;
`
const Text = styled.h3`
  text-align: center;
  margin-top:3%;
`
const FlexBox = styled.div`
  display: grid;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 180px;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
`
const PushBox = styled.div`
  border-radius:5px;
  padding:1px;
  background-color:white;
`
const MemberBox = styled.div`
border-radius:5px;

  background: white;
  margin-right: 20px;
  padding:1px;
  text-align: center;
`
const Item = styled.div`
  border: 1px solid #e8f7f7;
  background-color: ${props => props.bcolor};
  border-radius:5px;

`
const Button = styled.button `
  width:200px;
  height:50px;
`
function Main() {
  
  
  return (
    <>
      <Title>
        
      </Title>
    <Container maxWidth={false}>

      <Grid container spacing={2}>
        <Grid item xs={7} >
          <GraphBox>
            <Text>
              아기 상태
            </Text>
            <Graph />
          </GraphBox>
        </Grid>
        <Grid item xs={5}>
          <PatternBox>
            <FlexBox>
              <Item bcolor={"#9acc5a"}>
              </Item>
              <Item bcolor={"#00b8f6"}>
              </Item>
              <Item bcolor={"#ba62c8"}>
              </Item>
              <Item bcolor={"#ffbe00"}>
              </Item>
            </FlexBox>
          </PatternBox>
        </Grid>
        <Grid item xs={7}>
          <PushBox>
            <Notice/>
          </PushBox>
        </Grid>
        <Grid item xs={5}>
          <MemberBox>
            <Profile.Profile  />
          </MemberBox>
        </Grid>
      </Grid>
    </Container>
    </>
  )
}

export default Main
