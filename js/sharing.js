// Sharing functionality for shopping lists

document.addEventListener('DOMContentLoaded', function() {
    // Set up share modal functionality if it exists
    setupShareModal();
});

function setupShareModal() {
    const shareModal = document.getElementById('share-modal');
    if (!shareModal) return;
    
    // Close button
    const closeBtn = shareModal.querySelector('.close-modal');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            shareModal.classList.remove('active');
        });
    }
    
    // Copy link button
    const copyBtn = document.getElementById('copy-link-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const linkInput = document.getElementById('share-link-input');
            if (linkInput) {
                linkInput.select();
                document.execCommand('copy');
                
                // Show feedback
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                setTimeout(() => {
                    this.textContent = originalText;
                }, 2000);
            }
        });
    }
}

// Share a list via modal
function shareList(listId, listName) {
    const shareModal = document.getElementById('share-modal');
    if (!shareModal) return;
    
    const linkInput = document.getElementById('share-link-input');
    const modalTitle = shareModal.querySelector('h3');
    
    // Set modal title and generate share link
    if (listName) {
        modalTitle.textContent = `Share "${listName}"`;
    }
    
    // Generate a shareable link (in a real app, this would be a proper URL)
    const shareUrl = generateShareLink(listId);
    if (linkInput) {
        linkInput.value = shareUrl;
    }
    
    // Set up social sharing URLs
    setupSocialSharing(shareUrl, listName);
    
    // Show the modal
    shareModal.classList.add('active');
}

// Generate a share link for a list
function generateShareLink(listId) {
    // In a real app, this would create a proper URL with domain
    return `https://shopsync.app/shared-list/${listId}`;
}

// Set up social sharing links
function setupSocialSharing(url, listName) {
    const shareText = listName ? 
        `Check out my ShopSync list "${listName}": ` : 
        'Check out my ShopSync list: ';
    
    // WhatsApp
    const whatsappBtn = document.querySelector('.social-btn.whatsapp');
    if (whatsappBtn) {
        whatsappBtn.onclick = function() {
            const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + url)}`;
            window.open(whatsappUrl, '_blank');
        };
    }
    
    // Email
    const emailBtn = document.querySelector('.social-btn.email');
    if (emailBtn) {
        emailBtn.onclick = function() {
            const subject = listName ? `ShopSync List: ${listName}` : 'ShopSync Shopping List';
            const emailUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(shareText + url)}`;
            window.open(emailUrl, '_blank');
        };
    }
    
    // Facebook
    const facebookBtn = document.querySelector('.social-btn.facebook');
    if (facebookBtn) {
        facebookBtn.onclick = function() {
            const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            window.open(fbUrl, '_blank');
        };
    }
    
    // Twitter
    const twitterBtn = document.querySelector('.social-btn.twitter');
    if (twitterBtn) {
        twitterBtn.onclick = function() {
            const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`;
            window.open(twitterUrl, '_blank');
        };
    }
}

// Accept a shared list invitation
function acceptSharedList(inviteCode) {
    // In a real app, this would make an API call to accept the invitation
    console.log(`Accepting shared list with invite code: ${inviteCode}`);
    alert('You have been added to the shared list!');
}