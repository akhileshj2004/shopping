/**
 * Applies appropriate backgrounds to each page type
 */
function applyBackgrounds() {
    const path = window.location.pathname;
    
    // Check if we're on the home page
    if (path.endsWith('index.html') || path.endsWith('/') || path === '') {
        // Home page gets the tech animation background
        document.body.classList.add('home');
        createTechAnimation();
    } else {
        // Other pages get static gradient backgrounds
        document.body.classList.add('static-bg', 'tech-gradient');
    }
}

/**
 * Creates the animated tech background elements for the home page
 */
function createTechAnimation() {
    // Tech symbols to display
    const techSymbols = [
        '{ }', '[ ]', '( )', '<>', '/>', '/*', '*/', '<=', '=>', 
        '++', '--', '&&', '||', '==', '===', '!=', '!==', 
        'function()', 'if()', 'for()', 'async', 'await', 'return',
        'import', 'export', '<div>', '</div>', '<script>', '</script>'
    ];
    
    // Create container
    const techContainer = document.createElement('div');
    techContainer.id = 'tech-background';
    techContainer.style.position = 'fixed';
    techContainer.style.top = '0';
    techContainer.style.left = '0';
    techContainer.style.width = '100%';
    techContainer.style.height = '100%';
    techContainer.style.zIndex = '-1';
    techContainer.style.overflow = 'hidden';
    document.body.appendChild(techContainer);
    
    // Determine number of elements based on screen size
    const screenWidth = window.innerWidth;
    const elementCount = screenWidth < 768 ? 25 : 45;
    
    // Create tech elements
    for (let i = 0; i < elementCount; i++) {
        const element = document.createElement('div');
        element.className = 'tech-element';
        
        // Select a random tech symbol
        element.textContent = techSymbols[Math.floor(Math.random() * techSymbols.length)];
        
        // Make some elements special
        if (i % 8 === 0) {
            element.classList.add('highlight');
        }
        
        // Random positioning
        element.style.left = `${Math.random() * 100}%`;
        element.style.top = `${Math.random() * 100}%`;
        
        // Vary size more dramatically
        const baseSize = Math.random() * 20 + 14;
        element.style.fontSize = `${baseSize}px`;
        
        // Random animation type, duration and delay
        const isHorizontal = Math.random() > 0.5;
        const animation = isHorizontal ? 'floatHorizontal' : 'float';
        const duration = Math.random() * 15 + 15; // Longer animations
        const delay = Math.random() * 10;
        element.style.animation = `${animation} ${duration}s ease-in-out ${delay}s infinite`;
        
        techContainer.appendChild(element);
    }
}

// Apply backgrounds on page load
document.addEventListener('DOMContentLoaded', applyBackgrounds);