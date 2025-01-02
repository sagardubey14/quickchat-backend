const { handleChatMessage, handleDisconnect, handleGroupFormation, handleGroupMessage } = require('../services/messageService');

const groupFormation = (socket, grpDetail)=>{
    handleGroupFormation(socket, grpDetail)
}

const groupMessage = (socket, msg) => {
    handleGroupMessage(socket, msg);
};

const chatMessage = (socket, msg) => {
    handleChatMessage(socket, msg);
};

const disconnect = (socket) => {
    handleDisconnect(socket);
};

module.exports = { chatMessage, disconnect, groupFormation, groupMessage };
