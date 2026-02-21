# Diagnóstico: ZIP en validador DCM vs local/deploy

## 1. Síntoma

| Contexto | Comportamiento |
|----------|-----------------|
| **Local** (`file:///.../index.html`) y **deploy** (último push) | Fotos reales de productos cargan bien (`./images/producto-XXX.jpg`). |
| **Validador DCM** (h5validator.appspot.com, ZIP subido, incógnito) | Se ven iconos genéricos (placeholder / imagen rota) en todas las tarjetas; las fotos reales no cargan. |

Conclusión: el mismo `index.html` + carpeta `images/` funciona en un entorno y en el otro no. El fallo es **específico del entorno del validador**, no del código en sí.

---

## 2. Causa raíz (hipótesis)

- En el validador, las peticiones a **`./images/producto-XXX.jpg`** (y posiblemente a **`./images/placeholder.svg`**) **fallan** (404 o recurso no servido).
- Entonces se dispara **`onerror`** en el `<img>` y se asigna `src='./images/placeholder.svg'`. Si esa ruta también falla, el navegador muestra su icono por defecto (documento/landscape), que es lo que se ve como “genérico”.
- Por tanto: **en el validador, las rutas relativas a `images/` no resuelven al mismo sitio donde el validador sirve el HTML.**

Posibles motivos técnicos:

1. **Base URL distinta:** el validador puede servir el HTML desde una URL (p. ej. con query o path tipo `/dcm/asset?...`) donde `./` no es la raíz del ZIP extraído, así que `./images/` apunta a un path equivocado.
2. **Solo se sirve el HTML:** el validador podría exponer solo `index.html` y no la carpeta `images/` (p. ej. por límite de tamaño de ZIP o por diseño).
3. **Resolución de `./`:** algunos iframes o proxies resuelven mal rutas que empiezan por `./` frente a rutas sin `./` (p. ej. `images/archivo.jpg`).

No se puede ver el código del validador; la hipótesis se apoya en el comportamiento (imágenes fallan → onerror → placeholder o icono roto).

---

## 3. Qué no tocar

- **Nombres de archivos** en `images/`: correctos y coinciden con el HTML.
- **Lógica de `imgSrc`**: usa `p.img` (rutas locales); sin Unsplash.
- **Estructura del ZIP**: raíz con `index.html` + carpeta `images/` (sin carpeta contenedora extra). Correcta para DCM/HTML5.

---

## 4. Opciones de solución (tesis)

### A) Rutas sin `./` (recomendada para probar primero)

- **Cambio:** usar `images/producto-XXX.jpg` y `images/placeholder.svg` en lugar de `./images/...` en:
  - Datos de productos (`img: "images/..."`).
  - Fallback en JS (líneas 834–835).
  - `onerror` del `<img>` (línea 839).
- **Motivo:** en muchos entornos `./` y sin `./` son equivalentes, pero algunos servidores/iframes resuelven mal `./`. Es cambio mínimo y reversible.
- **Riesgo:** bajo; en local y en deploy suele seguir funcionando.

### B) Inline de imágenes (data URI)

- **Cambio:** convertir cada `producto-XXX.jpg` a base64 y poner `src="data:image/jpeg;base64,..."` en el HTML.
- **Ventaja:** no depende de rutas ni del servidor; las imágenes “viajan” dentro del HTML.
- **Desventajas:** HTML mucho más pesado; posibles límites de tamaño en validador/DCM; más complejidad de build.
- **Riesgo:** medio (tamaño, límites de plataforma).

### C) Base tag

- **Cambio:** añadir `<base href="">` con la URL base que asigne el validador.
- **Problema:** no conocemos esa URL; el validador podría inyectar su propia base. Sin esa información es arriesgado.
- **Riesgo:** alto sin documentación del validador.

### D) Solo asegurar ZIP y re-probar

- **Cambio:** verificar que el ZIP tenga exactamente en la raíz `index.html` y `images/` (cada archivo dentro de `images/`), sin `./` en rutas si se quiere probar A.
- **Riesgo:** nulo; es validación y empaquetado.

---

## 5. Resumen ejecutivo

- **Problema:** en el validador DCM las imágenes de producto no cargan; en local y en deploy sí.
- **Causa:** las peticiones a `./images/...` fallan en el entorno del validador (base URL o forma de servir el ZIP).
- **Recomendación:** aplicar **Opción A** (rutas `images/...` sin `./`), regenerar el ZIP y volver a subir al validador. Si sigue fallando, valorar **Opción B** (inline) o contactar soporte del validador para confirmar cómo se sirve el ZIP y qué base URL usa.

---

## 6. Verificación post-cambio

1. Probar local: abrir `index.html` desde disco y comprobar que todas las fotos de producto y el placeholder cargan.
2. Probar deploy: desplegar y comprobar que no se rompe nada.
3. Regenerar ZIP (solo `index.html` + `images/` en raíz, sin ocultos).
4. Subir el nuevo ZIP al validador en incógnito y comprobar si las fotos reales cargan.

Si con A el validador sigue mostrando placeholders/genéricos, el siguiente paso es confirmar con el validador (o pruebas manuales de URL) si realmente se sirve la carpeta `images/` y bajo qué path.
