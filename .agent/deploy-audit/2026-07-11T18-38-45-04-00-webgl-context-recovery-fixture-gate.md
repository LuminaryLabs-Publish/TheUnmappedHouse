# Deploy Audit: WebGL Context Recovery Fixture Gate

**Timestamp:** `2026-07-11T18-38-45-04-00`

## Summary

Current validation syntax-checks JavaScript only. It does not create a WebGL renderer, force context loss, restore the context, verify resource rebuilds, inspect input suspension, measure resource counts, or acknowledge a recovered frame.

## Plan ledger

**Goal:** define pure, adapter, browser, and deployed-Page evidence required before context recovery is considered implemented.

- [x] Record current validation commands.
- [x] Define pure state-machine fixtures.
- [x] Define resource-generation and rollback fixtures.
- [x] Define browser context-loss/restore smoke requirements.
- [x] Define deployment evidence.
- [ ] Implement and run the gate.

## Existing validation

```txt
npm run check
  -> node --check src/aspect-frame.js
  -> node --check src/game.js
  -> node --check src/stage-kit.js
  -> node --check src/story-data.js
```

## Required pure fixtures

```txt
context-state-transition-table
loss-command-idempotency
context-generation-monotonicity
resource-generation-bound-to-context
stale-context-result-rejection
loss-suspends-ready-frame-admission
restore-success-requires-frame-ack
failed-restore-remains-non-ready
late-event-after-dispose-rejected
context-observation-detached-json-safe
context-journal-bounded
```

## Required resource fixtures

```txt
renderer-state-reinitialized
render-target-rebuilt
post-texture-rebound
stage-materials-ready
post-material-ready
stage-geometries-ready
hotspot-geometries-ready
complete-resource-registry-required
partial-resource-candidate-disposed
rollback-reports-every-resource-row
repeated-loss-restore-live-count-stable
```

## Required interaction fixtures

```txt
raycast-input-rejected-while-lost
stale-pre-loss-frame-rejected-after-restore
side-panel-policy-explicit-during-loss
continue-rejected-during-restore
completion-timeout-fenced
story-snapshot-preserved
first-post-recovery-command-cites-recovered-frame
```

## Required browser smoke

```txt
boot scene one and capture baseline frame/context/resource identities
force WebGL context loss through the browser extension path
verify context state becomes LOST and no ready frames commit
verify canvas input is fenced and story state does not advance
request or wait for restoration under the declared policy
verify context and resource generations advance once
verify renderer, target, post binding, stage resources and hotspots rebuild
verify first recovered frame cites current story, stage and surface identities
repeat loss/restore at least three times and compare live resource counts
lose context during resize
lose context during interlude
lose context during scene transition preparation
restore after page visibility change
verify late events after disposal are rejected
```

## Required deployed Pages evidence

```txt
commit SHA
route URL
browser and GPU/backend details
initial context/resource generations
loss event result
suspended capability list
rebuild result rows
rollback rows for injected failure
first recovered frame id
story/stage/surface/context parity record
resource counts before and after repeated cycles
bounded console log or artifact reference
```

## Recommended scripts

```txt
node scripts/validate-context-state.mjs
node scripts/validate-context-resource-generations.mjs
node scripts/validate-context-recovery-failures.mjs
node scripts/validate-context-input-admission.mjs
npm run check
```

Recommended aggregate:

```txt
npm run validate:webgl-context-recovery
```

## Completion boundary

Do not claim context-loss resilience, automatic recovery, restored input correctness, or recovered-frame parity until browser evidence proves a complete generation rebuild, stable story state, bounded resources, and one acknowledged visible recovered frame.
