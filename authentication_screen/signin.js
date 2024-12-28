document.getElementById('signin-form').addEventListener('submit', handleSignIn);

function handleSignIn(event) {
    event.preventDefault();

    const emailField = document.getElementById('signin-email-field');
    const passwordField = document.getElementById('signin-password-field');

    if (!emailField.value || !passwordField.value) {
        alert("Please fill in both fields before proceeding.");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || []; 
    const user = users.find(user => user.email === emailField.value && user.password === passwordField.value);

    if (user) {
        alert("Sign-in successful! Welcome back, " + user.username);
        localStorage.setItem("username", user.username); 
        localStorage.setItem("email", user.email); 

        window.location.replace("/index.html");
    } else {
        alert("Invalid email or password. Please try again.");
    }
}


function toggleSigninPasswordVisibility() {
    const passwordField = document.getElementById('signin-password-field');
    const passwordIcon = document.getElementById('signin-password-icon');

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