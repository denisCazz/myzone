"use server";

import { revalidatePath } from 'next/cache';
import { requireAdminSession } from '@/lib/admin-auth';
import { getSupabaseAdminClient } from '@/lib/supabase-admin';
import { logoutAction as baseLogoutAction } from './login/actions';

export async function deleteAnnuncioAction(formData: FormData) {
  await requireAdminSession();

  const id = String(formData.get('id') || '');
  if (!id) {
    return;
  }

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return;
  }

  await supabase.from('annunci').delete().eq('id', id);
  revalidatePath('/admin');
  revalidatePath('/vetrina');
}

export async function logoutAction() {
  await baseLogoutAction();
}
