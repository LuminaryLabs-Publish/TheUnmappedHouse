# START HERE: The Unmapped House Story Manifest and Snapshot Admission Authority

Last updated: `2026-07-12T17-20-42-04-00`

## Summary

`TheUnmappedHouse` is a fixed-camera anime-horror point-and-click prototype with three authored scenes, nine hotspots, browser persistence, a fixed 16:9 shell and a descriptor-driven Three.js stage.

The current audit isolates startup data authority. `src/story-data.js` exports a raw mutable scene array, while `loadState()` accepts any parseable JSON object and shallow-merges it over defaults. There is no manifest identity, schema, invariant validation, index, fingerprint, snapshot version, migration, compatibility check, rejected-field report or typed startup result.

## Plan ledger

**Goal:** admit one validated immutable StoryManifest and one compatible canonical StorySnapshot before any scene, UI, persistence or render consumer can start.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger entries and root `.agent` state.
- [x] Select only `TheUnmappedHouse` by the oldest eligible central timestamp.
- [x] Trace authored story data, browser save parsing, current-scene resolution, boot projection and StageKit consumption.
- [x] Identify the complete interaction loop, all active domains, all 24 implemented kits and their services.
- [x] Define manifest, snapshot, migration, reconciliation, startup-result, observation and fixture contracts.
- [x] Add a timestamped tracker and architecture/system audit family.
- [x] Refresh all required root `.agent` files and the machine registry.
- [x] Push only to `main`.
- [x] Create no branch or pull request.
- [ ] Runtime implementation and executable startup fixtures remain future work.

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

TheUnmappedHouse   2026-07-12T15-08-07-04-00 selected
AetherVale         2026-07-12T15-18-50-04-00
TheOpenAbove       2026-07-12T15-40-04-04-00
IntoTheMeadow      2026-07-12T15-49-09-04-00
PhantomCommand     2026-07-12T16-00-03-04-00
PrehistoricRush    2026-07-12T16-20-55-04-00
HorrorCorridor     2026-07-12T16-39-35-04-00
ZombieOrchard      2026-07-12T16-51-47-04-00
MyCozyIsland       2026-07-12T17-10-31-04-00
TheCavalryOfRome   excluded
```

## Active startup and interaction loop

```txt
module boot
  -> import raw gameTitle and scenes array
  -> createInitialState from scenes[0].id
  -> parse arbitrary localStorage JSON
  -> shallow-merge parsed fields over defaults
  -> resolve currentScene by state.sceneId or fall back to scenes[0]
  -> create StageKit
  -> load the resolved raw scene descriptor
  -> render title, narrative, controls and Notebook JSON
  -> write the unvalidated state back to storage

inspection
  -> receive a raw hotspot descriptor
  -> mutate inspected, clues and log
  -> derive completion from raw requiresToComplete
  -> project UI
  -> persist the full mutable object

Continue
  -> locate currentScene by array position
  -> select the next raw scene descriptor
  -> mutate state.sceneId and route
  -> replace live stage resources
  -> project and persist
```

## Main finding

A parseable save is treated as valid state. Examples include:

```txt
sceneId references no manifest scene
  -> currentScene falls back to scenes[0]
  -> state.sceneId remains invalid
  -> boot immediately persists the divergence

clues is a string
  -> hasClue uses string includes semantics
  -> grantClues later attempts clues.push and can fail

inspected is null
  -> renderUi and inspectHotspot can dereference null

route or log has the wrong type
  -> Continue or writeLog can fail after partial mutation

unknown fields exist
  -> shallow merge retains them
  -> saveState republishes them indefinitely
```

The authored scene array also has no duplicate-id, required-clue, route-order, camera, geometry, hotspot or terminal invariant validation. Consumers therefore cannot cite which content revision produced the accepted snapshot or visible frame.

## Required authority

```txt
the-unmapped-house-story-manifest-snapshot-admission-authority-domain
```

It must own manifest identity and version, structural and semantic validation, canonical indexes, route graph, immutable freeze, fingerprint, snapshot schema version, parse and migration, manifest compatibility, reconciliation, unknown-field rejection, typed startup result, observations, bounded journals and first-visible-frame proof.

## Read order

1. `current-audit.md`
2. `known-gaps.md`
3. `trackers/2026-07-12T17-20-42-04-00/project-breakdown.md`
4. `architecture-audit/2026-07-12T17-20-42-04-00-story-manifest-snapshot-admission-dsk-map.md`
5. `story-authority-audit/2026-07-12T17-20-42-04-00-manifest-version-snapshot-reconciliation-contract.md`
6. `gameplay-audit/2026-07-12T17-20-42-04-00-invalid-save-startup-divergence-loop.md`
7. `interaction-audit/2026-07-12T17-20-42-04-00-startup-parse-admit-consume-map.md`
8. `render-audit/2026-07-12T17-20-42-04-00-unversioned-content-visible-scene-gap.md`
9. `next-steps.md`
10. `validation.md`

## Next safe ledge

Implement pure `validateStoryManifest()` and `admitStorySnapshot()` functions first. They should return detached typed results and must run before constructing `StageKit`, mutating the DOM or rewriting browser storage.
