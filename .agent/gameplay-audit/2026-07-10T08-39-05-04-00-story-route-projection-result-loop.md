# Gameplay audit: story route projection result loop

Timestamp: `2026-07-10T08-39-05-04-00`

## Current playable loop

```txt
start at library-blank-map
  -> inspect map/window/shelf-gap
  -> collect clue:blank-square, clue:house-door, clue:deep-shelf
  -> completion policy passes
  -> show map update interlude
  -> continue to repeating-hallway
  -> inspect wrong-door/class-number/unfinished-photo
  -> collect hallway clues
  -> show field note interlude
  -> continue to closet-weather
  -> inspect bucket-storm/wet-shadow/closet-map
  -> collect final clues
  -> show first rule interlude
  -> continue terminal prototype-complete copy
```

## Current state shape

```txt
sceneId
clues[]
flags{}
inspected{ sceneId: { hotspotId: true } }
route[]
log[]
```

## Story source descriptors

`src/story-data.js` owns:

```txt
gameTitle
3 scene descriptors
9 hotspot descriptors
clue grant rows
requiresToComplete rows
interlude title/text rows
camera descriptors
stage layer/prop descriptors
post-process descriptors
```

## Gameplay proof gap

The route is clear, but gameplay state changes are not returned as records. The browser mutates state and then projects DOM.

Missing rows:

```txt
InitialStoryStateRow
InspectAcceptedResult
InspectRepeatNoMutationResult
InspectRejectedResult
SceneCompletionResult
ContinueNextSceneResult
ContinueTerminalResult
SaveIntentRecord
InterludeIntentRecord
StageLoadIntentRecord
ProjectionRecord
ReplayRow
```

## Main risk

Any future content expansion would multiply unproven branches. Add proof rows before adding rooms, inventory, audio, alternative routes, or more hotspot logic.

## Fixture target

A fixture should replay the full three-scene route without DOM and assert:

```txt
all required clue grants occur once
repeat inspection is accepted/no_mutation or rejected with stable reason
scene completion emits interlude intent
continue emits next-scene or terminal result
projection/save/stage-load intents are serializable
route history is deterministic
```
