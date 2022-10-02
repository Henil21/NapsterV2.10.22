import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import {auth,db} from "../firebase";
import  Head from "next/head";
import  Message from "./Message";
import {useRouter} from "next/router";
import { Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { useCollection } from "react-firebase-hooks/firestore";
import { InsertEmoticon } from "@material-ui/icons";
import {useState} from 'react';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
// import firebase from 'firebase';
import firebase from 'firebase/compat/app';
import getRecipientEmail from "../utils/getRecipientEmail";



// <meta name="viewport" content="width=device-width,initial-scale=1"/>


function ChatScreen({chat,messages}) {
    console.log(chat)
    const [user]=useAuthState(auth);
    const [input,setInput] = useState("");
    const router =useRouter();
    const {messagesSnapshot} = useCollection(
    db
    .collection('chats')
    .doc(router.query.id)
    .collection( "messages")
    .orderBy("timestamp","asc")
    );
const[recipientSnapshot] = useCollection(
    db.collection("users").where("email", "==", getRecipientEmail(chat.users,user))

);

// const [recipentSnapshot] =useCollection(db.collection('users').where('email', '==', getRecipientEmail(chat.users, user)));
    const showMessage=()=>{
        if(messagesSnapshot){
            return messagesSnapshot.docs.map((message)=>(
                <Message
                key={message.id}
                user={message.data().user}
                message={{
                    ...message.data(),
                    timestamp:message.data().timestamp?.ToDate().getTime(),
                }}
                />
            ));
        }else{   
           try{    
                return JSON.parse(messages).map((message) => (
                <Message key={message.id} user={message.user} message={message} />     
                ));
         }catch(e){ return "error"}
        }
    }
        
    
const  sendMsg=(e)=>{
        // e.preventDefault();
        e.preventDefault();
        
        db.collection("users").doc(user.uid).set({
            lastseen:firebase.firestore.FieldValue.serverTimestamp()
        },
        {merge:true}
        );
        db.collection('chats').doc(router.query.id).collection ('messages')
        .add({
             timestamp: firebase. firestore. FieldValue.serverTimestamp(),
             message: input,
             user:user.email,
             photoURL:user.photoURL,

        });
         
        setInput("");
    };
 const  recipent=recipientSnapshot?.docs?.[0]?.data();
 const recipientEmail=getRecipientEmail(chat.users,user);
 return(
        <Container>
            <Header>
               {recipent ?(
                <Avatar>{recipent?.photoURL}</Avatar>

               ):(
                <Avatar>{recipientEmail[0]}</Avatar>
               )
            }
                <HeaderInfo>
                    <h3>Name</h3>
                    <p>lastseen</p>
                </HeaderInfo>
                <HeaderIcon>
                    <IconButton>
                        <AttachFileIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                    
                </HeaderIcon>
            </Header>
            <Messagecontainer>
                {showMessage()}
                <Endofmessage/>
            </Messagecontainer>
            <InputContainer>
              <InsertEmoticonIcon/>
              <Input value={input} onChange={e=>setInput(e.target.value)}/>
            <button hidden disabled={!input} type="submit" 
            onClick={sendMsg}>Send msg</button>
              <MicIcon/>

            </InputContainer>
        </Container>
    );
    return (
        <Container>
            {/* <h1>THIS IS GOD DAMN CHAT</h1> */}
        </Container>
    );
}

export default ChatScreen;

const Container = styled.div`
/* display:flex;
align-items: center; */
`;

const Input = styled.input`
 flex: 1;
 border: none;
 border-radius:10px;
 background-color:whitesmoke;
 padding:10px;
 margin-left: 15px;
 margin-right: 15px;
`;

const InputContainer = styled.form`
display: flex;
padding:10px;
align-items: center;
position: sticky;
width: 75%;
position: fixed;
bottom:0%;
background-color:white;
z-index:100;
::-webkit-scrollbar{
    display: none
}

`;



const Header = styled.div`
/* position:sticky; */
background-color:whitesmoke ;
position: fixed;
width: 100%;
z-index: 100;
top: 0%;
padding: 12px;
display: flex;
align-items: center;
border: 1px solid black;
height:80px;
`;

const HeaderInfo = styled.div`
margin-left:15px;
flex: 1;
 >h3{
     margin-bottom: 3px;
}
>p{
    font-size:14px;
    color: gray;
    /* padding:-5px */
}
`;


const HeaderIcon = styled.div`
`;
const Messagecontainer=styled.div`
padding:30px;
min-height: 92vh;
background-color: #e3ded8;
/* padding-bottom: 1%; */
`;
const EndofMessage=styled.div`
`;
