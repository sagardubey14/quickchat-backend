const { chatMessage, disconnect, groupFormation } = require('../controllers/messageController');
const { handleConnect } = require('../services/messageService');

const socketHandler = (socket) => {
    console.log('A user connected');
    handleConnect(socket);

    socket.on('grp-formation',(grpDetail)=>{
        groupFormation(socket, grpDetail);
    })

    socket.on('join-room', (roomId) => {
        socket.join(roomId);
        console.log(socket.handshake.query.username, 'has joined room', roomId);
    });

    socket.on('chat-message', (msg) => {
        chatMessage(socket, msg);
    });

    socket.on('disconnect', () => {
        disconnect(socket);
    });
};

module.exports = socketHandler;
