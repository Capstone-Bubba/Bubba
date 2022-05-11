import { Container, Grid } from '@mui/material'
import { useEffect, useState } from 'react';
import styled from 'styled-components'
import Graph from '../../Component/Main/Graph'
import Profile from '../../Component/Main/Profile'
import { Cookies } from 'react-cookie'
import axios from 'axios';
import { Link } from 'react-router-dom';


const GraphBox = styled.div`
  background: white;
  box-shadow: 10px 5px 5px #C0C0C0;
  border-radius: 3%;
  height: 400px;
  justify-content: center;
`
const Font = styled.div`
  color: #008080;
  font-family: 'Mukta', sans-serif;
  font-size: 4rem;
  text-align: center;
  animation: font 1.2s infinite alternate;
`
const FontItem = styled.span`
  animation-delay: ${props => props.fontAni};
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
const PatternBox = styled.div`
  border-radius: 3%;
  margin-right: 20px;
  background: white;
  box-shadow: 5px 5px 5px #C0C0C0;
  height: 400px;
`
const Text = styled.h3`
  text-align: center;
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
  background: rgba(18,20,34, 0.1);
  box-shadow: 10px 5px 5px #C0C0C0;
  border-radius: 3%;
  height: 320px;
  padding:1px;
`
const MemberBox = styled.div`
  background: white;
  box-shadow: 10px 5px 5px #C0C0C0;
  height: 320px;
  margin-right: 20px;
  padding:1px;
  border-radius: 3%;
  text-align: center;
`
const Item = styled.div`
  border: 1px solid #e8f7f7;
`
const Button = styled.button `
  width:200px;
  height:50px;
`
function main() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function check(){
      await axios.get('http://localhost:8000/auth/home').then((res) => {
        console.log(res.data.result)
        setData(res.data.result)
      })
    }

    check()
  },[...data])

  return (
    <Container maxWidth={false}>
      <Font>
        <FontItem fontAni={""}>B</FontItem>
        <FontItem fontAni={".4s"}>U</FontItem>
        <FontItem fontAni={".6s"}>B</FontItem>
        <FontItem fontAni={".8s"}>B</FontItem>
        <FontItem fontAni={""}>A</FontItem>
      </Font>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <GraphBox>
            <Text>
              아기 상태
            </Text>
            <Graph />
          </GraphBox>
        </Grid>
        <Grid item xs={6}>
          <PatternBox>
            <FlexBox>
              <Item>
                상태 1
              </Item>
              <Item>
                상태 2
              </Item>
              <Item>
                상태 3
              </Item>
              <Item>
                상태 4
              </Item>
            </FlexBox>
          </PatternBox>
        </Grid>
        <Grid item xs={8}>
          <PushBox>
          </PushBox>
        </Grid>
        <Grid item xs={4}>
          <MemberBox>
            <Profile />
          </MemberBox>
        </Grid>
      </Grid>

    </Container>
  )
}

export default main
