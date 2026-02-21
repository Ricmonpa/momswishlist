# Prueba: Por qué las imágenes no cargan en el validador DCM

## Hecho comprobado AHORA

Se probaron las URLs donde el navegador resolvería las rutas relativas cuando el creative se ve en:

`https://h5validator.appspot.com/dcm/asset?result=6590163755597824`

Con rutas relativas `images/placeholder.svg` o `images/producto-XXX.jpg`, el navegador pide algo como:

- `https://h5validator.appspot.com/dcm/asset/images/placeholder.svg`
- o `https://h5validator.appspot.com/dcm/asset/6590163755597824/images/placeholder.svg`

(dependiendo de cómo se resuelva el “base” del documento).

## Resultado de la prueba (fetch en vivo)

| URL probada | Resultado |
|-------------|-----------|
| `https://h5validator.appspot.com/dcm/asset/images/placeholder.svg` | **404 – Content not found at specified URL** |
| `https://h5validator.appspot.com/dcm/asset/6590163755597824/images/placeholder.svg` | **404 – Content not found at specified URL** |

Es decir: en el dominio del validador **no existe** ningún recurso en `/dcm/asset/.../images/...`.

## Conclusión

- El validador **no sirve** la carpeta `images/` del ZIP en una ruta pública.
- Solo expone la vista del creative (probablemente inyectando o sirviendo el HTML en un iframe), pero **los archivos del ZIP (images/*) no están disponibles** en URLs como `/dcm/asset/images/...`.
- Por eso **todas** las peticiones a `images/producto-XXX.jpg` e `images/placeholder.svg` devuelven **404** → el navegador muestra el icono de imagen rota.
- No es un error de rutas en nuestro ZIP (`./images/` vs `images/`): las rutas están bien. El problema es que **el validador no publica esos assets**.

## Qué sí funcionaría en el validador

- **Incrustar las imágenes en el HTML** como **data URI** (base64). Así no se hace ninguna petición a `images/...` y el creative se ve correctamente aunque el validador no sirva la carpeta `images/`.

Si quieres, el siguiente paso es definir qué imágenes incrustar (p. ej. las 9 de producto + placeholder) y te indico los cambios concretos en el `index.html`.
