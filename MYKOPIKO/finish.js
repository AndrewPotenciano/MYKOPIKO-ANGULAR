// Hamburger
const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// Order reference
document.addEventListener("DOMContentLoaded", () => {
  const orderNumberEl = document.getElementById("order-number");

  orderNumberEl.textContent =
    "MYK-" + Math.floor(1000 + Math.random() * 9000);
});
