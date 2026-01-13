document.addEventListener("DOMContentLoaded", () => {
  const steps = document.querySelectorAll(".step-item");
  const lines = document.querySelectorAll(".line");
  const orderItems = document.getElementById("order-items");
  const subtotalEl = document.getElementById("subtotal");
  const totalEl = document.getElementById("total");
  const confirmBtn = document.getElementById("confirm-order");

  const DELIVERY = 50;

  function setStep(index) {
    steps.forEach((step, i) => {
      step.classList.remove("active", "completed");
      if (i < index) step.classList.add("completed");
      if (i === index) step.classList.add("active");
    });

    lines.forEach((line, i) => {
      line.classList.toggle("active", i < index);
    });
  }

  setStep(0);

  // ✅ LOAD REAL CART FROM MENU PAGE
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  let subtotal = 0;
  orderItems.innerHTML = "";

  if (cart.length === 0) {
    orderItems.innerHTML = "<p>Your cart is empty</p>";
  }

  cart.forEach(item => {
    const priceNum = parseInt(item.price.replace(/[^\d]/g, ""));
    const itemTotal = priceNum * item.quantity;
    subtotal += itemTotal;

    orderItems.innerHTML += `
      <p>
        <span>${item.name} x${item.quantity}</span>
        <span>₱${itemTotal}</span>
      </p>
    `;
  });

  const total = subtotal + DELIVERY;

  subtotalEl.textContent = `₱${subtotal}`;
  totalEl.textContent = `₱${total}`;

  // ✅ CONFIRM ORDER → SAVE FOR PAYMENT
  confirmBtn.addEventListener("click", () => {
    const checkoutData = {
      items: cart,
      subtotal: subtotal,
      delivery: DELIVERY,
      total: total
    };

    localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
    window.location.href = "payment.html";
  });
});

// HAMBURGER
const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});
