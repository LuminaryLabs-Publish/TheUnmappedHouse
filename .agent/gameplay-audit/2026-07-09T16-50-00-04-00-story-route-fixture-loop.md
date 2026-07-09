# Gameplay Audit: Story Route Fixture Loop

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T16-50-00-04-00`

## Summary

The gameplay loop is a three-room point-and-click clue progression. It works as a prototype, but the route and completion rules are implicit and browser-bound.

## Current gameplay loop

```txt
start in library-blank-map
  -> inspect three hotspots
  -> collect required clues
  -> sceneComplete() becomes true
  -> interlude opens after 450ms
  -> continue to repeating-hallway
  -> repeat same loop
  -> continue to closet-weather
  -> complete final room
  -> continue writes prototype-complete text
```

## Gameplay domains

```txt
scene route
scene source descriptors
hotspot source descriptors
clue inventory
inspected hotspot state
completion requirements
notebook event log
interlude progression
terminal prototype-complete state
save/load continuity
reset continuity
```

## Gameplay services

```txt
create initial story state
load saved story state
find current scene by saved scene id
grant clues without duplicates
write latest notebook entries
calculate scene completion
inspect new hotspot
inspect repeated hotspot
open interlude
advance route to next scene
write terminal complete copy
save state after interactions
reset saved state
```

## Kits identified

```txt
story-route-kit
scene-source-kit
hotspot-source-kit
clue-ledger-kit
inspected-hotspot-state-kit
scene-completion-kit
notebook-log-kit
interlude-progression-kit
terminal-route-kit
save-continuity-kit
reset-continuity-kit
```

## Current story content

```txt
library-blank-map:
  required clues: clue:blank-square, clue:house-door, clue:deep-shelf
  hotspots: map, window, shelf-gap

repeating-hallway:
  required clues: clue:home-address, clue:wallpaper, clue:unfinished-family
  hotspots: wrong-door, class-number, unfinished-photo

closet-weather:
  required clues: clue:stored-rain, clue:wet-shadow, clue:west-wing
  hotspots: bucket-storm, wet-shadow, closet-map
```

## Gameplay gaps

```txt
route order is array-index based and not source-owned as a route manifest
completion has no result reason or event record
terminal route does not emit a command result
repeat hotspot path has no gameplay result even though it logs and saves
malformed loaded route state is not validated before currentScene fallback
interlude timing is not represented as a projection
save persistence is not represented as an intent or readback
```

## Required reducer fixtures

```txt
initial_state_has_library_route
load_unknown_scene_falls_back_to_library_with_reason
inspect_map_grants_blank_square
repeat_map_does_not_duplicate_clue
library_not_complete_until_all_required_clues
library_complete_after_three_required_clues
continue_from_library_enters_repeating_hallway
continue_from_repeating_hallway_enters_closet_weather
continue_from_closet_weather_is_terminal
reset_clears_to_initial_state
```

## Main finding

The story loop is small enough to fixture completely. The next implementation should treat this as a DOM-free reducer proof target before adding content or presentation features.
