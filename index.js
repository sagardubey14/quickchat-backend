const http = require('http');
const { Server } = require('socket.io');
const app = require('./src/app');
const socketHandler = require('./src/socket/socketHandler');
require('dotenv').config();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(','): [],
        methods: ["GET", "POST"],
    }
});

io.on('connection', socketHandler);



server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
