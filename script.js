const toggleButton = document.getElementById('theme-toggle');
const body = document.body;

toggleButton.addEventListener('click', () => {
    // Toggle dark mode
    body.classList.toggle('dark');

    // Change button color to match theme
    if(body.classList.contains('dark')) {
        toggleButton.style.backgroundColor = '#f5f5f5';
        toggleButton.style.color = '#121212';
    } else {
        toggleButton.style.backgroundColor = '#121212';
        toggleButton.style.color = '#f5f5f5';
    }
});
