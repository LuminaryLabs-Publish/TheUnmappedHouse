# Story authority audit: lifecycle transaction contract

Timestamp: `2026-07-10T15-58-47-04-00`

## Current authority problem

`src/game.js` receives live hotspot descriptor objects and performs validation, mutation, logging, completion checks, timer scheduling, DOM projection, save writes, StageKit calls, route changes, terminal copy, reset, and diagnostics in the same browser module.

The source describes content, but it does not own the command or lifecycle decisions that give that content meaning.

## Required source contract

```txt
StorySourceManifest
  sourceId
  schemaVersion
  sourceFingerprint
  sceneIds[]
  hotspotIdsByScene{}
  clueIds[]
  routeOrder[]

StoryStateSnapshot
  stateId
  sourceFingerprint
  lifecycle
  sceneId
  clues[]
  inspected{}
  route[]
  log[]
  completedSceneIds[]
  pendingEffects[]
  terminal

StoryCommandEnvelope
  commandId
  inputId
  expectedStateId
  sourceFingerprint
  kind
  sceneId
  hotspotId?

StoryCommandResult
  resultId
  commandId
  class
  reason
  beforeStateId
  afterStateId
  transitions[]
  effects[]

StoryLifecycleTransaction
  transactionId
  commandId
  resultId
  beforeLifecycle
  afterLifecycle
  transitionIds[]
  effectIds[]
```

## Command rules

### Inspect

```txt
unknown scene          -> rejected/unknown_scene
scene mismatch         -> rejected/scene_mismatch
unknown hotspot        -> rejected/unknown_hotspot
already inspected      -> accepted_no_mutation/already_inspected
first inspection       -> accepted_mutation/inspected
final required clue    -> accepted_mutation/scene_completed + interlude intent
```

### Continue

```txt
not interlude_open     -> rejected/interlude_not_open
next scene exists      -> accepted_mutation/scene_advanced + stage/projection/save intents
no next scene          -> accepted_mutation/terminal_entered + terminal/save intents
already terminal       -> accepted_no_mutation/already_terminal
```

### Reset

```txt
valid reset request    -> accepted_effect_only/reset_requested + storage-clear/reload intents
```

## Browser effect contract

The pure authority may describe but must not execute:

```txt
project_story_panel
project_hotspot_buttons
project_debug_json
schedule_interlude
open_interlude
close_interlude
project_terminal
load_stage_scene
write_save
clear_save
reload_page
```

Each intent requires an acknowledgement row with `applied`, `skipped`, or `failed` status.

## Save reconciliation

On load, the authority must validate:

- Save schema version.
- Source fingerprint compatibility.
- Scene id membership.
- Route order and uniqueness.
- Clue id membership.
- Inspected scene/hotspot id membership.
- Lifecycle compatibility with scene completion.
- Terminal compatibility with the final route.

Invalid nested fields must be repaired or rejected explicitly; shallow merge is insufficient.

## Diagnostics boundary

Expose only detached JSON-safe records:

```txt
source
currentState
latestCommand
latestResult
latestTransaction
transitionJournal
pendingEffects
effectReadbacks
saveObservations
stageObservations
```

Do not expose DOM nodes, timers, Three.js objects, or live descriptor objects.

## Compatibility rule

The first implementation may preserve the current `inspectHotspot(hotspot)` callback as an adapter, but it must immediately convert the descriptor to stable ids and route through the pure authority. Remove direct mutation only after parity fixtures pass.

## Next safe authority cut

```txt
Pure story source/state/command/lifecycle modules plus browser effect adapter and bounded diagnostics
```