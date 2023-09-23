'use client';

import { useRouter } from 'next/navigation';
import useSWR from 'swr';

export function MyPage() {
  const router = useRouter();

  const { data: profile } = useSWR<{
    user: {
      id: string;
      displayName: string;
      displayId: string;
    };
  }>('/api/me');

  const signOut = async () => {
    await fetch('/api/auth/sign-out', { method: 'POST' });
    router.push('/');
  };

  return (
    <main className='mx-auto grid max-w-xl gap-4 p-2'>
      <h1 className='text-2xl font-bold'>Profile</h1>

      {profile === undefined ? (
        <p>loading...</p>
      ) : (
        <div>
          <p>id: {profile.user.id}</p>
          <p>display name: {profile.user.displayName}</p>
          <p>display id: {profile.user.displayId}</p>
        </div>
      )}

      <button
        type='button'
        onClick={signOut}
        className='rounded-md bg-rose-600 py-2 font-bold text-white transition-colors hover:bg-rose-700'
      >
        Sign Out
      </button>
    </main>
  );
}
