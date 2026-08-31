import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const contentModel = readFileSync(new URL('../lib/course-content.ts', import.meta.url), 'utf8')
const protectedRoute = readFileSync(new URL('../app/learn/[slug]/page.tsx', import.meta.url), 'utf8')
const previewRoutes = ['week-1', 'week-2', 'week-3', 'week-4'].map((slug) =>
  readFileSync(new URL(`../app/lessons/${slug}/page.tsx`, import.meta.url), 'utf8')
)

const markers = {
  'week-1': '## 2. The wai',
  'week-2': '## 7. Listening practice',
  'week-3': '## 5. Self-study roleplay cards',
  'week-4': '## 6. Graduation roleplay',
}

for (const [slug, fullOnlyMarker] of Object.entries(markers)) {
  const preview = readFileSync(new URL(`../content/lessons/${slug}/preview.md`, import.meta.url), 'utf8')
  const full = readFileSync(new URL(`../content/lessons/${slug}/full.md`, import.meta.url), 'utf8')
  assert.notEqual(preview, full, `${slug} preview and full content must differ`)
  assert.ok(preview.length < full.length, `${slug} preview must be shorter than full content`)
  assert.ok(full.includes(fullOnlyMarker), `${slug} full content is missing its full-only marker`)
  assert.ok(!preview.includes(fullOnlyMarker), `${slug} preview leaks full-only content`)
  assert.match(contentModel, new RegExp(`slug: '${slug}'`), `content model is missing ${slug}`)
}

assert.equal((contentModel.match(/slug: 'week-[1-4]'/g) ?? []).length, 4, 'content model must contain exactly four lesson slugs')
for (const route of previewRoutes) {
  assert.match(route, /getCourseContent\('week-[1-4]', 'preview'\)/, 'public lesson must read preview content')
  assert.doesNotMatch(route, /full\.md|fullSource|content\.md/, 'public lesson references full content')
}
assert.match(protectedRoute, /export const dynamic = 'force-dynamic'/, 'protected lessons must not be statically generated')
assert.match(protectedRoute, /if \(!lesson\) notFound\(\)/, 'lesson route must reject slugs outside the allowlist')
assert.match(protectedRoute, /access\.status !== 'entitled'/, 'lesson route must gate content before reading Markdown')
assert.ok(protectedRoute.indexOf("access.status !== 'entitled'") < protectedRoute.indexOf("getCourseContent(params.slug, 'full')"), 'full content read must follow entitlement gate')

console.log('course content checks passed: four previews, full-only markers, allowlist, public wiring, dynamic protected route, and access ordering')
