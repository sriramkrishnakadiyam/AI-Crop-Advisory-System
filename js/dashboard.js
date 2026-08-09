document.addEventListener('DOMContentLoaded', () => {
    // Check if on dashboard page
    const navTitle = document.querySelector('.nav-title');
    if (navTitle && navTitle.textContent.includes('Dashboard')) {
        // Mock dynamic data update for dashboard
        try {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser) {
                const userProfileEl = document.querySelector('.user-profile span');
                if (userProfileEl) {
                    userProfileEl.textContent = `Welcome, ${currentUser.name}`;
                }
            }
        } catch(e) {}
    }
});
