
let { messageStatus, onlineUsers, pendingMsg, pendingGroup } = require("../models/queue");
const { registerUserToGroup, getGroupID } = require("./userService");


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
    registerUserToGroup(grpDetail.id, grpDetail.members);
    grpDetail.members.forEach((username)=>{
        const user = onlineUsers.find(u=> u.username === username);
        if(!user){
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

const handleChatMessage = (socket, msg) => {

    if(!onlineUsers.some(user=> user.username === msg.receiver)){
        if(!pendingMsg[msg.receiver]){
            pendingMsg[msg.receiver] = [msg];
        }else{
            pendingMsg[msg.receiver].push(msg);
        }
    }else{
        socket.broadcast.emit(`msg-for-${msg.receiver}`, msg);
    }
};

const handleConnect = (socket) => {
    console.log(socket.id);
    const username = socket.handshake.query.username
    onlineUsers.push({username, socketID: socket.id});
    const group = getGroupID(username);
    console.log(onlineUsers);
    
    group.forEach(grpID => {
        socket.join(grpID)
    });

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
    onlineUsers = onlineUsers.filter(user => user.username !== socket.handshake.query.username);
    console.log(onlineUsers.length , '- users online');
    socket.removeAllListeners();
};

module.exports = { handleChatMessage, handleConnect, handleDisconnect, handleGroupFormation };
