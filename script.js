/**
 * SWEET BITE — Complete Application Logic
 * Supports index.html (Storefront, Cart, Checkout, Receipts)
 * and admin.html (PIN Security, Menu Management, File Uploads, Order Logs)
 */

const WHATSAPP_NUMBER = '8801976251128';
const DEFAULT_DELIVERY_FEE = 50;
const FREE_DELIVERY_THRESHOLD = 800;

// Available Promo Codes
const PROMO_CODES = {
  'SWEET10': { type: 'percent', value: 10, label: '10% OFF' },
  'SWEET50': { type: 'flat', value: 50, minSubtotal: 300, label: '৳50 OFF' },
  'FREEDEL': { type: 'freedelivery', label: 'Free Delivery' }
};

// Initial Comprehensive Menu (Desserts, Fast Food, Pizzas, Main Course & Beverages)
const DEFAULT_MENU = [
  // --- FAST FOOD & SNACKS ---
  {
    id: 'sb-1',
    name: 'Crispy Chicken Burger',
    price: 220,
    category: 'Fast Food',
    tag: "Chef's Special",
    description: 'Crispy seasoned chicken fillet with fresh crunchy iceberg lettuce, creamy mayonnaise, and house secret sauce in a warm brioche bun.',
    image: 'Chicken Burger.JPG',
    inStock: true
  },
  {
    id: 'sb-2',
    name: 'Smoky BBQ Beef Burger',
    price: 290,
    category: 'Fast Food',
    tag: 'Best Seller',
    description: 'Grilled juicy beef patty smothered in rich smoky BBQ sauce, melted cheddar cheese, caramelized onions, and crisp pickles.',
    image: 'BBQ Beef Burger.jpg',
    inStock: true
  },
  {
    id: 'sb-3',
    name: 'Crispy Peri-Peri Wings',
    price: 230,
    category: 'Fast Food',
    tag: 'Spicy',
    description: 'Golden fried chicken wings tossed in tangy hot peri-peri glaze, served with a side of creamy garlic mayo dip.',
    image: 'Crispy Chicken Wings.jpg',
    inStock: true
  },
  {
    id: 'sb-4',
    name: 'Loaded Cheesy Fries',
    price: 180,
    category: 'Fast Food',
    tag: 'Popular',
    description: 'Crisp golden French fries drenched in warm melted cheddar cheese sauce, topped with spicy jalapeño slices and herbs.',
    image: 'Loaded Cheesy Fries.jpg',
    inStock: true
  },
  {
    id: 'sb-5',
    name: 'Grand Club Sandwich',
    price: 240,
    category: 'Fast Food',
    tag: "Chef's Special",
    description: 'Triple-decker toasted sandwich layered with smoked chicken slices, fried egg, cheese, sliced tomatoes, and honey mustard.',
    image: 'Club Sandwich.jpg',
    inStock: true
  },

  // --- PIZZAS & PASTA ---
  {
    id: 'sb-6',
    name: 'Cheese Burst Pizza',
    price: 450,
    category: 'Pizza',
    tag: 'Best Seller',
    description: 'Loaded with double layers of 100% pure mozzarella cheese, rich Italian herb tomato sauce, fresh basil, and oregano on a hand-tossed crust.',
    image: 'Chese Pizza.JPG',
    inStock: true
  },
  {
    id: 'sb-7',
    name: 'Smoky BBQ Chicken Pizza',
    price: 480,
    category: 'Pizza',
    tag: "Chef's Special",
    description: 'Stone-baked pizza topped with tender grilled chicken chunks, red onions, sweet bell peppers, melted mozzarella, and smoky barbecue swirl.',
    image: 'BBQ Chicken Pizza.jpg',
    inStock: true
  },
  {
    id: 'sb-8',
    name: 'Creamy Alfredo Pasta',
    price: 260,
    category: 'Pizza',
    tag: 'Vegetarian',
    description: 'Penne pasta gently simmered in a velvety garlic parmesan Alfredo cream sauce with sautéed button mushrooms and cracked black pepper.',
    image: 'White Sauce Pasta.jpg',
    inStock: true
  },

  // --- MAIN COURSE & TRADITIONAL ---
  {
    id: 'sb-9',
    name: 'Royal Chicken Biriyani',
    price: 280,
    category: 'Main Course',
    tag: 'Popular',
    description: 'Authentic aromatic basmati rice cooked on slow dum with tender marinated chicken, golden saffron potatoes, and boiled egg.',
    image: 'Chicken Biriyani.jpg',
    inStock: true
  },
  {
    id: 'sb-10',
    name: 'Mutton Kacchi Biriyani',
    price: 380,
    category: 'Main Course',
    tag: "Chef's Special",
    description: 'Traditional celebratory feast featuring tender slow-cooked mutton, fragrant chinigura rice, rich ghee, saffron, and sweet aloo bukhara.',
    image: 'Mutton Kacchi Biriyani.jpg',
    inStock: true
  },
  {
    id: 'sb-11',
    name: 'Butter Chicken with Naan',
    price: 320,
    category: 'Main Course',
    tag: 'Best Seller',
    description: 'Succulent tandoori chicken simmered in a silky tomato, butter, and cashew makhani gravy, served with fluffy garlic butter naan.',
    image: 'Butter Chicken.jpg',
    inStock: true
  },

  // --- DESSERTS & BAKERY ---
  {
    id: 'sb-12',
    name: 'Death by Chocolate Fudge Cake',
    price: 240,
    category: 'Dessert',
    tag: 'Best Seller',
    description: 'Ultra-moist Belgian dark chocolate sponge layered with thick velvety fudge ganache and dark chocolate curls. Pure chocolate bliss!',
    image: 'Chocolate Fudge Cake.jpg',
    inStock: true
  },
  {
    id: 'sb-13',
    name: 'New York Strawberry Cheesecake',
    price: 280,
    category: 'Dessert',
    tag: "Chef's Special",
    description: 'Classic dense and creamy baked New York cheesecake resting on a buttery biscuit base, crowned with glazed strawberry compote.',
    image: 'Strawberry Cheesecake.jpg',
    inStock: true
  },
  {
    id: 'sb-14',
    name: 'Red Velvet Pastry',
    price: 220,
    category: 'Dessert',
    tag: 'Popular',
    description: 'Soft crimson cocoa sponge layered with delicate whipped cream cheese frosting and sprinkled with fine red velvet crumbs.',
    image: 'Red Velvet Pastry.jpg',
    inStock: true
  },
  {
    id: 'sb-15',
    name: 'Belgian Nutella Waffle',
    price: 250,
    category: 'Dessert',
    tag: 'Best Seller',
    description: 'Freshly baked golden waffle with crispy edges, smothered in warm melted Nutella spread, toasted crushed nuts, and whipped cream.',
    image: 'Belgian Waffle.jpg',
    inStock: true
  },
  {
    id: 'sb-16',
    name: 'Warm Fudgy Brownie with Ice Cream',
    price: 210,
    category: 'Dessert',
    tag: "Chef's Special",
    description: 'Oven-warmed dense chocolate walnut brownie served with a scoop of premium vanilla bean ice cream and hot chocolate drizzle.',
    image: 'Fudgy Brownie.jpg',
    inStock: true
  },

  // --- BEVERAGES & ARTISAN COFFEE ---
  {
    id: 'sb-17',
    name: 'Caramel Coffee Latte',
    price: 160,
    category: 'Coffee & Drinks',
    tag: '',
    description: 'Freshly pulled espresso shot combined with velvety steamed milk and a golden swirl of artisanal caramel sauce.',
    image: 'Coffee Latte.jpeg',
    inStock: true
  },
  {
    id: 'sb-18',
    name: 'Iced Cold Coffee',
    price: 130,
    category: 'Coffee & Drinks',
    tag: 'Best Seller',
    description: 'Chilled creamy blended coffee topped with rich Belgian chocolate syrup drizzle and ice cubes. The ultimate thirst quencher!',
    image: 'Cold Coffee.jpg',
    inStock: true
  },
  {
    id: 'sb-19',
    name: 'Fresh Strawberry Milkshake',
    price: 170,
    category: 'Coffee & Drinks',
    tag: 'Popular',
    description: 'Thick creamy milkshake whipped with ripe strawberries, pure ice cream, and topped with whipped cream and strawberry sauce.',
    image: 'Strawberry Milkshake.jpg',
    inStock: true
  },
  {
    id: 'sb-20',
    name: 'Zesty Lemon Mint Mojito',
    price: 140,
    category: 'Coffee & Drinks',
    tag: 'Popular',
    description: 'Refreshing sparkling cooler packed with muddled fresh garden mint, zesty lime wedges, simple syrup, and sparkling soda.',
    image: 'Lemon Mint Mojito.jpg',
    inStock: true
  }
];

window.DEFAULT_MENU = DEFAULT_MENU;

// ==========================================================
// STORAGE & UTILITY HELPERS
// ==========================================================

function readMenu() {
  try {
    const raw = localStorage.getItem('sweetbite_menu');
    if (!raw) {
      saveMenu(DEFAULT_MENU);
      return DEFAULT_MENU;
    }
    let parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) parsed = [];

    // Auto-merge new default dishes if missing from existing storage
    let updated = false;
    DEFAULT_MENU.forEach(defItem => {
      const exists = parsed.some(p => p.name.toLowerCase() === defItem.name.toLowerCase() || p.id === defItem.id);
      if (!exists) {
        parsed.push(defItem);
        updated = true;
      }
    });

    if (updated) {
      saveMenu(parsed);
    }
    return parsed;
  } catch (e) {
    console.error('Failed to parse menu from localStorage:', e);
    return DEFAULT_MENU;
  }
}

function saveMenu(menu) {
  localStorage.setItem('sweetbite_menu', JSON.stringify(menu));
}

function readCart() {
  try {
    return JSON.parse(localStorage.getItem('sweetbite_cart') || '[]');
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem('sweetbite_cart', JSON.stringify(cart));
}

function readOrders() {
  try {
    return JSON.parse(localStorage.getItem('sweetbite_orders') || '[]');
  } catch (e) {
    return [];
  }
}

function saveOrders(orders) {
  localStorage.setItem('sweetbite_orders', JSON.stringify(orders));
}

function getActiveCoupon() {
  return sessionStorage.getItem('sweetbite_active_coupon') || null;
}

function setActiveCoupon(code) {
  if (code) {
    sessionStorage.setItem('sweetbite_active_coupon', code);
  } else {
    sessionStorage.removeItem('sweetbite_active_coupon');
  }
}

function getImagePath(img) {
  if (!img) return 'images/logo.jpg';
  const trimmed = img.trim();
  if (trimmed.startsWith('data:') || trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  if (trimmed.startsWith('images/')) {
    return encodeURI(trimmed);
  }
  return encodeURI(`images/${trimmed}`);
}

// Toast notification display
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  const bgClass = type === 'success' 
    ? 'bg-emerald-600' 
    : type === 'error' 
    ? 'bg-red-600' 
    : 'bg-gray-800';
  const icon = type === 'success' 
    ? 'fa-circle-check' 
    : type === 'error' 
    ? 'fa-circle-exclamation' 
    : 'fa-bell';

  toast.className = `${bgClass} text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs sm:text-sm font-semibold transform transition-all duration-300 translate-y-4 opacity-0 pointer-events-auto max-w-sm`;
  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
  });

  setTimeout(() => {
    toast.classList.add('translate-y-4', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ==========================================================
// STOREFRONT LOGIC (index.html)
// ==========================================================

const menuGrid = document.getElementById('menu-grid');
const searchInput = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearchBtn');
const sortSelect = document.getElementById('sortSelect');
const categoryPills = document.getElementById('categoryPills');
const menuCountText = document.getElementById('menuCountText');
const resetFiltersBtn = document.getElementById('resetFiltersBtn');
const emptyMenuState = document.getElementById('emptyMenuState');
const clearFiltersAction = document.getElementById('clearFiltersAction');

// Cart Drawer elements
const cartBtn = document.getElementById('cartBtn');
const cartCountBadge = document.getElementById('cartCountBadge');
const cartTotalHeader = document.getElementById('cartTotalHeader');
const floatingCartPill = document.getElementById('floatingCartPill');
const floatingCartCount = document.getElementById('floatingCartCount');
const floatingCartTotal = document.getElementById('floatingCartTotal');
const cartDrawer = document.getElementById('cartDrawer');
const cartBackdrop = document.getElementById('cartBackdrop');
const cartPanel = document.getElementById('cartPanel');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartItemsList = document.getElementById('cartItemsList');
const cartEmptyMessage = document.getElementById('cartEmptyMessage');
const cartFooter = document.getElementById('cartFooter');
const drawerItemCount = document.getElementById('drawerItemCount');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartDiscount = document.getElementById('cartDiscount');
const discountRow = document.getElementById('discountRow');
const discountCodeName = document.getElementById('discountCodeName');
const cartDeliveryFee = document.getElementById('cartDeliveryFee');
const cartGrandTotal = document.getElementById('cartGrandTotal');
const freeDeliveryLabel = document.getElementById('freeDeliveryLabel');
const freeDeliveryPercentage = document.getElementById('freeDeliveryPercentage');
const freeDeliveryProgressBar = document.getElementById('freeDeliveryProgressBar');
const couponInput = document.getElementById('couponInput');
const applyCouponBtn = document.getElementById('applyCouponBtn');
const couponMessage = document.getElementById('couponMessage');
const clearCartBtn = document.getElementById('clearCartBtn');
const browseMenuBtn = document.getElementById('browseMenuBtn');

// Checkout modal elements
const openCheckoutModalBtn = document.getElementById('openCheckoutModalBtn');
const checkoutModal = document.getElementById('checkoutModal');
const checkoutBackdrop = document.getElementById('checkoutBackdrop');
const closeCheckoutBtn = document.getElementById('closeCheckoutBtn');
const checkoutForm = document.getElementById('checkoutForm');
const checkoutTotalAmount = document.getElementById('checkoutTotalAmount');
const addressLabel = document.getElementById('addressLabel');
const custAddress = document.getElementById('custAddress');

// Digital Receipt modal elements
const receiptModal = document.getElementById('receiptModal');
const receiptBackdrop = document.getElementById('receiptBackdrop');
const closeReceiptBtn = document.getElementById('closeReceiptBtn');
const printReceiptBtn = document.getElementById('printReceiptBtn');
const resendWhatsAppBtn = document.getElementById('resendWhatsAppBtn');
let lastPlacedOrder = null;

// Quick view modal elements
const quickViewModal = document.getElementById('quickViewModal');
const quickViewBackdrop = document.getElementById('quickViewBackdrop');
const closeQuickViewBtn = document.getElementById('closeQuickViewBtn');
const qvImage = document.getElementById('qvImage');
const qvTag = document.getElementById('qvTag');
const qvCategory = document.getElementById('qvCategory');
const qvName = document.getElementById('qvName');
const qvPrice = document.getElementById('qvPrice');
const qvStockStatus = document.getElementById('qvStockStatus');
const qvDescription = document.getElementById('qvDescription');
const qvQtyMinus = document.getElementById('qvQtyMinus');
const qvQtyPlus = document.getElementById('qvQtyPlus');
const qvQtyValue = document.getElementById('qvQtyValue');
const qvAddToCartBtn = document.getElementById('qvAddToCartBtn');
let activeQuickViewItem = null;

// History modal elements
const historyBtn = document.getElementById('historyBtn');
const historyModal = document.getElementById('historyModal');
const historyBackdrop = document.getElementById('historyBackdrop');
const closeHistoryBtn = document.getElementById('closeHistoryBtn');
const historyList = document.getElementById('historyList');
const emptyHistoryMessage = document.getElementById('emptyHistoryMessage');

// State variables
let activeCategory = 'All';

// Render category pills
function renderCategoryPills() {
  if (!categoryPills) return;
  const menu = readMenu();
  const categories = ['All', ...new Set(menu.map(i => i.category).filter(Boolean))];

  categoryPills.innerHTML = '';
  categories.forEach(cat => {
    const btn = document.createElement('button');
    const isActive = cat === activeCategory;
    btn.className = `whitespace-nowrap px-4 py-2 rounded-xl font-bold transition flex items-center gap-1.5 ${
      isActive 
        ? 'bg-gradient-to-r from-rose-600 to-red-500 text-white shadow-md' 
        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
    }`;

    // Add cute icons based on category name
    let icon = 'fa-utensils';
    const lower = cat.toLowerCase();
    if (lower === 'all') icon = 'fa-border-all';
    else if (lower.includes('burger') || lower.includes('fast')) icon = 'fa-burger';
    else if (lower.includes('pizza')) icon = 'fa-pizza-slice';
    else if (lower.includes('coffee') || lower.includes('drink') || lower.includes('beverage')) icon = 'fa-mug-hot';
    else if (lower.includes('dessert') || lower.includes('cake') || lower.includes('sweet')) icon = 'fa-cake-candles';
    else if (lower.includes('biriyani') || lower.includes('rice') || lower.includes('main')) icon = 'fa-bowl-rice';

    btn.innerHTML = `<i class="fa-solid ${icon} text-xs"></i> <span>${cat}</span>`;
    btn.addEventListener('click', () => {
      activeCategory = cat;
      renderCategoryPills();
      filterAndRenderMenu();
    });
    categoryPills.appendChild(btn);
  });
}

// Filter, sort and display dishes on the storefront
function filterAndRenderMenu() {
  if (!menuGrid) return;
  const menu = readMenu();
  const query = (searchInput?.value || '').trim().toLowerCase();
  const sort = sortSelect?.value || 'featured';

  // Toggle clear search button
  if (clearSearchBtn) {
    clearSearchBtn.classList.toggle('hidden', query.length === 0);
  }

  let filtered = menu.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesQuery = !query || 
      item.name.toLowerCase().includes(query) || 
      (item.category && item.category.toLowerCase().includes(query)) ||
      (item.description && item.description.toLowerCase().includes(query));
    return matchesCategory && matchesQuery;
  });

  // Sorting
  if (sort === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === 'name-asc') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  // Count text & reset button
  if (menuCountText) {
    menuCountText.textContent = `Showing ${filtered.length} of ${menu.length} dishes`;
  }
  if (resetFiltersBtn) {
    const isFiltered = activeCategory !== 'All' || query.length > 0;
    resetFiltersBtn.classList.toggle('hidden', !isFiltered);
  }

  // Handle empty state
  if (filtered.length === 0) {
    menuGrid.innerHTML = '';
    if (emptyMenuState) emptyMenuState.classList.remove('hidden');
    return;
  }

  if (emptyMenuState) emptyMenuState.classList.add('hidden');
  menuGrid.innerHTML = '';

  filtered.forEach(item => {
    const card = document.createElement('div');
    const isInStock = item.inStock !== false;

    card.className = 'group relative bg-white rounded-2xl shadow-sm hover:shadow-xl border border-rose-100 overflow-hidden transition-all duration-300 flex flex-col hover:-translate-y-1';

    // Tag styles
    let tagBadge = '';
    if (item.tag) {
      let bg = 'bg-rose-500';
      if (item.tag.includes('Chef')) bg = 'bg-amber-500';
      if (item.tag.includes('Best')) bg = 'bg-red-500';
      if (item.tag.includes('Veg')) bg = 'bg-emerald-600';
      if (item.tag.includes('Spicy')) bg = 'bg-orange-600';
      tagBadge = `<span class="absolute top-3 left-3 z-10 ${bg} text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-md backdrop-blur-sm">${item.tag}</span>`;
    }

    card.innerHTML = `
      <!-- Card Image & Overlay -->
      <div class="relative h-48 w-full overflow-hidden bg-gray-100 cursor-pointer card-quick-view">
        ${tagBadge}
        <img 
          src="${getImagePath(item.image)}" 
          alt="${item.name}" 
          class="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
          onerror="this.src='images/logo.jpg'"
        >
        ${!isInStock ? `
          <div class="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
            <span class="bg-red-600 text-white font-extrabold text-xs px-3 py-1.5 rounded-full uppercase tracking-wider shadow">Out of Stock</span>
          </div>
        ` : `
          <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span class="bg-white/90 text-gray-900 text-xs font-bold px-3 py-1.5 rounded-xl shadow backdrop-blur flex items-center gap-1.5">
              <i class="fa-solid fa-eye text-rose-500"></i> Quick View
            </span>
          </div>
        `}
      </div>

      <!-- Card Info -->
      <div class="p-4 flex-1 flex flex-col justify-between gap-3">
        <div>
          <div class="flex items-center justify-between text-xs text-gray-400 font-semibold mb-1">
            <span>${item.category || 'Specialty'}</span>
            <span class="text-amber-500"><i class="fa-solid fa-star"></i> 4.9</span>
          </div>
          <h3 class="font-extrabold text-gray-900 text-base leading-snug group-hover:text-rose-600 transition cursor-pointer card-title">${item.name}</h3>
          <p class="text-xs text-gray-500 line-clamp-2 mt-1">${item.description || 'Prepared fresh daily with authentic Sweet Bite recipe.'}</p>
        </div>

        <!-- Price & Action -->
        <div class="flex items-center justify-between pt-2 border-t border-gray-100 mt-2">
          <div>
            <span class="text-[11px] text-gray-400 block font-medium">Price</span>
            <span class="text-lg font-extrabold text-rose-600">৳${item.price}</span>
          </div>

          ${isInStock ? `
            <button class="add-to-cart-btn bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600 text-white font-bold text-xs px-3.5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition flex items-center gap-1.5 active:scale-95">
              <i class="fa-solid fa-cart-plus"></i> Add
            </button>
          ` : `
            <button disabled class="bg-gray-100 text-gray-400 font-bold text-xs px-3.5 py-2.5 rounded-xl cursor-not-allowed">
              Sold Out
            </button>
          `}
        </div>
      </div>
    `;

    // Quick View open triggers
    card.querySelector('.card-quick-view').addEventListener('click', () => openQuickView(item));
    card.querySelector('.card-title').addEventListener('click', () => openQuickView(item));

    // Add to cart trigger
    const addBtn = card.querySelector('.add-to-cart-btn');
    if (addBtn) {
      addBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        addToCart(item, 1);
        // Visual button pop
        addBtn.innerHTML = '<i class="fa-solid fa-check"></i> Added!';
        addBtn.classList.remove('from-rose-500', 'to-red-500');
        addBtn.classList.add('bg-emerald-600');
        setTimeout(() => {
          addBtn.innerHTML = '<i class="fa-solid fa-cart-plus"></i> Add';
          addBtn.classList.add('from-rose-500', 'to-red-500');
          addBtn.classList.remove('bg-emerald-600');
        }, 1000);
      });
    }

    menuGrid.appendChild(card);
  });
}

// Reset filters
function resetFilters() {
  activeCategory = 'All';
  if (searchInput) searchInput.value = '';
  if (sortSelect) sortSelect.value = 'featured';
  renderCategoryPills();
  filterAndRenderMenu();
}

if (clearSearchBtn) clearSearchBtn.addEventListener('click', () => { searchInput.value = ''; filterAndRenderMenu(); });
if (resetFiltersBtn) resetFiltersBtn.addEventListener('click', resetFilters);
if (clearFiltersAction) clearFiltersAction.addEventListener('click', resetFilters);
if (searchInput) searchInput.addEventListener('input', filterAndRenderMenu);
if (sortSelect) sortSelect.addEventListener('change', filterAndRenderMenu);

// ==========================================================
// CART & DRAWER OPERATIONS
// ==========================================================

function openCartDrawer() {
  if (!cartDrawer) return;
  cartDrawer.classList.remove('pointer-events-none');
  cartBackdrop.classList.remove('opacity-0');
  cartPanel.classList.remove('translate-x-full');
  document.body.classList.add('overflow-hidden');
  renderCart();
}

function closeCartDrawer() {
  if (!cartDrawer) return;
  cartBackdrop.classList.add('opacity-0');
  cartPanel.classList.add('translate-x-full');
  document.body.classList.remove('overflow-hidden');
  setTimeout(() => cartDrawer.classList.add('pointer-events-none'), 300);
}

if (cartBtn) cartBtn.addEventListener('click', openCartDrawer);
if (closeCartBtn) closeCartBtn.addEventListener('click', closeCartDrawer);
if (cartBackdrop) cartBackdrop.addEventListener('click', closeCartDrawer);
if (browseMenuBtn) browseMenuBtn.addEventListener('click', closeCartDrawer);

// Floating pill for mobile
if (floatingCartPill) {
  floatingCartPill.querySelector('button').addEventListener('click', openCartDrawer);
  window.addEventListener('scroll', () => {
    const count = readCart().reduce((sum, i) => sum + i.qty, 0);
    if (count > 0 && window.scrollY > 200) {
      floatingCartPill.classList.remove('hidden');
    } else {
      floatingCartPill.classList.add('hidden');
    }
  });
}

function addToCart(item, qty = 1) {
  const cart = readCart();
  const existing = cart.find(i => i.id === item.id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      qty: qty
    });
  }
  saveCart(cart);
  updateCartBadges();
  showToast(`Added "${item.name}" to cart!`);
}

function changeCartItemQty(id, delta) {
  let cart = readCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }
  saveCart(cart);
  renderCart();
  updateCartBadges();
}

function removeCartItem(id) {
  let cart = readCart();
  cart = cart.filter(i => i.id !== id);
  saveCart(cart);
  renderCart();
  updateCartBadges();
  showToast('Item removed from cart', 'info');
}

function clearCart() {
  if (confirm('Clear all items from your cart?')) {
    saveCart([]);
    renderCart();
    updateCartBadges();
    showToast('Cart cleared', 'info');
  }
}
if (clearCartBtn) clearCartBtn.addEventListener('click', clearCart);

function calculateTotals() {
  const cart = readCart();
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  let discount = 0;
  const activeCouponCode = getActiveCoupon();
  let couponInfo = null;

  if (activeCouponCode && PROMO_CODES[activeCouponCode]) {
    const promo = PROMO_CODES[activeCouponCode];
    if (promo.type === 'percent') {
      discount = Math.round((subtotal * promo.value) / 100);
      couponInfo = promo.label;
    } else if (promo.type === 'flat') {
      if (subtotal >= (promo.minSubtotal || 0)) {
        discount = promo.value;
        couponInfo = promo.label;
      }
    } else if (promo.type === 'freedelivery') {
      couponInfo = promo.label;
    }
  }

  // Free delivery logic
  let deliveryFee = DEFAULT_DELIVERY_FEE;
  if (subtotal >= FREE_DELIVERY_THRESHOLD || (activeCouponCode === 'FREEDEL') || subtotal === 0) {
    deliveryFee = 0;
  }

  const grandTotal = Math.max(0, subtotal - discount + deliveryFee);
  return { subtotal, discount, deliveryFee, grandTotal, couponInfo, activeCouponCode };
}

function updateCartBadges() {
  const cart = readCart();
  const totalCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const { subtotal } = calculateTotals();

  if (cartCountBadge) cartCountBadge.textContent = totalCount;
  if (cartTotalHeader) cartTotalHeader.textContent = `৳${subtotal}`;
  if (floatingCartCount) floatingCartCount.textContent = totalCount;
  if (floatingCartTotal) floatingCartTotal.textContent = `৳${subtotal}`;
}

function renderCart() {
  const cart = readCart();
  const { subtotal, discount, deliveryFee, grandTotal, couponInfo, activeCouponCode } = calculateTotals();

  // Drawer header item count
  if (drawerItemCount) {
    drawerItemCount.textContent = `${cart.reduce((sum, i) => sum + i.qty, 0)} items in your cart`;
  }

  // Free Delivery Progress Bar
  if (freeDeliveryProgressBar) {
    if (subtotal >= FREE_DELIVERY_THRESHOLD) {
      freeDeliveryProgressBar.style.width = '100%';
      freeDeliveryLabel.innerHTML = '🎉 <strong>Congratulations!</strong> You unlocked FREE Delivery!';
      freeDeliveryPercentage.textContent = '100%';
    } else {
      const needed = FREE_DELIVERY_THRESHOLD - subtotal;
      const pct = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));
      freeDeliveryProgressBar.style.width = `${pct}%`;
      freeDeliveryLabel.innerHTML = `<i class="fa-solid fa-truck-fast text-rose-500 mr-1"></i> Add <strong>৳${needed}</strong> for FREE Delivery!`;
      freeDeliveryPercentage.textContent = `${pct}%`;
    }
  }

  // Items List
  if (cartItemsList) {
    if (cart.length === 0) {
      cartItemsList.innerHTML = '';
      if (cartEmptyMessage) cartEmptyMessage.classList.remove('hidden');
      if (cartFooter) cartFooter.classList.add('hidden');
      return;
    }

    if (cartEmptyMessage) cartEmptyMessage.classList.add('hidden');
    if (cartFooter) cartFooter.classList.remove('hidden');

    cartItemsList.innerHTML = '';
    cart.forEach(item => {
      const row = document.createElement('div');
      row.className = 'py-3 flex items-center gap-3';
      row.innerHTML = `
        <img src="${getImagePath(item.image)}" alt="${item.name}" class="w-14 h-14 rounded-xl object-cover border border-gray-200" onerror="this.src='images/logo.jpg'">
        <div class="flex-1 min-w-0">
          <h4 class="font-bold text-xs sm:text-sm text-gray-900 truncate">${item.name}</h4>
          <p class="text-xs text-rose-600 font-extrabold">৳${item.price} <span class="text-gray-400 font-normal">x ${item.qty} = ৳${item.price * item.qty}</span></p>
        </div>
        <!-- Quantity Controls -->
        <div class="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
          <button class="cart-minus px-2.5 py-1 text-xs text-gray-600 hover:bg-gray-200 transition font-bold">-</button>
          <span class="px-2 text-xs font-extrabold text-gray-800">${item.qty}</span>
          <button class="cart-plus px-2.5 py-1 text-xs text-gray-600 hover:bg-gray-200 transition font-bold">+</button>
        </div>
        <button class="cart-remove text-gray-400 hover:text-red-500 p-1.5 transition" title="Remove">
          <i class="fa-regular fa-trash-can text-sm"></i>
        </button>
      `;

      row.querySelector('.cart-minus').addEventListener('click', () => changeCartItemQty(item.id, -1));
      row.querySelector('.cart-plus').addEventListener('click', () => changeCartItemQty(item.id, 1));
      row.querySelector('.cart-remove').addEventListener('click', () => removeCartItem(item.id));

      cartItemsList.appendChild(row);
    });
  }

  // Summary figures
  if (cartSubtotal) cartSubtotal.textContent = `৳${subtotal}`;
  if (discountRow) {
    if (discount > 0) {
      discountRow.classList.remove('hidden');
      discountCodeName.textContent = activeCouponCode;
      cartDiscount.textContent = `-৳${discount}`;
    } else {
      discountRow.classList.add('hidden');
    }
  }
  if (cartDeliveryFee) {
    cartDeliveryFee.textContent = deliveryFee === 0 ? 'FREE' : `৳${deliveryFee}`;
    if (deliveryFee === 0) cartDeliveryFee.className = 'font-bold text-emerald-600';
    else cartDeliveryFee.className = 'font-semibold text-gray-800';
  }
  if (cartGrandTotal) cartGrandTotal.textContent = `৳${grandTotal}`;
}

// Coupon Handling
if (applyCouponBtn && couponInput) {
  applyCouponBtn.addEventListener('click', () => {
    const code = couponInput.value.trim().toUpperCase();
    if (!code) return;

    if (PROMO_CODES[code]) {
      const { subtotal } = calculateTotals();
      const promo = PROMO_CODES[code];
      if (promo.minSubtotal && subtotal < promo.minSubtotal) {
        couponMessage.textContent = `Coupon valid only on orders over ৳${promo.minSubtotal}`;
        couponMessage.className = 'text-[11px] mt-1 text-red-500 font-semibold';
        couponMessage.classList.remove('hidden');
        return;
      }
      setActiveCoupon(code);
      couponMessage.textContent = `🎉 Promo applied: ${promo.label}`;
      couponMessage.className = 'text-[11px] mt-1 text-emerald-600 font-semibold';
      couponMessage.classList.remove('hidden');
      renderCart();
      showToast(`Promo ${code} applied!`);
    } else {
      couponMessage.textContent = 'Invalid promo code. Try SWEET10';
      couponMessage.className = 'text-[11px] mt-1 text-red-500 font-semibold';
      couponMessage.classList.remove('hidden');
    }
  });
}

// ==========================================================
// CHECKOUT & WHATSAPP ORDER SUBMISSION
// ==========================================================

function openCheckoutModal() {
  const cart = readCart();
  if (cart.length === 0) {
    showToast('Your cart is empty! Please add some delicious food first.', 'error');
    return;
  }
  const { grandTotal } = calculateTotals();
  if (checkoutTotalAmount) checkoutTotalAmount.textContent = `৳${grandTotal}`;
  closeCartDrawer();
  if (checkoutModal) checkoutModal.classList.remove('hidden');
}

function closeCheckoutModal() {
  if (checkoutModal) checkoutModal.classList.add('hidden');
}

if (openCheckoutModalBtn) openCheckoutModalBtn.addEventListener('click', openCheckoutModal);
if (closeCheckoutBtn) closeCheckoutBtn.addEventListener('click', closeCheckoutModal);
if (checkoutBackdrop) checkoutBackdrop.addEventListener('click', closeCheckoutModal);

// Dynamic address label based on order type (Dine-in vs Delivery)
document.querySelectorAll('input[name="orderType"]').forEach(radio => {
  radio.addEventListener('change', (e) => {
    if (!addressLabel || !custAddress) return;
    if (e.target.value === 'Dine-in') {
      addressLabel.textContent = 'Table Number *';
      custAddress.placeholder = 'e.g. Table #4';
    } else if (e.target.value === 'Takeaway / Pickup') {
      addressLabel.textContent = 'Pickup Time / Contact *';
      custAddress.placeholder = 'e.g. Will pick up in 20 minutes';
    } else {
      addressLabel.textContent = 'Delivery Address *';
      custAddress.placeholder = 'House, Road, Area, Dhaka';
    }
  });
});

if (checkoutForm) {
  checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const cart = readCart();
    if (cart.length === 0) {
      showToast('Cart is empty', 'error');
      return;
    }

    const orderType = document.querySelector('input[name="orderType"]:checked')?.value || 'Home Delivery';
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value || 'Cash on Delivery';
    const name = document.getElementById('custName').value.trim();
    const phone = document.getElementById('custPhone').value.trim();
    const address = document.getElementById('custAddress').value.trim();
    const notes = document.getElementById('custNotes').value.trim();

    const { subtotal, discount, deliveryFee, grandTotal, activeCouponCode } = calculateTotals();
    const orderId = `#SB-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const orderTime = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Construct Order Object
    const orderRecord = {
      orderId,
      date: orderTime,
      customer: { name, phone, address, notes },
      orderType,
      paymentMethod,
      items: cart,
      subtotal,
      discount,
      couponCode: activeCouponCode,
      deliveryFee,
      grandTotal
    };

    // Save to orders history
    if (window.SweetBiteDB) {
      window.SweetBiteDB.saveOrder(orderRecord);
    } else {
      const pastOrders = readOrders();
      pastOrders.unshift(orderRecord);
      saveOrders(pastOrders);
    }
    lastPlacedOrder = orderRecord;

    // Build WhatsApp message
    let msg = `🍰 *NEW ORDER — SWEET BITE*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `📋 *Order ID:* ${orderId}\n`;
    msg += `👤 *Customer:* ${name}\n`;
    msg += `📞 *Phone:* ${phone}\n`;
    msg += `🛵 *Order Type:* ${orderType}\n`;
    msg += `📍 *Destination:* ${address}\n`;
    msg += `💳 *Payment:* ${paymentMethod}\n`;
    if (notes) {
      msg += `📝 *Instructions:* ${notes}\n`;
    }
    msg += `━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `🛒 *ORDERED DISHES:*\n`;
    cart.forEach(item => {
      msg += `• ${item.qty}x ${item.name} @ ৳${item.price} = ৳${item.price * item.qty}\n`;
    });
    msg += `━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `Subtotal: ৳${subtotal}\n`;
    if (discount > 0) {
      msg += `Discount (${activeCouponCode}): -৳${discount}\n`;
    }
    msg += `Delivery Fee: ${deliveryFee === 0 ? 'FREE' : '৳' + deliveryFee}\n`;
    msg += `*TOTAL AMOUNT: ৳${grandTotal}*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `Please confirm my order. Thank you!`;

    // Reset Form & Clear Cart
    checkoutForm.reset();
    saveCart([]);
    setActiveCoupon(null);
    updateCartBadges();
    closeCheckoutModal();

    // Trigger WhatsApp in new window
    const waUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');

    // Show Digital Printable Receipt Modal
    openReceiptModal(orderRecord);
    showToast('Order dispatched to WhatsApp! Here is your digital receipt.');
  });
}

// ==========================================================
// DIGITAL RECEIPT & ORDER HISTORY
// ==========================================================

function openReceiptModal(order) {
  if (!order || !receiptModal) return;

  document.getElementById('recOrderId').textContent = order.orderId;
  document.getElementById('recDate').textContent = order.date;
  document.getElementById('recCustName').textContent = order.customer.name;
  document.getElementById('recPhone').textContent = order.customer.phone;
  document.getElementById('recTypePay').textContent = `${order.orderType} • ${order.paymentMethod}`;
  document.getElementById('recAddress').textContent = order.customer.address;

  const itemsList = document.getElementById('recItemsList');
  itemsList.innerHTML = '';
  order.items.forEach(item => {
    const row = document.createElement('div');
    row.className = 'grid grid-cols-6 items-center';
    row.innerHTML = `
      <span class="col-span-3 font-semibold truncate">${item.name}</span>
      <span class="col-span-1 text-center font-mono">x${item.qty}</span>
      <span class="col-span-2 text-right font-mono">৳${item.price * item.qty}</span>
    `;
    itemsList.appendChild(row);
  });

  document.getElementById('recSubtotal').textContent = `৳${order.subtotal}`;
  const discRow = document.getElementById('recDiscountRow');
  if (order.discount > 0) {
    discRow.classList.remove('hidden');
    document.getElementById('recDiscount').textContent = `-৳${order.discount}`;
  } else {
    discRow.classList.add('hidden');
  }
  document.getElementById('recDeliveryFee').textContent = order.deliveryFee === 0 ? 'FREE' : `৳${order.deliveryFee}`;
  document.getElementById('recGrandTotal').textContent = `৳${order.grandTotal}`;

  receiptModal.classList.remove('hidden');
}

function closeReceiptModal() {
  if (receiptModal) receiptModal.classList.add('hidden');
}

if (closeReceiptBtn) closeReceiptBtn.addEventListener('click', closeReceiptModal);
if (receiptBackdrop) receiptBackdrop.addEventListener('click', closeReceiptModal);
if (printReceiptBtn) printReceiptBtn.addEventListener('click', () => window.print());

if (resendWhatsAppBtn) {
  resendWhatsAppBtn.addEventListener('click', () => {
    if (!lastPlacedOrder) return;
    const { orderId, customer, orderType, paymentMethod, items, subtotal, discount, couponCode, deliveryFee, grandTotal } = lastPlacedOrder;
    let msg = `🍰 *ORDER #${orderId} CONFIRMATION — SWEET BITE*\n`;
    msg += `Customer: ${customer.name} (${customer.phone})\n`;
    msg += `Items: ${items.map(i => `${i.qty}x ${i.name}`).join(', ')}\n`;
    msg += `*Total: ৳${grandTotal}* (${paymentMethod})\n`;
    window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(msg)}`, '_blank');
  });
}

// History Modal
function openHistoryModal() {
  if (!historyModal) return;
  const orders = readOrders();

  if (orders.length === 0) {
    historyList.innerHTML = '';
    emptyHistoryMessage.classList.remove('hidden');
  } else {
    emptyHistoryMessage.classList.add('hidden');
    historyList.innerHTML = '';
    orders.forEach(order => {
      const card = document.createElement('div');
      card.className = 'p-3 bg-gray-50 rounded-xl border border-gray-200 flex flex-col gap-2';
      card.innerHTML = `
        <div class="flex justify-between items-center text-xs">
          <span class="font-mono font-bold text-gray-900">${order.orderId}</span>
          <span class="text-gray-400">${order.date}</span>
        </div>
        <div class="text-xs text-gray-600">
          <p><strong>Items:</strong> ${order.items.map(i => `${i.qty}x ${i.name}`).join(', ')}</p>
          <p><strong>Total:</strong> <span class="text-rose-600 font-extrabold">৳${order.grandTotal}</span> (${order.paymentMethod})</p>
        </div>
        <div class="flex gap-2 pt-1 border-t border-gray-200">
          <button class="view-receipt-btn text-xs bg-white border border-gray-300 px-3 py-1.5 rounded-lg hover:bg-gray-100 font-semibold text-gray-700">
            <i class="fa-solid fa-receipt mr-1 text-rose-500"></i> View Slip
          </button>
          <button class="reorder-btn text-xs bg-rose-50 border border-rose-200 text-rose-600 px-3 py-1.5 rounded-lg hover:bg-rose-100 font-semibold">
            <i class="fa-solid fa-rotate mr-1"></i> Re-order Items
          </button>
        </div>
      `;

      card.querySelector('.view-receipt-btn').addEventListener('click', () => {
        closeHistoryModal();
        openReceiptModal(order);
      });

      card.querySelector('.reorder-btn').addEventListener('click', () => {
        order.items.forEach(item => addToCart(item, item.qty));
        closeHistoryModal();
        openCartDrawer();
      });

      historyList.appendChild(card);
    });
  }

  historyModal.classList.remove('hidden');
}

function closeHistoryModal() {
  if (historyModal) historyModal.classList.add('hidden');
}

if (historyBtn) historyBtn.addEventListener('click', openHistoryModal);
if (closeHistoryBtn) closeHistoryBtn.addEventListener('click', closeHistoryModal);
if (historyBackdrop) historyBackdrop.addEventListener('click', closeHistoryModal);

// ==========================================================
// FOOD QUICK VIEW MODAL
// ==========================================================

function openQuickView(item) {
  if (!quickViewModal) return;
  activeQuickViewItem = item;
  let qvQty = 1;

  qvImage.src = getImagePath(item.image);
  qvCategory.textContent = item.category || 'Specialty';
  qvName.textContent = item.name;
  qvPrice.textContent = `৳${item.price}`;
  qvDescription.textContent = item.description || 'Crafted with premium ingredients, prepared with care by our kitchen team.';

  if (item.tag) {
    qvTag.textContent = item.tag;
    qvTag.classList.remove('hidden');
    qvTag.className = 'absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full text-white shadow-md bg-rose-500';
  } else {
    qvTag.classList.add('hidden');
  }

  const isInStock = item.inStock !== false;
  if (isInStock) {
    qvStockStatus.textContent = 'In Stock';
    qvStockStatus.className = 'inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700';
    qvAddToCartBtn.disabled = false;
    qvAddToCartBtn.className = 'flex-1 bg-gradient-to-r from-rose-600 to-red-500 hover:from-rose-700 hover:to-red-600 text-white font-bold py-2.5 px-4 rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 text-sm';
  } else {
    qvStockStatus.textContent = 'Out of Stock';
    qvStockStatus.className = 'inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-700';
    qvAddToCartBtn.disabled = true;
    qvAddToCartBtn.className = 'flex-1 bg-gray-200 text-gray-400 font-bold py-2.5 px-4 rounded-xl cursor-not-allowed text-sm';
  }

  qvQtyValue.textContent = qvQty;
  quickViewModal.classList.remove('hidden');
}

function closeQuickView() {
  if (quickViewModal) quickViewModal.classList.add('hidden');
}

if (closeQuickViewBtn) closeQuickViewBtn.addEventListener('click', closeQuickView);
if (quickViewBackdrop) quickViewBackdrop.addEventListener('click', closeQuickView);

if (qvQtyMinus) {
  qvQtyMinus.addEventListener('click', () => {
    let current = parseInt(qvQtyValue.textContent) || 1;
    if (current > 1) qvQtyValue.textContent = current - 1;
  });
}
if (qvQtyPlus) {
  qvQtyPlus.addEventListener('click', () => {
    let current = parseInt(qvQtyValue.textContent) || 1;
    qvQtyValue.textContent = current + 1;
  });
}
if (qvAddToCartBtn) {
  qvAddToCartBtn.addEventListener('click', () => {
    if (!activeQuickViewItem) return;
    const qty = parseInt(qvQtyValue.textContent) || 1;
    addToCart(activeQuickViewItem, qty);
    closeQuickView();
  });
}

// Set copyright year
const currentYearElem = document.getElementById('currentYear');
if (currentYearElem) currentYearElem.textContent = new Date().getFullYear();

// ==========================================================
// ADMIN DASHBOARD LOGIC (admin.html)
// ==========================================================

const adminPinOverlay = document.getElementById('adminPinOverlay');
const pinForm = document.getElementById('pinForm');
const adminPinInput = document.getElementById('adminPinInput');
const pinErrorMsg = document.getElementById('pinErrorMsg');
const logoutBtn = document.getElementById('logoutBtn');

const tabMenuBtn = document.getElementById('tabMenuBtn');
const tabOrdersBtn = document.getElementById('tabOrdersBtn');
const tabSettingsBtn = document.getElementById('tabSettingsBtn');
const tabMenuContent = document.getElementById('tabMenuContent');
const tabOrdersContent = document.getElementById('tabOrdersContent');
const tabSettingsContent = document.getElementById('tabSettingsContent');
const orderCountBadge = document.getElementById('orderCountBadge');

// KPIs
const statTotalItems = document.getElementById('statTotalItems');
const statInStock = document.getElementById('statInStock');
const statTotalOrders = document.getElementById('statTotalOrders');
const statTotalRevenue = document.getElementById('statTotalRevenue');

// Form elements
const adminItemForm = document.getElementById('adminItemForm');
const adminItemId = document.getElementById('adminItemId');
const adminName = document.getElementById('adminName');
const adminPrice = document.getElementById('adminPrice');
const adminCategory = document.getElementById('adminCategory');
const adminTag = document.getElementById('adminTag');
const adminStock = document.getElementById('adminStock');
const adminDescription = document.getElementById('adminDescription');
const adminPresetImage = document.getElementById('adminPresetImage');
const adminImageFile = document.getElementById('adminImageFile');
const adminImageText = document.getElementById('adminImageText');
const adminImagePreview = document.getElementById('adminImagePreview');
const formHeading = document.getElementById('formHeading');
const editModeIndicator = document.getElementById('editModeIndicator');
const adminClearBtn = document.getElementById('adminClearBtn');

const adminItemsList = document.getElementById('adminItemsList');
const adminSearchMenu = document.getElementById('adminSearchMenu');
const adminOrdersList = document.getElementById('adminOrdersList');
const adminEmptyOrders = document.getElementById('adminEmptyOrders');
const clearOrdersBtn = document.getElementById('clearOrdersBtn');

const exportMenuBtn = document.getElementById('exportMenuBtn');
const importMenuFile = document.getElementById('importMenuFile');
const resetMenuBtn = document.getElementById('resetMenuBtn');
const changePinForm = document.getElementById('changePinForm');
const newPinInput = document.getElementById('newPinInput');

// Admin Auth Check
function checkAdminAuth() {
  if (!adminPinOverlay) return;
  const isUnlocked = sessionStorage.getItem('sweetBiteAdminUnlocked') === 'true';
  if (isUnlocked) {
    adminPinOverlay.classList.add('hidden');
    initAdminDashboard();
  } else {
    adminPinOverlay.classList.remove('hidden');
  }
}

if (pinForm) {
  pinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const entered = adminPinInput.value.trim();
    const correctPin = localStorage.getItem('sweetBiteAdminPin') || '1234';

    if (entered === correctPin) {
      sessionStorage.setItem('sweetBiteAdminUnlocked', 'true');
      adminPinOverlay.classList.add('hidden');
      pinErrorMsg.classList.add('hidden');
      initAdminDashboard();
      showToast('Dashboard unlocked! Welcome admin.');
    } else {
      pinErrorMsg.classList.remove('hidden');
      adminPinInput.value = '';
      adminPinInput.focus();
    }
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem('sweetBiteAdminUnlocked');
    location.reload();
  });
}

// Tab Switching
function switchAdminTab(tab) {
  [tabMenuBtn, tabOrdersBtn, tabSettingsBtn].forEach(btn => btn?.classList.remove('active-tab'));
  [tabMenuContent, tabOrdersContent, tabSettingsContent].forEach(content => content?.classList.add('hidden'));

  if (tab === 'menu') {
    tabMenuBtn.classList.add('active-tab');
    tabMenuContent.classList.remove('hidden');
  } else if (tab === 'orders') {
    tabOrdersBtn.classList.add('active-tab');
    tabOrdersContent.classList.remove('hidden');
    renderAdminOrders();
  } else if (tab === 'settings') {
    tabSettingsBtn.classList.add('active-tab');
    tabSettingsContent.classList.remove('hidden');
  }
}

if (tabMenuBtn) tabMenuBtn.addEventListener('click', () => switchAdminTab('menu'));
if (tabOrdersBtn) tabOrdersBtn.addEventListener('click', () => switchAdminTab('orders'));
if (tabSettingsBtn) tabSettingsBtn.addEventListener('click', () => switchAdminTab('settings'));

// Initialize Admin View
function initAdminDashboard() {
  updateAdminKPIs();
  renderAdminItems();
  renderAdminOrders();
}

function updateAdminKPIs() {
  const menu = readMenu();
  const orders = readOrders();
  const inStockCount = menu.filter(i => i.inStock !== false).length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.grandTotal || 0), 0);

  if (statTotalItems) statTotalItems.textContent = menu.length;
  if (statInStock) statInStock.textContent = inStockCount;
  if (statTotalOrders) statTotalOrders.textContent = orders.length;
  if (statTotalRevenue) statTotalRevenue.textContent = `৳${totalRevenue.toLocaleString()}`;
  if (orderCountBadge) orderCountBadge.textContent = orders.length;
}

// Sync Image Inputs & Preview
function updateImagePreview(src) {
  if (!adminImagePreview) return;
  adminImagePreview.src = getImagePath(src);
}

if (adminPresetImage) {
  adminPresetImage.addEventListener('change', (e) => {
    if (e.target.value) {
      adminImageText.value = e.target.value;
      updateImagePreview(e.target.value);
    }
  });
}

if (adminImageText) {
  adminImageText.addEventListener('input', (e) => {
    updateImagePreview(e.target.value);
  });
}

if (adminImageFile) {
  adminImageFile.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (loadEvt) => {
      const base64 = loadEvt.target.result;
      adminImageText.value = base64;
      updateImagePreview(base64);
      showToast('Image uploaded and preview updated!');
    };
    reader.readAsDataURL(file);
  });
}

// Render Admin Menu Items List
function renderAdminItems() {
  if (!adminItemsList) return;
  const menu = readMenu();
  const query = (adminSearchMenu?.value || '').trim().toLowerCase();

  const filtered = menu.filter(i => 
    !query || 
    i.name.toLowerCase().includes(query) || 
    (i.category && i.category.toLowerCase().includes(query))
  );

  adminItemsList.innerHTML = '';
  if (filtered.length === 0) {
    adminItemsList.innerHTML = '<div class="py-8 text-center text-xs text-gray-400">No dishes found.</div>';
    return;
  }

  filtered.forEach(item => {
    const isInStock = item.inStock !== false;
    const row = document.createElement('div');
    row.className = 'p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition flex items-center justify-between gap-3';

    row.innerHTML = `
      <div class="flex items-center gap-3 min-w-0">
        <img src="${getImagePath(item.image)}" alt="${item.name}" class="w-12 h-12 rounded-xl object-cover border border-gray-200" onerror="this.src='images/logo.jpg'">
        <div class="min-w-0">
          <div class="flex items-center gap-2">
            <h4 class="font-bold text-xs sm:text-sm text-gray-900 truncate">${item.name}</h4>
            ${item.tag ? `<span class="text-[10px] bg-rose-100 text-rose-700 font-bold px-1.5 py-0.5 rounded">${item.tag}</span>` : ''}
          </div>
          <div class="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
            <span>${item.category || 'General'}</span>
            <span>•</span>
            <span class="font-extrabold text-rose-600">৳${item.price}</span>
            <span>•</span>
            <button class="toggle-stock-btn text-[11px] font-bold ${isInStock ? 'text-emerald-600 hover:underline' : 'text-red-500 hover:underline'}">
              ${isInStock ? '● In Stock' : '○ Out of Stock'}
            </button>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center gap-1.5 flex-shrink-0">
        <button class="edit-item-btn bg-white hover:bg-gray-200 border border-gray-200 text-gray-700 p-2 rounded-lg text-xs transition" title="Edit Item">
          <i class="fa-solid fa-pen"></i>
        </button>
        <button class="del-item-btn bg-white hover:bg-red-50 border border-gray-200 text-red-500 p-2 rounded-lg text-xs transition" title="Delete Item">
          <i class="fa-regular fa-trash-can"></i>
        </button>
      </div>
    `;

    // Toggle stock
    row.querySelector('.toggle-stock-btn').addEventListener('click', async () => {
      if (window.SweetBiteDB) {
        await window.SweetBiteDB.toggleStock(item.id);
      }
      const all = readMenu();
      const target = all.find(i => i.id === item.id);
      if (target) {
        target.inStock = !isInStock;
        saveMenu(all);
        renderAdminItems();
        updateAdminKPIs();
        showToast(`"${item.name}" is now ${target.inStock ? 'In Stock' : 'Out of Stock'}`);
      }
    });

    // Edit Item
    row.querySelector('.edit-item-btn').addEventListener('click', () => {
      adminItemId.value = item.id;
      adminName.value = item.name;
      adminPrice.value = item.price;
      adminCategory.value = item.category || '';
      adminTag.value = item.tag || '';
      adminStock.value = item.inStock !== false ? 'true' : 'false';
      adminDescription.value = item.description || '';
      adminImageText.value = item.image || '';
      updateImagePreview(item.image);

      if (formHeading) formHeading.innerHTML = '<i class="fa-solid fa-pen-to-square text-amber-500"></i> Edit Dish';
      if (editModeIndicator) editModeIndicator.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Delete Item
    row.querySelector('.del-item-btn').addEventListener('click', async () => {
      if (confirm(`Delete "${item.name}" from the menu?`)) {
        if (window.SweetBiteDB) {
          await window.SweetBiteDB.deleteItem(item.id);
        }
        const remaining = readMenu().filter(i => i.id !== item.id);
        saveMenu(remaining);
        renderAdminItems();
        updateAdminKPIs();
        showToast(`Deleted "${item.name}"`, 'info');
      }
    });

    adminItemsList.appendChild(row);
  });
}

if (adminSearchMenu) adminSearchMenu.addEventListener('input', renderAdminItems);

// Clear Form
function resetAdminForm() {
  if (!adminItemForm) return;
  adminItemForm.reset();
  adminItemId.value = '';
  updateImagePreview('');
  if (formHeading) formHeading.innerHTML = '<i class="fa-solid fa-plus-circle text-rose-500"></i> Add New Dish';
  if (editModeIndicator) editModeIndicator.classList.add('hidden');
}

if (adminClearBtn) adminClearBtn.addEventListener('click', resetAdminForm);

// Save or Update Item
if (adminItemForm) {
  adminItemForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = adminItemId.value || `sb-${Date.now()}`;
    const name = adminName.value.trim();
    const price = parseFloat(adminPrice.value) || 0;
    const category = adminCategory.value.trim();
    const tag = adminTag.value;
    const inStock = adminStock.value === 'true';
    const description = adminDescription.value.trim();
    const image = adminImageText.value.trim() || 'logo.jpg';

    const menu = readMenu();
    const index = menu.findIndex(i => i.id === id);

    const newItem = { id, name, price, category, tag, inStock, description, image };

    if (index >= 0) {
      menu[index] = newItem;
      showToast(`Updated "${name}" successfully!`);
    } else {
      menu.push(newItem);
      showToast(`Added "${name}" to menu!`);
    }

    if (window.SweetBiteDB) {
      window.SweetBiteDB.saveItem(newItem);
    }
    saveMenu(menu);
    resetAdminForm();
    renderAdminItems();
    updateAdminKPIs();
  });
}

// Render Admin Recent Orders
function renderAdminOrders() {
  if (!adminOrdersList) return;
  const orders = readOrders();

  if (orders.length === 0) {
    adminOrdersList.innerHTML = '';
    if (adminEmptyOrders) adminEmptyOrders.classList.remove('hidden');
    return;
  }

  if (adminEmptyOrders) adminEmptyOrders.classList.add('hidden');
  adminOrdersList.innerHTML = '';

  orders.forEach((order, idx) => {
    const card = document.createElement('div');
    card.className = 'p-4 bg-gray-50 rounded-2xl border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4';

    card.innerHTML = `
      <div class="space-y-1">
        <div class="flex items-center gap-2">
          <span class="font-mono font-extrabold text-sm text-gray-900">${order.orderId}</span>
          <span class="text-xs text-gray-400">• ${order.date}</span>
          <span class="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">${order.orderType}</span>
        </div>
        <p class="text-xs font-bold text-gray-800">
          👤 ${order.customer.name} • <a href="tel:${order.customer.phone}" class="text-rose-600 hover:underline">${order.customer.phone}</a>
        </p>
        <p class="text-xs text-gray-500">📍 ${order.customer.address}</p>
        <p class="text-xs text-gray-700 font-medium">
          🛒 ${order.items.map(i => `${i.qty}x ${i.name}`).join(', ')}
        </p>
        ${order.customer.notes ? `<p class="text-xs text-amber-700 bg-amber-50 p-1.5 rounded-lg">📝 Note: ${order.customer.notes}</p>` : ''}
      </div>

      <div class="text-right flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2">
        <div>
          <span class="text-xs text-gray-400 block sm:inline">Payable:</span>
          <span class="text-base font-extrabold text-rose-600">৳${order.grandTotal}</span>
          <span class="text-[11px] text-gray-400 block">${order.paymentMethod}</span>
        </div>
        <a 
          href="https://api.whatsapp.com/send?phone=${order.customer.phone.replace(/[^0-9]/g,'')}&text=${encodeURIComponent(`Hello ${order.customer.name}, regarding your Sweet Bite order ${order.orderId}:`)}" 
          target="_blank" 
          class="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 shadow"
        >
          <i class="fa-brands fa-whatsapp"></i> Chat Customer
        </a>
      </div>
    `;

    adminOrdersList.appendChild(card);
  });
}

if (clearOrdersBtn) {
  clearOrdersBtn.addEventListener('click', async () => {
    if (confirm('Clear all logged orders? This cannot be undone.')) {
      if (window.SweetBiteDB) {
        await window.SweetBiteDB.clearOrders();
      }
      saveOrders([]);
      renderAdminOrders();
      updateAdminKPIs();
      showToast('Orders log cleared', 'info');
    }
  });
}

// Backup & Restore
if (exportMenuBtn) {
  exportMenuBtn.addEventListener('click', () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(readMenu(), null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `sweetbite-menu-${new Date().toISOString().slice(0,10)}.json`);
    dlAnchor.click();
    showToast('Menu JSON exported!');
  });
}

if (importMenuFile) {
  importMenuFile.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (loadEvt) => {
      try {
        const imported = JSON.parse(loadEvt.target.result);
        if (Array.isArray(imported)) {
          saveMenu(imported);
          renderAdminItems();
          updateAdminKPIs();
          showToast('Menu successfully imported!');
        } else {
          showToast('Invalid JSON structure.', 'error');
        }
      } catch (err) {
        showToast('Error reading JSON file.', 'error');
      }
    };
    reader.readAsText(file);
  });
}

if (resetMenuBtn) {
  resetMenuBtn.addEventListener('click', async () => {
    if (confirm('Reset the entire menu to the original Sweet Bite default items? Custom items will be replaced.')) {
      if (window.SweetBiteDB) {
        await window.SweetBiteDB.resetMenu();
      }
      saveMenu(DEFAULT_MENU);
      renderAdminItems();
      updateAdminKPIs();
      showToast('Menu reset to Sweet Bite defaults!');
    }
  });
}

if (changePinForm && newPinInput) {
  changePinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const pin = newPinInput.value.trim();
    if (pin.length < 4) {
      showToast('PIN must be at least 4 digits', 'error');
      return;
    }
    localStorage.setItem('sweetBiteAdminPin', pin);
    newPinInput.value = '';
    showToast(`Security PIN changed successfully to: ${pin}`);
  });
}

// ==========================================================
// INITIAL PAGE BOOTSTRAP
// ==========================================================

document.addEventListener('DOMContentLoaded', async () => {
  // Ensure menu exists
  readMenu();

  // If on storefront (index.html)
  if (menuGrid) {
    renderCategoryPills();
    filterAndRenderMenu();
    updateCartBadges();
  }

  // If on admin portal (admin.html)
  if (adminPinOverlay) {
    checkAdminAuth();
  }

  // Async sync from SQLite database if backend server is online
  if (window.SweetBiteDB) {
    const isOnline = await window.SweetBiteDB.checkConnection();
    if (isOnline) {
      try {
        const dbMenu = await window.SweetBiteDB.getMenu();
        if (dbMenu && Array.isArray(dbMenu) && dbMenu.length > 0) {
          saveMenu(dbMenu);
          if (menuGrid) {
            renderCategoryPills();
            filterAndRenderMenu();
          }
          if (typeof updateAdminKPIs === 'function') updateAdminKPIs();
          if (typeof renderAdminItems === 'function') renderAdminItems();
        }

        const dbOrders = await window.SweetBiteDB.getOrders();
        if (dbOrders && Array.isArray(dbOrders)) {
          saveOrders(dbOrders);
          if (typeof renderAdminOrders === 'function') renderAdminOrders();
          if (typeof updateAdminKPIs === 'function') updateAdminKPIs();
        }
      } catch (err) {
        console.warn('Database sync warning:', err);
      }
    }
  }
});
