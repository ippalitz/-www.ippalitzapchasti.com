const productsUrl = 'products.json';

const productsSection = document.getElementById('products');
const cartSection = document.getElementById('cart');
const searchInput = document.getElementById('searchInput');
const brandFilter = document.getElementById('brandFilter');
const categoryFilter = document.getElementById('categoryFilter');

// Fixed exchange rate from BYN to RUB
const BYN_TO_RUB_RATE = 30;

let products = [];
let cart = [];

function formatPrice(byn) {
  const rub = Math.round(byn * BYN_TO_RUB_RATE);
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0
  }).format(rub);
}

function fetchProducts() {
  fetch(productsUrl)
    .then((res) => res.json())
    .then((data) => {
      products = data;
      initFilters(products);
      renderProducts(products);
    })
    .catch((err) => {
      console.error('Failed to load products', err);
      productsSection.textContent = 'Не удалось загрузить товары';
    });
}

function initFilters(products) {
  // Populate brand filter
  const brands = [...new Set(products.map((p) => p.brand))].sort();
  brands.forEach((brand) => {
    const option = document.createElement('option');
    option.value = brand;
    option.textContent = brand;
    brandFilter.appendChild(option);
  });

  // Populate category filter
  const categories = [...new Set(products.map((p) => p.category))].sort();
  categories.forEach((category) => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

function renderProducts(list) {
  productsSection.innerHTML = '';
  if (!list.length) {
    productsSection.textContent = 'Товары не найдены';
    return;
  }
  list.forEach((product) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image || ''}" alt="${product.title}" class="product-image">
      <div class="product-info">
        <h3>${product.title}</h3>
        <p>${product.description || ''}</p>
        <p><strong>${formatPrice(product.price_byn)}</strong></p>
        <button data-id="${product.id}" class="add-to-cart">Добавить в корзину</button>
      </div>
    `;
    productsSection.appendChild(card);
  });
}

function filterProducts() {
  const term = searchInput.value.toLowerCase().trim();
  const brandVal = brandFilter.value.toLowerCase();
  const categoryVal = categoryFilter.value.toLowerCase();
  const filtered = products.filter((p) => {
    if (brandVal && p.brand.toLowerCase() !== brandVal) return false;
    if (categoryVal && p.category.toLowerCase() !== categoryVal) return false;
    const fields = [p.title, p.description, p.brand, p.model, p.oem];
    return fields.some((field) => field && field.toLowerCase().includes(term));
  });
  renderProducts(filtered);
}

function updateCart() {
  // Ensure cart markup exists
  if (!cartSection.querySelector('#cartList')) {
    cartSection.innerHTML = `
      <h2>Корзина</h2>
      <ul id="cartList"></ul>
      <p id="total">Итого: 0 ₽</p>
      <button id="sendOrder">Оформить заказ</button>
    `;
  }
  const list = cartSection.querySelector('#cartList');
  const totalElement = cartSection.querySelector('#total');
  list.innerHTML = '';
  let totalByn = 0;
  cart.forEach((item) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.title} × ${item.qty} — ${formatPrice(item.price_byn * item.qty)}
      <button data-id="${item.id}" class="remove-from-cart">Удалить</button>
    `;
    list.appendChild(li);
    totalByn += item.price_byn * item.qty;
  });
  totalElement.textContent = `Итого: ${formatPrice(totalByn)}`;
  const sendBtn = cartSection.querySelector('#sendOrder');
  sendBtn.onclick = sendOrder;
}

function addToCart(id) {
  const product = products.find((p) => p.id == id);
  const existing = cart.find((item) => item.id == id);
  if (existing) {
    existing.qty += 1;
  } else if (product) {
    cart.push({ ...product, qty: 1 });
  }
  updateCart();
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id != id);
  updateCart();
}

function sendOrder() {
  if (!cart.length) return;
  const items = cart.map((item) => `${item.title} × ${item.qty}`).join('%0A');
  const totalByn = cart.reduce((sum, item) => sum + item.price_byn * item.qty, 0);
  const message = `Здравствуйте, интересуют следующие товары:%0A${items}%0AИтого: ${formatPrice(totalByn)}`;
  window.open(`https://t.me/ippalitzapchasti?text=${message}`, '_blank');
}

function handleProductClick(e) {
  if (e.target.classList.contains('add-to-cart')) {
    const id = e.target.dataset.id;
    addToCart(id);
  }
}

function handleCartClick(e) {
  if (e.target.classList.contains('remove-from-cart')) {
    const id = e.target.dataset.id;
    removeFromCart(id);
  }
}

function initEventListeners() {
  searchInput.addEventListener('input', filterProducts);
  brandFilter.addEventListener('change', filterProducts);
  categoryFilter.addEventListener('change', filterProducts);
  productsSection.addEventListener('click', handleProductClick);
  cartSection.addEventListener('click', handleCartClick);
}

document.addEventListener('DOMContentLoaded', () => {
  fetchProducts();
  initEventListeners();
});
