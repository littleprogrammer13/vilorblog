// LOGIN
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async e => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const msg = document.getElementById('msg');

    const res = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    msg.textContent = await res.text();
    if (res.ok) setTimeout(() => window.location.href = '/admin.html', 1000);
  });
}

// SIGNUP
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', async e => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const msg = document.getElementById('msg');

    const res = await fetch('/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    msg.textContent = await res.text();
    if (res.ok) setTimeout(() => window.location.href = '/login.html', 1000);
  });
}
