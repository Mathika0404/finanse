const form = document.getElementById('form');
const firstname_input = document.getElementById('firstname-input');
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const repeat_password_input = document.getElementById('repeat-password-input');
const error_message = document.getElementById('error-message');

// ----------------------
// FORM SUBMIT VALIDATION
// ----------------------
form.addEventListener('submit', (e) => {
  let errors = [];

  if (firstname_input) {
    // ✅ Signup form
    errors = getSignupFormErrors(
      firstname_input.value,
      email_input.value,
      password_input.value,
      repeat_password_input.value
    );

    if (errors.length > 0) {
      e.preventDefault();
      error_message.innerText = errors.join(". ");
    } else {
      e.preventDefault(); // stop reload
      alert("✅ Signup successfully!");
      // Optional redirect:
      // window.location.href = "login.html";
    }

  } else {
    // ✅ Login form
    errors = getLoginFormErrors(email_input.value, password_input.value);

    if (errors.length > 0) {
      e.preventDefault();
      error_message.innerText = errors.join(". ");
    } else {
      e.preventDefault(); // stop reload
      alert("✅ Logged in successfully!");
      // Optional redirect:
      // window.location.href = "dashboard.html";
    }
  }
});

// ----------------------
// SIGNUP FORM VALIDATION
// ----------------------
function getSignupFormErrors(firstname, email, password, repeatPassword) {
  let errors = [];

  if (firstname === '' || firstname == null) {
    errors.push('Firstname is required');
    firstname_input.parentElement.classList.add('incorrect');
  }
  if (email === '' || email == null) {
    errors.push('Email is required');
    email_input.parentElement.classList.add('incorrect');
  }
  if (password === '' || password == null) {
    errors.push('Password is required');
    password_input.parentElement.classList.add('incorrect');
  }
  if (password.length < 8) {
    errors.push('Password must have at least 8 characters');
    password_input.parentElement.classList.add('incorrect');
  }
  if (password !== repeatPassword) {
    errors.push('Password does not match repeated password');
    password_input.parentElement.classList.add('incorrect');
    repeat_password_input.parentElement.classList.add('incorrect');
  }

  return errors;
}

// ----------------------
// LOGIN FORM VALIDATION
// ----------------------
function getLoginFormErrors(email, password) {
  let errors = [];

  if (email === '' || email == null) {
    errors.push('Email is required');
    email_input.parentElement.classList.add('incorrect');
  }
  if (password === '' || password == null) {
    errors.push('Password is required');
    password_input.parentElement.classList.add('incorrect');
  }

  return errors;
}

// ----------------------
// REMOVE ERROR ON INPUT
// ----------------------
const allInputs = [firstname_input, email_input, password_input, repeat_password_input].filter(input => input != null);

allInputs.forEach(input => {
  input.addEventListener('input', () => {
    if (input.parentElement.classList.contains('incorrect')) {
      input.parentElement.classList.remove('incorrect');
      error_message.innerText = '';
    }
  });
});

// ----------------------
// FORGOT PASSWORD MODAL
// ----------------------
const forgotLink = document.getElementById('forgot-password-link');
const forgotPanel = document.getElementById('forgot-panel');
const cancelForgot = document.getElementById('cancel-forgot');
const forgotForm = document.getElementById('forgot-form');
const forgotEmail = document.getElementById('forgot-email');
const forgotMessage = document.getElementById('forgot-message');

// Show modal
forgotLink.addEventListener('click', (e) => {
  e.preventDefault();
  forgotPanel.classList.add('active');
});

// Hide modal
cancelForgot.addEventListener('click', () => {
  forgotPanel.classList.remove('active');
  forgotMessage.innerText = '';
  forgotEmail.value = '';
});

// Simulate reset email sending
forgotForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = forgotEmail.value.trim();

  if (email === '') {
    forgotMessage.style.color = '#f06272';
    forgotMessage.innerText = 'Please enter your email.';
    return;
  }

  forgotMessage.style.color = 'green';
  forgotMessage.innerText = 'A password reset link has been sent!';
  forgotEmail.value = '';

  // Close panel automatically after 2 seconds
  setTimeout(() => {
    forgotPanel.classList.remove('active');
    forgotMessage.innerText = '';
  }, 2000);
});

// ----------------------
// RESET LINK ALERT (if using button instead of form)
// ----------------------
function sendResetLink() {
  const emailInput = document.getElementById('forgot-email');
  const email = emailInput.value.trim();

  if (email === "") {
    alert("⚠️ Please enter your email address.");
  } else {
    alert("✅ A password reset link has been sent to your email!");
  }
}
