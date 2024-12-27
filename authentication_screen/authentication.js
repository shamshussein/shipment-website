document.getElementById('signup-form').addEventListener('submit', handleSignUp);

function handleSignUp(event) {
    event.preventDefault();

    const emailField = document.getElementById('email-field');
    const passwordField = document.getElementById('password-field');
    const nameField = document.getElementById('username-field');

    const storedEmail = localStorage.getItem("email"); 
    const storedUsername = localStorage.getItem("username"); 

    if (emailField.value === storedEmail || nameField.value === storedUsername) {
        alert("An account already exists with this email or username. Please Sign In.");
        window.location.href = "signin.html";  
        return;
    }

    if (nameField.value.includes(' ') || passwordField.value.includes(' ')) {
        alert("Username and password should not contain spaces.");
        return; 
    }

    if (passwordField.value.length < 8) {
        alert("Password must be at least 8 characters long.");
        return;
    }

    if (!emailField.value || !passwordField.value || !nameField.value) {
        alert("Please fill all the required fields before proceeding.");
        return; 
    }

    localStorage.setItem("username", nameField.value);
    localStorage.setItem("email", emailField.value);
    localStorage.setItem("password", passwordField.value);

    alert("Sign-up successful! Welcome " + nameField.value);

    console.log("Redirecting to index.html...");
    window.location.replace = "index.html";  
}

document.getElementById('signin-form').addEventListener('submit', handleSignIn);

function handleSignIn(event) {
    event.preventDefault();

    const emailField = document.getElementById('signin-email-field');
    const passwordField = document.getElementById('signin-password-field');

    if (!emailField.value || !passwordField.value) {
        alert("Please fill in both fields before proceeding.");
        return;
    }

    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

    if (emailField.value === storedEmail && passwordField.value === storedPassword) {
        alert("Sign-in successful! Welcome back.");
    window.location.replace = "index.html";  
    } else {
        alert("Invalid email or password. Please try again.");
    }
}
function togglePasswordVisibility() {
    const passwordField = document.getElementById('password-field');
    const passwordIcon = document.getElementById('password-icon');

    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        passwordIcon.classList.remove('fa-lock');
        passwordIcon.classList.add('fa-unlock');
    } else {
        passwordField.type = 'password';
        passwordIcon.classList.remove('fa-unlock');
        passwordIcon.classList.add('fa-lock');
    }
}