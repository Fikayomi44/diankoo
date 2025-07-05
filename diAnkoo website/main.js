// ========== MENU TOGGLE ==========
function openmenu() {
  document.getElementById("sidebar").classList.add("open");
  document.getElementById("overlay").style.display = "block";
}

function closemenu() {
  document.getElementById("sidebar").classList.remove("open");
  document.getElementById("overlay").style.display = "none";
}

// ========== GLOBAL CART VARIABLE ==========
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ========== MAIN DOM LOADER ==========
document.addEventListener("DOMContentLoaded", () => {
  // ========== PRODUCT CARD CLICK ZOOM ==========
  const cards = document.querySelectorAll(".trending-card");
  const blurLayer = document.getElementById("blurLayer");
  let focusedCard = null;

  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      e.stopPropagation();

      if (focusedCard === card) {
        card.classList.remove("focused");
        blurLayer.style.display = "none";
        focusedCard = null;
      } else {
        if (focusedCard) focusedCard.classList.remove("focused");

        card.classList.add("focused");
        blurLayer.style.display = "block";
        focusedCard = card;
      }
    });
  });
});

if (blurLayer) {
  blurLayer.addEventListener("click", () => {
    if (focusedCard) focusedCard.classList.remove("focused");
    blurLayer.style.display = "none";
    focusedCard = null;
  });
}

// ========== ADD TO CART ==========
const buttons = document.querySelectorAll(".add-to-cart-btn");

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent card zoom

    const name = button.getAttribute("data-product");
    const priceText = button.parentElement.querySelector(".price").textContent;

    const price = parseInt(priceText.replace(/[₦,]/g, ""));

    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${name} added to cart!`);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const searchIcon = document.querySelector(".icon1");
  const searchBox = document.getElementById("searchBox");
  const searchInput = document.getElementById("searchInput");
  const searchBlur = document.getElementById("searchBlur");

  // Toggle search box and blur overlay
  if (searchIcon && searchBox && searchBlur) {
    searchIcon.addEventListener("click", () => {
      const isOpen = searchBox.style.display === "block";

      searchBox.style.display = isOpen ? "none" : "block";
      searchBlur.style.display = isOpen ? "none" : "block";

      if (!isOpen) {
        searchInput.focus();
      }
    });

    // Clicking outside closes search
    searchBlur.addEventListener("click", () => {
      searchBox.style.display = "none";
      searchBlur.style.display = "none";
    });
  }

  // Search functionality
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();
      const allProducts = document.querySelectorAll(
        ".trending-card, .explore-card"
      );

      allProducts.forEach((card) => {
        const name =
          (
            card.querySelector("p") ||
            card.querySelector("h2") ||
            card.querySelector(".product-name")
          )?.textContent.toLowerCase() || "";

        card.style.display = name.includes(query) ? "block" : "none";
      });
    });
  }
});
