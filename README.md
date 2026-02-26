## MyZone - Sito Agenzia Immobiliare

Progetto Next.js (App Router) con Tailwind CSS e integrazione Supabase per la gestione degli annunci immobiliari.

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

## Setup Supabase Storage (upload immagini)

Per caricare le immagini degli annunci dal PC:

1. Vai su **Supabase Dashboard** → **Storage**.
2. Clicca **New bucket**.
3. Nome bucket: `annunci-images`.
4. Imposta **Public bucket** (le immagini saranno accessibili pubblicamente).
5. Clicca **Create bucket**.
6. Nella policy del bucket, assicurati che il service role possa scrivere (di default con service role key l’upload funziona).

Formati supportati: JPG, PNG, WebP (max 5MB).

Campi principali:

- `id`
- `titolo`
- `descrizione`
- `prezzo`
- `mq`
- `numero_stanze`
- `immagine_url`
- `tipologia` (`vendita` / `affitto`)

## Note

- La pagina [src/app/vetrina/page.tsx](src/app/vetrina/page.tsx) recupera gli annunci tramite Server Component.
- Se le variabili Supabase mancano, la pagina mostra un messaggio di configurazione.
- Le immagini remote degli annunci sono renderizzate con `unoptimized`.
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
