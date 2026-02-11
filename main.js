// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TRACKING - Performance de la pieza (GTM + Cloudflare Zaraz)
// Reporte: género, categoría, producto clic, wishlist, envío
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function trackEvent(eventName, eventData) {
    var payload = Object.assign({ event: eventName }, eventData || {});
    if (typeof window.dataLayer !== 'undefined') {
        window.dataLayer.push(payload);
    }
    if (typeof window.zaraz !== 'undefined' && typeof window.zaraz.track === 'function') {
        window.zaraz.track(eventName, eventData || {});
    }
}

// Gift Finder Logic
let appState = {
    screen: 'inicio', // 'inicio' | 'categorias' | 'productos'
    gender: null,
    category: null,
    wishlist: []
};

// Orden debe coincidir con las keys en products-data.js (mujer/hombre)
const CATEGORIES = {
    mujer: [
        { id: 'maquillaje', name: 'Maquillaje', icon: '💄' },
        { id: 'cuidado', name: 'Cuidado de la Piel', icon: '💅' },
        { id: 'bolsas', name: 'Bolsas de Mano', icon: '👜' },
        { id: 'joyeria', name: 'Joyería', icon: '💍' },
        { id: 'perfumeria', name: 'Perfumería', icon: '💐' },
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
    const gender = appState.gender;
    const category = appState.category;
    const products = (window.productosDatabase && window.productosDatabase[gender] && window.productosDatabase[gender][category])
        ? window.productosDatabase[gender][category]
        : [];
    if (!Array.isArray(products) || products.length === 0) {
        if (window.productosDatabase && window.productosDatabase[gender]) {
            console.warn('⚠️ Sin productos para', gender, '>', category, '| Keys:', Object.keys(window.productosDatabase[gender]));
        }
    }
    const catName = CATEGORIES[gender].find(c => c.id === category)?.name;

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
                const productUrl = typeof buildProductUrl === 'function' ? buildProductUrl(p) : p.url;
                const imgSrc = (p.img && p.img.startsWith('http')) ? p.img : 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop&q=80';
                return `
                    <a href="${productUrl.replace(/"/g, '&quot;')}" target="_blank" rel="noopener noreferrer" class="product-card" style="text-decoration: none; color: inherit; cursor: pointer; display: block;" data-product-id="${p.id}" data-product-name="${(p.nombre || '').replace(/"/g, '&quot;')}">
                        <img src="${imgSrc.replace(/"/g, '&quot;')}" 
                             class="product-img" 
                             alt="${(p.nombre || '').replace(/"/g, '&quot;')}"
                             loading="lazy"
                             onerror="this.src='https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop&q=80'">
                        <div class="product-info">
                            <div class="product-name">${p.nombre}</div>
                            <div class="product-price">${p.precio}</div>
                            <button type="button" class="add-btn" data-product-id="${p.id}" data-wishlist-btn>
                                ${isAdded ? '❤️ Quitar' : '🤍 Agregar'}
                            </button>
                        </div>
                    </a>
                `;
            }).join('')}
        </div>
        <button class="btn-main" onclick="openEmailModal()">💌 ENVIAR WISHLIST POR EMAIL</button>
    `;
    // Delegated: botón wishlist (no seguir link)
    container.querySelectorAll('[data-wishlist-btn]').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            const id = parseInt(this.getAttribute('data-product-id'), 10);
            const product = products.find(pr => pr.id === id);
            if (product) toggleWishlist(product);
        });
    });
    // Delegated: track clic en producto (antes de que navegue el <a>)
    container.querySelectorAll('.product-card').forEach(link => {
        link.addEventListener('click', function () {
            var id = this.getAttribute('data-product-id');
            var name = this.getAttribute('data-product-name');
            if (id != null) {
                trackEvent('gift_finder_producto_click', {
                    product_id: id,
                    product_name: name || '',
                    gender: appState.gender,
                    category: appState.category
                });
            }
        });
    });
}

window.selectGender = (gender) => {
    appState.gender = gender;
    appState.screen = 'categorias';
    trackEvent('gift_finder_genero_seleccionado', { gender: gender });
    render();
};

window.selectCategory = (category) => {
    const gender = appState.gender;
    const productsRef = window.productosDatabase && window.productosDatabase[gender] && window.productosDatabase[gender][category];
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📍 Categoría seleccionada:', category);
    console.log('👤 Género:', gender);
    console.log('📦 Productos encontrados:', productsRef);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━');
    if (!window.productosDatabase || !window.productosDatabase[gender] || !window.productosDatabase[gender][category]) {
        console.error('❌ ERROR: No hay productos para', gender, '>', category);
        if (window.productosDatabase && window.productosDatabase[gender]) {
            console.log('Keys disponibles:', Object.keys(window.productosDatabase[gender]));
        }
    }
    appState.category = category;
    appState.screen = 'productos';
    trackEvent('gift_finder_categoria_seleccionada', { gender: gender, category: category });
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
        trackEvent('gift_finder_producto_agregado_wishlist', {
            product_id: String(product.id),
            product_name: product.nombre || '',
            gender: appState.gender,
            category: appState.category,
            wishlist_count: appState.wishlist.length
        });
    } else {
        appState.wishlist.splice(index, 1);
    }
    updateWishlistCounter();
    render();
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
    trackEvent('gift_finder_modal_wishlist_abierto', { wishlist_count: appState.wishlist.length });
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
    trackEvent('gift_finder_wishlist_enviada', {
        wishlist_count: appState.wishlist.length,
        gender: appState.gender,
        category: appState.category
    });
    alert('¡Wishlist enviada con éxito! ❤️');
    document.getElementById('emailModal').classList.remove('active');
};

// Función para abrir página del producto con tracking UTM
window.openProductPage = (url) => {
    if (!url) {
        window.open('https://www.sanborns.com.mx', '_blank', 'noopener,noreferrer');
        return;
    }
    
    // Agregar parámetros UTM para tracking
    const urlObj = new URL(url);
    urlObj.searchParams.set('utm_source', 'gift_finder');
    urlObj.searchParams.set('utm_medium', 'banner');
    urlObj.searchParams.set('utm_campaign', 'san_valentin_2025');
    
    window.open(urlObj.toString(), '_blank', 'noopener,noreferrer');
};

// Start
document.addEventListener('DOMContentLoaded', render);
