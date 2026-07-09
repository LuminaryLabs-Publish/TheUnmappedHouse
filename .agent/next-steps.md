# Next Steps

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Updated:** `2026-07-09T10-54-04-04-00`

## Next safe ledge

Build the repo-local ledger repair and story authority fixture gate.

Do not expand story content first.

Do not rewrite StageKit first.

Do not change the route, localStorage key, story copy, StageKit picking behavior, fixed 16:9 frame, public static shell, or Pages workflow unless validation proves it is required.

## Current ledge name

```txt
TheUnmappedHouse Repo-Local Ledger Repair + Story Authority Fixture Gate
```

## Build order

```txt
1. Preserve index.html, src/game.js route entry, SAVE_KEY, story copy, StageKit visuals, and static deploy workflow.
2. Add src/story-authority/story-source-manifest.js.
3. Add src/story-authority/story-source-snapshot.js.
4. Add src/story-authority/story-state-snapshot.js.
5. Add src/story-authority/stage-scene-snapshot.js.
6. Add src/story-authority/story-command-envelope.js.
7. Add src/story-authority/story-command-reasons.js.
8. Add src/story-authority/story-preflight.js.
9. Add src/story-authority/story-command-result.js.
10. Add src/story-authority/story-event-record.js.
11. Add src/story-authority/story-reducer.js.
12. Add src/story-authority/story-projection.js.
13. Add src/story-authority/save-projection.js.
14. Add src/story-authority/interlude-projection.js.
15. Add src/story-authority/stage-projection.js.
16. Add src/story-authority/story-browser-adapter-plan.js.
17. Add src/story-authority/browser-adapter-readback.js.
18. Add src/story-authority/gamehost-story-diagnostics.js.
19. Add src/story-authority/repo-local-ledger-readback.js.
20. Add src/story-authority/central-ledger-readback.js.
21. Add src/story-authority/story-fixture-cases.js.
22. Add scripts/validate-story-authority.mjs.
23. Run the DOM-free fixture directly.
24. Add fixture invocation to package validation after the direct fixture is stable.
25. Adapt src/game.js so DOM buttons and StageKit callbacks dispatch StoryCommandEnvelope objects.
26. Adapt src/game.js so text, hotspot buttons, notebook, interlude, StageKit load calls, localStorage, and debug output consume StoryBrowserAdapterPlan records.
27. Add additive window.GameHost.getState().story diagnostics without removing the visible debug panel.
28. Emit BrowserAdapterReadback, RepoLocalLedgerReadback, and CentralLedgerReadback fixture rows.
29. Update central ledger only after repo-local fixture/readback facts are current.
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
story.browser_adapter_readback
story.gamehost_projection
story.repo_local_ledger_readback
story.central_ledger_readback
```

## Required result statuses

```txt
accepted
rejected
no_mutation
terminal
readback
normalized
repo_local_sync
central_sync
```

## Required fixture rows

```txt
source_manifest_created
source_snapshot_created
stage_snapshot_created
initial_state_created
load_empty_state
load_malformed_state
source_preflight_passes
duplicate_scene_descriptor_rejected
duplicate_hotspot_descriptor_rejected
ungrantable_required_clue_rejected
inspect_first_hotspot
repeat_hotspot_no_mutation
unknown_hotspot_rejected
scene_incomplete_continue_rejected
complete_library_scene
continue_to_repeating_hallway
complete_all_scenes
prototype_terminal_result
save_projection_created
interlude_projection_created
stage_projection_created
browser_adapter_plan_created
browser_adapter_readback_created
gamehost_story_projection_created
repo_local_ledger_snapshot_created
central_ledger_snapshot_created
```

## Acceptance rule

The next implementation is complete only when a DOM-free script can prove the same story command/result/projection rows that the browser adapter consumes.
