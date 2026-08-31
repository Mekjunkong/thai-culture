import assert from 'node:assert/strict'

const origin = 'https://thai-culture-ruby.vercel.app'
function safeInternalPath(value) {
  if (!value) return '/learn'
  try {
    const url = new URL(value, origin)
    if (url.origin !== origin || !url.pathname.startsWith('/') || /\\/.test(value)) return '/learn'
    return `${url.pathname}${url.search}${url.hash}`
  } catch {
    return '/learn'
  }
}

for (const [value, expected] of [['/learn', '/learn'], ['/learn/week-1?from=login#top', '/learn/week-1?from=login#top'], ['https://thai-culture-ruby.vercel.app/learn', '/learn']]) {
  assert.equal(safeInternalPath(value), expected, `valid internal path rejected: ${value}`)
}
for (const value of ['//evil.example/path', '/\\evil.example', 'https://evil.example/path', 'javascript:alert(1)', null]) {
  assert.equal(safeInternalPath(value), '/learn', `unsafe path accepted: ${value}`)
}
console.log('Safe redirect checks passed')
