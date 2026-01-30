const productosDatabase = {
  mujer: {
    perfumeria: [
      { 
        id: 1, 
        nombre: "Carolina Herrera Good Girl EDP 80ml", 
        precio: "$2,499", 
        precioOriginal: "$3,299",
        img: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop&q=80", 
        descuento: "25% OFF", 
        url: "https://www.sanborns.com.mx/producto/235084/fragancia-para-dama-carolina-herrera-good-girl-edp-80ml"
      },
      { 
        id: 2, 
        nombre: "Carolina Herrera Good Girl EDP 150ml", 
        precio: "$3,299", 
        precioOriginal: "$4,550",
        img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=400&fit=crop&q=80", 
        descuento: "27% OFF", 
        url: "https://www.sanborns.com.mx/producto/235082/carolina-herrera-good-girl-edp-150ml-perfume-para-dama"
      },
      { 
        id: 3, 
        nombre: "Set Carolina Herrera Good Girl + Labial", 
        precio: "$2,799", 
        precioOriginal: "$3,499",
        img: "https://images.unsplash.com/photo-1588405748880-12d1d2a59cfc?w=400&h=400&fit=crop&q=80", 
        descuento: "20% OFF", 
        url: "https://www.sanborns.com.mx/producto/348645/set-para-mujer-carolina-herrera-good-girl-edp-80ml-labial-satinado-perfume-de-bolsillo-10ml"
      },
      { 
        id: 4, 
        nombre: "Dolce & Gabbana Devotion", 
        precio: "$2,799", 
        precioOriginal: "$3,499",
        img: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400&h=400&fit=crop&q=80", 
        descuento: "20% OFF", 
        url: "https://www.sanborns.com.mx/c/perfumes-mujer/"
      }
    ],
    maquillaje: [
      { 
        id: 5, 
        nombre: "Paleta de Sombras Nude Beauty Creations", 
        precio: "$899", 
        precioOriginal: "$1,299",
        img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop&q=80", 
        descuento: "30% OFF", 
        url: "https://www.sanborns.com.mx/producto/377972/paleta-de-sombras-nude-x-15-beauty-creations"
      },
      { 
        id: 6, 
        nombre: "Paleta de Sombras 18 Tonos Nude", 
        precio: "$799", 
        precioOriginal: "$1,199",
        img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop&q=80", 
        descuento: "33% OFF", 
        url: "https://www.sanborns.com.mx/producto/423549/paleta-de-sombras-tonos-nude-18-tonos"
      },
      { 
        id: 7, 
        nombre: "Paleta Looks Book Player Revlon", 
        precio: "$1,199", 
        precioOriginal: "$1,699",
        img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop&q=80", 
        descuento: "29% OFF", 
        url: "https://www.sanborns.com.mx/producto/59612/paleta-de-sombras-looks-book-player-revlon"
      }
    ],
    bolsas: [
      { 
        id: 8, 
        nombre: "Mochila Fashion Bolsa de Hombro", 
        precio: "$1,299", 
        precioOriginal: "$1,899", 
        img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=400&fit=crop&q=80", 
        descuento: "32% OFF", 
        url: "https://www.sanborns.com.mx/producto/735821/mochila-de-moda-para-mujer-bolsas-de-hombro-bolsa-informal" 
      },
      { 
        id: 9, 
        nombre: "Bolsa Coach Signature", 
        precio: "$3,999", 
        precioOriginal: "$5,499", 
        img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop&q=80", 
        descuento: "27% OFF", 
        url: "https://www.sanborns.com.mx/c/bolsas/" 
      },
      { 
        id: 10, 
        nombre: "Clutch Guess", 
        precio: "$1,299", 
        precioOriginal: "$1,899", 
        img: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400&h=400&fit=crop&q=80", 
        descuento: "32% OFF", 
        url: "https://www.sanborns.com.mx/c/bolsas/" 
      }
    ],
    joyeria: [
      { 
        id: 11, 
        nombre: "Collar Pandora Corazón", 
        precio: "$1,499", 
        precioOriginal: "$1,999", 
        img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&q=80", 
        descuento: "25% OFF", 
        url: "https://www.sanborns.com.mx/c/joyeria/" 
      },
      { 
        id: 12, 
        nombre: "Aretes Tous", 
        precio: "$999", 
        precioOriginal: "$1,499", 
        img: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=400&h=400&fit=crop&q=80", 
        descuento: "33% OFF", 
        url: "https://www.sanborns.com.mx/c/joyeria/" 
      },
      { 
        id: 13, 
        nombre: "Pulsera Swarovski", 
        precio: "$1,799", 
        precioOriginal: "$2,499", 
        img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop&q=80", 
        descuento: "28% OFF", 
        url: "https://www.sanborns.com.mx/c/joyeria/" 
      }
    ],
    cuidado: [
      { 
        id: 14, 
        nombre: "Kit Clinique 3 Pasos", 
        precio: "$1,299", 
        precioOriginal: "$1,799", 
        img: "https://images.unsplash.com/photo-1556229010-aa92083e2a83?w=400&h=400&fit=crop&q=80", 
        descuento: "28% OFF", 
        url: "https://www.sanborns.com.mx/c/cuidado-de-la-piel/" 
      },
      { 
        id: 15, 
        nombre: "Crema Estée Lauder Advanced Night Repair", 
        precio: "$2,199", 
        precioOriginal: "$2,899", 
        img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop&q=80", 
        descuento: "24% OFF", 
        url: "https://www.sanborns.com.mx/c/cuidado-de-la-piel/" 
      },
      { 
        id: 16, 
        nombre: "Set Clarins", 
        precio: "$1,599", 
        precioOriginal: "$2,199", 
        img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop&q=80", 
        descuento: "27% OFF", 
        url: "https://www.sanborns.com.mx/c/cuidado-de-la-piel/" 
      }
    ],
    tecnologia: [
      { 
        id: 17, 
        nombre: "Apple AirPods Pro 2da Gen", 
        precio: "$4,999", 
        precioOriginal: "$5,999", 
        img: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400&h=400&fit=crop&q=80", 
        descuento: "17% OFF", 
        url: "https://www.sanborns.com.mx/producto/295494/apple-airpods-pro-2da-generacion" 
      },
      { 
        id: 18, 
        nombre: "Apple AirPods Pro 2 USB-C", 
        precio: "$5,299", 
        precioOriginal: "$6,499", 
        img: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop&q=80", 
        descuento: "18% OFF", 
        url: "https://www.sanborns.com.mx/producto/351215/apple-airpods-pro-2da-generacion-usb-c" 
      },
      { 
        id: 19, 
        nombre: "Apple AirPods Pro USB-C 2da Gen", 
        precio: "$5,499", 
        precioOriginal: "$6,699", 
        img: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop&q=80", 
        descuento: "18% OFF", 
        url: "https://www.sanborns.com.mx/producto/593549" 
      }
    ],
    libros: [
      { 
        id: 20, 
        nombre: "Best Sellers Románticos", 
        precio: "$399", 
        precioOriginal: "$599", 
        img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop&q=80", 
        descuento: "33% OFF", 
        url: "https://www.sanborns.com.mx/c/libros/" 
      },
      { 
        id: 21, 
        nombre: "Box Set Clásicos", 
        precio: "$599", 
        precioOriginal: "$899", 
        img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=400&fit=crop&q=80", 
        descuento: "33% OFF", 
        url: "https://www.sanborns.com.mx/c/libros/" 
      },
      { 
        id: 22, 
        nombre: "Libro + Marca Páginas de Regalo", 
        precio: "$299", 
        precioOriginal: "$499", 
        img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop&q=80", 
        descuento: "40% OFF", 
        url: "https://www.sanborns.com.mx/c/libros/" 
      }
    ],
    hogar: [
      { 
        id: 23, 
        nombre: "Cafetera Nespresso", 
        precio: "$2,799", 
        precioOriginal: "$3,499", 
        img: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=400&fit=crop&q=80", 
        descuento: "20% OFF", 
        url: "https://www.sanborns.com.mx/c/hogar/" 
      },
      { 
        id: 24, 
        nombre: "Difusor Aromaterapia", 
        precio: "$699", 
        precioOriginal: "$999", 
        img: "https://images.unsplash.com/photo-1602874801006-e24a9ea5f45a?w=400&h=400&fit=crop&q=80", 
        descuento: "30% OFF", 
        url: "https://www.sanborns.com.mx/c/hogar/" 
      },
      { 
        id: 25, 
        nombre: "Set Copas Cristal", 
        precio: "$899", 
        precioOriginal: "$1,299", 
        img: "https://images.unsplash.com/photo-1502301103665-0b95cc738daf?w=400&h=400&fit=crop&q=80", 
        descuento: "31% OFF", 
        url: "https://www.sanborns.com.mx/c/hogar/" 
      }
    ]
  },
  hombre: {
    tecnologia: [
      { 
        id: 26, 
        nombre: "Samsung Galaxy Watch 6 Classic Gris 47mm", 
        precio: "$5,499", 
        precioOriginal: "$6,999", 
        img: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop&q=80", 
        descuento: "21% OFF", 
        url: "https://www.sanborns.com.mx/producto/338082/samsung-galaxy-watch-6-classic-gris-47mm" 
      },
      { 
        id: 27, 
        nombre: "Samsung Galaxy Watch 5 44mm Grafito", 
        precio: "$3,999", 
        precioOriginal: "$6,999", 
        img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&q=80", 
        descuento: "43% OFF", 
        url: "https://www.sanborns.com.mx/producto/285093/samsung-galaxy-watch-5-44mm-grafito" 
      },
      { 
        id: 28, 
        nombre: "Samsung Galaxy Watch 7 44mm Plata", 
        precio: "$5,999", 
        precioOriginal: "$7,499", 
        img: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=400&fit=crop&q=80", 
        descuento: "20% OFF", 
        url: "https://www.sanborns.com.mx/producto/466800/samsung-galaxy-watch-7-44-mm-plata" 
      }
    ],
    accesorios: [
      { 
        id: 29, 
        nombre: "Cartera Tommy Hilfiger", 
        precio: "$1,299", 
        precioOriginal: "$1,799", 
        img: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop&q=80", 
        descuento: "28% OFF", 
        url: "https://www.sanborns.com.mx/c/accesorios-hombre/" 
      },
      { 
        id: 30, 
        nombre: "Cinturón Hugo Boss", 
        precio: "$999", 
        precioOriginal: "$1,499", 
        img: "https://images.unsplash.com/photo-1624222247344-550fb60583bb?w=400&h=400&fit=crop&q=80", 
        descuento: "33% OFF", 
        url: "https://www.sanborns.com.mx/c/accesorios-hombre/" 
      },
      { 
        id: 31, 
        nombre: "Mancuernillas Mont Blanc", 
        precio: "$1,999", 
        precioOriginal: "$2,799", 
        img: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=400&fit=crop&q=80", 
        descuento: "29% OFF", 
        url: "https://www.sanborns.com.mx/c/accesorios-hombre/" 
      }
    ],
    moda: [
      { 
        id: 32, 
        nombre: "Camisa Calvin Klein Slim", 
        precio: "$899", 
        precioOriginal: "$1,299", 
        img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop&q=80", 
        descuento: "31% OFF", 
        url: "https://www.sanborns.com.mx/c/ropa-hombre/" 
      },
      { 
        id: 33, 
        nombre: "Polo Ralph Lauren", 
        precio: "$1,199", 
        precioOriginal: "$1,699", 
        img: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop&q=80", 
        descuento: "29% OFF", 
        url: "https://www.sanborns.com.mx/c/ropa-hombre/" 
      },
      { 
        id: 34, 
        nombre: "Suéter Tommy Hilfiger", 
        precio: "$1,499", 
        precioOriginal: "$2,199", 
        img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=400&fit=crop&q=80", 
        descuento: "32% OFF", 
        url: "https://www.sanborns.com.mx/c/ropa-hombre/" 
      }
    ],
    cuidado: [
      { 
        id: 35, 
        nombre: "Set Afeitado Gillette Premium", 
        precio: "$799", 
        precioOriginal: "$1,099", 
        img: "https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?w=400&h=400&fit=crop&q=80", 
        descuento: "27% OFF", 
        url: "https://www.sanborns.com.mx/c/cuidado-personal-hombre/" 
      },
      { 
        id: 36, 
        nombre: "Kit Grooming Philips", 
        precio: "$1,499", 
        precioOriginal: "$1,999", 
        img: "https://images.unsplash.com/photo-1621607512214-68297480165e?w=400&h=400&fit=crop&q=80", 
        descuento: "25% OFF", 
        url: "https://www.sanborns.com.mx/c/cuidado-personal-hombre/" 
      },
      { 
        id: 37, 
        nombre: "Colonia Acqua di Giò", 
        precio: "$2,199", 
        precioOriginal: "$2,999", 
        img: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop&q=80", 
        descuento: "27% OFF", 
        url: "https://www.sanborns.com.mx/c/perfumes-hombre/" 
      }
    ],
    relojes: [
      { 
        id: 38, 
        nombre: "Reloj Fossil Chronograph", 
        precio: "$3,299", 
        precioOriginal: "$4,499", 
        img: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=400&h=400&fit=crop&q=80", 
        descuento: "27% OFF", 
        url: "https://www.sanborns.com.mx/c/relojes/" 
      },
      { 
        id: 39, 
        nombre: "Reloj Casio G-Shock", 
        precio: "$2,499", 
        precioOriginal: "$3,299", 
        img: "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=400&h=400&fit=crop&q=80", 
        descuento: "24% OFF", 
        url: "https://www.sanborns.com.mx/c/relojes/" 
      },
      { 
        id: 40, 
        nombre: "Reloj Citizen Eco-Drive", 
        precio: "$4,999", 
        precioOriginal: "$6,499", 
        img: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&h=400&fit=crop&q=80", 
        descuento: "23% OFF", 
        url: "https://www.sanborns.com.mx/c/relojes/" 
      }
    ],
    gaming: [
      { 
        id: 41, 
        nombre: "Control Xbox Elite Series 2", 
        precio: "$2,799", 
        precioOriginal: "$3,499", 
        img: "https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=400&h=400&fit=crop&q=80", 
        descuento: "20% OFF", 
        url: "https://www.sanborns.com.mx/c/videojuegos/" 
      },
      { 
        id: 42, 
        nombre: "Headset HyperX Cloud III", 
        precio: "$1,999", 
        precioOriginal: "$2,699", 
        img: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=400&fit=crop&q=80", 
        descuento: "26% OFF", 
        url: "https://www.sanborns.com.mx/c/videojuegos/" 
      },
      { 
        id: 43, 
        nombre: "Mouse Logitech G502", 
        precio: "$1,199", 
        precioOriginal: "$1,699", 
        img: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop&q=80", 
        descuento: "29% OFF", 
        url: "https://www.sanborns.com.mx/c/videojuegos/" 
      }
    ],
    libros: [
      { 
        id: 44, 
        nombre: "Bestsellers Thriller", 
        precio: "$399", 
        precioOriginal: "$599", 
        img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop&q=80", 
        descuento: "33% OFF", 
        url: "https://www.sanborns.com.mx/c/libros/" 
      },
      { 
        id: 45, 
        nombre: "Libros de Negocios", 
        precio: "$499", 
        precioOriginal: "$799", 
        img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=400&fit=crop&q=80", 
        descuento: "38% OFF", 
        url: "https://www.sanborns.com.mx/c/libros/" 
      },
      { 
        id: 46, 
        nombre: "Box Set Ciencia Ficción", 
        precio: "$699", 
        precioOriginal: "$999", 
        img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop&q=80", 
        descuento: "30% OFF", 
        url: "https://www.sanborns.com.mx/c/libros/" 
      }
    ],
    deportes: [
      { 
        id: 47, 
        nombre: "Tenis Nike Air Max", 
        precio: "$2,499", 
        precioOriginal: "$3,199", 
        img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&q=80", 
        descuento: "22% OFF", 
        url: "https://www.sanborns.com.mx/c/deportes/" 
      },
      { 
        id: 48, 
        nombre: "Smartband Fitbit", 
        precio: "$1,799", 
        precioOriginal: "$2,499", 
        img: "https://images.unsplash.com/photo-1557935728-e6d1eaa296ea?w=400&h=400&fit=crop&q=80", 
        descuento: "28% OFF", 
        url: "https://www.sanborns.com.mx/c/deportes/" 
      },
      { 
        id: 49, 
        nombre: "Mancuernas Ajustables", 
        precio: "$1,499", 
        precioOriginal: "$1,999", 
        img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=400&fit=crop&q=80", 
        descuento: "25% OFF", 
        url: "https://www.sanborns.com.mx/c/deportes/" 
      }
    ]
  }
};

window.productosDatabase = productosDatabase;
