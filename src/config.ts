// Datos del restaurante: edita aquí teléfono, horarios, links, etc.
export const SITE = {
  name: "Pastinos Pastas & Vinos",
  phone: "(954) 710-8908",
  phoneHref: "tel:+19547108908",
  address: {
    line1: "645 W Hallandale Beach Blvd, Unit 101",
    line2: "Hallandale Beach, FL 33009",
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Pastinos+Pastas+y+Vinos+645+W+Hallandale+Beach+Blvd+Hallandale+Beach+FL+33009",
  mapsEmbed:
    "https://www.google.com/maps?q=645+W+Hallandale+Beach+Blvd+Unit+101,+Hallandale+Beach,+FL+33009&output=embed",
  orderUrl:
    "https://www.getsauce.com/order/pastinos-pastas-and-vinos/menu?utm_source=lp_website&utm_medium=menu_link&utm_id=pastinos-pastas-and-vinos",
  social: {
    instagram: "https://www.instagram.com/pastinospastasyvinos/",
    facebook: "https://www.facebook.com/profile.php?id=100091651899667",
    tiktok: "https://www.tiktok.com/@pastinospastasyvinos",
  },
  // 0 = domingo ... 6 = sábado. null = cerrado. Formato 24h "HH:MM".
  hours: [
    { open: "12:00", close: "21:00" }, // Sun
    null, // Mon
    { open: "12:00", close: "21:00" }, // Tue
    { open: "12:00", close: "21:00" }, // Wed
    { open: "12:00", close: "21:00" }, // Thu
    { open: "12:00", close: "22:00" }, // Fri
    { open: "12:00", close: "22:00" }, // Sat
  ] as ({ open: string; close: string } | null)[],
};

export const IMG = (name: string) => ({
  src: `/images/${name}.webp`,
  srcSet: `/images/${name}-sm.webp 800w, /images/${name}.webp 1600w`,
});
