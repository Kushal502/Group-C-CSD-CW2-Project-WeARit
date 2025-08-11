// js/auth.js
document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------
     Helpers
  ----------------------------- */
  const getUsers = () => JSON.parse(localStorage.getItem('wearit_users') || '[]');
  const saveUsers = (users) => localStorage.setItem('wearit_users', JSON.stringify(users));

  const setMessage = (id, type, text) => {
    document.getElementById(id).innerHTML = `<div class="alert alert-${type}">${text}</div>`;
  };

  /* ----------------------------
     Signup Handling
  ----------------------------- */
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const first = document.getElementById('firstName').value.trim();
      const last  = document.getElementById('lastName').value.trim();
      const email = document.getElementById('signup-email').value.trim().toLowerCase();
      const pass  = document.getElementById('signup-password').value;

      if (!first || !last || !email || pass.length < 6) {
        setMessage('signup-message', 'danger', 'Please complete the form (password min 6 chars).');
        return;
      }

      const users = getUsers();
      if (users.some(u => u.email === email)) {
        setMessage('signup-message', 'warning', 'Email already exists. Try logging in.');
        return;
      }

      users.push({ first, last, email, password: pass });
      saveUsers(users);

      setMessage('signup-message', 'success', 'Account created. Redirecting to login...');
      setTimeout(() => window.location.href = 'login.html', 900);
    });
  }

  /* ----------------------------
     Login Handling
  ----------------------------- */
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = document.getElementById('login-email').value.trim().toLowerCase();
      const pass  = document.getElementById('login-password').value;

      const users = getUsers();
      const user = users.find(u => u.email === email && u.password === pass);

      if (!user) {
        setMessage('login-message', 'danger', 'Invalid credentials.');
        return;
      }

      localStorage.setItem('wearit_session', JSON.stringify({ email: user.email }));

      setMessage('login-message', 'success', 'Login successful. Redirecting...');
      setTimeout(() => window.location.href = 'index.html', 900);
    });
  }

});
