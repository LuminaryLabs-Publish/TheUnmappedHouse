# Project breakdown: The Unmapped House

Timestamp: `2026-07-10T19-00-19-04-00`

## Goal

Compare the complete accessible `LuminaryLabs-Publish` inventory against the central ledger, select one eligible repository, and document its interaction loop, domains, kits, services and next safe implementation boundary without changing runtime behavior.

## Selection ledger

```txt
TheUnmappedHouse    selected / prior 2026-07-10T17-29-23-04-00
MyCozyIsland        tracked  / 2026-07-10T17-38-35-04-00
TheOpenAbove        tracked  / 2026-07-10T17-51-35-04-00
PrehistoricRush     tracked  / 2026-07-10T18-01-03-04-00
AetherVale          tracked  / 2026-07-10T18-08-37-04-00
IntoTheMeadow       tracked  / 2026-07-10T18-22-01-04-00
HorrorCorridor      tracked  / 2026-07-10T18-31-21-04-00
PhantomCommand      tracked  / 2026-07-10T18-40-13-04-00
ZombieOrchard       tracked  / 2026-07-10T18-49-54-04-00
TheCavalryOfRome    excluded by rule
```

All nine eligible repositories were centrally tracked and had root `.agent` audit state. `TheUnmappedHouse` was the oldest eligible fallback and the only product repository changed.

## Product inventory

```txt
scenes: 3
hotspots: 9
required clues: 9
layers: 6
props: 13
render surface: Three.js 0.160.0 from unpkg
persistence: localStorage
save key: the-unmapped-house.stage-prototype.v1
validation: syntax checks only
```

## Interaction loop

```txt
parse save
  -> shallow-merge persisted object into initial state
  -> resolve currentScene or visually fall back to first scene
  -> StageKit loads scene descriptors
  -> UI and debug JSON project aggregate state
  -> side-panel or raycast forwards a live hotspot object
  -> inspectHotspot mutates inspected, clues and log
  -> sceneComplete trusts persisted global clue strings
  -> anonymous timer opens interlude
  -> continue mutates scene and route
  -> StageKit loads next scene
  -> state is saved
  -> final continue projects terminal copy
  -> reset clears storage and reloads
```

## Domains identified

```txt
browser shell and fixed-aspect layout
story source, scene order, scene ids, hotspot ids and clue ids
story, route, inspection, clue and notebook state
completion, interlude, terminal and reset policy
side-panel, raycast and keyboard input
localStorage persistence
story, interlude, hover and diagnostics projection
Three.js render host and descriptor consumption
procedural materials and post-processing
hotspot volume, raycast picking and camera parallax
render target, scene replacement, resource lifetime and frame authority
repo-local and central documentation ledgers
```

## Kits identified

Current source-backed/conceptual kits:

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
debug-json-projection-kit
repo-local-agent-ledger-kit
central-ledger-sync-kit
```

Next-cut kits:

```txt
story-source-schema-kit
story-manifest-kit
story-source-fingerprint-kit
story-graph-validator-kit
versioned-save-envelope-kit
save-shape-validator-kit
save-reconciliation-kit
content-drift-migration-kit
canonical-hotspot-resolver-kit
story-command-kit
story-command-result-kit
inspection-proof-kit
clue-derivation-kit
completion-proof-kit
story-source-diagnostics-kit
dom-free-story-fixture-kit
```

## Services identified

```txt
authored scene/hotspot/clue/render descriptor supply
browser story orchestration
inspection, clue, log and route mutation
completion and delayed interlude policy
terminal projection and reset
localStorage parse/write/clear
fixed-aspect Three.js stage rendering
procedural material and post passes
hotspot hover/click raycasts
aggregate JSON diagnostics
planned source normalization and graph validation
planned source fingerprint and canonical indexes
planned versioned save validation/reconciliation/migration
planned canonical hotspot command resolution
planned typed command, inspection and completion proofs
planned source/save/render identity fixtures
```

## Main finding

The current source array, mutable save object, live hotspot descriptors and rendered scene do not share a canonical source identity. Any syntactically valid storage payload is shallow-merged. Unknown ids are retained, invalid field types are not rejected, and an invalid saved scene id can remain persisted while the first scene is rendered as fallback.

Both input paths pass full descriptor objects into mutation. The runtime does not prove that a hotspot belongs to the active scene or current source revision. Completion then trusts independently persisted clue strings rather than deriving them from canonical inspection facts.

## Next safe ledge

```txt
TheUnmappedHouse Story Source Manifest + Save Reconciliation Fixture Gate
```

The existing atomic StageKit scene-commit and resource-lifetime work remains the next render-host boundary after source/save authority is explicit.

## Validation state

Documentation-only. Runtime source, package scripts, dependencies, routes and deployment configuration were not changed. No branch or pull request was created. Existing syntax checks and browser smoke were not run because the requested proof modules do not exist and this run used the GitHub connector only.
