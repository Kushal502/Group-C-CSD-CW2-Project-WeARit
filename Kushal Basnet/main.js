// js/main.js
document.addEventListener('DOMContentLoaded', () => {
  // 1) Load header.html into any page with #header
  fetch('header.html')
    .then(r => r.text())
    .then(html => {
      document.getElementById('header').innerHTML = html;
      attachNavCartCount();
    })
    .catch(() => { /* header failure fallback */ });

  // 2) Populate featured products on index.html if container exists
  const featuredContainer = document.getElementById('featured-products');
  if (featuredContainer) {
    const featured = SAMPLE_PRODUCTS().slice(0, 3);
    featured.forEach(p => featuredContainer.appendChild(productCard(p)));
  }

  // 3) Populate full product listing on products.html
  const productList = document.getElementById('product-list');
  if (productList) {
    const all = SAMPLE_PRODUCTS();
    all.forEach(p => {
      const col = document.createElement('div');
      col.className = 'col-lg-4 col-md-6 mb-4';
      const card = productCard(p);
      card.classList.add('h-100');
      col.appendChild(card);
      productList.appendChild(col);
    });
  }

  // Helpers
  function productCard(p) {
    const el = document.createElement('div');
    el.className = 'card product-card shadow-sm';
    el.innerHTML = `
      <img src="${p.image}" class="card-img-top" alt="${p.name}">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">${p.name}</h5>
        <p class="card-text small text-muted">${p.short}</p>
        <div class="mt-auto d-flex justify-content-between align-items-center">
          <strong>$${p.price.toFixed(2)}</strong>
          <div>
            <button class="btn btn-sm btn-outline-secondary me-2 view-btn">View</button>
            <button class="btn btn-sm btn-primary add-btn">Add</button>
          </div>
        </div>
      </div>
    `;
    // actions
    el.querySelector('.add-btn').addEventListener('click', () => addToCart(p));
    el.querySelector('.view-btn').addEventListener('click', () => {
      // simple modal-less view: open product page? For now, scroll to top and flash
      alert(`${p.name}\n\nPrice: $${p.price.toFixed(2)}\n\n${p.short}`);
    });
    return el;
  }

  function addToCart(product) {
    const key = 'wearit_cart';
    const cart = JSON.parse(localStorage.getItem(key)) || [];
    const found = cart.find(i => i.id === product.id);
    if (found) found.quantity += 1;
    else cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 });
    localStorage.setItem(key, JSON.stringify(cart));
    attachNavCartCount();
    // small visual confirmation
    const toast = document.createElement('div');
    toast.className = 'toast align-items-center text-bg-success border-0';
    toast.innerHTML = `<div class="d-flex"><div class="toast-body">Added ${product.name} to basket</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button></div>`;
    document.body.appendChild(toast);
    const bs = bootstrap.Toast.getOrCreateInstance(toast);
    bs.show();
    setTimeout(() => toast.remove(), 3500);
  }

  // Update nav cart count badge if present
  function attachNavCartCount() {
    const cart = JSON.parse(localStorage.getItem('wearit_cart')) || [];
    const count = cart.reduce((s, i) => s + i.quantity, 0);
    let badge = document.getElementById('nav-cart-count');
    if (!badge) {
      // try to append a small badge into nav items after basket link
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

  // Sample product data (images from Unsplash)
  function SAMPLE_PRODUCTS() {
    return [
      { id: 'p1', name: 'Reebok Dart Men\'s', price: 1298, short: 'Lightweight running shoe', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=60' },
      { id: 'p2', name: 'Mi LED TV 4A PRO 32', price: 1289, short: '32-inch HD LED TV', image: 'https://images.unsplash.com/photo-1585386959984-a415522c70f4?auto=format&fit=crop&w=800&q=60' },
      { id: 'p3', name: 'Xbox Series X', price: 499.99, short: 'Latest-gen console', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=60' },
      { id: 'p4', name: 'Classic Watch', price: 259.99, short: 'Stylish analog watch', image: 'https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=60' },
      { id: 'p5', name: 'Travel Backpack', price: 129.00, short: 'Durable daypack', image: 'https://images.unsplash.com/photo-1542293787938-c9e299b88033?auto=format&fit=crop&w=800&q=60' },
      { id: 'p6', name: 'Running Shoes', price: 109.00, short: 'Comfort & performance', image: 'https://images.unsplash.com/photo-1528701800489-4760d1bd5f53?auto=format&fit=crop&w=800&q=60' }
    ];
  }
});