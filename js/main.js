/**
 * NOVA TECH STORE - INTERACTIVE JAVASCRIPT
 * Handles mobile drawer, product filtering, shopping cart state,
 * wishlist interactions, toast alerts, and live countdown timer.
 */

// Cart State (Initialized with 2 demo items)
let cart = [
  {
    id: 1,
    name: "Aura Pro Wireless Headphones",
    price: 199.99,
    img: "assets/images/product-1.jpg",
    quantity: 1
  },
  {
    id: 2,
    name: "Pulse Ultra Smartwatch",
    price: 249.00,
    img: "assets/images/product-2.jpg",
    quantity: 1
  }
];

let wishlistCount = 0;

// Wait for DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  initStickyHeader();
  initMobileNavigation();
  initCategoryFilters();
  initShopNowButtons();
  initWishlistButtons();
  initCartDrawer();
  initCountdownTimer();
  initCouponCopy();
  initNewsletterForm();
  renderCart();
});

/* --------------------------------------------------------------------------
   1. STICKY HEADER & SCROLL SHADOW
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.getElementById("siteHeader");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
    highlightActiveNavLink();
  });
}

function highlightActiveNavLink() {
  const sections = document.querySelectorAll("section[id], footer[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  const scrollPosition = window.scrollY + 100;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");

    if (scrollPosition >= top && scrollPosition < top + height) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${id}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

/* --------------------------------------------------------------------------
   2. MOBILE NAVIGATION DRAWER
   -------------------------------------------------------------------------- */
function initMobileNavigation() {
  const menuToggle = document.getElementById("mobileMenuToggle");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const mobileBackdrop = document.getElementById("mobileBackdrop");
  const closeBtn = document.getElementById("mobileCloseBtn");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  function openMobileMenu() {
    mobileDrawer.classList.add("active");
    mobileBackdrop.classList.add("active");
    document.body.style.overflow = "hidden";
    menuToggle.setAttribute("aria-expanded", "true");
  }

  function closeMobileMenu() {
    mobileDrawer.classList.remove("active");
    mobileBackdrop.classList.remove("active");
    document.body.style.overflow = "";
    menuToggle.setAttribute("aria-expanded", "false");
  }

  if (menuToggle) menuToggle.addEventListener("click", openMobileMenu);
  if (closeBtn) closeBtn.addEventListener("click", closeMobileMenu);
  if (mobileBackdrop) mobileBackdrop.addEventListener("click", closeMobileMenu);

  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });
}

/* --------------------------------------------------------------------------
   3. PRODUCT CATEGORY FILTER TABS
   -------------------------------------------------------------------------- */
function initCategoryFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const productCards = document.querySelectorAll(".product-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Toggle active tab style
      filterBtns.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      const filterValue = btn.getAttribute("data-filter");

      productCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");
        if (filterValue === "all" || cardCategory === filterValue) {
          card.style.display = "flex";
          card.style.animation = "fadeIn 0.35s ease-out";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   4. "SHOP NOW" BUTTONS & CART POPPING
   -------------------------------------------------------------------------- */
function initShopNowButtons() {
  const shopBtns = document.querySelectorAll(".btn-shop-now");

  shopBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const id = parseInt(btn.getAttribute("data-id"));
      const name = btn.getAttribute("data-name");
      const price = parseFloat(btn.getAttribute("data-price"));
      const img = btn.getAttribute("data-img");

      addToCart({ id, name, price, img });
      showToast(`Added to cart!`, `${name} was added to your bag.`);
    });
  });
}

function addToCart(product) {
  const existingItem = cart.find((item) => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
  animateCartCounter();
}

function animateCartCounter() {
  const counter = document.getElementById("cartCount");
  if (counter) {
    counter.classList.remove("bump");
    void counter.offsetWidth; // Trigger reflow
    counter.classList.add("bump");
  }
}

/* --------------------------------------------------------------------------
   5. WISHLIST TOGGLE INTERACTION
   -------------------------------------------------------------------------- */
function initWishlistButtons() {
  const wishlistBtns = document.querySelectorAll(".wishlist-btn");
  const wishlistCounter = document.getElementById("wishlistCount");

  wishlistBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const icon = btn.querySelector("i");
      const isFavorited = btn.classList.contains("active");

      if (isFavorited) {
        btn.classList.remove("active");
        icon.classList.remove("fa-solid");
        icon.classList.add("fa-regular");
        wishlistCount = Math.max(0, wishlistCount - 1);
        showToast("Removed from wishlist", "Item has been removed from favorites.");
      } else {
        btn.classList.add("active");
        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");
        wishlistCount += 1;
        showToast("Added to wishlist! ❤️", "Saved to your personal collection.");
      }

      if (wishlistCounter) {
        wishlistCounter.textContent = wishlistCount;
      }
    });
  });
}

/* --------------------------------------------------------------------------
   6. SHOPPING CART DRAWER & MANAGEMENT
   -------------------------------------------------------------------------- */
function initCartDrawer() {
  const cartBtn = document.getElementById("cartBtn");
  const cartDrawer = document.getElementById("cartDrawer");
  const cartBackdrop = document.getElementById("cartBackdrop");
  const closeCartBtn = document.getElementById("closeCartBtn");
  const checkoutBtn = document.getElementById("checkoutBtn");

  function openCart() {
    cartDrawer.classList.add("active");
    cartBackdrop.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeCart() {
    cartDrawer.classList.remove("active");
    cartBackdrop.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (cartBtn) cartBtn.addEventListener("click", openCart);
  if (closeCartBtn) closeCartBtn.addEventListener("click", closeCart);
  if (cartBackdrop) cartBackdrop.addEventListener("click", closeCart);

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (cart.length === 0) {
        showToast("Cart is Empty", "Please add items to your cart first.");
        return;
      }
      showToast("Proceeding to Checkout", "Redirecting to encrypted checkout portal...");
    });
  }
}

function renderCart() {
  const container = document.getElementById("cartItemsContainer");
  const subtotalElem = document.getElementById("cartSubtotalPrice");
  const cartCountElem = document.getElementById("cartCount");

  if (!container || !subtotalElem || !cartCountElem) return;

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  cartCountElem.textContent = totalItems;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-message">
        <i class="fa-solid fa-basket-shopping"></i>
        <h5 class="text-white font-bold text-base mb-1">Your cart is empty</h5>
        <p class="text-sm">Explore our products and find something you love!</p>
      </div>
    `;
    subtotalElem.textContent = "$0.00";
    return;
  }

  let subtotal = 0;
  let itemsHTML = "";

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    itemsHTML += `
      <div class="cart-item" data-id="${item.id}">
        <img src="${item.img}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-info">
          <h5 class="cart-item-title">${item.name}</h5>
          <span class="cart-item-price">$${item.price.toFixed(2)}</span>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="updateItemQuantity(${item.id}, -1)" aria-label="Decrease quantity">-</button>
            <span class="text-xs font-bold text-white px-1">${item.quantity}</span>
            <button class="qty-btn" onclick="updateItemQuantity(${item.id}, 1)" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <button class="remove-cart-item" onclick="removeCartItem(${item.id})" title="Remove item" aria-label="Remove item from cart">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    `;
  });

  container.innerHTML = itemsHTML;
  subtotalElem.textContent = `$${subtotal.toFixed(2)}`;
}

// Global functions accessible from inline HTML string callbacks
window.updateItemQuantity = function (id, delta) {
  const item = cart.find((i) => i.id === id);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter((i) => i.id !== id);
  }
  renderCart();
  animateCartCounter();
};

window.removeCartItem = function (id) {
  const item = cart.find((i) => i.id === id);
  const itemName = item ? item.name : "Item";
  cart = cart.filter((i) => i.id !== id);
  renderCart();
  animateCartCounter();
  showToast("Removed from Cart", `${itemName} was removed.`);
};

/* --------------------------------------------------------------------------
   7. PROMO CODE COPY & COUNTDOWN TIMER
   -------------------------------------------------------------------------- */
function initCouponCopy() {
  const couponBox = document.getElementById("couponBox");
  if (!couponBox) return;

  couponBox.addEventListener("click", () => {
    navigator.clipboard.writeText("LAUNCH20").then(() => {
      showToast("Copied to Clipboard! 🎉", "Promo code 'LAUNCH20' copied.");
    }).catch(() => {
      showToast("Code: LAUNCH20", "Use code LAUNCH20 at checkout for 20% off.");
    });
  });
}

function initCountdownTimer() {
  let hours = 14;
  let minutes = 42;
  let seconds = 18;

  const hoursEl = document.getElementById("cdHours");
  const minutesEl = document.getElementById("cdMinutes");
  const secondsEl = document.getElementById("cdSeconds");

  if (!hoursEl || !minutesEl || !secondsEl) return;

  setInterval(() => {
    if (seconds > 0) {
      seconds--;
    } else {
      seconds = 59;
      if (minutes > 0) {
        minutes--;
      } else {
        minutes = 59;
        if (hours > 0) {
          hours--;
        } else {
          hours = 24;
        }
      }
    }

    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
  }, 1000);
}

/* --------------------------------------------------------------------------
   8. NEWSLETTER SUBSCRIPTION FORM
   -------------------------------------------------------------------------- */
function initNewsletterForm() {
  const form = document.getElementById("newsletterForm");
  const emailInput = document.getElementById("newsletterEmail");

  if (!form || !emailInput) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    if (email && email.includes("@")) {
      showToast("Subscribed! 🚀", "Thank you for joining the Nova Circle.");
      emailInput.value = "";
    } else {
      showToast("Invalid Email", "Please enter a valid email address.");
    }
  });
}

/* --------------------------------------------------------------------------
   9. TOAST NOTIFICATION SYSTEM
   -------------------------------------------------------------------------- */
function showToast(title, message) {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <div class="toast-icon">
      <i class="fa-solid fa-check"></i>
    </div>
    <div class="toast-content">
      <strong>${title}</strong>
      <span>${message}</span>
    </div>
  `;

  container.appendChild(toast);

  // Trigger show transition
  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  // Auto remove after 3.5 seconds
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 3500);
}

