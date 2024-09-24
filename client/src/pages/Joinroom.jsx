import { useState } from "react";
import {v4 as uuidv4} from "uuid";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
const Joinroom=()=>{
    const [roomid,setroomid]=useState('');
    const [username,setusername]=useState('');
    let navigate=useNavigate();
    const Createroom=(e)=>{
        e.preventDefault();
        let id=uuidv4();
        setroomid(id);
        toast.success("Room Is Created...");
    }

    const Btn_joinroom=()=>{
        try {
        if(!roomid || !username){
            toast.error("Fill all Field..");
        }
        else{
        navigate(`/room/${roomid}`,{
            state:{
                username,
                roomid
            }
        });
        toast.success("Joined Room..");
        }  
    } catch (error) {
            toast.error(error);
    }
    }
    const handelkey=(e)=>{
        if(e.code=="Enter"){
            Btn_joinroom();
        }
    }
    return(<>
    <div className='Joinroom_container'>
        <div className='Joinroom_inside'>
            <div className="img_logo_div">
            <img src="./img/logo.png" className="img_logo" alt="img"></img>
            <h3 className="text_all">Code... Run...</h3>
            </div>
            <div className="Joinroom_inside_inside">
            <div className="inputfield_joinroom">
                <input className="joinroomtext" type="text" value={roomid}
                onChange={(e)=>{setroomid(e.target.value)}} placeholder="ROOM ID" onKeyUp={handelkey}></input>
                <input className="joinroomtext"type="text" onChange={(e)=>{setusername(e.target.value)}}placeholder="USERNAME" onKeyUp={handelkey} value={username}></input>
            </div>
            <div className="btn">
                <button className="btn_joinroom" onClick={Btn_joinroom}>JoinRoom</button> 
            </div>
            <span className="generate_id">If You don't have invite then <a href="" className="create_room_link" onClick={Createroom}>Create Room</a></span>
            </div>
        </div>
        {/* <VideoRoom></VideoRoom> */}
    </div>
    </>)
}
export default Joinroom;