// js/main.js
document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------
   * 1) Load Header into Any Page with #header
   * ---------------------------------------------------- */
  fetch('header.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('header').innerHTML = html;
      attachNavCartCount();
    })
    .catch(() => {
      // Header load failure fallback
    });

  /* ----------------------------------------------------
   * 2) Populate Featured Products on index.html
   * ---------------------------------------------------- */
  const featuredContainer = document.getElementById('featured-products');
  if (featuredContainer) {
    const featured = SAMPLE_PRODUCTS().slice(0, 3);
    featured.forEach(product => {
      featuredContainer.appendChild(productCard(product));
    });
  }

  /* ----------------------------------------------------
   * 3) Populate All Products on products.html
   * ---------------------------------------------------- */
  const productList = document.getElementById('product-list');
  if (productList) {
    const allProducts = SAMPLE_PRODUCTS();
    allProducts.forEach(product => {
      const col = document.createElement('div');
      col.className = 'col-lg-4 col-md-6 mb-4';

      const card = productCard(product);
      card.classList.add('h-100');

      col.appendChild(card);
      productList.appendChild(col);
    });
  }

  /* ----------------------------------------------------
   * Helper: Create Product Card
   * ---------------------------------------------------- */
  function productCard(product) {
    const el = document.createElement('div');
    el.className = 'card product-card shadow-sm';
    el.innerHTML = `
      <img src="${product.image}" class="card-img-top" alt="${product.name}">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">${product.name}</h5>
        <p class="card-text small text-muted">${product.short}</p>
        <div class="mt-auto d-flex justify-content-between align-items-center">
          <strong>$${product.price.toFixed(2)}</strong>
          <div>
            <button class="btn btn-sm btn-outline-secondary me-2 view-btn">View</button>
            <button class="btn btn-sm btn-primary add-btn">Add</button>
          </div>
        </div>
      </div>
    `;

    // Event listeners
    el.querySelector('.add-btn').addEventListener('click', () => addToCart(product));
    el.querySelector('.view-btn').addEventListener('click', () => {
      alert(`${product.name}\n\nPrice: $${product.price.toFixed(2)}\n\n${product.short}`);
    });

    return el;
  }

  /* ----------------------------------------------------
   * Helper: Add Product to Cart
   * ---------------------------------------------------- */
  function addToCart(product) {
    const key = 'wearit_cart';
    const cart = JSON.parse(localStorage.getItem(key)) || [];

    const found = cart.find(item => item.id === product.id);
    if (found) {
      found.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }

    localStorage.setItem(key, JSON.stringify(cart));
    attachNavCartCount();

    // Toast notification
    const toast = document.createElement('div');
    toast.className = 'toast align-items-center text-bg-success border-0';
    toast.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">Added ${product.name} to basket</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>
    `;

    document.body.appendChild(toast);
    const bsToast = bootstrap.Toast.getOrCreateInstance(toast);
    bsToast.show();

    setTimeout(() => toast.remove(), 3500);
  }

  /* ----------------------------------------------------
   * Helper: Update Cart Count in Nav
   * ---------------------------------------------------- */
  function attachNavCartCount() {
    const cart = JSON.parse(localStorage.getItem('wearit_cart')) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);

    let badge = document.getElementById('nav-cart-count');
    if (!badge) {
      const basketLink = document.querySelector('a[href="basket.html"]');
      if (basketLink) {
        const span = document.createElement('span');
        span.id = 'nav-cart-count';
        span.className = 'badge bg-danger ms-2';
        span.textContent = count;
        basketLink.appendChild(span);
      }
    } else {
      badge.textContent = count;
    }
  }


<!-- jQuery CDN -->
$(document).ready(function () {
    $('form').on('submit', function (e) {
      e.preventDefault(); // Prevent actual form submission

      // Get form values
      const name = $('#name').val().trim();
      const email = $('#email').val().trim();
      const message = $('#message').val().trim();

      // Simple validation
      if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }

    // Simulate form submission (e.g., AJAX or local feedback)
    alert(`Thank you, ${name}! Your message has been sent.`);

    // Optionally reset form
$(this)[0].reset();
});
});