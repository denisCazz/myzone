export const siteConfig = {
  name: "Myzone",
  tagline: "Agenzia Immobiliare a Cavallermaggiore",
  images: {
    hero: "/hero.jpg",
    cucina: "/cucina.jpg",
    logo: "/logo.jpg",
    favicon: "/favicon.ico",
    servizi: {
      valutazioni: "/servizi/valutazioni.jpg",
      consulenzaFinanziaria: "/servizi/consulenza-finanziaria.jpg",
      consulenzaTecnica: "/servizi/consulenza-tecnica.jpg",
      gestioneUtenze: "/servizi/gestione-utenze.jpg",
    },
    serviziPlaceholder: "/cucina.jpg",
  },
  address: "Via Roma 78",
  city: "12030 Cavallermaggiore (CN)",
  fullAddress: "Via Roma 78, 12030 Cavallermaggiore (CN)",
  email: "ufficio@myzone.casa",
  phone: "+39 0172 123456",
  zone: "Cavallermaggiore e dintorni",
  social: {
    facebook: "https://facebook.com/myzone",
    instagram: "https://instagram.com/myzone",
  },
} as const;
