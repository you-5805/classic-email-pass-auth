'use client';

import Link from 'next/link';
import type { FormEvent } from 'react';

export function SignUp() {
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!(e.target instanceof HTMLFormElement)) return;

    const data = Object.fromEntries(new FormData(e.target).entries());
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const data = await res.json();
      if (data.code === 'email-already-exists') {
        alert('Email already been used. Please sign in');
        return;
      }
      alert('Failed to sign up');
    }
    alert('Verification mail has been sent to your email address');
  };

  return (
    <main className='mx-auto grid max-w-xl gap-4 p-2'>
      <form onSubmit={onSubmit} className='grid gap-4'>
        <h1 className='text-2xl font-bold'>Sign up</h1>
        <label className='grid gap-1'>
          <span className='text-lg font-bold'>Email</span>
          <input
            type='email'
            name='email'
            className='rounded-md border border-neutral-700 p-1.5'
            placeholder='your.email@example.com'
          />
        </label>
        <label className='grid gap-1'>
          <span className='text-lg font-bold'>Password</span>
          <input
            type='password'
            name='password'
            className='rounded-md border border-neutral-700 p-1.5'
          />
        </label>
        <button
          type='submit'
          className='rounded-md bg-indigo-600 py-2 font-bold text-white transition-colors hover:bg-indigo-700'
        >
          Submit
        </button>
      </form>

      <p>
        Already have an account?
        <Link
          href='/sign-in'
          className='pl-2 font-bold text-indigo-800 hover:underline'
        >
          Sign in
        </Link>
      </p>
    </main>
  );
}
