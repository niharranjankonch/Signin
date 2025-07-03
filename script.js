// Helper functions
function showForm(formId) {
  document.querySelectorAll('.form-container').forEach(f => f.classList.add('hidden'));
  document.getElementById(formId).classList.remove('hidden');
}

function getUsers() {
  return JSON.parse(localStorage.getItem('users') || '{}');
}

function setUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

function setSession(email) {
  localStorage.setItem('session', email);
}

function getSession() {
  return localStorage.getItem('session');
}

function clearSession() {
  localStorage.removeItem('session');
}

// Switch forms
const showSignup = document.getElementById('show-signup');
const showLogin = document.getElementById('show-login');
const showLogin2 = document.getElementById('show-login-2');
const showForgot = document.getElementById('show-forgot');

showSignup.onclick = e => { e.preventDefault(); showForm('signup-form'); };
showLogin.onclick = e => { e.preventDefault(); showForm('login-form'); };
showLogin2.onclick = e => { e.preventDefault(); showForm('login-form'); };
showForgot.onclick = e => { e.preventDefault(); showForm('forgot-form'); };

// Signup
const signupForm = document.querySelector('#signup-form form');
signupForm.onsubmit = function(e) {
  e.preventDefault();
  const email = document.getElementById('signup-email').value.trim().toLowerCase();
  const password = document.getElementById('signup-password').value;
  const confirm = document.getElementById('signup-confirm').value;
  const msg = document.getElementById('signup-message');
  if (!email || !password || !confirm) {
    msg.textContent = 'Please fill all fields.';
    return;
  }
  if (password !== confirm) {
    msg.textContent = 'Passwords do not match.';
    return;
  }
  let users = getUsers();
  if (users[email]) {
    msg.textContent = 'Email already registered.';
    return;
  }
  users[email] = { password };
  setUsers(users);
  msg.style.color = '#27ae60';
  msg.textContent = 'Signup successful! Please login.';
  setTimeout(() => {
    msg.textContent = '';
    showForm('login-form');
  }, 1200);
};

// Login
const loginForm = document.querySelector('#login-form form');
loginForm.onsubmit = function(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim().toLowerCase();
  const password = document.getElementById('login-password').value;
  const msg = document.getElementById('login-message');
  let users = getUsers();
  if (!users[email] || users[email].password !== password) {
    msg.textContent = 'Invalid email or password.';
    return;
  }
  setSession(email);
  msg.style.color = '#27ae60';
  msg.textContent = 'Login successful!';
  setTimeout(() => {
    msg.textContent = '';
    showWelcome(email);
  }, 800);
};

// Welcome
function showWelcome(email) {
  document.getElementById('welcome-email').textContent = email;
  showForm('welcome');
}

const logoutBtn = document.getElementById('logout');
logoutBtn.onclick = function() {
  clearSession();
  showForm('login-form');
};

// Forgot Password
const forgotForm = document.querySelector('#forgot-form form');
forgotForm.onsubmit = function(e) {
  e.preventDefault();
  const email = document.getElementById('forgot-email').value.trim().toLowerCase();
  const msg = document.getElementById('forgot-message');
  let users = getUsers();
  if (!users[email]) {
    msg.textContent = 'Email not found.';
    return;
  }
  // Simulate sending email by showing reset form
  localStorage.setItem('resetEmail', email);
  msg.style.color = '#27ae60';
  msg.textContent = 'Reset link sent! (Simulated)';
  setTimeout(() => {
    msg.textContent = '';
    showForm('reset-form');
  }, 1200);
};

// Reset Password
const resetForm = document.querySelector('#reset-form form');
resetForm.onsubmit = function(e) {
  e.preventDefault();
  const password = document.getElementById('reset-password').value;
  const confirm = document.getElementById('reset-confirm').value;
  const msg = document.getElementById('reset-message');
  const email = localStorage.getItem('resetEmail');
  if (!password || !confirm) {
    msg.textContent = 'Please fill all fields.';
    return;
  }
  if (password !== confirm) {
    msg.textContent = 'Passwords do not match.';
    return;
  }
  let users = getUsers();
  if (!users[email]) {
    msg.textContent = 'User not found.';
    return;
  }
  users[email].password = password;
  setUsers(users);
  localStorage.removeItem('resetEmail');
  msg.style.color = '#27ae60';
  msg.textContent = 'Password reset! Please login.';
  setTimeout(() => {
    msg.textContent = '';
    showForm('login-form');
  }, 1200);
};

// On load, check session
window.onload = function() {
  const email = getSession();
  if (email) {
    showWelcome(email);
  } else {
    showForm('login-form');
  }
}; 