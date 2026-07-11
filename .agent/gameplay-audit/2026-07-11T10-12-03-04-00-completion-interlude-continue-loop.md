# Gameplay audit: Completion, interlude and Continue loop

Timestamp: `2026-07-11T10-12-03-04-00`

## Goal

Map the player-facing scene loop to the missing authority results without changing story copy, clue order or pacing.

## Current loop

```txt
inspect three hotspots
  -> set scene-keyed inspected flags
  -> grant global clue strings
  -> sceneComplete() becomes true
  -> notebook receives completion row
  -> setTimeout(showInterlude, 450)
  -> interlude opens
  -> player presses Continue
  -> next scene becomes current
  -> route and notebook update
  -> stage replacement begins
  -> save writes after replacement
```

## Gameplay invariants to preserve

```txt
three scenes
three hotspots per scene
three required clues per scene
existing scene order
existing text and notebook copy
existing 450 ms interlude pacing
fixed camera and parallax behavior
terminal prototype-complete copy
```

## Current authority gaps

- Completion is a boolean projection from global clue strings, not a receipt.
- The interlude timeout has no ownership or duplicate policy.
- Continue does not admit the current scene, revision, stage epoch or completion proof.
- Story advancement occurs before render or storage success.
- A failed stage build can strand gameplay between scenes.
- The final Continue has no durable terminal phase.
- The player receives no committed or failed transition feedback state.

## Required gameplay result sequence

```txt
InspectionResult
  -> SceneCompletionProof
  -> InterludeLeaseResult
  -> ContinueAdmissionResult
  -> TransitionPreparationResult
  -> StorySaveResult
  -> StageCommitResult
  -> FirstFrameReceipt
  -> TransitionCommittedResult
```

## Required gameplay fixture rows

```txt
completion-proof-issued-once
interlude-opens-after-current-450-ms-policy
duplicate-completion-does-not-add-second-lease
continue-blocked-without-proof
continue-accepted-with-current-proof
failed-prepare-keeps-current-scene-playable
failed-save-keeps-current-scene-playable
committed-transition-enables-target-hotspots
route-appends-target-once
notebook-entry-appends-once
terminal-transition-durable
terminal-repeat-noop
```
