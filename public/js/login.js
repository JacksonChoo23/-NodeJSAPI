document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      try {
        const response = await fetch(
          `/auth/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
          {
            method: 'GET',
          }
        );
  
        const data = await response.json();
  
        if (data.status === 200) {
          // Check role type and redirect accordingly
          if (data.result.role_type === 'u') {
            window.location.href = '/admin/listings'; // Admin dashboard
          } else if (data.result.role_type === 'a') {
            window.location.href = '/index.html'; // User homepage
          }
        } else {
          alert(data.message); // Display error message
        }
      } catch (error) {
        alert('Login failed. Please try again.');
      }
    });
  });
  