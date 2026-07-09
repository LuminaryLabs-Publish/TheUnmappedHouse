# Story Authority Audit: Source Manifest Adapter Consumer Gate

**Timestamp:** `2026-07-08T23-08-29-04-00`

## Gate name

```txt
TheUnmappedHouse Story Source Manifest + Adapter Consumer Fixture Gate
```

## Why this gate exists

The previous direction was correct: move story rules out of DOM handlers and into fixture-proven command/result/projection modules.

This pass narrows the next implementation into the exact first consumer gate: create a source manifest and make the browser adapter consume records instead of owning story decisions.

## Source files to add next

```txt
src/story-authority/story-source-manifest.js
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

## Minimal `src/game.js` consumer splice

```txt
1. Keep imports of StageKit and story data.
2. Import story-authority helpers.
3. Build StorySourceManifest and StorySourceSnapshot at boot.
4. Normalize loaded state through StoryStateSnapshot.
5. Replace direct inspectHotspot mutation with StoryCommandEnvelope + applyStoryCommand.
6. Replace direct nextScene mutation with StoryCommandEnvelope + applyStoryCommand.
7. Consume StoryBrowserAdapterPlan for text, buttons, interlude, save, and StageKit load calls.
8. Expose additive window.GameHost.getState().story diagnostics.
9. Keep visible debug panel, route, SAVE_KEY, story copy, and StageKit behavior stable.
```

## Fixture matrix

```txt
source_manifest_created
source_snapshot_created
source_preflight_passes
source_preflight_duplicate_scene_rejected
source_preflight_duplicate_hotspot_rejected
source_preflight_ungrantable_required_clue_rejected
initial_state_created
load_empty_state
load_malformed_state
inspect_first_hotspot
repeat_hotspot
unknown_hotspot
scene_incomplete_continue
complete_library_scene
continue_to_hallway
complete_full_route
prototype_complete_continue
save_projection_write
load_state_normalized
reset_save_projection_clear
stage_scene_snapshot
story_projection
interlude_projection
stage_projection
browser_adapter_plan
GameHost_story_diagnostics
```

## Required reason families

```txt
source_manifest_created
source_snapshot_created
source_preflight_passed
source_preflight_rejected
initial_state_created
loaded_state_normalized
loaded_state_rejected
hotspot_inspected
hotspot_repeated
hotspot_unknown
scene_incomplete
scene_completed
scene_transitioned
prototype_complete
save_requested
reset_requested
projection_updated
stage_snapshot_created
stage_projection_requested
browser_adapter_plan_created
invalid_command
invalid_scene_id
duplicate_scene_id
duplicate_hotspot_id
ungrantable_required_clue
```

## Stop line

Stop when the story fixture script can prove the command/result/projection path without DOM, WebGL, localStorage, setTimeout, or StageKit raycasting.

Do not proceed into new scenes, inventory, audio, or renderer extraction before this gate is green.
