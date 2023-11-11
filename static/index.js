document.getElementById('loginButton').addEventListener('click', function() {
    // Make an AJAX request to your backend
    fetch('http://localhost:8000/check-login-status')
        .then(response => response.json())
        .then(data => {
            if (data.loggedIn) {
                // If logged in, hide login button and show fetchReviewsButton
                handleLoginResponse(true);
            } else {
                // If not logged in, redirect to login page
                window.location.href = 'http://localhost:8000/login';
            }
        })
        .catch(error => console.error('Error:', error));
});

function handleLoginResponse(loggedIn) {
    if (loggedIn) {
        document.getElementById('loginButton').style.display = 'none';
        document.getElementById('fetchReviewsButton').style.display = 'block';
    }
}

// Check login status on page load
document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:8000/check-login-status')
        .then(response => response.json())
        .then(data => handleLoginResponse(data.loggedIn))
        .catch(error => console.error('Error:', error));
});
