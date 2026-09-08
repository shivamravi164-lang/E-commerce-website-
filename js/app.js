/* ==========================================================================
   Velora — App shell: header, footer, cart/wishlist state, product cards
   ========================================================================== */

const LS_CART = "velora_cart";
const LS_WISHLIST = "velora_wishlist";
const LS_USER = "velora_user";
const LS_COUPON = "velora_coupon";

/* ---------------- Storage helpers ---------------- */
function getCart() {
  try { return JSON.parse(localStorage.getItem(LS_CART)) || []; } catch (e) { return []; }
}
function setCart(cart) {
  localStorage.setItem(LS_CART, JSON.stringify(cart));
  updateHeaderCounts();
}
function getWishlist() {
  try { return JSON.parse(localStorage.getItem(LS_WISHLIST)) || []; } catch (e) { return []; }
}
function setWishlist(list) {
  localStorage.setItem(LS_WISHLIST, JSON.stringify(list));
  updateHeaderCounts();
}
function getUser() {
  try { return JSON.parse(localStorage.getItem(LS_USER)); } catch (e) { return null; }
}

function cartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}
function wishlistCount() {
  return getWishlist().length;
}

function addToCart(id, qty = 1, opts = {}) {
  const cart = getCart();
  const key = id + "|" + (opts.size || "") + "|" + (opts.color || "");
  const existing = cart.find(i => (i.id + "|" + (i.size || "") + "|" + (i.color || "")) === key);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: Number(id), qty, size: opts.size || null, color: opts.color || null });
  }
  setCart(cart);
  const p = getProductById(id);
  showToast(`${p ? p.name : "Item"} added to cart`);
}

function removeFromCart(id, size, color) {
  let cart = getCart();
  cart = cart.filter(i => !(i.id === Number(id) && i.size === size && i.color === color));
  setCart(cart);
}

function updateCartQty(id, size, color, qty) {
  const cart = getCart();
  const item = cart.find(i => i.id === Number(id) && i.size === size && i.color === color);
  if (item) {
    item.qty = Math.max(1, qty);
    setCart(cart);
  }
}

function toggleWishlist(id) {
  let list = getWishlist();
  id = Number(id);
  const p = getProductById(id);
  if (list.includes(id)) {
    list = list.filter(x => x !== id);
    showToast(`${p ? p.name : "Item"} removed from wishlist`);
  } else {
    list.push(id);
    showToast(`${p ? p.name : "Item"} added to wishlist`);
  }
  setWishlist(list);
  document.querySelectorAll(`.wish-btn[data-id="${id}"]`).forEach(btn => btn.classList.toggle("active", list.includes(id)));
  if (typeof renderWishlistPage === "function") renderWishlistPage();
}

/* ---------------- Toast ---------------- */
function showToast(msg) {
  let toast = document.getElementById("velora-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "velora-toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove("show"), 2200);
}

/* ---------------- Icons ---------------- */
const ICONS = {
  search: `<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  user: `<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  heart: `<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>`,
  bag: `<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
  menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>`,
  truck: `<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="6" width="15" height="12" rx="1"/><path d="M16 10h4l3 3v5h-7z"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="19" r="2"/></svg>`,
  refresh: `<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.5 15a9 9 0 1 0 2-9.4L1 10"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 4 5v6c0 5 3.4 9 8 11 4.6-2 8-6 8-11V5z"/></svg>`,
  fb: `<svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M14 9h3V6h-3a4 4 0 0 0-4 4v2H7v3h3v6h3v-6h3l1-3h-4v-2a1 1 0 0 1 1-1Z"/></svg>`,
  ig: `<svg viewBox="0 0 24 24" fill="none" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>`,
  tw: `<svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M22 5.9c-.7.3-1.5.6-2.3.7a4 4 0 0 0 1.8-2.2 8 8 0 0 1-2.5 1 4 4 0 0 0-6.9 3.6A11.4 11.4 0 0 1 3.9 4.6a4 4 0 0 0 1.3 5.4c-.6 0-1.2-.2-1.7-.5v.1a4 4 0 0 0 3.2 4 4 4 0 0 1-1.8.1 4 4 0 0 0 3.8 2.8A8 8 0 0 1 2 18.4a11.3 11.3 0 0 0 6.2 1.8c7.4 0 11.5-6.2 11.5-11.5v-.5A8 8 0 0 0 22 5.9Z"/></svg>`,
};

/* ---------------- Header / Footer ---------------- */
function headerHTML(active) {
  const nav = [
    ["index.html", "Home", "index"],
    ["shop.html", "Shop", "shop"],
    ["shop.html", "Categories", "categories"],
    ["deals.html", "Deals", "deals"],
    ["index.html#about", "About", "about"],
    ["index.html#contact", "Contact", "contact"],
  ];
  const navHTML = nav.map(([href, label, key]) =>
    `<a href="${href}" class="${active === key ? "active" : ""}">${label}</a>`).join("");

  return `
  <div class="topbar">
    <div class="container">
      <span>Free delivery on orders over ₹999 · Easy 7-day returns</span>
      <a href="deals.html">Today's Deals →</a>
    </div>
  </div>
  <header class="site-header">
    <div class="container header-row">
      <a href="index.html" class="logo">Velor<span>a</span></a>
      <nav class="main-nav">${navHTML}</nav>
      <form class="search-form" id="global-search-form" role="search">
        <input type="search" id="global-search-input" placeholder="Search for products, brands and more" aria-label="Search products">
        <button type="submit" aria-label="Search">${ICONS.search}</button>
      </form>
      <div class="header-actions">
        <a href="login.html" class="icon-link">${ICONS.user}<span id="account-label">Account</span></a>
        <a href="wishlist.html" class="icon-link">${ICONS.heart}<span>Wishlist</span><span class="badge" id="wishlist-badge">0</span></a>
        <a href="cart.html" class="icon-link">${ICONS.bag}<span>Cart</span><span class="badge" id="cart-badge">0</span></a>
        <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Open menu">${ICONS.menu}</button>
      </div>
    </div>
    <div class="category-strip">
      <div class="container" id="category-strip-inner"></div>
    </div>
  </header>
  <div class="drawer-overlay" id="drawer-overlay"></div>
  <aside class="mobile-drawer" id="mobile-drawer">
    ${nav.map(([href, label]) => `<a href="${href}">${label}</a>`).join("")}
    <a href="login.html">Login / Register</a>
    <a href="wishlist.html">Wishlist</a>
    <a href="cart.html">Cart</a>
  </aside>`;
}

function footerHTML() {
  return `
  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <div class="logo">Velor<span>a</span></div>
        <p>Thoughtfully curated products, honest pricing, and fast delivery — everything you need, nothing you don't.</p>
        <div class="social-row">
          <a href="#" aria-label="Facebook">${ICONS.fb}</a>
          <a href="#" aria-label="Instagram">${ICONS.ig}</a>
          <a href="#" aria-label="Twitter">${ICONS.tw}</a>
        </div>
      </div>
      <div>
        <h4>Velora</h4>
        <ul>
          <li><a href="index.html#about">About Velora</a></li>
          <li><a href="#">Careers</a></li>
          <li><a href="index.html#contact">Contact Us</a></li>
          <li><a href="deals.html">Today's Deals</a></li>
        </ul>
      </div>
      <div>
        <h4>Customer Service</h4>
        <ul>
          <li><a href="#">Help Center</a></li>
          <li><a href="#">Track Order</a></li>
          <li><a href="#">Return Policy</a></li>
          <li><a href="#">Shipping Information</a></li>
        </ul>
      </div>
      <div>
        <h4>Policies</h4>
        <ul>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms &amp; Conditions</a></li>
          <li><a href="#">Refund Policy</a></li>
          <li><a href="#">Cookie Policy</a></li>
        </ul>
      </div>
      <div>
        <h4>Stay in the loop</h4>
        <p style="font-size:.85rem;margin-bottom:12px;">Subscribe for new arrivals and members-only offers.</p>
        <form class="footer-newsletter" onsubmit="event.preventDefault(); showToast('Subscribed! Welcome to Velora.'); this.reset();">
          <div class="form-field"><input type="email" required placeholder="you@email.com"></div>
          <button class="btn btn-brass btn-block btn-sm" type="submit">Subscribe</button>
        </form>
      </div>
    </div>
    <div class="container footer-bottom">
      <span>© 2026 Velora Retail Pvt. Ltd. All rights reserved.</span>
      <div class="pay-icons"><span>COD</span><span>UPI</span><span>Cards</span><span>Net Banking</span></div>
    </div>
  </footer>`;
}

function renderShell(active) {
  const h = document.getElementById("site-header");
  const f = document.getElementById("site-footer");
  if (h) h.innerHTML = headerHTML(active);
  if (f) f.innerHTML = footerHTML();

  const strip = document.getElementById("category-strip-inner");
  if (strip) {
    strip.innerHTML = CATEGORIES.map(c => `<a href="shop.html?category=${c.id}">${c.label}</a>`).join("");
  }

  updateHeaderCounts();
  bindShellEvents();
}

function updateHeaderCounts() {
  const cb = document.getElementById("cart-badge");
  const wb = document.getElementById("wishlist-badge");
  if (cb) cb.textContent = cartCount();
  if (wb) wb.textContent = wishlistCount();
  const acc = document.getElementById("account-label");
  const user = getUser();
  if (acc && user) acc.textContent = user.name.split(" ")[0];
}

function bindShellEvents() {
  const form = document.getElementById("global-search-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const q = document.getElementById("global-search-input").value.trim();
      window.location.href = "shop.html?q=" + encodeURIComponent(q);
    });
  }
  const menuBtn = document.getElementById("mobile-menu-btn");
  const drawer = document.getElementById("mobile-drawer");
  const overlay = document.getElementById("drawer-overlay");
  if (menuBtn && drawer && overlay) {
    menuBtn.addEventListener("click", () => { drawer.classList.add("open"); overlay.classList.add("open"); });
    overlay.addEventListener("click", () => { drawer.classList.remove("open"); overlay.classList.remove("open"); });
  }
}

/* ---------------- Star rating ---------------- */
function starString(rating) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  let s = "★".repeat(full);
  if (half) s += "½";
  s += "☆".repeat(5 - full - (half ? 1 : 0));
  return s;
}

/* ---------------- Product card ---------------- */
function productCardHTML(p) {
  const wished = getWishlist().includes(p.id);
  return `
  <div class="product-card" data-id="${p.id}">
    <div class="product-thumb">
      <a href="product.html?id=${p.id}"><img src="${p.image}" alt="${p.name}" loading="lazy"></a>
      ${p.discount ? `<span class="discount-tag">${p.discount}% OFF</span>` : ""}
      <button class="wish-btn ${wished ? "active" : ""}" data-id="${p.id}" aria-label="Toggle wishlist" onclick="toggleWishlist(${p.id})">${ICONS.heart}</button>
      <button class="quick-view-btn" onclick="openQuickView(${p.id})">Quick View</button>
    </div>
    <div class="product-body">
      <span class="product-brand">${p.brand}</span>
      <a href="product.html?id=${p.id}"><h3 class="product-name">${p.name}</h3></a>
      <div class="product-rating"><span class="stars">${starString(p.rating)}</span> ${p.rating} <span>(${p.reviews})</span></div>
      <div class="price-row">
        <span class="price-final">${money(p.finalPrice)}</span>
        ${p.discount ? `<span class="price-orig">${money(p.price)}</span><span class="price-pct">${p.discount}% off</span>` : ""}
      </div>
      <div class="product-actions">
        <button class="btn btn-outline" onclick="addToCart(${p.id})">Add to Cart</button>
        <button class="btn btn-primary" onclick="location.href='checkout.html?buy=${p.id}'">Buy Now</button>
      </div>
    </div>
  </div>`;
}

function renderProductGrid(containerId, products) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (!products.length) {
    el.innerHTML = `<div class="empty-state"><h3>No products found</h3><p>Try adjusting your search or filters.</p></div>`;
    return;
  }
  el.innerHTML = products.map(productCardHTML).join("");
}

/* ---------------- Quick view modal ---------------- */
function ensureModal() {
  let m = document.getElementById("quick-view-modal");
  if (!m) {
    m = document.createElement("div");
    m.className = "modal-overlay";
    m.id = "quick-view-modal";
    m.innerHTML = `<div class="modal-box" id="quick-view-box"></div>`;
    m.addEventListener("click", (e) => { if (e.target === m) closeQuickView(); });
    document.body.appendChild(m);
  }
  return m;
}
function openQuickView(id) {
  const p = getProductById(id);
  if (!p) return;
  const m = ensureModal();
  document.getElementById("quick-view-box").innerHTML = `
    <button class="modal-close" onclick="closeQuickView()">✕</button>
    <div class="modal-body-grid">
      <img src="${p.image}" alt="${p.name}">
      <div>
        <span class="product-brand">${p.brand}</span>
        <h3 class="pd-title" style="font-size:1.4rem;">${p.name}</h3>
        <div class="product-rating"><span class="stars">${starString(p.rating)}</span> ${p.rating} (${p.reviews} reviews)</div>
        <div class="price-row" style="margin:12px 0;">
          <span class="price-final">${money(p.finalPrice)}</span>
          ${p.discount ? `<span class="price-orig">${money(p.price)}</span><span class="price-pct">${p.discount}% off</span>` : ""}
        </div>
        <p>${p.description}</p>
        <div class="pd-cta-row" style="margin-top:16px;">
          <button class="btn btn-outline" onclick="addToCart(${p.id})">Add to Cart</button>
          <button class="btn btn-primary" onclick="location.href='checkout.html?buy=${p.id}'">Buy Now</button>
        </div>
        <a href="product.html?id=${p.id}" class="view-all" style="display:inline-block;margin-top:14px;">View full details →</a>
      </div>
    </div>`;
  m.classList.add("open");
}
function closeQuickView() {
  const m = document.getElementById("quick-view-modal");
  if (m) m.classList.remove("open");
}

document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeQuickView(); });
