# ⚠️ IMPORTANTE: URLs de Productos

## ✅ Reglas para URLs en products-data.js

TODAS las URLs en `products-data.js` DEBEN:

- ✅ Comenzar con `https://www.sanborns.com.mx`
- ✅ Ser URLs completas (no relativas)
- ✅ Probarse antes de hacer commit

## ❌ NUNCA usar:

- ❌ `/c/categoria/` (ruta relativa desde raíz)
- ❌ `c/categoria/` (ruta relativa)
- ❌ `categoria/` (ruta relativa)
- ❌ URLs sin protocolo

## ✅ Formato Correcto:

```javascript
// CORRECTO - URL completa con dominio
url: "https://www.sanborns.com.mx/producto/235084/fragancia-para-dama-carolina-herrera-good-girl-edp-80ml"

// CORRECTO - Categoría con dominio completo
url: "https://www.sanborns.com.mx/c/perfumes-mujer/"

// INCORRECTO - Ruta relativa
url: "/c/perfumes-mujer/"  // ❌ NO USAR

// INCORRECTO - Sin protocolo
url: "www.sanborns.com.mx/c/perfumes-mujer/"  // ❌ NO USAR
```

## 🔍 Validación Automática

El archivo `products-data.js` incluye un script de validación que se ejecuta automáticamente al cargar la página.

### Ver resultados en consola:

1. Abre DevTools (F12)
2. Ve a la pestaña Console
3. Busca el mensaje de validación:
   - ✅ `TODOS LOS LINKS SON VÁLIDOS` = Todo bien
   - ❌ `LINKS ROTOS ENCONTRADOS` = Hay errores

### Ejemplo de salida correcta:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 VALIDACIÓN DE URLs DE PRODUCTOS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 Total de productos: 49

✅ TODOS LOS LINKS SON VÁLIDOS
✅ Todas las URLs comienzan con https://
✅ Todas las URLs apuntan a sanborns.com.mx
✅ No hay rutas relativas
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## 🧪 Probar URLs Manualmente

Para probar una URL específica en la consola:

```javascript
// Test rápido
fetch('https://www.sanborns.com.mx/c/cuidado-de-la-piel/')
  .then(r => console.log(r.status === 200 ? '✅ Link OK' : '❌ Link roto'))
  .catch(e => console.error('❌ Error:', e));
```

## 📝 Checklist Antes de Commit

Antes de hacer commit de cambios en `products-data.js`:

- [ ] Todas las URLs comienzan con `https://www.sanborns.com.mx`
- [ ] No hay rutas relativas (`/c/...` o `c/...`)
- [ ] Abrir la página y verificar consola
- [ ] Validación muestra "✅ TODOS LOS LINKS SON VÁLIDOS"
- [ ] Probar manualmente 2-3 productos haciendo click

## 🚨 Si Encuentras Errores

1. La validación mostrará una tabla con los errores
2. Corrige cada URL en `products-data.js`
3. Recarga la página (Ctrl+Shift+R)
4. Verifica que la validación pase
5. Haz commit solo cuando todo esté verde

## 📊 Categorías Válidas de Sanborns

### Mujer:
- `https://www.sanborns.com.mx/c/perfumes-mujer/`
- `https://www.sanborns.com.mx/c/maquillaje/`
- `https://www.sanborns.com.mx/c/bolsas/`
- `https://www.sanborns.com.mx/c/joyeria/`
- `https://www.sanborns.com.mx/c/cuidado-de-la-piel/`
- `https://www.sanborns.com.mx/c/libros/`
- `https://www.sanborns.com.mx/c/hogar/`

### Hombre:
- `https://www.sanborns.com.mx/c/perfumes-hombre/`
- `https://www.sanborns.com.mx/c/accesorios-hombre/`
- `https://www.sanborns.com.mx/c/ropa-hombre/`
- `https://www.sanborns.com.mx/c/cuidado-personal-hombre/`
- `https://www.sanborns.com.mx/c/relojes/`
- `https://www.sanborns.com.mx/c/videojuegos/`
- `https://www.sanborns.com.mx/c/deportes/`
- `https://www.sanborns.com.mx/c/libros/`

## 💡 Tracking UTM

Todas las URLs se abren con parámetros UTM automáticamente:

```
?utm_source=gift_finder
&utm_medium=banner
&utm_campaign=san_valentin_2025
```

No es necesario agregarlos manualmente en `products-data.js`.

---

**Última actualización:** 29 Enero 2025 16:15
**Versión:** 20250129-1615
