// DOM Elements
const body = document.querySelector('body');
const themeToggle = document.querySelector('.theme-toggle');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const contactForm = document.getElementById('contact-form');
const blogPosts = document.getElementById('blog-posts');
const blogSearch = document.getElementById('blog-search');
const dashboardLink = document.getElementById('dashboard-link');
const portfolioPage = document.getElementById('portfolio-page');
const dashboardPage = document.getElementById('dashboard-page');
const loginContainer = document.getElementById('login-container');
const dashboardContent = document.getElementById('dashboard-content');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');
const newPostBtn = document.getElementById('new-post-btn');
const postEditor = document.getElementById('post-editor');
const postsList = document.getElementById('posts-list');
const postForm = document.getElementById('post-form');
const cancelBtn = document.getElementById('cancel-btn');
const dashboardPosts = document.getElementById('dashboard-posts');
const backToPortfolioBtn = document.getElementById('back-to-portfolio');

// Constants
const DASHBOARD_PASSWORD = 'admin123'; // Simple password for demonstration
const LOCAL_STORAGE_POSTS_KEY = 'portfolio_blog_posts';
const LOCAL_STORAGE_THEME_KEY = 'portfolio_theme';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    setupEventListeners();
    loadBlogPosts();
});

// Theme Functionality
function initializeTheme() {
    const savedTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
    if (savedTheme) {
        body.className = savedTheme;
        updateThemeIcon();
    }
}

function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

function toggleTheme() {
    if (body.classList.contains('light-mode')) {
        body.className = 'dark-mode';
    } else {
        body.className = 'light-mode';
    }
    updateThemeIcon();
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, body.className);
}

// Navigation
function toggleMobileMenu() {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Setup Event Listeners
function setupEventListeners() {
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);

    // Mobile navigation
    hamburger.addEventListener('click', toggleMobileMenu);

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        });
    });

    // Contact form validation
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }

    // Blog search
    if (blogSearch) {
        blogSearch.addEventListener('input', filterBlogPosts);
    }

    // Dashboard link
    if (dashboardLink) {
        dashboardLink.addEventListener('click', showDashboard);
    }

    // Back to portfolio
    if (backToPortfolioBtn) {
        backToPortfolioBtn.addEventListener('click', showPortfolio);
    }

    // Dashboard login
    if (loginBtn) {
        loginBtn.addEventListener('click', handleLogin);
    }

    // New post button
    if (newPostBtn) {
        newPostBtn.addEventListener('click', showNewPostForm);
    }

    // Cancel button
    if (cancelBtn) {
        cancelBtn.addEventListener('click', hidePostForm);
    }

    // Post form submit
    if (postForm) {
        postForm.addEventListener('submit', handlePostFormSubmit);
    }
}

// Contact Form
function handleContactFormSubmit(e) {
    e.preventDefault();
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    let isValid = true;
    
    // Validate name
    if (nameInput.value.trim() === '') {
        showError(nameInput, 'Name is required');
        isValid = false;
    } else {
        hideError(nameInput);
    }
    
    // Validate email
    if (emailInput.value.trim() === '') {
        showError(emailInput, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email');
        isValid = false;
    } else {
        hideError(emailInput);
    }
    
    // Validate message
    if (messageInput.value.trim() === '') {
        showError(messageInput, 'Message is required');
        isValid = false;
    } else {
        hideError(messageInput);
    }
    
    // If form is valid, show success message
    if (isValid) {
        contactForm.reset();
        document.getElementById('form-success').classList.remove('hidden');
        
        // Hide success message after 3 seconds
        setTimeout(() => {
            document.getElementById('form-success').classList.add('hidden');
        }, 3000);
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(input, message) {
    const errorElement = document.getElementById(`${input.id}-error`);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    input.classList.add('error');
}

function hideError(input) {
    const errorElement = document.getElementById(`${input.id}-error`);
    errorElement.textContent = '';
    errorElement.style.display = 'none';
    input.classList.remove('error');
}

// Blog Functionality
function loadBlogPosts() {
    const posts = getBlogPosts();
    
    // Render posts on main page
    if (blogPosts) {
        renderBlogPosts(posts);
    }
    
    // Render posts on dashboard
    if (dashboardPosts) {
        renderDashboardPosts(posts);
    }
}

function getBlogPosts() {
    const posts = localStorage.getItem(LOCAL_STORAGE_POSTS_KEY);
    return posts ? JSON.parse(posts) : getSampleBlogPosts();
}

function getSampleBlogPosts() {
    const samplePosts = [
        {
            id: 1,
            title: 'Getting Started with Web Development',
            date: '2025-04-01',
            content: 'Web development is an exciting field that combines creativity with technical skills. In this post, we\'ll explore the basics of HTML, CSS, and JavaScript and how they work together to create beautiful and functional websites.'
        },
        {
            id: 2,
            title: 'The Power of CSS Grid Layout',
            date: '2025-03-15',
            content: 'CSS Grid Layout is a powerful tool that has revolutionized the way we design websites. It provides a two-dimensional layout system that allows for complex layouts that were previously difficult to achieve. In this post, we\'ll explore some of the key features of CSS Grid and how to use them effectively.'
        },
        {
            id: 3,
            title: 'JavaScript ES6 Features You Should Know',
            date: '2025-02-28',
            content: 'ECMAScript 6 (ES6) introduced many new features to JavaScript that make the language more powerful and developer-friendly. In this post, we\'ll look at some of the most important ES6 features including arrow functions, template literals, destructuring, and more.'
        }
    ];
    
    // Save sample posts to localStorage
    saveBlogPosts(samplePosts);
    
    return samplePosts;
}

function saveBlogPosts(posts) {
    localStorage.setItem(LOCAL_STORAGE_POSTS_KEY, JSON.stringify(posts));
}

function renderBlogPosts(posts) {
    blogPosts.innerHTML = '';
    
    if (posts.length === 0) {
        blogPosts.innerHTML = '<p class="no-posts">No blog posts found.</p>';
        return;
    }
    
    posts.forEach(post => {
        const excerpt = post.content.substring(0, 150) + (post.content.length > 150 ? '...' : '');
        
        const postElement = document.createElement('div');
        postElement.className = 'blog-card';
        postElement.innerHTML = `
            <div class="blog-content">
                <p class="blog-date">${formatDate(post.date)}</p>
                <h3 class="blog-title">${post.title}</h3>
                <p class="blog-excerpt">${excerpt}</p>
                <button class="btn btn-small read-more" data-id="${post.id}">Read More</button>
            </div>
        `;
        
        // Add event listener to Read More button
        const readMoreBtn = postElement.querySelector('.read-more');
        readMoreBtn.addEventListener('click', () => showFullPost(post));
        
        blogPosts.appendChild(postElement);
    });
}

function showFullPost(post) {
    // Create a modal to display the full post
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>${post.title}</h2>
            <p class="post-date">${formatDate(post.date)}</p>
            <div class="post-content">
                ${post.content.split('\n').map(paragraph => `<p>${paragraph}</p>`).join('')}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Show modal with animation
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Close modal when clicking the close button
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    });
    
    // Close modal when clicking outside of the content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        }
    });
}

function filterBlogPosts() {
    const searchTerm = blogSearch.value.toLowerCase();
    const posts = getBlogPosts();
    
    const filteredPosts = posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm) || 
        post.content.toLowerCase().includes(searchTerm)
    );
    
    renderBlogPosts(filteredPosts);
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Dashboard Functionality
function showDashboard(e) {
    e.preventDefault();
    portfolioPage.classList.add('hidden');
    dashboardPage.classList.remove('hidden');
    loginContainer.classList.remove('hidden');
    dashboardContent.classList.add('hidden');
}

function showPortfolio(e) {
    e.preventDefault();
    dashboardPage.classList.add('hidden');
    portfolioPage.classList.remove('hidden');
}

function handleLogin() {
    const password = passwordInput.value;
    const passwordError = document.getElementById('password-error');
    
    if (password === DASHBOARD_PASSWORD) {
        loginContainer.classList.add('hidden');
        dashboardContent.classList.remove('hidden');
        passwordInput.value = '';
        passwordError.style.display = 'none';
        loadBlogPosts();
    } else {
        passwordError.textContent = 'Incorrect password. Please try again.';
        passwordError.style.display = 'block';
    }
}

function renderDashboardPosts(posts) {
    dashboardPosts.innerHTML = '';
    
    if (posts.length === 0) {
        dashboardPosts.innerHTML = '<p class="no-posts">No blog posts found. Create your first post!</p>';
        return;
    }
    
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'dashboard-post';
        postElement.innerHTML = `
            <div class="post-title">${post.title}</div>
            <div class="post-date">${formatDate(post.date)}</div>
            <div class="post-actions">
                <button class="btn-icon edit-post" data-id="${post.id}"><i class="fas fa-edit"></i></button>
                <button class="btn-icon delete-post" data-id="${post.id}"><i class="fas fa-trash"></i></button>
            </div>
        `;
        
        // Add event listeners
        const editBtn = postElement.querySelector('.edit-post');
        editBtn.addEventListener('click', () => editPost(post.id));
        
        const deleteBtn = postElement.querySelector('.delete-post');
        deleteBtn.addEventListener('click', () => deletePost(post.id));
        
        dashboardPosts.appendChild(postElement);
    });
}

function showNewPostForm() {
    document.getElementById('editor-title').textContent = 'Create New Post';
    document.getElementById('post-id').value = '';
    document.getElementById('post-title').value = '';
    document.getElementById('post-date').value = new Date().toISOString().split('T')[0];
    document.getElementById('post-content').value = '';
    
    postsList.classList.add('hidden');
    postEditor.classList.remove('hidden');
}

function hidePostForm() {
    postEditor.classList.add('hidden');
    postsList.classList.remove('hidden');
}

function handlePostFormSubmit(e) {
    e.preventDefault();
    
    const postId = document.getElementById('post-id').value;
    const title = document.getElementById('post-title').value;
    const date = document.getElementById('post-date').value;
    const content = document.getElementById('post-content').value;
    
    const posts = getBlogPosts();
    
    if (postId) {
        // Editing existing post
        const index = posts.findIndex(post => post.id == postId);
        if (index !== -1) {
            posts[index] = { id: parseInt(postId), title, date, content };
        }
    } else {
        // Creating new post
        const newId = posts.length > 0 ? Math.max(...posts.map(post => post.id)) + 1 : 1;
        posts.push({ id: newId, title, date, content });
    }
    
    saveBlogPosts(posts);
    hidePostForm();
    loadBlogPosts();
    
    // Show success notification
    showNotification(postId ? 'Post updated successfully!' : 'New post created successfully!');
}

function editPost(postId) {
    const posts = getBlogPosts();
    const post = posts.find(post => post.id === postId);
    
    if (post) {
        document.getElementById('editor-title').textContent = 'Edit Post';
        document.getElementById('post-id').value = post.id;
        document.getElementById('post-title').value = post.title;
        document.getElementById('post-date').value = post.date;
        document.getElementById('post-content').value = post.content;
        
        postsList.classList.add('hidden');
        postEditor.classList.remove('hidden');
    }
}

function deletePost(postId) {
    if (confirm('Are you sure you want to delete this post?')) {
        const posts = getBlogPosts();
        const updatedPosts = posts.filter(post => post.id !== postId);
        saveBlogPosts(updatedPosts);
        loadBlogPosts();
        
        // Show success notification
        showNotification('Post deleted successfully!');
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Show notification with animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add these styles to the existing CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    /* Mobile Navigation */
    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 60px;
            left: 0;
            right: 0;
            background-color: var(--bg);
            flex-direction: column;
            align-items: center;
            padding: 1rem 0;
            clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
            transition: clip-path 0.4s ease;
            z-index: 100;
            box-shadow: var(--shadow);
        }
        
        .nav-links.active {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
        }
        
        .nav-links li {
            margin: 0.8rem 0;
        }
        
        .hamburger {
            display: block;
            margin-left: 1rem;
        }
        
        .hamburger.active .bar:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        
        .hamburger.active .bar:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active .bar:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
    }
    
    /* Modal */
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1100;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
    }
    
    .modal.show {
        opacity: 1;
        visibility: visible;
    }
    
    .modal-content {
        background-color: var(--card);
        border-radius: var(--border-radius);
        padding: var(--spacing-lg);
        width: 90%;
        max-width: 800px;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
        transform: scale(0.9);
        transition: transform 0.3s ease;
    }
    
    .modal.show .modal-content {
        transform: scale(1);
    }
    
    .close-modal {
        position: absolute;
        top: 1rem;
        right: 1rem;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--text-secondary);
        transition: var(--transition);
    }
    
    .close-modal:hover {
        color: var(--primary);
    }
    
    .post-date {
        color: var(--text-secondary);
        font-size: 0.9rem;
        margin-bottom: var(--spacing-md);
    }
    
    .post-content p {
        margin-bottom: var(--spacing-md);
    }
    
    /* Dashboard Styles */
    .login-container {
        max-width: 400px;
        margin: 0 auto;
    }
    
    .login-form {
        background-color: var(--card);
        padding: var(--spacing-lg);
        border-radius: var(--border-radius);
        box-shadow: var(--shadow);
    }
    
    .login-form h3 {
        text-align: center;
        margin-bottom: var(--spacing-md);
    }
    
    .dashboard-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--spacing-lg);
    }
    
    .dashboard-controls {
        display: flex;
        gap: var(--spacing-sm);
    }
    
    .post-editor {
        background-color: var(--card);
        padding: var(--spacing-lg);
        border-radius: var(--border-radius);
        box-shadow: var(--shadow);
        margin-bottom: var(--spacing-lg);
    }
    
    .post-editor h3 {
        margin-bottom: var(--spacing-md);
    }
    
    .form-buttons {
        display: flex;
        justify-content: flex-end;
        gap: var(--spacing-sm);
        margin-top: var(--spacing-md);
    }
    
    .posts-list {
        background-color: var(--card);
        padding: var(--spacing-lg);
        border-radius: var(--border-radius);
        box-shadow: var(--shadow);
    }
    
    .posts-list h3 {
        margin-bottom: var(--spacing-md);
    }
    
    .post-table-header {
        display: grid;
        grid-template-columns: 2fr 1fr 100px;
        gap: var(--spacing-sm);
        padding-bottom: var(--spacing-sm);
        border-bottom: 1px solid var(--border);
        font-weight: 500;
    }
    
    .dashboard-post {
        display: grid;
        grid-template-columns: 2fr 1fr 100px;
        gap: var(--spacing-sm);
        padding: var(--spacing-sm) 0;
        border-bottom: 1px solid var(--border);
        align-items: center;
    }
    
    .post-actions {
        display: flex;
        gap: 0.5rem;
    }
    
    .btn-icon {
        background: none;
        border: none;
        color: var(--text-secondary);
        cursor: pointer;
        font-size: 1rem;
        padding: 0.5rem;
        border-radius: 50%;
        transition: var(--transition);
    }
    
    .btn-icon:hover {
        background-color: var(--bg-secondary);
        color: var(--primary);
    }
    
    .edit-post {
        color: var(--primary);
    }
    
    .delete-post {
        color: #f44336;
    }
    
    .no-posts {
        text-align: center;
        padding: var(--spacing-md) 0;
    }
    
    /* Notification */
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--primary);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow);
        z-index: 1000;
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
    
    .notification.show {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Responsive Styles */
    @media (max-width: 900px) {
        .hero-content {
            flex-direction: column-reverse;
            text-align: center;
        }
        
        .hero-text {
            padding-right: 0;
            margin-top: var(--spacing-lg);
        }
        
        .contact-container {
            grid-template-columns: 1fr;
        }
    }
    
    @media (max-width: 600px) {
        .post-table-header, .dashboard-post {
            grid-template-columns: 1fr 80px;
        }
        
        .post-date-header, .post-date {
            display: none;
        }
    }
`;

document.head.appendChild(styleSheet);