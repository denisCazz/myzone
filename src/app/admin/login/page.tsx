"use client";

import Link from 'next/link';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { loginAction } from './actions';

const initialState = { error: '' };

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`w-full inline-flex justify-center py-3 px-4 rounded-lg font-semibold text-white bg-primary hover:bg-primary/90 transition-colors ${pending ? 'opacity-70 cursor-not-allowed' : ''}`}
    >
      {pending ? 'Accesso in corso...' : 'Accedi'}
    </button>
  );
}

export default function AdminLoginPage() {
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <div className="min-h-screen bg-white py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-secondary mb-2">Area Admin</h1>
          <p className="text-secondary/75">Accedi per gestire gli annunci immobiliari.</p>
        </div>

        <div className="bg-white border border-primary/20 rounded-2xl shadow-sm p-8">
          <form action={formAction} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-secondary mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-3 py-2 border border-secondary/20 rounded-lg text-secondary bg-white placeholder:text-secondary/45 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-secondary mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-3 py-2 border border-secondary/20 rounded-lg text-secondary bg-white placeholder:text-secondary/45 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
              />
            </div>

            {state.error && (
              <p className="text-sm text-red-600">{state.error}</p>
            )}

            <SubmitButton />
          </form>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-secondary/80 hover:text-primary">
            Torna alla home
          </Link>
        </div>
      </div>
    </div>
  );
}
