Sanborns Gift Finder - Banner DSP/DV360 v20250211-dsp-ready
============================================================

CONTENIDO DEL ZIP
- index.html      Entrada principal del banner
- manifest.json   Metadatos y dimensiones 640x1280
- main.js         Lógica del Gift Finder
- products-data.js Base de productos
- styles.css      Estilos (fluid, modal absolute)

DIMENSIONES
640 x 1280 px (Full Screen Mobile)

CLICKTAG
Variable global: clickTag (inyectable por DSP).
Fallback: Enabler.exit / EB.clickthrough / myFT.clickTag / window.open(clickTag).

TRACKING (DataLayer + Enabler.counter)
- banner_loaded
- gender_selected
- category_selected
- product_clicked
- product_added_to_wishlist
- wishlist_sent
- background_exit (click en overlay)

WISHLIST
Solo mailto: (sin fetch/API). El usuario envía desde su cliente de correo.

PRUEBA LOCAL
Abrir test-dsp.html en el navegador para simular contenedor DSP 640x1280.
