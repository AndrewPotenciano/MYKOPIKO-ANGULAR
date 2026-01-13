const openCartBtn = document.querySelector(".add-cart");
const closeCartBtn = document.getElementById("close-modal");
const modal = document.getElementById("modal");
const cartItemsDiv = document.getElementById("cart-items");

// Array to store cart items with quantity
let cart = [];

// Open cart modal
openCartBtn.addEventListener("click", () => {
  modal.classList.add("open");
  renderCart();
});

// Close modal
closeCartBtn.addEventListener("click", () => {
  modal.classList.remove("open");
});

// Click outside modal-inner closes modal
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("open");
});

// Add To Cart buttons for all menus
const addButtons = document.querySelectorAll(".menu .infos button");

addButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const parent = btn.closest(".infos");
    const itemName = parent.querySelector("h3").innerText;
    const itemPrice = parent.querySelector("h4").innerText;

    // Check if item already exists
    const existing = cart.find((item) => item.name === itemName);
    if (existing) {
      existing.quantity += 1; // increment quantity
    } else {
      cart.push({ name: itemName, price: itemPrice, quantity: 1 });
    }

    modal.classList.add("open");
    renderCart();
  });
});

// Render cart items with quantity controls
function renderCart() {
  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your Cart is empty</p>";
    return;
  }

  let totalPrice = 0;

  cartItemsDiv.innerHTML = cart
    .map((item, index) => {
      const priceNum = parseInt(item.price.replace(/[^\d]/g, ""));
      totalPrice += priceNum * item.quantity;

      return `
      <div class="cart-item">
        <span>${item.name} - ${item.price}</span>
        <div class="quantity-controls">
          <button onclick="decreaseQuantity(${index})" style = "background-color: brown">-</button>
          <span>${item.quantity}</span>
          <button onclick="increaseQuantity(${index})">+</button>
          <button onclick="removeItem(${index})" style = "background-color: red">Remove</button>
        </div>
      </div>`;
    })
    .join("");

  cartItemsDiv.innerHTML += `<hr><p><strong>Total: ${totalPrice} PHP</strong></p>`;
}

// Increase quantity
function increaseQuantity(index) {
  cart[index].quantity += 1;
  renderCart();
}

// Decrease quantity
function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1); // remove item if quantity goes below 1
  }
  renderCart();
}

// Remove item completely
function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

const checkoutBtn = document.getElementById("checkout");

checkoutBtn.addEventListener("click", () => {
  // Save cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Redirect to checkout page
  window.location.href = "checkout.html";
});

