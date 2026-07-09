# Interaction Audit — Hotspot Preflight Result Contract

**Timestamp:** `2026-07-09T13-29-43-04-00`

## Current interaction inputs

```txt
side-panel inspect button
StageKit raycast hotspot click
continue button
KeyR reset
initial load / saved load
```

## Current command path

```txt
button or raycast click
  -> inspectHotspot(hotspot)
  -> check if hotspot was seen in state.inspected[currentScene.id]
  -> repeat path writes text/log/UI/save and returns
  -> first path mutates inspected map
  -> grants clues
  -> writes text/log
  -> checks sceneComplete(currentScene)
  -> may setTimeout(showInterlude, 450)
  -> renderUi()
  -> saveState()
```

## Missing interaction facts

```txt
command id
command type
input source
source scene id
target hotspot id
preflight status
repeat/no_mutation reason
unknown hotspot rejection
scene completion result
save intent
interlude intent
stage projection intent
adapter actions to perform
adapter readback after actions
```

## Proposed contract

```txt
StoryCommandEnvelope
  type: story.inspect_hotspot | story.continue_scene | story.reset_save | story.load_state | story.save_state
  source: side_panel | stage_raycast | keyboard | boot | fixture
  sceneId
  hotspotId
  payload
  timestamp

StoryPreflight
  status
  reason
  currentSceneId
  targetHotspotId
  alreadyInspected
  canMutate

StoryCommandResult
  status: accepted | rejected | no_mutation | terminal | readback
  reason
  stateBefore
  stateAfter
  events
  projections
```

## Required reason codes

```txt
inspect_first_hotspot
inspect_repeat_no_mutation
inspect_unknown_hotspot_rejected
continue_scene_incomplete_rejected
continue_scene_accepted
continue_terminal_result
load_empty_state
load_malformed_state_normalized
save_projection_created
reset_save_requested
repo_local_ledger_readback
central_ledger_readback
```

## Browser adapter rule

The browser should not decide mutation shape directly. It should consume `StoryBrowserAdapterPlan` rows that say what to update:

```txt
textContent
notebookLog
hotspotButtonState
interludeState
stageSceneLoad
saveWrite
saveClear
GameHostStoryDiagnostics
```

## Recommendation

Implement the DOM-free interaction fixture before adapting `src/game.js`. Once fixture rows pass, wire the browser to the same command/result/projection path.
