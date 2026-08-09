class Auth {
    static register(user) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.find(u => u.email === user.email)) {
            alert('Email already exists!');
            return false;
        }
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(user));
        return true;
    }

    static login(email, password) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        let user = users.find(u => u.email === email && u.password === password);
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            return true;
        }
        alert('Invalid email or password!');
        return false;
    }

    static logout() {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    }

    static getCurrentUser() {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    static checkAuth() {
        if (!this.getCurrentUser()) {
            window.location.href = 'login.html';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const user = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                state: document.getElementById('state').value,
                district: document.getElementById('district').value,
                password: document.getElementById('password').value
            };
            if (Auth.register(user)) {
                window.location.href = 'dashboard.html';
            }
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            if (Auth.login(email, password)) {
                window.location.href = 'dashboard.html';
            }
        });
    }

    // Populate user profile info in navbar if exists
    const userProfileEl = document.querySelector('.user-profile span');
    if (userProfileEl) {
        const currentUser = Auth.getCurrentUser();
        if (currentUser) {
            userProfileEl.textContent = `Welcome, ${currentUser.name}`;
        }
    }
});
