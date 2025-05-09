/**
 * ShopSync Cart Management
 * Handles cart operations like adding, removing, and updating items
 */

// Initialize cart from localStorage or create empty cart
let cart = JSON.parse(localStorage.getItem('shopSyncCart')) || [];
let cartCount = document.getElementById('cart-count');

// Update cart count on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    
    // Set up cart icon click event
    const cartIcon = document.getElementById('cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', function() {
            openCartModal();
        });
    }
});

/**
 * Add an item to the cart
 * @param {string} productId - The ID of the product to add
 * @param {number} quantity - Optional quantity (defaults to 1)
 */
function addToCart(productId, quantity = 1) {
    // Check if item is already in cart
    const existingItemIndex = cart.findIndex(item => item.id === productId);
    
    if (existingItemIndex > -1) {
        // Update quantity if item exists
        cart[existingItemIndex].quantity += quantity;
    } else {
        // Add new item to cart
        cart.push({
            id: productId,
            quantity: quantity,
            addedAt: new Date().toISOString()
        });
    }
    
    // Save cart to localStorage
    saveCart();
    
    // Update cart count display
    updateCartCount();
    
    // Show success notification
    showToast('Item added to cart!');
}

/**
 * Remove an item from the cart
 * @param {string} productId - The ID of the product to remove
 */
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    
    // Update cart UI if cart modal is open
    if (document.querySelector('.cart-modal.active')) {
        renderCartItems();
    }
}

/**
 * Update quantity of an item in the cart
 * @param {string} productId - The ID of the product
 * @param {number} newQuantity - The new quantity
 */
function updateQuantity(productId, newQuantity) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex > -1) {
        if (newQuantity < 1) {
            removeFromCart(productId);
            return;
        }
        
        cart[itemIndex].quantity = newQuantity;
        saveCart();
        updateCartCount();
        
        // Update cart UI if cart modal is open
        if (document.querySelector('.cart-modal.active')) {
            renderCartItems();
        }
    }
}

/**
 * Save cart to localStorage
 */
function saveCart() {
    localStorage.setItem('shopSyncCart', JSON.stringify(cart));
}

/**
 * Update the cart count display
 */
function updateCartCount() {
    if (!cartCount) {
        cartCount = document.getElementById('cart-count');
        if (!cartCount) return;
    }
    
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;
    
    // Make the count element visible/hidden based on count
    if (count > 0) {
        cartCount.style.display = 'flex';
    } else {
        cartCount.style.display = 'none';
    }
}

/**
 * Show a toast notification
 * @param {string} message - Message to display
 */
function showToast(message) {
    let toast = document.getElementById('toast');
    
    // Create toast element if it doesn't exist
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
    const messageElement = document.getElementById('toast-message');
    if (messageElement) {
        messageElement.textContent = message;
    }
    
    toast.classList.add('active');
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
}

/**
 * Open the cart modal
 */
function openCartModal() {
    // Check if modal exists, create if not
    let cartModal = document.querySelector('.cart-modal');
    if (!cartModal) {
        cartModal = document.createElement('div');
        cartModal.className = 'cart-modal modal';
        
        cartModal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>Your Cart</h2>
                <div id="cart-items"></div>
                <div class="cart-summary">
                    <div class="cart-total">
                        <span>Total:</span>
                        <span id="cart-total-amount">$0.00</span>
                    </div>
                    <button class="button" id="checkout-btn">Checkout</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(cartModal);
        
        // Set up event listeners
        cartModal.querySelector('.close-modal').addEventListener('click', function() {
            cartModal.classList.remove('active');
        });
        
        document.getElementById('checkout-btn').addEventListener('click', function() {
            performCheckout();
        });
    }
    
    // Show modal and render cart items
    cartModal.classList.add('active');
    renderCartItems();
}

/**
 * Render cart items in the cart modal
 */
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <a href="pages/shop.html" class="button">Continue Shopping</a>
            </div>
        `;
        document.getElementById('cart-total-amount').textContent = '$0.00';
        return;
    }
    
    // In a real app, this would fetch product details from API using IDs
    // For demo, we'll use mock data
    const mockProducts = {
        'p1': { name: 'Organic Bananas', price: 2.99, image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=80&h=80' },
        'p2': { name: 'Premium Coffee Beans', price: 12.99, image: 'https://images.unsplash.com/photo-1559525823-cbb56bd9d458?auto=format&fit=crop&w=80&h=80' },
        'p3': { name: 'Dish Soap', price: 3.49, image: 'https://images.unsplash.com/photo-1622017211648-487b4a6bffe6?auto=format&fit=crop&w=80&h=80' },
        'p4': { name: 'Wireless Earbuds', price: 49.99, image: 'https://images.unsplash.com/photo-1590658268037-7e2493e5c8cc?auto=format&fit=crop&w=80&h=80' },
        'p5': { name: 'Cotton T-Shirt', price: 15.99, image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&w=80&h=80' },
        'p6': { name: 'Smart Watch', price: 89.99, image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=80&h=80' }
    };
    
    let html = '';
    let total = 0;
    
    cart.forEach(item => {
        const product = mockProducts[item.id] || { name: 'Product', price: 0, image: '' };
        const itemTotal = product.price * item.quantity;
        total += itemTotal;
        
        html += `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${product.image}" alt="${product.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'80\\' height=\\'80\\' viewBox=\\'0 0 80 80\\'%3E%3Crect width=\\'80\\' height=\\'80\\' fill=\\'%23e9ecef\\'/%3E%3Ctext x=\\'50%25\\' y=\\'50%25\\' dominant-baseline=\\'middle\\' text-anchor=\\'middle\\' font-family=\\'sans-serif\\' font-size=\\'30\\' fill=\\'%236c757d\\'%3E${product.name[0]}%3C/text%3E%3C/svg%3E'">
                </div>
                <div class="cart-item-details">
                    <h3>${product.name}</h3>
                    <div class="cart-item-price">$${product.price.toFixed(2)}</div>
                </div>
                <div class="cart-item-actions">
                    <div class="quantity-control">
                        <button class="quantity-btn" data-action="decrease" data-product="${item.id}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" data-action="increase" data-product="${item.id}">+</button>
                    </div>
                    <button class="remove-item" data-product="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <div class="cart-item-total">$${itemTotal.toFixed(2)}</div>
            </div>
        `;
    });
    
    cartItemsContainer.innerHTML = html;
    document.getElementById('cart-total-amount').textContent = `$${total.toFixed(2)}`;
    
    // Add event listeners for quantity and remove buttons
    document.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.getAttribute('data-product');
            const action = this.getAttribute('data-action');
            const itemIndex = cart.findIndex(item => item.id === productId);
            
            if (itemIndex > -1) {
                let newQuantity = cart[itemIndex].quantity;
                
                if (action === 'increase') {
                    newQuantity++;
                } else if (action === 'decrease') {
                    newQuantity--;
                }
                
                updateQuantity(productId, newQuantity);
            }
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.getAttribute('data-product');
            removeFromCart(productId);
        });
    });
}

/**
 * Perform checkout process
 */
function performCheckout() {
    // In a real app, this would redirect to checkout page or process
    alert('Checkout functionality would be implemented here in a real app!');
    
    // For demo, we'll just clear the cart
    cart = [];
    saveCart();
    updateCartCount();
    
    // Close modal
    document.querySelector('.cart-modal').classList.remove('active');
    
    showToast('Thank you for your order!');
}