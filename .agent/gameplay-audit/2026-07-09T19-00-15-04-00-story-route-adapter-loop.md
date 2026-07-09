# Gameplay Audit: Story Route Adapter Loop

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T19-00-15-04-00`

## Current story route

```txt
library-blank-map
  -> repeating-hallway
  -> closet-weather
  -> terminal prototype-complete state
```

## Current gameplay loop

```txt
read current scene
  -> inspect all required hotspots
  -> sceneComplete(currentScene) checks requiresToComplete.every(hasClue)
  -> setTimeout(showInterlude, 450)
  -> continue button calls nextScene()
  -> route advances by array index
  -> StageKit loads next scene descriptor
  -> UI and save update
```

## Gameplay domains

```txt
scene source domain
hotspot source domain
clue ledger domain
completion requirement domain
scene route domain
interlude domain
terminal route domain
save projection domain
story log domain
StageKit scene load domain
fixture replay domain next
```

## Gameplay services

```txt
sceneComplete service: checks all required clues for current scene
route advance service: array index based next scene resolution
interlude service: delayed DOM overlay mutation
terminal service: direct DOM copy write when no next scene exists
save service: write mutable state to localStorage after inspect or route advance
planned route contract service: explicit next scene ids and terminal outcomes
planned fixture service: replay first inspect, repeat inspect, complete scene, continue, terminal continue, save/readback
```

## Gaps

```txt
Scene routing assumes array order rather than a source-owned route contract.
Completion has no reason code matrix.
Interlude timing is a browser timer rather than a deterministic projection.
Terminal route does not save or emit a terminal command result.
Malformed loaded route state is only shallow-merged, not validated.
No fixture proves story route after each command.
```

## Next fixture rows

```txt
complete_library -> accepted / scene_complete / interlude_intent map-update
continue_to_repeating_hallway -> accepted / route_advanced / stage_projection repeating-hallway
complete_repeating_hallway -> accepted / scene_complete / interlude_intent field-note
continue_to_closet_weather -> accepted / route_advanced / stage_projection closet-weather
complete_closet_weather -> accepted / scene_complete / interlude_intent first-rule
continue_terminal -> accepted / prototype_complete / terminal_projection / no_next_scene
malformed_saved_scene -> accepted / fallback_default_scene / no_crash
```

## Main finding

The story route is compact and suitable for fixture proof. Do not expand rooms before route, completion, terminal, and save behavior are represented as source-owned result rows.
