const { chatMessage, disconnect, groupFormation, groupMessage } = require('../controllers/messageController');
const { handleConnect, handleUserStatus } = require('../services/messageService');

const socketHandler = (socket) => {
    console.log('A user connected');
    handleConnect(socket);

    socket.on('grp-formation',(grpDetail)=>{
        groupFormation(socket, grpDetail);
    })
    socket.on('user-status',(username, callback)=>{
        // console.log(callback);
        handleUserStatus(socket, username, callback);
        
    })

    socket.on('chat-message', (msg) => {
        // console.log(msg);
        
        if(msg.isGroup){
            groupMessage(socket, msg.msg);
        }else{
            chatMessage(socket, msg.msg);
        }
        
    });

    socket.on('disconnect', () => {
        disconnect(socket);
    });
};

module.exports = socketHandler;
