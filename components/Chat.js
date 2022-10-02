import styled from "styled-components";
import { Avatar, Button, IconButton } from "@material-ui/core";
import getRecipientEmail from "../utils/getRecipientEmail";
import { auth,db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import {useRouter} from "next/router";

<meta name="viewport" content="width=device-width,initial-scale=1"/>

function Chat({id,users}){
    const router =useRouter();
    const[user]=useAuthState(auth)

    const [recipientSnapshot] = useCollection(

        
        db.collection("users").where("email", "==", getRecipientEmail(users, user))
        
        );
        // ()=>
    const enterChat= ()=>{
        router.push(`/Chat/${id}`)
    }
    const recipient= recipientSnapshot?.docs?.[0]?.data();
    const recipientEmail= getRecipientEmail(users,user)


    return(<Container onClick={enterChat}>

      {recipient ? (

       <UserAvatar src={recipient?.photoURL} />
       ):( //Find related code in whatsapp-2

         <UserAvatar>{recipientEmail[0]}</UserAvatar>
       )
      }
        <p>{recipientEmail}</p>
    </Container>
);
}
export default Chat;
const Container=styled.div`
display:flex;
align-items: center;
cursor: pointer;
padding: 5px;
word-break: break-word;
/* word-break: break-all; */
/* width:80%; */
 :hover{
    background: #8e9eab;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #eef2f3, #8e9eab);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #eef2f3, #8e9eab); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

 }
`;

const UserAvatar=styled(Avatar)`
margin: 5px;
margin-right: 15px;
  
`;