document.addEventListener("DOMContentLoaded", function () {
    function goLogin() {
        window.location.href = "login/login.html";
    }

    function logout() {
        localStorage.removeItem("username");
        alert("Logout berhasil!");
        location.reload();
    }

    const user = localStorage.getItem("username");

    if (user) {
        const userInfo = document.getElementById("userinfo");
        if (userInfo) {
            userInfo.innerText = "Halo, " + user;
        }

        const authArea = document.getElementById("authArea");
        if (authArea) {
            authArea.innerHTML = '<button onclick="logout()" class="btn btn-sm btn-dark" style="margin-left:10px;">Logout</button>';
        }
    }

    window.goLogin = goLogin;
    window.logout = logout;
});
