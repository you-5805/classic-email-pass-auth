import { getCurrentUser } from '@/server/lib/currentUser';
import { NextResponse } from 'next/server';

export async function GET() {
  const user = await getCurrentUser();
  return NextResponse.json({ user });
}
