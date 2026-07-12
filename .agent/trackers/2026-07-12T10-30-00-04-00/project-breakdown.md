# Project breakdown: The Unmapped House destructive reset admission

**Timestamp:** `2026-07-12T10-30-00-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`

## Summary

Selected TheUnmappedHouse as the oldest synchronized eligible Publish repository after skipping newer unsynchronized MyCozyIsland documentation. The audit preserves the complete 24-kit breakdown and isolates the global `KeyR` handler that can erase progress during ordinary browser refresh shortcuts.

## Plan ledger

**Goal:** document one explicit reset authority from keyboard intent through confirmation, revision admission, storage deletion, runtime retirement, reload and first clean-frame proof.

- [x] Compare all accessible Publish repositories with central tracking.
- [x] Exclude TheCavalryOfRome.
- [x] Select one project only.
- [x] Identify the interaction loop.
- [x] Identify all domains.
- [x] Identify all implemented kits and offered services.
- [x] Trace the destructive reset path.
- [x] Define DSK/domain, interaction, gameplay, render, reset-system and deploy audits.
- [x] Refresh required root `.agent` state.
- [ ] Implement runtime authority and fixtures.

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

MyCozyIsland       central 2026-07-12T08:00:16-04:00, repo-local 2026-07-12T10-20-02-04-00, skipped as newer unsynchronized work
TheUnmappedHouse   2026-07-12T08-10-36-04-00 selected oldest synchronized eligible repository
AetherVale         2026-07-12T08-31-49-04-00
PrehistoricRush    2026-07-12T09-01-44-04-00
TheOpenAbove       2026-07-12T09-02-10-04-00
IntoTheMeadow      2026-07-12T09-21-40-04-00
PhantomCommand     2026-07-12T09-28-05-04-00
HorrorCorridor     2026-07-12T09-48-15-04-00
ZombieOrchard      2026-07-12T10-09-07-04-00
TheCavalryOfRome   excluded
```

## Interaction loop

```txt
boot -> load state -> create stage -> render -> save
inspect -> mutate story -> derive completion -> render -> save
Continue -> change scene -> replace stage -> render -> save
KeyR -> remove save -> reload
```

## Domains

```txt
browser shell and fixed-aspect composition
authored story and render descriptors
raw localStorage read/write/reset
mutable story state and route
inspection, clue, completion and notebook log
completion timer, interlude, Continue and terminal projection
global keyboard reset and pointer activation
Three.js/WebGL stage, materials, hotspot picking and post processing
resize, timeout, input and recursive RAF callbacks
validation, Pages deployment and audit tracking
```

## Kits

```txt
static-page-shell-kit
aspect-frame-kit
story-data-kit
browser-story-runtime-kit
scene-route-kit
inspection-ledger-kit
clue-ledger-kit
notebook-log-kit
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

## Offered services

```txt
shell: stage, story, hotspot, debug, hover, interlude and Continue surfaces
story: scene/hotspot descriptors, routing, inspections, clues, logs and completion
interaction: canvas raycast, side-panel buttons, Continue, parallax and global KeyR reset
storage: single-key parse, write, delete and reload reset
render: Three.js construction, materials, hotspot volumes, stage target and post pass
projection: title, narrative, buttons, debug JSON, interlude and terminal copy
delivery: syntax checks, Pages deployment and audit tracking
```

## Finding

`src/game.js` binds destructive reset to every `KeyR` keydown. No modifier exclusion means browser refresh shortcuts can clear the save. No command/result, confirmation, revision fence, reset tombstone, timer barrier, runtime retirement or clean-frame receipt exists.

## Required domain

```txt
the-unmapped-house-destructive-reset-admission-authority-domain
```

## Validation boundary

Documentation only. Runtime, storage, input, rendering and deployment were not changed or executed.
