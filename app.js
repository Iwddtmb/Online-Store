const products = [
    { id: 1, title: "Телефон", price: 1000, category: "electronics", image: "https://via.placeholder.com/150" },
    { id: 2, title: "Футболка", price: 500, category: "clothing", image: "https://via.placeholder.com/150" },
    { id: 3, title: "Ноутбук", price: 2000, category: "electronics", image: "https://via.placeholder.com/150" },
    { id: 4, title: "Штаны", price: 700, category: "clothing", image: "https://via.placeholder.com/150" }
];

let cart = [];

function filterProductsByCategory(category) {
    if (category === "all") return products;
    return products.filter(product => product.category === category);
}


function displayProducts(products) {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.price} ₽</p>
            <button onclick="addToCart(${product.id})">Добавить в корзину</button>
        `;
        productsContainer.appendChild(productCard);
    });
}


function addToCart(productId) {
    const product = products.find(product => product.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({...product, quantity: 1 });
    }

    updateCart();
}


function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span>${item.title}</span>
            <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
            <button onclick="removeFromCart(${item.id})">Удалить</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    document.getElementById('total-price').textContent = `Общая стоимость: ${calculateTotalPrice(cart)} ₽`;
}


function calculateTotalPrice(cartItems) {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
}


function updateQuantity(productId, quantity) {
    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantity = parseInt(quantity, 10);
        updateCart();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

document.getElementById('category-filter').addEventListener('change', event => {
    const category = event.target.value;
    const filteredProducts = filterProductsByCategory(category);
    displayProducts(filteredProducts);
});

document.getElementById('catalog-link').addEventListener('click', () => {
    document.getElementById('catalog').classList.remove('hidden');
    document.getElementById('cart').classList.add('hidden');
});

document.getElementById('cart-link').addEventListener('click', () => {
    document.getElementById('catalog').classList.add('hidden');
    document.getElementById('cart').classList.remove('hidden');
});

// Инициализация
displayProducts(products);