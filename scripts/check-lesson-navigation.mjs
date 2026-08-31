import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const data = readFileSync('lib/learner-course.ts', 'utf8')
const progress = readFileSync('lib/learner-progress.ts', 'utf8')
const component = readFileSync('components/learner/LessonNavigation.tsx', 'utf8')

assert.match(data, /LEARNER_PROGRESS_KEY = 'tlcm-learner-course-progress'/)
assert.match(progress, /LEARNER_PROGRESS_KEY/)
assert.match(progress, /readLearnerProgress/)
assert.match(progress, /writeLearnerProgress/)
assert.match(progress, /setLearnerLessonStatus/)
assert.match(progress, /'not-started', 'in-progress', 'complete'/)
assert.match(component, /href="\/learn"/)
assert.match(component, /aria-label={`Week \$\{week\} lesson navigation`}/)
assert.match(component, /aria-pressed={isComplete}/)
assert.match(component, /min-h-11/)

for (let week = 1; week <= 4; week += 1) {
  const page = readFileSync(`app/lessons/week-${week}/page.tsx`, 'utf8')
  assert.match(page, /import LessonNavigation from '@\/components\/learner\/LessonNavigation'/)
  assert.ok(page.includes(`<LessonNavigation week={${week}} />`), `week ${week} uses shared navigation`)
  assert.ok(page.indexOf(`<LessonNavigation week={${week}} />`) > page.indexOf('<QuizBlock'), `week ${week} navigation follows quiz`)
}

assert.doesNotMatch(component, /mastery|passed|score/i)
console.log('Lesson navigation contract: 27 assertions passed')
