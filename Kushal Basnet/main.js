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

  /* ----------------------------------------------------
   * Sample Product Data (Unsplash Images)
   * ---------------------------------------------------- */
  function SAMPLE_PRODUCTS() {
    return [
      {
        id: 'p1',
        name: 'Reebok Dart Men\'s',
        price: 1298,
        short: 'Lightweight running shoe',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=60'
      },
      {
        id: 'p2',
        name: 'Mi LED TV 4A PRO 32',
        price: 1289,
        short: '32-inch HD LED TV',
        image: 'https://images.unsplash.com/photo-1585386959984-a415522c70f4?auto=format&fit=crop&w=800&q=60'
      },
      {
        id: 'p3',
        name: 'Xbox Series X',
        price: 499.99,
        short: 'Latest-gen console',
        image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=60'
      },
      {
        id: 'p4',
        name: 'Classic Watch',
        price: 259.99,
        short: 'Stylish analog watch',
        image: 'https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=60'
      },
      {
        id: 'p5',
        name: 'Travel Backpack',
        price: 129.00,
        short: 'Durable daypack',
        image: 'https://images.unsplash.com/photo-1542293787938-c9e299b88033?auto=format&fit=crop&w=800&q=60'
      },
      {
        id: 'p6',
        name: 'Running Shoes',
        price: 109.00,
        short: 'Comfort & performance',
        image: 'https://images.unsplash.com/photo-1528701800489-4760d1bd5f53?auto=format&fit=crop&w=800&q=60'
      }
    ];
  }
});

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