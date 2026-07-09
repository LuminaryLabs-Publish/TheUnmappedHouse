# Story Authority Audit — DOM-Free Story Fixture Contract

**Timestamp:** `2026-07-09T13-29-43-04-00`

## Authority problem

`src/game.js` is currently the only complete authority for story behavior. That makes the browser route playable, but it prevents a DOM-free fixture from proving behavior before browser adaptation.

## Required source modules

```txt
src/story-authority/story-source-manifest.js
src/story-authority/story-source-snapshot.js
src/story-authority/story-state-snapshot.js
src/story-authority/stage-scene-snapshot.js
src/story-authority/story-command-envelope.js
src/story-authority/story-command-reasons.js
src/story-authority/story-preflight.js
src/story-authority/story-command-result.js
src/story-authority/story-event-record.js
src/story-authority/story-reducer.js
src/story-authority/story-projection.js
src/story-authority/save-projection.js
src/story-authority/interlude-projection.js
src/story-authority/stage-projection.js
src/story-authority/story-browser-adapter-plan.js
src/story-authority/browser-adapter-readback.js
src/story-authority/gamehost-story-diagnostics.js
src/story-authority/repo-local-ledger-readback.js
src/story-authority/central-ledger-readback.js
src/story-authority/story-fixture-cases.js
```

## Required fixture script

```txt
scripts/validate-story-authority.mjs
```

## Fixture output shape

```txt
{
  fixtureId,
  status,
  commandType,
  reason,
  stateBefore,
  stateAfter,
  events,
  storyProjection,
  saveProjection,
  interludeProjection,
  stageProjection,
  browserAdapterPlan,
  browserAdapterReadback,
  repoLocalLedgerReadback,
  centralLedgerReadback
}
```

## Minimum fixture cases

```txt
source_manifest_created
source_snapshot_created
stage_snapshot_created
initial_state_created
load_empty_state
load_malformed_state
source_preflight_passes
duplicate_scene_descriptor_rejected
duplicate_hotspot_descriptor_rejected
ungrantable_required_clue_rejected
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
repo_local_ledger_snapshot_created
central_ledger_snapshot_created
```

## Browser splice rule

After the fixture is stable, `src/game.js` should delegate to the story authority modules and only perform adapter effects described by `StoryBrowserAdapterPlan`:

```txt
DOM text update
hotspot list update
notebook update
interlude open/close
StageKit scene load
save write/clear
GameHost diagnostics update
```

## Recommendation

Build story authority as pure ESM first. Then adapt browser code. Do not reverse the order.
