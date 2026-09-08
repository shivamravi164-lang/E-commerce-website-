/* ==========================================================================
   Velora — Frontend-only auth (demo). Stores a fake session in localStorage.
   ========================================================================== */

function fieldError(fieldEl, message) {
  fieldEl.classList.add("error");
  const err = fieldEl.querySelector(".field-error");
  if (err) err.textContent = message;
}
function clearFieldError(fieldEl) {
  fieldEl.classList.remove("error");
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validateMobile(mobile) {
  return /^[6-9]\d{9}$/.test(mobile.replace(/\s+/g, ""));
}

function initRegisterForm() {
  const form = document.getElementById("register-form");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    const name = form.querySelector("#reg-name");
    const email = form.querySelector("#reg-email");
    const mobile = form.querySelector("#reg-mobile");
    const password = form.querySelector("#reg-password");
    const confirm = form.querySelector("#reg-confirm");

    [name, email, mobile, password, confirm].forEach(f => clearFieldError(f.closest(".form-field")));

    if (name.value.trim().length < 2) { fieldError(name.closest(".form-field"), "Please enter your full name."); valid = false; }
    if (!validateEmail(email.value.trim())) { fieldError(email.closest(".form-field"), "Enter a valid email address."); valid = false; }
    if (!validateMobile(mobile.value.trim())) { fieldError(mobile.closest(".form-field"), "Enter a valid 10-digit mobile number."); valid = false; }
    if (password.value.length < 6) { fieldError(password.closest(".form-field"), "Password must be at least 6 characters."); valid = false; }
    if (confirm.value !== password.value || !confirm.value) { fieldError(confirm.closest(".form-field"), "Passwords do not match."); valid = false; }

    if (!valid) return;

    localStorage.setItem(LS_USER, JSON.stringify({ name: name.value.trim(), email: email.value.trim(), mobile: mobile.value.trim() }));
    showToast("Account created! Redirecting…");
    setTimeout(() => window.location.href = "index.html", 900);
  });
}

function initLoginForm() {
  const form = document.getElementById("login-form");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;
    const email = form.querySelector("#login-email");
    const password = form.querySelector("#login-password");
    [email, password].forEach(f => clearFieldError(f.closest(".form-field")));

    if (!validateEmail(email.value.trim())) { fieldError(email.closest(".form-field"), "Enter a valid email address."); valid = false; }
    if (password.value.length < 1) { fieldError(password.closest(".form-field"), "Please enter your password."); valid = false; }
    if (!valid) return;

    const existing = getUser();
    const name = existing && existing.email === email.value.trim() ? existing.name : email.value.split("@")[0];
    localStorage.setItem(LS_USER, JSON.stringify({ name, email: email.value.trim(), mobile: existing ? existing.mobile : "" }));
    showToast("Welcome back! Redirecting…");
    setTimeout(() => window.location.href = "index.html", 900);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initRegisterForm();
  initLoginForm();
});
