// DARK / LIGHT MODE
const toggleBtn = document.createElement("button");
toggleBtn.innerText = "🌙";
toggleBtn.className = "btn btn-outline-secondary ms-2";

const navbar = document.querySelector(".navbar");

// masukin ke navbar
document.querySelector(".navbar .container-fluid").appendChild(toggleBtn);

// load mode tersimpan
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    navbar.setAttribute("data-bs-theme", "dark");
    toggleBtn.innerText = "☀️";
}

// toggle mode
toggleBtn.onclick = () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        toggleBtn.innerText = "☀️";
        navbar.setAttribute("data-bs-theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
        toggleBtn.innerText = "🌙";
        navbar.setAttribute("data-bs-theme", "light");
    }
};