# Hotspot Command Adapter Boundary

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T01-50-17-04-00`

## Current interaction sources

```txt
side-panel hotspot button
StageKit raycast click
continue button
KeyR reset
initial load
save write
debug projection
```

## Current command path

```txt
button or raycast
  -> inspectHotspot(hotspot)
  -> mutate state.inspected
  -> grant clues
  -> write text/log
  -> detect completion
  -> schedule interlude
  -> render UI
  -> save state
```

## Problem

The interaction path does not produce first-class command records.

Missing records:

```txt
StoryCommandEnvelope
StoryPreflight
StoryCommandResult
StoryEventRecord
StoryProjection
SaveProjection
InterludeProjection
StageProjection
StoryBrowserAdapterPlan
BrowserAdapterReadback
```

## Required command envelopes

```txt
story.inspect_hotspot:
  source: side-panel | stage-raycast | fixture
  sceneId
  hotspotId
  requestId

story.continue_scene:
  source: button | fixture
  sceneId
  requestId

story.reset_save:
  source: key | fixture
  requestId
```

## Required interaction result statuses

```txt
accepted:
  first hotspot inspection
  completion-causing inspection
  valid scene transition
  valid save/reset projection

no_mutation:
  repeated hotspot inspection

rejected:
  unknown hotspot
  unknown scene
  malformed loaded save
  continue while incomplete

terminal:
  prototype complete
```

## Adapter boundary

`src/game.js` should eventually translate DOM/StageKit events into command envelopes, consume the resulting adapter plan, then produce readback.

It should not own source validation, clue grants, route transitions, save semantics, or stage projection decisions.
