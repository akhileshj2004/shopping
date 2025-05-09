// Profile management functionality

document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the profile page
    if (window.location.pathname.includes('profile.html')) {
        // Load the user's profile
        loadUserProfile();
        
        // Set up profile page specific event listeners
        setupProfilePageEvents();
    }
});

function setupProfilePageEvents() {
    // Edit profile button
    const editProfileBtn = document.getElementById('edit-profile-btn');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function() {
            document.getElementById('view-profile').classList.add('hidden');
            document.getElementById('edit-profile').classList.remove('hidden');
            
            // Pre-fill form with current values
            const user = getCurrentUser();
            if (user) {
                document.getElementById('edit-fullname').value = user.name || '';
                document.getElementById('edit-username').value = user.username || '';
                document.getElementById('edit-email').value = user.email || '';
            }
        });
    }
    
    // Cancel edit button
    const cancelEditBtn = document.getElementById('cancel-edit-btn');
    if (cancelEditBtn) {
        cancelEditBtn.addEventListener('click', function() {
            document.getElementById('edit-profile').classList.add('hidden');
            document.getElementById('view-profile').classList.remove('hidden');
        });
    }
    
    // Save profile form
    const saveProfileForm = document.getElementById('profile-form');
    if (saveProfileForm) {
        saveProfileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            updateUserProfile();
        });
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            logoutUser();
        });
    }
}

function loadUserProfile() {
    // Get current user from localStorage
    const user = getCurrentUser();
    
    if (!user) {
        // If not logged in, show not logged in message
        document.getElementById('view-profile').classList.add('hidden');
        document.getElementById('edit-profile').classList.add('hidden');
        document.getElementById('not-logged-in').classList.remove('hidden');
        return;
    }
    
    // Update profile display
    document.getElementById('profile-name').textContent = user.name || '';
    document.getElementById('profile-username').textContent = '@' + (user.username || '');
    document.getElementById('profile-email').textContent = user.email || '';
    
    // Show profile view
    document.getElementById('not-logged-in').classList.add('hidden');
    document.getElementById('edit-profile').classList.add('hidden');
    document.getElementById('view-profile').classList.remove('hidden');
    
    // Load user lists
    loadUserLists();
}

function loadUserLists() {
    // In a real app, this would fetch the user's lists from the server
    // For now, we'll use mock data
    const mockLists = [
        { id: 'list1', name: 'Weekly Groceries', items: 12, shared: true },
        { id: 'list2', name: 'Hardware Store', items: 5, shared: false },
        { id: 'list3', name: 'Birthday Party', items: 8, shared: true }
    ];
    
    const listsContainer = document.getElementById('user-lists');
    let html = '';
    
    if (mockLists.length > 0) {
        mockLists.forEach(list => {
            const sharedIcon = list.shared ? 
                '<span class="shared-badge"><i class="fas fa-user-friends"></i></span>' : '';
            
            html += `
                <div class="list-card">
                    <h3>${list.name} ${sharedIcon}</h3>
                    <p><i class="fas fa-shopping-basket"></i> ${list.items} items</p>
                    <div class="list-actions">
                        <button class="button small" onclick="viewList('${list.id}')">
                            <i class="fas fa-eye"></i> View
                        </button>
                        <button class="button small secondary" onclick="editList('${list.id}')">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                    </div>
                </div>
            `;
        });
    } else {
        html = '<p>You haven\'t created any lists yet.</p>';
    }
    
    if (listsContainer) {
        listsContainer.innerHTML = html;
    }
}

function updateUserProfile() {
    // Get current user
    const user = getCurrentUser();
    
    if (!user) {
        return;
    }
    
    // Get form values
    const name = document.getElementById('edit-fullname').value;
    const username = document.getElementById('edit-username').value;
    const email = document.getElementById('edit-email').value;
    
    // Update user object
    user.name = name;
    user.username = username;
    user.email = email;
    
    // Save updated user
    localStorage.setItem('shopSyncUser', JSON.stringify(user));
    
    // Show success message
    alert('Profile updated successfully!');
    
    // Switch back to view mode
    document.getElementById('edit-profile').classList.add('hidden');
    document.getElementById('view-profile').classList.remove('hidden');
    
    // Reload profile to display updated info
    loadUserProfile();
}

function getCurrentUser() {
    const userJSON = localStorage.getItem('shopSyncUser');
    return userJSON ? JSON.parse(userJSON) : null;
}

function logoutUser() {
    localStorage.removeItem('shopSyncUser');
    localStorage.removeItem('shopSyncLoggedIn');
    window.location.href = '../index.html';
}

// Mock functions for list interactions
function viewList(listId) {
    window.location.href = `lists.html?list=${listId}`;
}

function editList(listId) {
    window.location.href = `lists.html?list=${listId}&edit=true`;
}