import React from 'react'
import styled from 'styled-components'

const BodyContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-column-gap: 20px;
  margin-left: 300px;
  
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
const Text = styled.h3`
  text-align: center;
`

function Body() {
  return (
    <BodyContainer>
    <PushBox>ddsfa</PushBox>
    <MemberBox>fdsa</MemberBox>
  </BodyContainer>
  )
}

export default Body