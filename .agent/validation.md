# Validation

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Updated:** `2026-07-08T10-01-57-04-00`

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
- [x] Confirmed checked non-Cavalry repos already have root `.agent/START_HERE.md` state.
- [x] Confirmed `TheUnmappedHouse` root `.agent/START_HERE.md` exists.
- [x] Read `README.md`.
- [x] Read `package.json`.
- [x] Read `src/aspect-frame.js`.
- [x] Read `src/game.js`.
- [x] Read `src/stage-kit.js`.
- [x] Read `src/story-data.js`.
- [x] Read current repo-local `.agent` state.
- [x] Updated repo-local `.agent` docs only.
- [x] Updated central `repo-ledger/LuminaryLabs-Publish/TheUnmappedHouse.md`.
- [x] Added central internal change-log entry.

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
02_known_hotspot_grants_expected_clue
03_duplicate_hotspot_is_accepted_repeat_and_does_not_duplicate_clue
04_unknown_hotspot_rejected_with_UNKNOWN_HOTSPOT
05_incomplete_scene_cannot_continue_with_SCENE_INCOMPLETE
06_complete_first_scene_emits_SCENE_COMPLETED
07_continue_after_completion_moves_to_next_scene
08_continue_at_final_scene_emits_PROTOTYPE_COMPLETE
09_save_load_roundtrip_preserves_scene_clues_route_and_inspection
10_reset_clears_save_and_restores_initial_state
11_scene_descriptor_rejects_duplicate_hotspot_ids
12_scene_descriptor_rejects_ungrantable_required_clues
13_story_source_snapshot_lists_three_scenes
14_stage_scene_snapshot_lists_camera_layers_props_hotspots_post
15_gamehost_projection_contains_latest_result_and_stage_summary
```

## Acceptance gate for next implementation

A future implementation pass should not be considered complete until it can report:

```txt
npm run check
node scripts/validate-story-fixtures.mjs
# expected: all story command fixture cases pass
```

If the repo remains browser-only, add a DOM-free module first and then write the fixture script around that module.

## Current safe claim

This pass only updated documentation and central ledger records.

No runtime success is claimed.
