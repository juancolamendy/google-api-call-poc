document.getElementById('loginButton').addEventListener('click', function() {
    window.location.href = 'http://localhost:8000/login';
});

function handleLoginResponse(loggedIn) {
    if (loggedIn) {
        document.getElementById('loginButton').style.display = 'none';
        document.getElementById('fetchReviewsButton').style.display = 'block';
    }
}

// Mocking a response from the backend, replace this with an actual check
// For example, you can make an AJAX request to your backend to check if the user is logged in
handleLoginResponse(false);  // Assuming user is not logged in initially
