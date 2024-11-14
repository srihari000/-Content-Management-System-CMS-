const postForm = document.getElementById('post-form');
const previewBtn = document.getElementById('preview-btn');
const previewModal = document.getElementById('preview-modal');
const closePreview = document.getElementById('close-preview');
const postsList = document.getElementById('posts-list');
const slugField = document.getElementById('slug');
const titleField = document.getElementById('title');
const clearBtn = document.getElementById('clear-btn');
const API_URL = 'http://localhost:7000';

// Load all posts when the page loads
loadPosts();

const quill = new Quill('#editor', {
    theme: 'snow'
});
// Event Listener: Save Post (Create or Update)
postForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = titleField.value;
    const slug = slugField.value;
    const content = quill.root.innerHTML;

    // Check if we are creating a new post or updating an existing one
    const postId = postForm.dataset.postId;
    if (postId) {
        // Update Post
        await updatePost(postId, { title, slug, content });
        delete postForm.dataset.postId; // Clear the dataset after updating
    } else {
        // Create New Post
        await createPost({ title, slug, content });
    }
    await loadPosts(); // Refresh the posts list
    postForm.reset(); // Clear form
});

// Event Listener: Preview Mode
previewBtn.addEventListener('click', () => {
    const title = titleField.value;
    const content = quill.root.innerHTML;
    document.getElementById('preview-title').textContent = title;
    document.getElementById('preview-content').innerHTML = content;

    // Show the preview modal
    previewModal.style.display = 'flex';
});

// Event Listener: Clear Button
clearBtn.addEventListener('click', () => {
    postForm.reset();
    quill.root.innerHTML = ''
    postForm.dataset.postId = '';
});

// Event Listener: Close Preview Modal
closePreview.addEventListener('click', () => {
    previewModal.style.display = 'none';
});

// Load Posts (Read)
async function loadPosts() {
    postsList.classList.add('posts-list');
    const response = await fetch(`${API_URL}/posts`);
    const posts = await response.json();

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        // Create post title and content
        postElement.innerHTML = `
            <h3><span style="font-weight: bold;">Title: </span> ${post.title}</h3>
            <p><span style="font-weight: bold;">Slug: </span>${post.slug}</p>
            <p><span style="font-weight: bold;">Content: </span> ${post.content}</p>
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
    await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
    });
}

// Update Post
async function updatePost(id, post) {
    await fetch(`${API_URL}/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
    });
}

// Delete Post
async function deletePost(id) {
    await fetch(`${API_URL}/posts/${id}`, { method: 'DELETE' });
    await loadPosts(); // Refresh the posts list after deletion
}

// Edit Post (Prefill form for editing)
async function editPost(id) {
    const response = await fetch(`${API_URL}/posts/${id}`);
    const post = await response.json();
    titleField.value = post.title;
    quill.root.innerHTML = post.content;
    slugField.value = post.slug;
    postForm.dataset.postId = id;
};

// Generate the slug based on title
titleField.addEventListener('input', () => {
    const title = titleField.value;
    const slug = title.trim().toLowerCase().replace(/[^a-z]+/g, '');
    slugField.value = slug;
});