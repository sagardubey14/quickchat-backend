let { messageStatus, onlineUsers, pendingMsg, pendingGroup } = require("../models/queue");
let Group = require('../models/groupModel')

const handleRoomJoining = (socket, grpDetail, pending = false)=>{
    console.log(socket.handshake.query.username);
    if(pending){
        socket.emit(`group-formation`, grpDetail);
    }else{
        socket.broadcast.emit(`group-formation`, grpDetail);
    }
}

const handleGroupFormation = (socket, grpDetail)=>{
    console.log(grpDetail);
    Group[grpDetail.id] = grpDetail.members;
    grpDetail.members.forEach((username)=>{
        if(!onlineUsers.includes(username)){
            console.log(`${username} is not online`);
            if(!pendingGroup[username]){
                pendingGroup[username] = [grpDetail];
            }else{
                pendingGroup[username].push(grpDetail);
            }
        }else{
            handleRoomJoining(socket, grpDetail);
        }
    })
}

const handleGroupMessage = (socket, msg)=>{
    console.log(msg, socket.handshake.query.username);
    console.log(Group[msg.receiver]);
    let finalMsg = {msg, receiver:msg.receiver}
    Group[msg.receiver].forEach(mem=>{
        if(!onlineUsers.includes(mem)){
            if(!pendingMsg[mem]){
                pendingMsg[mem] = [finalMsg];
            }else{
                pendingMsg[mem].push(finalMsg);
            }
        }else{
            socket.broadcast.emit(`msg-for-${mem}`, finalMsg);
        }
    })
    console.log(pendingMsg);
}

const handleChatMessage = (socket, msg) => {
    let finalMsg = {msg, receiver:null}
    if(!onlineUsers.some(user=> user === msg.receiver)){
        if(!pendingMsg[msg.receiver]){
            pendingMsg[msg.receiver] = [finalMsg];
        }else{
            pendingMsg[msg.receiver].push(finalMsg);
        }
    }else{
        socket.broadcast.emit(`msg-for-${msg.receiver}`, finalMsg);
    }
    console.log(pendingMsg);
};

const handleConnect = (socket) => {
    console.log(socket.id);
    const username = socket.handshake.query.username
    onlineUsers.push(username);
    console.log(onlineUsers);

    if(pendingGroup[username]){
        pendingGroup[username].forEach(grpDetail=>{
            handleRoomJoining(socket, grpDetail, true);
        })
    }
    if(pendingMsg[username]){
        socket.emit(`pending-msg-${username}`, pendingMsg[username])
        delete pendingMsg[username];
    }

    console.log('Count - ',onlineUsers.length);
};

const handleDisconnect = (socket) => {
    onlineUsers = onlineUsers.filter(user => user !== socket.handshake.query.username);
    console.log(onlineUsers.length , '- users online');
    socket.removeAllListeners();
};

module.exports = { handleChatMessage, handleConnect, handleDisconnect, handleGroupFormation, handleGroupMessage };
