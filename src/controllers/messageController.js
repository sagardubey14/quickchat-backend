const { handleChatMessage, handleDisconnect, handleGroupFormation } = require('../services/messageService');

const groupFormation = (socket, grpDetail)=>{
    handleGroupFormation(socket, grpDetail)
}

const chatMessage = (socket, msg) => {
    handleChatMessage(socket, msg);
};

const disconnect = (socket) => {
    handleDisconnect(socket);
};

module.exports = { chatMessage, disconnect, groupFormation };
