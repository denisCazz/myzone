import 'server-only';

import { compare } from 'bcryptjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createHash, randomUUID } from 'crypto';
import { getSupabaseAdminClient, getSupabaseAdminConfigStatus } from './supabase-admin';

const SESSION_COOKIE_NAME = 'myzone_admin_session';
const SESSION_TTL_DAYS = 7;

function hashToken(token: string) {
  return createHash('sha256').update(token).digest('hex');
}

export async function getAdminSession() {
  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return null;
  }

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionToken) {
    return null;
  }

  const { data: sessionRow } = await supabase
    .from('admin_sessioni')
    .select('id, utente_id, expires_at, admin_utenti(id, email, nome, is_active)')
    .eq('token_hash', hashToken(sessionToken))
    .single();

  if (!sessionRow) {
    return null;
  }

  const isExpired = new Date(sessionRow.expires_at).getTime() <= Date.now();
  const user = Array.isArray(sessionRow.admin_utenti)
    ? sessionRow.admin_utenti[0]
    : sessionRow.admin_utenti;

  if (isExpired || !user || !user.is_active) {
    await supabase.from('admin_sessioni').delete().eq('id', sessionRow.id);
    cookieStore.delete(SESSION_COOKIE_NAME);
    return null;
  }

  return {
    sessionId: sessionRow.id,
    user: {
      id: user.id,
      email: user.email,
      nome: user.nome,
    },
  };
}

export async function requireAdminSession() {
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }
  return session;
}

export async function loginAdmin(email: string, password: string) {
  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    const status = getSupabaseAdminConfigStatus();
    if (!status.hasServiceRoleKey) {
      return { ok: false, error: 'Configurazione mancante: imposta SUPABASE_SERVICE_ROLE_KEY in .env.local e riavvia il server.' };
    }
    if (!status.hasUrl) {
      return { ok: false, error: 'Configurazione mancante: imposta NEXT_PUBLIC_SUPABASE_URL in .env.local e riavvia il server.' };
    }
    return { ok: false, error: 'Configurazione server Supabase mancante.' };
  }

  const normalizedEmail = email.trim().toLowerCase();

  const { data: user } = await supabase
    .from('admin_utenti')
    .select('id, email, nome, password_hash, is_active')
    .eq('email', normalizedEmail)
    .single();

  if (!user || !user.is_active) {
    return { ok: false, error: 'Credenziali non valide.' };
  }

  const isValidPassword = await compare(password, user.password_hash);
  if (!isValidPassword) {
    return { ok: false, error: 'Credenziali non valide.' };
  }

  const rawToken = randomUUID() + randomUUID();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + SESSION_TTL_DAYS);

  const { error } = await supabase.from('admin_sessioni').insert({
    utente_id: user.id,
    token_hash: hashToken(rawToken),
    expires_at: expiresAt.toISOString(),
  });

  if (error) {
    return { ok: false, error: 'Impossibile creare la sessione admin.' };
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, rawToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: expiresAt,
  });

  return { ok: true, error: '' };
}

export async function logoutAdmin() {
  const supabase = getSupabaseAdminClient();
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (sessionToken && supabase) {
    await supabase
      .from('admin_sessioni')
      .delete()
      .eq('token_hash', hashToken(sessionToken));
  }

  cookieStore.delete(SESSION_COOKIE_NAME);
}
