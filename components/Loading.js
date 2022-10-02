import { Grid } from "@material-ui/core";
import {Circle} from "better-react-spinkit";

function Loading(){
    return(
        <center style={{display:"grid" ,placeItems:"center", height: "100vh"}}>

        <div>  
            <img
            
            src="https://cdn.pixabay.com/photo/2016/11/30/18/14/chat-1873536_1280.png"
            alt=""
            style={{marginBottom:10}}
            height={200}
            
            />
            <Circle color="#3CBC28" size={60}/>
        </div>

            </center>
            
           
    )
}

export default Loading