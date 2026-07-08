# Validation

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Updated:** `2026-07-08T05:28:26-04:00`

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
Central status-summary rollup inclusion: yes, observed in status-summary.json schema 1.18.0
```

## Source checks performed

- [x] Confirmed root `.agent/START_HERE.md` exists and points to current audit/tracker material.
- [x] Confirmed central `repo-ledger/LuminaryLabs-Publish/TheUnmappedHouse.md` exists.
- [x] Confirmed central `repo-checks/reports/status-summary.json` includes `TheUnmappedHouse` in the machine-readable publish-game rollup.
- [x] Confirmed prior source audit still identifies the fixed-camera story loop, StageKit render host, localStorage save path, and story command authority gap.
- [x] Confirmed this pass only updates documentation and ledger state, not runtime behavior.

## Validation not performed

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
13_central_publish_repo_list_includes_the_unmapped_house
14_central_status_rollup_includes_the_unmapped_house_in_publish_game_map
```

## Acceptance gate for next implementation

A future implementation pass should not be considered complete until it can report:

```txt
node scripts/validate-story-fixtures.mjs
# expected: all story command fixture cases pass
```

If the repo remains browser-only, add a DOM-free module first and then write the fixture script around that module.
