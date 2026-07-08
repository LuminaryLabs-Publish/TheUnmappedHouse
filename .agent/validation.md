# Validation

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Updated:** `2026-07-08T01:50:19-04:00`

## Current validation status

```txt
Runtime files changed in this pass: no
Agent docs changed in this pass: yes
Central ledger changed in this pass: pending until internal changelog and ledger update are written
Local build run: no, connector-only documentation/audit pass
Browser smoke run: no, connector-only documentation/audit pass
GitHub Pages workflow inspected: yes
```

## Source checks performed

- [x] Confirmed `README.md` describes a fixed-camera anime point-and-click horror prototype.
- [x] Confirmed `index.html` loads `./src/game.js` and exposes the stage, story panel, hotspot list, notebook debug, hover label, and interlude elements.
- [x] Confirmed `src/game.js` owns state, localStorage, hotspot inspection, clue grants, scene completion, interlude progression, UI projection, and reset.
- [x] Confirmed `src/stage-kit.js` owns Three.js renderer setup, camera, raycaster, lights, render target, post-processing, scene loading, pointer picking, resize, and animation.
- [x] Confirmed `src/story-data.js` contains three scene descriptors with camera, stage, props, hotspots, clue grants, completion requirements, and interludes.
- [x] Confirmed `.github/workflows/deploy.yml` deploys the static site from `main` to GitHub Pages.
- [x] Confirmed the root `.agent/START_HERE.md` was missing before this pass.

## Validation not performed

- [ ] No local static server was started.
- [ ] No browser or Playwright smoke test was run.
- [ ] No GitHub Actions run result was inspected after the new docs commits.
- [ ] No JavaScript syntax check was run.
- [ ] No runtime behavior was changed.

## Fixture cases required next

These should be implemented before story expansion.

```txt
01_initial_state_has_first_scene
02_known_hotspot_grants_expected_clue
03_duplicate_hotspot_is_stable_and_does_not_duplicate_clue
04_unknown_hotspot_rejected_with_reason
05_incomplete_scene_cannot_continue
06_complete_first_scene_emits_completion_result
07_continue_after_completion_moves_to_next_scene
08_full_three_scene_route_reaches_prototype_complete
09_save_load_roundtrip_preserves_scene_clues_route_and_inspection
10_reset_clears_save_and_restores_initial_state
11_scene_descriptor_rejects_duplicate_hotspot_ids
12_scene_descriptor_rejects_ungrantable_required_clues
```

## Acceptance gate for next implementation

A future implementation pass should not be considered complete until it can report:

```txt
node scripts/validate-story-fixtures.mjs
# expected: all story command fixture cases pass
```

If the repo remains browser-only, add a DOM-free module first and then write the fixture script around that module.