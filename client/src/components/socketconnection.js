import {io} from 'socket.io-client';
export const initsocket=async()=>{
    const backent_url="https://codehelp-backend-ac8q.onrender.com";
    const options={
        'force new connection': true,
        reconnectionAttempt:'Infinity',
        timeout: 10000,
        transports: ['websocket'],
    }
    return io(backent_url,options);
}
