const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const socketHandler = require('./socket/socketHandler');

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: [
            "http://localhost:5173",
            "http://192.168.220.134:5173"
        ],
        methods: ["GET", "POST"],
    }
});

io.on('connection', socketHandler);



server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

