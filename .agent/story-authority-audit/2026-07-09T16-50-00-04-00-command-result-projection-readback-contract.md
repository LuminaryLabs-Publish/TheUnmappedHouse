# Story Authority Audit: Command Result Projection Readback Contract

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T16-50-00-04-00`

## Summary

Story authority is still browser-bound. The next implementation should introduce a pure command/result contract that can be fixture-tested before browser mutation.

## Current source authority state

```txt
source descriptors: src/story-data.js
initial state: src/game.js/createInitialState()
save load: src/game.js/loadState()
save write: src/game.js/saveState()
clue grant: src/game.js/grantClues()
completion: src/game.js/sceneComplete()
inspect command: src/game.js/inspectHotspot()
continue command: src/game.js/nextScene()
projection: src/game.js/renderUi()
interlude: src/game.js/showInterlude()
reset: keydown handler in src/game.js
```

## Contract to add

```txt
StorySourceManifest:
  productId
  routeId
  sourceVersion
  saveKey
  entrySceneId
  sceneIds[]
  hotspotIdsByScene
  commandKinds[]
  reasonCodes[]

StoryCommandEnvelope:
  id
  kind
  sourceVersion
  sceneId
  hotspotId?
  timestamp?
  inputSource

StoryPreflight:
  ok
  reason
  command
  currentScene
  targetHotspot
  stateSummary

StoryCommandResult:
  status
  reason
  command
  before
  after
  events[]
  projections
  saveIntent
  interludeIntent
  stageIntent
  browserAdapterPlan

BrowserAdapterReadback:
  titleText
  bodyText
  hotspotButtonLabels[]
  debugJson
  interludeOpen
  currentStageSceneId
  savedStateHash
```

## Result statuses

```txt
accepted
rejected
no_mutation
terminal
load_fallback
adapter_applied
adapter_mismatch
```

## Canonical command kinds

```txt
load_saved_state
inspect_hotspot
continue_scene
reset_story
project_ui
apply_browser_adapter_plan
read_browser_adapter
read_repo_local_ledger
read_central_ledger
```

## Required projections

```txt
storyPanelProjection:
  sceneTitle
  sceneText
  hotspotButtons

notebookProjection:
  latestLog

debugProjection:
  game
  scene
  clues
  route
  inspected
  complete
  latest

saveProjection:
  shouldWrite
  key
  value

interludeProjection:
  shouldOpen
  title
  text
  delayMs

stageProjection:
  shouldLoad
  sceneId
  camera
  hotspotIds
```

## Fixture rows required before browser changes

```txt
load_empty_storage
load_malformed_storage
inspect_library_map_first_time
inspect_library_map_repeat
inspect_missing_hotspot
complete_library_scene
continue_to_repeating_hallway
continue_terminal_after_closet
reset_story_command
project_debug_json
repo_local_ledger_readback
central_ledger_readback
```

## Main finding

The safest source-authority cut is additive. Keep `src/game.js` as the adapter initially, but make it consume pure results from a story reducer and record readback proof.
