import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;

export async function authMiddleware(req: NextRequest) {
  if (!secret) {
    throw new Error('NEXTAUTH_SECRET is not set');
  }

  try {
    const session = await getToken({ req, secret });
    if (!session) {
      throw new Error('No session found');
    }
    return session as any; //TODO: Fix this any
  } catch (error) {
    console.error('Authentication error:', error);
    throw new Error('Unauthorized');
  }
}
