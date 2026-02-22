-- Myzone - Schema Supabase per la vetrina annunci
-- Esegui questo script da Supabase SQL Editor

create extension if not exists pgcrypto;

create table if not exists public.annunci (
  id uuid primary key default gen_random_uuid(),
  titolo text not null check (char_length(trim(titolo)) > 0),
  descrizione text not null check (char_length(trim(descrizione)) > 0),
  prezzo numeric(12,2) not null check (prezzo > 0),
  mq integer,
  numero_stanze integer,
  immagine_url text,
  tipologia text,
  categoria text not null default 'RESIDENZIALE',
  tipologia_immobile text not null default 'IMMOBILE',
  tipo_contratto text not null default 'IN VENDITA' check (tipo_contratto in ('IN VENDITA', 'IN AFFITTO')),
  stato text not null default 'DISPONIBILE' check (stato in ('DISPONIBILE', 'IN TRATTATIVA', 'VENDUTO', 'AFFITTATO')),
  provincia text not null default 'CUNEO',
  comune text not null default 'Cavallermaggiore',
  indirizzo text not null default 'Via Roma 78',
  numero_locali integer not null default 0,
  superficie_mq integer not null default 0,
  piano text,
  bagni integer not null default 0,
  ape text,
  ipe numeric(10,2),
  riscaldamento text,
  tipo_riscaldamento text,
  sistema_radiante text,
  cucina text,
  box text,
  giardino boolean not null default false,
  terrazzo boolean not null default false,
  ascensore boolean not null default false,
  agenzia_nome text,
  agenzia_indirizzo text,
  agenzia_telefono text,
  agenzia_email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Migrazione compatibile per installazioni precedenti
alter table public.annunci add column if not exists categoria text not null default 'RESIDENZIALE';
alter table public.annunci add column if not exists tipologia_immobile text not null default 'IMMOBILE';
alter table public.annunci add column if not exists tipo_contratto text not null default 'IN VENDITA';
alter table public.annunci add column if not exists stato text not null default 'DISPONIBILE';
alter table public.annunci add column if not exists provincia text not null default 'CUNEO';
alter table public.annunci add column if not exists comune text not null default 'Cavallermaggiore';
alter table public.annunci add column if not exists indirizzo text not null default 'Via Roma 78';
alter table public.annunci add column if not exists numero_locali integer not null default 0;
alter table public.annunci add column if not exists superficie_mq integer not null default 0;
alter table public.annunci add column if not exists piano text;
alter table public.annunci add column if not exists bagni integer not null default 0;
alter table public.annunci add column if not exists ape text;
alter table public.annunci add column if not exists ipe numeric(10,2);
alter table public.annunci add column if not exists riscaldamento text;
alter table public.annunci add column if not exists tipo_riscaldamento text;
alter table public.annunci add column if not exists sistema_radiante text;
alter table public.annunci add column if not exists cucina text;
alter table public.annunci add column if not exists box text;
alter table public.annunci add column if not exists giardino boolean not null default false;
alter table public.annunci add column if not exists terrazzo boolean not null default false;
alter table public.annunci add column if not exists ascensore boolean not null default false;
alter table public.annunci add column if not exists agenzia_nome text;
alter table public.annunci add column if not exists agenzia_indirizzo text;
alter table public.annunci add column if not exists agenzia_telefono text;
alter table public.annunci add column if not exists agenzia_email text;

update public.annunci
set
  tipologia_immobile = case
    when tipologia_immobile = 'IMMOBILE' and tipologia is not null and tipologia not in ('vendita', 'affitto') then upper(tipologia)
    else tipologia_immobile
  end,
  tipo_contratto = case
    when tipo_contratto is null or tipo_contratto = '' then
      case when lower(coalesce(tipologia, 'vendita')) = 'affitto' then 'IN AFFITTO' else 'IN VENDITA' end
    else tipo_contratto
  end,
  numero_locali = case when numero_locali = 0 and coalesce(numero_stanze, 0) > 0 then numero_stanze else numero_locali end,
  superficie_mq = case when superficie_mq = 0 and coalesce(mq, 0) > 0 then mq else superficie_mq end;

create index if not exists annunci_tipologia_idx on public.annunci (tipologia);
create index if not exists annunci_prezzo_idx on public.annunci (prezzo);
create index if not exists annunci_created_at_idx on public.annunci (created_at desc);
create index if not exists annunci_contratto_idx on public.annunci (tipo_contratto);
create index if not exists annunci_stato_idx on public.annunci (stato);
create index if not exists annunci_comune_idx on public.annunci (comune);

create or replace function public.set_updated_at_annunci()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_annunci_updated_at on public.annunci;
create trigger trg_annunci_updated_at
before update on public.annunci
for each row
execute function public.set_updated_at_annunci();

alter table public.annunci enable row level security;

-- Lettura pubblica per la vetrina
drop policy if exists "annunci_select_public" on public.annunci;
create policy "annunci_select_public"
on public.annunci
for select
using (true);

-- Scrittura bloccata lato client (gestita da service role in area admin custom)
drop policy if exists "annunci_insert_authenticated" on public.annunci;
drop policy if exists "annunci_update_authenticated" on public.annunci;
drop policy if exists "annunci_delete_authenticated" on public.annunci;

-- Tabelle per autenticazione admin custom (senza Supabase Auth)
create table if not exists public.admin_utenti (
  id uuid primary key default gen_random_uuid(),
  email text unique not null check (char_length(trim(email)) > 3),
  nome text,
  password_hash text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.admin_sessioni (
  id uuid primary key default gen_random_uuid(),
  utente_id uuid not null references public.admin_utenti(id) on delete cascade,
  token_hash text not null unique,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

create index if not exists admin_sessioni_utente_idx on public.admin_sessioni (utente_id);
create index if not exists admin_sessioni_expires_idx on public.admin_sessioni (expires_at);

alter table public.admin_utenti enable row level security;
alter table public.admin_sessioni enable row level security;

-- Nessun accesso pubblico diretto a utenti/sessioni
drop policy if exists "admin_utenti_no_access" on public.admin_utenti;
create policy "admin_utenti_no_access"
on public.admin_utenti
for all
using (false)
with check (false);

drop policy if exists "admin_sessioni_no_access" on public.admin_sessioni;
create policy "admin_sessioni_no_access"
on public.admin_sessioni
for all
using (false)
with check (false);

-- Utente admin iniziale (password: admin123)
insert into public.admin_utenti (email, nome, password_hash)
values (
  'admin@myzone.casa',
  'Admin Myzone',
  crypt('admin123', gen_salt('bf'))
)
on conflict (email)
do nothing;

-- Dati demo opzionali
insert into public.annunci (titolo, descrizione, prezzo, mq, numero_stanze, immagine_url, tipologia)
values
  (
    'Trilocale luminoso in centro',
    'Appartamento ristrutturato, secondo piano, vicino ai servizi principali.',
    178000,
    92,
    3,
    'https://images.unsplash.com/photo-1494526585095-c41746248156',
    'vendita'
  ),
  (
    'Bilocale arredato con balcone',
    'Soluzione ideale per coppia o investimento, pronto da abitare.',
    680,
    58,
    2,
    'https://images.unsplash.com/photo-1501183638710-841dd1904471',
    'affitto'
  )
on conflict do nothing;

update public.annunci
set
  categoria = coalesce(categoria, 'RESIDENZIALE'),
  tipologia_immobile = case when tipologia_immobile = 'IMMOBILE' then 'APPARTAMENTO' else tipologia_immobile end,
  tipo_contratto = case when tipo_contratto = 'IN VENDITA' and lower(coalesce(tipologia, '')) = 'affitto' then 'IN AFFITTO' else tipo_contratto end,
  stato = coalesce(stato, 'DISPONIBILE')
where true;
