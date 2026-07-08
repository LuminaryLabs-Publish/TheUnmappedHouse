# Story Command Host Wire Map

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T14-31-06-04-00`

## Goal

Define how the existing UI and StageKit callbacks should route through story command authority without changing the visible point-and-click loop.

## Existing input paths

```txt
side-panel hotspot button
  -> button.addEventListener("click", () => inspectHotspot(hotspot))

StageKit hotspot click
  -> renderer click
  -> clickHotspot()
  -> pick()
  -> onHotspot(hotspot)
  -> inspectHotspot(hotspot)

Continue button
  -> continueButton.addEventListener("click", nextScene)

Reset key
  -> KeyR
  -> localStorage.removeItem(SAVE_KEY)
  -> location.reload()
```

## Target input paths

```txt
side-panel hotspot button
  -> dispatchStoryCommand({ type: "story.inspect_hotspot", hotspotId })

StageKit hotspot click
  -> dispatchStoryCommand({ type: "story.inspect_hotspot", hotspotId })

Continue button
  -> dispatchStoryCommand({ type: "story.continue_scene" })

Reset key
  -> dispatchStoryCommand({ type: "story.reset_save" })
```

## Host adapter responsibilities

`src/game.js` may keep:

```txt
DOM node references
StageKit construction
event listener registration
current browser-only render timing
localStorage read/write plumbing
applying StoryProjection to DOM
applying SaveProjection to localStorage
applying InterludeProjection to the interlude shell
calling stage.loadScene when a SceneTransitionResult says to
calling renderUi-like projection update code
```

`src/game.js` must stop owning:

```txt
whether a hotspot is valid
whether an inspection repeats
whether clues are granted
whether a room is complete
whether continue is accepted
whether prototype is complete
which reason code applies
which events are emitted
which save intent is required
what GameHost diagnostics report
```

## Required dispatch result shape

```txt
{
  commandId,
  type,
  status,
  reason,
  sceneIdBefore,
  sceneIdAfter,
  stateBefore,
  stateAfter,
  events,
  storyProjection,
  saveProjection,
  interludeProjection,
  diagnostics
}
```

## Fixture rows mapped to host input

```txt
inspect_first_hotspot:
  source: hotspot button or StageKit click
  expected: accepted, hotspot_inspected, clue granted, save write intent

repeat_hotspot:
  source: hotspot button or StageKit click
  expected: no_mutation, hotspot_repeated, no duplicate clue, save write or no-save policy explicit

unknown_hotspot:
  source: malformed command
  expected: rejected, hotspot_unknown, no mutation, no save write

scene_incomplete_continue:
  source: Continue button
  expected: rejected, scene_incomplete, no route mutation

complete_library_scene:
  source: third required hotspot inspection
  expected: accepted, scene_completed event, interlude open projection

continue_to_hallway:
  source: Continue button after completion
  expected: accepted, scene_transitioned, route append, stage scene load projection

prototype_complete_continue:
  source: Continue button after final scene completion
  expected: terminal, prototype_complete, no invalid scene fallback

reset_save:
  source: KeyR
  expected: accepted, reset_requested, clear-save projection, initial state projection
```

## Adapter stop line

Do not implement browser automation before the DOM-free fixture passes.

Do not move command validation into StageKit.

Do not let fixture cases import DOM, Three.js, localStorage, `setTimeout`, browser input, or StageKit raycasting.
