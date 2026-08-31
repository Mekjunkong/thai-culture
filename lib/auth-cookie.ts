export const ACCESS_TOKEN_COOKIE = 'sb-access-token'

export async function storeAccessToken(accessToken: string) {
  await fetch('/api/auth/session', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + accessToken },
  })
}

export async function clearAccessToken() {
  await fetch('/api/auth/session', { method: 'DELETE' })
}
