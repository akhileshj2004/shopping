/**
 * ShopSync Authentication
 * Handles user authentication, login, signup, and session management
 */

// Mock user database (in a real app, this would be server-side)
const mockUsers = [
    {
        id: 'user1',
        name: 'John Doe',
        email: 'john@example.com',
        username: 'johndoe',
        password: 'password123'
    },
    {
        id: 'user2',
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        username: 'sarahj',
        password: 'shopping2023'
    }
];

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    checkAuthStatus();
    
    // Set up form submissions
    setupAuthForms();
});

/**
 * Check if user is logged in and update UI accordingly
 */
function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('shopSyncLoggedIn') === 'true';
    const username = localStorage.getItem('shopSyncUsername');
    
    // Update login button if user is logged in
    const loginButton = document.getElementById('login-button');
    if (loginButton) {
        if (isLoggedIn && username) {
            loginButton.textContent = username;
            loginButton.classList.add('logged-in');
            
            // Change login button to show user menu on click
            loginButton.removeEventListener('click', showLoginModal);
            loginButton.addEventListener('click', showUserMenu);
        } else {
            loginButton.textContent = 'Sign In';
            loginButton.classList.remove('logged-in');
            
            // Set up login button to show auth modal
            loginButton.removeEventListener('click', showUserMenu);
            loginButton.addEventListener('click', showLoginModal);
        }
    }
}

/**
 * Set up authentication form submissions
 */
function setupAuthForms() {
    // Login form submission
    const loginForm = document.querySelector('#login-form form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            // In a real app, this would validate with an API
            // For demo, we'll just check if the fields are filled
            if (email && password) {
                // Mock successful login
                localStorage.setItem('shopSyncLoggedIn', 'true');
                localStorage.setItem('shopSyncUsername', email.split('@')[0]);
                
                // Hide modal
                document.getElementById('auth-modal').classList.remove('active');
                
                // Update UI
                checkAuthStatus();
                
                // Show success message
                showToast('Successfully signed in!');
            } else {
                alert('Please fill in all fields');
            }
        });
    }
    
    // Signup form submission
    const signupForm = document.querySelector('#signup-form form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const username = document.getElementById('signup-username').value;
            const password = document.getElementById('signup-password').value;
            
            // In a real app, this would validate and submit to an API
            // For demo, we'll just check if the fields are filled
            if (name && email && username && password) {
                // Mock successful signup
                localStorage.setItem('shopSyncLoggedIn', 'true');
                localStorage.setItem('shopSyncUsername', username);
                
                // Hide modal
                document.getElementById('auth-modal').classList.remove('active');
                
                // Update UI
                checkAuthStatus();
                
                // Show success message
                showToast('Account created successfully!');
            } else {
                alert('Please fill in all required fields');
            }
        });
    }
}

/**
 * Show login modal
 */
function showLoginModal() {
    const authModal = document.getElementById('auth-modal');
    if (authModal) {
        authModal.classList.add('active');
        
        // Set active tab to login
        document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
        document.querySelector('.tab[data-tab="login"]').classList.add('active');
        
        // Show login form
        document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
        document.getElementById('login-form').classList.add('active');
    }
}

/**
 * Show user menu dropdown
 */
function showUserMenu() {
    // Check if menu already exists
    let userMenu = document.getElementById('user-menu');
    
    if (userMenu) {
        // Toggle menu visibility
        userMenu.classList.toggle('active');
        return;
    }
    
    // Create user menu
    userMenu = document.createElement('div');
    userMenu.id = 'user-menu';
    userMenu.className = 'user-menu active';
    
    userMenu.innerHTML = `
        <ul>
            <li><a href="pages/profile.html"><i class="fas fa-user-circle"></i> Profile</a></li>
            <li><a href="pages/lists.html"><i class="fas fa-list"></i> My Lists</a></li>
            <li><a href="pages/settings.html"><i class="fas fa-cog"></i> Settings</a></li>
            <li class="divider"></li>
            <li><a href="#" id="logout-button"><i class="fas fa-sign-out-alt"></i> Sign Out</a></li>
        </ul>
    `;
    
    // Fix paths for subpages
    if (!window.location.href.includes('index.html') && !window.location.href.endsWith('/')) {
        userMenu.innerHTML = userMenu.innerHTML.replace(/pages\//g, '');
    }
    
    // Add to page
    document.querySelector('.auth-buttons').appendChild(userMenu);
    
    // Handle logout
    document.getElementById('logout-button').addEventListener('click', function(e) {
        e.preventDefault();
        logout();
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.id !== 'user-menu' && !e.target.closest('#user-menu') && e.target.id !== 'login-button') {
            if (userMenu.classList.contains('active')) {
                userMenu.classList.remove('active');
            }
        }
    });
}

/**
 * Logout user
 */
function logout() {
    localStorage.removeItem('shopSyncLoggedIn');
    localStorage.removeItem('shopSyncUsername');
    
    // Remove user menu
    const userMenu = document.getElementById('user-menu');
    if (userMenu) {
        userMenu.remove();
    }
    
    // Update UI
    checkAuthStatus();
    
    // Show message
    showToast('Successfully signed out');
}

/**
 * Show a toast notification
 * @param {string} message - Message to display
 */
function showToast(message) {
    // Get existing toast or create new one
    let toast = document.getElementById('toast');
    
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast';
        
        const icon = document.createElement('i');
        icon.className = 'fas fa-check-circle';
        
        const messageSpan = document.createElement('span');
        messageSpan.id = 'toast-message';
        
        toast.appendChild(icon);
        toast.appendChild(messageSpan);
        document.body.appendChild(toast);
    }
    
    // Set message and show toast
    document.getElementById('toast-message').textContent = message;
    toast.classList.add('active');
    
    // Hide after 3 seconds
    setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
}