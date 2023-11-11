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
        document.getElementById('accountId').style.display = 'block';
        document.getElementById('locationId').style.display = 'block';
        document.getElementById('reviewsContainer').style.display = 'block';
    }
}

// Check login status on page load
document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:8000/check-login-status')
        .then(response => response.json())
        .then(data => handleLoginResponse(data.loggedIn))
        .catch(error => console.error('Error:', error));
});

document.getElementById('getReviewsButton').addEventListener('click', function() {
    const accountId = document.getElementById('accountId').value;
    const locationId = document.getElementById('locationId').value;

    if (accountId && locationId) {
        fetch(`http://localhost:8000/reviews/${accountId}/${locationId}`)
            .then(response => response.json())
            .then(data => displayReviews(data))
            .catch(error => console.error('Error:', error));
    } else {
        alert('Please enter both Account ID and Location ID');
    }
});

function displayReviews(reviews) {
    const reviewsContainer = document.getElementById('reviewsContainer');
    reviewsContainer.innerHTML = ''; // Clear previous content

    reviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.innerHTML = `<p>Author: ${review.reviewAuthorName}</p>
                                   <p>Rating: ${review.starRating}</p>
                                   <p>Comment: ${review.comment}</p>`;
        reviewsContainer.appendChild(reviewElement);
    });
}
