import { verifyJwt } from './jwt';
import { prisma } from './prisma';
import { cookies } from 'next/headers';

export function getCurrentUserId() {
  const token = cookies().get('token');
  if (token === undefined) {
    return null;
  }

  const { sub } = verifyJwt(token.value);
  if (typeof sub !== 'string') {
    return null;
  }

  return sub;
}

export async function getCurrentUser() {
  const userId = getCurrentUserId();
  if (userId === null) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      displayId: true,
      displayName: true,
    },
  });
  return user;
}
