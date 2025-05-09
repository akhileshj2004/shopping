// Search functionality for finding users

// Mock user database for search
const searchableUsers = [
    {
        id: 'user1',
        username: 'johndoe',
        name: 'John Doe',
        avatar: null,
        sharedLists: [
            { id: 'list1', name: 'Weekly Groceries', itemCount: 12 },
            { id: 'list2', name: 'Office Supplies', itemCount: 5 }
        ]
    },
    {
        id: 'user2', 
        username: 'sarahj',
        name: 'Sarah Johnson',
        avatar: null,
        sharedLists: [
            { id: 'list3', name: 'Party Supplies', itemCount: 8 },
            { id: 'list4', name: 'Camping Trip', itemCount: 15 }
        ]
    },
    {
        id: 'user3',
        username: 'miket',
        name: 'Mike Thompson',
        avatar: null,
        sharedLists: [
            { id: 'list5', name: 'Hardware Store', itemCount: 7 }
        ]
    },
    {
        id: 'user4',
        username: 'emilyw',
        name: 'Emily Wilson',
        avatar: null,
        sharedLists: [
            { id: 'list6', name: 'Baby Essentials', itemCount: 20 },
            { id: 'list7', name: 'Kitchen Supplies', itemCount: 9 }
        ]
    }
];

document.addEventListener('DOMContentLoaded', function() {
    // Set up search page specific handlers
    setupSearchPageHandlers();
});

function setupSearchPageHandlers() {
    const searchBtn = document.getElementById('search-btn');
    const userSearchInput = document.getElementById('user-search');
    const backToSearchBtn = document.getElementById('back-to-search');
    
    if (searchBtn && userSearchInput) {
        // Search button click
        searchBtn.addEventListener('click', function() {
            performSearch(userSearchInput.value);
        });
        
        // Search on Enter key
        userSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(userSearchInput.value);
            }
        });
    }
    
    if (backToSearchBtn) {
        backToSearchBtn.addEventListener('click', function() {
            // Hide profile view
            document.getElementById('profile-view').classList.add('hidden');
            // Show search results
            document.getElementById('search-results').parentElement.classList.remove('hidden');
        });
    }
}

// Perform search based on query
function performSearch(query) {
    query = query.trim().toLowerCase();
    const searchResults = document.getElementById('search-results');
    const searchInfo = document.querySelector('.search-results-info');
    
    if (!query) {
        searchResults.innerHTML = '';
        searchInfo.innerHTML = '<p>Enter a username or email to find other ShopSync users.</p>';
        return;
    }
    
    // Filter users by query
    const results = searchableUsers.filter(user => 
        user.username.toLowerCase().includes(query) || 
        user.name.toLowerCase().includes(query)
    );
    
    // Update search results info
    if (results.length === 0) {
        searchInfo.innerHTML = '<p>No users found matching "' + query + '"</p>';
        searchResults.innerHTML = '';
    } else {
        searchInfo.innerHTML = '<p>Found ' + results.length + ' user(s) matching "' + query + '":</p>';
        
        // Create user cards
        let html = '';
        results.forEach(user => {
            html += `
                <div class="user-card" data-user-id="${user.id}">
                    <div class="user-avatar">
                        <i class="fas fa-user-circle"></i>
                    </div>
                    <div>
                        <h3>${user.username}</h3>
                        <p>${user.name}</p>
                    </div>
                </div>
            `;
        });
        
        searchResults.innerHTML = html;
        
        // Add click event to user cards
        document.querySelectorAll('.user-card').forEach(card => {
            card.addEventListener('click', function() {
                const userId = this.getAttribute('data-user-id');
                viewUserProfile(userId);
            });
        });
    }
}

// View user profile
function viewUserProfile(userId) {
    const user = searchableUsers.find(u => u.id === userId);
    
    if (user) {
        // Update profile information
        document.getElementById('profile-username').textContent = user.username;
        document.getElementById('profile-fullname').textContent = user.name;
        
        // Generate lists HTML
        let listsHTML = '';
        if (user.sharedLists.length > 0) {
            user.sharedLists.forEach(list => {
                listsHTML += `
                    <div class="list-card">
                        <h3>${list.name}</h3>
                        <p><i class="fas fa-shopping-basket"></i> ${list.itemCount} items</p>
                        <button class="button small view-list-btn" data-list-id="${list.id}">
                            <i class="fas fa-eye"></i> View List
                        </button>
                    </div>
                `;
            });
        } else {
            listsHTML = '<p>No shared lists available.</p>';
        }
        
        document.getElementById('profile-lists').innerHTML = listsHTML;
        
        // Hide search results
        document.getElementById('search-results').parentElement.classList.add('hidden');
        
        // Show profile view
        document.getElementById('profile-view').classList.remove('hidden');
        
        // Add event listeners to view list buttons
        document.querySelectorAll('.view-list-btn').forEach(button => {
            button.addEventListener('click', function() {
                const listId = this.getAttribute('data-list-id');
                // In a real app, this would navigate to the list view
                alert('Viewing list: ' + listId);
            });
        });
    }
}