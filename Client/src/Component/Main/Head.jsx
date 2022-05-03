import React from 'react'
import styled from 'styled-components'
import Graph from './Graph'

const HeadContainer = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 0.5fr;
  grid-column-gap: 20px;
  margin-left: 300px;

`
const GraphBox = styled.div`
  background: white;
  box-shadow: 10px 5px 5px #C0C0C0;
  border-radius: 3%;
  height: 400px;
  justify-content: center;
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
const FlexItem = styled.div`
  border: 1px solid #e8f7f7;
`
function Head() {
  return (
    <HeadContainer>
      <GraphBox>
        <Text>
          아기 상태
        </Text>
        <Graph />
      </GraphBox>
      <PatternBox>
        <FlexBox>
          <FlexItem>
            상태 1
          </FlexItem>
          <FlexItem>
            상태 2
          </FlexItem>
          <FlexItem>
           상태 3
          </FlexItem>
           <FlexItem>
            상태 4
          </FlexItem>
        </FlexBox>
      </PatternBox>
    </HeadContainer>
  )
}

export default Head