import React, { useEffect, useState } from 'react';
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = (props) => {
    const {username,socket,roomId}=props;
    const [currentMessage,setCurrentMessage]=useState("");
    const [messageList, setMessageList] = useState([]);
    const sentMessage= async()=>{
        if(currentMessage!==""){
            const messageDate={
                roomId:roomId,
                author:username,
                message:currentMessage,
                time: new Date(Date.now()).getHours() +
                ":" +
                new Date(Date.now()).getMinutes(),

            }
            setMessageList((list) => [...list, messageDate]);
            console.log(messageList);
            await socket.emit("sent_message",messageDate);
            setCurrentMessage("");
        }
        
    }

    useEffect(()=>{
        socket.on("receive_message",(data)=>{
            console.log(data);
            setMessageList((list) => [...list, data]);
        })
        console.log(messageList)

    },[socket]);
    return (
        <div className="chat-window">
            <div className='chat-header'>
                <p>Live Chat</p>
            </div>
            <div className='chat-body'><ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom></div>
            <div className='chat-footer'>
                <input type="text" placeholder='hey..' onChange={(e)=>setCurrentMessage(e.target.value)} 
                value={currentMessage}
                onKeyPress={(event) => {
                event.key === "Enter" && sentMessage();
                    }}
          />
                <button onClick={sentMessage}>&#9658;</button>
            </div>
            
        </div>
    );
};

export default Chat;