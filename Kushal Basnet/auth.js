// js/auth.js
document.addEventListener('DOMContentLoaded', () => {
  // Signup
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const first = document.getElementById('firstName').value.trim();
      const last = document.getElementById('lastName').value.trim();
      const email = document.getElementById('signup-email').value.trim().toLowerCase();
      const pass = document.getElementById('signup-password').value;

      if (!first || !last || !email || pass.length < 6) {
        document.getElementById('signup-message').innerHTML = '<div class="alert alert-danger">Please complete the form (password min 6 chars).</div>';
        return;
      }

      const users = JSON.parse(localStorage.getItem('wearit_users') || '[]');
      if (users.find(u => u.email === email)) {
        document.getElementById('signup-message').innerHTML = '<div class="alert alert-warning">Email already exists. Try logging in.</div>';
        return;
      }

      users.push({ first, last, email, password: pass });
      localStorage.setItem('wearit_users', JSON.stringify(users));
      document.getElementById('signup-message').innerHTML = '<div class="alert alert-success">Account created. Redirecting to login...</div>';
      setTimeout(() => window.location.href = 'login.html', 900);
    });
  }

  // Login
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value.trim().toLowerCase();
      const pass = document.getElementById('login-password').value;
      const users = JSON.parse(localStorage.getItem('wearit_users') || '[]');
      const user = users.find(u => u.email === email && u.password === pass);
      if (!user) {
        document.getElementById('login-message').innerHTML = '<div class="alert alert-danger">Invalid credentials.</div>';
        return;
      }
      // Save simple session marker
      localStorage.setItem('wearit_session', JSON.stringify({
        email: user.email
      }));
      document.getElementById('login-message').innerHTML = '<div class="alert alert-success">Login successful. Redirecting...</div>';
      setTimeout(() => window.location.href = 'index.html', 900);
    });
  }
});

