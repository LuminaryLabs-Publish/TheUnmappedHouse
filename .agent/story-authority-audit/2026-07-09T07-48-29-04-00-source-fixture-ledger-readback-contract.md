# Story Authority Audit: Source Fixture Ledger Readback Contract

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T07-48-29-04-00`

## Summary

Story authority is still browser-owned. The next implementation must make story authority source-owned, fixture-proven, and then consumed by the browser adapter.

The key contract is that every visible browser action should have a matching DOM-free command/result row and a readback row proving what the browser consumed.

## Current authority collapse

```txt
src/game.js owns:
  SAVE_KEY
  initial state shape
  localStorage load fallback
  localStorage save write
  currentScene resolution
  repeat hotspot branch
  clue mutation
  log mutation
  scene completion
  interlude scheduling
  route progression
  terminal prototype text
  StageKit scene load calls
  UI projection
  debug JSON projection
  reset reload behavior
```

## Target authority chain

```txt
StorySourceManifest
  -> StorySourceSnapshot
  -> StoryStateSnapshot
  -> StageSceneSnapshot
  -> StoryCommandEnvelope
  -> StoryPreflight
  -> StoryCommandResult
  -> StoryEventRecord[]
  -> StoryProjection
  -> SaveProjection
  -> InterludeProjection
  -> StageProjection
  -> StoryBrowserAdapterPlan
  -> BrowserAdapterReadback
  -> GameHostStoryDiagnostics
  -> CentralLedgerReadback
  -> DOM-free fixture summary
```

## Contract requirements

```txt
source manifest includes product id, route id, save key, source version, scene ids, command ids, result statuses, reason ids, public entry route, and central ledger pointers.
source snapshot validates scene ids, hotspot ids, grantable clues, required clues, camera descriptors, stage descriptors, and post-process descriptors.
state snapshot normalizes malformed/partial save data and reports fallback reasons.
command envelope captures origin, command id, target scene, target hotspot, request id, source version, and expected adapter surfaces.
preflight accepts/rejects without mutation.
command result carries status, reason, before/after snapshots, events, and projections.
browser adapter plan carries title/text/button/log/interlude/stage/save/debug intents.
browser adapter readback proves the host consumed the plan.
central ledger readback proves `.agent` and central ledger references are current.
```

## Required command ids

```txt
story.load_state
story.inspect_hotspot
story.continue_scene
story.save_state
story.reset_save
story.project_ui
story.project_stage
story.readback_browser_adapter
story.project_gamehost
story.readback_central_ledger
```

## Required fixture gates

```txt
source_manifest_created
source_snapshot_created
stage_snapshot_created
load_empty_state
load_malformed_state_normalized
source_preflight_passes
duplicate_scene_descriptor_rejected
duplicate_hotspot_descriptor_rejected
ungrantable_required_clue_rejected
inspect_first_hotspot_accepted
inspect_repeat_hotspot_no_mutation
inspect_unknown_hotspot_rejected
continue_incomplete_scene_rejected
scene_completion_emits_interlude_projection
continue_scene_emits_stage_projection
terminal_prototype_result
save_projection_created
browser_adapter_plan_created
browser_adapter_readback_created
gamehost_story_projection_created
central_ledger_snapshot_created
```

## Current non-goals

```txt
Do not change story copy.
Do not change SAVE_KEY.
Do not change the public route.
Do not rewrite StageKit.
Do not add rooms before command/result fixture rows pass.
Do not make the central ledger the source of truth before repo-local readback exists.
```

## Acceptance

This source boundary is accepted only when `npm run check` includes or is paired with a DOM-free fixture script that can replay story commands and verify browser-adapter plan/readback rows without a browser.
