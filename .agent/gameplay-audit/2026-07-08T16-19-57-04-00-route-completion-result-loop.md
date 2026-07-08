# Route Completion Result Loop

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T16-19-57-04-00`

## Current gameplay loop

```txt
start in library-blank-map
  -> inspect map, window, shelf-gap
  -> sceneComplete(currentScene) becomes true
  -> show interlude
  -> continue to repeating-hallway
  -> inspect wrong-door, class-number, unfinished-photo
  -> show interlude
  -> continue to closet-weather
  -> inspect bucket-storm, wet-shadow, closet-map
  -> show final interlude
  -> continue returns prototype complete copy
```

## Current source issue

The route works, but completion is not represented as source-owned gameplay results.

`sceneComplete(scene)` reads live state through `hasClue`.

`inspectHotspot()` schedules interlude with a timeout after directly mutating state.

`nextScene()` handles normal scene transition and terminal prototype-complete behavior by mutating DOM text directly.

## Target gameplay result loop

```txt
inspection command
  -> clue delta
  -> inspected delta
  -> StoryEventRecord: clue_granted / hotspot_inspected
  -> SceneCompletionResult if required clues complete
  -> InterludeProjection if completion occurred

continue command
  -> rejected if scene incomplete
  -> SceneTransitionResult if next scene exists
  -> PrototypeCompleteResult if terminal route reached
  -> SaveProjection if state changed
```

## Required route records

```txt
RouteJournalRecord:
  commandId
  fromSceneId
  toSceneId
  status
  reason
  routeBefore
  routeAfter
  terminal
```

## Required completion records

```txt
SceneCompletionResult:
  sceneId
  requiredClues
  heldClues
  missingClues
  complete
  completedNow
```

## Fixture rows

```txt
complete_library_scene
continue_to_hallway
complete_full_route
prototype_complete_continue
```

## Stop condition

Do not add new rooms until the current three-room route has typed completion, transition, terminal, save, and projection rows that are replayable without DOM or StageKit.
