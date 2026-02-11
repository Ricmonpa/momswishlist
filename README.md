# Sanborns - Wishlist de San Valentín

Banner interactivo HTML5 300x600px para DV360/CM360 que permite a los usuarios crear wishlists de regalos para San Valentín y enviarlas por email a sus parejas.

## 🎯 Características

- ✨ **Interfaz romántica** con paleta rosa San Valentín
- 🎤 **Reconocimiento de voz** para búsqueda de productos
- 🤖 **IA con Gemini** para recomendaciones personalizadas
- 💝 **Sistema de wishlist** con contador visual
- 📧 **Envío de wishlist por email** con modal elegante
- 📱 **Responsive** y optimizado para móviles
- 🎨 **Microinteracciones** y animaciones suaves

## 🚀 Deploy en Cloudflare Pages

### Opción 1: Deploy desde Git (Recomendado)

1. **Crear repositorio en GitHub/GitLab/Bitbucket**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Sanborns Wishlist San Valentín"
   git remote add origin https://github.com/tu-usuario/tu-repo.git
   git push -u origin main
   ```

2. **Conectar en Cloudflare Pages**
   - Ve a [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Selecciona **Pages** → **Create a project**
   - Conecta tu repositorio
   - Configuración:
     - **Framework preset**: None (o Static)
     - **Build command**: (dejar vacío)
     - **Build output directory**: `/` (raíz)
     - **Root directory**: `/` (raíz)

3. **Deploy automático**
   - Cloudflare Pages detectará cambios y hará deploy automático
   - Tu sitio estará disponible en `https://tu-proyecto.pages.dev`

### Opción 2: Deploy manual con Wrangler CLI

```bash
# Instalar Wrangler CLI
npm install -g wrangler

# Login en Cloudflare
wrangler login

# Deploy
wrangler pages deploy . --project-name=sanborns-wishlist
```

## 📁 Estructura del Proyecto

```
.
├── index.html              # Página principal del banner
├── main.js                 # Lógica principal
├── styles.css              # Estilos con paleta rosa San Valentín
├── gemini-api.js           # Integración con Gemini AI
├── products-data.js        # Base de datos de productos
├── voice.js                # Reconocimiento de voz
├── dynamic-products.js     # Sistema dinámico de productos
├── functions/
│   └── api/
│       └── gemini.js       # Endpoint backend para Gemini
├── images/                 # Assets de imágenes
├── Logo_sanborns_bco.png   # Logo Sanborns
├── san-valentin.svg        # Imagen romántica
└── README.md              # Este archivo
```

## ⚙️ Configuración

### Variables de Entorno (Opcional)

Si necesitas configurar la API de Gemini, crea un archivo `config.js`:

```javascript
const config = {
    GEMINI_API_KEY: 'tu-api-key-aqui'
};
```

**Nota**: Para producción, usa Cloudflare Pages Environment Variables en el dashboard.

### Endpoint de Email (Opcional)

El sistema intenta usar `/api/enviar-wishlist` pero tiene fallback a `mailto:`. Para habilitar envío directo:

1. Crea `functions/api/enviar-wishlist.js` (Cloudflare Workers)
2. Configura servicio de email (SendGrid, AWS SES, etc.)
3. Agrega variables de entorno en Cloudflare Pages

## 🎨 Personalización

### Colores (Variables CSS)

Edita las variables en `styles.css`:

```css
:root {
    --pink-light: #FFB6C1;
    --pink-medium: #FFC0CB;
    --pink-fuchsia: #FF1493;
    --pink-deep: #DC143C;
}
```

### Métricas y reporting (performance de la pieza)

La pieza envía eventos para reportar **género** (hombre/mujer), **categoría** elegida, **productos clicados**, **wishlist** y **envío**. Para ver esos reportes hace falta conectar **GTM** (dataLayer) o **Cloudflare Zaraz** con GA4 o DV360/CM360. Detalle completo: **[METRICS-REPORTING.md](METRICS-REPORTING.md)**.

### Tracking DV360/CM360 (UTM)

Todas las URLs de productos llevan parámetros UTM para atribución:

- `utm_source=dv360`
- `utm_medium=display`
- `utm_campaign=sanborns_san_valentin_2025`
- `utm_content=producto_[ID]`
- `utm_term=gift_finder`

Eventos a trackear: género seleccionado, categoría, click en producto (ID), producto agregado a wishlist, wishlist enviada.

El banner incluye contadores Enabler:
- `Banner Visible`
- `CTA Click`
- `Voice Used`
- `Product Click`
- `Wishlist Created`
- `Email Sent`
- `Email Modal Opened`
- `Product Added to Wishlist`

### Mapeo de IDs oficiales Sanborns (productos a impulsar)

IDs provistos por el cliente en [Google Sheet](https://docs.google.com/spreadsheets/d/1HiW5YDiqZnQRqR5Jm_En46Eiuzhe5pTA4k4_1HkAhdU/edit). Estructura de URL: `https://www.sanborns.com.mx/producto/[ID]`.

| Categoría Gift Finder | IDs Sanborns (producto) |
|----------------------|------------------------|
| Mujer > Maquillaje (Cosméticos 49) | 614484, 614483, 574428, 553342, 615405 |
| Mujer > Cuidado (Derma 41) | 515019, 59701, 437851, 274804, 11370 |
| Mujer > Perfumería (5) | 608266, 813851, 303224, 813852, 310467 |
| Hombre > Relojes (6) | 379802, 604930, 540572, 542018, 557865 |
| Hombre > Cuidado (Estilismo 57) | 117488, 469399, 492378, 617456, 408718 |

Categorías sin IDs específicos usan URLs de categoría: `/c/bolsas/`, `/c/joyeria/`, `/c/libros/`, `/c/tecnologia/`, `/c/hogar/`, `/c/accesorios-hombre/`, `/c/ropa-hombre/`, `/c/videojuegos/`, `/c/deportes/`.

### Imágenes reales de productos

Por defecto se usan imágenes placeholder (Unsplash). Para obtener las **imágenes reales** de cada producto desde Sanborns:

```bash
npm run images
```

Esto ejecuta `scripts/fetch-product-images.js`: visita cada URL de producto en `products-data.js`, extrae la imagen (og:image) y genera `product-images.js`. El frontend usa esas URLs cuando existen; si no, muestra el placeholder. Requiere Node 18+.

### Validación de URLs

En consola del navegador (al cargar la página se ejecuta automáticamente):

```javascript
validarURLsProductos(); // Devuelve { errores, warnings }
```

Comprueba: HTTPS, dominio sanborns.com.mx, formato `/producto/ID` para productos, ninguna ruta relativa.

## 📱 Compatibilidad

- ✅ Chrome/Edge (últimas versiones)
- ✅ Safari (últimas versiones)
- ✅ Firefox (últimas versiones)
- ✅ Móviles iOS/Android
- ✅ DV360/CM360 SafeFrame

## 🔧 Desarrollo Local

```bash
# Servir localmente (requiere Python o Node.js)
python -m http.server 8000
# o
npx serve .

# Abrir en navegador
http://localhost:8000
```

## 📝 Notas Técnicas

- **Tamaño del banner**: 300x600px
- **Peso objetivo**: < 200KB (compatible con DV360)
- **Sin dependencias externas**: HTML/CSS/JS vanilla
- **API Gemini**: Opcional, con fallback local
- **Email**: Fallback a mailto: si API no disponible

## 🐛 Troubleshooting

### El modal no se abre
- Verifica que `initializeEmailModal()` se llame en `DOMContentLoaded`
- Revisa la consola del navegador para errores

### Los productos no se muestran
- Verifica que `products-data.js` esté cargado
- Revisa la consola para errores de carga

### El email no se envía
- Si no hay backend, el sistema usa `mailto:` automáticamente
- Verifica que el navegador tenga cliente de email configurado

## 📄 Licencia

Proyecto interno para Sanborns México.

## 👥 Créditos

Desarrollado para la campaña de San Valentín 2025.
