# Story Authority Audit: Preflight Result Fixture Contract

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T18-51-55-04-00`

## Intent

Define the exact story authority contract for the next implementation pass.

The next pass should prove story source preflight, command/result authority, host projections, and fixture rows before expanding story or replacing StageKit.

## Contract objects

```txt
StorySourceSnapshot:
  gameTitle
  sourceVersion
  scenes[]
  sceneIds[]
  hotspotIdsByScene
  grantableClues[]
  requiredCluesByScene
  routeOrder[]
  sourceFingerprint

StoryStateSnapshot:
  sceneId
  clues[]
  flags
  inspected
  route[]
  log[]
  normalized
  loadReason

StageSceneSnapshot:
  sceneId
  camera
  layerCount
  propCount
  hotspotCount
  post
  warnings[]
  errors[]

StoryCommandEnvelope:
  id
  type
  source
  sceneId
  hotspotId?
  payload?

StoryPreflight:
  ok
  reason
  sourceValid
  stateValid
  sceneExists
  hotspotExists
  commandAllowed
  warnings[]
  errors[]

StoryCommandResult:
  status: accepted | rejected | no_mutation | terminal
  reason
  command
  preflight
  stateBefore
  stateAfter
  events[]
  projections

StoryProjection:
  title
  text
  hotspotButtons[]
  notebook[]
  debug

SaveProjection:
  saveKey
  writeIntent
  clearIntent
  serializedState?
  reason

InterludeProjection:
  open
  title
  text
  delayMs
  reason

StageProjection:
  shouldLoadScene
  sceneId
  descriptor
  reason

GameHostStoryDiagnostics:
  sourceSnapshot
  stateSnapshot
  stageSnapshot
  latestPreflight
  latestResult
  commandJournalTail
  fixtureSummary
```

## Required reason catalog

```txt
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
```

## Fixture manifest

```txt
source_preflight_passes:
  all current src/story-data.js scenes validate.

duplicate_scene_descriptor_rejected:
  synthetic duplicate scene id returns rejected preflight.

duplicate_hotspot_descriptor_rejected:
  synthetic duplicate hotspot id returns rejected preflight.

ungrantable_required_clue_rejected:
  synthetic required clue missing from all grants returns rejected preflight.

inspect_first_hotspot:
  accepted result grants a clue and writes log.

repeat_hotspot:
  no_mutation result does not duplicate clue.

unknown_hotspot:
  rejected result does not mutate state.

scene_incomplete_continue:
  rejected result keeps current scene.

complete_library_scene:
  accepted final clue emits scene_completed and interlude projection.

continue_to_hallway:
  accepted result changes scene and emits stage projection.

prototype_complete_continue:
  terminal result emits prototype complete projection.

save_state:
  accepted result emits SaveProjection.writeIntent.

reset_save:
  accepted result emits SaveProjection.clearIntent.

GameHost_projection:
  additive diagnostics expose source, state, stage, latest preflight, latest result, and fixture status.
```

## Implementation boundary

```txt
Allowed next:
  add pure source files under src/story-authority/
  add DOM-free fixture script
  update package scripts
  adapt src/game.js to consume projections additively
  add window.GameHost.getState readback

Not allowed next:
  new story rooms
  new visual assets
  inventory expansion
  audio system
  StageKit renderer rewrite
  route rename
  SAVE_KEY change
```

## Stop condition

Stop when `npm run check` and the story authority fixture prove source preflight, command results, projections, and GameHost readback without DOM, WebGL, localStorage, setTimeout, or StageKit raycasting.
