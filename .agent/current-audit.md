# Current audit: The Unmapped House

**Timestamp:** `2026-07-12T23-20-51-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Status:** `browser-save-commit-reset-convergence-authority-audited`

## Summary

This documentation-only audit isolates the boundary between tab-local story mutation, whole-document localStorage writes, cross-tab delivery, destructive reset, visible projection and durable evidence.

The runtime has no save revision, writer identity, command identity, expected predecessor, conflict result, storage-event reconciliation, reset tombstone or verified readback. Concurrent tabs can silently overwrite valid progress, a stale tab can recreate state after reset, and storage failure can leave visible state ahead of the durable snapshot.

## Plan ledger

**Goal:** make every story save and reset one admitted, durable and cross-tab-convergent transaction with visible-frame provenance.

- [x] Compare the full Publish inventory with central tracking.
- [x] Verify all nine eligible repositories remain centrally tracked and root-documented.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheUnmappedHouse` by oldest current central timestamp.
- [x] Inspect the browser save, mutation, reset, reload and stage projection paths.
- [x] Preserve the complete 24-kit inventory and service map.
- [x] Define commands, revisions, results, delivery, reset invalidation and fixture gates.
- [x] Change documentation only.
- [ ] Implement and execute the authority.

## Complete interaction loop

```txt
boot
  -> create default story state
  -> parse arbitrary localStorage JSON
  -> shallow-merge parsed fields
  -> resolve currentScene
  -> construct StageKit and load scene resources
  -> render controls and Notebook
  -> replace the whole stored snapshot

inspection
  -> mutate inspected facts, clues and log in memory
  -> optionally schedule completion interlude
  -> render updated UI
  -> replace the whole stored snapshot

Continue
  -> mutate sceneId, route and log
  -> load the successor stage
  -> render updated UI
  -> replace the whole stored snapshot

KeyR reset
  -> remove the save key
  -> reload the current tab
  -> provide no reset identity or cross-tab invalidation

other live tabs
  -> keep independent mutable snapshots
  -> receive no admitted storage updates
  -> may overwrite newer state or resurrect reset state
```

## Source ownership

| Source | Current responsibilities |
|---|---|
| `src/story-data.js` | Three scene descriptors, nine hotspots, completion requirements, interlude copy and render settings. |
| `src/game.js` | Browser story aggregate, localStorage parse/write/delete, inspection, Continue, timer, UI, reset and boot. |
| `src/stage-kit.js` | Three.js stage, scene replacement, raycast, hover, camera parallax, render target and RAF. |
| `src/styles.css` | Fixed shell, controls, Notebook and interlude presentation. |
| `src/aspect-frame.js` | Fixed 16:9 viewport calculation and application. |
| `index.html` | Stage, story, Notebook, hover and interlude surfaces. |
| `package.json` | Syntax-only validation and local serving. |
| `.github/workflows/deploy.yml` | Static Pages deployment from `main`. |

## Domains in use

```txt
browser application shell
fixed 16:9 aspect composition
authored story, scene, hotspot and render descriptors
browser persistence and destructive reset
scene routing, inspection, clues, logs and completion
completion timeout and interlude projection
terminal copy projection
DOM keyboard and pointer interaction
modal visibility and focus behavior
Three.js CDN runtime and WebGL presentation
scene graph and resource allocation
procedural geometry and shader materials
hotspot volumes and raycast picking
camera parallax and hover projection
render target and post-processing
resize, pointer, click, timeout and recursive RAF callbacks
syntax validation and Pages deployment
repo-local and central audit tracking
```

Missing save convergence authority:

```txt
save session, writer and command identity
canonical snapshot revision and fingerprint
expected-predecessor admission
one terminal result per save/reset command
durable write and readback verification
storage-write failure and readback-mismatch results
storage-event envelope and schema validation
duplicate and reordered delivery rejection
monotonic cross-tab reconciliation
reset generation and durable tombstone
stale-writer and reset-resurrection rejection
save/reset observations and bounded journal
first visible save/reset frame acknowledgement
browser and Pages convergence fixtures
```

## Implemented kits and offered services

| Kit | Offered services |
|---|---|
| `static-page-shell-kit` | Mount stage, story panel, hotspot list, Notebook, hover label and interlude. |
| `aspect-frame-kit` | Compute and apply the fixed 1920 × 1080 design frame. |
| `story-data-kit` | Provide three scenes, nine hotspots, clue grants, completion rules, camera, material and post settings. |
| `browser-story-runtime-kit` | Boot state, resolve scene, inspect, continue, reset, project UI and persist. |
| `scene-route-kit` | Resolve scene IDs and advance through authored array order. |
| `inspection-ledger-kit` | Track scene-keyed inspected hotspot booleans. |
| `clue-ledger-kit` | Grant and query clue identifiers. |
| `notebook-log-kit` | Prepend and cap narrative log rows. |
| `interlude-timer-kit` | Schedule the delayed completion interlude. |
| `terminal-route-kit` | Project prototype-complete terminal copy. |
| `localstorage-save-kit` | Parse, shallow-merge, replace and delete one browser save value. |
| `stage-render-kit` | Create renderer, scene, camera, lights, target, callbacks and recursive RAF. |
| `scene-descriptor-consumer-kit` | Convert descriptors into camera, geometry, materials, hotspots and post settings. |
| `anime-material-kit` | Allocate procedural shader materials and update time uniforms. |
| `post-process-kit` | Apply grain, vignette, chromatic shift, distortion and scan-line effects. |
| `hotspot-volume-kit` | Allocate invisible raycast volumes and attach hotspot descriptors. |
| `hotspot-picking-kit` | Normalize pointer input, raycast and dispatch a hotspot. |
| `camera-parallax-kit` | Apply pointer-driven fixed-camera offsets. |
| `render-target-composition-kit` | Render stage to an offscreen target and post pass to canvas. |
| `debug-json-projection-kit` | Serialize story fields into the visible Notebook. |
| `package-syntax-check-kit` | Run Node syntax checks over JavaScript sources. |
| `static-pages-deploy-kit` | Publish repository root to GitHub Pages after pushes to `main`. |
| `repo-local-agent-ledger-kit` | Maintain root pointers and timestamped audit records. |
| `central-ledger-sync-kit` | Mirror selection, findings and history into the central ledger. |

## Concrete source findings

### Whole-snapshot last writer wins

`saveState()` serializes the mutable aggregate and calls `localStorage.setItem()` with no revision or predecessor check. Two tabs that began from the same saved value can each produce a complete successor and silently overwrite each other.

```txt
Tab A grants clue A and writes successor A
Tab B grants clue B from the same predecessor and writes successor B
last writer wins
one valid clue/inspection/log branch disappears
```

### Storage changes are not admitted

No `storage` event handler exists. A tab does not learn that another tab committed a newer scene, clue set, route or reset. It retains and later republishes its own predecessor snapshot.

### Reset has no durable identity

`KeyR` calls `removeItem(SAVE_KEY)` and reloads one tab. Key absence carries no reset generation, command ID or predecessor fingerprint. Another live tab can recreate the removed snapshot on its next save.

### Mutation and projection precede durable proof

Inspection and Continue mutate memory and visible output before `saveState()`. `setItem()` exceptions are not caught or represented by a typed result. The visible scene can advance while reload returns to an older durable snapshot.

### Boot can rewrite without commit provenance

Boot reads, shallow-merges, renders and immediately writes the whole state. The write has no commit identity or readback verification, and the Notebook exposes no save revision or fingerprint.

### No cross-tab or frame convergence result

There is no accepted/rejected save result, conflict receipt, reset result, delivery result or first-visible frame acknowledgement tied to the durable commit.

## Required parent domain

```txt
the-unmapped-house-browser-save-commit-reset-convergence-authority-domain
```

Candidate kits:

```txt
browser-save-session-id-kit
browser-save-writer-id-kit
browser-save-command-id-kit
browser-save-revision-kit
browser-save-expected-predecessor-kit
browser-save-fingerprint-kit
canonical-story-snapshot-kit
story-save-commit-command-kit
story-save-commit-admission-kit
story-save-commit-result-kit
durable-save-readback-kit
save-write-failure-kit
storage-event-envelope-kit
storage-event-deduplication-kit
monotonic-save-admission-kit
cross-tab-reconciliation-kit
story-reset-command-kit
story-reset-generation-kit
story-reset-tombstone-kit
story-reset-admission-kit
story-reset-result-kit
stale-writer-rejection-kit
reset-resurrection-rejection-kit
save-observation-kit
save-journal-kit
first-visible-save-frame-ack-kit
first-visible-reset-frame-ack-kit
two-tab-lost-update-fixture-kit
reset-resurrection-fixture-kit
storage-write-failure-fixture-kit
browser-storage-convergence-smoke-kit
pages-storage-convergence-smoke-kit
```

## Required transactions

```txt
StorySaveCommitCommand
  -> validate schema, manifest, writer, command and run identity
  -> require exact predecessor revision and fingerprint
  -> normalize and freeze one successor candidate
  -> allocate one monotonic save revision and fingerprint
  -> write durable bytes
  -> read back and verify the exact envelope
  -> publish one terminal StorySaveCommitResult
  -> deliver immutable commit envelope to other tabs
  -> deduplicate and admit delivery monotonically
  -> project the accepted snapshot
  -> acknowledge the first matching visible frame

StoryResetCommand
  -> require exact predecessor and reset generation
  -> commit a durable reset tombstone
  -> invalidate predecessor writers and pending save work
  -> reconcile every tab to the reset snapshot
  -> reject any stale post-reset write
  -> publish StoryResetResult
  -> acknowledge the first reset frame
```

## Proof boundary

Source inspection proves the current ordering and missing authority only. It does not prove runtime convergence, atomic compare-and-swap, conflict recovery, reset invalidation, storage-failure handling or visible-frame parity.