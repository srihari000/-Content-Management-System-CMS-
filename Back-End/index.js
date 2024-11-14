const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Post = require('./models/post');
const Page = require('./models/page');
require('dotenv').config();
const images = require('./plugin/example-images');
const sequelize = require('./config/database');
const loadPlugins = require('./plugin/load-plugin');

const PORT = process.env.PORT || 7000;
const app = express();
app.use(bodyParser.json());
app.use(cors())

app.contentBlocks = {};
// Function to register new content blocks
app.registerContentBlock = function (type, renderFunction) {
    app.contentBlocks[type] = renderFunction;
};

// Load plugins at startup
loadPlugins(app);

// Example route for rendering content
app.get('/render', (req, res) => {
    const contentType = req.query.type;
    const data = { images: images };

    if (app.contentBlocks[contentType]) {
        res.send(app.contentBlocks[contentType](data));
    } else {
        res.status(404).send('Content type not found');
    }
});

// Create a new post
app.post('/posts', async (req, res) => {
    try {
        const { title, slug, content } = req.body;
        if (!title || !slug || !content) {
            return res.status(400).json({ error: 'Title, slug, and content are required' });
        }
        const post = await Post.create({ title, slug, content });
        res.status(201).json(post);  // Created status
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all posts
app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.status(200).json(posts);  // OK status
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get a post by ID
app.get('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.status(200).json(post);  // OK status
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update a post by ID
app.put('/posts/:id', async (req, res) => {
    try {
        const { title, slug, content } = req.body;
        if (!title || !slug || !content) {
            return res.status(400).json({ error: 'Title, slug, and content are required' });
        }
        const [updated] = await Post.update({ title, slug, content }, { where: { id: req.params.id } });
        if (updated === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }
        const updatedPost = await Post.findByPk(req.params.id);
        res.status(200).json(updatedPost);  // OK status
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a post by ID
app.delete('/posts/:id', async (req, res) => {
    try {
        const deleted = await Post.destroy({ where: { id: req.params.id } });
        if (deleted === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.sendStatus(204);  // No Content status
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Similar CRUD routes for Pages

// Create a new page
app.post('/pages', async (req, res) => {
    try {
        const { title, slug, content } = req.body;
        if (!title || !slug || !content) {
            return res.status(400).json({ error: 'Title, slug, and content are required' });
        }
        const page = await Page.create({ title, slug, content });
        res.status(201).json(page);  // Created status
    } catch (error) {
        console.error('Error creating page:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all pages
app.get('/pages', async (req, res) => {
    try {
        const pages = await Page.findAll();
        res.status(200).json(pages);  // OK status
    } catch (error) {
        console.error('Error fetching pages:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get a page by ID
app.get('/pages/:id', async (req, res) => {
    try {
        const page = await Page.findByPk(req.params.id);
        if (!page) {
            return res.status(404).json({ error: 'Page not found' });
        }
        res.status(200).json(page);  // OK status
    } catch (error) {
        console.error('Error fetching page:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update a page by ID
app.put('/pages/:id', async (req, res) => {
    try {
        const { title, slug, content } = req.body;
        if (!title || !slug || !content) {
            return res.status(400).json({ error: 'Title, slug, and content are required' });
        }
        const [updated] = await Page.update({ title, slug, content }, { where: { id: req.params.id } });
        if (updated === 0) {
            return res.status(404).json({ error: 'Page not found' });
        }
        const updatedPage = await Page.findByPk(req.params.id);
        res.status(200).json(updatedPage);  // OK status
    } catch (error) {
        console.error('Error updating page:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a page by ID
app.delete('/pages/:id', async (req, res) => {
    try {
        const deleted = await Page.destroy({ where: { id: req.params.id } });
        if (deleted === 0) {
            return res.status(404).json({ error: 'Page not found' });
        }
        res.sendStatus(204);  // No Content status
    } catch (error) {
        console.error('Error deleting page:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

(async function() {
    try {
        // Sync database
        await sequelize.sync();
        console.log("Database synced!");

        // Start server
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("Failed to start application:", error);
        process.exit(1);
    }
})();
