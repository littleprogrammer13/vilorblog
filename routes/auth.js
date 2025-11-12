const express = require('express');
const fs = require('fs');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();
const USERS_FILE = './data/users.json';

// Helper to read/write users
function readUsers() {
    return JSON.parse(fs.readFileSync(USERS_FILE));
}

function writeUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Signup
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const users = readUsers();

    if (users.find(u => u.username === username)) {
        return res.status(400).send('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: uuidv4(), username, password: hashedPassword, role: 'user' };
    users.push(newUser);
    writeUsers(users);
    res.send('Signup successful');
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const users = readUsers();
    const user = users.find(u => u.username === username);

    if (!user) return res.status(400).send('User not found');

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).send('Incorrect password');

    req.session.user = { id: user.id, username: user.username, role: user.role };
    res.send('Login successful');
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.send('Logged out');
});

module.exports = router;
