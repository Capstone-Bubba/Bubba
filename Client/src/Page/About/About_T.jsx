import React from 'react'
import imgA from '../../images/main_1.png'
import googleButton from '../../images/btn_google_signin_light_pressed_web.png'
import naverButton from '../../images/btn_naver.png'
import kakaoButton from '../../images/btn_kakao.png'
import styled from 'styled-components'
import { useMediaQuery } from '@mui/material';
import { Container } from '@mui/material';


const Layout = styled.div`
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  position: fixed;
  display: block;
  background-image:url(${imgA});
  vertical-align: bottom;
  // pointer-events: none;
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
    height: 200vmin;
    }
    to {  
    height: 100vmin;
   }
 }
 @media (max-width:960px){
  @keyframes big{
    from{
    height: 200vmin;
    }
    to {  
    height: 150vmin;
   }
 }
  }
  @media (max-width:660px){
    @keyframes big{
      from{
      height: 200vmin;
      }
      to {  
      height: 180vmin;
     }
   }
    }
`;

const Content = styled.div`
  text-align: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top:10%;
  justify-content: space-around;
  font-size: calc(10px + 2vmin);
  color: white;
`

const Font = styled.div`
  color: #008080;
  font-family: 'Mukta', sans-serif;
  font-size: 10rem;
  text-align: center;
  animation: font 1.2s infinite alternate;
`
const Button = styled.a`
  display:flex;
  justify-items:center;
  justify-content:center;
  width:100%;
  height:100px;
  `
const LoginBox = styled.div `
  display:flex;
  justify-content:center;
  justify-items:center;
  flex-direction: column;
  width:60%;
  margin-left:30%;
  margin-right:30%;

`
const FontItem = styled.span`
  animation-delay: ${props => props.fontAni};
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
const LoginItem = styled.img`

  width:250px;
  height:60px;

`
function About() {
  const matches = useMediaQuery('(max-width:600px)');

  return (
 <Layout>
    {/* <About_list /> */}
    <Container>
    <Content>
      <Font>
        <FontItem fontAni={""}>B</FontItem>
        <FontItem fontAni={".4s"}>U</FontItem>
        <FontItem fontAni={".6s"}>B</FontItem>
        <FontItem fontAni={".8s"}>B</FontItem>
        <FontItem fontAni={""}>A</FontItem>
      </Font>
      <LoginBox>
      <Button href='http://localhost:8000/auth/google'><LoginItem src={googleButton}/></Button>
      <Button href='http://localhost:8000/auth/naver'><LoginItem src={naverButton}/></Button>
      {/* <Button href='http://localhost:8000/auth/kakao'><LoginItem src={kakaoButton}/></Button> */}
      <Button href='http://oceanit.synology.me:8000/auth/kakao'><LoginItem src={kakaoButton}/></Button>
      </LoginBox>
      </Content>
      </Container>
    </Layout>
  )
}

export default About
// import React from 'react'
// import imgA from '../../images/main_1.png'
// import { makeStyles } from '@material-ui/core/styles';
// import Container from '@material-ui/core/Container'

// const useStyles = makeStyles((theme) => ({
//   root: {
//     textAlign: 'center',
//     backgroundImage: `url(${imgA})`,
//     backgroundRepeat: 'no-repeat',
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     width: '100%',
//     height: '100%',
//     position: 'fixed',
//     display: 'block',
//     verticalAlign: 'bottom',
//     pointerEvents: 'none',
//     animationName: 'big',
//     animationDuration: '2s',
//     animationTimingFunction:'linear',
//     animationDelay: '0s',
//     animationIteration:'count: 1',
//     animationDirection:'normal',
//     animationFillMode: 'forwards',
//     animationPlayState: 'running',
//     "@keyframes big":{
//         from: {
//         paddingBottom: '80px',
//         height: '200vmin',
//       },
//         to: {

//         height: '95vmin',
//       },
//     },
//   },
//   content: {
//     marginTop: '25%',
//     fontSize: '7vw',
//     fontFamily: 'Kaushan Script, cursive',

//   },
//   footer: {
//     position: 'fixed',
//     bottom: '0',
//     left: '0',
//     height: '200px',


//   }




// }));

// function About_T() {
//   const classes = useStyles();

//   return (
//       <div className={classes.root}>
//     <Container maxWidth={false}>
//     </Container>
//       </div>


//   )
// }

// export default About_T
