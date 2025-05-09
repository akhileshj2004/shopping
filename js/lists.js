// Lists page specific functionality

document.addEventListener('DOMContentLoaded', function() {
    // Set up lists page specific event listeners
    setupListsPageEvents();
    
    // Check URL parameters (e.g., if redirected to create new list)
    checkUrlParams();
    
    // Load user's lists
    loadUserLists();
});

// Set up events specific to the lists page
function setupListsPageEvents() {
    // Create new list button
    const createListBtn = document.getElementById('create-list');
    if (createListBtn) {
        createListBtn.addEventListener('click', function() {
            document.getElementById('list-form-container').classList.remove('hidden');
        });
    }
    
    // Cancel list creation
    const cancelListBtn = document.getElementById('cancel-list');
    if (cancelListBtn) {
        cancelListBtn.addEventListener('click', function() {
            document.getElementById('list-form-container').classList.add('hidden');
        });
    }
    
    // Add item to list
    const addItemBtn = document.getElementById('add-item');
    if (addItemBtn) {
        addItemBtn.addEventListener('click', addItemToList);
    }
    
    // Submit list form
    const listForm = document.getElementById('list-form');
    if (listForm) {
        listForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveList();
        });
    }
}

// Check URL parameters
function checkUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('create') === 'new') {
        // Open the create list form if redirected with create=new parameter
        document.getElementById('list-form-container').classList.remove('hidden');
    }
}

// Load user lists from storage or API
function loadUserLists() {
    // In a real app, this would fetch from a backend API
    // For demo purposes, we'll use localStorage or predefined lists
    
    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem('shopSyncLoggedIn');
    
    if (isLoggedIn !== 'true') {
        // If not logged in, show a message prompting to sign in
        const container = document.querySelector('.list-container');
        container.innerHTML = `
            <div class="not-logged-in-message">
                <i class="fas fa-lock"></i>
                <h3>Sign in to view your lists</h3>
                <p>Please sign in or create an account to create and manage your shopping lists.</p>
                <button class="button" id="lists-login-btn">Sign In</button>
            </div>
        `;
        
        document.getElementById('lists-login-btn').addEventListener('click', function() {
            document.getElementById('auth-modal').classList.add('active');
        });
        
        return;
    }
    
    // Add some demo lists
    createListCard('Grocery Shopping', [
        { text: 'Milk', checked: true },
        { text: 'Eggs', checked: false },
        { text: 'Bread', checked: false },
        { text: 'Apples', checked: true }
    ]);
    
    createListCard('Home Supplies', [
        { text: 'Paper towels', checked: false },
        { text: 'Dish soap', checked: true },
        { text: 'Laundry detergent', checked: false }
    ]);
}

// Add item to shopping list
function addItemToList() {
    const newItemInput = document.getElementById('new-item');
    const itemText = newItemInput.value.trim();
    
    if (itemText) {
        const listItems = document.getElementById('list-items');
        const li = document.createElement('li');
        li.className = 'list-item';
        li.innerHTML = `
            <input type="checkbox">
            <span>${itemText}</span>
            <button type="button" class="delete-item">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Attach delete handler
        li.querySelector('.delete-item').addEventListener('click', function() {
            li.remove();
        });
        
        listItems.appendChild(li);
        newItemInput.value = '';
    }
}

// Save shopping list
function saveList() {
    const listName = document.getElementById('list-name').value.trim();
    
    if (listName) {
        // Get all items
        const items = [];
        document.querySelectorAll('#list-items li').forEach(li => {
            const text = li.querySelector('span').textContent;
            const checked = li.querySelector('input[type="checkbox"]').checked;
            items.push({ text, checked });
        });
        
        // Create a new list card
        createListCard(listName, items);
        
        // Save to localStorage or backend (in a real app)
        saveListToStorage(listName, items);
        
        // Reset and hide form
        document.getElementById('list-form').reset();
        document.getElementById('list-items').innerHTML = '';
        document.getElementById('list-form-container').classList.add('hidden');
    }
}

// Create a list card in the UI
function createListCard(name, items = []) {
    const listContainer = document.querySelector('.list-container');
    const listId = 'list-' + Date.now();
    
    const card = document.createElement('div');
    card.className = 'list-card';
    card.setAttribute('data-id', listId);
    
    let itemsHTML = '';
    items.forEach(item => {
        const checkedClass = item.checked ? 'checked' : '';
        itemsHTML += `
            <li class="list-item ${checkedClass}">
                <input type="checkbox" ${item.checked ? 'checked' : ''}>
                <span>${item.text}</span>
            </li>
        `;
    });
    
    card.innerHTML = `
        <div class="list-actions">
            <button class="edit-list-btn"><i class="fas fa-edit"></i></button>
            <button class="share-list-btn"><i class="fas fa-share-alt"></i></button>
            <button class="delete-list-btn"><i class="fas fa-trash"></i></button>
        </div>
        <h3>${name}</h3>
        <ul class="list-items">
            ${itemsHTML}
        </ul>
    `;
    
    // Attach event handlers
    card.querySelector('.edit-list-btn').addEventListener('click', function() {
        editList(listId);
    });
    
    card.querySelector('.share-list-btn').addEventListener('click', function() {
        shareList(listId);
    });
    
    card.querySelector('.delete-list-btn').addEventListener('click', function() {
        deleteList(listId);
    });
    
    listContainer.appendChild(card);
}

// Edit a list
function editList(listId) {
    console.log(`Editing list: ${listId}`);
    // In a real app, this would populate the form with list data for editing
    document.getElementById('list-form-container').classList.remove('hidden');
}

// Share a list
function shareList(listId) {
    const shareModal = document.getElementById('share-modal');
    const linkInput = document.getElementById('share-link-input');
    
    // Generate a shareable link (demo)
    linkInput.value = `https://shopsync.app/shared-list/${listId}`;
    
    shareModal.classList.add('active');
    
    // Set up copy button functionality
    const copyBtn = document.getElementById('copy-link-btn');
    if (copyBtn) {
        copyBtn.onclick = function() {
            linkInput.select();
            document.execCommand('copy');
            
            // Show feedback
            const originalText = this.textContent;
            this.textContent = 'Copied!';
            setTimeout(() => {
                this.textContent = originalText;
            }, 2000);
        };
    }
    
    // Set up social sharing buttons
    setupSocialSharing(linkInput.value);
}

// Set up social sharing buttons
function setupSocialSharing(shareUrl) {
    const shareModal = document.getElementById('share-modal');
    const shareText = 'Check out my ShopSync list: ';
    
    const whatsappBtn = shareModal.querySelector('.social-btn.whatsapp');
    if (whatsappBtn) {
        whatsappBtn.onclick = function() {
            window.open(`https://wa.me/?text=${encodeURIComponent(shareText + shareUrl)}`, '_blank');
        };
    }
    
    const emailBtn = shareModal.querySelector('.social-btn.email');
    if (emailBtn) {
        emailBtn.onclick = function() {
            window.open(`mailto:?subject=ShopSync Shopping List&body=${encodeURIComponent(shareText + shareUrl)}`, '_blank');
        };
    }
    
    const facebookBtn = shareModal.querySelector('.social-btn.facebook');
    if (facebookBtn) {
        facebookBtn.onclick = function() {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
        };
    }
    
    const twitterBtn = shareModal.querySelector('.social-btn.twitter');
    if (twitterBtn) {
        twitterBtn.onclick = function() {
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText + shareUrl)}`, '_blank');
        };
    }
}

// Delete a list
function deleteList(listId) {
    if (confirm('Are you sure you want to delete this list?')) {
        document.querySelector(`.list-card[data-id="${listId}"]`).remove();
        
        // Also remove from localStorage or backend in a real app
        removeListFromStorage(listId);
    }
}

// Save list to storage (mock function)
function saveListToStorage(name, items) {
    // In a real app, this would send to a backend API
    console.log('Saving list:', name, items);
}

// Remove list from storage (mock function)
function removeListFromStorage(listId) {
    // In a real app, this would call a backend API
    console.log('Deleting list:', listId);
}