// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TRACKING - DataLayer + Enabler (DSP/DV360) - Zero logs
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function trackEvent(eventName, eventData) {
    var payload = Object.assign({ event: eventName, timestamp: new Date().toISOString() }, eventData || {});
    if (typeof window.dataLayer !== 'undefined') {
        window.dataLayer.push(payload);
    }
    if (typeof Enabler !== 'undefined' && Enabler.counter) {
        Enabler.counter(eventName);
    }
    if (typeof window.zaraz !== 'undefined' && typeof window.zaraz.track === 'function') {
        window.zaraz.track(eventName, eventData || {});
    }
}

// MediaSmart DSP: clic en producto con click tracker
window.handleProductClick = function (el) {
    var url = el.getAttribute('data-product-url');
    var id = el.getAttribute('data-product-id');
    var name = el.getAttribute('data-product-name') || '';
    if (id != null) {
        trackEvent('product_clicked', {
            product_id: id,
            product_name: name,
            gender: appState.gender,
            category: appState.category
        });
    }
    if (url) {
        // %click_url_unesc% + URL producto = MediaSmart trackea clic y redirige al producto
        var tracker = window.clickTracker || '';
        window.open(tracker + url, '_blank');
    }
};

// Gift Finder Logic
let appState = {
    screen: 'inicio', // 'inicio' | 'categorias' | 'productos'
    gender: null,
    category: null,
    wishlist: []
};

// Enviar wishlist por mailto - asignado a window INMEDIATAMENTE para que el botón funcione aunque falle código posterior
function sendWishlistByMail() {
    try {
        if (!appState.wishlist || appState.wishlist.length === 0) {
            alert('Por favor selecciona al menos un regalo.');
            return;
        }
        var toEmailEl = document.getElementById('emailPareja');
        var toEmail = (toEmailEl && toEmailEl.value) ? toEmailEl.value.trim() : '';
        if (!toEmail) {
            alert('Escribe el correo de destino.');
            return;
        }
        var items = appState.wishlist.map(function (p) {
            var url = (typeof buildProductUrl === 'function' ? buildProductUrl(p) : (p.url || window.landingPage)) || window.landingPage || (p.url || '');
            var name = (p.nombre || p.name || 'Producto ' + (p.id || '')) || 'Producto';
            var price = (p.precio || 'Ver en Sanborns') || '';
            return { name: name, url: url, price: price };
        });
        var count = items.length;
        console.log('Enviando correo con ' + count + ' productos');
        var productos = items.map(function (p) { return p.name + ' - ' + p.price + '\n' + p.url; }).join('\n\n');
        var subject = encodeURIComponent('Mi Wishlist Sanborns');
        var body = encodeURIComponent(
            'Hola amor ❤️\n\nEstos son los regalos que me gustarían para San Valentín:\n\n' + productos + '\n\nCon amor,\nTu pareja\n\n---\nCreado con Sanborns Wishlist de San Valentín'
        );
        window.location.href = 'mailto:' + toEmail + '?subject=' + subject + '&body=' + body;
        if (typeof trackEvent === 'function') trackEvent('wishlist_sent', { products_count: count, method: 'mailto' });
        var emailModal = document.getElementById('emailModal');
        if (emailModal) emailModal.classList.remove('active');
    } catch (e) {
        console.error('sendWishlistByMail error:', e);
        alert('Error al preparar el correo. Revisa la consola.');
    }
}
window.sendWishlistByMail = sendWishlistByMail;

// Delegación en documento (capture) para que el botón Enviar funcione en cel/iframe aunque fallen onclick o otros handlers
if (typeof document !== 'undefined') {
    document.addEventListener('click', function (e) {
        var t = e.target;
        var isBtn = t.id === 'btnEnviar';
        if (!isBtn && t.nodeType === 1) {
            var p = t.parentNode;
            while (p && p !== document.body) {
                if (p.id === 'btnEnviar') { isBtn = true; break; }
                p = p.parentNode;
            }
        }
        if (isBtn) {
            e.preventDefault();
            e.stopPropagation();
            if (typeof window.sendWishlistByMail === 'function') window.sendWishlistByMail();
        }
    }, true);
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DCO-lite: Pantalla 2 – 8 categorías por género (product.category + product.gender)
// matchCategories: al elegir esta categoría en Pantalla 3 se filtran productos con category en este array
// Mujer "Celulares" → Celulares + Tablets; "Gadgets" → Gadgets + Relojes
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const CATEGORIES = {
    mujer: [
        { id: 'celulares', name: 'Celulares', icon: '📱', matchCategories: ['Celulares'] },
        { id: 'gadgets', name: 'Gadgets', icon: '⌚', matchCategories: ['Gadgets', 'Relojes'] },
        { id: 'fotografia', name: 'Fotografía', icon: '📷', matchCategories: ['Fotografía'] },
        { id: 'regalos', name: 'Regalos', icon: '🎁', matchCategories: ['Regalos'] },
        { id: 'maquillaje', name: 'Maquillaje', icon: '💄', matchCategories: ['Maquillaje'] },
        { id: 'skincare', name: 'Skincare', icon: '💅', matchCategories: ['Skincare'] },
        { id: 'perfumeria', name: 'Perfumería', icon: '💐', matchCategories: ['Perfumería'] },
        { id: 'estilismo', name: 'Estilismo', icon: '✂️', matchCategories: ['Estilismo'] }
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

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Fallback bulletproof: cuando PRODUCTS_CATALOG está vacío, mapear DCO → legacy (productosDatabase)
// Garantiza que ningún botón devuelva undefined.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
var LEGACY_FALLBACK_MAP = {
    mujer: {
        maquillaje: 'maquillaje',
        skincare: 'cuidado',
        perfumeria: 'perfumeria',
        estilismo: 'estilismo',
        celulares: 'celulares',
        gadgets: 'gadgets',
        fotografia: 'fotografia',
        regalos: 'regalos'
    },
    hombre: {
        celulares: 'celulares',
        tablets: 'tablets',
        relojes: 'relojes',
        gadgets: 'tecnologia',
        audio: 'audio',
        fotografia: 'fotografia',
        perfumeria: 'perfumeria',
        regalos: 'regalos'
    }
};

function getLegacyCategoryKey(gender, dcoCategoryId) {
    var map = LEGACY_FALLBACK_MAP && LEGACY_FALLBACK_MAP[gender];
    return (map && map[dcoCategoryId]) || dcoCategoryId;
}

function getProductsFallback(gender, dcoCategoryId) {
    if (!window.productosDatabase || !window.productosDatabase[gender]) return [];
    var legacyKey = getLegacyCategoryKey(gender, dcoCategoryId);
    var list = window.productosDatabase[gender][legacyKey];
    if (Array.isArray(list) && list.length > 0) return list;
    var firstKey = Object.keys(window.productosDatabase[gender])[0];
    return window.productosDatabase[gender][firstKey] || [];
}

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
                <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMDAgMjAwIj4NCiAgPGRlZnM+DQogICAgPCEtLSBHcmFkaWVudGVzIHJvbcOhbnRpY29zIC0tPg0KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iaGVhcnRHcmFkaWVudCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+DQogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojRkY2OUI0Ii8+DQogICAgICA8c3RvcCBvZmZzZXQ9IjUwJSIgc3R5bGU9InN0b3AtY29sb3I6I0ZGMTQ5MyIvPg0KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojREMxNDNDIi8+DQogICAgPC9saW5lYXJHcmFkaWVudD4NCiAgICA8cmFkaWFsR3JhZGllbnQgaWQ9ImhlYXJ0R2xvdyIgY3g9IjUwJSIgY3k9IjUwJSIgcj0iNTAlIj4NCiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNGRjE0OTM7c3RvcC1vcGFjaXR5OjEiLz4NCiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6I0ZGMTQ5MztzdG9wLW9wYWNpdHk6MCIvPg0KICAgIDwvcmFkaWFsR3JhZGllbnQ+DQogICAgPCEtLSBGaWx0cm8gZGUgYnJpbGxvIC0tPg0KICAgIDxmaWx0ZXIgaWQ9Imdsb3ciIHg9Ii01MCUiIHk9Ii01MCUiIHdpZHRoPSIyMDAlIiBoZWlnaHQ9IjIwMCUiPg0KICAgICAgPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMyIgcmVzdWx0PSJjb2xvcmVkQmx1ciIvPg0KICAgICAgPGZlTWVyZ2U+DQogICAgICAgIDxmZU1lcmdlTm9kZSBpbj0iY29sb3JlZEJsdXIiLz4NCiAgICAgICAgPGZlTWVyZ2VOb2RlIGluPSJTb3VyY2VHcmFwaGljIi8+DQogICAgICA8L2ZlTWVyZ2U+DQogICAgPC9maWx0ZXI+DQogIDwvZGVmcz4NCg0KICA8IS0tIEZvbmRvIGNvbiBjb3Jhem9uZXMgZGVjb3JhdGl2b3MgLS0+DQogIDxnIG9wYWNpdHk9IjAuMiI+DQogICAgPHBhdGggZD0iTTUwLDYwIEM1MCw1MCA2MCw0MCA3MCw0MCBDODAsNDAgOTAsNTAgOTAsNjAgQzkwLDcwIDcwLDkwIDcwLDkwIEM3MCw5MCA1MCw3MCA1MCw2MCBaIiBmaWxsPSJ1cmwoI2hlYXJ0R3JhZGllbnQpIi8+DQogICAgPHBhdGggZD0iTTIxMCw2MCBDMjEwLDUwIDIyMCw0MCAyMzAsNDAgQzI0MCw0MCAyNTAsNTAgMjUwLDYwIEMyNTAsNzAgMjMwLDkwIDIzMCw5MCBDMjMwLDkwIDIxMCw3MCAyMTAsNjAgWiIgZmlsbD0idXJsKCNoZWFydEdyYWRpZW50KSIvPg0KICA8L2c+DQoNCiAgPCEtLSBDb3JhesOzbiBwcmluY2lwYWwgZ3JhbmRlIC0tPg0KICA8ZyBmaWx0ZXI9InVybCgjZ2xvdykiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE1MCwgMTAwKSI+DQogICAgPCEtLSBBdXJhIGRlbCBjb3JhesOzbiAtLT4NCiAgICA8Y2lyY2xlIGN4PSIwIiBjeT0iMCIgcj0iNDUiIGZpbGw9InVybCgjaGVhcnRHbG93KSIgb3BhY2l0eT0iMC40Ij4NCiAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiIHZhbHVlcz0iNDU7NTA7NDUiIGR1cj0iMnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+DQogICAgPC9jaXJjbGU+DQogICAgPCEtLSBDb3JhesOzbiBwcmluY2lwYWwgLS0+DQogICAgPHBhdGggZD0iTTAsLTIwIEMtMjAsLTM1IC00MCwtMjUgLTQwLC0xMCBDLTQwLDAgLTIwLDEwIDAsMzAgQzIwLDEwIDQwLDAgNDAsLTEwIEM0MCwtMjUgMjAsLTM1IDAsLTIwIFoiIA0KICAgICAgICAgIGZpbGw9InVybCgjaGVhcnRHcmFkaWVudCkiIA0KICAgICAgICAgIHN0cm9rZT0iI0ZGRkZGRiIgDQogICAgICAgICAgc3Ryb2tlLXdpZHRoPSIyIj4NCiAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImZpbGwtb3BhY2l0eSIgdmFsdWVzPSIxOzAuODsxIiBkdXI9IjJzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPg0KICAgIDwvcGF0aD4NCiAgICANCiAgICA8IS0tIEJyaWxsbyBlbiBlbCBjb3JhesOzbiAtLT4NCiAgICA8ZWxsaXBzZSBjeD0iLTgiIGN5PSItMTUiIHJ4PSI4IiByeT0iMTAiIGZpbGw9IiNGRkZGRkYiIG9wYWNpdHk9IjAuNiI+DQogICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiB2YWx1ZXM9IjAuNjswLjg7MC42IiBkdXI9IjEuNXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+DQogICAgPC9lbGxpcHNlPg0KICA8L2c+DQoNCiAgPCEtLSBDb3Jhem9uZXMgcGVxdWXDsW9zIGZsb3RhbnRlcyAtLT4NCiAgPGcgb3BhY2l0eT0iMC43Ij4NCiAgICA8cGF0aCBkPSJNMTAwLDE0MCBDMTAwLDEzNSAxMDUsMTMwIDExMCwxMzAgQzExNSwxMzAgMTIwLDEzNSAxMjAsMTQwIEMxMjAsMTQ1IDExMCwxNTUgMTEwLDE1NSBDMTEwLDE1NSAxMDAsMTQ1IDEwMCwxNDAgWiIgZmlsbD0iI0ZGNjlCNCI+DQogICAgICA8YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InRyYW5zbGF0ZSIgdmFsdWVzPSIwLDA7IDAsLTEwOyAwLDAiIGR1cj0iM3MiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+DQogICAgPC9wYXRoPg0KICAgIDxwYXRoIGQ9Ik0xODAsMTQwIEMxODAsMTM1IDE4NSwxMzAgMTkwLDEzMCBDMTk1LDEzMCAyMDAsMTM1IDIwMCwxNDAgQzIwMCwxNDUgMTkwLDE1NSAxOTAsMTU1IEMxOTAsMTU1IDE4MCwxNDUgMTgwLDE0MCBaIiBmaWxsPSIjRkYxNDkzIj4NCiAgICAgIDxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0idHJhbnNsYXRlIiB2YWx1ZXM9IjAsMDsgMCwtODsgMCwwIiBkdXI9IjIuNXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+DQogICAgPC9wYXRoPg0KICA8L2c+DQoNCiAgPCEtLSBSYXlvcyBkZSBhbW9yIC0tPg0KICA8ZyBvcGFjaXR5PSIwLjQiPg0KICAgIDxsaW5lIHgxPSIxNTAiIHkxPSI2MCIgeDI9IjE1MCIgeTI9IjUwIiBzdHJva2U9InVybCgjaGVhcnRHcmFkaWVudCkiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIj4NCiAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InkyIiB2YWx1ZXM9IjUwOzQ1OzUwIiBkdXI9IjEuNXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+DQogICAgPC9saW5lPg0KICAgIDxsaW5lIHgxPSIxNTAiIHkxPSIxNDAiIHgyPSIxNTAiIHkyPSIxNTAiIHN0cm9rZT0idXJsKCNoZWFydEdyYWRpZW50KSIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiPg0KICAgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ieTIiIHZhbHVlcz0iMTUwOzE1NTsxNTAiIGR1cj0iMS41cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4NCiAgICA8L2xpbmU+DQogICAgPGxpbmUgeDE9IjEwMCIgeTE9IjEwMCIgeDI9IjkwIiB5Mj0iMTAwIiBzdHJva2U9InVybCgjaGVhcnRHcmFkaWVudCkiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIj4NCiAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9IngyIiB2YWx1ZXM9IjkwOzg1OzkwIiBkdXI9IjEuNXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+DQogICAgPC9saW5lPg0KICAgIDxsaW5lIHgxPSIyMDAiIHkxPSIxMDAiIHgyPSIyMTAiIHkyPSIxMDAiIHN0cm9rZT0idXJsKCNoZWFydEdyYWRpZW50KSIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiPg0KICAgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ieDIiIHZhbHVlcz0iMjEwOzIxNTsyMTAiIGR1cj0iMS41cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4NCiAgICA8L2xpbmU+DQogIDwvZz4NCjwvc3ZnPg0K" alt="Corazón Animado" class="animated-heart-img" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMDAgMjAwIj4NCiAgPGRlZnM+DQogICAgPCEtLSBHcmFkaWVudGVzIC0tPg0KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0ic3Rhckdsb3ciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPg0KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6I0ZGRkZGRiIvPg0KICAgICAgPHN0b3Agb2Zmc2V0PSI1MCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNGRkQ3MDAiLz4NCiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6I0ZGQTUwMCIvPg0KICAgIDwvbGluZWFyR3JhZGllbnQ+DQogICAgPHJhZGlhbEdyYWRpZW50IGlkPSJzdGFyQXVyYSIgY3g9IjUwJSIgY3k9IjUwJSIgcj0iNTAlIj4NCiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNGRkQ3MDA7c3RvcC1vcGFjaXR5OjEiLz4NCiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6I0ZGRDcwMDtzdG9wLW9wYWNpdHk6MCIvPg0KICAgIDwvcmFkaWFsR3JhZGllbnQ+DQogICAgPGxpbmVhckdyYWRpZW50IGlkPSJyb2JlUmVkIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4NCiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNEQzE0M0MiLz4NCiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6IzhCMDAwMCIvPg0KICAgIDwvbGluZWFyR3JhZGllbnQ+DQogICAgPGxpbmVhckdyYWRpZW50IGlkPSJyb2JlQmx1ZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+DQogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojNDE2OUUxIi8+DQogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMxOTE5NzAiLz4NCiAgICA8L2xpbmVhckdyYWRpZW50Pg0KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0icm9iZUdyZWVuIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4NCiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMyMjhCMjIiLz4NCiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6IzAwNjQwMCIvPg0KICAgIDwvbGluZWFyR3JhZGllbnQ+DQogICAgPGxpbmVhckdyYWRpZW50IGlkPSJjYW1lbEJvZHkiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPg0KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6I0QyQTY3OSIvPg0KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojQTA4MjZEIi8+DQogICAgPC9saW5lYXJHcmFkaWVudD4NCiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImdvbGQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPg0KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6I0ZGRDcwMCIvPg0KICAgICAgPHN0b3Agb2Zmc2V0PSI1MCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNGRkMxMjUiLz4NCiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6I0RBQTUyMCIvPg0KICAgIDwvbGluZWFyR3JhZGllbnQ+DQogICAgPCEtLSBGaWx0cm8gZGUgYnJpbGxvIC0tPg0KICAgIDxmaWx0ZXIgaWQ9Imdsb3ciIHg9Ii01MCUiIHk9Ii01MCUiIHdpZHRoPSIyMDAlIiBoZWlnaHQ9IjIwMCUiPg0KICAgICAgPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMyIgcmVzdWx0PSJjb2xvcmVkQmx1ciIvPg0KICAgICAgPGZlTWVyZ2U+DQogICAgICAgIDxmZU1lcmdlTm9kZSBpbj0iY29sb3JlZEJsdXIiLz4NCiAgICAgICAgPGZlTWVyZ2VOb2RlIGluPSJTb3VyY2VHcmFwaGljIi8+DQogICAgICA8L2ZlTWVyZ2U+DQogICAgPC9maWx0ZXI+DQogIDwvZGVmcz4NCg0KICA8IS0tIEVzdHJlbGxhIGRlIEJlbMOpbiBjb24gcmF5b3MgLS0+DQogIDxnIGZpbHRlcj0idXJsKCNnbG93KSI+DQogICAgPCEtLSBBdXJhIGRlIGxhIGVzdHJlbGxhIC0tPg0KICAgIDxjaXJjbGUgY3g9IjE1MCIgY3k9IjI1IiByPSIyMCIgZmlsbD0idXJsKCNzdGFyQXVyYSkiIG9wYWNpdHk9IjAuNiI+DQogICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJyIiB2YWx1ZXM9IjIwOzI1OzIwIiBkdXI9IjJzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPg0KICAgIDwvY2lyY2xlPg0KICAgIDwhLS0gUmF5b3MgZGUgbGEgZXN0cmVsbGEgLS0+DQogICAgPGcgZmlsbD0idXJsKCNzdGFyR2xvdykiPg0KICAgICAgPHBvbHlnb24gcG9pbnRzPSIxNTAsNSAxNTMsMjAgMTUwLDE1IDE0NywyMCIgb3BhY2l0eT0iMC44Ii8+DQogICAgICA8cG9seWdvbiBwb2ludHM9IjE1MCw0NSAxNTMsMzAgMTUwLDM1IDE0NywzMCIgb3BhY2l0eT0iMC44Ii8+DQogICAgICA8cG9seWdvbiBwb2ludHM9IjEzMCwyNSAxNDUsMjggMTQwLDI1IDE0NSwyMiIgb3BhY2l0eT0iMC44Ii8+DQogICAgICA8cG9seWdvbiBwb2ludHM9IjE3MCwyNSAxNTUsMjggMTYwLDI1IDE1NSwyMiIgb3BhY2l0eT0iMC44Ii8+DQogICAgICA8IS0tIFJheW9zIGRpYWdvbmFsZXMgLS0+DQogICAgICA8cG9seWdvbiBwb2ludHM9IjEzNSwxMCAxNDUsMjIgMTQyLDIwIDE0OCwxOCIgb3BhY2l0eT0iMC42Ii8+DQogICAgICA8cG9seWdvbiBwb2ludHM9IjE2NSwxMCAxNTUsMjIgMTU4LDIwIDE1MiwxOCIgb3BhY2l0eT0iMC42Ii8+DQogICAgICA8cG9seWdvbiBwb2ludHM9IjEzNSw0MCAxNDUsMjggMTQyLDMwIDE0OCwzMiIgb3BhY2l0eT0iMC42Ii8+DQogICAgICA8cG9seWdvbiBwb2ludHM9IjE2NSw0MCAxNTUsMjggMTU4LDMwIDE1MiwzMiIgb3BhY2l0eT0iMC42Ii8+DQogICAgPC9nPg0KICAgIDwhLS0gRXN0cmVsbGEgY2VudHJhbCAtLT4NCiAgICA8cG9seWdvbiBwb2ludHM9IjE1MCw4IDE1NCwyMCAxNjcsMjAgMTU2LDI4IDE2MCw0MCAxNTAsMzIgMTQwLDQwIDE0NCwyOCAxMzMsMjAgMTQ2LDIwIiBmaWxsPSJ1cmwoI2dvbGQpIj4NCiAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIHZhbHVlcz0iMTswLjg7MSIgZHVyPSIxLjVzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPg0KICAgIDwvcG9seWdvbj4NCiAgPC9nPg0KDQogIDwhLS0gQ2FtZWxsbyAxIChpenF1aWVyZGEpIC0tPg0KICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMCwgOTApIj4NCiAgICA8IS0tIEN1ZXJwbyAtLT4NCiAgICA8ZWxsaXBzZSBjeD0iMzUiIGN5PSI2MCIgcng9IjMwIiByeT0iMjAiIGZpbGw9InVybCgjY2FtZWxCb2R5KSIvPg0KICAgIDwhLS0gSm9yb2JhIC0tPg0KICAgIDxlbGxpcHNlIGN4PSIzNSIgY3k9IjQ1IiByeD0iMTIiIHJ5PSIxNSIgZmlsbD0idXJsKCNjYW1lbEJvZHkpIi8+DQogICAgPCEtLSBDdWVsbG8gLS0+DQogICAgPHBhdGggZD0iTSA1NSA1MCBRIDcwIDMwIDY1IDE1IiBzdHJva2U9IiNBMDgyNkQiIHN0cm9rZS13aWR0aD0iOCIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+DQogICAgPCEtLSBDYWJlemEgLS0+DQogICAgPGVsbGlwc2UgY3g9IjY4IiBjeT0iMTIiIHJ4PSIxMiIgcnk9IjgiIGZpbGw9IiNEMkE2NzkiLz4NCiAgICA8IS0tIE9qbyAtLT4NCiAgICA8Y2lyY2xlIGN4PSI3MyIgY3k9IjEwIiByPSIyIiBmaWxsPSIjMkMxODEwIi8+DQogICAgPCEtLSBQYXRhcyAtLT4NCiAgICA8bGluZSB4MT0iMjAiIHkxPSI3NSIgeDI9IjE1IiB5Mj0iMTAwIiBzdHJva2U9IiNBMDgyNkQiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+DQogICAgPGxpbmUgeDE9IjUwIiB5MT0iNzUiIHgyPSI1NSIgeTI9IjEwMCIgc3Ryb2tlPSIjQTA4MjZEIiBzdHJva2Utd2lkdGg9IjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPg0KICA8L2c+DQoNCiAgPCEtLSBSZXkgTWVsY2hvciAoaXpxdWllcmRhIC0gcm9qbykgLS0+DQogIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMwLCA1NSkiPg0KICAgIDwhLS0gQ3VlcnBvL1TDum5pY2EgLS0+DQogICAgPHBhdGggZD0iTSAyNSA0NSBMIDEwIDk1IEwgNDAgOTUgWiIgZmlsbD0idXJsKCNyb2JlUmVkKSIvPg0KICAgIDwhLS0gQ2FwYSAtLT4NCiAgICA8cGF0aCBkPSJNIDIwIDUwIFEgNSA3MCAxNSA5NSIgc3Ryb2tlPSIjRkZENzAwIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiLz4NCiAgICA8IS0tIENhYmV6YSAtLT4NCiAgICA8Y2lyY2xlIGN4PSIyNSIgY3k9IjM4IiByPSIxMiIgZmlsbD0iIzhCNUEyQiIvPg0KICAgIDwhLS0gQmFyYmEgYmxhbmNhIC0tPg0KICAgIDxlbGxpcHNlIGN4PSIyNSIgY3k9IjQ4IiByeD0iOCIgcnk9IjYiIGZpbGw9IiNGNUY1RjUiLz4NCiAgICA8IS0tIENvcm9uYSAtLT4NCiAgICA8cGF0aCBkPSJNIDE1IDI4IEwgMTcgMjAgTCAyMiAyNiBMIDI1IDE4IEwgMjggMjYgTCAzMyAyMCBMIDM1IDI4IFoiIGZpbGw9InVybCgjZ29sZCkiLz4NCiAgICA8IS0tIE9qb3MgLS0+DQogICAgPGNpcmNsZSBjeD0iMjIiIGN5PSIzNiIgcj0iMS41IiBmaWxsPSIjMkMxODEwIi8+DQogICAgPGNpcmNsZSBjeD0iMjgiIGN5PSIzNiIgcj0iMS41IiBmaWxsPSIjMkMxODEwIi8+DQogICAgPCEtLSBSZWdhbG8gLS0+DQogICAgPHJlY3QgeD0iMzUiIHk9IjYwIiB3aWR0aD0iMTIiIGhlaWdodD0iMTAiIGZpbGw9IiNGRkQ3MDAiIHJ4PSIxIi8+DQogICAgPGxpbmUgeDE9IjQxIiB5MT0iNjAiIHgyPSI0MSIgeTI9IjcwIiBzdHJva2U9IiNEQzE0M0MiIHN0cm9rZS13aWR0aD0iMiIvPg0KICAgIDxsaW5lIHgxPSIzNSIgeTE9IjY1IiB4Mj0iNDciIHkyPSI2NSIgc3Ryb2tlPSIjREMxNDNDIiBzdHJva2Utd2lkdGg9IjIiLz4NCiAgPC9nPg0KDQogIDwhLS0gQ2FtZWxsbyAyIChjZW50cm8pIC0tPg0KICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMTAsIDg1KSI+DQogICAgPCEtLSBDdWVycG8gLS0+DQogICAgPGVsbGlwc2UgY3g9IjM1IiBjeT0iNjUiIHJ4PSIzMiIgcnk9IjIyIiBmaWxsPSJ1cmwoI2NhbWVsQm9keSkiLz4NCiAgICA8IS0tIEpvcm9iYSAtLT4NCiAgICA8ZWxsaXBzZSBjeD0iMzUiIGN5PSI0OCIgcng9IjE0IiByeT0iMTciIGZpbGw9InVybCgjY2FtZWxCb2R5KSIvPg0KICAgIDwhLS0gQ3VlbGxvIC0tPg0KICAgIDxwYXRoIGQ9Ik0gNTUgNTUgUSA3NSAzMCA3MCAxMCIgc3Ryb2tlPSIjQTA4MjZEIiBzdHJva2Utd2lkdGg9IjkiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPg0KICAgIDwhLS0gQ2FiZXphIC0tPg0KICAgIDxlbGxpcHNlIGN4PSI3MyIgY3k9IjgiIHJ4PSIxMyIgcnk9IjkiIGZpbGw9IiNEMkE2NzkiLz4NCiAgICA8IS0tIE9qbyAtLT4NCiAgICA8Y2lyY2xlIGN4PSI3OCIgY3k9IjYiIHI9IjIiIGZpbGw9IiMyQzE4MTAiLz4NCiAgICA8IS0tIFBhdGFzIC0tPg0KICAgIDxsaW5lIHgxPSIxOCIgeTE9IjgyIiB4Mj0iMTIiIHkyPSIxMDgiIHN0cm9rZT0iI0EwODI2RCIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4NCiAgICA8bGluZSB4MT0iNTIiIHkxPSI4MiIgeDI9IjU4IiB5Mj0iMTA4IiBzdHJva2U9IiNBMDgyNkQiIHN0cm9rZS13aWR0aD0iNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+DQogIDwvZz4NCg0KICA8IS0tIFJleSBHYXNwYXIgKGNlbnRybyAtIGF6dWwpIC0tPg0KICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMjAsIDQ1KSI+DQogICAgPCEtLSBDdWVycG8vVMO6bmljYSAtLT4NCiAgICA8cGF0aCBkPSJNIDMwIDUwIEwgMTIgMTA1IEwgNDggMTA1IFoiIGZpbGw9InVybCgjcm9iZUJsdWUpIi8+DQogICAgPCEtLSBEZXRhbGxlcyBkb3JhZG9zIC0tPg0KICAgIDxwYXRoIGQ9Ik0gMjIgNjAgTCAzMCAxMDUiIHN0cm9rZT0iI0ZGRDcwMCIgc3Ryb2tlLXdpZHRoPSIxLjUiLz4NCiAgICA8cGF0aCBkPSJNIDM4IDYwIEwgMzAgMTA1IiBzdHJva2U9IiNGRkQ3MDAiIHN0cm9rZS13aWR0aD0iMS41Ii8+DQogICAgPCEtLSBDYWJlemEgLS0+DQogICAgPGNpcmNsZSBjeD0iMzAiIGN5PSI0MiIgcj0iMTMiIGZpbGw9IiNERUI4ODciLz4NCiAgICA8IS0tIENhYmVsbG8vVHVyYmFudGUgLS0+DQogICAgPHBhdGggZD0iTSAxOCAzOCBRIDIwIDI4IDMwIDI2IFEgNDAgMjggNDIgMzgiIGZpbGw9IiM0QjAwODIiLz4NCiAgICA8IS0tIENvcm9uYSBzb2JyZSB0dXJiYW50ZSAtLT4NCiAgICA8cGF0aCBkPSJNIDIwIDMwIEwgMjMgMjIgTCAyOCAyOCBMIDMwIDIwIEwgMzIgMjggTCAzNyAyMiBMIDQwIDMwIFoiIGZpbGw9InVybCgjZ29sZCkiLz4NCiAgICA8IS0tIE9qb3MgLS0+DQogICAgPGNpcmNsZSBjeD0iMjYiIGN5PSI0MCIgcj0iMS41IiBmaWxsPSIjMkMxODEwIi8+DQogICAgPGNpcmNsZSBjeD0iMzQiIGN5PSI0MCIgcj0iMS41IiBmaWxsPSIjMkMxODEwIi8+DQogICAgPCEtLSBCYXJiYSBjb3J0YSAtLT4NCiAgICA8ZWxsaXBzZSBjeD0iMzAiIGN5PSI1MCIgcng9IjYiIHJ5PSI0IiBmaWxsPSIjNEEzNzI4Ii8+DQogICAgPCEtLSBSZWdhbG8gKGluY2llbnNvKSAtLT4NCiAgICA8cmVjdCB4PSI0NSIgeT0iNjUiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxNSIgZmlsbD0iI0MwQzBDMCIgcng9IjIiLz4NCiAgICA8ZWxsaXBzZSBjeD0iNTAiIGN5PSI2MiIgcng9IjMiIHJ5PSIyIiBmaWxsPSIjRkZENzAwIi8+DQogIDwvZz4NCg0KICA8IS0tIENhbWVsbG8gMyAoZGVyZWNoYSkgLS0+DQogIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE5NSwgOTIpIj4NCiAgICA8IS0tIEN1ZXJwbyAtLT4NCiAgICA8ZWxsaXBzZSBjeD0iMzUiIGN5PSI1OCIgcng9IjI4IiByeT0iMTgiIGZpbGw9InVybCgjY2FtZWxCb2R5KSIvPg0KICAgIDwhLS0gSm9yb2JhIC0tPg0KICAgIDxlbGxpcHNlIGN4PSIzNSIgY3k9IjQ0IiByeD0iMTEiIHJ5PSIxNCIgZmlsbD0idXJsKCNjYW1lbEJvZHkpIi8+DQogICAgPCEtLSBDdWVsbG8gLS0+DQogICAgPHBhdGggZD0iTSA1NSA0OCBRIDY4IDI4IDYzIDEyIiBzdHJva2U9IiNBMDgyNkQiIHN0cm9rZS13aWR0aD0iNyIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+DQogICAgPCEtLSBDYWJlemEgLS0+DQogICAgPGVsbGlwc2UgY3g9IjY2IiBjeT0iMTAiIHJ4PSIxMSIgcnk9IjciIGZpbGw9IiNEMkE2NzkiLz4NCiAgICA8IS0tIE9qbyAtLT4NCiAgICA8Y2lyY2xlIGN4PSI3MSIgY3k9IjgiIHI9IjIiIGZpbGw9IiMyQzE4MTAiLz4NCiAgICA8IS0tIFBhdGFzIC0tPg0KICAgIDxsaW5lIHgxPSIxOCIgeTE9IjcyIiB4Mj0iMTQiIHkyPSI5NSIgc3Ryb2tlPSIjQTA4MjZEIiBzdHJva2Utd2lkdGg9IjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPg0KICAgIDxsaW5lIHgxPSI0OCIgeTE9IjcyIiB4Mj0iNTIiIHkyPSI5NSIgc3Ryb2tlPSIjQTA4MjZEIiBzdHJva2Utd2lkdGg9IjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPg0KICA8L2c+DQoNCiAgPCEtLSBSZXkgQmFsdGFzYXIgKGRlcmVjaGEgLSB2ZXJkZSkgLS0+DQogIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIwNSwgNTcpIj4NCiAgICA8IS0tIEN1ZXJwby9Uw7puaWNhIC0tPg0KICAgIDxwYXRoIGQ9Ik0gMjUgNDUgTCA4IDkyIEwgNDIgOTIgWiIgZmlsbD0idXJsKCNyb2JlR3JlZW4pIi8+DQogICAgPCEtLSBEZXRhbGxlcyAtLT4NCiAgICA8cGF0aCBkPSJNIDI1IDUwIEwgMjUgOTIiIHN0cm9rZT0iI0ZGRDcwMCIgc3Ryb2tlLXdpZHRoPSIyIi8+DQogICAgPCEtLSBDYWJlemEgLS0+DQogICAgPGNpcmNsZSBjeD0iMjUiIGN5PSIzOCIgcj0iMTIiIGZpbGw9IiMzRDIzMTQiLz4NCiAgICA8IS0tIENvcm9uYSBlbGFib3JhZGEgLS0+DQogICAgPHBhdGggZD0iTSAxNCAzMCBMIDE2IDE4IEwgMjAgMjYgTCAyNSAxNSBMIDMwIDI2IEwgMzQgMTggTCAzNiAzMCBaIiBmaWxsPSJ1cmwoI2dvbGQpIi8+DQogICAgPCEtLSBKb3lhIGVuIGNvcm9uYSAtLT4NCiAgICA8Y2lyY2xlIGN4PSIyNSIgY3k9IjIyIiByPSIzIiBmaWxsPSIjRTAxMTVGIi8+DQogICAgPCEtLSBPam9zIC0tPg0KICAgIDxjaXJjbGUgY3g9IjIyIiBjeT0iMzYiIHI9IjEuNSIgZmlsbD0iI0Y1RjVGNSIvPg0KICAgIDxjaXJjbGUgY3g9IjI4IiBjeT0iMzYiIHI9IjEuNSIgZmlsbD0iI0Y1RjVGNSIvPg0KICAgIDwhLS0gU29ucmlzYSAtLT4NCiAgICA8cGF0aCBkPSJNIDIxIDQyIFEgMjUgNDUgMjkgNDIiIHN0cm9rZT0iI0Y1RjVGNSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIi8+DQogICAgPCEtLSBSZWdhbG8gKG1pcnJhKSAtLT4NCiAgICA8ZWxsaXBzZSBjeD0iNDIiIGN5PSI2MiIgcng9IjYiIHJ5PSI4IiBmaWxsPSIjOEI0NTEzIi8+DQogICAgPGVsbGlwc2UgY3g9IjQyIiBjeT0iNTYiIHJ4PSI0IiByeT0iMyIgZmlsbD0iI0ZGRDcwMCIvPg0KICA8L2c+DQoNCiAgPCEtLSBTdWVsby9BcmVuYSBkZWwgZGVzaWVydG8gLS0+DQogIDxlbGxpcHNlIGN4PSIxNTAiIGN5PSIxOTUiIHJ4PSIxNDAiIHJ5PSI4IiBmaWxsPSIjQzJBMzY2IiBvcGFjaXR5PSIwLjMiLz4NCjwvc3ZnPg0KDQo='">
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

    var products = [];
    var catalog = window.PRODUCTS_CATALOG;
    if (Array.isArray(catalog) && catalog.length > 0 && matchCategories.length > 0) {
        products = catalog.filter(function (p) {
            return matchCategories.indexOf(p.category) !== -1 &&
                (p.gender === gender || p.gender === 'ambos');
        });
    }
    // Fallback SOLO cuando el catálogo no devolvió productos (nunca mezclar catalog + productosDatabase).
    if (!Array.isArray(products) || products.length === 0) {
        products = getProductsFallback(gender, category);
    }

    if (!Array.isArray(products) || products.length === 0) {
        /* DCO: sin productos para esta combinación género/categoría */
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
                var displayName = (isFromCatalog ? (p.name || 'Producto ' + p.id) : (p.nombre || '')) || '';
                /* Catálogo: product.name viene del JSON generado (Moda = MODA_NAMES; Big Ticket = slug URL). */
                var imgSrc = isFromCatalog
                    ? (p.imagePath && p.imagePath.indexOf('images/') !== -1 ? p.imagePath : (p.img && p.img.startsWith('http') ? p.img : 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop&q=80'))
                    : ((p.img && String(p.img).trim()) ? p.img : 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop&q=80');
                var price = isFromCatalog ? (p.precio || 'Ver en Sanborns') : (p.precio || '');
                return (
                    '<div class="product-card" role="button" style="cursor: pointer; display: block;" data-product-id="' + String(pid).replace(/"/g, '&quot;') + '" data-product-name="' + (displayName + '').replace(/"/g, '&quot;') + '" data-product-url="' + (productUrl + '').replace(/"/g, '&quot;') + '" onclick="handleProductClick(this)">' +
                    '<img src="' + (imgSrc + '').replace(/"/g, '&quot;') + '" class="product-img" alt="' + (displayName + '').replace(/"/g, '&quot;') + '" loading="lazy" onerror="this.src=\'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop&q=80\'">' +
                    '<div class="product-info">' +
                    '<div class="product-name">' + displayName + '</div>' +
                    '<div class="product-price">' + price + '</div>' +
                    '<button type="button" class="add-btn" data-product-id="' + String(pid).replace(/"/g, '&quot;') + '" data-wishlist-btn>' + (isAdded ? '❤️ Quitar' : '🤍 Agregar') + '</button>' +
                    '</div></div>'
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
    /* Clic en producto: handleProductClick (onclick) hace track + window.open - QA CM360/DV360 */
}

window.selectGender = (gender) => {
    appState.gender = gender;
    appState.screen = 'categorias';
    trackEvent('gender_selected', { gender: gender });
    render();
};

window.selectCategory = (category) => {
    var gender = appState.gender;
    var catConfig = CATEGORIES[gender] && CATEGORIES[gender].find(function (c) { return c.id === category; });
    var useCatalog = Array.isArray(window.PRODUCTS_CATALOG) && window.PRODUCTS_CATALOG.length > 0 && catConfig && catConfig.matchCategories;
    var productsRef = useCatalog
        ? window.PRODUCTS_CATALOG.filter(function (p) {
            return catConfig.matchCategories.indexOf(p.category) !== -1 && (p.gender === gender || p.gender === 'ambos');
          })
        : getProductsFallback(gender, category);
    /* Zero logs - QA CM360/DV360 */
    appState.category = category;
    appState.screen = 'productos';
    trackEvent('category_selected', { gender: gender, category: category });
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
        trackEvent('product_added_to_wishlist', {
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
    trackEvent('wishlist_modal_opened', { wishlist_count: appState.wishlist.length });
    document.getElementById('emailModal').classList.add('active');
};

function attachModalAndWishlistSend() {
    var emailModal = document.getElementById('emailModal');
    var modalClose = document.getElementById('modalClose');
    var btnCancelar = document.getElementById('btnCancelar');
    var wishlistForm = document.getElementById('wishlistForm');
    if (modalClose && emailModal) modalClose.onclick = function () {
        if (typeof exitClickHandler === 'function') exitClickHandler('Modal Close');
        emailModal.classList.remove('active');
    };
    if (btnCancelar && emailModal) btnCancelar.onclick = function () {
        if (typeof exitClickHandler === 'function') exitClickHandler('Cancel');
        emailModal.classList.remove('active');
    };
    if (wishlistForm) {
        wishlistForm.onsubmit = function (e) {
            e.preventDefault();
            sendWishlistByMail();
        };
    }
    var btnEnviar = document.getElementById('btnEnviar');
    if (btnEnviar) {
        btnEnviar.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            sendWishlistByMail();
        });
    }
}

// MediaSmart: abrir producto con click tracker
window.openProductPage = (url) => {
    if (!url) {
        window.open(window.clickTag || window.landingPage, '_blank');
        return;
    }
    var tracker = window.clickTracker || '';
    window.open(tracker + url, '_blank');
};

// Start
document.addEventListener('DOMContentLoaded', function () {
    trackEvent('banner_loaded', {});
    attachModalAndWishlistSend();
    render();
});
