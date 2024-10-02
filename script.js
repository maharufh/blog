// Function to get blogs from local storage
function getBlogs() {
    const blogs = localStorage.getItem('blogs');
    return blogs ? JSON.parse(blogs) : [];
}

// Function to save blogs to local storage
function saveBlogs(blogs) {
    localStorage.setItem('blogs', JSON.stringify(blogs));
}

// Function to display blogs on the UI
function displayBlogs() {
    const blogContainer = document.getElementById('blogContainer');
    blogContainer.innerHTML = ''; // Clear previous blogs

    const blogs = getBlogs();
    
    blogs.forEach(blog => {
        const blogPost = document.createElement('div');
        blogPost.classList.add('blog-post');

        blogPost.innerHTML = `
            <h3>${blog.name}</h3>
            <p class="date">Published on: ${blog.date} at ${blog.time}</p>
            <p>${blog.description}</p>
        `;

        blogContainer.appendChild(blogPost);
    });
}

// Handle form submission
document.getElementById('blogForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission
    
    const blogName = document.getElementById('blogName').value;
    const blogDescription = document.getElementById('blogDescription').value;
    const blogDate = new Date().toLocaleDateString(); // Get system date
    const blogTime = new Date().toLocaleTimeString(); // Get system date

    // Create a new blog object
    const newBlog = {
        name: blogName,
        description: blogDescription,
        date: blogDate,
        time: blogTime
    };

    // Fetch existing blogs, add new blog, and save to local storage
    const blogs = getBlogs();
    blogs.push(newBlog);
    saveBlogs(blogs);

    // Clear form fields
    document.getElementById('blogForm').reset();

    // Update UI with the new blog
    displayBlogs();
});

// Display blogs when the page loads
document.addEventListener('DOMContentLoaded', displayBlogs);
