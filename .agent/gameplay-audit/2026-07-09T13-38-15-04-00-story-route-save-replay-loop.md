# Story Route Save Replay Loop

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T13-38-15-04-00`

## Gameplay loop

```txt
start at library-blank-map
  -> inspect three hotspots
  -> collect required clues
  -> sceneComplete(currentScene) becomes true
  -> show interlude
  -> continue to repeating-hallway
  -> inspect three hotspots
  -> collect required clues
  -> continue to closet-weather
  -> inspect three hotspots
  -> collect required clues
  -> terminal completion text
```

## Save loop

```txt
createInitialState()
  -> shallow merge localStorage JSON if present
  -> mutate module state through inspectHotspot and nextScene
  -> saveState() serializes state to SAVE_KEY
  -> KeyR removes SAVE_KEY and reloads
```

## Current state fields

```txt
sceneId
clues
flags
inspected
route
log
```

## Gameplay services in current runtime

```txt
load state
save state
check clue membership
grant clues
write notebook log
check scene completion
inspect hotspot
show interlude
advance scene
render side-panel buttons
render debug JSON
reset saved state
```

## Missing replay proof

There is no replayable command journal.

There is no result ledger.

There is no fixture proving that the same command sequence produces the same scene id, clue list, inspected map, route, log, interlude intent, save intent, and StageKit projection intent.

## Required replay fixture rows

```txt
row_01_load_empty_state
row_02_inspect_library_map
row_03_repeat_library_map
row_04_complete_library
row_05_continue_to_hallway
row_06_corrupted_save_fallback
row_07_complete_all_scenes
row_08_terminal_continue
row_09_reset_intent
row_10_repo_and_central_ledger_readback
```

## Next gate

Add fixture rows before adding rooms, additional mechanics, inventory, or browser-only automation.
