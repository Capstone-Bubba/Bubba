import React from 'react'
import MainLayout from '../../Component/About/MainLayout'
import About_list from '../../Component/About/About_list'
import imgA from '../../images/main_1.png'
import styled from 'styled-components'
interface animation{
  fontAni: any;
}
const Top = styled.div`
  width:100vw;
  height:100vh;
`
const Middle = styled.div`
  width:100vw;
  height:100vh;
`
const Layout = styled.div`
 text-align:center
`;
const Content = styled.div`
  text-align: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`
const Item = styled.img`
  height: 100vmin;
  vertical-align: bottom;
  pointer-events: none;
  animation-name: big;
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-delay: 0s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode:forwards;
  animation-play-state: running;

  @keyframes big{
    from{
    padding-bottom: 80px;
    height: 200vmin;
    }
    to {

      height: 95vmin;
    }
  }
`
const Font = styled.div`
 
  position: absolute;
  color: #008080;
  font-family: 'Mukta', sans-serif;
  padding: 5px 10px;
  margin-top: 600px;
  font-size: 10rem;
  text-align: center;
  margin: 0 -.05em;
  margin-top: 600px;
  animation: font 1.2s infinite alternate;
`
const FontItem = styled.span<animation>`

  animation-delay: ${(props:any) => props.fontAni};
  @keyframes font {
    0% {
      filter: blur(0);
      opacity: 1;
    }
    100% {
      filter: blur(5px);
      opacity: .2;
    }
  }
`

function About() {
  return (
 <Layout>
   <Top id='app'>
    {/* <About_list /> */}
    <Content>
      <Item src={imgA} />
      <Font>
        <FontItem fontAni={""}>B</FontItem>
        <FontItem fontAni={".4s"}>U</FontItem>
        <FontItem fontAni={".6s"}>B</FontItem>
        <FontItem fontAni={".8s"}>B</FontItem>
        <FontItem fontAni={""}>A</FontItem>
      </Font>
      <p>
        {/* <Button src={imgB}></Button> */}
      </p>
      </Content>
      </Top>
    </Layout>
  )
}

export default About