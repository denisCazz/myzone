# Guida Cloudflare R2 per MyZone

Questa guida spiega come configurare Cloudflare R2 per usare una galleria immagini multipla negli annunci della vetrina.

## 1. Cosa cambia nel progetto

Ogni annuncio ora salva:

- `immagine_url`: copertina principale
- `immagini_urls`: array completo delle immagini della galleria

L'admin può:

- caricare più file in un colpo solo
- incollare più URL, uno per riga
- rimuovere immagini già associate all'annuncio

La vetrina mostra un carousel pubblico sia nel dettaglio annuncio sia nelle card della galleria.

## 2. Prerequisiti Cloudflare

Serve un account Cloudflare con **R2** attivo.

Recupera questi dati:

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_R2_ACCESS_KEY_ID`
- `CLOUDFLARE_R2_SECRET_ACCESS_KEY`
- `CLOUDFLARE_R2_BUCKET_NAME`
- `CLOUDFLARE_R2_PUBLIC_URL`
- opzionale: `CLOUDFLARE_R2_PATH_PREFIX`

## 3. Creazione chiavi R2

In Cloudflare:

1. Vai in **R2**.
2. Apri **Manage R2 API Tokens**.
3. Crea una coppia di credenziali S3 compatibili.
4. Dai accesso in scrittura al bucket degli annunci.
5. Salva `Access Key ID` e `Secret Access Key`.

Usa quei valori in `CLOUDFLARE_R2_ACCESS_KEY_ID` e `CLOUDFLARE_R2_SECRET_ACCESS_KEY`.

## 4. URL pubblico del bucket

Apri il bucket R2 e abilita un URL pubblico.

Formato tipico:

- `https://pub-<hash>.r2.dev`

In alternativa puoi usare un dominio custom.

Configurazione consigliata:

```env
CLOUDFLARE_R2_BUCKET_NAME=annunci
CLOUDFLARE_R2_PUBLIC_URL=https://pub-<hash>.r2.dev
CLOUDFLARE_R2_PATH_PREFIX=annunci
```

Se non imposti `CLOUDFLARE_R2_PATH_PREFIX`, il progetto usa `annunci` come default.

## 5. Variabili ambiente

Aggiungi in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

CLOUDFLARE_ACCOUNT_ID=...
CLOUDFLARE_R2_ACCESS_KEY_ID=...
CLOUDFLARE_R2_SECRET_ACCESS_KEY=...
CLOUDFLARE_R2_BUCKET_NAME=annunci
CLOUDFLARE_R2_PUBLIC_URL=https://pub-<hash>.r2.dev
CLOUDFLARE_R2_PATH_PREFIX=annunci
```

## 6. Aggiornamento database

Esegui lo script aggiornato in [supabase/schema.sql](../supabase/schema.sql).

La migrazione:

- aggiunge `immagini_urls text[]`
- mantiene compatibilità con `immagine_url`
- copia la vecchia immagine singola dentro la nuova galleria, se serve

## 7. Come funziona il salvataggio immagini

Quando salvi un annuncio:

1. i file caricati dall'admin vengono inviati a Cloudflare R2
2. gli URL manuali vengono normalizzati
3. l'elenco finale viene salvato in `immagini_urls`
4. la prima immagine disponibile diventa `immagine_url`

Ordine finale usato dal progetto:

1. immagini già salvate e mantenute
2. URL manuali
3. nuovi upload R2

## 8. Limiti attuali

- massimo `12` immagini per annuncio
- formati supportati: JPG, PNG, WebP
- dimensione massima: `5MB` per file
- la rimozione da admin scollega l'immagine dall'annuncio, ma non cancella automaticamente il file remoto da R2

## 9. Verifica rapida

Dopo la configurazione:

1. avvia il progetto con `npm run dev`
2. entra in `/admin`
3. crea o modifica un annuncio
4. carica più immagini
5. controlla il carousel in `/vetrina` e nel dettaglio annuncio

## 10. File coinvolti

- [src/lib/cloudflare-images.ts](../src/lib/cloudflare-images.ts)
- [src/lib/annuncio-images.ts](../src/lib/annuncio-images.ts)
- [src/components/AnnuncioImagesField.tsx](../src/components/AnnuncioImagesField.tsx)
- [src/components/ImageCarousel.tsx](../src/components/ImageCarousel.tsx)
- [src/app/admin/nuovo/actions.ts](../src/app/admin/nuovo/actions.ts)
- [src/app/admin/modifica/[id]/actions.ts](../src/app/admin/modifica/[id]/actions.ts)
- [src/components/VetrinaFiltri.tsx](../src/components/VetrinaFiltri.tsx)
- [src/app/vetrina/[id]/page.tsx](../src/app/vetrina/[id]/page.tsx)

## 11. Consiglio operativo

Per contenere i costi e mantenere ordine:

- usa un solo bucket pubblico dedicato agli annunci
- comprimi le immagini prima del caricamento
- fai una revisione periodica delle immagini non più usate in R2
