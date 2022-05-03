import React from 'react'
import styled from 'styled-components'

const Item = styled.div `
border: 1px solid black;
width:100%;
height:350px;
`
function GalleryItem() {
  return (
    <div>
      <Item></Item>
    </div>
  )
}

export default GalleryItem
