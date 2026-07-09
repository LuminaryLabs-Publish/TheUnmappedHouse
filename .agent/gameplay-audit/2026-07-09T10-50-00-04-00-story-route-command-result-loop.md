# Gameplay Audit: Story Route Command Result Loop

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T10-50-00-04-00`

## Current gameplay loop

```txt
scene opens
  -> player inspects hotspots
  -> clues are granted
  -> completion checks current scene requirements
  -> interlude opens when requirements are met
  -> continue advances to next scene
  -> terminal route writes prototype-complete copy
```

## Gameplay domains

```txt
scene route
scene completion
hotspot inspection
repeat inspection
clue grant
notebook log
interlude gate
terminal prototype state
reset/save/load
```

## Current blocker

The route works as a prototype, but gameplay state transitions are coupled to browser DOM and localStorage calls.

`inspectHotspot` and `nextScene` should become consumers of source-owned command results, not the place where route rules are authored.

## Needed result loop

```txt
StoryCommandEnvelope
  -> StoryPreflight
  -> StoryCommandResult
  -> StoryEventRecord[]
  -> StoryCommandLedger
  -> StoryProjection
  -> SaveProjection
  -> InterludeProjection
  -> StageProjection
  -> BrowserAdapterPlan
  -> BrowserAdapterReadback
```

## Fixture route rows

```txt
initial_state_created
inspect_first_hotspot
repeat_hotspot_no_mutation
complete_library_scene
continue_to_repeating_hallway
complete_all_scenes
prototype_terminal_result
reset_save_projection_created
```

## Next safe ledge

```txt
TheUnmappedHouse Story Command Result Ledger + Adapter Readback Fixture Gate
```
