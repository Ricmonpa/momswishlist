# 🚀 CACHE BUSTING - Guía de Versionado

## 📋 Problema Resuelto
El navegador cachea agresivamente el sitio, impidiendo que los usuarios vean actualizaciones después de la primera visita.

## ✅ Soluciones Implementadas

### 1. Meta Tags Anti-Caché en HTML
```html
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">
```

### 2. Versionado de Assets
Todos los archivos CSS y JS tienen parámetro de versión:
```html
<link rel="stylesheet" href="styles.css?v=20250129-1500">
<script src="products-data.js?v=20250129-1500"></script>
<script src="main.js?v=20250129-1500"></script>
```

### 3. Script de Limpieza de Storage
Al cargar la página, se limpia automáticamente:
- localStorage
- sessionStorage

### 4. Headers de Cloudflare Optimizados
- **HTML:** NO CACHE (siempre actualiza)
- **JS/CSS:** Cache de 1 hora (permite actualizaciones rápidas)
- **Imágenes:** Cache de 1 año (no cambian frecuentemente)

---

## 🔄 Cómo Actualizar la Versión

### Cada vez que hagas cambios:

1. **Actualiza el timestamp en index.html:**
   ```html
   <!-- Formato: YYYYMMDD-HHMM -->
   <link rel="stylesheet" href="styles.css?v=20250129-1530">
   <script src="products-data.js?v=20250129-1530"></script>
   <script src="main.js?v=20250129-1530"></script>
   ```

2. **Actualiza el console.log en el script:**
   ```javascript
   console.log('✅ Cache limpiado - Versión: 20250129-1530');
   ```

3. **Commit con mensaje descriptivo:**
   ```bash
   git commit -m "🔄 Update version to 20250129-1530"
   git push
   ```

---

## 📱 Para Compartir el Link

### Opción 1: Con parámetro de versión
```
https://wishlist.potential.site?v=20250129-1500
```

### Opción 2: Con timestamp
```
https://wishlist.potential.site?t=1738178400
```

### Opción 3: Forzar recarga (para testing)
```
https://wishlist.potential.site?nocache=true
```

---

## 🧪 Cómo Probar que Funciona

1. **Abrir DevTools (F12)**
2. **Ir a Network tab**
3. **Marcar "Disable cache"**
4. **Recargar la página (Ctrl+Shift+R o Cmd+Shift+R)**
5. **Verificar en Console:** Debe aparecer "✅ Cache limpiado - Versión: [timestamp]"

---

## 📊 Versiones Actuales

| Archivo | Versión Actual | Última Actualización |
|---------|---------------|---------------------|
| index.html | 20250129-1500 | 29 Enero 2025 15:00 |
| styles.css | 20250129-1500 | 29 Enero 2025 15:00 |
| main.js | 20250129-1500 | 29 Enero 2025 15:00 |
| products-data.js | 20250129-1500 | 29 Enero 2025 15:00 |

---

## 🔧 Comandos Útiles

### Generar timestamp actual (Unix):
```bash
date +%s
```

### Generar timestamp formato YYYYMMDD-HHMM:
```bash
date +%Y%m%d-%H%M
```

### Limpiar caché de Cloudflare (si tienes acceso):
```bash
# Purge all cache
curl -X POST "https://api.cloudflare.com/client/v4/zones/{zone_id}/purge_cache" \
  -H "Authorization: Bearer {api_token}" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}'
```

---

## ⚠️ IMPORTANTE

**Cada vez que hagas un cambio visible (CSS, JS, HTML):**
1. Actualiza el timestamp en index.html
2. Haz commit y push
3. Espera 30-60 segundos para el deploy
4. Comparte el link CON parámetro de versión

**Ejemplo:**
```
https://wishlist.potential.site?v=20250129-1530
```

Esto garantiza que los usuarios SIEMPRE vean la última versión.

---

## 📝 Notas

- El timestamp usa formato: `YYYYMMDD-HHMM`
- Ejemplo: `20250129-1500` = 29 de Enero 2025, 15:00 hrs
- Incrementa el timestamp cada vez que hagas cambios
- Los usuarios que ya visitaron el sitio verán la nueva versión automáticamente

---

**Estado:** ✅ IMPLEMENTADO
**Última actualización:** 29 Enero 2025 15:00
