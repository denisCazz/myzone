"use server";

import { redirect } from 'next/navigation';
import { loginAdmin, logoutAdmin } from '@/lib/admin-auth';

type LoginState = {
  error: string;
};

export async function loginAction(_: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get('email') || '').trim();
  const password = String(formData.get('password') || '');

  if (!email || !password) {
    return { error: 'Inserisci email e password.' };
  }

  const result = await loginAdmin(email, password);
  if (!result.ok) {
    return { error: result.error };
  }

  redirect('/admin');
}

export async function logoutAction() {
  await logoutAdmin();
  redirect('/admin/login');
}
