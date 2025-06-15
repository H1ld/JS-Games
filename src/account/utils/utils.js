function ShowAccountPage() {
    document.getElementById("backgroundPopupAccount").style.display = "block";
}

function closePopupAccount() {
    document.getElementById("backgroundPopupAccount").style.display = "none";
}

function hideButtonAccount() {
    document.getElementById("accountButton").style.display = "none"; 
    const showAccountInfo = document.getElementById("showAccountInfo");
    showAccountInfo.style.display = "block";
    showAccountInfo.textContent = "Connected in " + currentUser;
}

function signUp() {
    const form = document.getElementById('signupForm');

    const username = form.elements['username'].value;
    const password = form.elements['password'].value;

    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            currentUser = username;
            hideButtonAccount();
            document.getElementById("backgroundPopupAccount").style.display = "none";
        } else {
            alert("Error:", data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}

function login() {
    const form = document.getElementById('loginForm');

    const username = form.elements['username'].value;
    const password = form.elements['password'].value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            currentUser = username;
            hideButtonAccount();
            document.getElementById("backgroundPopupAccount").style.display = "none";
        } else {
            alert("Login failed:", data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}
