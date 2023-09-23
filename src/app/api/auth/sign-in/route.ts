import { prisma } from '@/server/lib/prisma';
import { compare } from '@/server/lib/password';
import { createJwt } from '@/server/lib/jwt';
import { z } from 'zod';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';

export const runtime = 'nodejs';

const reqBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function POST(req: NextRequest) {
  const { email, password } = reqBodySchema.parse(await req.json());
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      passwordHash: true,
    },
  });
  if (user === null) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  const isPasswordCorrect = compare(password, user.passwordHash);
  if (!isPasswordCorrect) {
    return NextResponse.json(
      { message: 'Incorrect password' },
      { status: 401 },
    );
  }

  const jwt = createJwt({}, { subject: user.id });
  cookies().set('token', jwt, { httpOnly: true, secure: true });
  return NextResponse.json({ success: true });
}
