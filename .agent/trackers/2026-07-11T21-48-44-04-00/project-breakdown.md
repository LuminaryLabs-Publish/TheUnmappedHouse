# Project breakdown: The Unmapped House

Timestamp: `2026-07-11T21-48-44-04-00`

## Summary

This run selected only `LuminaryLabs-Publish/TheUnmappedHouse`, the oldest eligible repository in the central ledger. The breakdown identifies the current authored `scenes` array as ambient mutable authority and defines a canonical StoryManifest boundary before persistence, rendering, picking or progression can become authoritative.

## Plan ledger

**Goal:** compare the complete Publish inventory, select one eligible repository, document its interaction loop, domains, kits and services, then add an implementation-ready StoryManifest authority and validation gate.

- [x] Enumerate all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Compare all nine non-Cavalry repositories against `LuminaryLabs-Dev/LuminaryLabs/repo-ledger`.
- [x] Confirm no new, ledger-missing or root-undocumented eligible repository exists.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Select only `LuminaryLabs-Publish/TheUnmappedHouse` by oldest central timestamp.
- [x] Read root `.agent` state and current implementation sources.
- [x] Identify the interaction loop.
- [x] Identify all domains in use.
- [x] Identify all 24 implemented kits and their services.
- [x] Define the StoryManifest parent domain and candidate kits.
- [x] Add architecture, render, gameplay, interaction, story-manifest and deploy audits.
- [x] Refresh START_HERE, current-audit, next-steps, known-gaps, validation and kit-registry.
- [x] Push only to `main` and create no branch or pull request.
- [ ] Implement runtime authority and execute fixtures.

## Publish inventory and selection

```txt
TheUnmappedHouse   2026-07-11T20-11-26-04-00 selected
AetherVale         2026-07-11T20-30-33-04-00
IntoTheMeadow      2026-07-11T20-38-07-04-00
MyCozyIsland       2026-07-11T20-51-14-04-00
PrehistoricRush    2026-07-11T21-00-00-04-00
TheOpenAbove       2026-07-11T21-08-57-04-00
HorrorCorridor     2026-07-11T21-21-12-04-00
PhantomCommand     2026-07-11T21-31-19-04-00
ZombieOrchard      2026-07-11T21-40-49-04-00
TheCavalryOfRome   excluded
```

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing eligible repositories: 0
root-undocumented eligible repositories: 0
Publish repositories changed this run: 1
```

## Interaction loop

```txt
authored mutable scenes array
  -> raw save shallow merge
  -> current scene lookup or visual fallback
  -> StageKit construction and descriptor consumption
  -> side-panel and hotspot mesh descriptor references
  -> inspection and global clue mutation
  -> completion from required clue strings
  -> Continue through array index + 1
  -> save raw state without manifest identity
```

## Domains in use

```txt
browser shell and fixed-aspect layout
story, scene, hotspot, clue, stage, camera, material, post and copy descriptors
raw localStorage effects and mutable story state
scene routing, inspection, clues, completion, interlude and terminal projection
DOM and debug projection
Three.js renderer, scene, camera, target, shaders and post composition
live scene replacement and resource allocation
pointer observation, raycast picking and side-panel activation
resize, RAF and lifecycle
validation, Pages deployment and audit tracking
```

## Implemented kits and services

```txt
static-page-shell-kit: stage and story shell
aspect-frame-kit: fixed 16:9 fitting
story-data-kit: authored story and render descriptors
browser-story-runtime-kit: load, inspection, Continue, persistence and projection
scene-route-kit: current scene and route mutation
inspection-ledger-kit: scene-keyed inspection booleans
clue-ledger-kit: global clue grants and lookup
notebook-log-kit: capped log rows
interlude-timer-kit: delayed completion interlude
terminal-route-kit: prototype-complete projection
localstorage-save-kit: raw parse, shallow merge, write and clear
stage-render-kit: renderer, scene, camera, target, listeners and RAF
scene-descriptor-consumer-kit: descriptor-to-Three resources
anime-material-kit: procedural shader materials
post-process-kit: grain, vignette, chromatic, distortion and memory effects
hotspot-volume-kit: invisible pick meshes
hotspot-picking-kit: hover/click raycast selection
camera-parallax-kit: mouse-driven camera offset
render-target-composition-kit: stage and post passes
debug-json-projection-kit: story debug projection
package-syntax-check-kit: source syntax checks
static-pages-deploy-kit: Pages deployment
repo-local-agent-ledger-kit: local audit state
central-ledger-sync-kit: central selection and findings history
```

## Main findings

1. The source has no root StoryManifest id, schema version, content version or fingerprint.
2. Scene progression and terminal semantics are inferred from mutable array order.
3. An unknown saved scene id visually falls back to scene zero but remains in persisted state.
4. StageKit, hotspot meshes and side-panel buttons consume mutable source descriptors by reference.
5. No validation proves unique ids, valid clue ownership, reachable requirements, valid successors or supported render descriptors.
6. No visible frame cites the content identity that produced it.

## Required parent domain

```txt
the-unmapped-house-story-manifest-authority-domain
```

## Required output

Refreshed:

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

Added:

```txt
.agent/trackers/2026-07-11T21-48-44-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T21-48-44-04-00.md
.agent/architecture-audit/2026-07-11T21-48-44-04-00-story-manifest-authority-dsk-map.md
.agent/render-audit/2026-07-11T21-48-44-04-00-mutable-descriptor-visible-frame-provenance-gap.md
.agent/gameplay-audit/2026-07-11T21-48-44-04-00-array-order-scene-progression-loop.md
.agent/interaction-audit/2026-07-11T21-48-44-04-00-manifest-admission-lookup-result-map.md
.agent/story-manifest-audit/2026-07-11T21-48-44-04-00-schema-index-freeze-fingerprint-contract.md
.agent/deploy-audit/2026-07-11T21-48-44-04-00-story-manifest-fixture-gate.md
```

## Validation

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
rendering changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check: not run because github.com could not be resolved from the execution container
browser smoke: not run
StoryManifest fixtures: unavailable
kit-registry JSON: generated and parsed locally
```
