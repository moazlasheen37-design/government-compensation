/**
 * Submission service.
 *
 * No backend is connected yet. Until `VITE_API_URL` is configured, `submitRequest`
 * resolves with `{ status: 'not_connected' }` and NOTHING is stored or delivered —
 * the UI tells the user so and offers the official email/hotline instead.
 *
 * To connect a backend, set VITE_API_URL (e.g. in `.env`) to an endpoint that accepts
 * multipart/form-data POSTs at `${VITE_API_URL}/requests` and returns JSON { reference }.
 */
const API_URL = import.meta.env.VITE_API_URL;

export const isBackendConnected = () => Boolean(API_URL);

export async function submitRequest(kind, values, files = []) {
  if (!API_URL) {
    await new Promise((r) => setTimeout(r, 450)); // brief validation feedback
    return { status: 'not_connected' };
  }
  const body = new FormData();
  body.append('kind', kind);
  Object.entries(values).forEach(([k, v]) => body.append(k, v));
  files.forEach((f) => body.append('attachments', f));
  const res = await fetch(`${API_URL}/requests`, { method: 'POST', body });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  const data = await res.json().catch(() => ({}));
  return { status: 'sent', reference: data.reference };
}

/** Builds a mailto: URL so the user can send the validated request via the official email. */
export function buildMailto(email, subject, lines) {
  const body = lines.filter(Boolean).join('\n');
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
