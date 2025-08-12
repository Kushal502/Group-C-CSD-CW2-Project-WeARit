// js/main.js
document.addEventListener('DOMContentLoaded', () => {

  /* ================================
   *  Helper Functions
   * ================================ */

  // Create a product card element
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

  // Add product to cart
  function addToCart(product) {
    const key = 'wearit_cart';
    const cart = JSON.parse(localStorage.getItem(key)) || [];

    const found = cart.find(item => item.id === product.id);
    if (found) {
      found.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
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
    bootstrap.Toast.getOrCreateInstance(toast).show();
    setTimeout(() => toast.remove(), 3500);
  }

  // Update cart count badge in nav
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

  /* ================================
   * 1) Load Header
   * ================================ */
  fetch('header.html')
    .then(res => {
      if (!res.ok) throw new Error('Header fetch failed');
      return res.text();
    })
    .then(html => {
      document.getElementById('header').innerHTML = html;
      attachNavCartCount();
    })
    .catch(err => {
      console.error(err);
    });

  /* ================================
   * 2) Populate Products
   * ================================ */
  const allProducts = SAMPLE_PRODUCTS();

  // Featured products
  const featuredContainer = document.getElementById('featured-products');
  if (featuredContainer) {
    allProducts.slice(0, 3).forEach(product => {
      featuredContainer.appendChild(productCard(product));
    });
  }

  // All products page
  const productList = document.getElementById('product-list');
  if (productList) {
    allProducts.forEach(product => {
      const col = document.createElement('div');
      col.className = 'col-lg-4 col-md-6 mb-4';

      const card = productCard(product);
      card.classList.add('h-100');

      col.appendChild(card);
      productList.appendChild(col);
    });
  }

});
