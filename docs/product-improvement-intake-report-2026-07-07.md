# Product improvement notes — intake + lesson report

Date: 2026-07-07

## Critique

The online and on-site products already had missions, a practice app, a workbook, and pricing. The missing product layer was the **service system** around the lesson:

1. Before booking, the student had no structured way to explain their level, location, goal, and situation.
2. After class, there was no tangible report showing what they learned, what was corrected, and what to do next.
3. On-site lessons need a physical/professional artifact after the lesson, not only a conversation.
4. Online lessons need a clear WhatsApp workflow so the student feels personally handled.

## Implemented upgrade

### 1. Student intake page

Route: `/book`

Purpose: create a clean WhatsApp booking message with:

- student name
- location
- online/on-site format
- Thai level
- main speaking goal
- real-life situations needed
- schedule
- notes

### 2. Lesson report template

Route: `/lesson-report`

Purpose: teacher can print or use after class to record:

- student/date/format/teacher
- mission and real-life outcome
- confidence before/after score
- phrase bank
- pronunciation corrections
- homework
- next mission recommendation
- next booking offer

## Why this improves the business

This changes the product from “Thai lesson website” into a clearer service experience:

- pre-lesson intake increases conversion and preparation quality
- after-lesson report increases perceived value
- homework creates retention
- next mission recommendation creates a natural upsell to Starter Pack or 5-Lesson Survival Path
