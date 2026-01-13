// Hamburger
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// Payment logic
document.addEventListener("DOMContentLoaded", () => {
  const amountEls = document.querySelectorAll("#gcash-amount, #confirm-amount");
  const refEl = document.getElementById("ref-number");
  const confirmBtn = document.getElementById("confirm-payment");
  const qrCode = document.getElementById("qrCode");

  // Disable confirm by default
  confirmBtn.disabled = true;

  // Read checkout data
  const checkoutData = JSON.parse(localStorage.getItem("checkoutData"));

  if (!checkoutData) {
    alert("No checkout data found.");
    window.location.href = "checkout.html";
    return;
  }

  const total = checkoutData.total;

  amountEls.forEach(el => el.textContent = `₱${total}`);
  refEl.textContent = Math.random().toString().slice(2, 12);

  // Enable confirm ONLY when QR is clicked
  qrCode.addEventListener("click", () => {
    confirmBtn.disabled = false;
    qrCode.classList.add("clicked");
  });

  confirmBtn.addEventListener("click", () => {
    if (confirmBtn.disabled) return;

    alert("Payment Successful ✔");
    window.location.href = "finish.html";
  });
});


localStorage.setItem("checkoutData", JSON.stringify({
  items: cart,
  subtotal,
  delivery: DELIVERY_FEE,
  total
}));

window.location.href = "payment.html";
