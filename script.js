const toggleButton = document.getElementById('theme-toggle');
const body = document.body;

// Create an icon span inside the button if it doesn't exist
let icon = toggleButton.querySelector('.icon');
if (!icon) {
    icon = document.createElement('span');
    icon.classList.add('icon');
    icon.textContent = '☀️'; // Default sun icon
    icon.style.display = 'inline-block';
    icon.style.transition = 'transform 0.4s ease';
    toggleButton.prepend(icon);
}

toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark');

    if(body.classList.contains('dark')) {
        // Dark mode
        icon.textContent = '🌙';
        toggleButton.style.backgroundColor = '#f5f5f5';
        toggleButton.style.color = '#121212';
        icon.style.transform = 'translateX(5px)';
    } else {
        // Light mode
        icon.textContent = '☀️';
        toggleButton.style.backgroundColor = '#121212';
        toggleButton.style.color = '#f5f5f5';
        icon.style.transform = 'translateX(-5px)';
    }

    // Reset icon position after animation
    setTimeout(() => {
        icon.style.transform = 'translateX(0)';
    }, 200);
});
