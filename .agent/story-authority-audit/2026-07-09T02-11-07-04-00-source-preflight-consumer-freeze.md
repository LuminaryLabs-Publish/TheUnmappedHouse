# Story Authority Audit: Source Preflight Consumer Freeze

**Timestamp:** `2026-07-09T02-11-07-04-00`

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

## Source authority target

The next implementation must make story rules source-owned and fixture-readable before browser code consumes them.

## Current risks

```txt
localStorage is shallow-merged without source-version facts
invalid saved scene falls back silently to scenes[0]
duplicate scene ids are not rejected before runtime
duplicate hotspot ids are not rejected before runtime
completion requirements are not checked against grantable clue ids
repeat inspection is a UI branch, not a typed no_mutation result
unknown hotspot has no stable rejected result
terminal prototype-complete path writes DOM copy directly
save/reset operations do not return result or intent records
central ledger freshness is updated manually instead of read back by fixture rows
```

## Required pure authority files

```txt
src/story-authority/story-source-manifest.js
src/story-authority/story-source-snapshot.js
src/story-authority/story-state-snapshot.js
src/story-authority/stage-scene-snapshot.js
src/story-authority/story-command-envelope.js
src/story-authority/story-command-reasons.js
src/story-authority/story-command-result.js
src/story-authority/story-event-record.js
src/story-authority/story-preflight.js
src/story-authority/story-reducer.js
src/story-authority/story-projection.js
src/story-authority/save-projection.js
src/story-authority/interlude-projection.js
src/story-authority/stage-projection.js
src/story-authority/story-browser-adapter-plan.js
src/story-authority/browser-adapter-readback.js
src/story-authority/gamehost-story-diagnostics.js
src/story-authority/central-ledger-readback.js
src/story-authority/story-fixture-cases.js
scripts/validate-story-authority.mjs
```

## Source manifest fields

```txt
productId: the-unmapped-house
routeId: fixed-camera-stage-prototype
publicEntry: index.html -> src/game.js
saveKey: the-unmapped-house.stage-prototype.v1
storyVersion
sceneIds
commandTypes
reasonCatalog
fixtureIds
centralLedgerPath
latestTrackerPath
```

## Source preflight rows

```txt
source_preflight_passes
invalid_scene_id_rejected
duplicate_scene_descriptor_rejected
duplicate_hotspot_descriptor_rejected
ungrantable_required_clue_rejected
invalid_command_rejected
unknown_hotspot_rejected
loaded_state_normalized
loaded_state_rejected
```

## Consumer freeze

`src/game.js` should become a browser consumer after the next pass.

It may still own DOM node references, event bindings, localStorage access, timer scheduling, and StageKit instance calls.

It should not own story rules after the splice. It should consume:

```txt
StoryCommandResult
StoryProjection
SaveProjection
InterludeProjection
StageProjection
StoryBrowserAdapterPlan
BrowserAdapterReadback
GameHostStoryDiagnostics
```

## Central ledger readback

Add a fixture row named `central_ledger_snapshot`.

The row should report latest repo-local tracker, turn-ledger, architecture audit, render audit, interaction audit, gameplay audit, story-authority audit, deploy audit, kit registry, and central ledger path. This prevents future central updates from relying only on memory.
