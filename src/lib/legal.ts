import { siteConfig } from "@/lib/site-config";

export type LegalSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export const legalLastUpdated = "10 marzo 2026";

export const legalContact = {
  controllerName: siteConfig.name,
  website: siteConfig.url,
  email: siteConfig.email,
  phone: siteConfig.phone,
  address: siteConfig.fullAddress,
  vatNumber: siteConfig.vatNumber,
} as const;

export const privacySections: LegalSection[] = [
  {
    title: "Titolare del trattamento",
    paragraphs: [
      `${legalContact.controllerName} tratta i dati personali raccolti tramite il presente sito web in qualita di titolare del trattamento, sulla base dei recapiti pubblicati online e delle informazioni disponibili nel progetto.`,
      `Recapiti attualmente pubblicati: ${legalContact.address}, email ${legalContact.email}, telefono ${legalContact.phone}, sito ${legalContact.website}, P. IVA ${legalContact.vatNumber}.`,
    ],
  },
  {
    title: "Quali dati raccogliamo",
    paragraphs: [
      "Il sito raccoglie i dati inseriti volontariamente dall'utente nel form di richiesta valutazione immobiliare e i dati tecnici strettamente necessari al funzionamento dell'area amministrativa.",
    ],
    bullets: [
      "Dati identificativi e di contatto: nome, cognome, email, telefono.",
      "Dati relativi all'immobile oggetto della richiesta: indirizzo, comune, tipologia, stato immobile, metratura, tempistiche e note facoltative.",
      "Dati tecnici di sessione per l'accesso all'area admin tramite cookie tecnico necessario.",
    ],
  },
  {
    title: "Finalita e basi giuridiche",
    paragraphs: [
      "I dati vengono trattati per rispondere alle richieste dell'utente, ricontattarlo in merito alla valutazione dell'immobile, gestire le comunicazioni correlate e mantenere sicura l'area amministrativa del sito.",
    ],
    bullets: [
      "Gestione delle richieste inviate dall'utente: misure precontrattuali richieste dall'interessato e legittimo interesse a fornire riscontro.",
      "Invio di email operative collegate alla richiesta: esecuzione della richiesta dell'utente.",
      "Protezione dell'area admin e gestione delle sessioni: legittimo interesse alla sicurezza del servizio.",
      "Adempimenti di legge o richieste dell'autorita, ove applicabili: obbligo legale.",
    ],
  },
  {
    title: "Modalita del trattamento",
    paragraphs: [
      "Il trattamento avviene con strumenti digitali e misure organizzative coerenti con la natura del servizio. I dati sono accessibili solo a soggetti autorizzati o a fornitori tecnici che operano per conto del titolare in relazione ai servizi effettivamente utilizzati dal sito.",
    ],
  },
  {
    title: "Servizi e soggetti coinvolti",
    paragraphs: [
      "Per il funzionamento del sito possono intervenire fornitori tecnici necessari all'erogazione del servizio, limitatamente alle rispettive finalita operative.",
    ],
    bullets: [
      "Supabase per database e funzionalita server collegate all'area amministrativa e ai dati applicativi.",
      "Cloudflare R2 per l'archiviazione e la distribuzione delle immagini caricate nell'area admin.",
      "Provider SMTP configurato dal titolare per ricevere la richiesta di valutazione e inviare la relativa email di conferma.",
      "OpenStreetMap soltanto quando l'utente sceglie di caricare la mappa nella pagina contatti.",
    ],
  },
  {
    title: "Conservazione dei dati",
    paragraphs: [
      "I dati sono conservati per il tempo strettamente necessario a gestire la richiesta ricevuta, a tutelare il titolare in caso di contestazioni e ad adempiere eventuali obblighi normativi applicabili.",
      "Il cookie tecnico dell'area admin ha una durata massima configurata di 30 giorni. I periodi di conservazione interni piu puntuali potranno essere ulteriormente dettagliati dal titolare nelle procedure organizzative.",
    ],
  },
  {
    title: "Conferimento dei dati",
    paragraphs: [
      "Il conferimento dei dati contrassegnati come obbligatori nel form e necessario per poter inviare la richiesta di valutazione. Il mancato conferimento impedisce la presa in carico della richiesta.",
    ],
  },
  {
    title: "Diritti dell'interessato",
    paragraphs: [
      "L'interessato puo chiedere accesso, rettifica, cancellazione, limitazione del trattamento, opposizione e portabilita nei casi previsti dagli articoli 15 e seguenti del GDPR, oltre a proporre reclamo al Garante per la protezione dei dati personali.",
      `Per esercitare i diritti o richiedere chiarimenti e possibile contattare ${legalContact.controllerName} ai recapiti pubblicati, in particolare all'indirizzo email ${legalContact.email}.`,
    ],
  },
];

export const cookieSections: LegalSection[] = [
  {
    title: "Cosa usa oggi il sito",
    paragraphs: [
      "Alla data di ultimo aggiornamento di questa policy, il sito non utilizza cookie di profilazione, marketing o analytics di terze parti caricati automaticamente durante la normale navigazione pubblica.",
      "L'unico cookie identificato nel codice e un cookie tecnico necessario usato per l'autenticazione dell'area amministrativa.",
    ],
  },
  {
    title: "Cookie tecnico necessario",
    paragraphs: [
      "Il cookie tecnico viene impostato soltanto nell'area admin e serve a mantenere autenticata la sessione dell'utente autorizzato.",
    ],
    bullets: [
      "Nome: myzone_admin_session",
      `Fornitore: ${legalContact.controllerName}`,
      "Finalita: autenticazione e sicurezza dell'area amministrativa",
      "Durata massima: 30 giorni",
      "Base giuridica: interesse legittimo e necessita tecnica del servizio",
    ],
  },
  {
    title: "Contenuti esterni e link verso terze parti",
    paragraphs: [
      "Il sito contiene link esterni verso servizi di terze parti, come social network e mappe. Tali servizi possono trattare dati personali solo quando l'utente sceglie di visitarli o di caricare volontariamente il relativo contenuto esterno.",
      "La mappa presente nella pagina contatti non viene caricata automaticamente: il contenuto esterno viene mostrato solo su azione dell'utente.",
    ],
  },
  {
    title: "Gestione delle preferenze",
    paragraphs: [
      "Poiche allo stato attuale non risultano cookie opzionali attivi nel front-end pubblico, non e necessario un banner di consenso per analytics o marketing.",
      "Se in futuro verranno introdotti strumenti statistici o promozionali non strettamente necessari, questa cookie policy verra aggiornata e, se richiesto dalla normativa, verra raccolto il consenso prima dell'attivazione.",
    ],
  },
];

