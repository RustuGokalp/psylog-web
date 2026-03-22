const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

/**
 * Thin wrapper around native fetch for use in React Server Components.
 *
 * - Resolves paths against NEXT_PUBLIC_API_URL
 * - Forwards Next.js fetch options (revalidate, tags) so ISR works correctly
 * - Returns null on any non-ok response or network error after logging
 * - Never throws — callers decide the fallback value
 */
export async function serverFetch<T>(
  path: string,
  options?: RequestInit & { next?: NextFetchRequestConfig }
): Promise<T | null> {
  const url = `${BASE_URL}${path}`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
      ...options,
    });

    if (!response.ok) {
      console.error(
        `[serverFetch] ${response.status} ${response.statusText} — ${url}`
      );
      return null;
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error(`[serverFetch] Network error — ${url}`, error);
    return null;
  }
}
