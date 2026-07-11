# Project breakdown: The Unmapped House

Timestamp: `2026-07-11T01-38-28-04-00`

## Goal

Document the full runtime, interaction, domain and kit surface, then define the smallest safe authority boundary that prevents completed scenes from becoming unrecoverable after reload and prevents stale or wrong-phase Continue/timer effects.

## Selection result

The accessible `LuminaryLabs-Publish` organization inventory contains ten repositories. `TheCavalryOfRome` was excluded. All nine eligible repositories were centrally tracked and had root `.agent` state. `ZombieOrchard` was receiving active same-minute documentation writes, so `TheUnmappedHouse` was selected as the oldest stable eligible fallback. No other product repository was changed.

## Interaction loop

```txt
boot
  -> read and shallow-merge save
  -> resolve scene
  -> construct StageKit and begin RAF
  -> load scene and project UI

inspect
  -> side-panel button or stage raycast
  -> inspectHotspot(hotspot)
  -> mutate inspection/clue/log state
  -> derive scene completion
  -> optionally schedule 450 ms timer
  -> project story/debug UI
  -> write localStorage

interlude
  -> timer callback opens DOM overlay
  -> Continue directly invokes nextScene()
  -> mutate scene/route
  -> hide overlay
  -> replace live StageKit scene
  -> project UI
  -> write localStorage

terminal
  -> final Continue changes interlude copy only

reset
  -> remove localStorage key
  -> reload page
```

## Domains in use

```txt
browser shell and fixed-aspect layout
story source, scene, hotspot and clue identity
mutable story, inspection, clue, route and notebook state
scene completion policy
implicit story-phase policy
interlude timer and DOM projection
Continue and terminal projection
side-panel, raycast and keyboard input
localStorage read/write/clear effects
story and debug DOM projection
Three.js CDN and stage render host
scene descriptor consumption
anime shader materials and post processing
hotspot volumes, picking and hover
camera parallax and render-target composition
scene replacement and GPU resource lifecycle
RAF and browser listener lifecycle
syntax validation and Pages deployment
repo-local and central documentation ledgers
```

## Implemented kits

```txt
static-page-shell-kit
aspect-frame-kit
story-data-kit
browser-story-runtime-kit
clue-ledger-kit
inspection-ledger-kit
notebook-log-kit
scene-route-kit
interlude-timer-kit
terminal-route-kit
localstorage-save-kit
stage-render-kit
scene-descriptor-consumer-kit
anime-material-kit
post-process-kit
hotspot-volume-kit
hotspot-picking-kit
camera-parallax-kit
render-target-composition-kit
debug-json-projection-kit
package-syntax-check-kit
static-pages-deploy-kit
repo-local-agent-ledger-kit
central-ledger-sync-kit
```

## Services offered

```txt
fixed 16:9 presentation shell
authored scene, hotspot, clue, camera, stage, shader and post descriptors
hotspot inspection and clue granting
inspection, route and notebook ledgers
derived scene completion
450 ms delayed interlude display
Continue route advancement and prototype terminal copy
browser save load/write/clear
Three.js scene construction, raycast picking, parallax and post processing
syntax-only package validation
static GitHub Pages deployment
audit routing and central tracking
```

## Main finding

The player-visible phase is not represented in saved state.

```txt
clues[] prove completion
setTimeout implies interlude_pending
DOM class implies interlude_open
currentScene mutation implies transitioning
DOM copy implies terminal
```

Reloading a completed scene restores the clues and inspected rows but neither opens nor reschedules the interlude. Since every hotspot is already inspected, the re-read branch cannot trigger completion again. The Continue control remains hidden and progression can be permanently stranded.

`nextScene()` has no phase, completion, scene or save-revision guard. The timer has no retained id, deadline, target scene or epoch and closes over mutable `currentScene`. Final completion is not persisted.

## Candidate kits

```txt
versioned-save-envelope-kit
save-reconciliation-kit
story-phase-state-machine-kit
scene-completion-proof-kit
interlude-deadline-kit
interlude-timer-adapter-kit
interlude-resume-kit
continue-command-kit
continue-admission-kit
continue-result-kit
terminal-story-state-kit
phase-reconciliation-kit
phase-projection-kit
story-persistence-commit-protocol-kit
story-transition-transaction-kit
stage-build-plan-kit
atomic-stage-commit-kit
stage-epoch-kit
phase-stage-correlation-kit
story-phase-journal-kit
runtime-session-lifecycle-kit
story-phase-fixture-kit
browser-phase-reload-smoke-kit
```

## Next safe ledge

```txt
TheUnmappedHouse Story Phase Recovery Authority
+ Interlude/Continue Admission Fixture Gate
```

## Checklist

- [x] Compare full Publish inventory against the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select one stable eligible repository.
- [x] Identify the interaction loop.
- [x] Identify all current domains.
- [x] Identify all implemented kits and services.
- [x] Define candidate phase-authority kits.
- [x] Add timestamped architecture, render, gameplay, interaction, phase and deploy audits.
- [x] Refresh required root `.agent` documents.
- [x] Push docs directly to `main`.
- [x] Synchronize the central repository ledger and change log.
- [ ] Implement runtime phase authority and fixtures in a future code pass.

## Validation status

```txt
runtime source changed: no
branch created: no
pull request created: no
npm run check: not run
browser smoke: not run
behavioral phase fixtures: absent
```
