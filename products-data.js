const productosDatabase = {
  mujer: {
    maquillaje: [
      { 
        id: 1, 
        nombre: "Set Maquillaje Urban Decay", 
        precio: "$2,499", 
        precioOriginal: "$3,299",
        img: "https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=Maquillaje+1", 
        descuento: "20% OFF", 
        url: "https://www.sanborns.com.mx"
      },
      { 
        id: 2, 
        nombre: "Paleta de Sombras MAC", 
        precio: "$1,150", 
        precioOriginal: "$1,500",
        img: "https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=Maquillaje+2", 
        descuento: "23% OFF", 
        url: "https://www.sanborns.com.mx"
      },
      { 
        id: 3, 
        nombre: "Labial Estée Lauder Pure Color", 
        precio: "$750", 
        precioOriginal: "$950",
        img: "https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=Maquillaje+3", 
        descuento: "21% OFF", 
        url: "https://www.sanborns.com.mx"
      }
    ],
    perfumeria: [
      {
        id: 4,
        nombre: "Carolina Herrera Good Girl",
        precio: "$2,199",
        precioOriginal: "$2,999",
        img: "https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=Perfume+1",
        descuento: "30% OFF",
        url: "https://www.sanborns.com.mx"
      },
      {
        id: 5,
        nombre: "Miss Dior Eau de Parfum",
        precio: "$3,200",
        precioOriginal: "$3,800",
        img: "https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=Perfume+2",
        descuento: "15% OFF",
        url: "https://www.sanborns.com.mx"
      },
      {
        id: 6,
        nombre: "Chanel No. 5",
        precio: "$4,100",
        precioOriginal: "$4,500",
        img: "https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=Perfume+3",
        descuento: "10% OFF",
        url: "https://www.sanborns.com.mx"
      }
    ],
    bolsas: [
      { id: 7, nombre: "Bolsa Coach Tote", precio: "$4,599", precioOriginal: "$6,299", img: "https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=Bolsa+1", descuento: "27% OFF", url: "https://www.sanborns.com.mx" },
      { id: 8, nombre: "Michael Kors Crossbody", precio: "$3,200", precioOriginal: "$4,500", img: "https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=Bolsa+2", descuento: "29% OFF", url: "https://www.sanborns.com.mx" },
      { id: 9, nombre: "Kate Spade Shoulder Bag", precio: "$5,100", precioOriginal: "$6,800", img: "https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=Bolsa+3", descuento: "25% OFF", url: "https://www.sanborns.com.mx" }
    ],
    joyeria: [
      { id: 10, nombre: "Collar Swarovski Heart", precio: "$2,899", precioOriginal: "$3,500", img: "https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=Joya+1", descuento: "17% OFF", url: "https://www.sanborns.com.mx" },
      { id: 11, nombre: "Aretes Pandora Plata", precio: "$1,450", precioOriginal: "$1,900", img: "https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=Joya+2", descuento: "24% OFF", url: "https://www.sanborns.com.mx" },
      { id: 12, nombre: "Anillo Tous Oso", precio: "$2,100", precioOriginal: "$2,800", img: "https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=Joya+3", descuento: "25% OFF", url: "https://www.sanborns.com.mx" }
    ],
    cuidado: [
      { id: 13, nombre: "Clinique Moisture Surge", precio: "$1,299", precioOriginal: "$1,600", img: "https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=Skin+1", descuento: "19% OFF", url: "https://www.sanborns.com.mx" },
      { id: 14, nombre: "Lancôme Advanced Génifique", precio: "$2,450", precioOriginal: "$3,100", img: "https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=Skin+2", descuento: "21% OFF", url: "https://www.sanborns.com.mx" },
      { id: 15, nombre: "Kiehl's Ultra Facial Cream", precio: "$850", precioOriginal: "$1,100", img: "https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=Skin+3", descuento: "23% OFF", url: "https://www.sanborns.com.mx" }
    ],
    libros: [
      { id: 16, nombre: "It Ends With Us - Colleen Hoover", precio: "$399", precioOriginal: "$450", img: "https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=Libro+1", descuento: "11% OFF", url: "https://www.sanborns.com.mx" },
      { id: 17, nombre: "The Seven Husbands of Evelyn Hugo", precio: "$420", precioOriginal: "$490", img: "https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=Libro+2", descuento: "14% OFF", url: "https://www.sanborns.com.mx" },
      { id: 18, nombre: "Normal People - Sally Rooney", precio: "$350", precioOriginal: "$400", img: "https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=Libro+3", descuento: "12% OFF", url: "https://www.sanborns.com.mx" }
    ],
    tecnologia: [
      { id: 19, nombre: "Apple AirPods Pro 2", precio: "$4,599", precioOriginal: "$5,499", img: "https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=Tech+1", descuento: "16% OFF", url: "https://www.sanborns.com.mx" },
      { id: 20, nombre: "Instax Mini 12 Bundle", precio: "$2,100", precioOriginal: "$2,600", img: "https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=Tech+2", descuento: "19% OFF", url: "https://www.sanborns.com.mx" },
      { id: 21, nombre: "Kindle Paperwhite", precio: "$3,200", precioOriginal: "$3,800", img: "https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=Tech+3", descuento: "15% OFF", url: "https://www.sanborns.com.mx" }
    ],
    hogar: [
      { id: 22, nombre: "Nespresso Pixie", precio: "$3,499", precioOriginal: "$4,299", img: "https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=Hogar+1", descuento: "18% OFF", url: "https://www.sanborns.com.mx" },
      { id: 23, nombre: "Set de Velas Aromáticas", precio: "$599", precioOriginal: "$850", img: "https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=Hogar+2", descuento: "30% OFF", url: "https://www.sanborns.com.mx" },
      { id: 24, nombre: "Manta Reversible Soft", precio: "$850", precioOriginal: "$1,200", img: "https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=Hogar+3", descuento: "29% OFF", url: "https://www.sanborns.com.mx" }
    ]
  },
  hombre: {
    accesorios: [
      { id: 25, nombre: "Cartera Tommy Hilfiger", precio: "$1,299", precioOriginal: "$1,800", img: "https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=Acc+1", descuento: "28% OFF", url: "https://www.sanborns.com.mx" },
      { id: 26, nombre: "Lentes Ray-Ban Aviator", precio: "$3,450", precioOriginal: "$4,200", img: "https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=Acc+2", descuento: "18% OFF", url: "https://www.sanborns.com.mx" },
      { id: 27, nombre: "Cinturón Calvin Klein", precio: "$950", precioOriginal: "$1,300", img: "https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=Acc+3", descuento: "27% OFF", url: "https://www.sanborns.com.mx" }
    ],
    moda: [
      { id: 28, nombre: "Sudadera Nike Sportswear", precio: "$1,499", precioOriginal: "$1,900", img: "https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=Moda+1", descuento: "21% OFF", url: "https://www.sanborns.com.mx" },
      { id: 29, nombre: "Chamarra Levi's Trucker", precio: "$2,100", precioOriginal: "$2,800", img: "https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=Moda+2", descuento: "25% OFF", url: "https://www.sanborns.com.mx" },
      { id: 30, nombre: "Polo Ralph Lauren", precio: "$2,450", precioOriginal: "$3,100", img: "https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=Moda+3", descuento: "21% OFF", url: "https://www.sanborns.com.mx" }
    ],
    tecnologia: [
      { id: 31, nombre: "Sony WH-1000XM5", precio: "$6,999", precioOriginal: "$8,500", img: "https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=Tech+M+1", descuento: "18% OFF", url: "https://www.sanborns.com.mx" },
      { id: 32, nombre: "JBL Flip 6", precio: "$2,450", precioOriginal: "$3,100", img: "https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=Tech+M+2", descuento: "21% OFF", url: "https://www.sanborns.com.mx" },
      { id: 33, nombre: "Apple Watch SE", precio: "$5,499", precioOriginal: "$6,800", img: "https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=Tech+M+3", descuento: "19% OFF", url: "https://www.sanborns.com.mx" }
    ],
    cuidado: [
      { id: 34, nombre: "Gillette Labs Razor Set", precio: "$1,150", precioOriginal: "$1,500", img: "https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=Care+1", descuento: "23% OFF", url: "https://www.sanborns.com.mx" },
      { id: 35, nombre: "Clinique For Men Kit", precio: "$1,450", precioOriginal: "$1,900", img: "https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=Care+2", descuento: "24% OFF", url: "https://www.sanborns.com.mx" },
      { id: 36, nombre: "Baxter of California Set", precio: "$1,850", precioOriginal: "$2,400", img: "https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=Care+3", descuento: "23% OFF", url: "https://www.sanborns.com.mx" }
    ],
    relojes: [
      { id: 37, nombre: "Casio G-Shock", precio: "$2,899", precioOriginal: "$3,800", img: "https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=Watch+1", descuento: "24% OFF", url: "https://www.sanborns.com.mx" },
      { id: 38, nombre: "Fossil Machine", precio: "$3,450", precioOriginal: "$4,500", img: "https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=Watch+2", descuento: "23% OFF", url: "https://www.sanborns.com.mx" },
      { id: 39, nombre: "Bulova Chronograph", precio: "$6,200", precioOriginal: "$7,800", img: "https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=Watch+3", descuento: "21% OFF", url: "https://www.sanborns.com.mx" }
    ],
    gaming: [
      { id: 40, nombre: "Nintendo Switch Lite", precio: "$4,100", precioOriginal: "$5,200", img: "https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=Game+1", descuento: "21% OFF", url: "https://www.sanborns.com.mx" },
      { id: 41, nombre: "Control DualSense PS5", precio: "$1,450", precioOriginal: "$1,800", img: "https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=Game+2", descuento: "19% OFF", url: "https://www.sanborns.com.mx" },
      { id: 42, nombre: "Logitech G502 Mouse", precio: "$1,150", precioOriginal: "$1,600", img: "https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=Game+3", descuento: "28% OFF", url: "https://www.sanborns.com.mx" }
    ],
    libros: [
      { id: 43, nombre: "Atomic Habits - James Clear", precio: "$450", precioOriginal: "$550", img: "https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=Book+1", descuento: "18% OFF", url: "https://www.sanborns.com.mx" },
      { id: 44, nombre: "The Psychology of Money", precio: "$380", precioOriginal: "$480", img: "https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=Book+2", descuento: "21% OFF", url: "https://www.sanborns.com.mx" },
      { id: 45, nombre: "Steve Jobs - Walter Isaacson", precio: "$499", precioOriginal: "$650", img: "https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=Book+3", descuento: "23% OFF", url: "https://www.sanborns.com.mx" }
    ],
    deportes: [
      { id: 46, nombre: "Under Armour Gym Bag", precio: "$950", precioOriginal: "$1,300", img: "https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=Sport+1", descuento: "27% OFF", url: "https://www.sanborns.com.mx" },
      { id: 47, nombre: "Fitbit Charge 5", precio: "$3,200", precioOriginal: "$4,100", img: "https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=Sport+2", descuento: "22% OFF", url: "https://www.sanborns.com.mx" },
      { id: 48, nombre: "Pelota de Yoga Adidas", precio: "$550", precioOriginal: "$800", img: "https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=Sport+3", descuento: "31% OFF", url: "https://www.sanborns.com.mx" }
    ]
  }
};

window.productosDatabase = productosDatabase;
