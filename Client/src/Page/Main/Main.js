import { Container, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import Graph from '../../Component/Main/Graph'
import Profile from '../../Component/Main/Profile'
import Notice from './Notice/Notice';
import axios from 'axios'
import { width } from '@mui/system';


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
  const [data, setData] = useState("")
  const params = { user_num: props.user_num }
  useEffect(() => {
    async function check() {
        await axios.get('http://localhost:8000/auth/face', { params }
        ).then(async (res) => {
            const _data = await res.data.result.map((rowData) => (
                {
                    result: rowData.result,
                }
            ))
            setData(_data)
        })
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
                <Item bcolor={"#fff"}>
                  <div style={{width:'200px',border:'1px solid black',margin:'5px', borderRadius:'50%' }}>
                  </div>
                  <div style= {{display:'flex', flexDirection:'column' ,width:'60%', height:'100%'}}>
                  <div style={{width:'100%',border:'1px solid black', marginTop:'3%', height:'40px',marginLeft:'2%' }}></div>
                  <div style={{width:'100%',border:'1px solid black', marginTop:'3%', height:'40px',marginLeft:'2%' }}></div>
                  <div style={{width:'100%',border:'1px solid black', marginTop:'3%', height:'40px',marginLeft:'2%' }}></div>
                  </div>
                </Item>
                <Item bcolor={"#fff"}>
                  
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