"use client";

import { Trash2 } from 'lucide-react';

type Props = {
  id: string;
  deleteAction: (formData: FormData) => Promise<void>;
};

export default function DeleteAnnuncioButton({ id, deleteAction }: Props) {
  return (
    <form action={deleteAction} className="ml-auto">
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        onClick={(e) => {
          if (!confirm('Eliminare questo annuncio?')) e.preventDefault();
        }}
        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 font-medium text-sm transition-colors"
      >
        <Trash2 className="w-4 h-4" />
        Elimina
      </button>
    </form>
  );
}
