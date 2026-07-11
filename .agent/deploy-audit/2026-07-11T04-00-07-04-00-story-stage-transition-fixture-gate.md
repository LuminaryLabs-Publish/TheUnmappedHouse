# Deploy audit: story-stage transition fixture gate

Timestamp: `2026-07-11T04-00-07-04-00`

## Current validation

```txt
npm run check
  -> syntax-check src/aspect-frame.js
  -> syntax-check src/game.js
  -> syntax-check src/stage-kit.js
  -> syntax-check src/story-data.js
```

This does not exercise a transition, stage failure, save failure, rollback, first-frame acknowledgement or resource retirement.

## Required Node fixture gate

```txt
node scripts/validate-story-phase-recovery.mjs
node scripts/validate-continue-admission.mjs
node scripts/validate-stage-preparation.mjs
node scripts/validate-story-stage-transition.mjs
node scripts/validate-transition-rollback.mjs
node scripts/validate-stage-resource-retirement.mjs
node scripts/validate-first-frame-ack.mjs
```

Wire these into `npm run check` after syntax validation.

## Blocking rows

```txt
invalid-scene-descriptor-rejected-before-live-clear
prepare-failure-preserves-prior-stage
save-failure-discards-prepared-stage
commit-failure-rolls-back-story-and-stage
accepted-transition-correlates-story-save-stage-frame
first-frame-timeout-is-observable
prior-stage-disposed-after-first-frame-only
repeated-continue-cannot-skip-scene
terminal-transition-is-idempotent
transition-journal-is-json-safe-and-bounded
```

## Browser smoke

```txt
1. complete scene one
2. inject a stage-preparation failure and press Continue
3. verify scene one, interlude and save remain committed
4. remove the fault and Continue once
5. verify scene two appears and reports one transition id
6. reload and verify scene two
7. repeat with storage write failure
8. complete all scenes and verify terminal reload
9. inspect resource counts across all transitions
10. dispose and remount with one canvas, RAF and listener set
```

## Deployment invariants

- Pushes remain direct to `main`.
- No branch or pull request path is introduced.
- Story descriptors, copy, framing, shaders and pacing remain unchanged.
- A failed transition fixture blocks deployment.
- Diagnostics expose ids, counts and results, not DOM or Three.js objects.

## Current status

```txt
runtime source changed: no
package scripts changed: no
workflow changed: no
transition fixtures: absent
browser transition smoke: absent
Pages behavior changed: no
```