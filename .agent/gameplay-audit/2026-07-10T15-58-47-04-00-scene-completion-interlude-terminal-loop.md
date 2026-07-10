# Gameplay audit: scene completion, interlude, and terminal loop

Timestamp: `2026-07-10T15-58-47-04-00`

## Current gameplay loop

```txt
explore current scene
  -> inspect three authored hotspots
  -> grant one required clue per first inspection
  -> mark each hotspot inspected
  -> complete when every required clue is present
  -> schedule interlude after 450 ms
  -> continue to next scene
  -> append route and reload StageKit
  -> after third scene, write prototype-complete copy
```

## Current state shape

```txt
sceneId
clues[]
flags{}
inspected{ sceneId: { hotspotId: boolean } }
route[]
log[]
```

The state has no explicit lifecycle phase, completion transaction id, pending interlude, open interlude, terminal status, or effect journal.

## Lifecycle gap

The visible loop is controlled by a mixture of source state and browser state:

```txt
scene completion        source query over clues
interlude delay          setTimeout callback
interlude open/closed    DOM class + aria attribute
continue eligibility     implicit visibility of button
terminal completion      DOM text only
reset                    storage removal + page reload
```

This prevents deterministic replay and save/restore of the actual player-visible lifecycle.

## Proposed lifecycle state machine

```txt
booting
  -> exploring

exploring
  -> completion_pending     when required clues transition to complete

completion_pending
  -> interlude_open         after acknowledged timer/effect

interlude_open
  -> advancing              on accepted continue with a next scene
  -> terminal               on accepted continue without a next scene

advancing
  -> exploring              after stage-load/projection/save readbacks

terminal
  -> terminal               on repeated continue as explicit no-mutation
  -> resetting              on reset
```

## Required transitions

```txt
hotspot_inspected
clue_granted
log_appended
scene_completed
interlude_scheduled
interlude_opened
scene_advance_started
scene_changed
route_extended
stage_load_requested
stage_load_acknowledged
terminal_entered
save_requested
save_acknowledged
reset_requested
storage_cleared
```

## Exactly-once rules

- `scene_completed` is emitted once for each scene id.
- One completion transaction may create one pending interlude effect.
- Interlude opening must be idempotent by effect id.
- Continue is not valid before the interlude-open acknowledgement.
- Scene advance commits only after the next scene id is source-valid.
- Terminal entry must be stateful and persisted, not only projected copy.
- Rehydration must restore `exploring`, `interlude_open`, or `terminal` deterministically.

## Gameplay fixture sequence

```txt
initial-library-exploring
first-two-inspections-still-exploring
third-inspection-completion-pending
interlude-effect-single-intent
interlude-open-readback
continue-to-hallway
hallway-stage-load-readback
complete-hallway
continue-to-closet
complete-closet
continue-to-terminal
terminal-save-round-trip
repeat-terminal-continue-no-mutation
```

## Deferred gameplay work

```txt
new rooms
branching routes
inventory
combat
new clue types
new endings
```

## Next safe gameplay cut

Implement pure lifecycle transitions and effect intents first, then adapt the existing DOM and StageKit calls as consumers.