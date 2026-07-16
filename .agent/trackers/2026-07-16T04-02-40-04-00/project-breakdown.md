# Project breakdown: The Unmapped House story content graph validation

**Timestamp:** `2026-07-16T04-02-40-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`  
**Reviewed pre-audit repository head:** `d578c8bdb7ee23f2cc4051f410aed528dfc24b2c`  
**Status:** `story-content-graph-validation-authority-audited`

## Summary

This run selected TheUnmappedHouse after comparing the complete current Publish organization inventory against the central repository ledger and root `.agent` state. No eligible repository was new, ledger-missing, root-agent-missing, undocumented, or runtime-ahead. TheUnmappedHouse had the oldest synchronized central timestamp.

The focused finding is that authored story data is executable but not admitted. Runtime and rendering trust scene IDs, hotspot IDs, clue references, completion lists, route order, camera vectors, stage geometry descriptors, material descriptors, and post-process values without a versioned semantic validation result.

## Plan ledger

**Goal:** document one reusable story-content authority that proves identity, reference, route, completion, descriptor, and visible-frame integrity before adoption.

- [x] Enumerate all 11 accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compare the ten eligible repositories with `LuminaryLabs-Dev/LuminaryLabs`.
- [x] Confirm ten central ledgers, ten root `.agent` entry states, and synchronized documentation heads.
- [x] Select only TheUnmappedHouse by the oldest synchronized timestamp.
- [x] Inspect runtime, story data, renderer consumer, package validation, and retained audit state.
- [x] Identify the interaction loop.
- [x] Identify all domains in use.
- [x] Identify all 24 implemented kits.
- [x] Identify every service those kits offer.
- [x] Define 18 coordinating story-content authority surfaces.
- [x] Add required root and timestamped `.agent` documentation.
- [x] Keep implementation and deployment unchanged.
- [ ] Implement and execute validator and deployment fixtures.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
undocumented: 0
runtime-ahead: 0

selected: LuminaryLabs-Publish/TheUnmappedHouse
selected prior timestamp: 2026-07-15T23-00-03-04-00
next oldest: LuminaryLabs-Publish/PhantomCommand
next timestamp: 2026-07-16T00-00-40-04-00
```

## Complete interaction loop

```txt
document boot
  -> parse save slot
  -> resolve state.sceneId against scenes[]
  -> fall back to scenes[0] when unmatched
  -> construct StageKit
  -> consume current scene descriptor
  -> create WebGL geometry/materials/hotspot volumes
  -> project hotspot buttons and Notebook

inspection
  -> use scene ID and hotspot ID as state keys
  -> grant clue strings
  -> evaluate scene.requiresToComplete against state.clues
  -> update narrative/log/UI/save
  -> schedule interlude when complete

progression
  -> locate current scene index
  -> advance to the next array entry
  -> append route ID
  -> consume the next descriptor
  -> show terminal copy after the last entry
```

## Domains in use

1. **Browser shell domain** — document structure, initial copy, controls, interlude, Notebook, and lifecycle.
2. **Viewport domain** — fixed design aspect and window fitting.
3. **Story-content domain** — scenes, hotspots, clue grants, completion requirements, camera, stage, material, and post descriptors.
4. **Story-runtime domain** — boot, inspection, clue state, logs, route progression, interlude, terminal, reset, and save calls.
5. **Persistence domain** — localStorage parse, shallow merge, replacement, and deletion.
6. **Interaction domain** — semantic buttons, keyboard reset, pointer hover/click, raycast selection, and focus surfaces.
7. **Graphics domain** — Three.js scene, camera, lights, geometry, materials, shaders, render targets, post-processing, and RAF.
8. **Story-content validation domain** — proposed revision, schema, identity, reference, reachability, satisfiability, descriptor, admission, fallback, and proof authority.
9. **Validation/deploy domain** — syntax checks, static artifact, Pages delivery, repo-local audit state, and central reconciliation.

## Implemented kits and offered services

- `static-page-shell-kit`: stage mount, story panel, hotspot list, Notebook, hover label, interlude, initial Loading copy.
- `aspect-frame-kit`: fixed design aspect, window-fit calculation, DOM frame placement.
- `story-data-kit`: scene descriptors, hotspots, clue grants, completion rules, camera, materials, and post descriptors.
- `browser-story-runtime-kit`: state boot, scene resolution, inspection, Continue, reset, UI projection, and persistence calls.
- `scene-route-kit`: scene ID resolution and authored-order advancement.
- `inspection-ledger-kit`: scene-keyed inspected hotspot state.
- `clue-ledger-kit`: clue grant and clue query.
- `notebook-log-kit`: prepend narrative log and bounded retention.
- `interlude-timer-kit`: delayed completion interlude.
- `terminal-route-kit`: prototype-complete DOM projection.
- `localstorage-save-kit`: parse, shallow merge, whole-slot replacement, and delete.
- `stage-render-kit`: WebGL renderer, scene, camera, lights, offscreen target, callbacks, and recursive RAF.
- `scene-descriptor-consumer-kit`: camera, geometry, material, hotspot, fog, and post configuration.
- `anime-material-kit`: procedural shader materials and elapsed-time animation.
- `post-process-kit`: grain, vignette, chromatic shift, distortion, and scan lines.
- `hotspot-volume-kit`: invisible raycast volumes and descriptor attachment.
- `hotspot-picking-kit`: coordinate normalization, raycast, and hotspot dispatch.
- `camera-parallax-kit`: pointer-driven fixed-camera offsets.
- `render-target-composition-kit`: offscreen stage pass, post pass, and target sizing.
- `debug-json-projection-kit`: story-field serialization and Notebook projection.
- `package-syntax-check-kit`: Node syntax checks for four source modules.
- `static-pages-deploy-kit`: static Pages delivery.
- `repo-local-agent-ledger-kit`: root pointers and timestamped audit records.
- `central-ledger-sync-kit`: central selection mirror and findings history.

## Inventory

```txt
implemented source-backed kits: 24
planned story-content authority surfaces: 18
```

## Planned story-content authority surfaces

1. `the-unmapped-house-story-content-graph-validation-authority-domain`
2. `story-content-revision-kit`
3. `story-schema-version-kit`
4. `scene-identity-registry-kit`
5. `hotspot-identity-registry-kit`
6. `clue-identity-registry-kit`
7. `scene-route-order-validation-kit`
8. `route-reachability-analysis-kit`
9. `clue-grant-index-kit`
10. `completion-requirement-satisfiability-kit`
11. `scene-descriptor-shape-validation-kit`
12. `numeric-finiteness-validation-kit`
13. `duplicate-identity-rejection-kit`
14. `unknown-reference-rejection-kit`
15. `story-content-validation-result-kit`
16. `invalid-content-fallback-projection-kit`
17. `first-validated-story-frame-ack-kit`
18. `source-artifact-pages-content-fixture-kit`

## Main finding

`src/story-data.js` is syntactically valid authored data, but the product has no semantic gate for it. `src/game.js` uses scene and hotspot IDs as runtime identities, treats completion references as trustworthy, and advances by array order. `src/stage-kit.js` directly spreads descriptor arrays into Three.js constructors and vectors. `package.json` checks syntax only.

A future content change can therefore be accepted by the package check while remaining semantically unsafe:

```txt
duplicate scene or hotspot ID
  -> runtime state aliases separate authored objects

unknown or ungrantable required clue
  -> scene completion becomes impossible

invalid camera/stage/material/post descriptor
  -> stage construction throws or produces incoherent presentation

ambiguous or unreachable route order
  -> progression no longer proves one reachable terminal
```

The current three scenes and nine hotspots appear coherent by manual inspection. No defect was reproduced.

## Required authority

`the-unmapped-house-story-content-graph-validation-authority-domain`

```txt
StoryContentValidationCommand
  -> bind ContentRevision StorySchemaVersion ValidationPolicyVersion
  -> register identities
  -> validate uniqueness and ownership
  -> index clue grants
  -> prove completion satisfiability and route reachability
  -> validate descriptor shapes and finite values
  -> publish accepted or rejected StoryContentValidationResult

StoryContentAdoptionCommand
  -> require accepted validation
  -> bind content document story and render generations
  -> reject stale duplicate or invalid work
  -> publish StoryContentAdoptionResult

ValidatedStoryFrameCommand
  -> bind adopted content and visible frame
  -> publish FirstValidatedStoryFrameAck
```

## Files added

```txt
.agent/trackers/2026-07-16T04-02-40-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-16T04-02-40-04-00.md
.agent/architecture-audit/2026-07-16T04-02-40-04-00-story-content-graph-validation-dsk-map.md
.agent/render-audit/2026-07-16T04-02-40-04-00-invalid-content-first-frame-gap.md
.agent/gameplay-audit/2026-07-16T04-02-40-04-00-unsatisfiable-story-route-loop.md
.agent/interaction-audit/2026-07-16T04-02-40-04-00-story-content-validation-command-result-map.md
.agent/story-content-audit/2026-07-16T04-02-40-04-00-identity-reference-reachability-contract.md
.agent/deploy-audit/2026-07-16T04-02-40-04-00-story-content-source-artifact-pages-fixture-gate.md
.agent/central-sync-audit/2026-07-16T04-02-40-04-00-oldest-selection-story-content-reconciliation.md
```

## Files refreshed

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

## Validation boundary

Documentation only. No runtime, story, HTML, CSS, persistence, rendering, dependency, script, workflow, or deployment behavior changed. No validator, browser, artifact, or Pages fixture was run.
