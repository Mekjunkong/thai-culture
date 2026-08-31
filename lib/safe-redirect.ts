const DEFAULT_REDIRECT = '/learn'

/** Accept only same-origin absolute paths; reject protocol-relative/backslash tricks. */
export function safeInternalPath(value: string | null | undefined, origin: string): string {
  if (!value) return DEFAULT_REDIRECT
  try {
    const url = new URL(value, origin)
    if (url.origin !== origin || !url.pathname.startsWith('/') || /\\/.test(value)) return DEFAULT_REDIRECT
    return `${url.pathname}${url.search}${url.hash}`
  } catch {
    return DEFAULT_REDIRECT
  }
}