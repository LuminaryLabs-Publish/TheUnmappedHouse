# Next Steps

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Updated:** `2026-07-09T19-00-15-04-00`

## Next safe ledge

```txt
TheUnmappedHouse Story Adapter Ledger Refresh + Browser Fixture Gate
```

Build source-owned story command/result/projection/readback modules before expanding story content or rewriting StageKit.

## Do not start with

```txt
new rooms
audio
inventory
StageKit rewrite
renderer extraction
browser-only smoke work
Pages workflow churn
```

## Implementation checklist

- Add `src/story-source-manifest.js` with product id, route id, save key, story version, scene ids, hotspot ids, command ids, expected public route, repo-local ledger pointers, and central ledger pointers.
- Add `src/story-snapshots.js` with source, state, stage-scene, repo-local ledger, and central ledger snapshot helpers.
- Add `src/story-commands.js` with command envelopes for load, inspect_hotspot, continue_scene, reset, save, project, readback, repo_ledger_readback, and central_ledger_readback.
- Add `src/story-preflight.js` with descriptor, state, current scene, target hotspot, completion, continuation, malformed-save, repo-ledger, and central-ledger checks.
- Add `src/story-results.js` with canonical status and reason codes.
- Add `src/story-reducer.js` to return command results without touching DOM, StageKit, timers, or localStorage.
- Add `src/story-projections.js` for story panel, hotspot buttons, debug JSON, save intent, interlude intent, and StageKit load intent.
- Add `src/browser-adapter-plan.js` to convert result projections into browser mutations.
- Add `src/browser-adapter-readback.js` to compare DOM, save state, StageKit current descriptor, interlude state, and debug JSON against expected projection.
- Add additive `globalThis.UnmappedHouseHost.getState()` diagnostics without changing existing route behavior.
- Add DOM-free fixtures under `tests/fixtures/story-command-results.mjs` or equivalent.
- Wire `npm run check` to run syntax checks plus the story fixture runner.
- Keep all changes on `main`; do not create branches.

## Required fixture rows

```txt
load_empty_storage -> accepted / default_state
load_malformed_storage -> accepted / fallback_default_state
inspect_new_map -> accepted / clue_granted / save_intent / ui_projection
inspect_repeat_map -> accepted / repeated_no_mutation / log_projection / save_intent
inspect_invalid_hotspot -> rejected / hotspot_not_found / no_save
complete_library -> accepted / scene_complete / interlude_intent
continue_to_repeating_hallway -> accepted / route_advanced / stage_projection
continue_terminal -> accepted / prototype_complete / terminal_projection
reset_route -> accepted / clear_save_intent / reload_intent
adapter_readback_current_scene -> accepted / dom_matches_projection
repo_local_ledger_readback -> accepted / agent_pointers_match_files
central_ledger_readback -> accepted / central_pointers_match_repo_local
```

## Files to protect

```txt
index.html
src/story-data.js
src/stage-kit.js
src/aspect-frame.js
```

These can be read, but the first implementation should avoid changing them unless the new fixture layer requires an additive hook.

## Success definition

The next implementation is complete only when a DOM-free fixture can prove first inspect, repeat inspect, invalid inspect, completion, continue, terminal continue, load fallback, malformed save, reset, projection/readback parity, repo-local ledger readback, and central ledger readback.
