import styled from "styled-components";
import  Head from "next/head";
import Sidebar from "../../components/Sidebar";
import ChatScreen  from "../../components/ChatScreen";
import {auth,db} from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import getRecipientEmail from "../../utils/getRecipientEmail";
import { useCollection } from "react-firebase-hooks/firestore";


function Chat({chat , messages}) {
    const [user]=useAuthState(auth);
    // console.log(users);
    return(

            <Container>
                <Head>
                <title>Chat with {getRecipientEmail(chat.users,user)}</title>
                   {/* <title>Chat with{getRecipientEmail(chat.users,user)}</title> */}
                </Head>
               
                 <Sidebar/>
                 <Chatcontainer>
                     <ChatScreen chat={chat} messages={messages}/>
                     {/* <h1>This </h1> */}
                
                 </Chatcontainer>
            </Container>

    );
}
export default Chat;
export async function getServerSideProps(context){
    const ref = db.collection("Chats").doc(context.query.id);
    const messagesRes= await ref
    .collection("messages")
    .orderBy("timestamp","asc")
    .get();
    const  messages=messagesRes.docs
        .map((doc)=>({
        id:doc.id,
        ...doc.data(),
    })).map(messages=>({
        ...messages,
        timestamp:messages.timestamp.toDate().getTime(),
    }));
    const chatRes=await ref.get();
    const chat={
        id:chatRes.id,
        ...chatRes.data()
    };
    // console.log(chat,messages)
    console.log(getRecipientEmail(chat.user));

    return{
        props:{
            messages: JSON.stringify(messages),
            chat:chat,
        },

    };
}

const Container = styled.div`
display:flex;
width: auto;

`;

const Chatcontainer = styled.div`
flex: 1;
overflow: scroll;
height: 100vh;
::-webkit-scrollbar {
    display: none;
};
-ms-overflow-style: none;
scrollbar-width: none; /* Firefox */

`;
