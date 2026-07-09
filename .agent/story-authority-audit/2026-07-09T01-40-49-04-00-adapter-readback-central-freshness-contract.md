# Story Authority Audit — Adapter Readback Central Freshness Contract

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Generated:** `2026-07-09T01-40-49-04-00`

## Source authority boundary

Current story authority is inside `src/game.js`.

The next boundary should move source and story decisions into pure modules while preserving the browser route.

## Contract stack

```txt
StorySourceManifest:
  product id
  route id
  source version
  entry route
  save key
  scenes count
  scene ids
  command ids

StorySourceSnapshot:
  game title
  ordered scene ids
  hotspot ids per scene
  required clues per scene
  grantable clue ids
  interlude ids
  stage descriptor summary

StoryStateSnapshot:
  scene id
  clues
  inspected hotspots
  route
  log length/latest entries
  flags

StageSceneSnapshot:
  camera summary
  layer count
  prop count
  hotspot count
  post settings
  validation facts

StoryCommandResult:
  status
  reason
  command id
  accepted/rejected/no-mutation/terminal classification
  before snapshot
  after snapshot
  deltas
  events

StoryBrowserAdapterPlan:
  text update
  hotspot button labels
  debug projection
  save intent
  interlude intent
  stage load intent
  host diagnostics intent

BrowserAdapterReadback:
  consumed result id
  DOM text target acknowledged
  hotspot list target acknowledged
  save intent acknowledged
  interlude intent acknowledged
  stage projection acknowledged
  debug projection acknowledged
  intentionally skipped effects

CentralLedgerReadback:
  selected repo
  latest local tracker
  central ledger path
  change-log path
  freshness status
```

## Reason catalog

```txt
source_manifest_created
source_snapshot_created
initial_state_created
loaded_state_normalized
loaded_state_rejected
source_preflight_passed
source_preflight_rejected
hotspot_inspected
hotspot_repeated
hotspot_unknown
scene_incomplete
scene_completed
scene_transitioned
prototype_complete
invalid_command
invalid_scene_id
duplicate_scene_id
duplicate_hotspot_id
ungrantable_required_clue
save_requested
reset_requested
projection_updated
stage_snapshot_created
stage_projection_requested
browser_adapter_plan_created
browser_adapter_readback_created
gamehost_projection_created
central_ledger_readback_created
```

## Implementation rule

Keep browser code as the adapter.

Move command/result/projection/readback rules into pure modules.

`src/game.js` should eventually call into story-authority services and then apply adapter plans, not decide the rules inline.

## Fixture stop condition

Stop the next implementation only after `scripts/validate-story-authority.mjs` proves every source, command, projection, adapter readback, and central-readback row without DOM, Three.js, localStorage, setTimeout, StageKit, or browser input.
