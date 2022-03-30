import React from 'react'
import styled from 'styled-components'
import About_list from './About_list';
const Layout = styled.div`
  width: 100%;
  height: 720px;
  background-color: pink;
`;
function MainLayout() {
  return (
    <div>
      <About_list/>
        <Layout>
            
        </Layout>
    </div>
  )
}

export default MainLayout