/* ==========================================================================
   Velora — Product Data
   Fictitious brands & products. Images via deterministic placeholder seeds.
   ========================================================================== */

const CATEGORIES = [
  { id: "electronics",   label: "Electronics" },
  { id: "fashion",       label: "Fashion" },
  { id: "shoes",         label: "Shoes" },
  { id: "watches",       label: "Watches" },
  { id: "beauty",        label: "Beauty" },
  { id: "home-kitchen",  label: "Home & Kitchen" },
  { id: "accessories",   label: "Accessories" },
  { id: "mobiles",       label: "Mobiles" },
  { id: "laptops",       label: "Laptops" },
  { id: "gaming",        label: "Gaming" },
];

function img(seed, w = 600, h = 600) {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}

function money(n) {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

function discountedPrice(price, discount) {
  return price - (price * discount) / 100;
}

/* Each product: id, name, category, brand, price (MRP), discount (%),
   rating (0-5), reviews (count), images[], description, specs{}, tags[] */
const PRODUCTS = [
  // ---------- Electronics ----------
  { id: 1, name: "Nimbus SoundWave Pro Headphones", category: "electronics", brand: "Nimbus", price: 6999, discount: 34, rating: 4.5, reviews: 812,
    description: "Over-ear wireless headphones with adaptive noise cancellation, 40-hour battery life, and a plush memory-foam headband built for all-day listening.",
    specs: { "Driver Size": "40mm", "Battery Life": "40 hrs", "Connectivity": "Bluetooth 5.3", "Weight": "260g" }, tags: ["trending", "featured"] },
  { id: 2, name: "Vertex PowerBank 20000mAh", category: "electronics", brand: "Vertex", price: 2499, discount: 20, rating: 4.3, reviews: 1204,
    description: "Fast-charging power bank with dual USB-C ports and a digital charge display, small enough to slip into any bag.",
    specs: { "Capacity": "20000mAh", "Output": "22.5W", "Ports": "2x USB-C, 1x USB-A" }, tags: ["bestseller"] },
  { id: 3, name: "Halcyon SmartHub Speaker", category: "electronics", brand: "Halcyon", price: 4499, discount: 15, rating: 4.1, reviews: 356,
    description: "Voice-assistant speaker with room-filling 360° sound and smart home controls for lights, plugs, and thermostats.",
    specs: { "Output": "30W", "Connectivity": "Wi-Fi, Bluetooth", "Assistant": "Built-in voice control" }, tags: [] },
  { id: 4, name: "Pulse Action Camera 4K", category: "electronics", brand: "Pulse", price: 8999, discount: 25, rating: 4.4, reviews: 289,
    description: "Rugged 4K action camera with image stabilization, waterproof housing to 10m, and a wide 170° lens for every angle.",
    specs: { "Resolution": "4K @ 60fps", "Waterproof": "10m", "Storage": "microSD up to 512GB" }, tags: ["featured"] },

  // ---------- Fashion ----------
  { id: 5, name: "Aurelia Draped Midi Dress", category: "fashion", brand: "Aurelia", price: 2799, discount: 30, rating: 4.6, reviews: 542,
    description: "A flowing midi dress in breathable crepe with a soft drape and adjustable waist tie, made for both office and evening.",
    specs: { "Fabric": "Crepe", "Fit": "Regular", "Care": "Dry clean only" }, tags: ["trending"], sizes: ["XS", "S", "M", "L", "XL"], colors: ["Emerald", "Sand", "Black"] },
  { id: 6, name: "CraftWorks Linen Overshirt", category: "fashion", brand: "CraftWorks", price: 1899, discount: 18, rating: 4.2, reviews: 210,
    description: "Relaxed-fit linen overshirt with a textured weave and horn buttons — layers easily over tees or worn open.",
    specs: { "Fabric": "100% Linen", "Fit": "Relaxed" }, tags: [], sizes: ["S", "M", "L", "XL"], colors: ["Olive", "Stone", "Navy"] },
  { id: 7, name: "Origin Tailored Trousers", category: "fashion", brand: "Origin", price: 2199, discount: 22, rating: 4.4, reviews: 176,
    description: "Straight-leg tailored trousers with a comfort waistband, cut from a mid-weight fabric that holds its shape all day.",
    specs: { "Fabric": "Poly-viscose blend", "Rise": "Mid-rise" }, tags: ["bestseller"], sizes: ["28", "30", "32", "34", "36"], colors: ["Charcoal", "Khaki"] },
  { id: 8, name: "Ember Quilted Bomber Jacket", category: "fashion", brand: "Ember", price: 3999, discount: 28, rating: 4.5, reviews: 398,
    description: "Lightweight quilted bomber with ribbed cuffs and a water-resistant shell — built for transitional weather.",
    specs: { "Shell": "Water-resistant nylon", "Lining": "Recycled polyester fill" }, tags: ["featured"], sizes: ["S", "M", "L", "XL", "XXL"], colors: ["Black", "Rust"] },

  // ---------- Shoes ----------
  { id: 9, name: "Drift Cloudlite Running Shoes", category: "shoes", brand: "Drift", price: 3499, discount: 32, rating: 4.6, reviews: 921,
    description: "Ultra-light running shoes with responsive foam cushioning and a breathable knit upper for long, easy miles.",
    specs: { "Sole": "EVA foam", "Upper": "Engineered knit", "Weight": "220g" }, tags: ["trending", "bestseller"], sizes: ["6", "7", "8", "9", "10", "11"] },
  { id: 10, name: "Origin Heritage Leather Boots", category: "shoes", brand: "Origin", price: 5499, discount: 20, rating: 4.5, reviews: 305,
    description: "Full-grain leather boots with a Goodyear-welted sole, built to be resoled and worn for years.",
    specs: { "Upper": "Full-grain leather", "Sole": "Goodyear welt" }, tags: [], sizes: ["7", "8", "9", "10", "11"] },
  { id: 11, name: "Halcyon Slip-On Loafers", category: "shoes", brand: "Halcyon", price: 2299, discount: 15, rating: 4.1, reviews: 148,
    description: "Smart-casual slip-on loafers with a cushioned footbed and a suede finish that pairs with almost anything.",
    specs: { "Upper": "Suede", "Closure": "Slip-on" }, tags: [], sizes: ["6", "7", "8", "9", "10"] },
  { id: 12, name: "Vertex Trail Hiking Shoes", category: "shoes", brand: "Vertex", price: 4299, discount: 25, rating: 4.4, reviews: 267,
    description: "Grippy lugged outsole and a reinforced toe cap make these ready for uneven trails in any weather.",
    specs: { "Sole": "Lugged rubber", "Waterproofing": "Water-resistant membrane" }, tags: ["featured"], sizes: ["7", "8", "9", "10", "11", "12"] },

  // ---------- Watches ----------
  { id: 13, name: "Solace Chrono Steel Watch", category: "watches", brand: "Solace", price: 7499, discount: 30, rating: 4.6, reviews: 431,
    description: "A stainless steel chronograph with a sapphire-coated crystal and 100m water resistance, dressy enough for the office.",
    specs: { "Case": "Stainless steel, 42mm", "Water Resistance": "100m", "Movement": "Quartz chronograph" }, tags: ["featured"] },
  { id: 14, name: "Nimbus PulseFit Smartwatch", category: "watches", brand: "Nimbus", price: 5999, discount: 35, rating: 4.3, reviews: 1089,
    description: "Track heart rate, sleep, and 100+ workouts with a bright always-on display and 10-day battery life.",
    specs: { "Display": "1.4\" AMOLED", "Battery": "10 days", "Water Resistance": "5 ATM" }, tags: ["trending", "bestseller"] },
  { id: 15, name: "Aurelia Rose Minimalist Watch", category: "watches", brand: "Aurelia", price: 3299, discount: 20, rating: 4.5, reviews: 218,
    description: "A slim rose-gold-tone watch with a mesh strap and a clean, uncluttered dial for everyday wear.",
    specs: { "Case": "Rose-gold tone, 34mm", "Strap": "Stainless mesh" }, tags: [] },
  { id: 16, name: "Ember Field Explorer Watch", category: "watches", brand: "Ember", price: 4599, discount: 18, rating: 4.2, reviews: 156,
    description: "A rugged field watch with luminous hands, a canvas strap, and a scratch-resistant mineral crystal.",
    specs: { "Case": "Matte black, 40mm", "Strap": "Canvas" }, tags: [] },

  // ---------- Beauty ----------
  { id: 17, name: "Petal & Clay Vitamin C Serum", category: "beauty", brand: "Petal & Clay", price: 899, discount: 25, rating: 4.4, reviews: 673,
    description: "A lightweight brightening serum with 15% vitamin C and hyaluronic acid to even tone and boost hydration.",
    specs: { "Volume": "30ml", "Skin Type": "All types", "Key Ingredient": "15% Vitamin C" }, tags: ["bestseller"] },
  { id: 18, name: "Petal & Clay Matte Lip Set", category: "beauty", brand: "Petal & Clay", price: 1299, discount: 30, rating: 4.5, reviews: 402,
    description: "A set of four long-wear matte lipsticks in wearable shades, formulated with shea butter for comfort.",
    specs: { "Set": "4 shades", "Finish": "Matte" }, tags: ["trending"] },
  { id: 19, name: "Bloomé Hydra Glow Face Cream", category: "beauty", brand: "Bloomé", price: 1099, discount: 20, rating: 4.3, reviews: 298,
    description: "A rich daily moisturizer with ceramides and niacinamide to strengthen the skin barrier and add glow.",
    specs: { "Volume": "50g", "Key Ingredient": "Ceramides + Niacinamide" }, tags: [] },
  { id: 20, name: "Bloomé Argan Hair Repair Oil", category: "beauty", brand: "Bloomé", price: 649, discount: 15, rating: 4.2, reviews: 187,
    description: "A fast-absorbing hair oil that smooths frizz and adds shine without weighing hair down.",
    specs: { "Volume": "100ml", "Key Ingredient": "Argan oil" }, tags: [] },

  // ---------- Home & Kitchen ----------
  { id: 21, name: "Hearthstone Ceramic Cookware Set", category: "home-kitchen", brand: "Hearthstone", price: 5499, discount: 28, rating: 4.5, reviews: 342,
    description: "A 5-piece non-stick ceramic cookware set that's PFOA-free and safe for induction, gas, and oven use.",
    specs: { "Pieces": "5", "Coating": "Ceramic non-stick", "Compatible": "Induction, gas, oven" }, tags: ["featured"] },
  { id: 22, name: "Hearthstone Pour-Over Coffee Set", category: "home-kitchen", brand: "Hearthstone", price: 1799, discount: 20, rating: 4.4, reviews: 156,
    description: "A borosilicate glass pour-over dripper with a walnut collar and a matching 600ml carafe.",
    specs: { "Material": "Borosilicate glass, walnut", "Capacity": "600ml" }, tags: [] },
  { id: 23, name: "Driftwood Linen Bedsheet Set", category: "home-kitchen", brand: "Driftwood", price: 2399, discount: 25, rating: 4.6, reviews: 489,
    description: "A breathable linen-blend bedsheet set with a fitted sheet, flat sheet, and two pillowcases that soften with every wash.",
    specs: { "Fabric": "Linen-cotton blend", "Set": "Fitted + flat + 2 pillowcases" }, tags: ["trending", "bestseller"] },
  { id: 24, name: "Hearthstone Stand Mixer", category: "home-kitchen", brand: "Hearthstone", price: 8999, discount: 22, rating: 4.5, reviews: 231,
    description: "A powerful stand mixer with a 5L bowl and three attachments for dough, batter, and whipped cream.",
    specs: { "Bowl Capacity": "5L", "Power": "600W", "Attachments": "3 included" }, tags: [] },

  // ---------- Accessories ----------
  { id: 25, name: "Origin Full-Grain Leather Wallet", category: "accessories", brand: "Origin", price: 1299, discount: 20, rating: 4.4, reviews: 267,
    description: "A slim bifold wallet in full-grain leather with six card slots and a hidden note pocket.",
    specs: { "Material": "Full-grain leather", "Slots": "6 cards + note pocket" }, tags: [] },
  { id: 26, name: "Aurelia Woven Tote Bag", category: "accessories", brand: "Aurelia", price: 1899, discount: 18, rating: 4.3, reviews: 198,
    description: "A structured woven tote with a magnetic snap closure and an interior zip pocket, roomy enough for daily essentials.",
    specs: { "Material": "Woven canvas", "Dimensions": "38 x 30 x 14 cm" }, tags: ["trending"] },
  { id: 27, name: "Solace Polarized Sunglasses", category: "accessories", brand: "Solace", price: 1599, discount: 30, rating: 4.5, reviews: 356,
    description: "Acetate-frame sunglasses with 100% UV protection and polarized lenses that cut glare on bright days.",
    specs: { "Lens": "Polarized, UV400", "Frame": "Acetate" }, tags: ["bestseller"] },
  { id: 28, name: "CraftWorks Canvas Belt", category: "accessories", brand: "CraftWorks", price: 799, discount: 15, rating: 4.1, reviews: 122,
    description: "A durable webbed canvas belt with a brushed-metal buckle, sized to trim for a perfect fit.",
    specs: { "Material": "Canvas, metal buckle" }, tags: [] },

  // ---------- Mobiles ----------
  { id: 29, name: "Vertex Nova 5G Smartphone", category: "mobiles", brand: "Vertex", price: 21999, discount: 18, rating: 4.4, reviews: 892,
    description: "A 5G smartphone with a 6.7\" AMOLED display, triple camera system, and all-day battery for power users.",
    specs: { "Display": "6.7\" AMOLED, 120Hz", "RAM/Storage": "8GB/128GB", "Battery": "5000mAh", "Camera": "50MP triple" }, tags: ["featured", "bestseller"] },
  { id: 30, name: "Pulse Edge Lite Smartphone", category: "mobiles", brand: "Pulse", price: 13999, discount: 22, rating: 4.2, reviews: 645,
    description: "A budget-friendly smartphone with a large battery, fast charging, and a smooth 90Hz display.",
    specs: { "Display": "6.5\" IPS, 90Hz", "RAM/Storage": "6GB/128GB", "Battery": "5000mAh" }, tags: ["trending"] },
  { id: 31, name: "Nimbus Aura Flip Phone", category: "mobiles", brand: "Nimbus", price: 34999, discount: 15, rating: 4.3, reviews: 210,
    description: "A folding smartphone with a compact cover display and a durable hinge tested for 200,000 folds.",
    specs: { "Display": "6.9\" foldable + 3.4\" cover", "RAM/Storage": "12GB/256GB" }, tags: [] },
  { id: 32, name: "Vertex Nova Buds Pro", category: "mobiles", brand: "Vertex", price: 3999, discount: 28, rating: 4.4, reviews: 578,
    description: "True wireless earbuds with active noise cancellation, transparency mode, and a compact charging case.",
    specs: { "Battery": "6h + 24h case", "ANC": "Yes" }, tags: ["bestseller"] },

  // ---------- Laptops ----------
  { id: 33, name: "Vertex AirBook 14", category: "laptops", brand: "Vertex", price: 54999, discount: 15, rating: 4.5, reviews: 412,
    description: "A slim 14-inch laptop with a fanless design, all-day battery life, and a crisp 2K display for everyday work.",
    specs: { "Display": "14\" 2K", "RAM/Storage": "16GB/512GB SSD", "Battery": "Up to 18 hrs" }, tags: ["featured"] },
  { id: 34, name: "Pulse StudioBook Creator", category: "laptops", brand: "Pulse", price: 84999, discount: 12, rating: 4.6, reviews: 189,
    description: "A creator laptop with a color-accurate display and a discrete GPU, built for editing and design work.",
    specs: { "Display": "15.6\" 4K", "GPU": "Discrete graphics", "RAM/Storage": "32GB/1TB SSD" }, tags: [] },
  { id: 35, name: "Nimbus FlexBook 2-in-1", category: "laptops", brand: "Nimbus", price: 47999, discount: 20, rating: 4.2, reviews: 231,
    description: "A convertible 2-in-1 laptop with a touchscreen that folds flat into tablet mode, with stylus support.",
    specs: { "Display": "13.3\" touch", "RAM/Storage": "8GB/256GB SSD" }, tags: ["trending"] },
  { id: 36, name: "Vertex WorkPro 16", category: "laptops", brand: "Vertex", price: 69999, discount: 18, rating: 4.4, reviews: 156,
    description: "A large-screen productivity laptop with a spacious keyboard, long battery life, and fast Wi-Fi 6E.",
    specs: { "Display": "16\" IPS", "RAM/Storage": "16GB/1TB SSD" }, tags: [] },

  // ---------- Gaming ----------
  { id: 37, name: "Pulse StrikePad Wireless Controller", category: "gaming", brand: "Pulse", price: 2999, discount: 25, rating: 4.5, reviews: 723,
    description: "A wireless controller with adjustable trigger stops, textured grips, and 20-hour battery life.",
    specs: { "Connectivity": "Bluetooth + 2.4GHz dongle", "Battery": "20 hrs" }, tags: ["bestseller"] },
  { id: 38, name: "Ember Ignite Mechanical Keyboard", category: "gaming", brand: "Ember", price: 4499, discount: 30, rating: 4.6, reviews: 534,
    description: "A hot-swappable mechanical keyboard with per-key RGB lighting and tactile switches built for fast inputs.",
    specs: { "Switches": "Hot-swappable tactile", "Lighting": "Per-key RGB" }, tags: ["trending", "featured"] },
  { id: 39, name: "Drift Precision Gaming Mouse", category: "gaming", brand: "Drift", price: 1999, discount: 20, rating: 4.4, reviews: 412,
    description: "A lightweight gaming mouse with a 26,000 DPI sensor and honeycomb shell for fast, precise flicks.",
    specs: { "Sensor": "26,000 DPI", "Weight": "63g" }, tags: [] },
  { id: 40, name: "Halcyon ArenaView 27\" Monitor", category: "gaming", brand: "Halcyon", price: 18999, discount: 22, rating: 4.5, reviews: 298,
    description: "A 27-inch QHD gaming monitor with a 165Hz refresh rate and 1ms response time for competitive play.",
    specs: { "Resolution": "2560x1440", "Refresh Rate": "165Hz", "Response Time": "1ms" }, tags: ["featured"] },
];

// attach images + computed price fields
PRODUCTS.forEach(p => {
  p.images = [img(p.id + "-a"), img(p.id + "-b"), img(p.id + "-c")];
  p.image = p.images[0];
  p.finalPrice = discountedPrice(p.price, p.discount);
  p.dateAdded = new Date(2026, 7, (p.id % 28) + 1).getTime();
});

function getProductById(id) {
  return PRODUCTS.find(p => p.id === Number(id));
}

function getCategoryLabel(id) {
  const c = CATEGORIES.find(c => c.id === id);
  return c ? c.label : id;
}
