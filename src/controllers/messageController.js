const { handleChatMessage, handleDisconnect } = require('../services/messageService');

const chatMessage = (socket, msg) => {
    handleChatMessage(socket, msg);
};

const disconnect = (socket) => {
    handleDisconnect(socket);
};

module.exports = { chatMessage, disconnect };
