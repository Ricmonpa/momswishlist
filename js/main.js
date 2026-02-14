/**
 * Productos Gift Finder San Valent?n - Sanborns
 * Mapeo EXACTO por categor?a. Solo im?genes locales (producto-ID) o placeholder.
 * v9 URGENT-FIX - Categor?as corregidas: Celulares=celulares, Fotograf?a=c?maras, Gadgets=wearables, Regalos=productos reales.
 */
const productosDatabase = {
  mujer: {
maquillaje: [
  { id: 614484, nombre: "Set Yuya Gel de ceja + polvo + tinta", precio: "$899", precioOriginal: "$1,299", img: "assets/producto-614484.jpg", descuento: "30% OFF", url: "https://www.sanborns.com.mx/producto/614484" },
  { id: 614483, nombre: "Set Yuya Gel + polvo trasl?cido + tinta", precio: "$799", precioOriginal: "$1,199", img: "assets/producto-614483.jpg", descuento: "33% OFF", url: "https://www.sanborns.com.mx/producto/614483" },
  { id: 574428, nombre: "Cosm?tico Sanborns (ID 574428)", precio: "$1,199", precioOriginal: "$1,699", img: "assets/producto-574428.jpg", descuento: "29% OFF", url: "https://www.sanborns.com.mx/producto/574428" }
],
cuidado: [
  { id: 515019, nombre: "Eucerin Epigenetic Serum 30ml", precio: "$1,299", precioOriginal: "$1,799", img: "assets/producto-515019.jpg", descuento: "28% OFF", url: "https://www.sanborns.com.mx/producto/515019" },
  { id: 59701, nombre: "Anti-Pigment Dual Serum Eucerin", precio: "$999", precioOriginal: "$1,499", img: "assets/producto-59701.jpg", descuento: "33% OFF", url: "https://www.sanborns.com.mx/producto/59701" },
  { id: 437851, nombre: "Avene Agua Termal Piel Sensible 300ml", precio: "$799", precioOriginal: "$1,199", img: "assets/producto-437851.jpg", descuento: "33% OFF", url: "https://www.sanborns.com.mx/producto/437851" }
],
estilismo: [
  { id: 209620, nombre: "Wafflera Perfect Heat Revlon", precio: "Ver en Sanborns", precioOriginal: "", img: "assets/producto-209620.jpg", descuento: "Estilismo", url: "https://www.sanborns.com.mx/producto/209620/wafflera-perfect-heat-revlon" },
  { id: 118091, nombre: "Cepillo Secador y Voluminizador One Step Revlon", precio: "Ver en Sanborns", precioOriginal: "", img: "assets/producto-118091.jpg", descuento: "Estilismo", url: "https://www.sanborns.com.mx/producto/118091/cepillo-secador-y-voluminizador-one-step-revlon" },
  { id: 16117, nombre: "Secadora Timco ST-1875 Avo Confort con Lunares", precio: "Ver en Sanborns", precioOriginal: "", img: "assets/producto-16117.jpg", descuento: "Estilismo", url: "https://www.sanborns.com.mx/producto/16117/secadora-timco-st-1875-avo-confort-con-lunares" }
],
bolsas: [
  { id: 26, nombre: "Bolsas de Mano", precio: "Desde $999", precioOriginal: "", img: "assets/placeholder.svg", descuento: "Ofertas", url: "https://www.sanborns.com.mx/c/bolsas/" },
  { id: 27, nombre: "Bolsas Fashion", precio: "Variedad", precioOriginal: "", img: "assets/placeholder.svg", descuento: "San Valent?n", url: "https://www.sanborns.com.mx/c/bolsas/" },
  { id: 28, nombre: "Clutch y Carteras", precio: "Ofertas", precioOriginal: "", img: "assets/placeholder.svg", descuento: "Regalos", url: "https://www.sanborns.com.mx/c/bolsas/" }
],
joyeria: [
  { id: 29, nombre: "Joyer?a y Aretes", precio: "Desde $599", precioOriginal: "", img: "assets/placeholder.svg", descuento: "Ofertas", url: "https://www.sanborns.com.mx/c/joyeria/" },
  { id: 30, nombre: "Collares y Pulseras", precio: "Variedad", precioOriginal: "", img: "assets/placeholder.svg", descuento: "San Valent?n", url: "https://www.sanborns.com.mx/c/joyeria/" },
  { id: 31, nombre: "Accesorios Elegantes", precio: "Regalos", precioOriginal: "", img: "assets/placeholder.svg", descuento: "25% OFF", url: "https://www.sanborns.com.mx/c/joyeria/" }
],
perfumeria: [
  { id: 608266, nombre: "Rabanne Fame Couture Edition EDP 80ml", precio: "$2,499", precioOriginal: "$3,299", img: "assets/producto-608266.jpg", descuento: "25% OFF", url: "https://www.sanborns.com.mx/producto/608266" },
  { id: 813851, nombre: "Versace Dylan Blush Pink EDP 100ml", precio: "$2,199", precioOriginal: "$2,999", img: "assets/producto-813851.jpg", descuento: "27% OFF", url: "https://www.sanborns.com.mx/producto/813851" },
  { id: 303224, nombre: "Moschino Toy 2 Bubblegum EDT 100ml", precio: "$1,999", precioOriginal: "$2,699", img: "assets/producto-303224.jpg", descuento: "26% OFF", url: "https://www.sanborns.com.mx/producto/303224" }
],
libros: [
  { id: 32, nombre: "Best Sellers Rom?nticos", precio: "$399", precioOriginal: "$599", img: "assets/placeholder.svg", descuento: "33% OFF", url: "https://www.sanborns.com.mx/c/libros/" },
  { id: 33, nombre: "Box Set Cl?sicos", precio: "$599", precioOriginal: "$899", img: "assets/placeholder.svg", descuento: "33% OFF", url: "https://www.sanborns.com.mx/c/libros/" },
  { id: 34, nombre: "Libros y Regalos", precio: "$299", precioOriginal: "$499", img: "assets/placeholder.svg", descuento: "40% OFF", url: "https://www.sanborns.com.mx/c/libros/" }
],
celulares: [
  { id: 204859, nombre: "iPhone 13 128GB Azul Marino Telcel", precio: "Ver en Sanborns", precioOriginal: "", img: "assets/producto-204859.jpeg", descuento: "Destacados", url: "https://www.sanborns.com.mx/producto/204859/iphone-13-128gb-azul-marino-telcel-r9" },
  { id: 288937, nombre: "iPhone 14 128GB Blanco Telcel", precio: "Ver en Sanborns", precioOriginal: "", img: "assets/producto-288937.jpeg", descuento: "Tecnolog?a", url: "https://www.sanborns.com.mx/producto/288937/iphone-14-128gb-blanco-telcel-r9" },
  { id: 361481, nombre: "OPPO A79 5G 256GB Lila Telcel", precio: "Ver en Sanborns", precioOriginal: "", img: "assets/producto-361481.jpeg", descuento: "Ofertas", url: "https://www.sanborns.com.mx/producto/361481/oppo-a79-5g-256gb-lila-telcel-r9" },
  { id: 564958, nombre: "Honor X7c 256GB Verde Telcel", precio: "Ver en Sanborns", precioOriginal: "", img: "assets/producto-564958.jpeg", descuento: "Regalos", url: "https://www.sanborns.com.mx/producto/564958/honor-x7c-256gb-verde-telcel-r9-earbuds" },
  { id: 655190, nombre: "Samsung Galaxy A16 5G 128GB Verde", precio: "Ver en Sanborns", precioOriginal: "", img: "assets/producto-655190.jpeg", descuento: "Destacados", url: "https://www.sanborns.com.mx/producto/655190/celular-samsung-galaxy-a16-5g-128gb-verde-telcel-r3" }
],
gadgets: [
  { id: 709913, nombre: "Samsung Galaxy Watch 8 40mm", precio: "Ver en Sanborns", precioOriginal: "", img: "assets/producto-709913.jpeg", descuento: "Regalos", url: "https://www.sanborns.com.mx/producto/709913/samsung-galaxy-watch-8-40mm" },
  { id: 675581, nombre: "Huawei Watch Fit 4 Pro", precio: "Ver en Sanborns", precioOriginal: "", img: "assets/producto-675581.jpeg", descuento: "San Valent?n", url: "https://www.sanborns.com.mx/producto/675581/huawei-watch-fit-4-pro" },
  { id: 613747, nombre: "Smartband Huawei Band 10", precio: "Ver en Sanborns", precioOriginal: "", img: "assets/producto-613747.jpeg", descuento: "Ofertas", url: "https://www.sanborns.com.mx/producto/613747/smartband-huawei-band-10" }
],
fotografia: [
  { id: 775767, nombre: "Kit C?mara Fuji Instax Mini 12", precio: "Ver en Sanborns", precioOriginal: "", img: "assets/producto-775767.jpeg", descuento: "Variedad", url: "https://www.sanborns.com.mx/producto/775767/kit-camara-fuji-instax-mini-12" },
  { id: 333596, nombre: "C?mara Fujifilm Instax Mini 12 Rosa", precio: "Ver en Sanborns", precioOriginal: "", img: "assets/producto-333596.jpeg", descuento: "Destacados", url: "https://www.sanborns.com.mx/producto/333596/camara-fujifilm-instax-mini-12-rosa" },
  { id: 825511, nombre: "C?mara Fuji Instax Mini Evo Rosa", precio: "Ver en Sanborns", precioOriginal: "", img: "assets/producto-825511.jpeg", descuento: "Ofertas", url: "https://www.sanborns.com.mx/producto/825511/camara-fuji-instax-mini-evo-rosa" },
  { id: 292521, nombre: "Portarretrato Digital Voltak 7\" Gris", precio: "Ver en Sanborns", precioOriginal: "", img: "assets/producto-292521.jpeg", descuento: "San Valent?n", url: "https://www.sanborns.com.mx/producto/292521/portarretrato-digital-voltak-7-pulgadas-gris" }
],
regalos: [
  { id: 828730, nombre: "LEGO Botanicals Margaritas", precio: "Ver en Sanborns", precioOriginal: "", img: "assets/producto-828730.jpeg", descuento: "Destacados", url: "https://www.sanborns.com.mx/producto/828730/lego-botanicals-margaritas-decoracion-floral" },
  { id: 828716, nombre: "LEGO Botanicals Lirio de la Paz", precio: "Ver en Sanborns", precioOriginal: "", img: "assets/producto-828716.jpeg", descuento: "San Valent?n", url: "https://www.sanborns.com.mx/producto/828716/lego-botanicals-lirio-de-la-paz-decoracion-floral" },
  { id: 828721, nombre: "LEGO Botanicals Ramo de Tulipanes", precio: "Ver en Sanborns", precioOriginal: "", img: "assets/producto-828721.jpeg", descuento: "Ofertas", url: "https://www.sanborns.com.mx/producto/828721/lego-botanicals-ramo-de-tulipanes-decoracion" },
  { id: 569166, nombre: "Peluche Teddy Rosa Roja", precio: "Ver en Sanborns", precioOriginal: "", img: "assets/producto-569166.jpeg", descuento: "San Valent?n", url: "https://www.sanborns.com.mx/producto/569166/peluche-teddy-rosa-roja" },
  { id: 569167, nombre: "Peluche Teddy Sobre Rojo", precio: "Ver en Sanborns", precioOriginal: "", img: "assets/producto-569167.jpeg", descuento: "Destacados", url: "https://www.sanborns.com.mx/producto/569167/peluche-teddy-sobre-rojo" },
  { id: 828731, nombre: "LEGO Botanicals Cactus en Flor", precio: "Ver en Sanborns", precioOriginal: "", img: "assets/producto-828731.jpg", descuento: "Regalos", url: "https://www.sanborns.com.mx/producto/828731/lego-botanicals-cactus-en-flor-decoracion" }
],
tecnologia: [
  { id: 35, nombre: "Aud?fonos Soundcore Aero Fit Pro", precio: "Ofertas", precioOriginal: "", img: "assets/producto-565250.jpeg", descuento: "Destacados", url: "https://www.sanborns.com.mx/producto/565250/audifonos-soundcore-aero-fit-pro" },
  { id: 36, nombre: "Aud?fonos Soundcore Space One Azul", precio: "Variedad", precioOriginal: "", img: "assets/producto-482420.jpeg", descuento: "Regalos", url: "https://www.sanborns.com.mx/producto/482420/audifonos-soundcore-space-one-azul" },
  { id: 37, nombre: "Aud?fonos Sony WH-CH520 Bluetooth", precio: "Desde $499", precioOriginal: "", img: "assets/producto-324151.jpeg", descuento: "Ofertas", url: "https://www.sanborns.com.mx/producto/324151/audifonos-sony-wh-ch520-bluetooth-beige" },
  { id: 38, nombre: "Aud?fonos STF Aurum On-Ear Negro", precio: "Ofertas", precioOriginal: "", img: "assets/producto-229402.jpeg", descuento: "San Valent?n", url: "https://www.sanborns.com.mx/producto/229402/audifonos-stf-aurum-on-ear-negro" }
],
hogar: [
  { id: 43, nombre: "LEGO Botanicals Margaritas", precio: "Ofertas", precioOriginal: "", img: "assets/producto-828730.jpeg", descuento: "Destacados", url: "https://www.sanborns.com.mx/producto/828730/lego-botanicals-margaritas-decoracion-floral" },
  { id: 44, nombre: "LEGO Botanicals Lirio de la Paz", precio: "Regalos", precioOriginal: "", img: "assets/producto-828716.jpeg", descuento: "San Valent?n", url: "https://www.sanborns.com.mx/producto/828716/lego-botanicals-lirio-de-la-paz-decoracion-floral" },
  { id: 45, nombre: "LEGO Botanicals Ramo de Tulipanes", precio: "Variedad", precioOriginal: "", img: "assets/producto-828721.jpeg", descuento: "Ofertas", url: "https://www.sanborns.com.mx/producto/828721/lego-botanicals-ramo-de-tulipanes-decoracion" },
  { id: 46, nombre: "LEGO Botanicals Cactus en Flor", precio: "Desde $699", precioOriginal: "", img: "assets/producto-828731.jpg", descuento: "Regalos", url: "https://www.sanborns.com.mx/producto/828731/lego-botanicals-cactus-en-flor-decoracion" },
  { id: 47, nombre: "Peluche Teddy Rosa Roja", precio: "Ofertas", precioOriginal: "", img: "assets/producto-569166.jpeg", descuento: "San Valent?n", url: "https://www.sanborns.com.mx/producto/569166/peluche-teddy-rosa-roja" },
  { id: 48, nombre: "Peluche Teddy Sobre Rojo", precio: "Variedad", precioOriginal: "", img: "assets/producto-569167.jpeg", descuento: "Destacados", url: "https://www.sanborns.com.mx/producto/569167/peluche-teddy-sobre-rojo" }
]
  },
  hombre: {
accesorios: [
  { id: 59, nombre: "Accesorios Hombre", precio: "Desde $699", precioOriginal: "", img: "assets/placeholder.svg", descuento: "Ofertas", url: "https://www.sanborns.com.mx/c/accesorios-hombre/" },
  { id: 60, nombre: "Carteras y Cinturones", precio: "Variedad", precioOriginal: "", img: "assets/placeholder.svg", descuento: "San Valent?n", url: "https://www.sanborns.com.mx/c/accesorios-hombre/" },
  { id: 61, nombre: "Mancuernillas y M?s", precio: "Regalos", precioOriginal: "", img: "assets/placeholder.svg", descuento: "25% OFF", url: "https://www.sanborns.com.mx/c/accesorios-hombre/" }
],
moda: [
  { id: 62, nombre: "Ropa Hombre", precio: "Ofertas", precioOriginal: "", img: "assets/placeholder.svg", descuento: "San Valent?n", url: "https://www.sanborns.com.mx/c/ropa-hombre/" },
  { id: 63, nombre: "Camisas y Polos", precio: "Variedad", precioOriginal: "", img: "assets/placeholder.svg", descuento: "Regalos", url: "https://www.sanborns.com.mx/c/ropa-hombre/" },
  { id: 64, nombre: "Moda Casual", precio: "Desde $899", precioOriginal: "", img: "assets/placeholder.svg", descuento: "30% OFF", url: "https://www.sanborns.com.mx/c/ropa-hombre/" }
],
celulares: [
  { id: 204859, nombre: "iPhone 13 128GB Azul Marino Telcel", precio: "Ver en Sanborns", precioOriginal: "", img: "assets/producto-204859.jpeg", descuento: "Destacados", url: "https://www.sanborns.com.mx/producto/204859/iphone-13-128gb-azul-marino-telcel-r9" },
  { id: 288937, nombre: "iPhone 14 128GB Blanco Telcel", precio: "Ver en Sanborns", precioOriginal: "", img: "assets/producto-288937.jpeg", descuento: "Tecnolog?a", url: "https://www.sanborns.com.mx/producto/288937/iphone-14-128gb-blanco-telcel-r9" },
  { id: 361481, nombre: "OPPO A79 5G 256GB Lila Telcel", precio: "Ver en Sanborns", precioOriginal: "", img: "assets/producto-361481.jpeg", descuento: "Ofertas", url: "https://www.sanborns.com.mx/producto/361481/oppo-a79-5g-256gb-lila-telcel-r9" },
  { id: 564958, nombre: "Honor X7c 256GB Verde Telcel", precio: "Ver en Sanborns", precioOriginal: "", img: "assets/producto-564958.jpeg", descuento: "Regalos", url: "https://www.sanborns.com.mx/producto/564958/honor-x7c-256gb-verde-telcel-r9-earbuds" },
  { id: 655190, nombre: "Samsung Galaxy A16 5G 128GB Verde", precio: "Ver en Sanborns", precioOriginal: "", img: "assets/producto-655190.jpeg", descuento: "Destacados", url: "https://www.sanborns.com.mx/producto/655190/celular-samsung-galaxy-a16-5g-128gb-verde-telcel-r3" }
],
tablets: [
  { id: 714971, nombre: "Tablet Samsung Galaxy S10 Lite 128GB", precio: "Ver en Sanborns", precioOriginal: "", img: "assets/producto-714971.jpeg", descuento: "Destacados", url: "https://www.sanborns.com.mx/producto/714971/tablet-samsung-galaxy-s10-lite-128gb-coral-red" },
  { id: 804962, nombre: "MatePad 11.5 Gris 8/128GB", precio: "Ver en Sanborns", precioOriginal: "", img: "assets/producto-804962.jpeg", descuento: "Regalos", url: "https://www.sanborns.com.mx/producto/804962/matepad-11-5-gris-8-128g-120hz-2-5k" },
  { id: 522756, nombre: "Tablet Samsung Galaxy Tab S10 Ultra", precio: "Ver en Sanborns", precioOriginal: "", img: "assets/producto-522756.jpeg", descuento: "San Valent?n", url: "https://www.sanborns.com.mx/producto/522756/tablet-samsung-galaxy-tab-s10-ultra-12gb-256gb-moonstone-gray-spen" }
],
audio: [
  { id: 565250, nombre: "Aud?fonos Soundcore Aero Fit Pro", precio: "Ver en Sanborns", precioOriginal: "", img: "assets/producto-565250.jpeg", descuento: "Destacados", url: "https://www.sanborns.com.mx/producto/565250/audifonos-soundcore-aero-fit-pro" },
  { id: 482420, nombre: "Aud?fonos Soundcore Space One Azul", precio: "Ver en Sanborns", precioOriginal: "", img: "assets/producto-482420.jpeg", descuento: "Regalos", url: "https://www.sanborns.com.mx/producto/482420/audifonos-soundcore-space-one-azul" },
  { id: 324151, nombre: "Aud?fonos Sony WH-CH520 Bluetooth", precio: "Ver en Sanborns", precioOriginal: "", img: "assets/producto-324151.jpeg", descuento: "San Valent?n", url: "https://www.sanborns.com.mx/producto/324151/audifonos-sony-wh-ch520-bluetooth-beige" },
  { id: 229402, nombre: "Aud?fonos STF Aurum On-Ear Negro", precio: "Ver en Sanborns", precioOriginal: "", img: "assets/producto-229402.jpeg", descuento: "Ofertas", url: "https://www.sanborns.com.mx/producto/229402/audifonos-stf-aurum-on-ear-negro" }
],
fotografia: [
  { id: 775767, nombre: "Kit C?mara Fuji Instax Mini 12", precio: "Ver en Sanborns", precioOriginal: "", img: "assets/producto-775767.jpeg", descuento: "Variedad", url: "https://www.sanborns.com.mx/producto/775767/kit-camara-fuji-instax-mini-12" },
  { id: 333596, nombre: "C?mara Fujifilm Instax Mini 12 Rosa", precio: "Ver en Sanborns", precioOriginal: "", img: "assets/producto-333596.jpeg", descuento: "Destacados", url: "https://www.sanborns.com.mx/producto/333596/camara-fujifilm-instax-mini-12-rosa" },
  { id: 825511, nombre: "C?mara Fuji Instax Mini Evo Rosa", precio: "Ver en Sanborns", precioOriginal: "", img: "assets/producto-825511.jpeg", descuento: "Ofertas", url: "https://www.sanborns.com.mx/producto/825511/camara-fuji-instax-mini-evo-rosa" },
  { id: 292521, nombre: "Portarretrato Digital Voltak 7\" Gris", precio: "Ver en Sanborns", precioOriginal: "", img: "assets/producto-292521.jpeg", descuento: "San Valent?n", url: "https://www.sanborns.com.mx/producto/292521/portarretrato-digital-voltak-7-pulgadas-gris" }
],
regalos: [
  { id: 828730, nombre: "LEGO Botanicals Margaritas", precio: "Ver en Sanborns", precioOriginal: "", img: "assets/producto-828730.jpeg", descuento: "Destacados", url: "https://www.sanborns.com.mx/producto/828730/lego-botanicals-margaritas-decoracion-floral" },
  { id: 828716, nombre: "LEGO Botanicals Lirio de la Paz", precio: "Ver en Sanborns", precioOriginal: "", img: "assets/producto-828716.jpeg", descuento: "San Valent?n", url: "https://www.sanborns.com.mx/producto/828716/lego-botanicals-lirio-de-la-paz-decoracion-floral" },
  { id: 569166, nombre: "Peluche Teddy Rosa Roja", precio: "Ver en Sanborns", precioOriginal: "", img: "assets/producto-569166.jpeg", descuento: "San Valent?n", url: "https://www.sanborns.com.mx/producto/569166/peluche-teddy-rosa-roja" },
  { id: 569167, nombre: "Peluche Teddy Sobre Rojo", precio: "Ver en Sanborns", precioOriginal: "", img: "assets/producto-569167.jpeg", descuento: "Destacados", url: "https://www.sanborns.com.mx/producto/569167/peluche-teddy-sobre-rojo" }
],
tecnologia: [
  { id: 709913, nombre: "Samsung Galaxy Watch 8 40mm", precio: "Ver en Sanborns", precioOriginal: "", img: "assets/producto-709913.jpeg", descuento: "Regalos", url: "https://www.sanborns.com.mx/producto/709913/samsung-galaxy-watch-8-40mm" },
  { id: 675581, nombre: "Huawei Watch Fit 4 Pro", precio: "Ver en Sanborns", precioOriginal: "", img: "assets/producto-675581.jpeg", descuento: "San Valent?n", url: "https://www.sanborns.com.mx/producto/675581/huawei-watch-fit-4-pro" },
  { id: 613747, nombre: "Smartband Huawei Band 10", precio: "Ver en Sanborns", precioOriginal: "", img: "assets/producto-613747.jpeg", descuento: "Ofertas", url: "https://www.sanborns.com.mx/producto/613747/smartband-huawei-band-10" }
],
cuidado: [
  { id: 21, nombre: "Kit Afeitado Premium", precio: "$799", precioOriginal: "$1,099", img: "assets/placeholder.svg", descuento: "27% OFF", url: "https://www.sanborns.com.mx/producto/117488" },
  { id: 22, nombre: "Set Grooming", precio: "$1,499", precioOriginal: "$1,999", img: "assets/placeholder.svg", descuento: "25% OFF", url: "https://www.sanborns.com.mx/producto/469399" },
  { id: 23, nombre: "Recortadora Profesional", precio: "$1,299", precioOriginal: "$1,799", img: "assets/placeholder.svg", descuento: "28% OFF", url: "https://www.sanborns.com.mx/producto/492378" },
  { id: 24, nombre: "Kit Barber?a", precio: "$999", precioOriginal: "$1,499", img: "assets/placeholder.svg", descuento: "33% OFF", url: "https://www.sanborns.com.mx/producto/617456" },
  { id: 25, nombre: "Set Cuidado Facial Hombre", precio: "$899", precioOriginal: "$1,299", img: "assets/placeholder.svg", descuento: "31% OFF", url: "https://www.sanborns.com.mx/producto/408718" }
],
perfumeria: [
  { id: 193432, nombre: "Perfume Paco Rabanne Phantom EDT 50ml", precio: "Ver en Sanborns", precioOriginal: "", img: "assets/producto-193432.jpg", descuento: "Perfumes Hombre", url: "https://www.sanborns.com.mx/producto/193432/perfume-para-hombre-paco-rabanne-phantom-edt-50ml" },
  { id: 20780, nombre: "Fragancia 1 Million Paco Rabanne 100 ml", precio: "Ver en Sanborns", precioOriginal: "", img: "assets/producto-20780.jpg", descuento: "Perfumes Hombre", url: "https://www.sanborns.com.mx/producto/20780/fragancia-para-caballero-1-million-paco-rabanne-100-ml" },
  { id: 305145, nombre: "Paco Rabanne Invictus Victory Elixir EDP 100ml", precio: "Ver en Sanborns", precioOriginal: "", img: "assets/producto-305145.jpg", descuento: "Perfumes Hombre", url: "https://www.sanborns.com.mx/producto/305145/fragancia-para-caballero-paco-rabanne-invictus-victory-elixir-eau-de-parfum-100ml" }
],
relojes: [
  { id: 16, nombre: "Reloj Elegante", precio: "$3,299", precioOriginal: "$4,499", img: "assets/producto-709913.jpeg", descuento: "27% OFF", url: "https://www.sanborns.com.mx/producto/379802" },
  { id: 17, nombre: "Reloj Deportivo", precio: "$2,499", precioOriginal: "$3,299", img: "assets/producto-675581.jpeg", descuento: "24% OFF", url: "https://www.sanborns.com.mx/producto/604930" },
  { id: 18, nombre: "Reloj Casual", precio: "$1,999", precioOriginal: "$2,699", img: "assets/producto-613747.jpeg", descuento: "26% OFF", url: "https://www.sanborns.com.mx/producto/540572" },
  { id: 19, nombre: "Smartwatch", precio: "$4,999", precioOriginal: "$6,499", img: "assets/producto-709913.jpeg", descuento: "23% OFF", url: "https://www.sanborns.com.mx/producto/542018" },
  { id: 20, nombre: "Reloj Cron?grafo", precio: "$3,799", precioOriginal: "$4,999", img: "assets/producto-675581.jpeg", descuento: "24% OFF", url: "https://www.sanborns.com.mx/producto/557865" }
],
gaming: [
  { id: 80, nombre: "Videojuegos", precio: "Ofertas", precioOriginal: "", img: "assets/placeholder.svg", descuento: "San Valent?n", url: "https://www.sanborns.com.mx/c/videojuegos/" },
  { id: 81, nombre: "Consolas y Controles", precio: "Variedad", precioOriginal: "", img: "assets/placeholder.svg", descuento: "Regalos", url: "https://www.sanborns.com.mx/c/videojuegos/" },
  { id: 82, nombre: "Gaming Gear", precio: "Desde $1,199", precioOriginal: "", img: "assets/placeholder.svg", descuento: "26% OFF", url: "https://www.sanborns.com.mx/c/videojuegos/" }
],
libros: [
  { id: 83, nombre: "Bestsellers", precio: "$399", precioOriginal: "$599", img: "assets/placeholder.svg", descuento: "33% OFF", url: "https://www.sanborns.com.mx/c/libros/" },
  { id: 84, nombre: "Libros de Negocios", precio: "$499", precioOriginal: "$799", img: "assets/placeholder.svg", descuento: "38% OFF", url: "https://www.sanborns.com.mx/c/libros/" },
  { id: 85, nombre: "Ciencia Ficci?n y M?s", precio: "$699", precioOriginal: "$999", img: "assets/placeholder.svg", descuento: "30% OFF", url: "https://www.sanborns.com.mx/c/libros/" }
],
deportes: [
  { id: 86, nombre: "Deportes", precio: "Desde $1,199", precioOriginal: "", img: "assets/placeholder.svg", descuento: "Ofertas", url: "https://www.sanborns.com.mx/c/deportes/" },
  { id: 87, nombre: "Fitness y Running", precio: "Variedad", precioOriginal: "", img: "assets/placeholder.svg", descuento: "San Valent?n", url: "https://www.sanborns.com.mx/c/deportes/" },
  { id: 88, nombre: "Accesorios Deportivos", precio: "Regalos", precioOriginal: "", img: "assets/placeholder.svg", descuento: "25% OFF", url: "https://www.sanborns.com.mx/c/deportes/" }
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

/**
 * Im?genes reales de productos Sanborns.
 * Generar con: node scripts/fetch-product-images.js
 * Si no se ha ejecutado, se usan las im?genes placeholder de products-data.js
 */
window.PRODUCT_IMAGES = {};

/**
 * Cat?logo de productos generado por scripts/parseProducts.js
 * Fuente: Big ticket + Moda CSVs. Im?genes: assets/producto-{ID}.webp (polite load DV360)
 * Regenerar con: node scripts/parseProducts.js
 */
window.PRODUCTS_CATALOG = [];

// ?134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134???
// TRACKING - DataLayer + Enabler (sin GA4/Meta - validador)
// ?134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134???
function trackEvent(eventName, eventData) {
var payload = Object.assign({ event: eventName, timestamp: new Date().toISOString() }, eventData || {});
if (typeof window.dataLayer !== 'undefined') {
    window.dataLayer.push(payload);
}
if (typeof Enabler !== 'undefined' && Enabler.counter) {
    Enabler.counter(eventName);
}
}

// MediaSmart DSP: clic en producto con click tracker
window.handleProductClick = function (el) {
var url = el.getAttribute('data-product-url');
var id = el.getAttribute('data-product-id');
var name = el.getAttribute('data-product-name') || '';
if (id != null) {
    trackEvent('product_clicked', {
        product_id: id,
        product_name: name,
        gender: appState.gender,
        category: appState.category
    });
}
if (url) {
    // %click_url_unesc% + URL producto = MediaSmart trackea clic y redirige al producto
    var tracker = window.clickTracker || '';
    window.open(tracker + url, '_blank');
}
};

// Gift Finder Logic
let appState = {
screen: 'inicio', // 'inicio' | 'categorias' | 'productos'
gender: null,
category: null,
wishlist: []
};

// Enviar wishlist por mailto - asignado a window INMEDIATAMENTE para que el bot?n funcione aunque falle c?digo posterior
function sendWishlistByMail() {
try {
    if (!appState.wishlist || appState.wishlist.length === 0) {
        alert('Por favor selecciona al menos un regalo.');
        return;
    }
    var toEmailEl = document.getElementById('emailPareja');
    var toEmail = (toEmailEl && toEmailEl.value) ? toEmailEl.value.trim() : '';
    if (!toEmail) {
        alert('Escribe el correo de destino.');
        return;
    }
    var items = appState.wishlist.map(function (p) {
        var url = (typeof buildProductUrl === 'function' ? buildProductUrl(p) : (p.url || window.landingPage)) || window.landingPage || (p.url || '');
        var name = (p.nombre || p.name || 'Producto ' + (p.id || '')) || 'Producto';
        var price = (p.precio || 'Ver en Sanborns') || '';
        return { name: name, url: url, price: price };
    });
    var count = items.length;
    var productos = items.map(function (p) { return p.name + ' - ' + p.price + '\n' + p.url; }).join('\n\n');
    var subject = encodeURIComponent('Mi Wishlist Sanborns');
    var body = encodeURIComponent(
        'Hola amor \u2764\uFE0F\n\nEstos son los regalos que me gustar\u00EDan para San Valent\u00EDn:\n\n' + productos + '\n\nCon amor,\nTu pareja\n\n---\nCreado con Sanborns Wishlist de San Valent\u00EDn'
    );
    window.location.href = 'mailto:' + toEmail + '?subject=' + subject + '&body=' + body;
    if (typeof trackEvent === 'function') trackEvent('wishlist_sent', { products_count: count, method: 'mailto' });
    var emailModal = document.getElementById('emailModal');
    if (emailModal) emailModal.classList.remove('active');
} catch (e) {
    alert('Error al preparar el correo.');
}
}
window.sendWishlistByMail = sendWishlistByMail;

// Delegaci?n click + touchend para que el bot?n Enviar funcione en cel
function handleEnviarWishlist(e) {
var t = e.target;
var modal = document.getElementById('emailModal');
var insideModal = modal && (t === modal || modal.contains(t));
var isBtn = t.id === 'btnEnviar';
if (!isBtn && t.nodeType === 1) {
    var p = t.parentNode;
    while (p && p !== document.body) {
        if (p.id === 'btnEnviar') { isBtn = true; break; }
        p = p.parentNode;
    }
}
if (isBtn) {
    e.preventDefault();
    e.stopPropagation();
    if (typeof window.sendWishlistByMail === 'function') {
        window.sendWishlistByMail();
    }
}
}
if (typeof document !== 'undefined') {
document.addEventListener('click', handleEnviarWishlist, true);
document.addEventListener('touchend', handleEnviarWishlist, true);
}

// ?134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134???
// DCO-lite: Pantalla 2 ?134??134?? 8 categor?as por g?nero (product.category + product.gender)
// matchCategories: al elegir esta categor?a en Pantalla 3 se filtran productos con category en este array
// Mujer "Celulares" ?134??134?? Celulares + Tablets; "Gadgets" ?134??134?? Gadgets + Relojes
// ?134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134???
const CATEGORIES = {
mujer: [
    { id: 'celulares', name: 'Celulares', icon: '\u{1F4F1}', matchCategories: ['Celulares'] },
    { id: 'gadgets', name: 'Gadgets', icon: '\u231A', matchCategories: ['Gadgets', 'Relojes'] },
    { id: 'fotografia', name: 'Fotograf???a', icon: '\u{1F4F7}', matchCategories: ['Fotograf???a'] },
    { id: 'regalos', name: 'Regalos', icon: '\u{1F381}', matchCategories: ['Regalos'] },
    { id: 'maquillaje', name: 'Maquillaje', icon: '\u{1F484}', matchCategories: ['Maquillaje'] },
    { id: 'skincare', name: 'Skincare', icon: '\u{1F485}', matchCategories: ['Skincare'] },
    { id: 'perfumeria', name: 'Perfumer???a', icon: '\u{1F490}', matchCategories: ['Perfumer???a'] },
    { id: 'estilismo', name: 'Estilismo', icon: '\u2702\uFE0F', matchCategories: ['Estilismo'] }
],
hombre: [
    { id: 'celulares', name: 'Celulares', icon: '\u{1F4F1}', matchCategories: ['Celulares'] },
    { id: 'tablets', name: 'Tablets', icon: '\u{1F4F1}', matchCategories: ['Tablets'] },
    { id: 'relojes', name: 'Relojes', icon: '\u231A', matchCategories: ['Relojes'] },
    { id: 'gadgets', name: 'Gadgets', icon: '\u231A', matchCategories: ['Gadgets'] },
    { id: 'audio', name: 'Audio', icon: '\u{1F3A7}', matchCategories: ['Audio'] },
    { id: 'fotografia', name: 'Fotograf???a', icon: '\u{1F4F7}', matchCategories: ['Fotograf???a'] },
    { id: 'perfumeria', name: 'Perfumer???a', icon: '\u{1F490}', matchCategories: ['Perfumer???a'] },
    { id: 'regalos', name: 'Regalos', icon: '\u{1F381}', matchCategories: ['Regalos'] }
]
};

// ?134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134???
// Fallback bulletproof: cuando PRODUCTS_CATALOG est? vac?o, mapear DCO ?134??134?? legacy (productosDatabase)
// Garantiza que ning?n bot?n devuelva undefined.
// ?134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134????134???
var LEGACY_FALLBACK_MAP = {
mujer: {
    maquillaje: 'maquillaje',
    skincare: 'cuidado',
    perfumeria: 'perfumeria',
    estilismo: 'estilismo',
    celulares: 'celulares',
    gadgets: 'gadgets',
    fotografia: 'fotografia',
    regalos: 'regalos'
},
hombre: {
    celulares: 'celulares',
    tablets: 'tablets',
    relojes: 'relojes',
    gadgets: 'tecnologia',
    audio: 'audio',
    fotografia: 'fotografia',
    perfumeria: 'perfumeria',
    regalos: 'regalos'
}
};

function getLegacyCategoryKey(gender, dcoCategoryId) {
var map = LEGACY_FALLBACK_MAP && LEGACY_FALLBACK_MAP[gender];
return (map && map[dcoCategoryId]) || dcoCategoryId;
}

function getProductsFallback(gender, dcoCategoryId) {
if (!window.productosDatabase || !window.productosDatabase[gender]) return [];
var legacyKey = getLegacyCategoryKey(gender, dcoCategoryId);
var list = window.productosDatabase[gender][legacyKey];
if (Array.isArray(list) && list.length > 0) return list;
var firstKey = Object.keys(window.productosDatabase[gender])[0];
return window.productosDatabase[gender][firstKey] || [];
}

function render() {
const container = document.getElementById('screen-container');
container.innerHTML = '';
container.className = 'fade-in';

if (appState.screen === 'inicio') {
    renderWelcome(container);
} else if (appState.screen === 'categorias') {
    renderCategories(container);
} else if (appState.screen === 'productos') {
    renderProducts(container);
}

updateWishlistCounter();
}

function renderWelcome(container) {
container.innerHTML = `
    <div class="welcome-screen">
        <div class="ai-character">
            <img src="assets/heart.svg" alt="Coraz?n Animado" class="animated-heart-img" onerror="this.src='assets/heart.svg'">
        </div>
        
        <div class="chat-bubble">
            <div class="chat-bubble-tail"></div>
            <h1 class="chat-title">?Qu? te gustar?a regalar este San Valent?n?</h1>
            <p class="chat-subtitle">Encuentra el regalo perfecto</p>
        </div>

        <div class="gender-selection">
            <button class="gender-btn" onclick="selectGender('mujer')">\u{1F469} Para una Mujer</button>
            <button class="gender-btn" onclick="selectGender('hombre')">\u{1F468} Para un Hombre</button>
        </div>
    </div>
`;
}

function renderCategories(container) {
const cats = CATEGORIES[appState.gender];
const title = appState.gender === 'mujer' ? 'Regalo para Mujer \u{1F469}' : 'Regalo para Hombre \u{1F468}';

container.innerHTML = `
    <button class="back-btn" onclick="goBack()">
        <span style="font-size: 18px; font-weight: bold;">\u2190</span>
        <span>Volver</span>
    </button>
    <h2 class="screen-title">${title}</h2>
    <p style="text-align: center; margin-bottom: 15px; font-size: 14px;">?Qu? le gustar?a?</p>
    <div class="category-grid">
        ${cats.map(cat => `
            <button class="category-btn" onclick="selectCategory('${cat.id}')">
                <div style="font-size: 24px; margin-bottom: 5px;">${cat.icon}</div>
                ${cat.name}
            </button>
        `).join('')}
    </div>
`;
}

function renderProducts(container) {
const gender = appState.gender;
const category = appState.category;
const catConfig = CATEGORIES[gender] && CATEGORIES[gender].find(function (c) { return c.id === category; });
const matchCategories = (catConfig && catConfig.matchCategories) ? catConfig.matchCategories : [];

var products = [];
var catalog = window.PRODUCTS_CATALOG;
if (Array.isArray(catalog) && catalog.length > 0 && matchCategories.length > 0) {
    products = catalog.filter(function (p) {
        return matchCategories.indexOf(p.category) !== -1 &&
            (p.gender === gender || p.gender === 'ambos');
    });
}
// Fallback SOLO cuando el cat?logo no devolvi? productos (nunca mezclar catalog + productosDatabase).
if (!Array.isArray(products) || products.length === 0) {
    products = getProductsFallback(gender, category);
}

if (!Array.isArray(products) || products.length === 0) {
    /* DCO: sin productos para esta combinaci?n g?nero/categor?a */
}
const catName = catConfig ? catConfig.name : category;

const isFromCatalog = Array.isArray(catalog) && catalog.length > 0 && products.length > 0 && products[0].hasOwnProperty('gender');

container.innerHTML = `
    <button class="back-btn" onclick="goBack()">
        <span style="font-size: 18px; font-weight: bold;">\u2190</span>
        <span>Volver</span>
    </button>
    <h2 class="screen-title" style="font-size: 16px;">${catName}</h2>
    <p style="text-align: center; margin-bottom: 10px; font-size: 12px;">\u2728 Encontramos ofertas para ti</p>
    <div class="products-scroll">
        ${products.map(function (p) {
            var pid = isFromCatalog ? String(p.id) : p.id;
            var isAdded = appState.wishlist.some(function (item) { return String(item.id) === String(pid); });
            var productUrl = typeof buildProductUrl === 'function' ? buildProductUrl(p) : (p.url || '#');
            var displayName = (isFromCatalog ? (p.name || 'Producto ' + p.id) : (p.nombre || '')) || '';
            /* Cat?logo: product.name viene del JSON generado (Moda = MODA_NAMES; Big Ticket = slug URL). */
            var imgSrc = isFromCatalog
                ? (p.imagePath && p.imagePath.indexOf('assets/') !== -1 ? p.imagePath : (p.img && p.img.startsWith('http') ? p.img : 'assets/placeholder.svg'))
                : ((p.img && String(p.img).trim()) ? p.img : 'assets/placeholder.svg');
            var price = isFromCatalog ? (p.precio || 'Ver en Sanborns') : (p.precio || '');
            return (
                '<div class="product-card' + (isAdded ? ' selected' : '') + '" role="button" style="cursor: pointer; display: block;" data-product-id="' + String(pid).replace(/"/g, '&quot;') + '" data-product-name="' + (displayName + '').replace(/"/g, '&quot;') + '" data-product-url="' + (productUrl + '').replace(/"/g, '&quot;') + '" onclick="handleProductClick(this)">' +
                '<img src="' + (imgSrc + '').replace(/"/g, '&quot;') + '" class="product-img" alt="' + (displayName + '').replace(/"/g, '&quot;') + '" loading="lazy" onerror="this.src=\'assets/placeholder.svg\'; this.onerror=null;">' +
                '<div class="product-info">' +
                '<div class="product-name">' + displayName + '</div>' +
                '<div class="product-price">' + price + '</div>' +
                '<button type="button" class="add-btn" data-product-id="' + String(pid).replace(/"/g, '&quot;') + '" data-wishlist-btn>' + (isAdded ? '\u2764\uFE0F Quitar' : '\u{1F91D} Agregar') + '</button>' +
                '</div></div>'
            );
        }).join('')}
    </div>
    <button type="button" class="btn-main" id="send-wishlist-btn" style="z-index: 10; pointer-events: auto; position: relative;">\u{1F48C} ENVIAR WISHLIST POR EMAIL</button>
    <div id="mailto-link-wrap" style="display:none; margin-top:8px; font-size:14px; text-align:center;"></div>
`;
// Delegated: bot?n wishlist (no seguir link)
container.querySelectorAll('[data-wishlist-btn]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var id = this.getAttribute('data-product-id');
        var product = products.find(function (pr) { return String(pr.id) === String(id); });
        if (product) toggleWishlist(product);
    });
});
// H?brido final: m?vil = mailto directo; desktop = clipboard + tempLink + alert
var sendBtn = container.querySelector('#send-wishlist-btn');
if (sendBtn) {
    sendBtn.addEventListener('click', function (e) {
        e.preventDefault();
        var selectedCards = document.querySelectorAll('.product-card.selected');
        if (selectedCards.length === 0) {
            alert('Por favor, selecciona al menos un producto.');
            return;
        }
        var names = Array.from(selectedCards).map(function (c) {
            var el = c.querySelector('.product-name');
            return el ? el.innerText : 'Producto';
        });
        var bodyText = '?Hola! Estos son mis favoritos de San Valent?n:unun' + names.join('un') + 'ununVer cat?logo: ' + window.location.href;
        var subject = encodeURIComponent('Mi Wishlist de San Valent?n - Sanborns');
        var mailtoUrl = 'mailto:?subject=' + subject + '&body=' + encodeURIComponent(bodyText);
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
            window.location.href = mailtoUrl;
        } else {
            var cb = navigator.clipboard;
            if (cb && typeof cb.writeText === 'function') {
                cb.writeText(bodyText).finally(function () {
                    var tempLink = document.createElement('a');
                    tempLink.href = mailtoUrl;
                    tempLink.style.display = 'none';
                    document.body.appendChild(tempLink);
                    tempLink.click();
                    document.body.removeChild(tempLink);
                    alert('?Wishlist lista! Se intent? abrir tu correo. Tambi?n copiamos la lista a tu portapapeles por seguridad.');
                });
            } else {
                var tempLink = document.createElement('a');
                tempLink.href = mailtoUrl;
                tempLink.style.display = 'none';
                document.body.appendChild(tempLink);
                tempLink.click();
                document.body.removeChild(tempLink);
            }
        }
        if (typeof window.dataLayer !== 'undefined') {
            window.dataLayer.push({ event: 'wishlist_sent', count: selectedCards.length });
        }
    });
}
/* Clic en producto: handleProductClick (onclick) hace track + window.open - QA CM360/DV360 */
}

window.selectGender = (gender) => {
appState.gender = gender;
appState.screen = 'categorias';
trackEvent('gender_selected', { gender: gender });
render();
};

window.selectCategory = (category) => {
var gender = appState.gender;
var catConfig = CATEGORIES[gender] && CATEGORIES[gender].find(function (c) { return c.id === category; });
var useCatalog = Array.isArray(window.PRODUCTS_CATALOG) && window.PRODUCTS_CATALOG.length > 0 && catConfig && catConfig.matchCategories;
var productsRef = useCatalog
    ? window.PRODUCTS_CATALOG.filter(function (p) {
        return catConfig.matchCategories.indexOf(p.category) !== -1 && (p.gender === gender || p.gender === 'ambos');
      })
    : getProductsFallback(gender, category);
/* Zero logs - QA CM360/DV360 */
appState.category = category;
appState.screen = 'productos';
trackEvent('category_selected', { gender: gender, category: category });
render();
};

window.goBack = () => {
if (appState.screen === 'productos') {
    appState.screen = 'categorias';
} else if (appState.screen === 'categorias') {
    appState.screen = 'inicio';
}
render();
};

window.toggleWishlist = (product) => {
const index = appState.wishlist.findIndex(item => item.id === product.id);
if (index === -1) {
    appState.wishlist.push(product);
    trackEvent('product_added_to_wishlist', {
        product_id: String(product.id),
        product_name: product.nombre || '',
        gender: appState.gender,
        category: appState.category,
        wishlist_count: appState.wishlist.length
    });
} else {
    appState.wishlist.splice(index, 1);
}
updateWishlistCounter();
render();
};

function updateWishlistCounter() {
const counter = document.getElementById('wishlistCount');
if (counter) counter.textContent = appState.wishlist.length;
}

// Modal Logic
window.openEmailModal = () => {
if (appState.wishlist.length === 0) {
    alert('Agrega al menos un producto a tu wishlist primero \u2764\uFE0F');
    return;
}
trackEvent('wishlist_modal_opened', { wishlist_count: appState.wishlist.length });
document.getElementById('emailModal').classList.add('active');
};

function attachModalAndWishlistSend() {
var emailModal = document.getElementById('emailModal');
var modalClose = document.getElementById('modalClose');
var btnCancelar = document.getElementById('btnCancelar');
var wishlistForm = document.getElementById('wishlistForm');
if (modalClose && emailModal) modalClose.onclick = function () {
    if (typeof exitClickHandler === 'function') exitClickHandler('Modal Close');
    emailModal.classList.remove('active');
};
if (btnCancelar && emailModal) btnCancelar.onclick = function () {
    if (typeof exitClickHandler === 'function') exitClickHandler('Cancel');
    emailModal.classList.remove('active');
};
if (wishlistForm) {
    wishlistForm.onsubmit = function (e) {
        e.preventDefault();
        sendWishlistByMail();
    };
}
var btnEnviar = document.getElementById('btnEnviar');
if (btnEnviar) {
    btnEnviar.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        sendWishlistByMail();
    });
}
}

// MediaSmart: abrir producto con click tracker
window.openProductPage = (url) => {
if (!url) {
    window.open(window.clickTag || window.landingPage, '_blank');
    return;
}
var tracker = window.clickTracker || '';
window.open(tracker + url, '_blank');
};

// Start
document.addEventListener('DOMContentLoaded', function () {
trackEvent('banner_loaded', {});
attachModalAndWishlistSend();
render();
});
