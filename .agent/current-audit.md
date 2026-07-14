# Current audit: The Unmapped House story-save schema and manifest admission

**Timestamp:** `2026-07-13T19-58-19-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Status:** `story-save-schema-manifest-admission-authority-audited`  
**Branch:** `main`

## Summary

Startup trusts any successfully parsed localStorage value. The parsed value is shallow-merged over initial state, used by story reducers and immediately rewritten without schema version, field-shape validation, authored-identifier validation, manifest fingerprint, migration or quarantine.

## Plan ledger

**Goal:** convert raw browser persistence into one canonical story state before interaction or visible projection begins.

- [x] Compare the complete Publish inventory and central ledger.
- [x] Select only `TheUnmappedHouse` under the oldest eligible rule.
- [x] Inspect state boot, scene resolution, clue/inspection reducers, route/log reducers, writeback and validation.
- [x] Identify the complete interaction loop, domains, kits and services.
- [x] Define the parent authority, candidate and terminal results.
- [x] Add timestamped architecture, render, gameplay, interaction, save-admission, deploy and central-sync audits.
- [x] Change documentation only.
- [ ] Implement and run executable save-admission fixtures.

## Complete interaction loop

```txt
boot
  -> localStorage.getItem(SAVE_KEY)
  -> JSON.parse(raw || "{}")
  -> shallow merge parsed fields over createInitialState()
  -> resolve currentScene by saved sceneId or scenes[0] fallback
  -> construct and load StageKit scene
  -> render UI and Notebook
  -> saveState() rewrites the admitted object

inspection
  -> state.inspected[currentScene.id]
  -> state.clues.includes()/push()
  -> state.log.unshift()/slice()
  -> completion check
  -> render and save

continue
  -> route.includes()/push()
  -> scene and UI transition
  -> save

content revision
  -> authored IDs can change
  -> old save has no schema or manifest evidence
  -> stale IDs are accepted or fail later
```

## Source ownership

| Source | Current responsibilities |
|---|---|
| `src/game.js` | initial state, raw save parse/merge, story reducers, scene fallback, UI, writeback and reset. |
| `src/story-data.js` | current scene, hotspot, clue, completion and presentation manifest. |
| `src/stage-kit.js` | visible stage and hotspot projection for the resolved scene. |
| `package.json` | syntax-only checks. |

## Domains in use

```txt
browser document, shell and lifecycle
story manifest and descriptor identity
story-state schema and canonical normalization
scene route and current-scene resolution
inspection, clue, route and Notebook ledgers
interlude and terminal progression
localStorage read, parse, write, reset and quarantine
schema version, manifest fingerprint and migration
DOM pointer, click and keyboard interaction
Three.js scene, hotspot and visible-frame projection
syntax validation, local serving and Pages deployment
repo-local and central audit tracking
```

## Implemented kits and offered services

| Kit | Offered services |
|---|---|
| `static-page-shell-kit` | stage mount, story panel, hotspot list, Notebook, hover label and interlude. |
| `aspect-frame-kit` | fixed design aspect, frame calculation and DOM placement. |
| `story-data-kit` | scenes, hotspots, clue grants, completion, camera, materials and post descriptors. |
| `browser-story-runtime-kit` | state boot, scene resolution, inspection, continue, reset, UI and persistence calls. |
| `scene-route-kit` | scene resolution and authored-order advancement. |
| `inspection-ledger-kit` | scene-keyed inspected-hotspot state. |
| `clue-ledger-kit` | clue grant and query. |
| `notebook-log-kit` | narrative log mutation and bounded retention. |
| `interlude-timer-kit` | delayed completion interlude. |
| `terminal-route-kit` | prototype-complete projection. |
| `localstorage-save-kit` | parse, shallow merge, replace and delete save. |
| `stage-render-kit` | WebGL renderer, scene, camera, target, callbacks and RAF. |
| `scene-descriptor-consumer-kit` | camera, geometry, material, hotspot and post construction. |
| `anime-material-kit` | procedural shader materials and time updates. |
| `post-process-kit` | grain, vignette, chromatic shift, distortion and scan lines. |
| `hotspot-volume-kit` | invisible raycast volumes and descriptors. |
| `hotspot-picking-kit` | coordinate normalization, raycast and dispatch. |
| `camera-parallax-kit` | pointer-driven camera offsets. |
| `render-target-composition-kit` | offscreen stage pass and post pass. |
| `debug-json-projection-kit` | story-state serialization and Notebook projection. |
| `package-syntax-check-kit` | Node syntax checks. |
| `static-pages-deploy-kit` | static Pages delivery from `main`. |
| `repo-local-agent-ledger-kit` | root and timestamped audit records. |
| `central-ledger-sync-kit` | central selection and findings mirror. |

```txt
implemented source-backed kits: 24
planned schema-admission coordinating kits: 22
```

## Concrete findings

### Shape validation is absent

`JSON.parse` success is treated as sufficient. Wrong-type `clues`, `inspected`, `route` and `log` values can fail later at `includes`, `push`, `unshift`, `slice` or nested assignment.

### Scene fallback is split from state repair

An unknown `state.sceneId` falls back only for `currentScene`. The visible first scene and debug projection can disagree with the state object that is immediately rewritten.

### Manifest compatibility is absent

No current authored scene, hotspot or clue identifier set is fingerprinted. Orphan IDs and prior content layouts have no explicit acceptance, remap, drop or rejection policy.

### Migration and quarantine are absent

There is no schema version, migration graph, incompatible-save quarantine, malformed-state classification or typed startup result.

### Proof is absent

Syntax checks do not execute parsing, validation, migration, fallback, first interaction or first visible scene behavior.

## Required authority

```txt
the-unmapped-house-story-save-schema-manifest-admission-authority-domain
```

```txt
StorySaveAdmissionCommand
  -> bind schema version and current manifest fingerprint
  -> read and fingerprint raw storage evidence
  -> parse an untrusted candidate
  -> validate shape and authored identifiers
  -> classify current, migratable, incompatible, malformed or empty
  -> migrate or quarantine without live mutation
  -> normalize one canonical StoryStateCandidate
  -> atomically adopt state and scene identity
  -> publish StorySaveAdmissionResult
  -> project matching stage, UI and Notebook revisions
  -> publish FirstAdmittedStoryFrameAck
```

## Validation boundary

Documentation and machine audit state changed. Runtime JavaScript, HTML, CSS, story descriptors, persistence behavior, rendering, package scripts, dependencies and deployment did not change. No source, browser, build or Pages save-admission fixture was executed.