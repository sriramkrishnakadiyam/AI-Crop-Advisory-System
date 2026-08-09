// Common JS functionality for the UI
document.addEventListener('DOMContentLoaded', () => {
    // Mobile sidebar toggle
    const createSidebarToggle = () => {
        const toggleBtn = document.createElement('button');
        toggleBtn.innerHTML = '&#9776;';
        toggleBtn.style.cssText = `
            background: none;
            border: none;
            font-size: 1.5rem;
            color: var(--text-main);
            cursor: pointer;
            margin-right: 15px;
            display: none;
        `;
        
        // Append it only on mobile screens
        if (window.innerWidth <= 768) {
            toggleBtn.style.display = 'block';
        }
        
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.prepend(toggleBtn);
        }
        
        toggleBtn.addEventListener('click', () => {
            const sidebar = document.querySelector('.sidebar');
            if (sidebar.style.display === 'none' || !sidebar.style.display) {
                sidebar.style.display = 'flex';
                sidebar.style.position = 'absolute';
                sidebar.style.zIndex = '1000';
                sidebar.style.width = '100%';
            } else {
                sidebar.style.display = 'none';
            }
        });
    };

    createSidebarToggle();
});
