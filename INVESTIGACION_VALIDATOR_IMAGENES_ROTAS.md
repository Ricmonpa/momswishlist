# Investigación: Imágenes Rotas en Validador DCM (h5validator.appspot.com)

## 1. Descripción del problema (screenshot)

**Pantalla:** Validador HTML5 de Google (h5validator.appspot.com/dcm/asset?result=…).

**Contenido visible:**
- **Header:** Texto "Sanborns", botón "0 en tu wishlist" con corazón.
- **Navegación:** Botón "← Volver" rosa.
- **Contenido:** Título "Gadgets", subtítulo "Encontramos ofertas para ti".
- **Productos:** Tres tarjetas (Samsung Galaxy Watch 8 40mm, Huawei Watch Fit 4 Pro, Smartband Huawei Band 10). **En todas se ve el ícono de imagen rota** (icono gris de imagen no encontrada) donde debería estar la foto del producto.

**Conclusión visual:** Las imágenes de productos no cargan; los demás elementos sí.

---

## 2. Pruebas realizadas

| Verificación | Resultado |
|--------------|-----------|
| ¿Existe `images/logo.png` en el proyecto? | ✅ Sí (30,757 bytes) |
| ¿Existe en el ZIP FULL? | ✅ Sí: `images/logo.png` (30,757 bytes) |
| ¿Existe en el ZIP COMPRESSED? | ✅ Sí: `images/logo.png` (16,447 bytes) |
| ¿Productos de Gadgets en el ZIP? | ✅ `images/producto-709913.jpeg`, `images/producto-675581.jpeg`, `images/producto-613747.jpeg` |
| Rutas en HTML | ✅ `images/producto-709913.jpeg`, etc. |
| Nº de archivos en ZIP | 45 (límite DCM: 100) |
| localStorage/sessionStorage | ✅ No usado (aceptable para DCM) |

**Estructura del ZIP:**
```
index.html
images/logo.png
images/heart.svg
images/placeholder.svg
images/producto-*.jpg | producto-*.jpeg
```

---

## 3. Tesis del problema

El validador sirve el creative con URL tipo:

`https://h5validator.appspot.com/dcm/asset?result=5654373143805952`

Para rutas relativas, el navegador toma como base el path `/dcm/asset` (sin el query). Al resolver `images/producto-709913.jpeg` obtiene:

`/dcm/images/producto-709913.jpeg`

Las assets reales, en cambio, suelen estar en rutas con el ID del asset, p. ej.:

`/dcm/asset/5654373143805952/images/producto-709913.jpeg`

Al pedir `/dcm/images/...` en lugar de `/dcm/asset/5654373143805952/images/...`, el servidor devuelve 404 y se ve el ícono de imagen rota.

---

## 4. Solución propuesta (sin romper nada)

**Opción A – Base explícito (recomendada):**

Añadir en `<head>` un `<base>` que fije la ruta base al directorio del documento:

```html
<base href="" id="adBase">
<script>
(function(){
  var p = location.pathname || '';
  var idx = p.indexOf('/asset');
  if (idx >= 0) {
    var rest = p.substring(idx + 6); // después de /asset
    var end = rest.indexOf('/');
    if (end < 0) end = rest.length;
    var id = rest.substring(0, end);
    document.getElementById('adBase').href = (id ? '/dcm/asset/' + id + '/' : './');
  } else {
    document.getElementById('adBase').href = './';
  }
})();
</script>
```

Esto requiere que el script se ejecute antes de que se rendericen las `<img>`; si el HTML se parsea antes, puede no surtir efecto.

**Opción B – Base simple:**

```html
<base href="./">
```

Solo ayuda si el documento se sirve desde una ruta que termina en `/` (p. ej. `/dcm/asset/5654373143805952/`). Con `?result=...` puede no ser suficiente.

**Opción C – Esperar a que el validador sirva desde la ruta correcta:**

Si el validador cambiara para exponer el creative en algo como `/dcm/asset/{id}/`, las rutas relativas actuales funcionarían sin cambios.

---

## 5. Resumen para devs

- **Problema:** Imágenes de productos rotas en h5validator.appspot.com; las rutas relativas no coinciden con cómo el validador sirve los assets.
- **Evidencia:** Logo e imágenes están en el ZIP; HTML usa `images/producto-XXX.jpeg`; el validador usa URL con `?result=ID`, lo que puede provocar resolución incorrecta de `images/`.
- **Solución:** Probar un `<base href>` que apunte al directorio del creative; si no funciona, validar si el validador exige una estructura o URL de servido distinta.
- **No tocar:** Rutas `images/...`, estructura del ZIP (index.html + `images/`), ni referencia a archivos.
