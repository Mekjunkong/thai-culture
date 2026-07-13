# Decisions
| Date | Decision | Reason |
|------|----------|--------|
| 2026-07-11 | Neural TTS at build time now, teacher recordings swap later (--local-only) | Ship without recording sessions; same file layout |
| 2026-07-11 | Visual pitch overlay + gentle hint, no numeric scores | Contour scoring across voices is error-prone; wrong "fail" damages trust |
| 2026-07-11 | Full 100+ item curriculum in v1 (ended up 119) | User choice; TTS makes volume cheap |
| 2026-07-12 | Azure pronunciation assessment ruled out | No Thai support; Thai STT intelligibility check is a future extension |
| 2026-07-13 | Defer audio generation; PR opened without it | No Azure key yet; drills degrade silent, deploy held |
