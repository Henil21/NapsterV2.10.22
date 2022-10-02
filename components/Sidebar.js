import styled from "styled-components";
import { Avatar, Button, IconButton } from "@material-ui/core";
import ForumIcon from '@material-ui/icons/Forum';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import SearchIcon from '@material-ui/icons/Search';
import * as EmailValidator from "email-validator";
import { auth,db  } from "../firebase";
import {useAuthState} from "react-firebase-hooks/auth"
import {useCollection} from "react-firebase-hooks/firestore"
import Chat from "./Chat";

<meta name="viewport" content="width=device-width,initial-scale=1"/>

function Sidebar(){
    const [user]=useAuthState(auth);
    const userChatRef=db.collection('Chats').where('users', 'array-contains', user.email);
    const[chatsSnapshot]=useCollection(userChatRef);
    
    const createchat =()=>{
        const input = prompt(
        "Please enter an email address for user You want to chat with"
        );

    
    if(!input) return null;

    if(EmailValidator.validate(input) && !chatAlreadyExists(input)  && input!== user.email){
    //   if it didnt exsist than add it
        db.collection("Chats").add({
            users: [user.email,input],

        })

    }
  }
     const signout=()=>{
         auth.signOut()
     }
     const chatAlreadyExists=(recipientEmail)=>
         !!chatsSnapshot?.docs.find(
             (chat)=>
             chat.data().users.find((user) => user ===recipientEmail)?.length>0
         );
     
    return(
       <Container>
        <Header>
             
           <UserAvatar src={user.photoURL} onClick={signout}>
           </UserAvatar>
            {/* icons */}
            <Icons>
            <IconButton>
             <ForumIcon/>
           
            </IconButton>
            <IconButton>

            <MoreVertOutlinedIcon/>
            </IconButton>

            </Icons>


           </Header>
           <Search>
               <SearchIcon/>
               <SearchInput placeholder="Search"/>
           </Search>
           <SidebarButton onClick={createchat}>Start New Chat</SidebarButton>
           {chatsSnapshot?.docs.map((chat)=>(
            <Chat key={chat.id} id={chat.id} users={chat.data().users}/>
         ) )}
       </Container>
    );

}
export default Sidebar;

const Container=styled.div`
flex:0.45;
border-right: 1px solid black;
height:100vh;
min-width: 100px;
max-width: 350px;
overflow-y: scroll;
::-webkit-scrollbar{
    display: none
}
-ms-overflow-style: none;
scrollbar-width:none;
`;

const SidebarButton=styled(Button)`
 width: 100%;
 &&&{
     border-top: 1px solid whitesmoke;
     border-bottom: 1px solid whitesmoke;

 }
`;

const Search=styled.div`
 display:flex;
 align-items: center;
 border-radius: 2px;
 padding: 10px;
`;
const SearchInput=styled.input`
border: none;
outline-width: 0;
flex: 1;
`;



const Header=styled.div`
 display:flex;
 display:sticky;
 top:0;
 background-color:whitesmoke;
 z-index: 1;
 justify-content: space-between;
 align-items:center;
 padding:15px;
 height: 80px;
 border-bottom: 1px solid black;
 width: 100%;
`;

const UserAvatar=styled(Avatar)`
cursor: pointer;
  :hover{
    opacity: 0.8;
 }
`;

const Icons=styled.div`
`;
