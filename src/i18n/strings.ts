export type Lang = "en" | "es";

const en = {
  nav: { home: "Home", story: "Our story", menu: "Menu", reserve: "Reservations", order: "Order online", call: "Call" },
  langSwitch: "Español",
  orderNow: "Order now",
  scanMe: "Scan me",
  scanTitle: "Scan our QR code",
  scanText: "All our links in one place: menu, ordering and social media.",
  close: "Close",
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  closed: "Closed",
  openNow: "Open now until",
  closedNow: "Closed now",
  opensAt: "Opens",
  today: "today",
  home: {
    title: "Pastinos Pastas & Vinos — Italian pasta & wine in Hallandale Beach",
    heroKicker: "Fresh pasta & selected wines in Hallandale Beach",
    heroTitle: "Your pasta, made your way.",
    heroText:
      "Pick the pasta, the sauce and every ingredient. Our chefs cook it fresh, with sauces made from scratch and a glass of wine on the side.",
    reserve: "Reserve a table",
    order: "Order online",
    promisesTitle: "What you'll find at our table",
    promises: [
      { t: "Made with love", d: "Homemade dishes cooked with care, the way we'd cook for our own family." },
      { t: "Fresh ingredients", d: "Fresh, local ingredients in every plate, so every bite tastes like it should." },
      { t: "Family atmosphere", d: "A warm, friendly room where you can slow down, share a bottle and make memories." },
    ],
    buildTitle: "The only place in the Miami area to create your own pasta",
    buildText:
      "Choose from a wide variety of pastas, sauces, ingredients and toppings. Tell us how you like it — our chefs bring it to life.",
    steps: [
      { t: "Choose your pasta", d: "Start with the shape you love." },
      { t: "Pick a sauce", d: "Every sauce is made from scratch in our kitchen." },
      { t: "Add ingredients", d: "Proteins, vegetables, whatever makes it yours." },
      { t: "Add a protein", d: "" },
    ],
    buildPrice: "Your pasta, your way",
    extraIng: "Extra ingredient",
    buildCta: "See the menu",
    specialsTitle: "House specialties",
    specials: [
      {
        t: "Pastinos Lasagna",
        d: "Layers of meat sauce meet our creamy white chicken and mushroom sauce. A lasagna you won't find anywhere else — the classic and the new on one plate.",
      },
      {
        t: "Salmon Florentine",
        d: "Oven-fresh salmon over pasta with our Florentine sauce of heavy cream, spinach and a touch of paprika. Light salmon, rich sauce, perfect balance.",
      },
    ],
    insideTitle: "Inside Pastinos",
    insideText: "Edison lights, black-and-white Italy on the walls and a pasta bar in full view.",
    visitTitle: "Come visit",
    visitText: "We're on Hallandale Beach Blvd, a few minutes from the beach.",
    directions: "Get directions",
    hoursTitle: "Hours",
  },
  story: {
    title: "Our story — Pastinos Pastas & Vinos",
    heroTitle: "More than a restaurant, a culinary family",
    intro:
      "At Pastinos we bring authentic Italian flavors and a love for memorable dinners to Hallandale Beach. Whether you come for the pasta or for the wine, homemade food and warm hospitality are waiting for you.",
    blocks: [
      {
        t: "The pasta passion begins",
        d: "Simple homemade pasta, rich handcrafted sauces and the joy of good moments around the table. Welcome to our home away from home, where every meal celebrates tradition, taste and togetherness.",
      },
      {
        t: "Crafting tradition, one pasta at a time",
        d: "We select the freshest, finest pastas and pair them with quality wines. Every dish tells part of our story.",
      },
      {
        t: "Your culinary adventure awaits",
        d: "As we grew, so did our passion for a unique dining experience. Fresh ingredients, handpicked wines and a warm room invite you to explore flavors and enjoy the true essence of Italian cuisine.",
      },
      {
        t: "Where tradition meets creativity",
        d: "Classic Italian recipes live next to your own creations. Join us and be part of our story, where every plate speaks of tradition, love and the joy of making something that's yours.",
      },
    ],
    cta: "Reserve your table",
  },
  menu: {
    title: "Menu — Pastinos Pastas & Vinos",
    heroTitle: "Tradition in every bite",
    heroText:
      "Homemade pasta with sauces made from scratch, Italian classics and desserts to share. Order for pickup or delivery online.",
    full: "Order online",
    buildTitle: "Create your own pasta",
    drinksTitle: "Drinks & wines",
    wineText: "Italian wines selected to go with our pastas. Ask us for a pairing.",
    note: "Prices in USD. Dishes, prices and availability may change; the online ordering menu is always up to date.",
  },
  reserve: {
    title: "Reservations — Pastinos Pastas & Vinos",
    heroTitle: "Reserve your table at Pastinos",
    heroText:
      "Join us for a delightful dining experience: our pasta dishes paired with exceptional wines, in a warm and welcoming atmosphere. Send your request and we'll confirm by phone or email. For today or large groups, calling is fastest.",
    name: "Full name",
    phone: "Phone",
    email: "Email",
    date: "Date",
    time: "Time",
    guests: "Guests",
    notes: "Anything we should know?",
    notesPh: "Birthday, allergies, high chair…",
    submit: "Send request",
    sending: "Sending…",
    sent: "Request sent. We'll contact you shortly to confirm your table.",
    error: "We couldn't send your request. Please call us at",
    closedDay: "We're closed that day. Please choose another date.",
    required: "Please fill in your name, phone, date and time.",
    orCall: "Prefer to call?",
    another: "Make another request",
  },
  footer: {
    tagline: "The only place in the Miami area where you can create your own pasta.",
    scan: "Scan for all our links",
    follow: "Follow us",
    rights: "All rights reserved.",
  },
  notFound: { title: "Page not found", text: "This page doesn't exist. Let's get you back to the table.", back: "Back home" },
};

const es: typeof en = {
  nav: { home: "Inicio", story: "Historia", menu: "Menú", reserve: "Reservas", order: "Pedir en línea", call: "Llamar" },
  langSwitch: "English",
  orderNow: "Pedir ahora",
  scanMe: "Escanéame",
  scanTitle: "Escanea nuestro código QR",
  scanText: "Todos nuestros links en un solo lugar: menú, pedidos y redes sociales.",
  close: "Cerrar",
  days: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
  closed: "Cerrado",
  openNow: "Abierto hasta las",
  closedNow: "Cerrado ahora",
  opensAt: "Abre",
  today: "hoy",
  home: {
    title: "Pastinos Pastas & Vinos — Pasta italiana y vinos en Hallandale Beach",
    heroKicker: "Pasta fresca y vinos seleccionados en Hallandale Beach",
    heroTitle: "Tu pasta, a tu manera.",
    heroText:
      "Elige la pasta, la salsa y cada ingrediente. Nuestros chefs la preparan al momento, con salsas hechas desde cero y una copa de vino al lado.",
    reserve: "Reservar mesa",
    order: "Pedir en línea",
    promisesTitle: "Lo que encontrarás en nuestra mesa",
    promises: [
      { t: "Hecho con amor", d: "Platos caseros preparados con cariño, como los haríamos para nuestra propia familia." },
      { t: "Ingredientes frescos", d: "Ingredientes frescos y locales en cada plato, para que cada bocado sepa como debe." },
      { t: "Ambiente familiar", d: "Un lugar cálido donde bajar el ritmo, compartir una botella y crear recuerdos." },
    ],
    buildTitle: "El único lugar del área de Miami donde creas tu propia pasta",
    buildText:
      "Escoge entre una gran variedad de pastas, salsas, ingredientes y toppings. Dinos cómo te gusta y nuestros chefs lo hacen realidad.",
    steps: [
      { t: "Elige tu pasta", d: "Empieza con la forma que más te guste." },
      { t: "Escoge la salsa", d: "Todas nuestras salsas se hacen desde cero en la cocina." },
      { t: "Agrega ingredientes", d: "Proteínas, vegetales, lo que la haga tuya." },
      { t: "Agrega una proteína", d: "" },
    ],
    buildPrice: "Tu pasta, a tu manera",
    extraIng: "Ingrediente extra",
    buildCta: "Ver el menú",
    specialsTitle: "Especialidades de la casa",
    specials: [
      {
        t: "Lasaña Pastinos",
        d: "Capas de salsa de carne con nuestra cremosa salsa blanca de pollo y champiñones. Una lasaña que no encontrarás en otro lugar: lo clásico y lo nuevo en un mismo plato.",
      },
      {
        t: "Salmón Florentine",
        d: "Salmón recién salido del horno sobre pasta, con nuestra salsa Florentine de crema, espinaca y un toque de paprika. Salmón suave, salsa intensa, equilibrio perfecto.",
      },
    ],
    insideTitle: "Así es Pastinos",
    insideText: "Luces cálidas, fotos de Italia en blanco y negro y una barra de pasta a la vista.",
    visitTitle: "Visítanos",
    visitText: "Estamos en Hallandale Beach Blvd, a pocos minutos de la playa.",
    directions: "Cómo llegar",
    hoursTitle: "Horario",
  },
  story: {
    title: "Nuestra historia — Pastinos Pastas & Vinos",
    heroTitle: "Más que un restaurante, una familia culinaria",
    intro:
      "En Pastinos traemos sabores italianos auténticos y el gusto por las cenas memorables a Hallandale Beach. Ya vengas por la pasta o por el vino, te esperan comida casera y una cálida hospitalidad.",
    blocks: [
      {
        t: "Así empezó la pasión por la pasta",
        d: "Pasta casera sencilla, salsas artesanales y la alegría de los buenos momentos alrededor de la mesa. Bienvenido a nuestro segundo hogar, donde cada comida celebra la tradición, el sabor y la unión.",
      },
      {
        t: "Creando tradición, una pasta a la vez",
        d: "Seleccionamos las pastas más frescas y finas y las acompañamos con vinos de calidad. Cada plato cuenta una parte de nuestra historia.",
      },
      {
        t: "Tu aventura culinaria te espera",
        d: "A medida que crecimos, creció nuestra pasión por ofrecer una experiencia única. Ingredientes frescos, vinos escogidos a mano y un ambiente cálido te invitan a explorar sabores y disfrutar la verdadera esencia de la cocina italiana.",
      },
      {
        t: "Donde la tradición se encuentra con la creatividad",
        d: "Las recetas italianas clásicas conviven con tus propias creaciones. Ven y sé parte de nuestra historia, donde cada plato habla de tradición, amor y la alegría de crear algo tuyo.",
      },
    ],
    cta: "Reserva tu mesa",
  },
  menu: {
    title: "Menú — Pastinos Pastas & Vinos",
    heroTitle: "Tradición en cada bocado",
    heroText:
      "Pasta casera con salsas hechas desde cero, clásicos italianos y postres para compartir. Pide en línea para recoger o a domicilio.",
    full: "Pedir en línea",
    buildTitle: "Crea tu propia pasta",
    drinksTitle: "Bebidas y vinos",
    wineText: "Vinos italianos seleccionados para acompañar nuestras pastas. Pídenos un maridaje.",
    note: "Precios en USD. Los platos, precios y disponibilidad pueden cambiar; el menú de pedidos en línea siempre está actualizado.",
  },
  reserve: {
    title: "Reservas — Pastinos Pastas & Vinos",
    heroTitle: "Reserva tu mesa en Pastinos",
    heroText:
      "Vive una experiencia deliciosa: nuestras pastas acompañadas de vinos excepcionales, en un ambiente cálido y acogedor. Envía tu solicitud y te confirmamos por teléfono o correo. Para hoy o grupos grandes, llamar es lo más rápido.",
    name: "Nombre completo",
    phone: "Teléfono",
    email: "Correo",
    date: "Fecha",
    time: "Hora",
    guests: "Personas",
    notes: "¿Algo que debamos saber?",
    notesPh: "Cumpleaños, alergias, silla para bebé…",
    submit: "Enviar solicitud",
    sending: "Enviando…",
    sent: "Solicitud enviada. Te contactaremos pronto para confirmar tu mesa.",
    error: "No pudimos enviar tu solicitud. Llámanos al",
    closedDay: "Ese día estamos cerrados. Elige otra fecha.",
    required: "Completa tu nombre, teléfono, fecha y hora.",
    orCall: "¿Prefieres llamar?",
    another: "Hacer otra solicitud",
  },
  footer: {
    tagline: "El único lugar del área de Miami donde puedes crear tu propia pasta.",
    scan: "Escanea para ver todos nuestros links",
    follow: "Síguenos",
    rights: "Todos los derechos reservados.",
  },
  notFound: { title: "Página no encontrada", text: "Esta página no existe. Volvamos a la mesa.", back: "Volver al inicio" },
};

export const STRINGS = { en, es };
export type Strings = typeof en;
