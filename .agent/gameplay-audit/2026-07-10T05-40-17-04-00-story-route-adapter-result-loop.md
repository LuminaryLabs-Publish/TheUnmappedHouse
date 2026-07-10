# Gameplay Audit: Story Route Adapter Result Loop

**Timestamp:** `2026-07-10T05-40-17-04-00`

## Current story loop

```txt
scene starts
  -> player inspects hotspots
  -> first inspection grants clues
  -> required clues complete scene
  -> interlude opens after timeout
  -> continue moves to next scene
  -> final continue writes prototype-complete copy
```

## Current route data

```txt
scene count: 3
source file: src/story-data.js
scene ids:
  - library-blank-map
  - repeating-hallway
  - closet-weather
```

Each scene has:

```txt
id
title
openingText
backgroundColor
fog
camera
stage layers
stage props
post settings
hotspots
requiresToComplete
interludeTitle
interludeText
```

## Gameplay proof gap

The playable route works, but it is not fixture-provable outside the browser.

Needed proof rows:

```txt
initial-state
inspect-accepted
inspect-repeat-no-mutation
inspect-unknown-rejected
inspect-scene-mismatch-rejected
scene-complete
continue-next-scene
continue-terminal
save-intent
interlude-intent
stage-load-intent
projection-record
browser-adapter-readback
```

## Main gameplay finding

Do not add new rooms yet.

The three-room loop should become deterministic and replayable first.
