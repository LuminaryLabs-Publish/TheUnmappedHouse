# Validation

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Updated:** `2026-07-08T18-51-55-04-00`

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
Central ledger updated: yes
Branch created: no
Pull request created: no
Pushed to main: yes
```

## Source readback performed

```txt
src/game.js read
src/stage-kit.js read
src/story-data.js read
src/aspect-frame.js read
package.json read
central repo ledger read
repo-local .agent root docs read
repo-local kit registry read
accessible LuminaryLabs-Publish repo list read
sampled root .agent state for current repo candidates read
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
window.GameHost.getState returns additive story/stage/latestCommand/preflight/save/interlude/fixture diagnostics
```

## Fixture proof expected next

```txt
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
continue_to_hallway accepted + scene_transitioned event
complete_full_route accepted
prototype_complete_continue terminal
save_state accepted + SaveProjection
load_state accepted + normalized snapshot
reset_save accepted + clear-save intent
stage_scene_snapshot accepted
story_projection accepted
save_projection accepted
interlude_projection accepted
stage_projection accepted
GameHost_projection accepted
```

## Validation boundaries

This pass only updated `.agent` documentation and central tracking.

No implementation source, package script, fixture script, browser behavior, deployment workflow, or runtime route was changed.
