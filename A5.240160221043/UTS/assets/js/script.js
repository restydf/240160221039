'use strict';

/* HAMBURGER MENU */

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {

  hamburger.classList.toggle('active');
  navMenu.classList.toggle('open');

});

/* CLOSE MENU */

document.querySelectorAll('.nav-link').forEach(link => {

  link.addEventListener('click', () => {

    hamburger.classList.remove('active');
    navMenu.classList.remove('open');

  });

});

/* HEADER SCROLL */

const header = document.getElementById('header');

window.addEventListener('scroll', () => {

  if(window.scrollY > 50){

    header.style.boxShadow =
    '0 10px 30px rgba(0,0,0,0.2)';

  }else{

    header.style.boxShadow = 'none';

  }

});

/* THEME TOGGLE */

const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {

  const html = document.documentElement;

  if(html.getAttribute('data-theme') === 'dark'){

    html.setAttribute('data-theme', 'light');

    themeToggle.innerHTML =
    '<i class="fas fa-sun"></i>';

  } else {

    html.setAttribute('data-theme', 'dark');

    themeToggle.innerHTML =
    '<i class="fas fa-moon"></i>';
  }

});

/* MODAL */

const modal =
document.getElementById('hireModal');

const openModal =
document.getElementById('openModal');

const closeModal =
document.getElementById('closeModal');

/* OPEN */

if(openModal){

  openModal.addEventListener('click', () => {

    modal.classList.add('show');

  });

}

/* CLOSE */

if(closeModal){

  closeModal.addEventListener('click', () => {

    modal.classList.remove('show');

  });

}

/* CLICK OUTSIDE */

window.addEventListener('click', (e) => {

  if(e.target === modal){

    modal.classList.remove('show');

  }

});

/* CONTACT FORM VALIDATION */

const form =
document.getElementById("contactForm");

const nameInput =
document.getElementById("name");

const emailInput =
document.getElementById("email");

const messageInput =
document.getElementById("message");

if(form){

  form.addEventListener("submit", function(e){

    e.preventDefault();

    let valid = true;

    clearErrors();

    /* NAME */

    if(nameInput.value.trim() === ""){

      showError(
        nameInput,
        "Nama wajib diisi"
      );

      valid = false;
    }

    /* EMAIL */

    if(emailInput.value.trim() === ""){

      showError(
        emailInput,
        "Email wajib diisi"
      );

      valid = false;
    }

    else if(
      !validateEmail(emailInput.value)
    ){

      showError(
        emailInput,
        "Format email tidak valid"
      );

      valid = false;
    }

    /* MESSAGE */

    if(messageInput.value.trim() === ""){

      showError(
        messageInput,
        "Pesan wajib diisi"
      );

      valid = false;
    }

    /* SUCCESS */

    if(valid){

      alert("Pesan berhasil dikirim 🚀");

      form.reset();
    }

  });

}

/* SHOW ERROR */

function showError(input, message){

  input.classList.add("input-error");

  input.parentElement
  .querySelector(".error-text")
  .innerText = message;
}

/* CLEAR ERROR */

function clearErrors(){

  document
  .querySelectorAll(".error-text")
  .forEach(el => {

    el.innerText = "";

  });

  document
  .querySelectorAll("input, textarea")
  .forEach(el => {

    el.classList.remove("input-error");

  });

}

/* EMAIL VALIDATION */

function validateEmail(email){

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  .test(email);

}

/* FILTER PORTFOLIO */

const filterBtns =
document.querySelectorAll(".filter-btn");

const portfolioCards =
document.querySelectorAll(".portfolio-card");

filterBtns.forEach(btn => {

  btn.addEventListener("click", ()=>{

    document
    .querySelector(".filter-btn.active")
    .classList.remove("active");

    btn.classList.add("active");

    const filter =
    btn.dataset.filter;

    portfolioCards.forEach(card => {

      if(
        filter === "all" ||
        card.classList.contains(filter)
      ){

        card.style.display = "block";

      }

      else{

        card.style.display = "none";

      }

    });

  });

});

/* LIGHTBOX */

window.addEventListener("DOMContentLoaded", () => {

  const lightbox =
  document.getElementById("lightbox");

  const lightboxImg =
  document.getElementById("lightbox-img");

  const closeLightbox =
  document.querySelector(".lightbox-close");

  const portfolioImages =
  document.querySelectorAll(".portfolio-image img");

  /* OPEN */

  portfolioImages.forEach((img) => {

    img.addEventListener("click", () => {

      lightbox.classList.add("show");

      lightboxImg.src = img.src;

    });

  });

  /* CLOSE BUTTON */

  closeLightbox.addEventListener("click", () => {

    lightbox.classList.remove("show");

  });

  /* CLOSE OUTSIDE */

  lightbox.addEventListener("click", (e) => {

    if(e.target === lightbox){

      lightbox.classList.remove("show");

    }

  });

});

const sections = document.querySelectorAll(".section");

window.addEventListener("scroll", () => {
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    const trigger = window.innerHeight * 0.85;

    if (top < trigger) {
      sec.classList.add("show");
    }
  });
});