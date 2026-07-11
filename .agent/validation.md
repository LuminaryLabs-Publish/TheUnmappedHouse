# Validation: The Unmapped House

Timestamp: `2026-07-11T18-38-45-04-00`

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
context-state fixture: unavailable
context-loss admission fixture: unavailable
resource-generation fixture: unavailable
restore rollback fixture: unavailable
input-suspension fixture: unavailable
recovered-frame fixture: unavailable
repeated-cycle resource fixture: unavailable
repo-local docs pushed to main: yes
central ledger sync: complete after central update
central internal change log: complete after central update
```

## Plan ledger

**Goal:** define the executable evidence required before WebGL context loss, resource rebuilding, resumed interaction, and recovered-frame parity can be claimed.

- [x] Record the current syntax-only validation boundary.
- [x] Define context-state and generation fixtures.
- [x] Define resource rebuild, rollback, and stale-result fixtures.
- [x] Define interaction suspension and story-preservation fixtures.
- [x] Define browser and deployed-Page recovery evidence.
- [ ] Implement and execute the validation gate.

## Available validation

`npm run check` syntax-checks:

```txt
src/aspect-frame.js
src/game.js
src/stage-kit.js
src/story-data.js
```

It does not instantiate a WebGL renderer, force context loss, restore a context, rebuild GPU resources, inspect context generations, fence input, measure resource counts, or acknowledge a recovered visible frame.

## Required validation commands

```txt
node scripts/validate-context-state.mjs
node scripts/validate-context-resource-generations.mjs
node scripts/validate-context-recovery-failures.mjs
node scripts/validate-context-input-admission.mjs
node scripts/validate-context-observations.mjs
npm run check
```

Recommended aggregate:

```txt
npm run validate:webgl-context-recovery
```

## Required context-state rows

```txt
context-state-transition-table-valid
context-loss-command-idempotent
repeated-loss-does-not-advance-generation
restore-command-admitted-only-from-valid-state
context-generation-monotonic
resource-generation-bound-to-context-generation
ready-requires-complete-resource-registry
ready-requires-recovered-frame-ack
failed-and-disposed-never-report-ready
late-context-event-after-dispose-rejected
```

## Required loss and suspension rows

```txt
accepted-loss-suspends-ready-frame-commit
accepted-loss-preserves-story-snapshot
accepted-loss-preserves-stage-and-surface-descriptors
raycast-hover-rejected-while-lost
raycast-click-rejected-while-lost
side-panel-inspection-loss-policy-explicit
continue-rejected-while-lost-or-restoring
completion-timeout-fenced-during-loss
resize-observation-retained-without-resource-commit
reset-retry-dispose-capabilities-explicit
```

## Required resource-generation rows

```txt
renderer-state-reinitialized-for-candidate-generation
render-target-storage-rebuilt
post-material-rebound-to-rebuilt-target
stage-material-programs-ready
post-material-program-ready
stage-geometries-ready
hotspot-geometries-and-materials-ready
picking-set-revision-matches-stage
complete-resource-registry-required-before-commit
same-surface-revision-does-not-bypass-resource-rebuild
```

## Required failure and rollback rows

```txt
partial-renderer-rebuild-disposed
partial-target-rebuild-disposed
partial-material-rebuild-disposed
partial-scene-rebuild-disposed
failed-candidate-never-becomes-visible
stale-session-restore-result-rejected
stale-stage-restore-result-rejected
stale-surface-restore-result-rejected
newer-loss-supersedes-active-restore
rollback-reports-all-resource-rows
exhausted-recovery-policy-enters-failed
```

## Required recovered-frame rows

```txt
first-recovered-frame-has-story-revision
first-recovered-frame-has-stage-epoch
first-recovered-frame-has-surface-revision
first-recovered-frame-has-context-generation
first-recovered-frame-has-resource-generation
first-recovered-frame-has-target-generation
first-recovered-frame-has-hotspot-set-revision
first-recovered-frame-uses-rebuilt-post-target
first-post-recovery-input-cites-recovered-frame
second-frame-retains-active-generation
```

## Required repeated-cycle rows

```txt
three-loss-restore-cycles-complete
live-renderer-count-stable
live-target-count-stable
live-material-count-stable
live-geometry-count-stable
listener-count-stable
raf-chain-count-stable
context-journal-bounded
context-observation-detached-json-safe
```

## Browser matrix

```txt
Chrome current, WebGL2 available
Chrome current, WebGL1 fallback if supported
Firefox current
Safari current where extension-based loss is available
1280x720 DPR 1
1920x1080 DPR 2
3840x2160 DPR 2 under admitted surface policy
context loss during idle frame
context loss during resize
context loss during interlude delay
context loss during scene-transition preparation
context loss during page visibility change
context restore after repeated loss
context event after runtime disposal
```

## Browser smoke

```txt
boot and capture story, stage, surface, context, resource and frame identities
force WebGL context loss
verify context state becomes LOST
verify no ready frames commit while lost
verify render-dependent input is fenced
verify story snapshot does not advance from rejected input
restore context under the declared policy
verify context and resource generations advance exactly once
verify renderer, target, post binding, scene resources and hotspots rebuild
verify first recovered frame carries all active identities
verify hotspot input resumes only after recovered-frame acknowledgement
repeat loss/restore three times and compare live resource/listener counts
dispose the runtime and verify later context events are rejected
```

## Deployment evidence

```txt
commit SHA
GitHub Pages route URL
browser and GPU/backend details
initial context/resource generations
context-loss result
suspended capabilities
resource rebuild rows
rollback rows for injected failure
first recovered frame id
story/stage/surface/context parity record
resource counts before and after repeated cycles
bounded logs or artifact references
```

## Validation claim

This pass documents the proof surface for context state, context/resource generations, render suspension, input fencing, complete resource rebuilding, rollback, stale-result rejection, story preservation, repeated-cycle resource bounds, and recovered-frame correlation. It does not claim those runtime authorities or fixtures are implemented.
