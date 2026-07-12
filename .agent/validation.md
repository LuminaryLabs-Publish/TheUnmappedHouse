# Validation: The Unmapped House

Timestamp: `2026-07-12T00-01-25-04-00`

## Summary

This was a documentation-only Narrative Projection Authority audit. Runtime, gameplay, rendering, dependencies, package scripts and deployment configuration were not changed.

## Plan ledger

**Goal:** define executable evidence that proves narrative copy, story state, stage resources, hotspot lists, persistence and the first visible frame agree across inspection, completion, Continue, terminal and reload paths.

- [x] Record the current syntax-only validation boundary.
- [x] Define narrative source, revision, transition, persistence, accessibility and frame-correlation fixture rows.
- [x] Define a deployed browser smoke sequence.
- [x] Update `.agent/kit-registry.json` with the current and proposed kit inventory.
- [x] Push repo-local documentation to `main`.
- [x] Synchronize the central ledger and internal change log.
- [ ] Implement and execute the validation gate.

## This pass

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
routes changed: no
gameplay changed: no
rendering changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check: not run
browser smoke: not run
narrative projection fixture: unavailable
transition copy parity fixture: unavailable
reload policy fixture: unavailable
aria-live fixture: unavailable
first-frame acknowledgement fixture: unavailable
repo-local docs pushed to main: yes
central ledger sync: complete
central internal change log: complete
```

## Available validation

`npm run check` syntax-checks:

```txt
src/aspect-frame.js
src/game.js
src/stage-kit.js
src/story-data.js
```

It does not execute the story loop, click a hotspot, wait for completion, press Continue, inspect DOM copy, validate accessibility announcements or correlate a visible WebGL frame.

## Required commands

```txt
node scripts/validate-narrative-projection.mjs
node scripts/validate-narrative-transition-parity.mjs
node scripts/validate-narrative-persistence-policy.mjs
npm run check
```

Recommended aggregate:

```txt
npm run validate:narrative
```

## Required fixture rows

### Projection identity

```txt
projection-id-required
projection-revision-monotonic
scene-id-required
source-kind-supported
source-id-resolves
story-revision-required
dom-is-output-only
```

### Scene opening and inspection

```txt
boot-projects-initial-scene-opening
valid-saved-scene-projects-declared-restore-policy
inspection-result-projects-hotspot-copy
reinspection-is-idempotent-or-explicitly-revisioned
hotspot-copy-cites-scene-and-hotspot
stale-hotspot-result-rejected
```

### Completion and Continue

```txt
completion-proof-projects-interlude
continue-prepares-successor-opening
continue-retires-predecessor-hotspot-copy
continue-retires-predecessor-interlude
successor-title-body-stage-scene-match
successor-hotspot-list-scene-match
first-successor-frame-cites-narrative-revision
transition-failure-restores-predecessor-projection
```

### Terminal projection

```txt
terminal-result-projects-terminal-copy
terminal-projection-is-durable
terminal-continue-does-not-create-ordinary-successor
terminal-button-policy-explicit
```

### Persistence policy

```txt
canonical-scene-opening-policy-deterministic
exact-projection-policy-deterministic
unsupported-policy-rejected
saved-source-id-migrated-or-rejected
rejected-snapshot-not-overwritten
reload-and-in-session-transition-follow-declared-policy
```

### Accessibility and observation

```txt
aria-live-announces-committed-projection-only
stale-projection-not-announced
one-accepted-result-one-announcement
observation-detached-json-safe
journal-bounded
```

### Duplicate and stale work

```txt
duplicate-command-returns-cached-result
predecessor-session-projection-rejected
stale-story-revision-rejected
stale-scene-projection-rejected
rolled-back-projection-not-visible
```

## Browser smoke

```txt
clear storage
open deployed route
capture scene A title and opening body
inspect all scene A hotspots
wait for completion interlude
press Continue
capture the first scene B frame
verify scene B title, opening body, stage and hotspot list agree
repeat through scene C and terminal projection
reload each saved scene and verify the declared narrative persistence policy
capture narrative observation and visible-frame acknowledgement
```

## Deployment evidence

```txt
commit SHA
GitHub Pages route URL
browser and viewport
manifest fingerprint
snapshot revision
story revision
scene id
narrative projection id
narrative projection revision
narrative source kind
narrative source id
stage revision
hotspot-set revision
visible frame id
fixture artifact reference
```

## Validation claim

The proof surface is documented but not implemented. Do not claim narrative transition correctness, reload parity, accessibility announcement correctness or story-to-frame coherence until the fixture gate passes.
