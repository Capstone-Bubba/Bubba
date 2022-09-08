import { Container, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import Graph from '../../Component/Main/Graph'
import Profile from '../../Component/Main/Profile'
import Notice from './Notice/Notice';
import axios from 'axios'


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
  text-align: center;å
  background-color:rgb(49, 130, 206)
`

const Text = styled.h3`
  text-align: center;
  margin-top:3%;
`
const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
`
const PushBox = styled.div`
  margin-bottom:3%;
  height:100%;
  border-radius:5px;
  padding:3px;
  background-color:white;
`
const MemberBox = styled.div`
  margin-bottom:3%;
  border-radius:5px;
  background: white;
  padding:3px;
  text-align: center;
  height:100%;

`
const Item = styled.div`
  height:100%;
  margin-top:4%;
  border: 1px solid #e8f7f7;
  background-color: ${props => props.bcolor};
  border-radius:5px;
  height:183px;
  padding-left:3%;
  padding-top:2%;



`

function Main(props) {
  const [data, setData] = useState([])
  const params = { user_num: props.user_num }
  useEffect(() => {
    async function check() {
      try{
        const res = await axios.get('http://localhost:8000/auth/face', { params })
        console.log(res.data.result)
        const _data = await res.data.result.map ((rowData) => (
          {
            side : rowData.side,
            back : rowData.back,
            front : rowData.front,
            none : rowData.none,
            accur_time : rowData.accur_time
          }
        ))
        console.log(_data)
        setData(_data)
      } catch(e) {
        console.error(e.message)
      }
    }
    check()
  }, [])
  console.log(data)

  return (
    <>
      <Title>

      </Title>
      <Container maxWidth={false}>

        <Grid container spacing={2}>
          <Grid item xs={7} >
            <GraphBox>
              <Text>
                아기 체온
              </Text>
              <Graph />
            </GraphBox>
          </Grid>
          <Grid item xs={5}>
              <FlexBox>
                <Item bcolor={"#9acc5a"}>
                  알림 1
                </Item>
                <Item bcolor={"#00b8f6"}>
                  알림 2
                </Item>
              </FlexBox>
          </Grid>
          <Grid item xs={7}>
            <PushBox>
              <Notice />
            </PushBox>
          </Grid>
          <Grid item xs={5}>
            <MemberBox>
              <Profile.Profile />
            </MemberBox>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Main