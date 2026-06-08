class NeumorphismLoginForm {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.alertBox = document.getElementById('alertBox');
        this.init();
        this.decorate();
    }

    init() {
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            try {
                const res = await fetch("https://herisusanta.my.id/javalogin/api/auth.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: `action=login&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
                });

                const data = await res.json();

                if (data.status === "success") {
                    // Simpan ke LocalStorage sesuai LKPD
                    localStorage.setItem("username", data.username);
                    alert("Login Berhasil! Selamat datang " + data.username);
                    window.location.href = "../../index.html"; 
                } else {
                    // Tampilkan pesan error di alertBox sesuai Gambar 2944
                    this.alertBox.innerText = "Username atau Password salah!";
                    this.alertBox.style.display = "block";
                    setTimeout(() => { this.alertBox.style.display = "none"; }, 3000);
                }
            } catch (error) {
                alert("Gagal terhubung ke server!");
            }
        });
    }

    decorate() {
        // Efek Hover pada elemen Neumorphic
        document.querySelectorAll('.neu-icon, .neu-checkbox, .neu-social').forEach(el => {
            el.addEventListener('mouseenter', () => { el.style.transform = 'scale(1.05)'; });
            el.addEventListener('mouseleave', () => { el.style.transform = 'scale(1)'; });
        });

        // Animasi bayangan mengikuti pergerakan mouse
        const card = document.querySelector('.login-card');
        if (card) {
            document.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
                const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
                card.style.boxShadow = `${x * 15}px ${y * 15}px 30px #bec3cf, ${-x * 15}px ${-y * 15}px 30px #ffffff`;
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => new NeumorphismLoginForm());
