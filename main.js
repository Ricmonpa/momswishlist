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

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DCO-lite: Pantalla 2 – 8 categorías por género (product.category + product.gender)
// matchCategories: al elegir esta categoría en Pantalla 3 se filtran productos con category en este array
// Mujer "Celulares" → Celulares + Tablets; "Gadgets" → Gadgets + Relojes
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const CATEGORIES = {
    mujer: [
        { id: 'maquillaje', name: 'Maquillaje', icon: '💄', matchCategories: ['Maquillaje'] },
        { id: 'skincare', name: 'Skincare', icon: '💅', matchCategories: ['Skincare'] },
        { id: 'perfumeria', name: 'Perfumería', icon: '💐', matchCategories: ['Perfumería'] },
        { id: 'estilismo', name: 'Estilismo', icon: '✂️', matchCategories: ['Estilismo'] },
        { id: 'celulares', name: 'Celulares', icon: '📱', matchCategories: ['Celulares', 'Tablets'] },
        { id: 'gadgets', name: 'Gadgets', icon: '⌚', matchCategories: ['Gadgets', 'Relojes'] },
        { id: 'fotografia', name: 'Fotografía', icon: '📷', matchCategories: ['Fotografía'] },
        { id: 'regalos', name: 'Regalos', icon: '🎁', matchCategories: ['Regalos'] }
    ],
    hombre: [
        { id: 'celulares', name: 'Celulares', icon: '📱', matchCategories: ['Celulares'] },
        { id: 'tablets', name: 'Tablets', icon: '📱', matchCategories: ['Tablets'] },
        { id: 'relojes', name: 'Relojes', icon: '⌚', matchCategories: ['Relojes'] },
        { id: 'gadgets', name: 'Gadgets', icon: '⌚', matchCategories: ['Gadgets'] },
        { id: 'audio', name: 'Audio', icon: '🎧', matchCategories: ['Audio'] },
        { id: 'fotografia', name: 'Fotografía', icon: '📷', matchCategories: ['Fotografía'] },
        { id: 'perfumeria', name: 'Perfumería', icon: '💐', matchCategories: ['Perfumería'] },
        { id: 'regalos', name: 'Regalos', icon: '🎁', matchCategories: ['Regalos'] }
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
    const catConfig = CATEGORIES[gender] && CATEGORIES[gender].find(function (c) { return c.id === category; });
    const matchCategories = (catConfig && catConfig.matchCategories) ? catConfig.matchCategories : [];

    let products = [];
    const catalog = window.PRODUCTS_CATALOG;
    if (Array.isArray(catalog) && catalog.length > 0 && matchCategories.length > 0) {
        products = catalog.filter(function (p) {
            return matchCategories.indexOf(p.category) !== -1 &&
                (p.gender === gender || p.gender === 'ambos');
        });
    } else if (window.productosDatabase && window.productosDatabase[gender] && window.productosDatabase[gender][category]) {
        products = window.productosDatabase[gender][category];
    }

    if (!Array.isArray(products) || products.length === 0) {
        if (matchCategories.length > 0 && catalog && catalog.length > 0) {
            console.warn('⚠️ DCO: Sin productos para', gender, '>', category, '| matchCategories:', matchCategories);
        }
    }
    const catName = catConfig ? catConfig.name : category;

    const isFromCatalog = Array.isArray(catalog) && catalog.length > 0 && products.length > 0 && products[0].hasOwnProperty('gender');

    container.innerHTML = `
        <button class="back-btn" onclick="goBack()">
            <span style="font-size: 18px; font-weight: bold;">←</span>
            <span>Volver</span>
        </button>
        <h2 class="screen-title" style="font-size: 16px;">${catName}</h2>
        <p style="text-align: center; margin-bottom: 10px; font-size: 12px;">✨ Encontramos ofertas para ti</p>
        <div class="products-scroll">
            ${products.map(function (p) {
                var pid = isFromCatalog ? String(p.id) : p.id;
                var isAdded = appState.wishlist.some(function (item) { return String(item.id) === String(pid); });
                var productUrl = typeof buildProductUrl === 'function' ? buildProductUrl(p) : (p.url || '#');
                var displayName = (isFromCatalog ? (p.name || p.id) : (p.nombre || '')) || '';
                var imgSrc = isFromCatalog
                    ? (p.imagePath && p.imagePath.indexOf('images/') !== -1 ? p.imagePath : (p.img && p.img.startsWith('http') ? p.img : 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop&q=80'))
                    : ((p.img && p.img.startsWith('http')) ? p.img : 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop&q=80');
                var price = isFromCatalog ? (p.precio || '') : (p.precio || '');
                return (
                    '<a href="' + (productUrl + '').replace(/"/g, '&quot;') + '" target="_blank" rel="noopener noreferrer" class="product-card" style="text-decoration: none; color: inherit; cursor: pointer; display: block;" data-product-id="' + String(pid).replace(/"/g, '&quot;') + '" data-product-name="' + (displayName + '').replace(/"/g, '&quot;') + '">' +
                    '<img src="' + (imgSrc + '').replace(/"/g, '&quot;') + '" class="product-img" alt="' + (displayName + '').replace(/"/g, '&quot;') + '" loading="lazy" onerror="this.src=\'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop&q=80\'">' +
                    '<div class="product-info">' +
                    '<div class="product-name">' + displayName + '</div>' +
                    (price ? '<div class="product-price">' + price + '</div>' : '') +
                    '<button type="button" class="add-btn" data-product-id="' + String(pid).replace(/"/g, '&quot;') + '" data-wishlist-btn>' + (isAdded ? '❤️ Quitar' : '🤍 Agregar') + '</button>' +
                    '</div></a>'
                );
            }).join('')}
        </div>
        <button class="btn-main" onclick="openEmailModal()">💌 ENVIAR WISHLIST POR EMAIL</button>
    `;
    // Delegated: botón wishlist (no seguir link)
    container.querySelectorAll('[data-wishlist-btn]').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var id = this.getAttribute('data-product-id');
            var product = products.find(function (pr) { return String(pr.id) === String(id); });
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
    const catConfig = CATEGORIES[gender] && CATEGORIES[gender].find(function (c) { return c.id === category; });
    const useCatalog = Array.isArray(window.PRODUCTS_CATALOG) && window.PRODUCTS_CATALOG.length > 0 && catConfig && catConfig.matchCategories;
    const productsRef = useCatalog
        ? window.PRODUCTS_CATALOG.filter(function (p) {
            return catConfig.matchCategories.indexOf(p.category) !== -1 && (p.gender === gender || p.gender === 'ambos');
          })
        : (window.productosDatabase && window.productosDatabase[gender] && window.productosDatabase[gender][category]);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📍 Categoría seleccionada:', category);
    console.log('👤 Género:', gender);
    console.log('📦 Productos encontrados:', useCatalog ? productsRef.length : productsRef);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━');
    if (!useCatalog && (!window.productosDatabase || !window.productosDatabase[gender] || !window.productosDatabase[gender][category])) {
        console.warn('⚠️ No hay productos para', gender, '>', category);
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
