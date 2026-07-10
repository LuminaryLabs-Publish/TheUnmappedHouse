# Architecture audit: story command readback DSK map

Timestamp: `2026-07-10T11-30-28-04-00`

## Current architecture

```txt
index.html
  -> fixed browser shell
  -> src/game.js
    -> imports StageKit
    -> imports src/story-data.js
    -> owns story state and localStorage
    -> owns inspect/continue/reset commands
    -> owns DOM projection
    -> owns interlude and terminal route effects
    -> calls StageKit.loadScene(currentScene)
  -> src/stage-kit.js
    -> owns Three.js render host
    -> consumes scene/stage/hotspot/post descriptors
    -> maps raycast hit to onHotspot callback
```

## DSK/domain breakdown

```txt
story-source-descriptor-domain
  owns gameTitle, scenes, scene ids, opening text, requirements, interlude text, hotspot ids, hotspot grants, stage descriptors, camera descriptors, and post descriptors

story-command-domain
  currently implicit inside inspectHotspot(), nextScene(), and KeyR handling
  should own command envelopes for inspect_hotspot, continue_scene, reset_save, load_initial_state

story-state-domain
  currently mutable state object in src/game.js
  owns sceneId, clues, flags, inspected map, route, and log

story-result-domain
  missing today
  should own accepted, rejected, no_mutation, scene_completed, continue_next_scene, continue_terminal, save_intent, projection_intent, and stage_load_intent rows

browser-adapter-domain
  currently src/game.js side effects
  should consume source-owned result/projection/intent rows and report readback rows

stage-render-domain
  currently StageKit
  owns renderer, camera, scene, materials, props, hotspot volumes, raycast, hover, target texture, and post pass

stage-readback-domain
  missing today
  should report loadScene, pick, hover, viewport, post settings, and render acceptance rows

validation-domain
  currently npm run check only
  should add a DOM-free story authority fixture and browser adapter readback fixture
```

## Domain seams that need proof rows

```txt
hotspot click -> StoryCommandEnvelope
StoryCommandEnvelope -> StoryPreflight
StoryPreflight -> StoryCommandResult
StoryCommandResult -> StoryProjectionRecord
StoryCommandResult -> SaveIntentRecord
StoryCommandResult -> InterludeIntentRecord
StoryCommandResult -> StageLoadIntentRecord
StageLoadIntentRecord -> StageLoadReadback
Stage pick -> StagePickReadback
Browser effects -> BrowserAdapterReadback
GameHost diagnostics -> GameHostStoryDiagnostics
```

## Main risk

The runtime is small and readable, but authority boundaries are not explicit. Browser effects and source decisions happen in the same functions, so fixtures cannot prove why a click was accepted, rejected, repeated, completed, saved, projected, or routed.

## Safe next cut

Add source-owned command/readback rows first, then adapt `src/game.js` to consume those rows without changing visible behavior.
