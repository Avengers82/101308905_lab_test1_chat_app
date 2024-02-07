const express = require('express');
const { User, Message } = require('./model');
const router = express.Router();

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    try {
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user' });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username, password });
        if (user) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error during login' });
    }
});

router.post('/join', async (req, res) => {
    const { username, room } = req.body;

    try {
        const user = await User.findOne({ username });
        if (user) {
            // Join the room and notify others
            socket.broadcast.to(room).emit('chatMessage', { username: 'System', content: `${username} has joined the room.` });
            
            res.status(200).json({ message: 'User joined room successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error during joining room' });
    }
});

router.post('/leave', async (req, res) => {
    const { username, room } = req.body;

    try {
        const user = await User.findOne({ username });
        if (user) {
            res.status(200).json({ message: 'User left room successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error during leaving room' });
    }
});

router.get('/chat-history/:room', async (req, res) => {
    const room = req.params.room;

    try {
        const chatHistory = await Message.find({ room }).sort({ timestamp: 1 });
        res.status(200).json(chatHistory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting chat history' });
    }
});

module.exports = router;
