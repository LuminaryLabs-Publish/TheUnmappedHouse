# Deploy Audit - Check Script Story Fixture Wire Map

**Timestamp:** `2026-07-09T13-35-29-04-00`

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

## Current validation surface

`package.json` currently exposes:

```txt
npm run serve
npm run check
```

The current check command is syntax-only:

```txt
node --check src/aspect-frame.js && node --check src/game.js && node --check src/stage-kit.js && node --check src/story-data.js
```

## Current gap

Syntax checks do not prove story behavior, source parity, stage projection, save/interlude projection, browser adapter consumption, or repo/central ledger readback.

## Next fixture script

```txt
scripts/validate-story-authority.mjs
```

The fixture should import pure story-authority modules, not `src/game.js` browser DOM bindings.

## Required package check progression

```txt
phase 1:
  node scripts/validate-story-authority.mjs

phase 2:
  npm run check runs syntax checks and fixture script

phase 3:
  static route remains bootable through python3 -m http.server 8080
```

## Required fixture output

```txt
source_manifest_created accepted
source_snapshot_created accepted
stage_snapshot_created accepted
load_empty_state accepted
load_malformed_state rejected_or_normalized
source_preflight_passes accepted
duplicate_scene_descriptor_rejected rejected
duplicate_hotspot_descriptor_rejected rejected
ungrantable_required_clue_rejected rejected
inspect_first_hotspot accepted
repeat_hotspot_no_mutation no_mutation
unknown_hotspot_rejected rejected
scene_incomplete_continue_rejected rejected
complete_library_scene accepted
continue_to_repeating_hallway accepted
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

## Deploy rule

Do not rely on Pages deployment as proof of correctness.

Static deploy can remain unchanged until DOM-free story authority fixtures are stable and wired into `npm run check`.

## Main deploy finding

The next deploy-relevant improvement is a fixture-gated check path, not a new Pages workflow or static artifact rewrite.
