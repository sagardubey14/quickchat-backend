const { handleChatMessage, handleDisconnect, handleGroupFormation, handleGroupMessage, handleUserStatus } = require('../services/messageService');

const groupFormation = (socket, grpDetail)=>{
    handleGroupFormation(socket, grpDetail)
}

const groupMessage = (socket, msg, grpID) => {
    handleGroupMessage(socket, msg, grpID);
};

const chatMessage = (socket, msg) => {
    handleChatMessage(socket, msg);
};

const disconnect = (socket) => {
    handleDisconnect(socket);
};


module.exports = { chatMessage, disconnect, groupFormation, groupMessage };
