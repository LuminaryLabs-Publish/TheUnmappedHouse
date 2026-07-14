# Deploy audit: page lifecycle browser fixture gate

**Timestamp:** `2026-07-14T11-59-13-04-00`

## Summary

The repository exposes syntax checking but no executable browser lifecycle proof. Deployment confidence requires source and deployed-origin fixtures that exercise suspension and restoration.

## Plan ledger

**Goal:** block lifecycle-readiness claims until hidden-page, freeze, BFCache and resumed-frame matrices pass against source and deployed content.

- [x] Identify the current validation boundary.
- [x] Define required browser and deployed-origin cases.
- [x] Define evidence fields.
- [ ] Implement and execute fixtures.

## Current gate

```txt
npm run check
  -> node --check src/aspect-frame.js
  -> node --check src/game.js
  -> node --check src/stage-kit.js
  -> node --check src/story-data.js
```

This proves syntax only.

## Required fixture matrix

```txt
hide before first frame
hide during active RAF
hide before completion interlude timeout
hide after timeout scheduling
freeze and resume
pagehide persisted false
pagehide/pageshow persisted true
multiple hide/show cycles
restore with surviving WebGL context
restore with lost WebGL context
restore after viewport change
restore after storage mutation
stale interlude callback after scene change
duplicate lifecycle event delivery
superseded restore attempt
first resumed-frame timeout
source origin
production artifact origin
GitHub Pages origin
```

## Required evidence

```txt
platform event sequence
DocumentGeneration
LifecycleAttemptId
suspend and resume results
render lease retirement and adoption
clock policy and revision
pending timer receipts
story and scene revisions
renderer/context/target/viewport revisions
listener count or ownership proof
FirstResumedStageFrameAck
fallback visibility during failure
```

## Release claim boundary

Do not claim lifecycle safety, background efficiency, BFCache compatibility, duplicate-RAF prevention, restored interaction readiness or production readiness until the full matrix passes.