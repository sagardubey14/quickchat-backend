const { chatMessage, disconnect } = require('../controllers/messageController');
const { onlineUsers } = require("../models/queue");

const socketHandler = (socket) => {
    console.log('A user connected');
    onlineUsers.push(socket.handshake.query.username);

    socket.on('chat-message', (msg) => {
        chatMessage(socket, msg);
    });

    socket.on('disconnect', () => {
        disconnect(socket);
    });
};

module.exports = socketHandler;
