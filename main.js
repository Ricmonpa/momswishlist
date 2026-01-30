// Gift Finder Logic
let appState = {
    screen: 'inicio', // 'inicio' | 'categorias' | 'productos'
    gender: null,
    category: null,
    wishlist: []
};

const CATEGORIES = {
    mujer: [
        { id: 'maquillaje', name: 'Maquillaje', icon: '💄' },
        { id: 'perfumeria', name: 'Perfumería', icon: '💐' },
        { id: 'bolsas', name: 'Bolsas de Mano', icon: '👜' },
        { id: 'joyeria', name: 'Joyería', icon: '💍' },
        { id: 'cuidado', name: 'Cuidado de Piel', icon: '💅' },
        { id: 'libros', name: 'Libros', icon: '📚' },
        { id: 'tecnologia', name: 'Tecnología', icon: '🎧' },
        { id: 'hogar', name: 'Hogar & Cocina', icon: '☕' }
    ],
    hombre: [
        { id: 'accesorios', name: 'Accesorios', icon: '🕶️' },
        { id: 'moda', name: 'Moda', icon: '👔' },
        { id: 'tecnologia', name: 'Tecnología', icon: '💼' },
        { id: 'cuidado', name: 'Cuidado Personal', icon: '🧴' },
        { id: 'relojes', name: 'Relojes', icon: '⌚' },
        { id: 'gaming', name: 'Gaming & Gadgets', icon: '🎮' },
        { id: 'libros', name: 'Libros', icon: '📚' },
        { id: 'deportes', name: 'Deportes', icon: '🏃' }
    ]
};

function render() {
    const container = document.getElementById('screen-container');
    container.innerHTML = '';
    container.className = 'fade-in';

    if (appState.screen === 'inicio') {
        renderWelcome(container);
    } else if (appState.screen === 'categorias') {
        renderCategories(container);
    } else if (appState.screen === 'productos') {
        renderProducts(container);
    }

    updateWishlistCounter();
}

function renderWelcome(container) {
    container.innerHTML = `
        <div class="welcome-screen">
            <div class="ai-character">
                <img src="san-valentin.svg" alt="Corazón Animado" class="animated-heart-img" onerror="this.src='reyes-magos.svg'">
            </div>
            
            <div class="chat-bubble">
                <div class="chat-bubble-tail"></div>
                <h1 class="chat-title">¿Qué te gustaría regalar este San Valentín?</h1>
                <p class="chat-subtitle">Encuentra el regalo perfecto</p>
            </div>

            <div class="gender-selection">
                <button class="gender-btn" onclick="selectGender('mujer')">👩 Para una Mujer</button>
                <button class="gender-btn" onclick="selectGender('hombre')">👨 Para un Hombre</button>
            </div>
        </div>
    `;
}

function renderCategories(container) {
    const cats = CATEGORIES[appState.gender];
    const title = appState.gender === 'mujer' ? 'Regalo para Mujer 👩' : 'Regalo para Hombre 👨';
    
    container.innerHTML = `
        <button class="back-btn" onclick="goBack()">
            <span style="font-size: 18px; font-weight: bold;">←</span>
            <span>Volver</span>
        </button>
        <h2 class="screen-title">${title}</h2>
        <p style="text-align: center; margin-bottom: 15px; font-size: 14px;">¿Qué le gustaría?</p>
        <div class="category-grid">
            ${cats.map(cat => `
                <button class="category-btn" onclick="selectCategory('${cat.id}')">
                    <div style="font-size: 24px; margin-bottom: 5px;">${cat.icon}</div>
                    ${cat.name}
                </button>
            `).join('')}
        </div>
    `;
}

function renderProducts(container) {
    const products = window.productosDatabase[appState.gender][appState.category] || [];
    const catName = CATEGORIES[appState.gender].find(c => c.id === appState.category)?.name;

    container.innerHTML = `
        <button class="back-btn" onclick="goBack()">
            <span style="font-size: 18px; font-weight: bold;">←</span>
            <span>Volver</span>
        </button>
        <h2 class="screen-title" style="font-size: 16px;">${catName}</h2>
        <p style="text-align: center; margin-bottom: 10px; font-size: 12px;">✨ Encontramos ofertas para ti</p>
        <div class="products-scroll">
            ${products.map(p => {
                const isAdded = appState.wishlist.some(item => item.id === p.id);
                return `
                    <div class="product-card" onclick="openProductPage('${p.url}')" style="cursor: pointer;">
                        <img src="${p.img}" 
                             class="product-img" 
                             alt="${p.nombre}"
                             loading="lazy"
                             onerror="this.src='https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=400&h=400&fit=crop&q=80'">
                        <div class="product-info">
                            <div class="product-name">${p.nombre}</div>
                            <div class="product-price">${p.precio}</div>
                            <button class="add-btn" onclick='event.stopPropagation(); toggleWishlist(${JSON.stringify(p)})'>
                                ${isAdded ? '❤️ Quitar' : '🤍 Agregar'}
                            </button>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
        <button class="btn-main" onclick="openEmailModal()">💌 ENVIAR WISHLIST POR EMAIL</button>
    `;
}
            }).join('')}
        </div>
        <button class="btn-main" onclick="openEmailModal()">💌 ENVIAR WISHLIST POR EMAIL</button>
    `;
}

window.selectGender = (gender) => {
    appState.gender = gender;
    appState.screen = 'categorias';
    render();
};

window.selectCategory = (category) => {
    appState.category = category;
    appState.screen = 'productos';
    render();
};

window.goBack = () => {
    if (appState.screen === 'productos') {
        appState.screen = 'categorias';
    } else if (appState.screen === 'categorias') {
        appState.screen = 'inicio';
    }
    render();
};

window.toggleWishlist = (product) => {
    const index = appState.wishlist.findIndex(item => item.id === product.id);
    if (index === -1) {
        appState.wishlist.push(product);
    } else {
        appState.wishlist.splice(index, 1);
    }
    updateWishlistCounter();
    render(); // Re-render to update button state
};

function updateWishlistCounter() {
    const counter = document.getElementById('wishlistCount');
    if (counter) counter.textContent = appState.wishlist.length;
}

// Modal Logic
window.openEmailModal = () => {
    if (appState.wishlist.length === 0) {
        alert('Agrega al menos un producto a tu wishlist primero ❤️');
        return;
    }
    document.getElementById('emailModal').classList.add('active');
};

document.getElementById('modalClose').onclick = () => {
    document.getElementById('emailModal').classList.remove('active');
};

document.getElementById('btnCancelar').onclick = () => {
    document.getElementById('emailModal').classList.remove('active');
};

document.getElementById('wishlistForm').onsubmit = (e) => {
    e.preventDefault();
    alert('¡Wishlist enviada con éxito! ❤️');
    document.getElementById('emailModal').classList.remove('active');
};

// Función para abrir página del producto
window.openProductPage = (url) => {
    if (url && url !== 'https://www.sanborns.com.mx') {
        window.open(url, '_blank');
    } else {
        // Si no hay URL específica, abrir página principal de Sanborns
        window.open('https://www.sanborns.com.mx', '_blank');
    }
};

// Start
document.addEventListener('DOMContentLoaded', render);
