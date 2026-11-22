import { createClient } from '@supabase/supabase-js';

const projectUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const publicKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();
const configuredApi = import.meta.env.VITE_VUE_ANSWER_API_URL?.trim();
const apiUrl = validateApiUrl(
  configuredApi || (import.meta.env.DEV ? 'http://localhost:8787' : '')
);
export const codeQaAuth =
  apiUrl && projectUrl && publicKey
    ? createClient(projectUrl, publicKey, { auth: { flowType: 'pkce' } })
    : null;

function validateApiUrl(value) {
  try {
    const url = new URL(value);
    if (url.username || url.password || url.search || url.hash) return null;
    const local = ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname);
    if (!import.meta.env.DEV && local) return null;
    if (url.protocol === 'https:' || (import.meta.env.DEV && local && url.protocol === 'http:')) {
      const path = url.href.replace(/\/$/, '');
      return url.pathname.replace(/\/$/, '').endsWith('/vue-answers')
        ? path
        : `${path}/api/vue-answers`;
    }
  } catch {
    return null;
  }
  return null;
}

async function requestCodeAnswers(accessToken, { method, id, signal } = {}) {
  const headers = { Authorization: `Bearer ${accessToken}` };
  if (new URL(apiUrl).origin === new URL(projectUrl).origin) headers.apikey = publicKey;
  const url = id ? `${apiUrl}/${encodeURIComponent(id)}` : apiUrl;
  const response = await fetch(url, {
    method,
    headers,
    cache: 'no-store',
    redirect: 'error',
    signal
  });
  if (response.status === 401)
    throw new Error('로그인 세션을 확인할 수 없습니다. 다시 로그인해 주세요.');
  return response;
}

export async function listCodeAnswers(accessToken, signal) {
  const response = await requestCodeAnswers(accessToken, { signal });
  if (!response.ok) throw new Error('답변을 불러오지 못했습니다. 다시 시도해 주세요.');
  const { items } = await response.json();
  return [...items].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
}

export async function deleteCodeAnswer(accessToken, id) {
  const response = await requestCodeAnswers(accessToken, {
    method: 'DELETE',
    id,
    signal: AbortSignal.timeout(10000)
  });
  if (!response.ok) throw new Error('답변을 삭제하지 못했습니다. 다시 시도해 주세요.');
}
