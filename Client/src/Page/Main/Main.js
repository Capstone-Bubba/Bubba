import { Container, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import Graph from '../../Component/Main/Graph'
import Profile from '../../Component/Main/Profile'
import Notice from './Notice/Notice';
import axios from 'axios'
import { width } from '@mui/system';
// import { disconnectSocket, initSocketConnection } from '../../socket';


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
  display:flex;
  flex-direction: row;
  height:100%;
  margin-top:4%;
  border: 1px solid #e8f7f7;
  background-color: ${props => props.bcolor};
  border-radius:5px;
  height:183px;
  padding-left:3%;


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
  // useEffect(() => {
  //   initSocketConnection();
  //   console.log(initSocketConnection())
  //   return () => {
  //     disconnectSocket();
  //   }
  // })
  const states = [
		{nowState : "배고픔"}, 
		{nowState : "트림"},
		{nowState : "복통"},
		{nowState : "불편"},
		{nowState : "피곤"}
	]
  function Random(array){
    const random = Math.floor(Math.random() * array.length);
    return array[random];
  }
  let nowData = Random(states);
  console.log(nowData)
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
              <Item bcolor={"#f0ffff"}>
                <div style={{ display: 'flex', flexDirection: 'column', width: '90%' }}>
                  {data
                    .slice(0, 3)
                    .map(element => {
                      return (
                        <div style={{ width: '100%', border: '1px solid black', marginTop: '1%', height: '50px', marginLeft: '4%',paddingLeft:'3px' }}>
                          <p>{element.accur_time}</p>
                        </div>
                      )
                    })}
                </div>
              </Item>
              <Item bcolor={"#f1fdee"}>
                <div style={{display:'flex', flexDirection:'row', width:'100%',alignItems:'center',justifyContent:'center'}}>
                    <p style={{width:'30%'}}>현재 아이의 상태는</p>
                    <div style={{border:'2px solid black',borderRadius:'50%',width:'180px',height:'180px',display:'flex',alignItems:'center',justifyContent:'center'}}>
                      <p style={{fontSize:'3rem',fontWeight:'2'}}>{nowData.nowState}</p>
                    </div>
                </div>

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