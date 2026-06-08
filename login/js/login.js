document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const usernameInput = document.getElementById("username").value.trim();
    const passwordInput = document.getElementById("password").value.trim();
    const alertBox = document.getElementById("alertBox");

    try {
        const res = await fetch("https://herisusanta.my.id/javalogin/api/auth.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `action=login&username=${encodeURIComponent(usernameInput)}&password=${encodeURIComponent(passwordInput)}`
        });

        const data = await res.json();

        if (data.status === "success") {
            localStorage.setItem("username", data.username);
            alert("Login Berhasil! Selamat datang, " + data.username);
            window.location.href = "../index.html"; 
        } else {
            alertBox.innerText = "Username atau Password salah, silakan coba lagi";
            alertBox.style.display = "block";
            alertBox.style.backgroundColor = "#ff4d4d";
            alertBox.style.color = "white";
            alertBox.style.padding = "10px";
            alertBox.style.borderRadius = "5px";
            alertBox.style.marginTop = "10px";

            setTimeout(() => {
                alertBox.style.display = "none";
            }, 3000);
        }
    } catch (error) {
        alert("Gagal terhubung ke server.");
    }
});
