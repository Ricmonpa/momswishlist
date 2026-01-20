// Estado del banner
const bannerState = {
    isListening: false,
    messages: [],
    voiceHandler: null,
    selectedProducts: [],
    wishlist: [], // Nueva: wishlist de productos seleccionados
    emailProducts: [], // Productos para enviar por email
    geminiAPI: null,
    dynamicMatcher: null // Sistema dinámico de productos
};

// Helper functions para obtener elementos (siempre funcionan)
function getMessageInput() {
    return document.getElementById('messageInput');
}

function getActionButton() {
    return document.getElementById('actionButton');
}

function getDialogueBubble() {
    return document.querySelector('.dialogue-bubble');
}

function getCtaSection() {
    return document.querySelector('.cta-section');
}

// Referencias a elementos (para compatibilidad)
const messageInput = getMessageInput();
const actionButton = getActionButton();
const dialogueBubble = getDialogueBubble();
const ctaSection = getCtaSection();

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    
    // Obtener elementos del DOM (usar helpers para garantizar que existan)
    const btn = getActionButton();
    const inp = getMessageInput();
    
    // Verificar que los elementos existan
    if (!inp || !btn) {
        console.error('❌ Elementos del DOM no encontrados');
        return;
    }
    
    // Inicializar manejador de voz
    bannerState.voiceHandler = new VoiceHandler();
    
    // Inicializar sistema dinámico de productos
    if (typeof DynamicProductMatcher !== 'undefined') {
        bannerState.dynamicMatcher = new DynamicProductMatcher();
    }
    
    // Configurar callbacks de voz
    setupVoiceCallbacks();
    
    // Verificar soporte de voz
    if (!bannerState.voiceHandler.checkSupport()) {
        console.warn('⚠️ Web Speech API no disponible');
    }
    
    // Event listeners - REGISTRAR DESPUÉS DE VERIFICAR QUE EXISTEN
    btn.addEventListener('click', handleActionClick);
    inp.addEventListener('input', handleInputChange);
    inp.addEventListener('keypress', handleInputKeypress);
    
    // También escuchar eventos de cambio en tiempo real
    inp.addEventListener('keyup', handleInputChange);
    inp.addEventListener('paste', () => setTimeout(handleInputChange, 10));
    
    // Inicializar estado del botón
    updateButtonState();
    
    // Inicializar contador de wishlist
    updateWishlistCounter();
    
    // Inicializar modal de email
    initializeEmailModal();
    
    // Animación de entrada
    animateEntrance();
});

// Configurar callbacks del manejador de voz
function setupVoiceCallbacks() {
    const voiceHandler = bannerState.voiceHandler;
    
    voiceHandler.onStart = () => {
        bannerState.isListening = true;
        updateButtonState();
        showListeningFeedback();
    };
    
    voiceHandler.onResult = (transcript, confidence) => {
        const input = getMessageInput();
        if (input) input.value = transcript;
        updateButtonState();
        
        // Auto-enviar después de capturar voz
        setTimeout(() => {
            handleSendMessage(transcript);
        }, 500);
    };
    
    voiceHandler.onError = (message, errorType) => {
        console.error('❌', message);
        showErrorFeedback(message);
        bannerState.isListening = false;
        updateButtonState();
    };
    
    voiceHandler.onEnd = () => {
        bannerState.isListening = false;
        updateButtonState();
        hideListeningFeedback();
    };
}

// Manejar cambio en input - actualizar botón estilo WhatsApp
function handleInputChange() {
    updateButtonState();
}

// Actualizar estado del botón según contenido del input
function updateButtonState() {
    const input = getMessageInput();
    const button = getActionButton();
    if (!input || !button) return;
    
    const hasText = input.value.trim().length > 0;
    
    if (bannerState.isListening) {
        button.textContent = '🔴';
        button.dataset.mode = 'listening';
        button.classList.add('listening');
    } else if (hasText) {
        button.textContent = '➤';
        button.dataset.mode = 'send';
        button.classList.remove('listening');
    } else {
        button.textContent = '🎤';
        button.dataset.mode = 'mic';
        button.classList.remove('listening');
    }
}

// Manejar click en botón de acción
function handleActionClick() {
    const button = getActionButton();
    const input = getMessageInput();
    if (!button || !input) return;
    
    const mode = button.dataset.mode;
    
    switch(mode) {
        case 'mic':
            handleMicClick();
            break;
        case 'send':
            if (input.value.trim()) {
                handleSendMessage(input.value.trim());
            }
            break;
        case 'listening':
            bannerState.voiceHandler.stop();
            break;
    }
}

// Manejo del micrófono
function handleMicClick() {
    
    if (!bannerState.voiceHandler.checkSupport()) {
        showErrorFeedback('Tu navegador no soporta reconocimiento de voz.');
        return;
    }
    
    const started = bannerState.voiceHandler.start();
    if (!started) {
        showErrorFeedback('No se pudo iniciar el micrófono. Verifica los permisos.');
    }
}

// Mostrar feedback visual mientras escucha
function showListeningFeedback() {
    const bubble = getDialogueBubble();
    if (!bubble) return;
    bubble.innerHTML = `
        <p class="greeting-text">
            <strong>🎤 Te escucho...</strong>
        </p>
        <p class="sub-text">
            Dime qué quieres en tu wishlist
        </p>
    `;
    
    bubble.style.border = '2px solid #FFD700';
    bubble.style.animation = 'borderPulse 1.5s ease-in-out infinite';
}

// Ocultar feedback de escucha
function hideListeningFeedback() {
    const bubble = getDialogueBubble();
    if (!bubble) return;
    bubble.style.border = 'none';
    bubble.style.animation = '';
}

// Mostrar error
function showErrorFeedback(message) {
    const bubble = getDialogueBubble();
    if (!bubble) return;
    bubble.innerHTML = `
        <p class="greeting-text">
            <strong>⚠️ Oops!</strong>
        </p>
        <p class="sub-text" style="color: #ff6b6b;">
            ${message}
        </p>
    `;
    
    setTimeout(() => {
        resetDialogue();
    }, 3000);
}

// Resetear diálogo al estado inicial
function resetDialogue() {
    const bubble = getDialogueBubble();
    if (!bubble) return;
    bubble.innerHTML = `
        <p class="greeting-text">
            ¡Hola! 👋<br>
            <strong>¿Ya hiciste tu wishlist para San Valentín?</strong>
        </p>
        <p class="sub-text">
            Dime qué deseas y te ayudo a crear tu wishlist perfecta
        </p>
    `;
    bubble.style.border = 'none';
    bubble.style.animation = '';
    bubble.classList.remove('compact');
    
    // Restaurar tamaños originales
    const aiCharacter = document.querySelector('.ai-character');
    if (aiCharacter) {
        aiCharacter.style.marginBottom = '15px';
        const heartImg = aiCharacter.querySelector('.reyes-magos-img');
        if (heartImg) {
            heartImg.style.width = '220px';
        }
    }
    
    const header = document.querySelector('.banner-header');
    if (header) {
        header.style.marginBottom = '15px';
    }
}

// Manejo de Enter en input
function handleInputKeypress(e) {
    const input = getMessageInput();
    if (!input) return;
    if (e.key === 'Enter' && input.value.trim()) {
        handleSendMessage(input.value.trim());
    }
}

// Enviar mensaje
async function handleSendMessage(message) {
    const trimmed = (message || '').trim();
    if (!trimmed) return;
    
    bannerState.messages.push({
        type: 'user',
        text: trimmed,
        timestamp: Date.now()
    });
    
    // Limpiar input
    const input = getMessageInput();
    if (input) input.value = '';
    updateButtonState();
    
    // Mostrar que está procesando
    showProcessingState();
    
    let products = [];
    let aiMessage = 'Encontré estas opciones perfectas para ti:';
    const matcher = new ProductMatcher(productsDatabase);
    
    // ESTRATEGIA 1: Intentar Gemini vía proxy (timeout 3s con AbortController manual)
    try {
        const controller = new AbortController();
        const timer = setTimeout(() => {
            controller.abort();
        }, 3000);
        
        const response = await fetch('/api/gemini', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: trimmed }),
            signal: controller.signal
        });
        
        clearTimeout(timer);
        
        if (!response.ok) throw new Error('API response not OK');
        
        const aiData = await response.json();
        if (typeof Enabler !== 'undefined') {
            Enabler.counter('AI Response Success');
            Enabler.counter('Wishlist Created');
        }
        
        // Productos por categoría sugerida
        if (aiData.categoria && productsDatabase[aiData.categoria]) {
            products = productsDatabase[aiData.categoria].slice(0, 3);
        }
        
        // Productos por keywords si faltan
        if (products.length < 3 && aiData.keywords) {
            for (const keyword of aiData.keywords) {
                const found = matcher.findProducts(keyword);
                products = products.concat(found);
                if (products.length >= 3) break;
            }
        }
        
        aiMessage = aiData.mensaje || aiMessage;
        
    } catch (error) {
        // ESTRATEGIA 2: Fallback local garantizado
        if (typeof Enabler !== 'undefined') {
            Enabler.counter('AI Fallback to Local');
        }
        const foundProducts = matcher.findProducts(trimmed);
        const localResult = matcher.generateResponse(foundProducts);
        products = localResult.products;
        aiMessage = localResult.message;
    }
    
    // GARANTÍA: Si aún no hay productos, usar búsqueda directa del mensaje
    if (products.length === 0) {
        const directSearch = matcher.findProducts(trimmed);
        if (directSearch.length > 0) {
            products = directSearch;
        } else if (bannerState.dynamicMatcher) {
            // Último recurso: productos dinámicos
            const categoryMatch = bannerState.dynamicMatcher.findCategory(trimmed);
            if (categoryMatch) {
                products = bannerState.dynamicMatcher.generateVirtualProducts(categoryMatch, trimmed);
            }
        }
    }
    
    // Eliminar duplicados y limitar a 3
    products = [...new Map(products.map(item => [item.id, item])).values()].slice(0, 3);
    
    // GARANTÍA FINAL: Si aún está vacío, mostrar productos genéricos de la primera categoría disponible
    if (products.length === 0) {
        const firstCategory = Object.keys(productsDatabase)[0];
        if (firstCategory && productsDatabase[firstCategory].length > 0) {
            products = productsDatabase[firstCategory].slice(0, 3);
            aiMessage = 'Te mostramos algunas opciones perfectas para ti:';
        }
    }
    
    // Mostrar respuesta
    const bubble = getDialogueBubble();
    if (bubble) {
        bubble.innerHTML = `
            <p class="greeting-text">
                <strong>🎁 ${aiMessage}</strong>
            </p>
        `;
    }
    
    // SIEMPRE mostrar productos (garantizado)
    displayProducts(products);
    
    // Guardar productos en el estado
    bannerState.selectedProducts = products;
}

// Mostrar estado de procesamiento
function showProcessingState() {
    const bubble = getDialogueBubble();
    if (!bubble) return;
    bubble.innerHTML = `
        <p class="greeting-text">
            <strong>✨ Buscando...</strong>
        </p>
        <p class="sub-text">
            Buscando los regalos perfectos para tu wishlist
        </p>
        <div class="loading-dots">
            <span>.</span><span>.</span><span>.</span>
        </div>
    `;
    
    // Ocultar productos anteriores si existen
    const existingProducts = document.getElementById('productsContainer');
    if (existingProducts) {
        existingProducts.style.display = 'none';
    }
}

// NUEVA FUNCIÓN: Respuesta con productos reales (con Gemini o fallback)
async function simulateAIResponse(userMessage) {
    
    let result;
    
    // Intentar usar Gemini API si está disponible
    if (bannerState.geminiAPI) {
        try {
            result = await bannerState.geminiAPI.processMessage(userMessage);
        } catch (error) {
            console.error('❌ Error con Gemini, usando fallback:', error);
            // Fallback automático
            result = bannerState.geminiAPI.fallbackToKeywordMatching(userMessage);
        }
    } else {
        // Usar sistema de keywords tradicional
        const matcher = new ProductMatcher(productsDatabase);
        const foundProducts = matcher.findProducts(userMessage);
        result = matcher.generateResponse(foundProducts);
    }
    
    // Actualizar diálogo con mensaje
    const bubble = getDialogueBubble();
    if (bubble) {
        bubble.innerHTML = `
            <p class="greeting-text">
                <strong>🎁 ${result.message}</strong>
            </p>
        `;
        bubble.style.border = 'none';
        bubble.style.animation = '';
    }
    
    // Si hay categoría para redirección (ej: vinos que no están en DB)
    // Usar sistema dinámico para generar productos virtuales
    if (result.redirectCategory && bannerState.dynamicMatcher) {
        
        // Buscar categoría en el sistema dinámico
        const categoryMatch = bannerState.dynamicMatcher.findCategory(userMessage);
        
        if (categoryMatch && categoryMatch.category === result.redirectCategory) {
            // Generar productos virtuales para esta categoría
            const virtualProducts = bannerState.dynamicMatcher.generateVirtualProducts(categoryMatch, userMessage);
            result.products = virtualProducts;
        } else {
            // Si no encuentra match exacto, crear productos genéricos para la categoría
            const categoryData = bannerState.dynamicMatcher.categoryMap[result.redirectCategory];
            if (categoryData) {
                const virtualProducts = bannerState.dynamicMatcher.generateVirtualProducts(categoryData, userMessage);
                result.products = virtualProducts;
            }
        }
        
        // Limpiar redirectCategory para que continúe con el flujo normal de mostrar productos
        delete result.redirectCategory;
    }
    
    // Si no hay productos pero tenemos sistema dinámico, usarlo
    if (result.products.length === 0 && bannerState.dynamicMatcher) {
        const categoryMatch = bannerState.dynamicMatcher.findCategory(userMessage);
        
        if (categoryMatch) {
            const virtualProducts = bannerState.dynamicMatcher.generateVirtualProducts(categoryMatch, userMessage);
            result.products = virtualProducts;
            result.message = result.message || `¡Perfecto! Te mostramos opciones de ${categoryMatch.category} en Sanborns`;
        }
    }
    
    // Mostrar productos encontrados (reales o virtuales)
    displayProducts(result.products);
}

// FUNCIÓN: Agregar/quitar producto de wishlist (toggle)
function addToWishlist(product, buttonElement) {
    // Verificar si ya está en wishlist
    const existingIndex = bannerState.wishlist.findIndex(p => p.id === product.id);
    
    if (existingIndex === -1) {
        // AGREGAR a wishlist
        bannerState.wishlist.push(product);
        
        // Animación de corazón flotante
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '♥';
        heart.style.position = 'absolute';
        heart.style.left = buttonElement.getBoundingClientRect().left + buttonElement.offsetWidth / 2 + 'px';
        heart.style.top = buttonElement.getBoundingClientRect().top + 'px';
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 1000);
        
        // Cambiar estado del botón permanentemente
        buttonElement.classList.add('added');
        buttonElement.innerHTML = '✓ Agregado';
        
        // Counter DV360
        if (typeof Enabler !== 'undefined' && Enabler.isInitialized()) {
            Enabler.counter('Product Added to Wishlist');
        }
    } else {
        // QUITAR de wishlist (desagregar)
        bannerState.wishlist.splice(existingIndex, 1);
        
        // Cambiar estado del botón
        buttonElement.classList.remove('added');
        buttonElement.innerHTML = '<span class="heart-icon-btn">♥</span> Agregar a mi Wishlist';
        
        // Counter DV360
        if (typeof Enabler !== 'undefined' && Enabler.isInitialized()) {
            Enabler.counter('Product Removed from Wishlist');
        }
    }
    
    // Actualizar contador
    updateWishlistCounter();
    
    // Actualizar botón de email si existe
    updateEmailButton();
}

// FUNCIÓN: Actualizar contador de wishlist
function updateWishlistCounter() {
    const counter = document.getElementById('wishlistCount');
    if (counter) {
        counter.textContent = bannerState.wishlist.length;
    }
}

// FUNCIÓN: Actualizar botón de email según wishlist
function updateEmailButton() {
    const emailBtn = document.getElementById('emailWishlistBtn');
    if (!emailBtn) return;
    
    const wishlistCount = bannerState.wishlist.length;
    // Actualizar texto del botón con contador
    emailBtn.innerHTML = wishlistCount > 0 
        ? `💌 Enviar Wishlist por Email (${wishlistCount})`
        : '💌 Enviar Wishlist por Email';
    // Cambiar opacidad según si hay items
    emailBtn.style.opacity = wishlistCount > 0 ? '1' : '0.8';
}

// FUNCIÓN: Mostrar productos en layout VERTICAL (mejor para 300px de ancho)
function displayProducts(products) {
    // Crear contenedor de productos si no existe
    let productsContainer = document.getElementById('productsContainer');
    
    if (!productsContainer) {
        productsContainer = document.createElement('div');
        productsContainer.id = 'productsContainer';
        productsContainer.className = 'products-container';
        // Insertar antes del cta-section
        const cta = getCtaSection();
        if (cta) cta.insertAdjacentElement('beforebegin', productsContainer);
    }
    
    // Limpiar productos anteriores
    productsContainer.innerHTML = '';
    
    // Generar HTML de productos
    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.style.animationDelay = `${index * 0.1}s`;
        
        // Verificar si está en wishlist
        const isInWishlist = bannerState.wishlist.some(p => p.id === product.id);
        const buttonText = isInWishlist 
            ? '✓ Agregado' 
            : '<span class="heart-icon-btn">♥</span> Agregar a mi Wishlist';
        const buttonClass = isInWishlist ? 'product-cta added' : 'product-cta';
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.imagen}" alt="${product.nombre}" onerror="this.src='images/placeholder.svg'">
                <span class="discount-badge">Hasta 50% OFF</span>
            </div>
            <div class="product-info">
                <h4 class="product-name">${product.nombre}</h4>
                <p class="product-brand">${product.marca || ''}</p>
                <div class="product-price">
                    <span class="price-label">Descuentos especiales</span>
                    <span class="price-cta">Ver ofertas →</span>
                </div>
                <p class="product-store">📍 ${product.tiendas_cercanas[0] || 'Consultar disponibilidad'}</p>
                <button class="${buttonClass}" data-product-id="${product.id}">
                    ${buttonText}
                </button>
            </div>
        `;
        
        // Agregar event listener al botón
        const ctaButton = productCard.querySelector('.product-cta');
        if (ctaButton) {
            ctaButton.addEventListener('click', (e) => {
                e.stopPropagation();
                addToWishlist(product, ctaButton);
            });
        }
        
        // Click en la tarjeta abre producto
        productCard.addEventListener('click', (e) => {
            if (!e.target.closest('.product-cta')) {
                openProductPage(product);
            }
        });
        
        productsContainer.appendChild(productCard);
    });
    
    // Agregar botón de enviar wishlist por email (aparece siempre que hay productos)
    if (products.length > 0) {
        const emailBtn = document.createElement('button');
        emailBtn.className = 'email-wishlist-btn';
        emailBtn.id = 'emailWishlistBtn';
        const wishlistCount = bannerState.wishlist.length;
        emailBtn.innerHTML = wishlistCount > 0 
            ? `💌 Enviar Wishlist por Email (${wishlistCount})`
            : '💌 Enviar Wishlist por Email';
        emailBtn.onclick = (e) => {
            e.stopPropagation();
            // Enviar wishlist actual o productos mostrados si wishlist está vacía
            const wishlistToSend = bannerState.wishlist.length > 0 ? bannerState.wishlist : products;
            sendWishlistByEmail(wishlistToSend);
        };
        if (wishlistCount === 0) {
            emailBtn.style.opacity = '0.8';
        }
        productsContainer.appendChild(emailBtn);
    }
    
    // Mostrar con animación
    productsContainer.style.display = 'block';
    
    // Reducir el tamaño del diálogo cuando hay productos para dar más espacio
    const bubble = getDialogueBubble();
    if (bubble && products.length > 0) {
        bubble.classList.add('compact');
    }
    
    // Compactar personaje y header cuando hay productos
    const aiCharacter = document.querySelector('.ai-character');
    if (aiCharacter) {
        aiCharacter.style.marginBottom = '8px';
        const heartImg = aiCharacter.querySelector('.reyes-magos-img');
        if (heartImg) {
            heartImg.style.width = '160px';
        }
    }
    
    // Reducir padding del header
    const header = document.querySelector('.banner-header');
    if (header) {
        header.style.marginBottom = '10px';
    }
    
    // Scroll automático suave al contenedor de productos para que sean visibles
    setTimeout(() => {
        // Asegurar que el contenedor sea visible
        if (productsContainer.scrollHeight > productsContainer.clientHeight) {
            productsContainer.scrollTop = 0;
        }
        
        // Scroll suave del banner al contenedor de productos (solo si es necesario)
        const containerRect = productsContainer.getBoundingClientRect();
        const bannerRect = document.querySelector('.banner-container').getBoundingClientRect();
        
        if (containerRect.top < bannerRect.top || containerRect.bottom > bannerRect.bottom) {
            productsContainer.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start',
                inline: 'nearest'
            });
        }
    }, 100);
    
    // Actualizar contador
    updateWishlistCounter();
}

// FUNCIÓN: Enviar wishlist por email - Abre modal
function sendWishlistByEmail(products) {
    const wishlistToSend = products || bannerState.wishlist;
    
    if (!wishlistToSend || wishlistToSend.length === 0) {
        showErrorFeedback('No hay productos en tu wishlist para enviar.');
        return;
    }
    
    // Guardar productos para el modal
    bannerState.emailProducts = wishlistToSend;
    
    // Track modal abierto
    if (typeof Enabler !== 'undefined' && Enabler.isInitialized()) {
        Enabler.counter('Email Modal Opened');
    }
    
    // Abrir modal
    openEmailModal();
    
    // Generar preview
    generateEmailPreview(wishlistToSend);
}

// FUNCIÓN: Abrir modal de email
function openEmailModal() {
    const modal = document.getElementById('emailModal');
    if (modal) {
        modal.classList.add('active');
        
        // Focus en primer input
        setTimeout(() => {
            const emailInput = document.getElementById('emailPareja');
            if (emailInput) emailInput.focus();
        }, 100);
        
        // Prevenir scroll del body
        document.body.style.overflow = 'hidden';
    }
}

// FUNCIÓN: Cerrar modal de email
function closeEmailModal() {
    const modal = document.getElementById('emailModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Limpiar formulario
        const form = document.getElementById('wishlistForm');
        if (form) {
            form.reset();
            clearErrors();
        }
    }
}

// FUNCIÓN: Generar preview del email
function generateEmailPreview(products) {
    const preview = document.getElementById('emailPreview');
    if (!preview) return;
    
    preview.innerHTML = '';
    
    products.forEach((product) => {
        const previewItem = document.createElement('div');
        previewItem.className = 'preview-product';
        
        previewItem.innerHTML = `
            <img src="${product.imagen}" alt="${product.nombre}" onerror="this.style.display='none'">
            <div class="preview-product-info">
                <div class="preview-product-name">${product.nombre}</div>
                ${product.marca ? `<div class="preview-product-brand">${product.marca}</div>` : ''}
            </div>
        `;
        
        preview.appendChild(previewItem);
    });
}

// FUNCIÓN: Validar email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// FUNCIÓN: Mostrar error
function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + 'Error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
    
    const input = document.getElementById(fieldId);
    if (input) {
        input.style.borderColor = '#ff4444';
    }
}

// FUNCIÓN: Limpiar errores
function clearErrors() {
    const errors = document.querySelectorAll('.error-message');
    errors.forEach(error => {
        error.classList.remove('show');
        error.textContent = '';
    });
    
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.style.borderColor = '';
    });
}

// FUNCIÓN: Enviar wishlist por email (nuevo sistema)
async function enviarWishlist(emailPareja, nombreUsuario, mensajePersonal, enviarCopia) {
    const products = bannerState.emailProducts || bannerState.wishlist;
    
    if (!products || products.length === 0) {
        showError('emailPareja', 'No hay productos para enviar.');
        return false;
    }
    
    // Mostrar loading
    const btnEnviar = document.getElementById('btnEnviar');
    if (btnEnviar) {
        btnEnviar.classList.add('loading');
        btnEnviar.disabled = true;
    }
    
    try {
        // Intentar enviar vía API (si existe)
        const response = await fetch('/api/enviar-wishlist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                destinatario: emailPareja,
                nombreRemitente: nombreUsuario,
                mensaje: mensajePersonal,
                productos: products,
                enviarCopia: enviarCopia,
                trackingParams: {
                    campaign: 'san-valentin-wishlist',
                    source: 'banner-interactivo'
                }
            })
        });
        
        if (response.ok) {
            // Track éxito
            if (typeof Enabler !== 'undefined' && Enabler.isInitialized()) {
                Enabler.counter('Email Sent Successfully');
            }
            
            // Mostrar confirmación
            showSuccessModal(emailPareja);
            closeEmailModal();
            return true;
        } else {
            throw new Error('Error en el servidor');
        }
        
    } catch (error) {
        // Fallback: usar mailto si API falla (esto es normal y esperado)
        console.log('📧 API no disponible, usando fallback mailto: (esto es normal)');
        return enviarWishlistFallback(emailPareja, nombreUsuario, mensajePersonal, products);
    } finally {
        // Quitar loading
        if (btnEnviar) {
            btnEnviar.classList.remove('loading');
            btnEnviar.disabled = false;
        }
    }
}

// FUNCIÓN: Fallback mailto (si API no está disponible)
function enviarWishlistFallback(emailPareja, nombreUsuario, mensajePersonal, products) {
    const subject = encodeURIComponent(`💝 ${nombreUsuario || 'Alguien especial'} te envió su Wishlist de San Valentín`);
    
    let emailBody = mensajePersonal || `Hola mi amor ❤️\n\n`;
    if (!mensajePersonal) {
        emailBody += `Esta es mi wishlist para San Valentín:\n\n`;
    } else {
        emailBody += '\n\nMi wishlist para San Valentín:\n\n';
    }
    
    products.forEach((product, index) => {
        emailBody += `${index + 1}. ${product.nombre}`;
        if (product.marca) {
            emailBody += ` - ${product.marca}`;
        }
        if (product.precio_final) {
            emailBody += `\n   Precio: $${product.precio_final.toLocaleString('es-MX')}`;
        }
        
        let productUrl = product.url_compra || 'https://www.sanborns.com.mx/#modalPostalCode';
        if (!product.url_compra) {
            const cleanName = (product.nombre || '').replace(/\d+\s*GB/gi, '').replace(/\d+\s*TB/gi, '').replace(/\+.*$/gi, '').trim();
            const query = encodeURIComponent((product.marca ? `${product.marca} ` : '') + cleanName);
            productUrl = `https://www.sanborns.com.mx/resultados?query=${query}#modalPostalCode`;
        }
        
        emailBody += `\n   Ver producto: ${productUrl}\n\n`;
    });
    
    emailBody += `Con amor,\n${nombreUsuario || 'Tu pareja'} 💕\n\n`;
    emailBody += '---\n';
    emailBody += 'Creado con Sanborns Wishlist de San Valentín';
    
    const body = encodeURIComponent(emailBody);
    
    // Abrir cliente de email como fallback
    window.location.href = `mailto:${emailPareja}?subject=${subject}&body=${body}`;
    
    // Mostrar confirmación
    showSuccessModal(emailPareja, true);
    closeEmailModal();
    return true;
}

// FUNCIÓN: Mostrar modal de éxito
function showSuccessModal(email, isFallback = false) {
    const successModal = document.getElementById('successModal');
    const successMessage = document.getElementById('successMessage');
    
    if (successModal && successMessage) {
        if (isFallback) {
            successMessage.innerHTML = `Se abrirá tu cliente de email para enviar la wishlist a <strong>${email}</strong> ❤️`;
        } else {
            successMessage.innerHTML = `Tu pareja recibirá tu wishlist en <strong>${email}</strong> en unos segundos ❤️`;
        }
        successModal.style.display = 'flex';
    }
}

// FUNCIÓN: Cerrar modal de éxito
function closeSuccessModal() {
    const successModal = document.getElementById('successModal');
    if (successModal) {
        successModal.style.display = 'none';
    }
}

// FUNCIÓN: Copiar link para compartir
function copiarLinkCompartir() {
    const products = bannerState.emailProducts || bannerState.wishlist;
    if (!products || products.length === 0) return;
    
    // Generar link con datos codificados (podría usar localStorage o generar un link único)
    const wishlistData = JSON.stringify(products);
    const encoded = btoa(wishlistData);
    const link = `${window.location.origin}${window.location.pathname}?wishlist=${encoded}`;
    
    // Copiar al clipboard
    if (navigator.clipboard) {
        navigator.clipboard.writeText(link).then(() => {
            const btnCopiar = document.getElementById('btnCopiarLink');
            if (btnCopiar) {
                const originalText = btnCopiar.textContent;
                btnCopiar.textContent = '✅ Link copiado!';
                setTimeout(() => {
                    btnCopiar.textContent = originalText;
                }, 2000);
            }
        }).catch(() => {
            alert('No se pudo copiar el link. Por favor, cópialo manualmente: ' + link);
        });
    } else {
        // Fallback para navegadores antiguos
        const textarea = document.createElement('textarea');
        textarea.value = link;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('Link copiado al portapapeles!');
    }
}

// FUNCIÓN: Inicializar modal de email
function initializeEmailModal() {
    // Event listeners para cerrar modal
    const modal = document.getElementById('emailModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const btnCancelar = document.getElementById('btnCancelar');
    const btnCerrarSuccess = document.getElementById('btnCerrarSuccess');
    const btnCopiarLink = document.getElementById('btnCopiarLink');
    const form = document.getElementById('wishlistForm');
    
    // Cerrar modal
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeEmailModal);
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', closeEmailModal);
    }
    
    if (btnCancelar) {
        btnCancelar.addEventListener('click', closeEmailModal);
    }
    
    if (btnCerrarSuccess) {
        btnCerrarSuccess.addEventListener('click', closeSuccessModal);
    }
    
    if (btnCopiarLink) {
        btnCopiarLink.addEventListener('click', copiarLinkCompartir);
    }
    
    // Cerrar con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (modal && modal.classList.contains('active')) {
                closeEmailModal();
            }
            const successModal = document.getElementById('successModal');
            if (successModal && successModal.style.display !== 'none') {
                closeSuccessModal();
            }
        }
    });
    
    // Validación en tiempo real del email
    const emailInput = document.getElementById('emailPareja');
    if (emailInput) {
        emailInput.addEventListener('blur', () => {
            const email = emailInput.value.trim();
            if (email && !validateEmail(email)) {
                showError('emailPareja', 'Por favor ingresa un email válido');
            } else {
                clearErrors();
            }
        });
        
        emailInput.addEventListener('input', () => {
            if (emailInput.value.trim()) {
                clearErrors();
            }
        });
    }
    
    // Submit del formulario
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Limpiar errores previos
            clearErrors();
            
            // Validar email
            const emailPareja = document.getElementById('emailPareja').value.trim();
            if (!emailPareja) {
                showError('emailPareja', 'El email es requerido');
                return;
            }
            
            if (!validateEmail(emailPareja)) {
                showError('emailPareja', 'Por favor ingresa un email válido');
                return;
            }
            
            // Obtener datos del formulario
            const nombreUsuario = document.getElementById('nombreUsuario').value.trim();
            const mensajePersonal = document.getElementById('mensajePersonal').value.trim();
            const enviarCopia = document.getElementById('enviarCopia').checked;
            
            // Enviar wishlist
            await enviarWishlist(emailPareja, nombreUsuario, mensajePersonal, enviarCopia);
        });
    }
    
    // Mostrar botón de copiar link si falla el envío
    const btnEnviar = document.getElementById('btnEnviar');
    if (btnEnviar && btnEnviar.addEventListener) {
        // El botón de copiar link se mostrará dinámicamente si hay error
    }
}

// NUEVA FUNCIÓN: Abrir página del producto en Sanborns (búsqueda optimizada por categoría)
function openProductPage(product) {
    const bubble = getDialogueBubble();
    if (bubble) {
        bubble.innerHTML = `
        <p class="greeting-text">
            <strong>✨ Un momento...</strong>
        </p>
        <p class="sub-text">
            Te llevamos a Sanborns 🛍️
        </p>
    `;
    
    setTimeout(() => {
        let productUrl;
        
        // URLs por categoría (fallback para evitar búsquedas que den 404)
        const categoryUrls = {
            'videojuegos': 'https://www.sanborns.com.mx/cat/videojuegos?id=12#modalPostalCode',
            'consola': 'https://www.sanborns.com.mx/cat/videojuegos?id=12#modalPostalCode',
            'celular': 'https://www.sanborns.com.mx/cat/tecnolog%C3%ADa%20y%20electr%C3%B3nica?id=10#modalPostalCode',
            'tablet': 'https://www.sanborns.com.mx/cat/tecnolog%C3%ADa%20y%20electr%C3%B3nica?id=10#modalPostalCode',
            'audifonos': 'https://www.sanborns.com.mx/cat/tecnolog%C3%ADa%20y%20electr%C3%B3nica?id=10#modalPostalCode',
            'pantallas': 'https://www.sanborns.com.mx/cat/tecnolog%C3%ADa%20y%20electr%C3%B3nica?id=10#modalPostalCode',
            'hogar': 'https://www.sanborns.com.mx/cat/hogar%20y%20oficina/electrodom%C3%A9sticos/preparaci%C3%B3n%20de%20alimentos?id=10801#modalPostalCode',
            'cremas': 'https://www.sanborns.com.mx/cat/farmacia/higiene%20y%20salud/cremas?id=140202#modalPostalCode',
            'vinos': 'https://www.sanborns.com.mx/cat/regalos/vinos%20y%20licores/vinos?id=160201#modalPostalCode'
        };
        
        const categoria = product.categoria?.toLowerCase() || '';
        
        if (product.url_compra && product.url_compra !== '') {
            productUrl = product.url_compra;
        } else if (categoryUrls[categoria]) {
            productUrl = categoryUrls[categoria];
        } else {
            let cleanName = product.nombre || '';
            
            // LIMPIEZA UNIVERSAL
            cleanName = cleanName
                .replace(/\\d+\\s*GB/gi, '')
                .replace(/\\d+\\s*TB/gi, '')
                .replace(/\\d+\\s*ML/gi, '')
                .replace(/\\d+\\s*L\\b/gi, '')
                .replace(/\\d+\\s*onzas/gi, '')
                .replace(/\\+.*$/gi, '')
                .replace(/[™®©]/g, '')
                .replace(/\\s+/g, ' ')
                .trim();
            
            // LIMPIEZA ESPECÍFICA POR CATEGORÍA
            if (categoria === 'libros') {
                cleanName = cleanName
                    .replace(/\\bEditorial\\b/gi, '')
                    .replace(/\\bTomo\\s+[IVX]+\\b/gi, '')
                    .replace(/\\bEdición\\b/gi, '')
                    .trim();
            }
            
            if (categoria === 'perfumes') {
                cleanName = cleanName
                    .replace(/\\bFragancia\\b/gi, '')
                    .replace(/\\bpara\\s+(dama|caballero|mujer|hombre)\\b/gi, '')
                    .replace(/\\b(EDP|EDT|Eau\\s+de\\s+Parfum|Eau\\s+de\\s+Toilette)\\b/gi, '')
                    .trim();
            }
            
            if (categoria === 'electrónicos' || categoria === 'juguetes') {
                cleanName = cleanName
                    .replace(/\\bReacondicionado\\b/gi, '')
                    .replace(/\\bGrado\\s+A\\b/gi, '')
                    .replace(/\\bcon\\b.*$/gi, '')
                    .replace(/\\bincluye\\b.*$/gi, '')
                    .trim();
            }
            
            // Construir términos de búsqueda
            const searchTerms = [];
            
            if (product.marca && 
                product.marca !== 'Generic' && 
                product.marca !== 'Editorial' &&
                !cleanName.toLowerCase().includes((product.marca || '').toLowerCase())) {
                searchTerms.push(product.marca);
            }
            
            searchTerms.push(cleanName);
            
            const query = encodeURIComponent(searchTerms.join(' ').trim());
            productUrl = `https://www.sanborns.com.mx/resultados?query=${query}#modalPostalCode`;
        }
        
        if (!productUrl) {
            productUrl = 'https://www.sanborns.com.mx/#modalPostalCode';
        }
        
        
        if (typeof Enabler !== 'undefined' && Enabler.isInitialized()) {
            Enabler.exit('clickthrough', productUrl);
        } else {
            window.open(productUrl, '_blank');
        }
        
        if (bubble) {
            bubble.innerHTML = `
            <p class="greeting-text">
                <strong>✅ ¡Listo!</strong>
            </p>
            <p class="sub-text">
                ¿Quieres buscar algo más?
            </p>
        `;
        }
    }, 500);
    }
}

// Animación de entrada
function animateEntrance() {
    const elements = [
        document.querySelector('.banner-header'),
        document.querySelector('.ai-character'),
        document.querySelector('.dialogue-bubble'),
        document.querySelector('.cta-section')
    ];
    
    elements.forEach((el, index) => {
        if (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                el.style.transition = 'all 0.6s ease-out';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}

// Estilos adicionales
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes borderPulse {
        0%, 100% { 
            border-color: #FFD700;
            box-shadow: 0 0 15px rgba(255, 215, 0, 0.3);
        }
        50% { 
            border-color: #FFA500;
            box-shadow: 0 0 25px rgba(255, 215, 0, 0.6);
        }
    }
    
    .loading-dots {
        display: flex;
        justify-content: center;
        gap: 5px;
        margin-top: 10px;
    }
    
    .loading-dots span {
        font-size: 24px;
        color: #003D7A;
        animation: bounce 1.4s ease-in-out infinite;
    }
    
    .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
    .loading-dots span:nth-child(3) { animation-delay: 0.4s; }
    
    @keyframes bounce {
        0%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-8px); }
    }
`;
document.head.appendChild(additionalStyles);

