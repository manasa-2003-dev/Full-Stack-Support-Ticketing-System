import { SignJWT, jwtVerify, JWTPayload } from 'jose';
import { cookies } from 'next/headers';
import { logEvent } from '@/utils/sentry';

const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
const cookieName = 'auth-token';

// Define the expected payload type
export interface AuthPayload extends JWTPayload {
  userId: string; // Add any other fields if needed
}

// ✅ Sign JWT Token
export async function signAuthToken(payload: AuthPayload): Promise<string> {
  try {
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(secret);
    return token;
  } catch (error) {
    logEvent('Token signing failed', 'auth', { payload }, 'error', error);
    throw new Error('Token signing failed');
  }
}

// ✅ Verify JWT Token
export async function verifyAuthToken(token: string): Promise<AuthPayload> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as AuthPayload;
  } catch (error) {
    logEvent(
      'Token decryption failed',
      'auth',
      { tokenSnippet: token.slice(0, 10) },
      'error',
      error
    );
    throw new Error('Token decryption failed');
  }
}

// ✅ Set Auth Cookie
export async function setAuthCookie(token: string): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.set(cookieName, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
  } catch (error) {
    logEvent('Failed to set cookie', 'auth', { token }, 'error', error);
  }
}

// ✅ Get Auth Cookie
export async function getAuthCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  const token = cookieStore.get(cookieName);
  return token?.value;
}

// ✅ Remove Auth Cookie
export async function removeAuthCookie(): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(cookieName);
  } catch (error) {
    logEvent('Failed to remove the auth cookie', 'auth', {}, 'error', error);
  }
}