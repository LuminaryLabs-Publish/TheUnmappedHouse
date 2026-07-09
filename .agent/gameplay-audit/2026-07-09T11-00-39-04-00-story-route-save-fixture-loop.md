# Story Route Save Fixture Loop

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T11-00-39-04-00`

## Current gameplay loop

```txt
open index.html
  -> load saved story state
  -> resolve current scene
  -> StageKit loads current scene
  -> inspect hotspot
  -> grant clue and write log
  -> check scene completion
  -> show interlude
  -> continue to next scene
  -> save route and inspected state
  -> terminal prototype complete state
```

## Gameplay domains

```txt
story scene route
hotspot inspection
clue grant
scene completion
interlude transition
notebook log
terminal prototype completion
reset
save/load
debug projection
```

## Current mutation points

```txt
state.inspected[currentScene.id]
state.clues
state.log
state.sceneId
state.route
text.textContent
interlude DOM state
StageKit loaded scene
localStorage value
debug.textContent
```

## Fixture target

```txt
fixture row
  -> initial source and state snapshots
  -> command envelope
  -> preflight
  -> reducer
  -> command result
  -> event records
  -> projections
  -> adapter plan
  -> readback
  -> expected next state
```

## Required fixture rows

```txt
initial_state_created
inspect_first_hotspot
repeat_hotspot_no_mutation
unknown_hotspot_rejected
scene_incomplete_continue_rejected
complete_library_scene
continue_to_repeating_hallway
complete_all_scenes
prototype_terminal_result
save_projection_created
browser_adapter_plan_created
browser_adapter_readback_created
repo_local_ledger_snapshot_created
central_ledger_snapshot_created
```
