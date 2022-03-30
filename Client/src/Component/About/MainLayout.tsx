import React from 'react'
import styled from 'styled-components'
import About_list from './About_list';
import imgA from '../../images/main1.png'

const Layout = styled.img`
  width: 100%;
  height: 950px;
  background-image: url(${imgA}) ;
  background-repeat: no-repeat;
  background-size: contain;
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