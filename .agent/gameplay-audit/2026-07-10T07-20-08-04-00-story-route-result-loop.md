# Gameplay audit — Story route result loop

Timestamp: `2026-07-10T07-20-08-04-00`

## Current story loop

```txt
initial state
  -> sceneId = first scene or saved scene
  -> inspect all required hotspots
  -> sceneComplete(currentScene)
  -> showInterlude(currentScene)
  -> continue button calls nextScene()
  -> route advances to next scene
  -> final continue writes prototype-complete copy
```

## Current scenes

```txt
library-blank-map
repeating-hallway
closet-weather
```

## Gameplay proof gap

The route is understandable, but gameplay progress is not represented as source-owned results.

Missing rows:

```txt
initial-state result
inspect accepted result
inspect repeat/no_mutation result
completion result
continue next-scene result
continue terminal result
save intent
interlude intent
stage-load intent
projection record
replay row
```

## Safe next gameplay work

```txt
1. Add pure story state snapshots.
2. Add inspect hotspot command envelopes.
3. Add continue command envelopes.
4. Add stable reason codes.
5. Add command results and replay rows.
6. Add intent rows for projection, save, interlude, terminal, and stage-load effects.
7. Prove all rows with a DOM-free story fixture.
```

## Unsafe next gameplay work

```txt
Do not add rooms yet.
Do not add inventory yet.
Do not add audio yet.
Do not add story branches before result rows exist.
```
