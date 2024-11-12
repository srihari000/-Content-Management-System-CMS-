// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Post = require('./models/post');
const Page = require('./models/page');

const app = express();
app.use(bodyParser.json());
app.use(cors())

// Generate a slug from title
function generateSlug(title) {
    return title.toLowerCase().replace(/ /g, '-');
}

// CRUD routes for Posts
app.post('/posts', async (req, res) => {
    const { title, content } = req.body;
    console.log('POsts::', title, content)
    const slug = generateSlug(title);
    const post = await Post.create({ title, slug, content });
    res.json(post);
});

app.get('/posts', async (req, res) => {
    const posts = await Post.findAll();
    res.json(posts);
});

app.get('/posts/:id', async (req, res) => {
    const post = await Post.findByPk(req.params.id);
    res.json(post);
});

app.put('/posts/:id', async (req, res) => {
    const { title, content } = req.body;
    const slug = generateSlug(title);
    const post = await Post.update({ title, slug, content }, { where: { id: req.params.id } });
    res.json(post);
});

app.delete('/posts/:id', async (req, res) => {
    await Post.destroy({ where: { id: req.params.id } });
    res.sendStatus(204);
});

// Similar CRUD routes for Pages (reusing structure from Posts)
app.post('/pages', async (req, res) => {
    const { title, content } = req.body;
    const slug = generateSlug(title);
    const page = await Page.create({ title, slug, content });
    res.json(page);
});

app.get('/pages', async (req, res) => {
    const pages = await Page.findAll();
    res.json(pages);
});

app.get('/pages/:id', async (req, res) => {
    const page = await Page.findByPk(req.params.id);
    res.json(page);
});

app.put('/pages/:id', async (req, res) => {
    const { title, content } = req.body;
    const slug = generateSlug(title);
    const page = await Page.update({ title, slug, content }, { where: { id: req.params.id } });
    res.json(page);
});

app.delete('/pages/:id', async (req, res) => {
    await Page.destroy({ where: { id: req.params.id } });
    res.sendStatus(204);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
