# Deploy audit: screen-reader announcement fixture gate

**Timestamp:** `2026-07-14T22-01-31-04-00`  
**Status:** `audited`

## Plan ledger

**Goal:** require source, uploaded artifact and Pages behavior to preserve the same semantic announcement contract.

- [x] Inspect the static Pages workflow.
- [x] Confirm it uploads the repository root without a semantic accessibility test.
- [x] Define required browser fixtures.
- [ ] Execute them after implementation.

## Required fixtures

```txt
boot produces one scene-arrival message
first inspection produces one observation/clue message
re-read does not duplicate unrelated controls
completion produces one completion or interlude message
scene transition produces one successor-scene message
terminal state produces one terminal message
hotspot-list rebuild is not live-announced
debug JSON replacement is not live-announced
stale and duplicate announcements are rejected
source and Pages accessibility trees match
FirstSemanticAnnouncementAck is captured
```

The current workflow deploys static files from `main`; it does not build or test accessibility semantics.
