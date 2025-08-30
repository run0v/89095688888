document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const body = document.body;

    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            body.classList.toggle('menu-open');

            // Toggle aria-expanded attribute for accessibility
            const isExpanded = body.classList.contains('menu-open');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }
});