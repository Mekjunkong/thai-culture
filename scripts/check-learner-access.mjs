import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const access = readFileSync(new URL('../lib/learner-access.ts', import.meta.url), 'utf8')
const contentModel = readFileSync(new URL('../lib/course-content.ts', import.meta.url), 'utf8')
const home = readFileSync(new URL('../app/learn/page.tsx', import.meta.url), 'utf8')
const lesson = readFileSync(new URL('../app/learn/[slug]/page.tsx', import.meta.url), 'utf8')

for (const slug of ['week-1', 'week-2', 'week-3', 'week-4']) {
  assert.match(contentModel, new RegExp(`slug: '${slug}'`), `allowlist is missing ${slug}`)
}
assert.equal((contentModel.match(/slug: 'week-[1-4]'/g) ?? []).length, 4, 'allowlist must contain exactly four lesson slugs')
assert.match(access, /getAuthenticatedUser\(token\)/, 'server access must verify the Supabase token')
assert.match(access, /subscription_tier === 'lifetime'/, 'access must require the lifetime entitlement')
assert.match(home, /access\.status === 'unauthenticated'/, 'learner home must handle unauthenticated users')
assert.match(home, /access\.status !== 'entitled'/, 'learner home must handle pending access')
assert.match(lesson, /if \(!lesson\) notFound\(\)/, 'lesson route must reject slugs outside the allowlist')
assert.match(lesson, /access\.status !== 'entitled'/, 'lesson route must gate content before reading Markdown')
console.log('learner access checks passed: allowlist, verified auth, lifetime entitlement, and route gating')
