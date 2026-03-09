import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/admin-auth';
import LoginForm from './LoginForm';

export default async function AdminLoginPage() {
  const session = await getAdminSession();

  if (session) {
    redirect('/admin');
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-6 font-bold text-xl">
            🔐
          </div>
          <h1 className="text-2xl font-bold text-secondary mb-2">Area Admin</h1>
          <p className="text-secondary/70">Accedi per gestire gli annunci immobiliari.</p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
