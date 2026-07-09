# Validation

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Updated:** `2026-07-09T11-00-39-04-00`

## Current validation status

```txt
Runtime files changed in this pass: no
Agent docs changed in this pass: yes
Central ledger changed in this pass: yes
Local build run: no, connector-only documentation/audit pass
Browser smoke run: no, connector-only documentation/audit pass
Fixture script created: no
Fixture script run: no
GitHub Pages live route checked: no
Full LuminaryLabs-Publish repo list compared to central ledger/root agent state: yes
Chosen repo root .agent exists before this pass: yes
Repo-local mixed pointer state found: yes
Repo-local mixed pointer state normalized: yes
Central ledger updated: yes
Branch created: no
Pull request created: no
Pushed to main: yes
```

## Source readback performed

```txt
package.json read
index.html read
src/aspect-frame.js read
src/game.js read
src/stage-kit.js read
src/story-data.js read
central repo ledger read
repo-local .agent root docs read
repo-local kit registry read
accessible LuminaryLabs-Publish repo list read
sampled root .agent state for selected repo read
```

## Required next validation

After the next runtime source pass, run:

```bash
npm run check
node scripts/validate-story-authority.mjs
python3 -m http.server 8080
```

Then browser-check:

```txt
index.html boots
first scene loads
hotspot hover works
hotspot click grants clue
repeat hotspot does not duplicate clue
room completion opens interlude
continue advances scene
KeyR reset preserves expected behavior
window.GameHost.getState().story returns additive sourceManifest/sourceSnapshot/latestCommand/preflight/save/interlude/stageProjection/browserAdapter/browserAdapterReadback/repoLocalLedger/centralLedger/fixture diagnostics
```

## Fixture proof expected next

```txt
source_manifest_created accepted
source_snapshot_created accepted
stage_snapshot_created accepted
initial_state accepted
load_empty_state accepted
load_malformed_state rejected or normalized with reason
source_preflight_passes accepted
duplicate_scene_descriptor_rejected rejected
duplicate_hotspot_descriptor_rejected rejected
ungrantable_required_clue_rejected rejected
inspect_first_hotspot accepted
repeat_hotspot no_mutation
unknown_hotspot rejected
scene_incomplete_continue rejected
complete_library_scene accepted + scene_completed event
continue_to_repeating_hallway accepted + stage_projection
complete_all_scenes accepted
prototype_terminal_result terminal
save_projection_created readback
interlude_projection_created readback
stage_projection_created readback
browser_adapter_plan_created readback
browser_adapter_readback_created readback
gamehost_story_projection_created readback
repo_local_ledger_snapshot_created readback
central_ledger_snapshot_created readback
```

## Validation note

This pass intentionally did not claim runtime success. It updated audit state only, normalized repo-local documentation pointers, synced central tracking, and preserved the next source validation target.
