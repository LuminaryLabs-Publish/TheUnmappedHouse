# Gameplay Audit — Story Route Save Ledger Loop

**Timestamp:** `2026-07-09T08-02-33-04-00`

## Current gameplay loop

`TheUnmappedHouse` gameplay is an inspection-and-completion loop:

```txt
inspect all required hotspots in scene
  -> grant required clue ids
  -> sceneComplete(scene) becomes true
  -> show interlude
  -> continue to next scene
  -> append route
  -> load StageKit scene
  -> save state
```

## Current story sequence

```txt
library-blank-map
  -> repeating-hallway
  -> closet-weather
  -> prototype complete
```

## Current state facts

```txt
SAVE_KEY: the-unmapped-house.stage-prototype.v1
state.sceneId
state.clues[]
state.flags{}
state.inspected{}
state.route[]
state.log[]
```

## Gameplay authority gap

The gameplay logic is still browser-owned.

Required next reducer facts:

```txt
currentSceneId
nextSceneId
completionRequirementIds
grantableClueIds
newlyGrantedClues
previouslyInspectedHotspots
sceneCompletionBefore
sceneCompletionAfter
routeBefore
routeAfter
saveIntent
interludeIntent
stageProjectionIntent
terminalIntent
```

## Fixture rows required

```txt
inspect_first_hotspot
repeat_hotspot_no_mutation
unknown_hotspot_rejected
scene_incomplete_continue_rejected
complete_library_scene
continue_to_repeating_hallway
complete_all_scenes
prototype_terminal_result
save_projection_created
interlude_projection_created
stage_projection_created
```

## Gameplay decision

Do not add inventory, enemy pressure, audio, more rooms, or alternate endings until the current three-scene route can be replayed through DOM-free command/result rows.