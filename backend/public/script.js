document.getElementById('retry-button').addEventListener('click', () => {
    alert('Retrying server connection...');
    // Here you can add functionality to ping the server or reload the status
    window.location.reload(); // Example: Reload the page
});
