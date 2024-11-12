document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('post-form');
    const previewBtn = document.getElementById('preview-btn');
    const previewModal = document.getElementById('preview-modal');
    const closePreview = document.getElementById('close-preview');
    const postsList = document.getElementById('posts-list');

    // Load all posts when the page loads
    loadPosts();

    // Event Listener: Save Post (Create or Update)
    postForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        // Check if we are creating a new post or updating an existing one
        const postId = postForm.dataset.postId;
        if (postId) {
            // Update Post
            await updatePost(postId, { title, content });
            delete postForm.dataset.postId; // Clear the dataset after updating
        } else {
            // Create New Post
            await createPost({ title, content });
        }
        await loadPosts(); // Refresh the posts list
        postForm.reset(); // Clear form
    });

    // Event Listener: Preview Mode
    previewBtn.addEventListener('click', () => {
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        document.getElementById('preview-title').textContent = title;
        document.getElementById('preview-content').innerHTML = content;

        // Show the preview modal
        previewModal.style.display = 'flex';
    });

    // Event Listener: Close Preview Modal
    closePreview.addEventListener('click', () => {
        previewModal.style.display = 'none';
    });

    // Load Posts (Read)
    async function loadPosts() {
        // postsList.innerHTML = '<h2>Published Posts</h2>';
        postsList.classList.add('posts-list');
        const response = await fetch('http://localhost:3000/posts');
        const posts = await response.json();

        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');

            // Create post title and content
            postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            `;
            // Create the edit button
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('edit-btn');
            editButton.addEventListener('click', () => editPost(post.id)); // Use event listener for the edit action

            // Create the delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-btn');
            deleteButton.addEventListener('click', () => deletePost(post.id)); // Use event listener for the delete action

            // Append buttons to post element
            postElement.appendChild(editButton);
            postElement.appendChild(deleteButton);
            postsList.appendChild(postElement);
        });
    }

    // Create Post
    async function createPost(post) {
        await fetch('http://localhost:3000/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(post),
        });
    }

    // Update Post
    async function updatePost(id, post) {
        await fetch(`http://localhost:3000/posts/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(post),
        });
    }

    // Delete Post
    async function deletePost(id) {
        await fetch(`http://localhost:3000/posts/${id}`, { method: 'DELETE' });
        await loadPosts(); // Refresh the posts list after deletion
    }

    // Edit Post (Prefill form for editing)
    async function editPost(id) {
        const response = await fetch(`http://localhost:3000/posts/${id}`);
        const post = await response.json();
        document.getElementById('title').value = post.title;
        document.getElementById('content').value = post.content;
        postForm.dataset.postId = id; // Store post ID for updating
    };
});
