let { messageStatus, onlineUsers, pendingMsg, pendingGroup } = require("../models/queue");
let Group = require('../models/groupModel');
const { setLastSeen, getUsersByUsername, getLastSeen } = require("./userService");

const handleRoomJoining = (socket, grpDetail, pending = false)=>{
    if(pending){
        socket.emit(`group-formation`, grpDetail);
    }else{
        socket.broadcast.emit(`group-formation`, grpDetail);
    }
}

const handleLeaveGroup = (req, res) =>{
    const groupName = req.params.groupName;
    const username = req.params.username;
    // console.log(groupName, username ,'leave group');
    
    if(!Group[groupName]){
        res.status(400).json({ message: `Group '${groupName} not found'` });
    }else{
        Group[groupName] = Group[groupName].filter(user => user!==username);
        if(Group[groupName].length === 0){
            delete Group[groupName];
        }
    }
    res.status(200).json({ message: `User '${username}' successfully removed from group '${groupName}'` });
}

const hadnleMsgStatus = (socket, msgDetail)=>{
    const { msgId, sender, receiver, status} = msgDetail;
    if(!onlineUsers.includes(sender)){
        if(!messageStatus[sender]){
            messageStatus[sender] = [{msgId, receiver, status}];
        }else{
            messageStatus[sender].push({msgId, receiver, status});
        }
    }else{
        socket.broadcast.emit(`msg-status-${sender}`,{msgId, receiver, status});
    }
}

const handleGroupFormation = (socket, grpDetail)=>{
    Group[grpDetail.id] = grpDetail.members;
    grpDetail.members.forEach((username)=>{
        if(!onlineUsers.includes(username)){
            if(!pendingGroup[username]){
                pendingGroup[username] = [grpDetail];
            }else{
                pendingGroup[username].push(grpDetail);
            }
        }else{
            handleRoomJoining(socket, grpDetail);
        }
    })
    // console.log(Group);
    
}

const handleGroupMessage = (socket, msg, grpID)=>{
    let finalMsg = {msg, receiver:msg.receiver, grpID}
    Group[grpID].forEach(mem=>{
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
};

const getQueueDataToAdmin = (key)=>{
    if(key === 'queue')
        return {Queue:{messageStatus, onlineUsers, pendingMsg, pendingGroup}};
    else if(key === 'group')
        return {Group};
    else{
        return { Queue:{messageStatus, onlineUsers, pendingMsg, pendingGroup}, Group};
    }
}

const handleConnect = (socket) => {
    const username = socket.handshake.query.username
    onlineUsers.push(username);
    // console.log(onlineUsers);

    if(pendingGroup[username]){
        pendingGroup[username].forEach(grpDetail=>{
            handleRoomJoining(socket, grpDetail, true);
        })
        delete pendingGroup[username];
    }
    if(pendingMsg[username]){
        socket.emit(`pending-msg-${username}`, pendingMsg[username])
        delete pendingMsg[username];
    }
};

const handleDisconnect = (socket) => {
    onlineUsers = onlineUsers.filter(user => user !== socket.handshake.query.username);
    setLastSeen(socket.handshake.query.username);
    socket.removeAllListeners();
};

const handleUserStatus = (socket, username, callback)=>{
    if(onlineUsers.includes(username)){
        callback({status:'online'});
    }else{
        let time = getLastSeen(username);
        callback({status:'offline', time});
    }
}

module.exports = { handleChatMessage, handleConnect, handleDisconnect, handleGroupFormation, handleGroupMessage, handleUserStatus, hadnleMsgStatus, handleLeaveGroup, getQueueDataToAdmin };
