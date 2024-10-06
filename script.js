document.querySelector('.cta').addEventListener('click', function() {
    alert('Welcome! Let’s get started on your journey.');
});

// Assuming you have added classes to your buttons appropriately
document.querySelectorAll('.cta').forEach(function(button) {
    button.addEventListener('click', function(event) {
        if (this.textContent === 'Get Involved') {
            // No action needed, as it redirects to collaboration.html
        } else {
            alert('Welcome! Let’s get started on your journey.');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');

    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);
            
            try {
                const response = await fetch('http://localhost:3000/api/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();
                if (response.ok) {
                    alert(result.message);
                    localStorage.setItem('token', result.token);
                    window.location.href = 'index.html';
                } else {
                    alert(result.message);
                }
            } catch (error) {
                alert('An error occurred. Please try again.');
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);

            try {
                const response = await fetch('http://localhost:3000/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();
                if (response.ok) {
                    localStorage.setItem('token', result.token);
                    window.location.href = 'index.html';
                } else {
                    alert(result.message);
                }
            } catch (error) {
                alert('An error occurred. Please try again.');
            }
        });
    }
});

