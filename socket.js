const { User, Message } = require('./model');

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        socket.on('joinRoom', async (data) => {
            const { username, room } = data;

            const user = await User.findOne({ username });
            if (user) {
                socket.username = username;
                socket.room = room;

                socket.join(room);
                socket.broadcast.to(room).emit('chatMessage', { username: 'System', content: `${username} has joined the room.` });

                io.emit('updateRoomList', getRoomList());
            }
        });

        socket.on('leaveRoom', () => {
            const { username, room } = socket;

            socket.leave(room);
            socket.broadcast.to(room).emit('chatMessage', { username: 'System', content: `${username} has left the room.` });

            io.emit('updateRoomList', getRoomList());
        });

        socket.on('chatMessage', async (data) => {
            const { username, room, content } = data;

            const newMessage = new Message({ username, room, content });
            await newMessage.save();

            io.to(room).emit('chatMessage', { username, content });
        });


        socket.on('typing', () => {
            const { username, room } = socket;
            socket.to(room).emit('userTyping', username);
        });


        socket.on('privateMessage', (data) => {
            const { to, message } = data;
            io.to(to).emit('privateMessage', { from: socket.username, message });
        });


        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);

            if (socket.username && socket.room) {

                socket.broadcast.to(socket.room).emit('chatMessage', { username: 'System', content: `${socket.username} has left the room.` });

                io.emit('updateRoomList', getRoomList());
            }
        });

        function getRoomList() {
            const rooms = Object.keys(socket.adapter.rooms);
            return rooms.filter(room => room !== socket.id);
        }
    });
};
