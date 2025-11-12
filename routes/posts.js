const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();
const POSTS_FILE = './data/posts.json';

function readPosts() {
    return JSON.parse(fs.readFileSync(POSTS_FILE));
}

function writePosts(posts) {
    fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));
}

// Middleware to check admin
function isAdmin(req, res, next) {
    if (req.session.user && req.session.user.role === 'admin') return next();
    res.status(403).send('Forbidden');
}

// Get all posts
router.get('/', (req, res) => {
    const posts = readPosts();
    res.json(posts);
});

// Create post (admin only)
router.post('/create', isAdmin, (req, res) => {
    const { title, content } = req.body;
    const posts = readPosts();
    const newPost = { id: uuidv4(), title, content, date: new Date() };
    posts.push(newPost);
    writePosts(posts);
    res.send('Post created');
});

// Edit post (admin only)
router.put('/edit/:id', isAdmin, (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const posts = readPosts();
    const post = posts.find(p => p.id === id);
    if (!post) return res.status(404).send('Post not found');

    post.title = title;
    post.content = content;
    writePosts(posts);
    res.send('Post updated');
});

// Delete post (admin only)
router.delete('/delete/:id', isAdmin, (req, res) => {
    const { id } = req.params;
    let posts = readPosts();
    posts = posts.filter(p => p.id !== id);
    writePosts(posts);
    res.send('Post deleted');
});

module.exports = router;
