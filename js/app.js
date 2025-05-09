// Core application functionality used across all pages

document.addEventListener('DOMContentLoaded', function() {
    // Show welcome popup on first visit (only on home page)
    if (window.location.pathname === '/index.html' || window.location.pathname === '/') {
        showWelcomePopup();
    }
    
    // Set up event listeners for elements that exist on all pages
    setupCommonEventListeners();
    
    // Setup sliding navbar functionality
    setupSlidingNavbar();
    
    // Add shopping-themed decorative elements
    createShoppingElements();
    
    // Check auth status and update UI accordingly
    checkAuthStatus();
});

// Show welcome popup (only on first visit)
function showWelcomePopup() {
    // Check if this is the first visit
    if (!localStorage.getItem('shopSyncVisited')) {
        const welcomePopup = document.getElementById('welcome-popup');
        if (welcomePopup) {
            welcomePopup.classList.add('active');
            
            // Set flag in localStorage
            localStorage.setItem('shopSyncVisited', 'true');
        }
    }
}

// Set up common event listeners used across multiple pages
function setupCommonEventListeners() {
    // Close popup/modal buttons
    document.querySelectorAll('.close-popup, .close-modal').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.popup, .modal').classList.remove('active');
        });
    });
    
    // Get started button (home page only)
    const getStartedBtn = document.getElementById('get-started-btn');
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', function() {
            document.getElementById('welcome-popup').classList.remove('active');
            document.getElementById('auth-modal').classList.add('active');
        });
    }
    
    // Login button (appears on all pages)
    const loginButton = document.getElementById('login-button');
    if (loginButton) {
        loginButton.addEventListener('click', function() {
            if (this.textContent === 'Sign In') {
                document.getElementById('auth-modal').classList.add('active');
            } else {
                // Show user dropdown menu when logged in
                showUserMenu();
            }
        });
    }
    
    // Auth tabs (within auth modal)
    const authTabs = document.querySelectorAll('.auth-tabs .tab');
    authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and forms
            document.querySelectorAll('.auth-tabs .tab, .auth-form').forEach(el => {
                el.classList.remove('active');
            });
            
            // Add active class to clicked tab and corresponding form
            this.classList.add('active');
            const formId = this.getAttribute('data-tab') + '-form';
            document.getElementById(formId).classList.add('active');
        });
    });
    
    // Auth forms submission
    document.querySelectorAll('#login-form form, #signup-form form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Demo login/signup (in a real app, this would send data to a server)
            handleAuth();
        });
    });
    
    // Create a list button in hero section (home page)
    const createListBtn = document.getElementById('create-first-list');
    if (createListBtn) {
        createListBtn.addEventListener('click', function() {
            // If user is not logged in, show auth modal
            if (!isAuthenticated()) {
                document.getElementById('auth-modal').classList.add('active');
            } else {
                // Redirect to lists page with create new list action
                window.location.href = 'pages/lists.html?create=new';
            }
        });
    }
    
    // Home signup button (in CTA section)
    const homeSignupBtn = document.getElementById('home-signup-btn');
    if (homeSignupBtn) {
        homeSignupBtn.addEventListener('click', function() {
            document.getElementById('auth-modal').classList.add('active');
            // Switch to signup tab
            document.querySelector('.tab[data-tab="signup"]').click();
        });
    }
}

// Setup sliding navbar functionality
function setupSlidingNavbar() {
    const navbarToggle = document.getElementById('navbar-toggle');
    const sideNavbar = document.getElementById('side-navbar');
    const navbarOverlay = document.getElementById('navbar-overlay');
    const mainContent = document.getElementById('main-content');
    
    if (navbarToggle && sideNavbar && navbarOverlay) {
        // Toggle navbar on button click
        navbarToggle.addEventListener('click', function() {
            sideNavbar.classList.toggle('active');
            navbarOverlay.classList.toggle('active');
            
            // On larger screens, also toggle the main content margin
            if (window.innerWidth > 768) {
                if (mainContent) {
                    mainContent.classList.toggle('navbar-active');
                }
            }
        });
        
        // Close navbar when clicking on overlay
        navbarOverlay.addEventListener('click', function() {
            sideNavbar.classList.remove('active');
            navbarOverlay.classList.remove('active');
            if (mainContent) {
                mainContent.classList.remove('navbar-active');
            }
        });
        
        // Close navbar when clicking on a link (mobile view)
        const navLinks = sideNavbar.querySelectorAll('a');
        if (window.innerWidth <= 768) {
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    sideNavbar.classList.remove('active');
                    navbarOverlay.classList.remove('active');
                });
            });
        }
        
        // Handle window resize events
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                // On larger screens, allow content shifting
                if (sideNavbar.classList.contains('active') && mainContent) {
                    mainContent.classList.add('navbar-active');
                }
            } else {
                // On mobile screens, no content shifting
                if (mainContent) {
                    mainContent.classList.remove('navbar-active');
                }
                
                // Re-add click event to links if they don't have it
                navLinks.forEach(link => {
                    const existingClickEvent = link.getAttribute('data-click-listener');
                    if (!existingClickEvent) {
                        link.setAttribute('data-click-listener', 'true');
                        link.addEventListener('click', function() {
                            sideNavbar.classList.remove('active');
                            navbarOverlay.classList.remove('active');
                        });
                    }
                });
            }
        });
    }
}

// Create shopping-themed decorative elements - fixed animation function
function createShoppingElements() {
    // Shopping icons to display
    const shoppingIcons = [
        '🛒', '🛍️', '🏷️', '💳', '💰', '🧾', '📦',
        '🥕', '🍎', '🍞', '🥛', '🧀', '🥦',
        '$', '€', '£', '%', '⭐'
    ];
    
    // Only add animation elements to home page
    const isHomePage = window.location.pathname.endsWith('index.html') || 
                       window.location.pathname.endsWith('/') || 
                       window.location.pathname === '';
    
    if (isHomePage) {
        // Create container for floating shopping elements
        const elementsContainer = document.createElement('div');
        elementsContainer.id = 'shopping-elements-container';
        document.body.appendChild(elementsContainer);
        
        // Determine number of elements based on screen size
        const screenWidth = window.innerWidth;
        const elementCount = screenWidth < 768 ? 15 : 30;
        
        // Create floating elements
        for (let i = 0; i < elementCount; i++) {
            // Create element
            const element = document.createElement('div');
            element.className = 'shopping-element';
            
            // Select a random shopping icon
            element.textContent = shoppingIcons[Math.floor(Math.random() * shoppingIcons.length)];
            
            // Random position
            element.style.position = 'fixed';
            element.style.left = `${Math.random() * 100}%`;
            element.style.top = `${Math.random() * 100}%`;
            
            // Random size
            const size = Math.random() * 1.5 + 0.8;
            element.style.fontSize = `${size}rem`;
            
            // Random opacity
            element.style.opacity = (Math.random() * 0.1 + 0.05).toString();
            
            // Random animation
            const animationDuration = Math.random() * 15 + 10;
            const animationDelay = Math.random() * 5;
            element.style.animation = `float ${animationDuration}s ease-in-out ${animationDelay}s infinite`;
            
            // Add to container
            elementsContainer.appendChild(element);
        }
    } else {
        // For other pages, add a simple gradient background
        document.body.classList.add('static-bg');
    }
}

// Check authentication status
function checkAuthStatus() {
    // In a real app, this would verify with a backend
    // For this demo, we'll check localStorage
    const isLoggedIn = localStorage.getItem('shopSyncLoggedIn');
    const loginButton = document.getElementById('login-button');
    const cartIcon = document.getElementById('cart-icon');
    
    if (isLoggedIn === 'true') {
        if (loginButton) {
            loginButton.textContent = 'My Account';
        }
        
        // Show cart icon for logged in users
        if (cartIcon) {
            cartIcon.style.display = 'block';
        }
        
        // Update elements that should only be visible when logged in
        document.querySelectorAll('.logged-in-only').forEach(el => {
            el.classList.remove('hidden');
        });
        
        document.querySelectorAll('.logged-out-only').forEach(el => {
            el.classList.add('hidden');
        });
    } else {
        // Hide cart icon for logged out users
        if (cartIcon) {
            cartIcon.style.display = 'none';
        }
        
        // Update elements that should be hidden when logged out
        document.querySelectorAll('.logged-in-only').forEach(el => {
            el.classList.add('hidden');
        });
        
        document.querySelectorAll('.logged-out-only').forEach(el => {
            el.classList.remove('hidden');
        });
    }
}

// Handle authentication
function handleAuth() {
    // For demo purposes, we'll just set localStorage and update UI
    localStorage.setItem('shopSyncLoggedIn', 'true');
    
    // Set a mock user
    const mockUser = {
        id: 'user123',
        name: 'Demo User',
        email: 'demo@example.com',
        username: 'demouser'
    };
    
    localStorage.setItem('shopSyncUser', JSON.stringify(mockUser));
    
    // Hide auth modal
    document.getElementById('auth-modal').classList.remove('active');
    
    // Update UI for logged-in state
    const loginButton = document.getElementById('login-button');
    if (loginButton) {
        loginButton.textContent = 'My Account';
    }
    
    // Update elements that should only be visible when logged in
    document.querySelectorAll('.logged-in-only').forEach(el => {
        el.classList.remove('hidden');
    });
    
    document.querySelectorAll('.logged-out-only').forEach(el => {
        el.classList.add('hidden');
    });
    
    // Show cart icon
    const cartIcon = document.getElementById('cart-icon');
    if (cartIcon) {
        cartIcon.style.display = 'block';
    }
    
    // If on home page, redirect to shop page or lists page
    if (window.location.pathname === '/index.html' || window.location.pathname === '/') {
        window.location.href = 'pages/shop.html';
    } else {
        // If already on an internal page, refresh to show logged-in content
        window.location.reload();
    }
}

// Check if user is authenticated
function isAuthenticated() {
    return localStorage.getItem('shopSyncLoggedIn') === 'true';
}

// Show user dropdown menu
function showUserMenu() {
    // Check if menu already exists
    let userMenu = document.getElementById('user-menu');
    
    if (userMenu) {
        // Toggle visibility
        userMenu.classList.toggle('active');
        return;
    }
    
    // Create user menu
    userMenu = document.createElement('div');
    userMenu.id = 'user-menu';
    userMenu.className = 'user-menu';
    
    // Get user data
    const userData = JSON.parse(localStorage.getItem('shopSyncUser') || '{}');
    
    // Create menu content
    userMenu.innerHTML = `
        <div class="user-menu-header">
            <div class="user-avatar">
                <i class="fas fa-user-circle"></i>
            </div>
            <div class="user-info">
                <p class="user-name">${userData.name || 'User'}</p>
                <p class="user-email">${userData.email || ''}</p>
            </div>
        </div>
        <div class="user-menu-items">
            <a href="${window.location.pathname.includes('/pages/') ? '' : 'pages/'}profile.html">
                <i class="fas fa-user"></i> Profile
            </a>
            <a href="${window.location.pathname.includes('/pages/') ? '' : 'pages/'}settings.html">
                <i class="fas fa-cog"></i> Settings
            </a>
            <a href="#" id="logout-link">
                <i class="fas fa-sign-out-alt"></i> Logout
            </a>
        </div>
    `;
    
    // Style the menu
    userMenu.style.position = 'absolute';
    userMenu.style.top = '60px';
    userMenu.style.right = '20px';
    userMenu.style.width = '220px';
    userMenu.style.background = 'white';
    userMenu.style.borderRadius = '8px';
    userMenu.style.boxShadow = '0 5px 20px rgba(0,0,0,0.15)';
    userMenu.style.zIndex = '200';
    userMenu.style.overflow = 'hidden';
    
    // Style inner elements
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .user-menu-header {
            padding: 15px;
            background: #ff6b6b;
            color: white;
            display: flex;
            gap: 10px;
            align-items: center;
        }
        
        .user-avatar i {
            font-size: 2.5rem;
        }
        
        .user-name {
            font-weight: bold;
            margin-bottom: 3px;
        }
        
        .user-email {
            font-size: 0.8rem;
            opacity: 0.9;
        }
        
        .user-menu-items {
            padding: 10px 0;
        }
        
        .user-menu-items a {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 12px 15px;
            color: #333;
            text-decoration: none;
            transition: background 0.3s;
        }
        
        .user-menu-items a:hover {
            background: #f1f1f1;
        }
        
        .user-menu-items i {
            font-size: 1.1rem;
            width: 20px;
            text-align: center;
        }
        
        .user-menu.active {
            display: block;
        }
    `;
    document.head.appendChild(styleSheet);
    
    // Add to document
    document.body.appendChild(userMenu);
    
    // Add logout functionality
    document.getElementById('logout-link').addEventListener('click', function(e) {
        e.preventDefault();
        logout();
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!userMenu.contains(e.target) && e.target.id !== 'login-button') {
            userMenu.classList.remove('active');
        }
    });
    
    // Show menu
    userMenu.classList.add('active');
}

// Logout function
function logout() {
    // Clear user data
    localStorage.removeItem('shopSyncLoggedIn');
    localStorage.removeItem('shopSyncUser');
    
    // Redirect to home page
    window.location.href = window.location.pathname.includes('/pages/') ? '../index.html' : 'index.html';
}