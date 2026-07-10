# Gameplay audit: story route fixture loop

Timestamp: `2026-07-10T00-51-03-04-00`

## Gameplay surface

The game is a three-scene point-and-click story route.

```txt
library-blank-map
  -> requires clue:blank-square, clue:house-door, clue:deep-shelf
  -> interlude: Map update

repeating-hallway
  -> requires clue:home-address, clue:wallpaper, clue:unfinished-family
  -> interlude: Field note

closet-weather
  -> requires clue:stored-rain, clue:wet-shadow, clue:west-wing
  -> interlude: The first rule
  -> terminal route after continue
```

## Current state model

```txt
sceneId: current scene id
clues: flat clue id list
flags: currently unused
inspected: scene id -> hotspot id -> true
route: visited scene ids
log: newest-first notebook entries, max 8
```

## Current route loop

```txt
inspect all required hotspots in current scene
  -> sceneComplete(currentScene) becomes true
  -> showInterlude(currentScene) after 450ms
  -> continue button calls nextScene()
  -> if next exists, load next scene and save
  -> if next missing, terminal prototype-complete copy appears
```

## Fixture-worthy cases

```txt
initial_state_resolves_library
inspect_map_grants_blank_square
inspect_window_grants_house_door
repeat_map_returns_no_mutation
complete_library_emits_interlude_intent
continue_library_loads_repeating_hallway
complete_hallway_loads_closet_weather
complete_closet_continue_returns_terminal_route
unknown_hotspot_is_rejected
continue_before_complete_is_rejected_or_noop_with_reason
save_projection_is_serializable
stage_load_projection_is_serializable
```

## Gameplay gaps

- `flags` exists but has no current role.
- Completion is inferred on every inspect instead of recorded as a result.
- Repeat inspect still writes log/save, but fixture cannot distinguish intended no-mutation facts from browser side effects.
- Terminal route does not save or close/open interlude consistently as a source result.
- No replay can run the story route outside DOM/localStorage/StageKit.

## Main finding

The story route is small enough for a complete DOM-free fixture matrix. That fixture should come before content expansion.
