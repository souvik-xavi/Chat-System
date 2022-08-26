const express= require('express');
const app=express();
const http= require('http');
const cors= require('cors');

app.use(cors());

//Socket io
const {Server}=require('socket.io');

const server = http.createServer(app);

const io= new Server(server,{
    cors:{
        origin: "http://localhost:3000",
        methods:["GET","POST"],
    },
})


io.on("connection",(socket)=>{
    console.log(`User connected ${socket.id}`);

    socket.on("join_room",(data)=>{
        socket.join(data);
        console.log(`User joined ${data}`);
    })

    socket.on("sent_message",(data)=>{
        socket.to(data.roomId).emit("receive_message",data);
        console.log(data);
    })

    socket.on("disconnet",()=>{
        console.log(`User disconnected ${socket.id}`);
    })
})


server.listen(3001,()=>{
    console.log("Server running on node");
})