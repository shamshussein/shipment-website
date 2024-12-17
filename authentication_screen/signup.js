document.getElementById('signup-form').addEventListener('submit', handleSignUp);

function handleSignUp(event) {
    event.preventDefault(); 

    const emailField = document.getElementById('email-field');
    const passwordField = document.getElementById('password-field');
    const nameField = document.getElementById('username-field');

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

    alert("Sign-up successful! Welcome " + nameField.value);

    localStorage.setItem("username", nameField.value);
    localStorage.setItem("email", emailField.value); 
    localStorage.setItem("password", passwordField.value);

    // document.getElementById('signup-form').reset();
    localStorage.setItem("isSignedUp", "true");
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
