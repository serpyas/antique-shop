let products = [
    { id: 1, name: "Настольные часы 1890 г.", price: 45000, image: "images/1.webp", description: "Антикварные настольные часы из бронзы" },
    { id: 2, name: "Фарфоровая ваза (Япония)", price: 89000, image: "images/2.jpg", description: "Японский фарфор эпохи Мэйдзи" },
    { id: 3, name: "Подсвечники бронза", price: 12500, image: "images/3.jpg", description: "Пара бронзовых подсвечников" },
    { id: 4, name: "Книга 1850 г. 'Евгений Онегин'", price: 32000, image: "images/4.jpeg", description: "Первое прижизненное издание" }
];

const catalogProducts = [
    { id: 1, name: "Настольные часы 1890 г.", price: 45000, image: "images/1.webp", description: "Антикварные настольные часы из бронзы", category: "Часы", period: "XIX век", material: "Бронза", condition: "Хорошее", dateAdded: "2024-01-15" },
    { id: 2, name: "Фарфоровая ваза (Япония)", price: 89000, image: "images/2.jpg", description: "Японский фарфор эпохи Мэйдзи", category: "Фарфор", period: "XIX век", material: "Фарфор", condition: "Отличное", dateAdded: "2024-02-20" },
    { id: 3, name: "Подсвечники бронза", price: 12500, image: "images/3.jpg", description: "Пара бронзовых подсвечников", category: "Предметы интерьера", period: "XIX век", material: "Бронза", condition: "Хорошее", dateAdded: "2024-01-10" },
    { id: 4, name: "Книга 1850 г. 'Евгений Онегин'", price: 32000, image: "images/4.jpeg", description: "Первое прижизненное издание", category: "Книги", period: "XIX век", material: "Бумага", condition: "С признаками бытования", dateAdded: "2024-03-01" },
    { id: 5, name: "Серебряное кольцо с рубином", price: 125000, image: "images/rubin.webp", description: "Ювелирное кольцо, проба 875", category: "Ювелирные украшения", period: "XIX век", material: "Серебро", condition: "Отличное", dateAdded: "2024-02-15" },
    { id: 6, name: "Картина 'Осенний пейзаж'", price: 75000, image: "images/peizag.jpg", description: "Масло, холст, подпись художника", category: "Живопись", period: "XIX век", material: "Холст", condition: "Требует реставрации", dateAdded: "2024-01-25" },
    { id: 7, name: "Бюро 18 века", price: 350000, image: "images/buro.jpg", description: "Дубовое бюро с инкрустацией", category: "Мебель", period: "Барокко", material: "Дерево", condition: "Хорошее", dateAdded: "2024-02-05" },
    { id: 8, name: "Статуэтка 'Дама с веером'", price: 28000, image: "images/dama.webp", description: "Фарфор, ручная роспись", category: "Фарфор", period: "Модерн", material: "Фарфор", condition: "Отличное", dateAdded: "2024-03-10" },
    { id: 9, name: "Шкатулка музыкальная", price: 42000, image: "images/shkat.jpg", description: "Ручная работа, инкрустация перламутром", category: "Предметы интерьера", period: "XIX век", material: "Дерево", condition: "Хорошее", dateAdded: "2024-02-28" },
    { id: 10, name: "Орден Святого Георгия", price: 180000, image: "images/orden.jpg", description: "Подлинный орден, серебро, эмаль", category: "Военные артефакты", period: "XIX век", material: "Серебро", condition: "Отличное", dateAdded: "2024-01-18" }
];

// Функция рендера каталога с фильтрацией
function renderCatalogWithFilters() {
    const container = document.getElementById('catalogProductsGrid');
    if (!container) return;
    
    // Получаем значения фильтров
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const category = document.getElementById('categoryFilter')?.value || 'all';
    const minPrice = parseInt(document.getElementById('minPrice')?.value) || 0;
    const maxPrice = parseInt(document.getElementById('maxPrice')?.value) || Infinity;
    const selectedPeriods = Array.from(document.querySelectorAll('#periodFilter input:checked') || []).map(cb => cb.value);
    const selectedMaterials = Array.from(document.querySelectorAll('#materialFilter input:checked') || []).map(cb => cb.value);
    const selectedConditions = Array.from(document.querySelectorAll('#conditionFilter input:checked') || []).map(cb => cb.value);
    const sortBy = document.getElementById('sortBy')?.value || 'default';
    
    // Фильтрация товаров
    let filtered = catalogProducts.filter(product => {
        // Поиск по названию и описанию
        if (searchTerm && !product.name.toLowerCase().includes(searchTerm) && !product.description.toLowerCase().includes(searchTerm)) {
            return false;
        }
        
        // По категории
        if (category !== 'all' && product.category !== category) {
            return false;
        }
        
        // По цене
        if (product.price < minPrice || product.price > maxPrice) {
            return false;
        }
        
        // По историческому периоду
        if (selectedPeriods.length > 0 && !selectedPeriods.includes(product.period)) {
            return false;
        }
        
        // По материалу
        if (selectedMaterials.length > 0 && !selectedMaterials.includes(product.material)) {
            return false;
        }
        
        // По состоянию
        if (selectedConditions.length > 0 && !selectedConditions.includes(product.condition)) {
            return false;
        }
        
        return true;
    });
    
    // Сортировка
    switch(sortBy) {
        case 'price_asc':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price_desc':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'name_asc':
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name_desc':
            filtered.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'newest':
            filtered.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
            break;
        default:
            filtered = filtered;
    }
    
    // Обновляем счётчик
    const countSpan = document.getElementById('productsCount');
    if (countSpan) countSpan.innerText = filtered.length;
    
    // Рендер товаров
    const currentView = document.querySelector('.view-btn.active')?.dataset.view || 'grid';
    
    if (filtered.length === 0) {
        container.innerHTML = '<div class="empty-catalog"><h3>😔 Товары не найдены</h3><p>Попробуйте изменить параметры фильтрации</p><button class="btn-primary" onclick="resetFilters()">Сбросить фильтры</button></div>';
        return;
    }
    
    container.innerHTML = filtered.map(product => `
        <div class="product-card">
            <div class="product-badges">
                <button class="favorite-btn ${isFavorite(product.id) ? 'active' : ''}" 
                        data-id="${product.id}" 
                        onclick="toggleFavorite(${product.id})">
                    ${isFavorite(product.id) ? '❤️' : '🤍'}
                </button>
            </div>
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-meta">
                    <span class="product-category">${product.category}</span>
                    <span class="product-period">${product.period}</span>
                </div>
                <div class="price">${product.price.toLocaleString()} ₽</div>
                <div class="product-actions">
                    <button class="btn-buy" onclick="addToCart(${product.id})">🛒 В корзину</button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Применяем класс вида отображения
    container.className = `products-grid ${currentView}-view`;
}

// Сброс всех фильтров
function resetFilters() {
    if (document.getElementById('searchInput')) document.getElementById('searchInput').value = '';
    if (document.getElementById('categoryFilter')) document.getElementById('categoryFilter').value = 'all';
    if (document.getElementById('minPrice')) document.getElementById('minPrice').value = '';
    if (document.getElementById('maxPrice')) document.getElementById('maxPrice').value = '';
    if (document.getElementById('sortBy')) document.getElementById('sortBy').value = 'default';
    
    // Сброс чекбоксов
    document.querySelectorAll('.checkbox-group input').forEach(cb => cb.checked = false);
    
    renderCatalogWithFilters();
}

// Переключение вида отображения (сетка/список)
function setView(view) {
    document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.view-btn[data-view="${view}"]`).classList.add('active');
    
    const container = document.getElementById('catalogProductsGrid');
    if (container) {
        container.className = `products-grid ${view}-view`;
    }
    renderCatalogWithFilters();
}

// Инициализация фильтров на странице каталога
function initCatalogFilters() {
    const filterElements = ['searchInput', 'categoryFilter', 'minPrice', 'maxPrice', 'sortBy'];
    filterElements.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', () => renderCatalogWithFilters());
            if (id === 'sortBy') el.addEventListener('change', () => renderCatalogWithFilters());
        }
    });
    
    document.querySelectorAll('.checkbox-group input').forEach(cb => {
        cb.addEventListener('change', () => renderCatalogWithFilters());
    });
}

// Корзина
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Избранное
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Сохранение корзины
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Обновление счетчика корзины
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('#cartCount').forEach(el => {
        if(el) el.innerText = count;
    });
}

// Добавление в корзину
function addToCart(productId) {
    const product = products.find(p => p.id == productId);
    const existing = cart.find(item => item.id == productId);
    if(existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    saveCart();
    alert("Товар добавлен в корзину");
}

// Удаление из корзины
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    if(window.location.pathname.includes('cart.html')) {
        renderCart();
    }
}

// Очистка корзины
function clearCart() {
    if(confirm('Очистить корзину?')) {
        cart = [];
        saveCart();
        if(window.location.pathname.includes('cart.html')) {
            renderCart();
        }
    }
}

// Рендер товаров на главной
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    if(!grid) return;
    grid.innerHTML = products.map(p => `
        <div class="product-card">
            <img src="${p.image}" alt="${p.name}">
            <div class="product-info">
                <h3>${p.name}</h3>
                <div class="price">${p.price.toLocaleString()} ₽</div>
                <button class="btn-buy" onclick="addToCart(${p.id})">В корзину</button>
            </div>
        </div>
    `).join('');
}

// Рендер корзины
function renderCart() {
    const container = document.getElementById('cartItems');
    if(!container) return;
    
    if(cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <h3>Ваша корзина пуста</h3>
                <p>Но у нас есть много интересных предметов старины, которые ждут вас!</p>
                <a href="index.html#catalog" class="btn-catalog">Перейти в каталог</a>
            </div>
        `;
        document.getElementById('cartTotal').innerText = '0 ₽';
        return;
    }
    
    let total = 0;
    container.innerHTML = cart.map(item => {
        total += item.price * item.quantity;
        return `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong><br>
                    ${item.quantity} шт. × ${item.price.toLocaleString()} ₽ = ${(item.price * item.quantity).toLocaleString()} ₽
                </div>
                <button onclick="removeFromCart(${item.id})">Удалить</button>
            </div>
        `;
    }).join('');
    document.getElementById('cartTotal').innerText = total.toLocaleString() + ' ₽';
}

// Рендер оформления заказа
function renderCheckout() {
    const container = document.getElementById('orderItems');
    if(!container) return;
    
    if(cart.length === 0) {
        container.innerHTML = '<p>Корзина пуста</p>';
        return;
    }
    
    let total = 0;
    container.innerHTML = cart.map(item => {
        total += item.price * item.quantity;
        return `<p>${item.name} x ${item.quantity} = ${(item.price * item.quantity).toLocaleString()} ₽</p>`;
    }).join('');
    document.getElementById('orderTotal').innerText = total.toLocaleString() + ' ₽';
}

// Рендер истории заказов в профиле
function renderOrders() {
    const container = document.getElementById('ordersList');
    if(!container) return;
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    if(orders.length === 0) {
        container.innerHTML = '<p>У вас пока нет заказов</p>';
        return;
    }
    container.innerHTML = orders.map(order => `
        <div class="cart-item">
            <div>
                <strong>Заказ #${order.id}</strong><br>
                Дата: ${order.date}<br>
                Сумма: ${order.total.toLocaleString()} ₽<br>
                Статус: ${order.status}
            </div>
        </div>
    `).join('');
}


// Сохранение избранного
function saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoritesUI();
}

// Добавление/удаление из избранного
function toggleFavorite(productId) {
    const index = favorites.indexOf(productId);
    if(index === -1) {
        favorites.push(productId);
        showNotification('✅ Товар добавлен в избранное');
    } else {
        favorites.splice(index, 1);
        showNotification('❌ Товар удален из избранного');
    }
    saveFavorites();
    renderProducts(); // Обновляем отображение кнопок
    if(document.getElementById('favoritesList')) {
        renderFavorites();
    }
}

// Проверка, в избранном ли товар
function isFavorite(productId) {
    return favorites.includes(productId);
}

// Уведомление
function showNotification(message) {
    // Создаем уведомление
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = message;
    document.body.appendChild(notification);
    
    // Анимация появления
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Удаляем через 2 секунды
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

// Обновление иконок избранного на всех страницах
function updateFavoritesUI() {
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        const productId = parseInt(btn.dataset.id);
        if(isFavorite(productId)) {
            btn.classList.add('active');
            btn.innerHTML = '❤️';
        } else {
            btn.classList.remove('active');
            btn.innerHTML = '🤍';
        }
    });
}

// Обновленный рендер товаров с кнопкой избранного
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    if(!grid) return;
    
    grid.innerHTML = products.map(p => `
        <div class="product-card">
            <div class="product-badges">
                <button class="favorite-btn ${isFavorite(p.id) ? 'active' : ''}" 
                        data-id="${p.id}" 
                        onclick="toggleFavorite(${p.id})">
                    ${isFavorite(p.id) ? '❤️' : '🤍'}
                </button>
            </div>
            <img src="${p.image}" alt="${p.name}">
            <div class="product-info">
                <h3>${p.name}</h3>
                <div class="price">${p.price.toLocaleString()} ₽</div>
                <div class="product-actions">
                    <button class="btn-buy" onclick="addToCart(${p.id})">🛒 В корзину</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Рендер избранного в профиле
function renderFavorites() {
    const container = document.getElementById('favoritesList');
    if(!container) return;
    
    const favoriteProducts = products.filter(p => favorites.includes(p.id));
    
    if(favoriteProducts.length === 0) {
        container.innerHTML = `
            <div class="empty-favorites">
                <div class="empty-icon">❤️</div>
                <h3>Избранное пусто</h3>
                <p>Добавляйте понравившиеся предметы старины в избранное, чтобы не потерять их!</p>
                <a href="index.html#catalog" class="btn-catalog">Перейти в каталог</a>
            </div>
        `;
        return;
    }
    
    container.innerHTML = favoriteProducts.map(product => `
        <div class="favorite-item">
            <img src="${product.image}" alt="${product.name}" class="favorite-item-img">
            <div class="favorite-item-info">
                <h3>${product.name}</h3>
                <p class="favorite-item-price">${product.price.toLocaleString()} ₽</p>
                <p class="favorite-item-desc">${product.description}</p>
            </div>
            <div class="favorite-item-actions">
                <button class="btn-buy-small" onclick="addToCart(${product.id}); showNotification('Товар добавлен в корзину')">🛒 В корзину</button>
                <button class="btn-remove-favorite" onclick="toggleFavorite(${product.id})">❤️ Удалить</button>
            </div>
        </div>
    `).join('');
}


// Оформление заказа
function submitOrder(e) {
    if(e) e.preventDefault();
    
    if(cart.length === 0) {
        alert('Корзина пуста');
        return;
    }
    
    const fullName = document.getElementById('fullName')?.value;
    const email = document.getElementById('email')?.value;
    const phone = document.getElementById('phone')?.value;
    const address = document.getElementById('address')?.value;
    
    if(!fullName || !email || !address) {
        alert('Заполните все обязательные поля');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const order = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        total: total,
        status: 'В обработке',
        items: [...cart],
        customer: { fullName, email, phone, address }
    };
    
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.unshift(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    cart = [];
    saveCart();
    
    alert('Заказ оформлен! Спасибо за покупку!');
    window.location.href = 'profile.html';
}

// Админские функции
function renderAdminProducts() {
    const container = document.getElementById('adminProductsTable');
    if(!container) return;
    container.innerHTML = `
        <table>
            <thead>
                <tr><th>ID</th><th>Название</th><th>Цена</th><th>Действия</th></tr>
            </thead>
            <tbody>
                ${products.map(p => `
                    <tr>
                        <td>${p.id}</td>
                        <td>${p.name}</td>
                        <td>${p.price.toLocaleString()} ₽</td>
                        <td>
                            <button onclick="editProduct(${p.id})" style="margin-right:5px;">✏️</button>
                            <button onclick="deleteProduct(${p.id})">🗑️</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function renderAdminOrders() {
    const container = document.getElementById('adminOrdersTable');
    if(!container) return;
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    if(orders.length === 0) {
        container.innerHTML = '<p>Нет заказов</p>';
        return;
    }
    container.innerHTML = `
        <table>
            <thead>
                <tr><th>ID</th><th>Клиент</th><th>Сумма</th><th>Статус</th><th>Действия</th></tr>
            </thead>
            <tbody>
                ${orders.map(order => `
                    <tr>
                        <td>#${order.id}</td>
                        <td>${order.customer?.fullName || 'Неизвестно'}</td>
                        <td>${order.total.toLocaleString()} ₽</td>
                        <td>
                            <select onchange="updateOrderStatus(${order.id}, this.value)">
                                <option ${order.status === 'В обработке' ? 'selected' : ''}>В обработке</option>
                                <option ${order.status === 'Отправлен' ? 'selected' : ''}>Отправлен</option>
                                <option ${order.status === 'Доставлен' ? 'selected' : ''}>Доставлен</option>
                                <option ${order.status === 'Отменен' ? 'selected' : ''}>Отменен</option>
                            </select>
                        </td>
                        <td><button onclick="deleteOrder(${order.id})">🗑️</button></td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function renderAdminUsers() {
    const container = document.getElementById('adminUsersTable');
    if(!container) return;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if(users.length === 0) {
        container.innerHTML = '<p>Нет пользователей</p>';
        return;
    }
    container.innerHTML = `
        <table>
            <thead>
                <tr><th>Имя</th><th>Email</th><th>Телефон</th><th>Действия</th></tr>
            </thead>
            <tbody>
                ${users.map(user => `
                    <tr>
                        <td>${user.name || '-'}</td>
                        <td>${user.email}</td>
                        <td>${user.phone || '-'}</td>
                        <td><button onclick="deleteUser('${user.email}')">🗑️</button></td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function deleteUser(email) {
    if(confirm('Удалить пользователя?')) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users = users.filter(u => u.email !== email);
        localStorage.setItem('users', JSON.stringify(users));
        renderAdminUsers();
    }
}

function editProduct(id) {
    const product = products.find(p => p.id === id);
    if(product) {
        document.getElementById('productId').value = product.id;
        document.getElementById('productName').value = product.name;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productImage').value = product.image;
        document.getElementById('productDescription').value = product.description;
        document.getElementById('productModal').style.display = 'block';
    }
}

function deleteProduct(id) {
    if(confirm('Удалить товар?')) {
        products = products.filter(p => p.id !== id);
        renderAdminProducts();
        renderProducts();
        alert('Товар удален');
    }
}

function showAddProductModal() {
    document.getElementById('productId').value = '';
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productImage').value = '';
    document.getElementById('productDescription').value = '';
    document.getElementById('productModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('productModal').style.display = 'none';
}

function saveProduct(e) {
    e.preventDefault();
    const id = document.getElementById('productId').value;
    const name = document.getElementById('productName').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const image = document.getElementById('productImage').value || 'images/empty.webp';
    const description = document.getElementById('productDescription').value;
    
    if(id) {
        const index = products.findIndex(p => p.id == id);
        if(index !== -1) {
            products[index] = { ...products[index], name, price, image, description };
        }
    } else {
        const newId = Math.max(...products.map(p => p.id), 0) + 1;
        products.push({ id: newId, name, price, image, description });
    }
    
    closeModal();
    renderAdminProducts();
    renderProducts();
    alert('Товар сохранен');
}

function updateOrderStatus(orderId, status) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const order = orders.find(o => o.id === orderId);
    if(order) {
        order.status = status;
        localStorage.setItem('orders', JSON.stringify(orders));
        renderAdminOrders();
        renderOrders();
    }
}

function deleteOrder(orderId) {
    if(confirm('Удалить заказ?')) {
        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders = orders.filter(o => o.id !== orderId);
        localStorage.setItem('orders', JSON.stringify(orders));
        renderAdminOrders();
        renderOrders();
    }
}

// Аутентификация
function login(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if(email && password) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);
        
        if(user || (email === 'admin@antique.ru' && password === 'admin123')) {
            const isAdmin = email === 'admin@antique.ru';
            localStorage.setItem('user', JSON.stringify({ 
                email, 
                name: user?.name || 'Администратор',
                isAdmin: isAdmin 
            }));
            alert('Вход выполнен!');
            window.location.href = isAdmin ? 'admin.html' : 'index.html';
        } else {
            alert('Неверный email или пароль');
        }
    }
}

function register(e) {
    e.preventDefault();
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const phone = document.getElementById('regPhone').value;
    const password = document.getElementById('regPassword').value;
    const confirm = document.getElementById('regConfirmPassword').value;
    
    if(!name || !email || !password) {
        alert('Заполните все обязательные поля');
        return;
    }
    
    if(password !== confirm) {
        alert('Пароли не совпадают');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if(users.find(u => u.email === email)) {
        alert('Пользователь с таким email уже существует');
        return;
    }
    
    users.push({ name, email, phone, password });
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('user', JSON.stringify({ email, name }));
    alert('Регистрация успешна!');
    window.location.href = 'index.html';
}

function logout() {
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

function checkAuth() {
    const user = JSON.parse(localStorage.getItem('user'));
    const authLink = document.getElementById('authLink');
    const profileLink = document.getElementById('profileLink');
    const userNameElem = document.getElementById('userName');
    const userEmailElem = document.getElementById('userEmail');
    const profileName = document.getElementById('profileName');
    const profileEmail = document.getElementById('profileEmail');
    const profilePhone = document.getElementById('profilePhone');
    
    if(user) {
        if(authLink) {
            authLink.innerText = '🚪 Выйти';
            authLink.href = 'javascript:logout()';
        }
        if(profileLink) profileLink.style.display = 'inline';
        if(userNameElem) userNameElem.innerText = user.name || user.email;
        if(userEmailElem) userEmailElem.innerText = user.email;
        if(profileName) profileName.value = user.name || '';
        if(profileEmail) profileEmail.value = user.email || '';
        
        // Загружаем телефон пользователя если есть
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userData = users.find(u => u.email === user.email);
        if(profilePhone && userData) profilePhone.value = userData.phone || '';
        
        // Проверка на админа для доступа к админке
        if(window.location.pathname.includes('admin.html') && !user.isAdmin) {
            alert('Доступ запрещен. Только для администратора.');
            window.location.href = 'index.html';
        }
    } else {
        if(authLink) {
            authLink.innerText = '🔑 Вход';
            authLink.href = 'login.html';
        }
        if(profileLink) profileLink.style.display = 'none';
        
        // Если на странице профиля или админки без авторизации
        if(window.location.pathname.includes('profile.html') || window.location.pathname.includes('admin.html')) {
            window.location.href = 'login.html';
        }
    }
}

// Сохранение профиля
function saveProfile(e) {
    e.preventDefault();
    const name = document.getElementById('profileName')?.value;
    const email = document.getElementById('profileEmail')?.value;
    const phone = document.getElementById('profilePhone')?.value;
    const user = JSON.parse(localStorage.getItem('user'));
    
    if(user && email) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.email === user.email);
        if(userIndex !== -1) {
            users[userIndex] = { ...users[userIndex], name, email, phone };
            localStorage.setItem('users', JSON.stringify(users));
        }
        user.name = name;
        user.email = email;
        localStorage.setItem('user', JSON.stringify(user));
        alert('Данные сохранены');
        checkAuth(); // Обновляем отображение
    }
}

function renderFavorites() {
    const container = document.getElementById('favoritesList');
    if(!container) return;
    
    if(favorites.length === 0) {
        container.innerHTML = '<p>У вас пока нет избранных товаров</p>';
        return;
    }
    
    container.innerHTML = favorites.map(id => {
        const product = products.find(p => p.id === id);
        if(!product) return '';
        return `
            <div class="cart-item">
                <div>
                    <strong>${product.name}</strong><br>
                    ${product.price.toLocaleString()} ₽
                </div>
                <button onclick="addToCart(${product.id})">В корзину</button>
            </div>
        `;
    }).join('');
}

function addToFavorites(productId) {
    if(!favorites.includes(productId)) {
        favorites.push(productId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert('Добавлено в избранное');
        renderFavorites();
    }
}

// Обработка формы обратной связи
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if(!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('contactName')?.value;
        const email = document.getElementById('contactEmail')?.value;
        const phone = document.getElementById('contactPhone')?.value;
        const subject = document.getElementById('contactSubject')?.value;
        const message = document.getElementById('contactMessage')?.value;
        const agreement = document.getElementById('contactAgreement')?.checked;
        
        if(!name || !email || !subject || !message) {
            alert('Пожалуйста, заполните все обязательные поля');
            return;
        }
        
        if(!agreement) {
            alert('Пожалуйста, согласитесь на обработку персональных данных');
            return;
        }
        
        const formData = {
            name, email, phone, subject, message,
            date: new Date().toLocaleString()
        };
        
        const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
        messages.push(formData);
        localStorage.setItem('contactMessages', JSON.stringify(messages));
        
        const formSection = document.querySelector('.contact-form-section');
        const successMsg = document.createElement('div');
        successMsg.className = 'contact-success';
        successMsg.innerHTML = `
            <div style="font-size: 3rem;">✅</div>
            <h3>Сообщение отправлено!</h3>
            <p>Спасибо, ${name}! Мы свяжемся с вами в ближайшее время.</p>
        `;
        
        contactForm.reset();
        
        const oldSuccess = document.querySelector('.contact-success');
        if(oldSuccess) oldSuccess.remove();
        formSection.appendChild(successMsg);
        
        setTimeout(() => {
            successMsg.remove();
        }, 5000);
    });
}

// Переключение табов в профиле
function initProfileTabs() {
    const btns = document.querySelectorAll('.profile-nav-btn');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            document.querySelectorAll('.profile-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.profile-nav-btn').forEach(b => b.classList.remove('active'));
            document.getElementById(`${tab}Tab`).classList.add('active');
            btn.classList.add('active');
            
            if(tab === 'favorites') renderFavorites();
        });
    });
}

function initAdminTabs() {
    const btns = document.querySelectorAll('.admin-nav-btn');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.adminTab;
            document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.admin-nav-btn').forEach(b => b.classList.remove('active'));
            document.getElementById(`${tab}Tab`).classList.add('active');
            btn.classList.add('active');
            
            if(tab === 'products') renderAdminProducts();
            if(tab === 'orders') renderAdminOrders();
            if(tab === 'users') renderAdminUsers();
        });
    });
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderCart();
    renderCheckout();
    renderOrders();
    renderAdminProducts();
    renderAdminOrders();
    renderAdminUsers();
    renderFavorites();
    updateCartCount();
    checkAuth();
    initProfileTabs();
    initAdminTabs();
    initContactForm();
    initCatalogFilters();
    renderCatalogWithFilters();
    
    const loginForm = document.getElementById('loginForm');
    if(loginForm) loginForm.addEventListener('submit', login);
    
    const registerForm = document.getElementById('registerForm');
    if(registerForm) registerForm.addEventListener('submit', register);
    
    const orderForm = document.getElementById('orderForm');
    if(orderForm) orderForm.addEventListener('submit', submitOrder);
    
    const profileForm = document.getElementById('profileForm');
    if(profileForm) profileForm.addEventListener('submit', saveProfile);
    
    const productForm = document.getElementById('productForm');
    if(productForm) productForm.addEventListener('submit', saveProduct);
    
    window.onclick = function(event) {
        const modal = document.getElementById('productModal');
        if(event.target === modal) closeModal();
    }
});