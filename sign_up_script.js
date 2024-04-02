document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("signupForm").addEventListener("submit", function(e) {
        e.preventDefault(); // Prevent the default form submission

        const formData = {
            username: document.getElementById("username").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            confirmPassword: document.getElementById("confirm-password").value,
        };

        // Simple client-side validation for example purposes
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        // Here you would send formData to your server via fetch() or XMLHttpRequest
        // Example using fetch:
        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Handle success response
        })
        .catch((error) => {
            console.error('Error:', error);
            // Handle errors here
        });
    });
});
