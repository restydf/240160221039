
document.addEventListener("DOMContentLoaded", function () {

  /* ================= LOADING ================= */
  window.onload = () => {
    const loader = document.getElementById("loader");
    if (loader) loader.style.display = "none";
  };

  /* ================= DARK / LIGHT MODE ================= */
  const toggle = document.getElementById("toggleDark");
  if (toggle) {
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("light");
    });
  }

  /* ================= OLD FILTER (FALLBACK) ================= */
  // untuk class lama: .project
  window.filterProject = function (category) {
    let projects = document.querySelectorAll(".project");

    projects.forEach(p => {
      if (category === "all" || p.classList.contains(category)) {
        p.style.display = "block";
      } else {
        p.style.display = "none";
      }
    });
  };

 /* ================= MODAL ================= */

const modal = document.getElementById("hireModal");

const openBtn = document.getElementById("openModal");

const closeBtn = document.querySelector(".close");

if (openBtn) {

  openBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });

}

if (closeBtn) {

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

}

window.addEventListener("click", (e) => {

  if (e.target === modal) {
    modal.style.display = "none";
  }

});

const sendBtn = document.getElementById("sendRequest");

if (sendBtn) {

  sendBtn.addEventListener("click", () => {

    alert("Request sent successfully!");

    modal.style.display = "none";

  });

}

/* ================= NEW PORTFOLIO FILTER (PRO VERSION) ================= */

const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioCards = document.querySelectorAll(".portfolio-card");

if (filterButtons.length > 0 && portfolioCards.length > 0) {

  filterButtons.forEach(button => {

    button.addEventListener("click", () => {

      // remove active
      filterButtons.forEach(btn => btn.classList.remove("active"));

      // add active ke yang diklik
      button.classList.add("active");

      const filter = button.getAttribute("data-filter");

      portfolioCards.forEach(card => {

        if (filter === "all") {

          card.classList.remove("hide");

        } else {

          if (card.classList.contains(filter)) {
            card.classList.remove("hide");
          } else {
            card.classList.add("hide");
          }

        }

      });

    });

  });

}

  /* ================= LIGHTBOX ================= */
  window.openLightbox = function (src) {
    const lightbox = document.getElementById("lightbox");
    const img = document.getElementById("lightbox-img");

    if (lightbox && img) {
      lightbox.style.display = "block";
      img.src = src;
    }
  };

  window.closeLightbox = function () {
    const lightbox = document.getElementById("lightbox");
    if (lightbox) {
      lightbox.style.display = "none";
    }
  };

  /* ================= FORM VALIDATION ================= */
  const form = document.getElementById("contactForm");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      let name = document.getElementById("name")?.value;
      let email = document.getElementById("email")?.value;
      let message = document.getElementById("message")?.value;

      if (!name || !email || !message) {
        alert("Semua field wajib diisi!");
      } else {
        alert("Pesan berhasil dikirim!");
        form.reset();
      }
    });
  }

});