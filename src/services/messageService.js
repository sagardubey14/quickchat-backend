const { messageStatus, onlineUsers } = require("../models/queue");

const handleChatMessage = (socket, msg) => {
    if (messageStatus[msg.receiver]) return;
    socket.broadcast.emit(`msg-for-${msg.receiver}`, msg);
    socket.once(`msg-received-by-${msg.receiver}`, () => {
        messageStatus[msg.id] = true;
    });
};

const handleDisconnect = (socket) => {
    onlineUsers = onlineUsers.filter(user => user !== socket.handshake.query.username);
};

module.exports = { handleChatMessage, handleDisconnect };
