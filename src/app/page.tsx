import { SignUp } from './_components/SignUp';
import { getCurrentUserId } from '@/server/lib/currentUser';
import { redirect } from 'next/navigation';

export default function Page() {
  const currentUserId = getCurrentUserId();
  if (currentUserId !== null) {
    redirect('/mypage');
  }

  return <SignUp />;
}
