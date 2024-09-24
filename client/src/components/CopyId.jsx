import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
const CopyId=({Copyid})=>{
    let navigate=useNavigate();
    console.log("roomid"+Copyid);
    const Copybtn=async()=>{
        try {
        await navigator.clipboard.writeText(Copyid);
        toast.success("Id Copyed..");
        } catch (error) {
            toast.error("Copy failed "+error);
        }
    }

    const Leaveroom=async()=>{
        try {
            navigate('/');
            toast.success("Room Lived");
            } catch (error) {
                toast.error("Room not Lived "+error);
        }
    }
    return(<>
    <div className="Copyid_container">
        <div className="inside_copyconatinerr">
            <button className="copyid_btn" onClick={Copybtn} id="copyid">Copy Id</button>
            <button className="copyid_btn" onClick={Leaveroom} id="leaveroom">Leave Room</button>
        </div>
    </div>
    </>);
}
export default CopyId;