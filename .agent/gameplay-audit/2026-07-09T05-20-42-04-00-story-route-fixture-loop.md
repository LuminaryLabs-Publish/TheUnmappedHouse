# Gameplay Audit: Story Route Fixture Loop

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T05-20-42-04-00`

## Current gameplay loop

```txt
start in library-blank-map
  -> inspect three hotspots
  -> gain required clues
  -> sceneComplete(currentScene) becomes true
  -> interlude opens after timeout
  -> continue advances to repeating-hallway
  -> inspect three hotspots
  -> continue advances to closet-weather
  -> inspect three hotspots
  -> continue reaches prototype-complete text
```

## Current gameplay authority

`src/story-data.js` owns the route facts.

`src/game.js` owns the runtime rules and mutations.

## Scene route facts

```txt
library-blank-map:
  required clues: clue:blank-square, clue:house-door, clue:deep-shelf
  hotspot ids: map, window, shelf-gap
  interlude: Map update

repeating-hallway:
  required clues: clue:home-address, clue:wallpaper, clue:unfinished-family
  hotspot ids: wrong-door, class-number, unfinished-photo
  interlude: Field note

closet-weather:
  required clues: clue:stored-rain, clue:wet-shadow, clue:west-wing
  hotspot ids: bucket-storm, wet-shadow, closet-map
  interlude: The first rule
```

## Missing gameplay proof

```txt
no source manifest row
no scene source validation row
no route order fixture
no completion requirement fixture
no grantable clue fixture
no repeat inspection no-mutation row
no unknown hotspot rejected row
no incomplete continue rejected row
no terminal prototype result row
no browser adapter readback row
no GameHost story projection row
```

## Required replay fixture

```txt
initial_state
inspect map
inspect window
inspect shelf-gap
complete library-blank-map
continue repeating-hallway
inspect wrong-door
inspect class-number
inspect unfinished-photo
complete repeating-hallway
continue closet-weather
inspect bucket-storm
inspect wet-shadow
inspect closet-map
complete closet-weather
continue terminal
```

## Gameplay rule

The next runtime work should prove current gameplay behavior, not alter it.

Any new rooms or inventory mechanics should wait until the current three-room loop can replay without DOM and produce stable command/result/projection rows.
