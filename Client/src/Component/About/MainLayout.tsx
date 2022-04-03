import React from 'react'
import styled from 'styled-components'
import About_list from './About_list';
import imgA from '../../images/main1.png'

const Layout = styled.img`
  min-height: 100vh;
  background:pink;
  border: 1px solid red;
`;
function MainLayout() {
  return (
    <div>
      <About_list />
      <Layout>

      </Layout>
    </div>
  )
}

export default MainLayout