import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const page = readFileSync('app/learn/page.tsx', 'utf8')
const hub = readFileSync('components/learner/LearnerHub.tsx', 'utf8')
const data = readFileSync('lib/learner-course.ts', 'utf8')
const navbar = readFileSync('components/ui/Navbar.tsx', 'utf8')

assert.match(page, /<LearnerHub \/>/)
assert.match(page, /canonical: '\/learn'/)
assert.match(hub, /'use client'/)
assert.match(hub, /window\.localStorage/)
assert.match(hub, /Continue with Week \{nextLesson\.week\}/)
assert.match(hub, /Not started/)
assert.match(hub, /In progress/)
assert.match(hub, /Complete/)
assert.match(hub, /href="\/practice"/)
assert.match(hub, /href="\/missions"/)
assert.doesNotMatch(hub, /href="\/book/)
assert.match(data, /LEARNER_PROGRESS_KEY/)
assert.match(data, /Greetings & Politeness Particles/)
assert.match(data, /Numbers, Prices, Colors & Everyday Objects/)
assert.match(data, /Ordering Food, Coffee & Spice Levels/)
assert.match(data, /Transport, Temples, Markets & Local Etiquette/)
assert.match(data, /Reviewed MP3 tracks available/)
assert.match(data, /Reviewed recording not available yet/)
assert.match(navbar, /href: '\/learn', label: 'Learning hub'/)

console.log('Learning hub contract: 19 assertions passed')
