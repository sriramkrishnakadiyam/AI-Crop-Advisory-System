document.addEventListener('DOMContentLoaded', () => {
    Auth.checkAuth();

    const currentUser = Auth.getCurrentUser();
    if (currentUser) {
        document.getElementById('profileName').textContent = currentUser.name;
        document.getElementById('profileEmail').textContent = currentUser.email;
        document.getElementById('profileState').textContent = currentUser.state;
        document.getElementById('profileDistrict').textContent = currentUser.district;
    }

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            Auth.logout();
        });
    }
});
