# Interaction Audit: Hotspot / Continue Adapter Contract

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T05-20-42-04-00`

## Current interaction loop

```txt
side-panel inspect button click
  -> inspectHotspot(hotspot)
  -> mutate inspected/clues/log/text
  -> maybe schedule interlude
  -> renderUi()
  -> saveState()

StageKit raycast click
  -> clickHotspot()
  -> onHotspot(hotspot)
  -> inspectHotspot(hotspot)

continue button click
  -> nextScene()
  -> mutate currentScene/state.route/interlude/stage/UI/save

KeyR
  -> localStorage.removeItem(SAVE_KEY)
  -> location.reload()
```

## Current issue

Interactions are raw browser callbacks into direct mutation. There is no command envelope, preflight result, command status, browser adapter plan, or adapter readback.

## Required command envelope fields

```txt
commandId
commandType
sourceVersion
sceneId
hotspotId optional
issuedBy: side-panel | stage-raycast | keyboard | fixture
issuedAtFrame optional
saveKey
previousStateHash optional
```

## Required result statuses

```txt
accepted
rejected
no_mutation
terminal
readback
normalized
```

## Required reasons

```txt
hotspot_first_inspection
hotspot_repeat_inspection
hotspot_unknown
scene_complete
scene_incomplete
continue_scene_accepted
continue_scene_rejected_incomplete
prototype_complete
load_empty_state
load_malformed_state
save_projected
reset_requested
stage_projection_created
adapter_plan_created
adapter_readback_created
```

## Browser adapter plan must own

```txt
text update
notebook log update
hotspot button labels
interlude open/closed state
continue button effect
StageKit loadScene request
localStorage write intent
localStorage clear intent
debug projection update
GameHost story diagnostic update
```

## Fixture acceptance rows

```txt
inspect_map_from_side_panel accepted
inspect_map_from_stage_raycast accepted
repeat_map no_mutation
inspect_unknown_hotspot rejected
continue_before_complete rejected
complete_first_scene accepted
continue_after_complete accepted
terminal_continue terminal
reset_requested accepted + clear-save intent
```

## Keep stable

```txt
visible inspect buttons
StageKit click target behavior
hover label behavior
interlude copy
KeyR reset affordance
localStorage key
```
