const { Server } = require('socket.io');

// Initialize Socket.io with the HTTP server
const initSocketIO = (server) => {
    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:5173',
            methods: ["GET", "POST"]
        }
    });

    const getTimestamp = () => {
        return new Date().toLocaleString();
    };
    const playerScores = []
    // Socket.io connection handler
    io.on('connection', (socket) => {
        console.log('User Connected', getTimestamp());

        socket.on('scores', (scores) => {
            playerScores.push({ ...scores, id: socket.id })
            socket.emit('playerscores', playerScores)

        })

        socket.on('disconnect', () => {
            console.log('User Disconnected', getTimestamp());
        });
    });

    return io;
};

module.exports = initSocketIO;
