/*
 * Простая логика каталога запчастей для сайта ippalitzapchasti.
 * Считывает данные из products.json, позволяет фильтровать и искать,
 * добавлять товары в корзину и формировать ссылку для отправки
 * заявки в Telegram. Курсовой коэффициент и наценка вводятся
 * пользователем и применяются к цене в BYN для отображения в рублях.
 */

// Глобальные переменные
let products = [];
const cart = [];

// Элементы DOM
const searchInput = document.getElementById('searchInput');
const brandFilter = document.getElementById('brandFilter');
const categoryFilter = document.getElementById('categoryFilter');
const cityFilter = document.getElementById('cityFilter');
const rateInput = document.getElementById('rateInput');
const markupInput = document.getElementById('markupInput');
const productsContainer = document.getElementById('products');
const cartList = document.getElementById('cartList');
const tgButton = document.getElementById('tgButton');
const tgLinkElem = document.getElementById('tgLink');

// Загрузка данных товаров
async function loadProducts() {
  try {
    const res = await fetch('products.json');
    products = await res.json();
    initFilters();
    renderProducts();
  } catch (err) {
    console.error('Ошибка чтения products.json:', err);
  }
}

// Инициализация значений фильтров на основе данных
function initFilters() {
  const brands = new Set();
  const categories = new Set();
  const cities = new Set();
  products.forEach((p) => {
    if (p.brand) brands.add(p.brand);
    if (p.category) categories.add(p.category);
    if (p.city) cities.add(p.city);
  });
  addOptions(brandFilter, Array.from(brands));
  addOptions(categoryFilter, Array.from(categories));
  addOptions(cityFilter, Array.from(cities));
}

// Добавление вариантов в выпадающие списки
function addOptions(select, values) {
  values.sort().forEach((val) => {
    const opt = document.createElement('option');
    opt.value = val;
    opt.textContent = val;
    select.appendChild(opt);
  });
}

// Фильтрация и вывод товаров
function renderProducts() {
  const query = searchInput.value.trim().toLowerCase();
  const brandVal = brandFilter.value;
  const catVal = categoryFilter.value;
  const cityVal = cityFilter.value;
  productsContainer.innerHTML = '';

  const filtered = products.filter((p) => {
    const matchesSearch =
      !query ||
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      (p.brand && p.brand.toLowerCase().includes(query)) ||
      (p.model && p.model.toLowerCase().includes(query)) ||
      (p.oem && p.oem.toLowerCase().includes(query));
    const matchesBrand = !brandVal || p.brand === brandVal;
    const matchesCat = !catVal || p.category === catVal;
    const matchesCity = !cityVal || p.city === cityVal;
    return matchesSearch && matchesBrand && matchesCat && matchesCity;
  });

  filtered.forEach((p) => {
    productsContainer.appendChild(createProductCard(p));
  });
}

// Создание карточки товара
function createProductCard(prod) {
  const div = document.createElement('div');
  div.className = 'product';
  // Изображение
  const img = document.createElement('img');
  if (prod.image) {
    img.src = prod.image;
    img.alt = prod.title;
  } else {
    img.alt = 'Нет изображения';
  }
  div.appendChild(img);
  // Название
  const h3 = document.createElement('h3');
  h3.textContent = prod.title;
  div.appendChild(h3);
  // Краткое описание
  const p = document.createElement('p');
  p.textContent = prod.description;
  div.appendChild(p);
  // Цена
  const price = document.createElement('div');
  price.className = 'price';
  price.textContent = formatPrice(prod.price_byn);
  div.appendChild(price);
  // Кнопка добавления
  const btn = document.createElement('button');
  btn.textContent = 'Добавить в\u00a0корзину';
  btn.addEventListener('click', () => addToCart(prod));
  div.appendChild(btn);
  return div;
}

// Форматирование цены с учётом курса и наценки
function formatPrice(priceByN) {
  const rate = parseFloat(rateInput.value) || 0;
  const markup = parseFloat(markupInput.value) || 0;
  if (!rate) {
    // если курс не указан, показываем BYN
    return `${priceByN}\u00a0BYN`;
  }
  const rub = priceByN * rate * (1 + markup / 100);
  return `${Math.round(rub).toLocaleString('ru-RU')}\u00a0₽`;
}

// Добавление товара в корзину
function addToCart(prod) {
  cart.push(prod);
  updateCart();
}

// Обновление списка корзины
function updateCart() {
  cartList.innerHTML = '';
  let totalRub = 0;
  cart.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = `${item.title}`;
    const span = document.createElement('span');
    const priceRub = convertToRub(item.price_byn);
    totalRub += priceRub;
    span.textContent = `${priceRub.toLocaleString('ru-RU')}\u00a0₽`;
    li.appendChild(span);
    cartList.appendChild(li);
  });
  // Активируем кнопку Telegram, если корзина не пуста
  tgButton.disabled = cart.length === 0;
  tgButton.onclick = () => sendTelegram(totalRub);
}

// Конвертация цены в рубли без округления для корзины
function convertToRub(byn) {
  const rate = parseFloat(rateInput.value) || 0;
  const markup = parseFloat(markupInput.value) || 0;
  return Math.round(byn * rate * (1 + markup / 100));
}

// Отправка заявки в Telegram
function sendTelegram(totalRub) {
  let message = 'Заявка\u00a0с\u00a0сайта\u00a0ippalitzapchasti%0A';
  cart.forEach((item) => {
    message += `${item.title} — ${convertToRub(item.price_byn)}₽%0A`;
  });
  message += `%0AИтого: ${totalRub}₽`;
  const handle = tgLinkElem.href.replace('https://t.me/', '');
  const url = `https://t.me/${handle}?text=${message}`;
  window.open(url, '_blank');
}

// Обработчики событий
searchInput.addEventListener('input', renderProducts);
brandFilter.addEventListener('change', renderProducts);
categoryFilter.addEventListener('change', renderProducts);
cityFilter.addEventListener('change', renderProducts);
rateInput.addEventListener('input', () => {
  renderProducts();
  updateCart();
});
markupInput.addEventListener('input', () => {
  renderProducts();
  updateCart();
});

// Первоначальная загрузка
loadProducts();
