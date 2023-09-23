import { SignIn } from './_components/SignIn';
import { getCurrentUserId } from '@/server/lib/currentUser';
import { redirect } from 'next/navigation';

export default function Page() {
  const currentUserId = getCurrentUserId();
  if (currentUserId !== null) {
    redirect('/mypage');
  }

  return <SignIn />;
}
