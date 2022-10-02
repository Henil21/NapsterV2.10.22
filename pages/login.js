// import { styled } from "@material-ui/core";
import Head from "next/head";
// import styled from "styled-components";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import{auth,provider} from "../firebase";

function Login(){
    const sigIn=()=>{
        auth.signInWithPopup(provider).catch(alert);
    }
    return(
        <Container>
            <Head>
                <title>Login</title>
            </Head>
            <LoginContainer>
            <h2>Dont live a little , live  a Napster</h2>

            <Nap
                src="/NAPSTER.jpg"
                />
                <Logo
                src="https://cdn.pixabay.com/photo/2016/11/30/18/14/chat-1873536_1280.png"
                // src="/NAPSTER.ico"
                />
            
                <Button onClick={sigIn} variant="outlined" color="secondary">sign in with google</Button>
            </LoginContainer>
        </Container>
    );

}

export default Login;

const Container=styled.div`
display: grid;
place-items: center;
height: 100vh;
background: #77A1D3;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #E684AE, #79CBCA, #77A1D3);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #E684AE, #79CBCA, #77A1D3); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

;
`;


const LoginContainer=styled.div`
padding: 75px;
display: flex;
flex-direction: column;
align-items: center;
background-color: white;
border-radius: 20px;
box-shadow: 0px 4px 14px -3px rgba(0.7,0,0.7,7);
`;

const Nap=styled.img`

`;

const Logo=styled.img`
 height: 160px;
 width: 150px;
`;