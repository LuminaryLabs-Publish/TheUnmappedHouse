# Gameplay audit: Story Route Command Adapter Loop

Timestamp: `2026-07-10T13-01-11-04-00`

## Current story route

```txt
library-blank-map
  -> inspect map/window/shelf-gap
  -> complete required clues
  -> interlude
  -> repeating-hallway
  -> inspect wrong-door/class-number/unfinished-photo
  -> interlude
  -> closet-weather
  -> inspect bucket-storm/wet-shadow/closet-map
  -> terminal prototype-complete route
```

## Current state model

```txt
sceneId
clues
flags
inspected
route
log
```

## Gameplay proof gap

The route works visually, but the route is not command-result driven.

Completion is inferred by current mutable state and scheduling side effects.

Continue mutates browser state directly and loads the next scene directly.

Terminal behavior writes copy directly into the interlude DOM.

## Next proof target

```txt
StoryCommandEnvelope
  -> inspectHotspot
  -> continueRoute
  -> resetStory

StoryCommandResult
  -> accepted / rejected / no_mutation
  -> stateDelta
  -> grantedClues
  -> completionStatus
  -> routeIntent
  -> projectionIntent
  -> saveIntent
  -> stageLoadIntent
  -> interludeIntent
  -> terminalIntent
```

## Main finding

Do not add new rooms next. Prove the existing three-scene route with source-owned command, route, projection, save, and adapter rows first.
