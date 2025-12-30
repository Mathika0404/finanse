const form = document.getElementById('form');
const firstname_input = document.getElementById('firstname-input');
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const repeat_password_input = document.getElementById('repeat-password-input');

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Handle form submit
form.addEventListener('submit', (e) => {
  e.preventDefault();

  let errors = [];

  if (firstname_input) {
    // Signup form
    errors = getSignupFormErrors(
      firstname_input.value,
      email_input.value,
      password_input.value,
      repeat_password_input.value
    );
  } else {
    // Login form
    errors = getLoginFormErrors(email_input.value, password_input.value);
  }

  if (errors.length > 0) {
    alert(errors.join("\n"));
  } else {
    // alert("Form submitted successfully!");
    window.location.href = "404.html"; // or dashboard.html
  }
});

// Signup validation
function getSignupFormErrors(firstname, email, password, repeatPassword) {
  const errors = [];

  if (!firstname.trim()) errors.push("Firstname is required.");

  if (!email.trim()) errors.push("Email is required.");
  else if (!isValidEmail(email)) errors.push("Please enter a valid email address.");

  if (!password.trim()) errors.push("Password is required.");
  else if (password.length < 8) errors.push("Password must have at least 8 characters.");

  if (password !== repeatPassword)
    errors.push("Password does not match repeated password.");

  return errors;
}

// Login validation
function getLoginFormErrors(email, password) {
  const errors = [];

  if (!email.trim()) errors.push("Email is required.");
  else if (!isValidEmail(email)) errors.push("Please enter a valid email address.");

  if (!password.trim()) errors.push("Password is required.");

  return errors;
}

// Forgot password redirect
const forgotLink = document.getElementById('forgot-password-link');
if (forgotLink) {
  forgotLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = "404.html";
  });
}
