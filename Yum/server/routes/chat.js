const router = require("express").Router();
const jwt = require("express-jwt");
const ChatRoom = require("../models/chatRoom.model");
const ChatMessage = require("../models/chatMessage.model");
const User = require("../models/user.model");

router.get('/convos', jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }), async (req, res) => {
    const conversations = await ChatRoom.find({ users: req.user._id });

    const response = [];
    for (const conversation of conversations) {
        for (const user of conversation.users) {
            if (user !== req.user._id) {
                const userData = await User.findById(user);
                const lastMessage = await ChatMessage.find({ room: conversation._id.toString() }).sort({ _id: -1 }).limit(1)[0];
                response.push({
                    roomID: conversation._id.toString(),
                    toName: userData.name,
                    lastMessage: (lastMessage) ? lastMessage.message : ''
                });
            }
        }
    }

    res.status(200).send(response);
});

router.post('/newconvo', jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }), async (req, res) => {
    if (!req.body.contactID) {
        return res.status(422).send({ error: "Not all fields were complete" });
    }
    const existingConvo = await ChatRoom.findOne({ users: { $all: [req.body.contactID, req.user._id]}});
    console.log(existingConvo);
    if (existingConvo) {
        res.status(200).send({ roomID: existingConvo._id.toString() });
        return;
    }

    const newRoomDoc = new ChatRoom({
        users: [req.body.contactID, req.user._id]
    });

    const newRoom = await newRoomDoc.save();
    res.status(200).send({ roomID: newRoom._id.toString() });
});

module.exports = router;
