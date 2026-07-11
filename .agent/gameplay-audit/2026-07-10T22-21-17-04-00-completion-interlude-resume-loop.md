# Gameplay audit: completion, interlude and resume loop

Timestamp: `2026-07-10T22-21-17-04-00`

## Authored loop

```txt
inspect three scene hotspots
  -> collect three required clues
  -> complete scene
  -> wait 450 ms
  -> show interlude
  -> Continue
  -> enter next scene
```

## Actual mutation order

```txt
final first-time inspection
  -> mark hotspot inspected
  -> grant clue
  -> write notebook row
  -> sceneComplete() becomes true
  -> schedule showInterlude(scene) after 450 ms
  -> renderUi()
  -> saveState()
```

The save commits completion before the interlude becomes visible, and the interlude is never represented in state.

## Resume deadlock

A reload after completion produces:

```txt
sceneId: current completed scene
inspected: all required hotspots true
clues: all required clue strings present
sceneComplete: true
interlude DOM: hidden
pending timer: absent
```

Re-reading a hotspot returns through the already-inspected branch. It updates copy and saves but does not call the completion branch or reschedule the interlude. Continue remains inaccessible through the intended UI.

This is not limited to the 450 ms window. Reloading after the interlude is already open has the same result because the open state is DOM-only.

## Final-route gap

The final Continue changes only interlude title/text. It does not commit a terminal phase, terminal result, route completion, save revision or source identity. Reloading the final scene loses the terminal presentation.

## Required gameplay state machine

```txt
exploring
  -> completion proof accepted
interlude_pending
  -> deterministic readiness reached
interlude_open
  -> ContinueStory accepted
transitioning
  -> stage commit accepted
exploring(next scene)

final interlude_open
  -> ContinueStory accepted
terminal
```

## Completion proof

Completion should be based on canonical scene-scoped inspection rows:

```txt
sceneId
requiredHotspotIds
inspectedHotspotIds
sourceFingerprint
completedAtRevision
proofFingerprint
```

Global clue strings may remain a projection for display, but they should not allow future-scene or stale-source data to complete another scene.

## Required gameplay fixtures

```txt
scene-one-completes-from-its-three-inspections
future-scene-clues-do-not-complete-scene-one
reload-complete-scene-restores-interlude-progression
readiness-transition-is-deterministic
continue-advances-exactly-one-scene
final-continue-enters-terminal
terminal-reload-restores-terminal-state
```
