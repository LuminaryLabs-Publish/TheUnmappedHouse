# Deploy Audit — Story Fixture Check Validation Gate

**Timestamp:** `2026-07-09T08-02-33-04-00`

## Current package validation

```txt
npm run check
  -> node --check src/aspect-frame.js
  -> node --check src/game.js
  -> node --check src/stage-kit.js
  -> node --check src/story-data.js
```

## Current limitation

Syntax checks do not prove story command behavior, save fallback behavior, stage projection, adapter readback, or central ledger readback.

## Required next package gate

After the source-authority fixture exists, package validation should include:

```txt
node scripts/validate-story-authority.mjs
```

## Required fixture output

```txt
source_manifest_created
source_snapshot_created
stage_snapshot_created
initial_state_created
load_empty_state
load_malformed_state
source_preflight_passes
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
central_ledger_snapshot_created
```

## Deployment rule

Do not claim browser or Pages success from this docs-only pass.

Next runtime implementation should run:

```bash
npm run check
node scripts/validate-story-authority.mjs
python3 -m http.server 8080
```

Then manually verify the route in browser.