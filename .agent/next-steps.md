# Next Steps

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Updated:** `2026-07-08T21-00-12-04-00`

## Next safe ledge

Build the story browser adapter projection map and fixture contract.

Do not expand story content first.

Do not rewrite the renderer first.

Do not change the route, localStorage key, scene copy, StageKit picking behavior, fixed 16:9 frame, or Pages workflow unless validation proves it is required.

## Current ledge name

```txt
TheUnmappedHouse Story Browser Adapter Projection Map + Fixture Contract
```

## Build order

```txt
1. Preserve index.html, src/game.js route entry, SAVE_KEY, story copy, StageKit visuals, and deployment workflow.
2. Add src/story-authority/story-source-snapshot.js.
3. Add src/story-authority/story-state-snapshot.js.
4. Add src/story-authority/stage-scene-snapshot.js.
5. Add src/story-authority/story-command-envelope.js.
6. Add src/story-authority/story-command-reasons.js.
7. Add src/story-authority/story-command-result.js.
8. Add src/story-authority/story-event-record.js.
9. Add src/story-authority/story-preflight.js.
10. Add src/story-authority/story-reducer.js.
11. Add src/story-authority/story-projection.js.
12. Add src/story-authority/save-projection.js.
13. Add src/story-authority/interlude-projection.js.
14. Add src/story-authority/stage-projection.js.
15. Add src/story-authority/story-browser-adapter-plan.js.
16. Add src/story-authority/gamehost-story-diagnostics.js.
17. Add src/story-authority/story-fixture-cases.js.
18. Add scripts/validate-story-authority.mjs.
19. Add npm script for the fixture and include it in npm run check or a dedicated smoke command.
20. Adapt src/game.js so DOM buttons and StageKit callbacks dispatch StoryCommandEnvelope objects.
21. Adapt src/game.js so text, hotspot buttons, notebook, interlude, StageKit load calls, localStorage, and debug output consume projections instead of owning story rules.
22. Add additive window.GameHost.getState() diagnostics without removing the visible debug panel.
```

## Command types

```txt
story.inspect_hotspot
story.continue_scene
story.load_state
story.save_state
story.reset_save
story.project
story.validate_source
story.snapshot_stage
story.preflight
story.browser_adapter_plan
```

## Required result statuses

```txt
accepted
rejected
no_mutation
terminal
```

## Required reason families

```txt
initial_state_created
loaded_state_normalized
loaded_state_rejected
source_preflight_passed
source_preflight_rejected
hotspot_inspected
hotspot_repeated
hotspot_unknown
scene_incomplete
scene_completed
scene_transitioned
prototype_complete
invalid_command
invalid_scene_id
duplicate_scene_id
duplicate_hotspot_id
ungrantable_required_clue
save_requested
reset_requested
projection_updated
stage_snapshot_created
stage_projection_requested
browser_adapter_plan_created
```

## Fixture rows required

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

## Acceptance criteria

```txt
npm run check passes
new story fixture script passes without DOM, Three.js, browser input, localStorage, setTimeout, or StageKit raycasting
current public route still boots through index.html -> src/game.js
current scenes and copy remain unchanged
current SAVE_KEY remains unchanged
StageKit behavior remains visible-equivalent
UI consumes result/projection records instead of owning story authority
localStorage writes consume SaveProjection objects
interlude opening consumes InterludeProjection instead of implicit setTimeout-only control flow
StageKit loadScene calls consume StageProjection objects instead of host-owned transition rules
StoryBrowserAdapterPlan explains DOM text, hotspot list, debug panel, save, interlude, stage, and host updates
window.GameHost.getState is additive and read-only
```

## Stop condition

Stop after story source preflight, reducer, host adapter, stage projection, browser adapter plan, and fixture proof are stable.

Defer deeper StageKit extraction, new rooms, new art, audio, inventory, and browser automation until the fixtures explain every accepted, rejected, no-mutation, transition, save, reset, projection, interlude, stage-projection, browser-adapter, prototype-complete, and GameHost path.
