import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { requireAdminSession } from '@/lib/admin-auth';
import AdminNewForm from './AdminNewForm';

export default async function NuovoAnnuncioPage() {
  await requireAdminSession();

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/admin" className="inline-flex items-center text-secondary hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Torna alla dashboard
        </Link>

        <AdminNewForm />
      </div>
    </div>
  );
}
