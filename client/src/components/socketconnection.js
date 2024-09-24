import {io} from 'socket.io-client';
export const initsocket=async()=>{
    const backent_url="http://localhost:5000";
    const options={
        'force new connection': true,
        reconnectionAttempt:'Infinity',
        timeout: 10000,
        transports: ['websocket'],
    }
    return io(backent_url,options);
}