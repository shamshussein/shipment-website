document.getElementById('signup-form').addEventListener('submit', handleSignUp);

function handleSignUp(event) {
    event.preventDefault();

    const emailField = document.getElementById('email-field');
    const passwordField = document.getElementById('password-field');
    const nameField = document.getElementById('username-field');

    const users = JSON.parse(localStorage.getItem("users")) || []; 

    const userExists = users.some(user => user.email === emailField.value || user.username === nameField.value);
    if (userExists) {
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

    users.push({
        username: nameField.value,
        email: emailField.value,
        password: passwordField.value
    });
    localStorage.setItem("users", JSON.stringify(users)); 
    localStorage.setItem("username", users.username); 
    localStorage.setItem("email", users.email); 
    localStorage.setItem("password", users.password); 

    alert("Sign-up successful! Welcome " + nameField.value);
    window.location.replace("/index.html");
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