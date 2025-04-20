// Authentication and Navigation Helper
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userRole = localStorage.getItem('userRole');
    
    if (!isLoggedIn || !userRole) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

function handleNavigation(event, targetPage) {
    event.preventDefault();
    
    if (!checkAuth()) {
        return;
    }
    
    // Add loading state
    document.body.classList.add('page-transition');
    
    // Navigate to the target page
    window.location.href = targetPage;
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    window.location.href = 'login.html';
}

// Add event listeners for navigation
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication on page load
    if (window.location.pathname !== '/login.html') {
        checkAuth();
    }
    
    // Add navigation handlers to all links
    document.querySelectorAll('a[href]').forEach(link => {
        if (link.getAttribute('href') !== 'login.html') {
            link.addEventListener('click', (e) => {
                handleNavigation(e, link.getAttribute('href'));
            });
        }
    });
    
    // Add logout handler
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    }
}); 