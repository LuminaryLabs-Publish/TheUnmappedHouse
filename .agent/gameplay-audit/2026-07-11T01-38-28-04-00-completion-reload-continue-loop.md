# Gameplay audit: completion, reload and Continue loop

Timestamp: `2026-07-11T01-38-28-04-00`

## Intended loop

```txt
explore scene
  -> inspect every required hotspot
  -> prove scene completion
  -> wait 450 ms
  -> open interlude
  -> Continue
  -> enter next scene
  -> repeat
  -> persist terminal completion
```

## Current loop

```txt
inspect final hotspot
  -> add clue
  -> derive completion
  -> schedule anonymous timer
  -> save clues and inspections
  -> timer opens DOM overlay
```

The save does not record whether the interlude is pending, ready or open.

## Reload failure

```txt
completed save reloads
  -> all required clues remain
  -> all hotspots remain inspected
  -> sceneComplete is true
  -> no boot phase reconciliation runs
  -> no timer is scheduled
  -> interlude remains hidden
  -> re-read path skips completion evaluation
  -> Continue remains inaccessible
```

This is a deterministic progression dead end, not only an observability gap.

## Continue failure modes

```txt
hidden Continue activation
  -> nextScene runs without completion proof

duplicate activation
  -> no command id or idempotency result

stale activation
  -> no expected scene, phase or save revision

final activation
  -> changes copy only
  -> terminal completion is not saved
```

## Required gameplay state machine

```txt
exploring
  -> interlude_pending
  -> interlude_open
  -> transitioning
  -> exploring | terminal

any effect failure
  -> prior committed phase | recovering
```

## Required gameplay proof

- Each scene completion has one immutable scene-scoped proof.
- A completion proof produces exactly one pending interlude.
- Reload reconstructs pending/open state deterministically.
- Continue is accepted only from an open interlude.
- One accepted Continue produces at most one scene transition.
- Final Continue commits terminal state.
- Recovery never duplicates clues, route rows, logs or stage transitions.

## Content boundary

The three scenes, nine hotspots, nine clues, interlude copy and 450 ms pacing should remain unchanged while the authority boundary is implemented.
