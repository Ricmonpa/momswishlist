# Sanborns San Valentín – Versión v2 (backup)

## Cambios v2
- **Google Analytics 4** agregado (placeholder en `index.html`).
- **Meta Pixel** agregado (placeholder en `index.html`).
- **Imágenes más comprimidas**: calidad 45%, max 320px → ZIP **235.7 KB** (objetivo < 250 KB).
- DataLayer, Enabler, ClickTag y toda la funcionalidad existente se mantienen igual.

## Antes de subir / enviar al cliente

En `index.html` reemplaza los placeholders por los IDs reales:

1. **GA4**: busca `G-XXXXXXXXXX` (aparece 2 veces) y sustituye por tu **Measurement ID** de GA4 (ej. `G-ABC123XYZ`).
2. **Meta Pixel**: busca `REPLACE_WITH_META_PIXEL_ID` y sustituye por tu **Pixel ID** de Meta (ej. `1234567890123456`).

## Generar de nuevo el ZIP v2

```powershell
powershell -ExecutionPolicy Bypass -File scripts/create-zip-v2.ps1
```

Salida: `Sanborns_SanValentin_v2.zip` (index.html + manifest.json + images/ con imágenes comprimidas v2).

## Eventos que se envían a GA4 y Meta Pixel

Los mismos que ya envías a DataLayer/Enabler, por ejemplo:
- `banner_loaded`
- `gender_selected`
- `category_selected`
- `product_clicked`
- `product_added_to_wishlist`
- `wishlist_modal_opened`
- `wishlist_sent`

Meta recibe los eventos como **eventos personalizados** (`trackCustom`).
