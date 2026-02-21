# Reskin Día de las Madres – Resumen

## Paleta elegida

| Variable | Hex / valor |
|----------|-------------|
| `--lavender-light` | #F5E6FF |
| `--lavender-medium` | #E6D5F5 |
| `--lavender-accent` | #B57EDC |
| `--lavender-deep` | #8B5FBF |
| `--cream` | #FFFAF0 |
| `--gradient-bg` | linear-gradient(180deg, #F5E6FF 0%, #E6D5F5 50%, #FFFAF0 100%) |
| `--gradient-button` | linear-gradient(135deg, #8B5FBF 0%, #B57EDC 100%) |

Se sustituyeron los rosas/rojos de San Valentín por lavanda, violeta suave y crema, manteniendo contraste y legibilidad.

---

## Asset principal

- **Antes:** `assets/heart.svg` (corazón animado).
- **Ahora:** `assets/flower.svg` (flor con pétalos tipo margarita en tonos lavanda, centro crema, misma animación “float” y glow suave). La referencia en HTML es `assets/flower.svg` con clase `animated-heart-img` (sin cambiar lógica de animación).

`heart.svg` se dejó en su sitio por si se necesita en otro creative; el banner usa solo `flower.svg`.

---

## Textos y strings cambiados

| Ubicación | Antes | Después |
|-----------|--------|---------|
| `<title>` | Sanborns - Gift Finder San Valentin | Sanborns - Gift Finder Día de las Madres |
| Chat bubble título | ¿Qué te gustaría regalar este San Valentín? | ¿Qué te gustaría regalar este Día de las Madres? |
| Chat bubble subtítulo | Encuentra el regalo perfecto | Encuentra el regalo perfecto para mamá |
| Modal título | 💌 Envia tu Wishlist | 🎁 Envía tu Wishlist |
| Modal label | Email de destino * | Email de quien recibe la lista * |
| Mailto subject | Mi Wishlist Sanborns | Mi Wishlist Sanborns - Día de las Madres |
| Mailto body saludo | Hola amor ❤️ | Hola 🌸 |
| Mailto body cuerpo | regalos que me gustarían para San Valentín | regalos que me gustarían para el Día de las Madres |
| Mailto firma | Tu pareja / Sanborns Wishlist de San Valentín | Para mamá / Sanborns Wishlist Día de las Madres |
| Botón enviar wishlist (productos) | Mi Wishlist de San Valentín - Sanborns | Mi Wishlist Día de las Madres - Sanborns |
| Cuerpo mailto directo (productos) | favoritos de San Valentín | favoritos para el Día de las Madres |
| Comentario JS | Productos Gift Finder San Valentín | Productos Gift Finder Día de las Madres |
| UTM campaign | sanborns_san_valentin_2025 | sanborns_dia_de_las_madres_2025 |
| Alert modal | …primero ❤️ | …primero 🌸 |

---

## Emojis sustituidos

| Contexto | Antes (decimal) | Después (decimal) | Significado |
|----------|------------------|-------------------|-------------|
| Header wishlist | &#10084;&#65039; (❤️) | &#127804; (🌸) | Flor |
| Floating 1 | &#128157; (💕) | &#127804; (🌸) | Flor |
| Floating 2 | &#128150; (💖) | &#127801; (🌷) | Tulipán |
| Floating 3 | &#128149; (💕) | &#127873; (🎁) | Regalo |
| Modal título | &#128140; (💌) | &#127873; (🎁) | Regalo |
| Botón Agregar/Quitar | ❤️ / 🤍 | &#127804; (🌸) / &#127873; (🎁) | Flor / Regalo |
| Botón ENVIAR WISHLIST | 💌 | &#127873; (🎁) | Regalo |
| Alert wishlist | ❤️ | 🌸 | Flor |

(El botón “Enviar Wishlist” del modal mantiene &#9993;&#65039; (✉️) por ser icono de envío de correo.)

---

## No modificado (según alcance)

- Estructura y datos de `productosDatabase` (incluidos textos “San Valentín” en descuentos/labels de productos).
- Lógica de categorías, género, mailto, click tags y macros.
- Un solo `index.html` con CSS y JS inlined; sin archivos externos de código ni build.

---

## Recomendación opcional (no implementada)

Si en el futuro se quisiera simplificar el flujo para Día de las Madres, se podría ofrecer una sola opción “Regalo para mamá” en lugar de “Para una Mujer” / “Para un Hombre”, manteniendo por detrás la misma lógica de categorías y productos. Sería un cambio de copy y de botones en la pantalla de bienvenida, sin tocar la estructura de datos ni las pantallas de categorías/productos.
