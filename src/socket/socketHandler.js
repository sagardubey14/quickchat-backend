const { chatMessage, disconnect, groupFormation, groupMessage } = require('../controllers/messageController');
const { handleConnect, handleUserStatus, hadnleMsgStatus } = require('../services/messageService');

const socketHandler = (socket) => {
    console.log('A user connected');
    handleConnect(socket);

    socket.on('grp-formation',(grpDetail)=>{
        groupFormation(socket, grpDetail);
    })
    socket.on('user-status',(username, callback)=>{
        handleUserStatus(socket, username, callback);
    })

    socket.on('msg-status',(msg)=>{
        hadnleMsgStatus(socket, msg);
    })

    socket.on('chat-message', (msg) => {
        if(msg.typing){
            socket.broadcast.emit(`user-typing-at-${msg.chat}`, true);
        }else{
            if(msg.grpDetail.isGroup){
                groupMessage(socket, msg.msg, msg.grpDetail.grpID);
            }else{
                chatMessage(socket, msg.msg);
            }
        }
    });

    socket.on('disconnect', () => {
        disconnect(socket);
    });
};

module.exports = socketHandler;
