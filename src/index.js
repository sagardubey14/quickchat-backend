const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const cors = require('cors')
let onlineUsers=[];
const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
    }
});


io.on('connection', (socket) => {
    console.log('A user connected');
    console.log(socket.handshake.query);
    onlineUsers.push(socket.handshake.query.username)
    // Listen for messages from the client
    socket.on('chat-message', (msg) => {
        console.log('Message received: ' + msg);
        io.emit('chat-message', msg); 
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        onlineUsers = onlineUsers.filter(user=>user!==socket.handshake.query.username)
        console.log(onlineUsers);
        console.log(socket.handshake.query);
        console.log('User disconnected');
    });
});


server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

