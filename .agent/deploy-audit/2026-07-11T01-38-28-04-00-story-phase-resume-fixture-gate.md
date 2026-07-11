# Deploy audit: story phase resume fixture gate

Timestamp: `2026-07-11T01-38-28-04-00`

## Current gate

```txt
npm run check
  -> node --check src/aspect-frame.js
  -> node --check src/game.js
  -> node --check src/stage-kit.js
  -> node --check src/story-data.js
```

The deployment gate proves syntax only. It does not prove phase transitions, reload recovery, timer ownership, Continue admission, terminal persistence or stage correlation.

## Required Node fixture gate

```txt
node scripts/validate-story-source.mjs
node scripts/validate-save-reconciliation.mjs
node scripts/validate-story-phase-recovery.mjs
node scripts/validate-interlude-timer.mjs
node scripts/validate-continue-admission.mjs
node scripts/validate-terminal-reload.mjs
node scripts/validate-phase-stage-correlation.mjs
```

Wire all fixtures into `npm run check` before the Pages artifact is accepted.

## Minimum blocking cases

```txt
completed-scene-reload-cannot-strand
pending-interlude-reloads-with-remaining-delay
ready-interlude-reloads-open
stale-timer-cannot-open-overlay
Continue-before-open-rejected
Continue-open-accepted-exactly-once
duplicate-Continue-idempotent
transition-failure-retains-prior-committed-scene
terminal-state-reloads-terminal
phase-journal-json-safe-and-bounded
```

## Browser smoke

```txt
1. start fresh scene one
2. complete it and reload immediately before 450 ms
3. verify the interlude opens after only the remaining delay
4. reload while the interlude is open
5. Continue exactly once and verify scene two
6. attempt stale timer and stale Continue inputs
7. reset during pending interlude and verify no stale overlay
8. complete all scenes and persist terminal state
9. reload and verify terminal projection
10. remount and verify one RAF, one timer set and one listener set
```

## Deployment invariants

- No branch or pull request deployment path is introduced.
- GitHub Pages continues to deploy from `main`.
- Story content, shader output, framing and pacing remain unchanged.
- A behavioral fixture failure blocks deployment.
- Diagnostics contain no DOM nodes or raw Three.js objects.

## Current status

```txt
runtime source changed: no
workflow changed: no
package scripts changed: no
phase fixtures: absent
browser reload smoke: absent
Pages behavior changed: no
```
