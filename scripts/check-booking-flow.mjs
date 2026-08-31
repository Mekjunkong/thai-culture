import { readFile } from 'node:fs/promises'

const intake = await readFile(new URL('../app/book/IntakeForm.tsx', import.meta.url), 'utf8')
const page = await readFile(new URL('../app/book/page.tsx', import.meta.url), 'utf8')

const checks = [
  ['server passes the course variant', page.includes('<IntakeForm courseRequest={isCourseRequest} />')],
  ['variant is not discovered only after hydration', !intake.includes('new URLSearchParams(window.location.search)')],
  ['course form uses a submit handler', intake.includes('onSubmit={handleSubmit}')],
  ['course required fields use native constraints', intake.includes('required={courseRequest}')],
  ['invalid course submissions are blocked', intake.includes('event.preventDefault()') && intake.includes('event.currentTarget.checkValidity()')],
  ['WhatsApp handoff remains external', intake.includes('window.open(`https://wa.me/')],
]

const failed = checks.filter(([, passed]) => !passed)
for (const [label, passed] of checks) console.log(`${passed ? 'PASS' : 'FAIL'} ${label}`)
if (failed.length) process.exit(1)