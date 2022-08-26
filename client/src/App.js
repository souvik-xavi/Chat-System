import './App.css';
import io from 'socket.io-client';
import {useState} from 'react';
import Chat from './Chat';
const socket = io.connect("http://localhost:3001")

function App() {
  const [username,setUsername]=useState("");
  const [roomId,setRoomId]=useState("");
  const [chatOn,setChatOn]=useState(false);
 
  
  const joinRoom=()=>{
    if(username !=="" && roomId!==""){
      socket.emit("join_room",roomId);
      setChatOn(true);
    }

  }

  return (
    <div className="App">
      {!chatOn ? 
      <div>
      <h3 style={{textAlign:"center"}}>Join A Room</h3>
      <input type="text" placeholder="Peter..."  onChange={(e)=>{setUsername(e.target.value)}}></input>
      <input type="text" placeholder="Room id..."  onChange={(e)=>{setRoomId(e.target.value)}}  ></input>
      <button onClick={joinRoom}>Join the room</button></div>
      
      :
     
      <Chat username={username} socket={socket} roomId={roomId} />
      
}
    </div>
  );
}

export default App;
