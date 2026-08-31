export const ACCESS_TOKEN_COOKIE = 'sb-access-token'

export function storeAccessToken(accessToken: string, expiresIn = 3600) {
  document.cookie = `${ACCESS_TOKEN_COOKIE}=${encodeURIComponent(accessToken)}; Path=/; Max-Age=${expiresIn}; SameSite=Lax${window.location.protocol === 'https:' ? '; Secure' : ''}`
}

export function clearAccessToken() {
  document.cookie = `${ACCESS_TOKEN_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax${window.location.protocol === 'https:' ? '; Secure' : ''}`
}
