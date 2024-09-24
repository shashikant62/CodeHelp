import React from "react";
import Avatar from 'react-avatar';
const Username=({Clienname})=>{
    console.log(Clienname);
    return(<>
    {Clienname.map((item)=>(
    <div className='Avtar_container'>
        <Avatar name={item.username}size={40} round="14px"/>
        <span className="userName">{item.username}</span>
    </div>
    ))}
    </>);
}
export default Username;