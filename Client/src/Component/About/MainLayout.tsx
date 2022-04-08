import React from 'react'
import styled from 'styled-components'
import imgA from '../../images/main1.png'

const Layout = styled.img`
  min-height: 100vh;
  background:pink;
  border: 1px solid red;
`;
function MainLayout() {
  return (
    <div>
      <Layout>

      </Layout>
    </div>
  )
}

export default MainLayout