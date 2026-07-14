# Project breakdown: The Unmapped House story-save schema and manifest admission

**Timestamp:** `2026-07-13T19-58-19-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`  
**Status:** `story-save-schema-manifest-admission-authority-audited`

## Summary

`TheUnmappedHouse` is a fixed-camera browser horror prototype with three authored scenes, nine hotspots, clue-led progression, a visible Notebook, localStorage persistence and a descriptor-driven Three.js stage.

The current audit isolates startup save admission. `loadState()` catches malformed JSON, but any successfully parsed value is shallow-merged into live state without schema, type, identifier or story-manifest validation. An unknown `sceneId` is visually replaced with the first scene while the invalid ID remains in the durable state, and malformed `clues`, `inspected`, `route` or `log` fields can crash later interactions or silently change their meaning.

## Plan ledger

**Goal:** admit one canonical story state that is structurally valid, compatible with the current authored manifest and correlated with the first visible scene, while quarantining or migrating incompatible saves before live mutation.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Confirm every eligible repository head matches the recorded repo-local documentation head.
- [x] Select only `LuminaryLabs-Publish/TheUnmappedHouse` by the oldest eligible central timestamp.
- [x] Inspect story state boot, scene resolution, clue and inspection use, route progression, Notebook projection, localStorage writeback and syntax-only validation.
- [x] Identify the complete interaction loop and active domains.
- [x] Preserve all 24 implemented kit surfaces and offered services.
- [x] Define the story-save schema and manifest-admission authority family.
- [x] Add the timestamped tracker and audit family.
- [x] Refresh every required root `.agent` document and machine registry.
- [x] Change documentation only.
- [ ] Implement the authority and executable source/browser/build/Pages fixtures.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
central ledger entries: 9
root .agent states: 9
new eligible repositories: 0
ledger-missing eligible repositories: 0
root-agent-missing eligible repositories: 0
locally-ahead eligible repositories: 0

TheUnmappedHouse   2026-07-13T14-58-07-04-00 selected
AetherVale         2026-07-13T15-41-24-04-00
IntoTheMeadow      2026-07-13T16-01-05-04-00
PrehistoricRush    2026-07-13T16-41-10-04-00
PhantomCommand     2026-07-13T17-00-59-04-00
HorrorCorridor     2026-07-13T17-40-04-04-00
ZombieOrchard      2026-07-13T18-00-38-04-00
TheOpenAbove       2026-07-13T18-59-14-04-00
MyCozyIsland       2026-07-13T19-40-56-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/TheUnmappedHouse` is in scope.

## Complete interaction loop

```txt
browser boot
  -> read localStorage key
  -> JSON.parse raw value or use {}
  -> shallow-merge parsed fields over createInitialState()
  -> resolve currentScene from state.sceneId or fall back visually to scenes[0]
  -> construct StageKit
  -> load the resolved scene
  -> render story UI and Notebook
  -> immediately rewrite the unvalidated state to localStorage

inspection
  -> read state.inspected[currentScene.id]
  -> query state.clues.includes()
  -> mutate inspected, clues and log
  -> evaluate scene completion
  -> render UI
  -> rewrite state

continue
  -> find next authored scene
  -> mutate currentScene and state.sceneId
  -> query and mutate route
  -> replace stage and UI
  -> rewrite state

story-data revision
  -> scene, hotspot or clue identifiers may change
  -> old save has no schema version or manifest fingerprint
  -> stale identifiers are admitted as if current
  -> no migration, quarantine or incompatibility result exists
```

## Source-backed findings

### Parse success is treated as state validity

`loadState()` catches only JSON parsing failures. Any parsed primitive or object is spread into the initial state without field validation.

### Scene fallback does not repair durable state

An unknown saved `sceneId` makes `currentScene` fall back to `scenes[0]`, but `state.sceneId` remains unknown. The first scene can be visible while the rewritten save still claims an invalid scene.

### Collection fields have no shape admission

```txt
clues
  expected: string[]
  consumers: includes(), push()

inspected
  expected: Record<sceneId, Record<hotspotId, boolean>>
  consumers: property lookup and assignment

route
  expected: string[]
  consumers: includes(), push()

log
  expected: string[]
  consumers: unshift(), slice()
```

A malformed value can crash a later command or produce incorrect string-substring semantics.

### Authored identifiers are not validated

Saved scene IDs, clue IDs, route entries, inspected scene IDs and inspected hotspot IDs are not checked against `story-data.js`. Orphan data survives and current content has no compatibility fingerprint.

### Invalid state is rewritten during boot

After stage and UI initialization, `saveState()` serializes the admitted object immediately. Startup therefore persists unknown or malformed fields instead of quarantining the raw document.

### Validation does not execute persistence behavior

`npm run check` performs JavaScript syntax checks only. It has no malformed-save, unknown-ID, migration, quarantine, fallback or first-frame fixture.

## Domains in use

```txt
browser document, fixed shell and lifecycle
story manifest, scenes, hotspots, clues and completion requirements
story-state schema and normalization
scene-route and current-scene resolution
inspection, clue, route and Notebook ledgers
interlude and terminal progression
localStorage read, parse, write, reset and incompatibility quarantine
save schema version and authored-manifest fingerprint
migration and fallback policy
DOM pointer, click and keyboard interaction
Three.js scene, camera, materials, geometry and post-processing
hotspot picking, hover and camera parallax
recursive RAF and visible scene projection
syntax validation, local serving and Pages deployment
repo-local and central audit tracking
```

## Implemented kits and offered services

| Kit | Offered services |
|---|---|
| `static-page-shell-kit` | stage mount, story panel, hotspot list, Notebook, hover label, interlude. |
| `aspect-frame-kit` | fixed 1920x1080 design aspect, window-fit calculation, DOM frame placement. |
| `story-data-kit` | three scene descriptors, nine hotspots, clue grants, completion rules, camera, materials and post descriptors. |
| `browser-story-runtime-kit` | state boot, scene resolution, inspection, continue, reset, UI projection and persistence calls. |
| `scene-route-kit` | scene ID resolution and authored-order advancement. |
| `inspection-ledger-kit` | scene-keyed inspected-hotspot state. |
| `clue-ledger-kit` | clue grant and clue query. |
| `notebook-log-kit` | prepend narrative log and bounded retention. |
| `interlude-timer-kit` | delayed completion interlude scheduling. |
| `terminal-route-kit` | prototype-complete copy projection. |
| `localstorage-save-kit` | parse, shallow merge, replace and delete save. |
| `stage-render-kit` | WebGL renderer, scene, camera, lights, offscreen target, callbacks and recursive RAF. |
| `scene-descriptor-consumer-kit` | camera, geometry, material, hotspot and post construction. |
| `anime-material-kit` | procedural shader materials and time updates. |
| `post-process-kit` | grain, vignette, chromatic shift, distortion and scan lines. |
| `hotspot-volume-kit` | invisible raycast volumes and descriptor attachment. |
| `hotspot-picking-kit` | canvas coordinate normalization, raycast and hotspot dispatch. |
| `camera-parallax-kit` | pointer-driven fixed-camera offsets. |
| `render-target-composition-kit` | offscreen stage pass, post pass and target sizing. |
| `debug-json-projection-kit` | story-field serialization and visible Notebook projection. |
| `package-syntax-check-kit` | Node syntax checks over local JavaScript. |
| `static-pages-deploy-kit` | repository-root artifact upload and Pages deployment on `main`. |
| `repo-local-agent-ledger-kit` | root pointers and timestamped audit records. |
| `central-ledger-sync-kit` | central selection mirror and findings history. |

```txt
implemented source-backed kits: 24
planned schema-admission coordinating kits: 22
```

## Required authority

```txt
the-unmapped-house-story-save-schema-manifest-admission-authority-domain
```

## Required transaction

```txt
StorySaveAdmissionCommand
  -> bind SaveKey, StorySchemaVersion and StoryManifestFingerprint
  -> read the raw document without mutating live state
  -> parse into an untrusted candidate
  -> validate top-level shape and every collection field
  -> validate scene, hotspot, clue and route identifiers against the current manifest
  -> classify Current, Migratable, Incompatible, Malformed or Empty
  -> migrate through an explicit version path or quarantine the raw document
  -> normalize one canonical StoryStateCandidate
  -> atomically adopt story state and current-scene identity
  -> publish StorySaveAdmissionResult
  -> project a matching stage, UI and Notebook revision
  -> publish FirstAdmittedStoryFrameAck
```

## Planned coordinating kits

```txt
the-unmapped-house-story-save-schema-manifest-admission-authority-domain
story-schema-version-kit
story-manifest-fingerprint-kit
raw-save-document-kit
save-document-parser-kit
story-state-shape-validator-kit
scene-id-admission-kit
clue-id-admission-kit
hotspot-inspection-admission-kit
route-history-admission-kit
notebook-log-admission-kit
story-state-normalization-kit
story-save-classification-kit
story-save-migration-plan-kit
incompatible-save-quarantine-kit
malformed-save-fallback-kit
startup-story-state-candidate-kit
startup-story-state-adoption-kit
story-save-admission-result-kit
story-save-admission-diagnostics-kit
first-admitted-story-frame-ack-kit
story-save-admission-fixture-matrix-kit
```

## Repo-local output

Added:

```txt
.agent/trackers/2026-07-13T19-58-19-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-13T19-58-19-04-00.md
.agent/architecture-audit/2026-07-13T19-58-19-04-00-story-save-schema-manifest-admission-dsk-map.md
.agent/render-audit/2026-07-13T19-58-19-04-00-admitted-state-visible-scene-coherence-gap.md
.agent/gameplay-audit/2026-07-13T19-58-19-04-00-malformed-save-progression-loop.md
.agent/interaction-audit/2026-07-13T19-58-19-04-00-save-document-admission-result-map.md
.agent/save-admission-audit/2026-07-13T19-58-19-04-00-schema-manifest-migration-quarantine-contract.md
.agent/deploy-audit/2026-07-13T19-58-19-04-00-save-admission-fixture-gate.md
.agent/central-sync-audit/2026-07-13T19-58-19-04-00-repo-ledger-save-admission-reconciliation.md
```

Refreshed:

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

## Validation boundary

```txt
runtime JavaScript changed: no
HTML or CSS changed: no
story descriptors changed: no
persistence behavior changed: no
render behavior changed: no
package scripts or dependencies changed: no
deployment changed: no
branch created: no
pull request created: no

npm run check: not run
malformed-save fixtures: unavailable
manifest-mismatch fixtures: unavailable
migration/quarantine fixtures: unavailable
first admitted-frame fixture: unavailable
Pages save-admission smoke: not run
```

This audit documents the authority gap. It does not claim save compatibility, migration safety, malformed-state containment, durable convergence or production readiness is implemented.