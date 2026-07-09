# Story Authority Audit: Fixture Readback Contract

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T19-00-15-04-00`

## Authority problem

`src/game.js` is still both the story source consumer and the browser adapter.

It directly owns:

```txt
SAVE_KEY
loadState()
saveState()
state
currentScene
hasClue()
grantClues()
writeLog()
sceneComplete()
inspectHotspot()
showInterlude()
nextScene()
renderUi()
KeyR reset
StageKit load calls
debug JSON projection
```

## Contract needed

The next implementation should create source-owned story authority files that emit serializable records before any DOM, localStorage, timer, or StageKit side effect.

## Proposed modules

```txt
src/story-source-manifest.js
src/story-snapshots.js
src/story-commands.js
src/story-preflight.js
src/story-results.js
src/story-reducer.js
src/story-projections.js
src/browser-adapter-plan.js
src/browser-adapter-readback.js
src/story-host-diagnostics.js
tests/fixtures/story-command-results.mjs
```

## Result contract fields

```txt
commandId
commandType
status
reason
sceneIdBefore
sceneIdAfter
hotspotId
accepted
mutated
completedScene
routeAdvanced
terminal
cluesAdded
saveIntent
interludeIntent
stageProjection
uiProjection
debugProjection
browserAdapterPlan
adapterReadback
repoLocalLedgerReadback
centralLedgerReadback
compatibilityText
errors
```

## Required reasons

```txt
default_state_loaded
malformed_save_fallback
hotspot_inspected
hotspot_repeated_no_mutation
hotspot_not_found
hotspot_not_in_current_scene
clue_granted
scene_complete
scene_incomplete
route_advanced
terminal_route
save_written
save_skipped
interlude_open_requested
stage_load_requested
adapter_projection_matches
repo_local_ledger_matches
central_ledger_matches
reset_requested
```

## Required fixtures

```txt
load_empty_storage
load_malformed_storage
inspect_new_map
inspect_repeat_map
inspect_invalid_hotspot
complete_library
continue_to_repeating_hallway
continue_terminal
reset_route
adapter_readback_current_scene
repo_local_ledger_readback
central_ledger_readback
```

## Compatibility rule

Keep the current visible route stable.

The browser adapter may call the new authority layer, but the public static page, `SAVE_KEY`, story copy, scene order, fixed 16:9 StageKit surface, hotspot picking behavior, interlude behavior, reset key, and debug panel should remain compatible.

## Main finding

The first source change should be additive authority and fixture proof. Do not replace `StageKit`, add rooms, add inventory, add audio, or retune visuals before this contract exists.
