import { prisma } from '@/server/lib/prisma';
import { hashPassword } from '@/server/lib/password';
import { sendMail } from '@/server/lib/sendMail';
import { z } from 'zod';
import { NextResponse, type NextRequest } from 'next/server';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import crypto from 'node:crypto';

export const runtime = 'nodejs';

const reqBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

export async function POST(req: NextRequest) {
  try {
    const { email, password } = reqBodySchema.parse(await req.json());
    const passwordHash = hashPassword(password);
    const result = await prisma.$transaction(async ($tx) => {
      const user = await $tx.user.create({
        data: {
          email,
          passwordHash,
        },
        select: {
          id: true,
          email: true,
        },
      });
      const tomorrow = getTommorow();
      const token = generateToken();
      const emailVerificationIntent = await $tx.emailVerificationIntents.create(
        {
          data: {
            userId: user.id,
            expiresAt: tomorrow,
            token,
          },
        },
      );
      await sendMail({
        to: email,
        subject: 'Test mail!',
        html: `<main>
<h1 className="font-bold text-4xl">Email Verification</h1>
<p>Please verify your email by clicking the link below.</p>
<a href="http://localhost:3000/api/auth/verify-email/${emailVerificationIntent.id}?token=${emailVerificationIntent.token}">
http://localhost:3000/api/auth/verify-email/${emailVerificationIntent.id}?token=${emailVerificationIntent.token}
</a>
</main>`,
      });
      return user;
    });

    return NextResponse.json({ user: result }, { status: 201 });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        return NextResponse.json(
          { message: 'Email already exists', code: 'email-already-exists' },
          { status: 400 },
        );
      }
    }

    throw err;
  }
}

function generateToken() {
  return crypto
    .randomBytes(Math.ceil(32 / 2))
    .toString('hex')
    .slice(0, 32);
}

function getTommorow() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date;
}
