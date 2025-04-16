import { STORAGE_KEYS } from '@/constants/storage';

export async function getAccessTokenFromCookies() {
  if (typeof window !== 'undefined') return null;
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { cookies } = require('next/headers');
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(STORAGE_KEYS.accessToken)?.value;
  return accessToken;
}
