import React, { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
// import ACTIONS from '../componets/Actions';
import ACTIONS from '../components/Actions';
import Username from '../components/Username';
import Editor from '../components/Editor';
import CopyId from '../components/CopyId';
import { initsocket } from '../components/socketconnection';
import { VideoRoom } from '../components/VideoRoom';
import Navbar from './Navbar';
import {
    useLocation,
    useNavigate,
    Navigate,
    useParams,
} from 'react-router-dom';
import Output from '../components/Output';

const EditorPage = () => {
    const socketRef = useRef(null);
    const codeRef = useRef(null);
    const location = useLocation();
    const { roomid } = useParams();
    const reactNavigator = useNavigate();
    const [clients, setClients] = useState([]);
    // console.log("current is da"+codeRef.current);
    useEffect(() => {
        const init = async () => {
            socketRef.current = await initsocket();
            socketRef.current.on('connect_error', (err) => handleErrors(err));
            socketRef.current.on('connect_failed', (err) => handleErrors(err));
            function handleErrors(e) {
                console.log('socket error', e);
                toast.error('Socket connection failed, try again later.');
                reactNavigator('/');
            }

            socketRef.current.emit(ACTIONS.JOIN, {
                roomid,
                username: location.state?.username,
            });
            socketRef.current.on(
                ACTIONS.JOINED,
                ({ clients, username, socketId }) => {
                    if (username !== location.state?.username) {
                        toast.success(`${username} joined the room.`);
                        console.log(`${username} joined`);
                    }
                    setClients(clients);
                    socketRef.current.emit(ACTIONS.SYNC_CODE, {
                        code: codeRef.current,
                        socketId,
                    });
                }
            );
            socketRef.current.on(
                ACTIONS.DISCONNECTED,
                ({ socketId, username }) => {
                    toast.success(`${username} left the room.`);
                    setClients((prev) => {
                        return prev.filter(
                            (client) => client.socketId !== socketId
                        );
                    });
                }
            );
        };
        init();
        return () => {
            socketRef.current.disconnect();
            socketRef.current.off(ACTIONS.JOINED);
            socketRef.current.off(ACTIONS.DISCONNECTED);
        };
    }, []);

    async function copyroomid() {
        try {
            await navigator.clipboard.writeText(roomid);
            toast.success('Room ID has been copied to your clipboard');
        } catch (err) {
            toast.error('Could not copy the Room ID');
            console.error(err);
        }
    }

    function leaveRoom() {
        reactNavigator('/');
    }

    if (!location.state) {
        return <Navigate to="/" />;
    }
    return (
        <div className='Editorpage_conatiner'>
        <div className='inside_editor_container'>
            <div className='left_side_editorpage'>
                <div className='left_inside_Editor'>
                    <Username Clienname={clients}/>
                </div>
                <CopyId/>
            </div>
            <div className='right_side_editorpage'>
                {/* <div className='Gridexample'>
                <VideoRoom></VideoRoom>
                </div> */}
                {/* <Navbar></Navbar> */}
                <div className='grid_info'>
                <Editor socketref={socketRef} roomid={roomid} onCodeChange={(code) => {
                    codeRef.current = code;
                }}/>
                {/* <VideoRoom></VideoRoom> */}
                {/* <Output codeRef={codeRef}></Output> */}
                {/* <div className="sidebar">
                <div className="resizer"></div>
                <Output codeRef={codeRef}></Output>
                </div> */}
                </div>
            </div>
        </div>
    </div>
    );
};
export default EditorPage;