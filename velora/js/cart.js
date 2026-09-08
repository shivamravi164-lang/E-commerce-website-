/* ==========================================================================
   Velora — Cart logic (used on cart.html; totals helper reused on checkout)
   ========================================================================== */

const COUPONS = {
  "VELORA10": { type: "pct", value: 10, label: "10% off" },
  "SAVE20":   { type: "pct", value: 20, cap: 800, label: "20% off (up to ₹800)" },
  "WELCOME50": { type: "flat", value: 50, label: "₹50 off" },
};

const FREE_DELIVERY_THRESHOLD = 999;
const DELIVERY_CHARGE = 79;

function getAppliedCoupon() {
  try { return JSON.parse(localStorage.getItem(LS_COUPON)); } catch (e) { return null; }
}
function setAppliedCoupon(code) {
  if (code) localStorage.setItem(LS_COUPON, JSON.stringify(code));
  else localStorage.removeItem(LS_COUPON);
}

function cartLineItems() {
  return getCart().map(item => {
    const p = getProductById(item.id);
    return p ? { ...item, product: p, lineTotal: p.finalPrice * item.qty } : null;
  }).filter(Boolean);
}

function calcTotals(items) {
  const subtotal = items.reduce((s, i) => s + i.lineTotal, 0);
  const mrpTotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const productDiscount = mrpTotal - subtotal;

  let couponDiscount = 0;
  const couponCode = getAppliedCoupon();
  if (couponCode && COUPONS[couponCode]) {
    const c = COUPONS[couponCode];
    if (c.type === "pct") {
      couponDiscount = Math.round((subtotal * c.value) / 100);
      if (c.cap) couponDiscount = Math.min(couponDiscount, c.cap);
    } else {
      couponDiscount = c.value;
    }
    couponDiscount = Math.min(couponDiscount, subtotal);
  }

  const afterCoupon = subtotal - couponDiscount;
  const delivery = subtotal === 0 || afterCoupon >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE;
  const finalTotal = afterCoupon + delivery;

  return { subtotal, mrpTotal, productDiscount, couponDiscount, delivery, finalTotal, couponCode };
}

/* ---------------- Cart page rendering ---------------- */
function renderCartPage() {
  const listEl = document.getElementById("cart-items-list");
  const items = cartLineItems();

  if (!items.length) {
    listEl.innerHTML = `<div class="empty-state">
      <h3>Your cart is empty</h3>
      <p>Looks like you haven't added anything yet.</p>
      <a href="shop.html" class="btn btn-primary">Continue Shopping</a>
    </div>`;
  } else {
    listEl.innerHTML = items.map(i => `
      <div class="cart-item">
        <img src="${i.product.image}" alt="${i.product.name}">
        <div>
          <a href="product.html?id=${i.product.id}"><div class="cart-item-name">${i.product.name}</div></a>
          <div class="cart-item-meta">${i.size ? `Size: ${i.size} · ` : ""}${i.color ? `Color: ${i.color} · ` : ""}${money(i.product.finalPrice)} each</div>
          <a class="cart-item-remove" onclick="removeFromCart(${i.id}, ${i.size ? `'${i.size}'` : null}, ${i.color ? `'${i.color}'` : null}); renderCartPage();">Remove</a>
        </div>
        <div class="qty-selector">
          <button onclick="updateCartQty(${i.id}, ${i.size ? `'${i.size}'` : null}, ${i.color ? `'${i.color}'` : null}, ${i.qty - 1}); renderCartPage();">−</button>
          <span>${i.qty}</span>
          <button onclick="updateCartQty(${i.id}, ${i.size ? `'${i.size}'` : null}, ${i.color ? `'${i.color}'` : null}, ${i.qty + 1}); renderCartPage();">+</button>
        </div>
        <div class="cart-item-price">${money(i.lineTotal)}</div>
      </div>
    `).join("");
  }

  renderCartSummary(items);
}

function renderCartSummary(items) {
  const t = calcTotals(items);
  const summaryEl = document.getElementById("cart-summary");
  if (!summaryEl) return;

  summaryEl.innerHTML = `
    <h3 style="margin-bottom:18px;">Order Summary</h3>
    <div class="summary-row"><span>MRP Total</span><span>${money(t.mrpTotal)}</span></div>
    <div class="summary-row discount"><span>Product Discount</span><span>− ${money(t.productDiscount)}</span></div>
    ${t.couponCode ? `<div class="summary-row discount"><span>Coupon (${t.couponCode})</span><span>− ${money(t.couponDiscount)}</span></div>` : ""}
    <div class="summary-row"><span>Delivery</span><span>${t.delivery === 0 ? "FREE" : money(t.delivery)}</span></div>
    <div class="summary-row total"><span>Total</span><span>${money(t.finalTotal)}</span></div>
    <div class="coupon-row">
      <input type="text" id="coupon-input" placeholder="Enter coupon code" value="${t.couponCode || ""}">
      <button class="btn btn-ghost btn-sm" onclick="applyCoupon()">Apply</button>
    </div>
    <div id="coupon-msg" class="coupon-msg"></div>
    <button class="btn btn-primary btn-block" ${items.length ? "" : "disabled"} onclick="location.href='checkout.html'">Proceed to Checkout</button>
    <p style="font-size:.78rem;margin-top:12px;">Try codes: <strong>VELORA10</strong>, <strong>SAVE20</strong>, <strong>WELCOME50</strong></p>
  `;
}

function applyCoupon() {
  const input = document.getElementById("coupon-input");
  const code = input.value.trim().toUpperCase();
  const msg = document.getElementById("coupon-msg");
  if (!code) { setAppliedCoupon(null); renderCartPage(); return; }
  if (COUPONS[code]) {
    setAppliedCoupon(code);
    renderCartPage();
    setTimeout(() => {
      const m = document.getElementById("coupon-msg");
      if (m) { m.textContent = `Coupon applied — ${COUPONS[code].label}`; m.className = "coupon-msg ok"; }
    }, 0);
  } else {
    msg.textContent = "Invalid coupon code";
    msg.className = "coupon-msg err";
  }
}
