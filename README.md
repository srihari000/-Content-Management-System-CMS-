# Content-Management-System(CMS) Project

This project provides a Content Management System (CMS) with a rich user interface for managing posts and pages. The CMS includes functionality for creating, editing, updating, and previewing content. Additionally, it has support for dynamic templates and plugins that can render content based on specific routes.

## Project Structure

- **Back-End**: Handles API requests for managing posts, pages, and rendering dynamic templates.
- **Front-End**: Provides the user interface to interact with the CMS.
- **Plugins**: Includes template rendering functionality (e.g., `image_slider`, `custom_forms`).

## Features

- **CRUD Operations**: Create, read, update, and delete posts and pages.
- **Image Slider Template**: Renders an image slider when requested via a specific URL.
- **Custom Form Template**: Dynamically renders a custom form for input fields.
- **Preview and Edit**: Allows users to preview and edit content before saving.


## Demo Images
- ## Main UI view:
![Main UI](https://res.cloudinary.com/dobrptw0g/image/upload/v1731549972/Screenshot_2024-11-14_073123_lu7pe5.png)
- ## Preview view:
![Preview view](https://res.cloudinary.com/dobrptw0g/image/upload/v1731550130/Screenshot_2024-11-14_073827_t6xff8.png)
- ## Mobile View:
![Mobile View](https://res.cloudinary.com/dobrptw0g/image/upload/v1731549972/Screenshot_2024-11-14_073358_jpkazv.png)
- ## Image Slider Plugin:
![Image slider Slugin](https://res.cloudinary.com/dobrptw0g/image/upload/v1731516913/Screenshot_2024-11-13_222247_xrw59s.png)
- ## Custom Form Plugin: 
![Custom Form Plugin](https://res.cloudinary.com/dobrptw0g/image/upload/v1731516913/Screenshot_2024-11-13_222358_eupidv.png)



## Installation 
```bash
 git clone https://github.com/srihari000/-Content-Management-System-CMS-.git
```

## Frontend

The frontend consists of an HTML file (`index.html`) with embedded JavaScript and CSS for styling. It interacts with the backend API to manage posts and pages.

### Steps to run Frontend:
1. Navigate to the frontend directory:
    ```bash
    cd Front-End
    ```
2. Open the `index.html` file in your browser:
    - This file will serve as the interface for interacting with the CMS. It includes functionalities for creating and editing posts and pages, displaying image sliders, and rendering custom forms.


## Backend

The backend is built using Node.js and Express. It interacts with a SQLite database using Sequelize to store content, such as posts and pages, and handle CRUD operations.

### Steps to run Backend:
1. Navigate to the backend directory:
    ```bash
    cd Back-End
    ```
2. Install the required dependencies:
    ```bash
    npm install
    ```
3. Start the backend server:
    ```bash
    node index.js
    ```
   - This will start the server at `http://localhost:7000`.

### Backend Features:
- **CRUD Operations for Posts and Pages**:
  - **POST** `/posts`: Create a new post.
  - **GET** `/posts`: Fetch all posts.
  - **GET** `/posts/:id`: Fetch a single post by ID.
  - **PUT** `/posts/:id`: Update a post by ID.
  - **DELETE** `/posts/:id`: Delete a post by ID.
  - Same CRUD operations are available for pages.

- **Plugins Rendering**:
  - The backend provides dynamic rendering for different content blocks, including the `image_slider` and `custom_form`.
  
  Example API calls to render the plugins:
  - **Image Slider**: `http://localhost:7000/render?type=image_slider`
  - **Custom Form**: `http://localhost:7000/render?type=custom_form`

## Database

The backend uses **SQLite** as the database, with **Sequelize ORM** for interacting with the database. Sequelize helps in defining models and interacting with the database using an object-relational mapping (ORM) approach.

### Models

1. **Posts Model**:
   - The `Post` model stores information about **blog posts** and contains the following fields:
     - `title`: A string that represents the title of the post.
     - `slug`: A unique identifier for the post (usually a URL-friendly version of the title).
     - `content`: The main content of the post, which is stored as text.

   Example structure for the `Post` model:
   ```js
   const Post = sequelize.define('Post', {
       title: {
           type: DataTypes.STRING,
           allowNull: false
       },
       slug: {
           type: DataTypes.STRING,
           allowNull: false
       },
       content: {
           type: DataTypes.TEXT,
           allowNull: false
       }
   });

  