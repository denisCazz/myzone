## MyZone - Sito Agenzia Immobiliare

Progetto Next.js (App Router) con Tailwind CSS, database Supabase e upload immagini su Cloudflare R2 per la gestione degli annunci immobiliari.

## Avvio locale

1. Installa dipendenze:

```bash
npm install
```

2. Crea il file ambiente:

```bash
cp .env.example .env.local
```

3. Inserisci in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
CLOUDFLARE_ACCOUNT_ID=...
CLOUDFLARE_R2_ACCESS_KEY_ID=...
CLOUDFLARE_R2_SECRET_ACCESS_KEY=...
CLOUDFLARE_R2_BUCKET_NAME=...
CLOUDFLARE_R2_PUBLIC_URL=https://pub-<hash>.r2.dev
SMTP_HOST=...
SMTP_PORT=587
SMTP_USER=...
SMTP_PASS=...
SMTP_FROM=...
CONTACT_EMAIL=...
```

4. Avvia il progetto:

```bash
npm run dev
```

## Setup Supabase (schema annunci)

1. Apri Supabase SQL Editor.
2. Esegui lo script in [supabase/schema.sql](supabase/schema.sql).
3. Verifica che la tabella `public.annunci` sia stata creata.

## Setup immagini con Cloudflare R2

1. Crea un bucket **R2** nel tuo account Cloudflare.
2. Recupera il tuo `Account ID` dalla dashboard Cloudflare.
3. Crea delle **API Tokens / R2 API Keys** con permessi di scrittura sul bucket.
4. Rendi pubblico il bucket tramite dominio `r2.dev` o dominio custom.
5. Inserisci in `.env.local`:

```env
CLOUDFLARE_ACCOUNT_ID=...
CLOUDFLARE_R2_ACCESS_KEY_ID=...
CLOUDFLARE_R2_SECRET_ACCESS_KEY=...
CLOUDFLARE_R2_BUCKET_NAME=...
CLOUDFLARE_R2_PUBLIC_URL=https://pub-<hash>.r2.dev
```

Formati supportati: JPG, PNG, WebP (max 5MB per file).

Guida completa: [docs/cloudflare-images-guide.md](docs/cloudflare-images-guide.md).

Campi principali:

- `id`
- `titolo`
- `descrizione`
- `prezzo`
- `mq`
- `numero_stanze`
- `immagine_url`
- `immagini_urls`
- `tipologia` (`vendita` / `affitto`)

## Note

- La pagina [src/app/vetrina/page.tsx](src/app/vetrina/page.tsx) recupera gli annunci tramite Server Component.
- Se le variabili Supabase mancano, la pagina mostra un messaggio di configurazione.
- Le immagini remote degli annunci sono renderizzate con `unoptimized`.
- La vetrina usa una galleria carousel con supporto a più immagini per annuncio.
- Il form [src/app/(vendo-casa)/valuta-casa/page.tsx](src/app/(vendo-casa)/valuta-casa/page.tsx) invia email tramite [src/app/api/valuta-casa/route.ts](src/app/api/valuta-casa/route.ts).

## Area Admin (auth custom)

- Accesso da footer: `Accesso Admin`.
- Login page: `/admin/login`.
- Autenticazione basata su tabelle custom:
	- `admin_utenti`
	- `admin_sessioni`
- Utente iniziale creato dallo schema SQL:
	- email: `admin@myzone.casa`
	- password: `admin123`

Importante: cambia password subito dopo il primo accesso aggiornando `password_hash` con hash bcrypt.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
