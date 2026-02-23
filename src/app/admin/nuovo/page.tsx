import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { requireAdminSession } from '@/lib/admin-auth';
import AdminNewForm from './AdminNewForm';

export default async function NuovoAnnuncioPage() {
  await requireAdminSession();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/admin" className="inline-flex items-center gap-2 text-secondary/75 hover:text-primary mb-8 transition-colors font-medium text-sm">
          <ArrowLeft className="w-4 h-4" />
          Torna alla dashboard
        </Link>

        <AdminNewForm />
      </div>
    </div>
  );
}
