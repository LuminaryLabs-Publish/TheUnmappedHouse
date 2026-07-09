# Gameplay Audit: Story Route Save Fixture Map

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T13-25-41-04-00`

## Current gameplay loop

```txt
inspect all required hotspots in the current scene
  -> sceneComplete(currentScene) becomes true
  -> interlude opens
  -> continue advances to next scene
  -> route records scene id
  -> state saves to localStorage
repeat until terminal prototype-complete message
```

## Current scenes

```txt
library-blank-map:
  required clues: clue:blank-square, clue:house-door, clue:deep-shelf
  interlude: Map update

repeating-hallway:
  required clues: clue:home-address, clue:wallpaper, clue:unfinished-family
  interlude: Field note

closet-weather:
  required clues: clue:stored-rain, clue:wet-shadow, clue:west-wing
  interlude: The first rule
```

## Current state shape

```txt
sceneId
clues[]
flags{}
inspected{}
route[]
log[]
```

## Fixture rows required next

```txt
initial_state_creates_library_route accepted
load_empty_state_uses_initial accepted
load_valid_scene_restores_current_scene accepted
load_unknown_scene_falls_back_to_first_scene normalized
inspect_first_library_map accepted
inspect_repeat_library_map no_mutation
inspect_all_library_hotspots_completes_scene accepted_scene_complete
continue_from_complete_library_routes_to_hallway accepted
continue_before_complete_scene rejected_incomplete_scene
continue_from_terminal_scene accepted_terminal_prototype
reset_requested accepted_clear_save_intent
malformed_save_state normalized_malformed_save_state
stage_projection_for_route_change accepted
browser_adapter_readback_matches_stage_projection accepted
repo_local_ledger_matches_timestamp accepted
central_ledger_matches_timestamp accepted
```

## Gap

The current code cannot produce these rows because it mutates browser state and DOM directly.

## Next source boundary

Add `src/story-authority/*` modules first, then let `src/game.js` consume the source-owned reducer/projection records.
