/**
 * Productos Gift Finder San Valentín - Sanborns
 * Mapeo EXACTO por categoría. Solo imágenes locales (./images/producto-ID) o placeholder.
 * v9 URGENT-FIX - Categorías corregidas: Celulares=celulares, Fotografía=cámaras, Gadgets=wearables, Regalos=productos reales.
 */
const productosDatabase = {
  mujer: {
    maquillaje: [
      { id: 1, nombre: "Set Yuya Gel de ceja + polvo + tinta", precio: "$899", precioOriginal: "$1,299", img: "./images/placeholder.svg", descuento: "30% OFF", url: "https://www.sanborns.com.mx/producto/614484" },
      { id: 2, nombre: "Set Yuya Gel + polvo traslúcido + tinta", precio: "$799", precioOriginal: "$1,199", img: "./images/placeholder.svg", descuento: "33% OFF", url: "https://www.sanborns.com.mx/producto/614483" },
      { id: 3, nombre: "Cosmético Sanborns (ID 574428)", precio: "$1,199", precioOriginal: "$1,699", img: "./images/placeholder.svg", descuento: "29% OFF", url: "https://www.sanborns.com.mx/producto/574428" },
      { id: 4, nombre: "Labial Líquido Mate Yuya Bruma", precio: "$699", precioOriginal: "$999", img: "./images/placeholder.svg", descuento: "30% OFF", url: "https://www.sanborns.com.mx/producto/553342" },
      { id: 5, nombre: "Esmalte Chico Matizador Bissú", precio: "$999", precioOriginal: "$1,499", img: "./images/placeholder.svg", descuento: "33% OFF", url: "https://www.sanborns.com.mx/producto/615405" }
    ],
    cuidado: [
      { id: 6, nombre: "Eucerin Epigenetic Serum 30ml", precio: "$1,299", precioOriginal: "$1,799", img: "./images/placeholder.svg", descuento: "28% OFF", url: "https://www.sanborns.com.mx/producto/515019" },
      { id: 7, nombre: "Anti-Pigment Dual Serum Eucerin", precio: "$999", precioOriginal: "$1,499", img: "./images/placeholder.svg", descuento: "33% OFF", url: "https://www.sanborns.com.mx/producto/59701" },
      { id: 8, nombre: "Avene Agua Termal Piel Sensible 300ml", precio: "$799", precioOriginal: "$1,199", img: "./images/placeholder.svg", descuento: "33% OFF", url: "https://www.sanborns.com.mx/producto/437851" },
      { id: 9, nombre: "Cetaphil Crema Hidratante 453g", precio: "$1,499", precioOriginal: "$1,999", img: "./images/placeholder.svg", descuento: "25% OFF", url: "https://www.sanborns.com.mx/producto/274804" },
      { id: 10, nombre: "Ducray Squanorm Shampoo Anticaspa", precio: "$699", precioOriginal: "$999", img: "./images/placeholder.svg", descuento: "30% OFF", url: "https://www.sanborns.com.mx/producto/11370" }
    ],
    estilismo: [
      { id: 209620, nombre: "Wafflera Perfect Heat Revlon", precio: "Ver en Sanborns", precioOriginal: "", img: "./images/producto-209620.jpg", descuento: "Estilismo", url: "https://www.sanborns.com.mx/producto/209620/wafflera-perfect-heat-revlon" },
      { id: 118091, nombre: "Cepillo Secador y Voluminizador One Step Revlon", precio: "Ver en Sanborns", precioOriginal: "", img: "./images/producto-118091.jpg", descuento: "Estilismo", url: "https://www.sanborns.com.mx/producto/118091/cepillo-secador-y-voluminizador-one-step-revlon" },
      { id: 16117, nombre: "Secadora Timco ST-1875 Avo Confort con Lunares", precio: "Ver en Sanborns", precioOriginal: "", img: "./images/producto-16117.jpg", descuento: "Estilismo", url: "https://www.sanborns.com.mx/producto/16117/secadora-timco-st-1875-avo-confort-con-lunares" }
    ],
    bolsas: [
      { id: 26, nombre: "Bolsas de Mano", precio: "Desde $999", precioOriginal: "", img: "./images/placeholder.svg", descuento: "Ofertas", url: "https://www.sanborns.com.mx/c/bolsas/" },
      { id: 27, nombre: "Bolsas Fashion", precio: "Variedad", precioOriginal: "", img: "./images/placeholder.svg", descuento: "San Valentín", url: "https://www.sanborns.com.mx/c/bolsas/" },
      { id: 28, nombre: "Clutch y Carteras", precio: "Ofertas", precioOriginal: "", img: "./images/placeholder.svg", descuento: "Regalos", url: "https://www.sanborns.com.mx/c/bolsas/" }
    ],
    joyeria: [
      { id: 29, nombre: "Joyería y Aretes", precio: "Desde $599", precioOriginal: "", img: "./images/placeholder.svg", descuento: "Ofertas", url: "https://www.sanborns.com.mx/c/joyeria/" },
      { id: 30, nombre: "Collares y Pulseras", precio: "Variedad", precioOriginal: "", img: "./images/placeholder.svg", descuento: "San Valentín", url: "https://www.sanborns.com.mx/c/joyeria/" },
      { id: 31, nombre: "Accesorios Elegantes", precio: "Regalos", precioOriginal: "", img: "./images/placeholder.svg", descuento: "25% OFF", url: "https://www.sanborns.com.mx/c/joyeria/" }
    ],
    perfumeria: [
      { id: 11, nombre: "Rabanne Fame Couture Edition EDP 80ml", precio: "$2,499", precioOriginal: "$3,299", img: "./images/placeholder.svg", descuento: "25% OFF", url: "https://www.sanborns.com.mx/producto/608266" },
      { id: 12, nombre: "Versace Dylan Blush Pink EDP 100ml", precio: "$2,199", precioOriginal: "$2,999", img: "./images/placeholder.svg", descuento: "27% OFF", url: "https://www.sanborns.com.mx/producto/813851" },
      { id: 13, nombre: "Moschino Toy 2 Bubblegum EDT 100ml", precio: "$1,999", precioOriginal: "$2,699", img: "./images/placeholder.svg", descuento: "26% OFF", url: "https://www.sanborns.com.mx/producto/303224" },
      { id: 14, nombre: "Montblanc Signature Elixir EDP 90ml", precio: "$2,799", precioOriginal: "$3,499", img: "./images/placeholder.svg", descuento: "20% OFF", url: "https://www.sanborns.com.mx/producto/813852" },
      { id: 15, nombre: "Carolina Herrera Good Girl Blush EDP 80ml", precio: "$2,299", precioOriginal: "$2,999", img: "./images/placeholder.svg", descuento: "23% OFF", url: "https://www.sanborns.com.mx/producto/310467" }
    ],
    libros: [
      { id: 32, nombre: "Best Sellers Románticos", precio: "$399", precioOriginal: "$599", img: "./images/placeholder.svg", descuento: "33% OFF", url: "https://www.sanborns.com.mx/c/libros/" },
      { id: 33, nombre: "Box Set Clásicos", precio: "$599", precioOriginal: "$899", img: "./images/placeholder.svg", descuento: "33% OFF", url: "https://www.sanborns.com.mx/c/libros/" },
      { id: 34, nombre: "Libros y Regalos", precio: "$299", precioOriginal: "$499", img: "./images/placeholder.svg", descuento: "40% OFF", url: "https://www.sanborns.com.mx/c/libros/" }
    ],
    celulares: [
      { id: 204859, nombre: "iPhone 13 128GB Azul Marino Telcel", precio: "Ver en Sanborns", precioOriginal: "", img: "./images/producto-204859.jpeg", descuento: "Destacados", url: "https://www.sanborns.com.mx/producto/204859/iphone-13-128gb-azul-marino-telcel-r9" },
      { id: 288937, nombre: "iPhone 14 128GB Blanco Telcel", precio: "Ver en Sanborns", precioOriginal: "", img: "./images/producto-288937.jpeg", descuento: "Tecnología", url: "https://www.sanborns.com.mx/producto/288937/iphone-14-128gb-blanco-telcel-r9" },
      { id: 361481, nombre: "OPPO A79 5G 256GB Lila Telcel", precio: "Ver en Sanborns", precioOriginal: "", img: "./images/producto-361481.jpeg", descuento: "Ofertas", url: "https://www.sanborns.com.mx/producto/361481/oppo-a79-5g-256gb-lila-telcel-r9" },
      { id: 564958, nombre: "Honor X7c 256GB Verde Telcel", precio: "Ver en Sanborns", precioOriginal: "", img: "./images/producto-564958.jpeg", descuento: "Regalos", url: "https://www.sanborns.com.mx/producto/564958/honor-x7c-256gb-verde-telcel-r9-earbuds" },
      { id: 655190, nombre: "Samsung Galaxy A16 5G 128GB Verde", precio: "Ver en Sanborns", precioOriginal: "", img: "./images/producto-655190.jpeg", descuento: "Destacados", url: "https://www.sanborns.com.mx/producto/655190/celular-samsung-galaxy-a16-5g-128gb-verde-telcel-r3" }
    ],
    gadgets: [
      { id: 709913, nombre: "Samsung Galaxy Watch 8 40mm", precio: "Ver en Sanborns", precioOriginal: "", img: "./images/producto-709913.jpeg", descuento: "Regalos", url: "https://www.sanborns.com.mx/producto/709913/samsung-galaxy-watch-8-40mm" },
      { id: 675581, nombre: "Huawei Watch Fit 4 Pro", precio: "Ver en Sanborns", precioOriginal: "", img: "./images/producto-675581.jpeg", descuento: "San Valentín", url: "https://www.sanborns.com.mx/producto/675581/huawei-watch-fit-4-pro" },
      { id: 613747, nombre: "Smartband Huawei Band 10", precio: "Ver en Sanborns", precioOriginal: "", img: "./images/producto-613747.jpeg", descuento: "Ofertas", url: "https://www.sanborns.com.mx/producto/613747/smartband-huawei-band-10" }
    ],
    fotografia: [
      { id: 775767, nombre: "Kit Cámara Fuji Instax Mini 12", precio: "Ver en Sanborns", precioOriginal: "", img: "./images/producto-775767.jpeg", descuento: "Variedad", url: "https://www.sanborns.com.mx/producto/775767/kit-camara-fuji-instax-mini-12" },
      { id: 333596, nombre: "Cámara Fujifilm Instax Mini 12 Rosa", precio: "Ver en Sanborns", precioOriginal: "", img: "./images/producto-333596.jpeg", descuento: "Destacados", url: "https://www.sanborns.com.mx/producto/333596/camara-fujifilm-instax-mini-12-rosa" },
      { id: 825511, nombre: "Cámara Fuji Instax Mini Evo Rosa", precio: "Ver en Sanborns", precioOriginal: "", img: "./images/producto-825511.jpeg", descuento: "Ofertas", url: "https://www.sanborns.com.mx/producto/825511/camara-fuji-instax-mini-evo-rosa" },
      { id: 292521, nombre: "Portarretrato Digital Voltak 7\" Gris", precio: "Ver en Sanborns", precioOriginal: "", img: "./images/producto-292521.jpeg", descuento: "San Valentín", url: "https://www.sanborns.com.mx/producto/292521/portarretrato-digital-voltak-7-pulgadas-gris" }
    ],
    regalos: [
      { id: 828730, nombre: "LEGO Botanicals Margaritas", precio: "Ver en Sanborns", precioOriginal: "", img: "./images/producto-828730.jpeg", descuento: "Destacados", url: "https://www.sanborns.com.mx/producto/828730/lego-botanicals-margaritas-decoracion-floral" },
      { id: 828716, nombre: "LEGO Botanicals Lirio de la Paz", precio: "Ver en Sanborns", precioOriginal: "", img: "./images/producto-828716.jpeg", descuento: "San Valentín", url: "https://www.sanborns.com.mx/producto/828716/lego-botanicals-lirio-de-la-paz-decoracion-floral" },
      { id: 828721, nombre: "LEGO Botanicals Ramo de Tulipanes", precio: "Ver en Sanborns", precioOriginal: "", img: "./images/producto-828721.jpeg", descuento: "Ofertas", url: "https://www.sanborns.com.mx/producto/828721/lego-botanicals-ramo-de-tulipanes-decoracion" },
      { id: 569166, nombre: "Peluche Teddy Rosa Roja", precio: "Ver en Sanborns", precioOriginal: "", img: "./images/producto-569166.jpeg", descuento: "San Valentín", url: "https://www.sanborns.com.mx/producto/569166/peluche-teddy-rosa-roja" },
      { id: 569167, nombre: "Peluche Teddy Sobre Rojo", precio: "Ver en Sanborns", precioOriginal: "", img: "./images/producto-569167.jpeg", descuento: "Destacados", url: "https://www.sanborns.com.mx/producto/569167/peluche-teddy-sobre-rojo" },
      { id: 828731, nombre: "LEGO Botanicals Cactus en Flor", precio: "Ver en Sanborns", precioOriginal: "", img: "./images/producto-828731.jpg", descuento: "Regalos", url: "https://www.sanborns.com.mx/producto/828731/lego-botanicals-cactus-en-flor-decoracion" }
    ],
    tecnologia: [
      { id: 35, nombre: "Audífonos Soundcore Aero Fit Pro", precio: "Ofertas", precioOriginal: "", img: "./images/producto-565250.jpeg", descuento: "Destacados", url: "https://www.sanborns.com.mx/producto/565250/audifonos-soundcore-aero-fit-pro" },
      { id: 36, nombre: "Audífonos Soundcore Space One Azul", precio: "Variedad", precioOriginal: "", img: "./images/producto-482420.jpeg", descuento: "Regalos", url: "https://www.sanborns.com.mx/producto/482420/audifonos-soundcore-space-one-azul" },
      { id: 37, nombre: "Audífonos Sony WH-CH520 Bluetooth", precio: "Desde $499", precioOriginal: "", img: "./images/producto-324151.jpeg", descuento: "Ofertas", url: "https://www.sanborns.com.mx/producto/324151/audifonos-sony-wh-ch520-bluetooth-beige" },
      { id: 38, nombre: "Audífonos STF Aurum On-Ear Negro", precio: "Ofertas", precioOriginal: "", img: "./images/producto-229402.jpeg", descuento: "San Valentín", url: "https://www.sanborns.com.mx/producto/229402/audifonos-stf-aurum-on-ear-negro" }
    ],
    hogar: [
      { id: 43, nombre: "LEGO Botanicals Margaritas", precio: "Ofertas", precioOriginal: "", img: "./images/producto-828730.jpeg", descuento: "Destacados", url: "https://www.sanborns.com.mx/producto/828730/lego-botanicals-margaritas-decoracion-floral" },
      { id: 44, nombre: "LEGO Botanicals Lirio de la Paz", precio: "Regalos", precioOriginal: "", img: "./images/producto-828716.jpeg", descuento: "San Valentín", url: "https://www.sanborns.com.mx/producto/828716/lego-botanicals-lirio-de-la-paz-decoracion-floral" },
      { id: 45, nombre: "LEGO Botanicals Ramo de Tulipanes", precio: "Variedad", precioOriginal: "", img: "./images/producto-828721.jpeg", descuento: "Ofertas", url: "https://www.sanborns.com.mx/producto/828721/lego-botanicals-ramo-de-tulipanes-decoracion" },
      { id: 46, nombre: "LEGO Botanicals Cactus en Flor", precio: "Desde $699", precioOriginal: "", img: "./images/producto-828731.jpg", descuento: "Regalos", url: "https://www.sanborns.com.mx/producto/828731/lego-botanicals-cactus-en-flor-decoracion" },
      { id: 47, nombre: "Peluche Teddy Rosa Roja", precio: "Ofertas", precioOriginal: "", img: "./images/producto-569166.jpeg", descuento: "San Valentín", url: "https://www.sanborns.com.mx/producto/569166/peluche-teddy-rosa-roja" },
      { id: 48, nombre: "Peluche Teddy Sobre Rojo", precio: "Variedad", precioOriginal: "", img: "./images/producto-569167.jpeg", descuento: "Destacados", url: "https://www.sanborns.com.mx/producto/569167/peluche-teddy-sobre-rojo" }
    ]
  },
  hombre: {
    accesorios: [
      { id: 59, nombre: "Accesorios Hombre", precio: "Desde $699", precioOriginal: "", img: "./images/placeholder.svg", descuento: "Ofertas", url: "https://www.sanborns.com.mx/c/accesorios-hombre/" },
      { id: 60, nombre: "Carteras y Cinturones", precio: "Variedad", precioOriginal: "", img: "./images/placeholder.svg", descuento: "San Valentín", url: "https://www.sanborns.com.mx/c/accesorios-hombre/" },
      { id: 61, nombre: "Mancuernillas y Más", precio: "Regalos", precioOriginal: "", img: "./images/placeholder.svg", descuento: "25% OFF", url: "https://www.sanborns.com.mx/c/accesorios-hombre/" }
    ],
    moda: [
      { id: 62, nombre: "Ropa Hombre", precio: "Ofertas", precioOriginal: "", img: "./images/placeholder.svg", descuento: "San Valentín", url: "https://www.sanborns.com.mx/c/ropa-hombre/" },
      { id: 63, nombre: "Camisas y Polos", precio: "Variedad", precioOriginal: "", img: "./images/placeholder.svg", descuento: "Regalos", url: "https://www.sanborns.com.mx/c/ropa-hombre/" },
      { id: 64, nombre: "Moda Casual", precio: "Desde $899", precioOriginal: "", img: "./images/placeholder.svg", descuento: "30% OFF", url: "https://www.sanborns.com.mx/c/ropa-hombre/" }
    ],
    celulares: [
      { id: 204859, nombre: "iPhone 13 128GB Azul Marino Telcel", precio: "Ver en Sanborns", precioOriginal: "", img: "./images/producto-204859.jpeg", descuento: "Destacados", url: "https://www.sanborns.com.mx/producto/204859/iphone-13-128gb-azul-marino-telcel-r9" },
      { id: 288937, nombre: "iPhone 14 128GB Blanco Telcel", precio: "Ver en Sanborns", precioOriginal: "", img: "./images/producto-288937.jpeg", descuento: "Tecnología", url: "https://www.sanborns.com.mx/producto/288937/iphone-14-128gb-blanco-telcel-r9" },
      { id: 361481, nombre: "OPPO A79 5G 256GB Lila Telcel", precio: "Ver en Sanborns", precioOriginal: "", img: "./images/producto-361481.jpeg", descuento: "Ofertas", url: "https://www.sanborns.com.mx/producto/361481/oppo-a79-5g-256gb-lila-telcel-r9" },
      { id: 564958, nombre: "Honor X7c 256GB Verde Telcel", precio: "Ver en Sanborns", precioOriginal: "", img: "./images/producto-564958.jpeg", descuento: "Regalos", url: "https://www.sanborns.com.mx/producto/564958/honor-x7c-256gb-verde-telcel-r9-earbuds" },
      { id: 655190, nombre: "Samsung Galaxy A16 5G 128GB Verde", precio: "Ver en Sanborns", precioOriginal: "", img: "./images/producto-655190.jpeg", descuento: "Destacados", url: "https://www.sanborns.com.mx/producto/655190/celular-samsung-galaxy-a16-5g-128gb-verde-telcel-r3" }
    ],
    tablets: [
      { id: 714971, nombre: "Tablet Samsung Galaxy S10 Lite 128GB", precio: "Ver en Sanborns", precioOriginal: "", img: "./images/producto-714971.jpeg", descuento: "Destacados", url: "https://www.sanborns.com.mx/producto/714971/tablet-samsung-galaxy-s10-lite-128gb-coral-red" },
      { id: 804962, nombre: "MatePad 11.5 Gris 8/128GB", precio: "Ver en Sanborns", precioOriginal: "", img: "./images/producto-804962.jpeg", descuento: "Regalos", url: "https://www.sanborns.com.mx/producto/804962/matepad-11-5-gris-8-128g-120hz-2-5k" },
      { id: 522756, nombre: "Tablet Samsung Galaxy Tab S10 Ultra", precio: "Ver en Sanborns", precioOriginal: "", img: "./images/producto-522756.jpeg", descuento: "San Valentín", url: "https://www.sanborns.com.mx/producto/522756/tablet-samsung-galaxy-tab-s10-ultra-12gb-256gb-moonstone-gray-spen" }
    ],
    audio: [
      { id: 565250, nombre: "Audífonos Soundcore Aero Fit Pro", precio: "Ver en Sanborns", precioOriginal: "", img: "./images/producto-565250.jpeg", descuento: "Destacados", url: "https://www.sanborns.com.mx/producto/565250/audifonos-soundcore-aero-fit-pro" },
      { id: 482420, nombre: "Audífonos Soundcore Space One Azul", precio: "Ver en Sanborns", precioOriginal: "", img: "./images/producto-482420.jpeg", descuento: "Regalos", url: "https://www.sanborns.com.mx/producto/482420/audifonos-soundcore-space-one-azul" },
      { id: 324151, nombre: "Audífonos Sony WH-CH520 Bluetooth", precio: "Ver en Sanborns", precioOriginal: "", img: "./images/producto-324151.jpeg", descuento: "San Valentín", url: "https://www.sanborns.com.mx/producto/324151/audifonos-sony-wh-ch520-bluetooth-beige" },
      { id: 229402, nombre: "Audífonos STF Aurum On-Ear Negro", precio: "Ver en Sanborns", precioOriginal: "", img: "./images/producto-229402.jpeg", descuento: "Ofertas", url: "https://www.sanborns.com.mx/producto/229402/audifonos-stf-aurum-on-ear-negro" }
    ],
    fotografia: [
      { id: 775767, nombre: "Kit Cámara Fuji Instax Mini 12", precio: "Ver en Sanborns", precioOriginal: "", img: "./images/producto-775767.jpeg", descuento: "Variedad", url: "https://www.sanborns.com.mx/producto/775767/kit-camara-fuji-instax-mini-12" },
      { id: 333596, nombre: "Cámara Fujifilm Instax Mini 12 Rosa", precio: "Ver en Sanborns", precioOriginal: "", img: "./images/producto-333596.jpeg", descuento: "Destacados", url: "https://www.sanborns.com.mx/producto/333596/camara-fujifilm-instax-mini-12-rosa" },
      { id: 825511, nombre: "Cámara Fuji Instax Mini Evo Rosa", precio: "Ver en Sanborns", precioOriginal: "", img: "./images/producto-825511.jpeg", descuento: "Ofertas", url: "https://www.sanborns.com.mx/producto/825511/camara-fuji-instax-mini-evo-rosa" },
      { id: 292521, nombre: "Portarretrato Digital Voltak 7\" Gris", precio: "Ver en Sanborns", precioOriginal: "", img: "./images/producto-292521.jpeg", descuento: "San Valentín", url: "https://www.sanborns.com.mx/producto/292521/portarretrato-digital-voltak-7-pulgadas-gris" }
    ],
    regalos: [
      { id: 828730, nombre: "LEGO Botanicals Margaritas", precio: "Ver en Sanborns", precioOriginal: "", img: "./images/producto-828730.jpeg", descuento: "Destacados", url: "https://www.sanborns.com.mx/producto/828730/lego-botanicals-margaritas-decoracion-floral" },
      { id: 828716, nombre: "LEGO Botanicals Lirio de la Paz", precio: "Ver en Sanborns", precioOriginal: "", img: "./images/producto-828716.jpeg", descuento: "San Valentín", url: "https://www.sanborns.com.mx/producto/828716/lego-botanicals-lirio-de-la-paz-decoracion-floral" },
      { id: 569166, nombre: "Peluche Teddy Rosa Roja", precio: "Ver en Sanborns", precioOriginal: "", img: "./images/producto-569166.jpeg", descuento: "San Valentín", url: "https://www.sanborns.com.mx/producto/569166/peluche-teddy-rosa-roja" },
      { id: 569167, nombre: "Peluche Teddy Sobre Rojo", precio: "Ver en Sanborns", precioOriginal: "", img: "./images/producto-569167.jpeg", descuento: "Destacados", url: "https://www.sanborns.com.mx/producto/569167/peluche-teddy-sobre-rojo" }
    ],
    tecnologia: [
      { id: 709913, nombre: "Samsung Galaxy Watch 8 40mm", precio: "Ver en Sanborns", precioOriginal: "", img: "./images/producto-709913.jpeg", descuento: "Regalos", url: "https://www.sanborns.com.mx/producto/709913/samsung-galaxy-watch-8-40mm" },
      { id: 675581, nombre: "Huawei Watch Fit 4 Pro", precio: "Ver en Sanborns", precioOriginal: "", img: "./images/producto-675581.jpeg", descuento: "San Valentín", url: "https://www.sanborns.com.mx/producto/675581/huawei-watch-fit-4-pro" },
      { id: 613747, nombre: "Smartband Huawei Band 10", precio: "Ver en Sanborns", precioOriginal: "", img: "./images/producto-613747.jpeg", descuento: "Ofertas", url: "https://www.sanborns.com.mx/producto/613747/smartband-huawei-band-10" }
    ],
    cuidado: [
      { id: 21, nombre: "Kit Afeitado Premium", precio: "$799", precioOriginal: "$1,099", img: "./images/placeholder.svg", descuento: "27% OFF", url: "https://www.sanborns.com.mx/producto/117488" },
      { id: 22, nombre: "Set Grooming", precio: "$1,499", precioOriginal: "$1,999", img: "./images/placeholder.svg", descuento: "25% OFF", url: "https://www.sanborns.com.mx/producto/469399" },
      { id: 23, nombre: "Recortadora Profesional", precio: "$1,299", precioOriginal: "$1,799", img: "./images/placeholder.svg", descuento: "28% OFF", url: "https://www.sanborns.com.mx/producto/492378" },
      { id: 24, nombre: "Kit Barbería", precio: "$999", precioOriginal: "$1,499", img: "./images/placeholder.svg", descuento: "33% OFF", url: "https://www.sanborns.com.mx/producto/617456" },
      { id: 25, nombre: "Set Cuidado Facial Hombre", precio: "$899", precioOriginal: "$1,299", img: "./images/placeholder.svg", descuento: "31% OFF", url: "https://www.sanborns.com.mx/producto/408718" }
    ],
    perfumeria: [
      { id: 193432, nombre: "Perfume Paco Rabanne Phantom EDT 50ml", precio: "Ver en Sanborns", precioOriginal: "", img: "./images/producto-193432.jpg", descuento: "Perfumes Hombre", url: "https://www.sanborns.com.mx/producto/193432/perfume-para-hombre-paco-rabanne-phantom-edt-50ml" },
      { id: 20780, nombre: "Fragancia 1 Million Paco Rabanne 100 ml", precio: "Ver en Sanborns", precioOriginal: "", img: "./images/producto-20780.jpg", descuento: "Perfumes Hombre", url: "https://www.sanborns.com.mx/producto/20780/fragancia-para-caballero-1-million-paco-rabanne-100-ml" },
      { id: 305145, nombre: "Paco Rabanne Invictus Victory Elixir EDP 100ml", precio: "Ver en Sanborns", precioOriginal: "", img: "./images/producto-305145.jpg", descuento: "Perfumes Hombre", url: "https://www.sanborns.com.mx/producto/305145/fragancia-para-caballero-paco-rabanne-invictus-victory-elixir-eau-de-parfum-100ml" }
    ],
    relojes: [
      { id: 16, nombre: "Reloj Elegante", precio: "$3,299", precioOriginal: "$4,499", img: "./images/producto-709913.jpeg", descuento: "27% OFF", url: "https://www.sanborns.com.mx/producto/379802" },
      { id: 17, nombre: "Reloj Deportivo", precio: "$2,499", precioOriginal: "$3,299", img: "./images/producto-675581.jpeg", descuento: "24% OFF", url: "https://www.sanborns.com.mx/producto/604930" },
      { id: 18, nombre: "Reloj Casual", precio: "$1,999", precioOriginal: "$2,699", img: "./images/producto-613747.jpeg", descuento: "26% OFF", url: "https://www.sanborns.com.mx/producto/540572" },
      { id: 19, nombre: "Smartwatch", precio: "$4,999", precioOriginal: "$6,499", img: "./images/producto-709913.jpeg", descuento: "23% OFF", url: "https://www.sanborns.com.mx/producto/542018" },
      { id: 20, nombre: "Reloj Cronógrafo", precio: "$3,799", precioOriginal: "$4,999", img: "./images/producto-675581.jpeg", descuento: "24% OFF", url: "https://www.sanborns.com.mx/producto/557865" }
    ],
    gaming: [
      { id: 80, nombre: "Videojuegos", precio: "Ofertas", precioOriginal: "", img: "./images/placeholder.svg", descuento: "San Valentín", url: "https://www.sanborns.com.mx/c/videojuegos/" },
      { id: 81, nombre: "Consolas y Controles", precio: "Variedad", precioOriginal: "", img: "./images/placeholder.svg", descuento: "Regalos", url: "https://www.sanborns.com.mx/c/videojuegos/" },
      { id: 82, nombre: "Gaming Gear", precio: "Desde $1,199", precioOriginal: "", img: "./images/placeholder.svg", descuento: "26% OFF", url: "https://www.sanborns.com.mx/c/videojuegos/" }
    ],
    libros: [
      { id: 83, nombre: "Bestsellers", precio: "$399", precioOriginal: "$599", img: "./images/placeholder.svg", descuento: "33% OFF", url: "https://www.sanborns.com.mx/c/libros/" },
      { id: 84, nombre: "Libros de Negocios", precio: "$499", precioOriginal: "$799", img: "./images/placeholder.svg", descuento: "38% OFF", url: "https://www.sanborns.com.mx/c/libros/" },
      { id: 85, nombre: "Ciencia Ficción y Más", precio: "$699", precioOriginal: "$999", img: "./images/placeholder.svg", descuento: "30% OFF", url: "https://www.sanborns.com.mx/c/libros/" }
    ],
    deportes: [
      { id: 86, nombre: "Deportes", precio: "Desde $1,199", precioOriginal: "", img: "./images/placeholder.svg", descuento: "Ofertas", url: "https://www.sanborns.com.mx/c/deportes/" },
      { id: 87, nombre: "Fitness y Running", precio: "Variedad", precioOriginal: "", img: "./images/placeholder.svg", descuento: "San Valentín", url: "https://www.sanborns.com.mx/c/deportes/" },
      { id: 88, nombre: "Accesorios Deportivos", precio: "Regalos", precioOriginal: "", img: "./images/placeholder.svg", descuento: "25% OFF", url: "https://www.sanborns.com.mx/c/deportes/" }
    ]
  }
};

window.productosDatabase = productosDatabase;

function buildProductUrl(product) {
  if (!product || !product.url) return 'https://www.sanborns.com.mx';
  const baseUrl = product.url;
  const params = new URLSearchParams({
    utm_source: 'dv360',
    utm_medium: 'display',
    utm_campaign: 'sanborns_san_valentin_2025',
    utm_content: 'producto_' + (product.id || ''),
    utm_term: 'gift_finder'
  });
  const separator = baseUrl.indexOf('?') !== -1 ? '&' : '?';
  return baseUrl + separator + params.toString();
}
window.buildProductUrl = buildProductUrl;

function validarURLsProductos() {
  const errores = [];
  const warnings = [];
  const products = window.productosDatabase || productosDatabase;
  Object.keys(products).forEach(function (gender) {
    Object.keys(products[gender]).forEach(function (category) {
      (products[gender][category] || []).forEach(function (product) {
        const url = product.url;
        if (!url.startsWith('https://')) {
          errores.push({ id: product.id, nombre: product.nombre, error: 'URL debe comenzar con https://', url: url });
        }
        if (!url.includes('sanborns.com.mx')) {
          errores.push({ id: product.id, nombre: product.nombre, error: 'URL no apunta a sanborns.com.mx', url: url });
        }
      });
    });
  });
  return { errores: errores, warnings: warnings };
}
window.validarURLsProductos = validarURLsProductos;

if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', function () {
    validarURLsProductos();
  });
}
