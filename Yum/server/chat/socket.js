const ChatRoom = require("../models/chatRoom.model");
const ChatMessage = require("../models/chatMessage.model");

module.exports = function (server) {
    const io = require('socket.io')(server, {
        cors: {
            origin: "*",
        },
    });

    io.on("connection", (socket) => {
        console.log('connected');
        const { roomID } = socket.handshake.query;
        socket.join(roomID);

        socket.on("newChatMessage", async (data) => {
            const message = new ChatMessage({
                from: data.from,
                room: roomID,
                message: data.message
            });

            await message.save();
            io.in(roomID).emit("newChatMessage", data);
        });

        socket.on("getChatHistory", async () => {
            const history = await ChatMessage.find({ room: roomID }).limit(25).sort({ date: 'desc' });
            socket.emit("chatHistory", history);
        })
    });
}