# Validation

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Updated:** `2026-07-08T11-28-38-04-00`

## Current validation status

```txt
Runtime files changed in this pass: no
Agent docs changed in this pass: yes
Central ledger changed in this pass: yes
Local build run: no, connector-only documentation/audit pass
Browser smoke run: no, connector-only documentation/audit pass
GitHub Pages workflow inspected in prior pass: yes
Full LuminaryLabs-Publish repo list compared to central ledger state: yes
Chosen repo root .agent exists before this pass: yes
Central status-summary rollup inclusion: yes, observed in prior status-summary.json schema 1.18.0 readback
```

## Source checks performed this pass

- [x] Listed accessible `LuminaryLabs-Publish` repositories by GitHub installation.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirmed checked non-Cavalry repos already have sampled root `.agent/START_HERE.md` state.
- [x] Confirmed `TheUnmappedHouse` root `.agent/START_HERE.md` exists before this pass.
- [x] Read `src/game.js`.
- [x] Read `src/stage-kit.js`.
- [x] Read `src/story-data.js`.
- [x] Read current repo-local `.agent` state.
- [x] Updated repo-local `.agent` docs only.
- [x] Updated central `repo-ledger/LuminaryLabs-Publish/TheUnmappedHouse.md`.
- [x] Added central internal change-log entry.

## Source facts verified

```txt
src/game.js
  -> SAVE_KEY remains the-unmapped-house.stage-prototype.v1
  -> state and currentScene are mutable module-level values
  -> inspectHotspot mutates inspected state, grants clues, logs text, checks completion, renders UI, and saves
  -> nextScene mutates scene id, route, interlude DOM, StageKit scene, UI, and save state
  -> KeyR deletes localStorage and reloads

src/stage-kit.js
  -> imports Three.js from CDN
  -> owns renderer, camera, raycaster, render target, post pass, hotspot creation, pointer picking, hover label, click dispatch, resize, and animate loop

src/story-data.js
  -> exports three scenes with stage descriptors, hotspot descriptors, clue grants, completion requirements, and interlude text
```

## Validation not performed

- [ ] No local checkout was made.
- [ ] No local static server was started.
- [ ] No browser or Playwright smoke test was run.
- [ ] No GitHub Actions run result was inspected after the new docs commits.
- [ ] No JavaScript syntax check was run.
- [ ] No runtime behavior was changed.
- [ ] No status-summary schema update was performed in this pass because the central status-summary already records rollup inclusion.

## Fixture cases required next

These should be implemented before story expansion.

```txt
01_initial_state_has_first_scene
02_story_source_snapshot_lists_three_scenes
03_stage_scene_snapshot_lists_camera_layers_props_hotspots_post
04_known_hotspot_grants_expected_clue
05_repeat_hotspot_accepts_with_HOTSPOT_ALREADY_INSPECTED_and_no_duplicate_clue
06_unknown_hotspot_rejects_with_UNKNOWN_HOTSPOT
07_incomplete_scene_cannot_continue_with_SCENE_INCOMPLETE
08_complete_first_scene_emits_SCENE_COMPLETED_event
09_continue_after_completion_moves_to_repeating_hallway
10_complete_all_three_scenes_reaches_prototype_complete
11_save_load_roundtrip_preserves_scene_clues_route_and_inspection
12_reset_returns_initial_state_and_reset_save_result
13_duplicate_scene_ids_rejected
14_duplicate_hotspot_ids_rejected
15_ungrantable_required_clues_rejected
16_gamehost_projection_contains_latest_result_stage_summary_and_fixture_summary
```

## Acceptance gate for next implementation

A future implementation pass should not be considered complete until it can report:

```txt
npm run check
node scripts/validate-story-fixtures.mjs
# expected: all story command fixture cases pass
```

If the repo remains browser-only, add DOM-free story-authority modules first and then write the fixture script around those modules.

## Current safe claim

This pass only updated documentation and central ledger records.

No runtime success is claimed.
