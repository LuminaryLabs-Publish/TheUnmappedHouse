# Browser Adapter Fixture Contract

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T21-00-12-04-00`

## Contract goal

Create fixture rows that prove the story authority layer can run without DOM, WebGL, localStorage, setTimeout, or StageKit raycasting.

The browser should only consume the resulting plan.

## Required source files

```txt
src/story-authority/story-source-snapshot.js
src/story-authority/story-state-snapshot.js
src/story-authority/stage-scene-snapshot.js
src/story-authority/story-command-envelope.js
src/story-authority/story-command-reasons.js
src/story-authority/story-command-result.js
src/story-authority/story-event-record.js
src/story-authority/story-preflight.js
src/story-authority/story-reducer.js
src/story-authority/story-projection.js
src/story-authority/save-projection.js
src/story-authority/interlude-projection.js
src/story-authority/stage-projection.js
src/story-authority/story-browser-adapter-plan.js
src/story-authority/gamehost-story-diagnostics.js
src/story-authority/story-fixture-cases.js
scripts/validate-story-authority.mjs
```

## Fixture matrix

```txt
initial_state
load_empty_state
load_malformed_state
source_preflight_passes
duplicate_scene_descriptor_rejected
duplicate_hotspot_descriptor_rejected
ungrantable_required_clue_rejected
inspect_first_hotspot
repeat_hotspot
unknown_hotspot
scene_incomplete_continue
complete_library_scene
continue_to_hallway
complete_full_route
prototype_complete_continue
save_state
load_state
reset_save
stage_scene_snapshot
story_projection
save_projection
interlude_projection
stage_projection
browser_adapter_plan
GameHost_projection
```

## Adapter plan shape

```txt
StoryBrowserAdapterPlan {
  commandResult,
  storyProjection,
  saveProjection,
  interludeProjection,
  stageProjection,
  debugProjection,
  hostDiagnosticsProjection,
  domEffects,
  localStorageEffects,
  stageEffects,
  timingEffects
}
```

## Invariants

```txt
SAVE_KEY remains unchanged
story copy remains unchanged
scene ids remain unchanged
hotspot ids remain unchanged
StageKit callback still accepts a hotspot event path
rendered behavior remains visible-equivalent
GameHost diagnostics are additive
fixture rows do not import Three.js
fixture rows do not touch localStorage
fixture rows do not call setTimeout
```

## Stop condition

Stop once fixture rows prove the adapter plan and `src/game.js` can be modified as a thin consumer.
