const login = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === "admin" && password === "admin123"){
        window.location.href = 'main_page.html';
    }

    else {
        alert("Wrong Username & Password");
    }
};