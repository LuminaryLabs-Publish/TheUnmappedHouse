# Render audit: Stale Delay and Visible Scene Gap

**Timestamp:** `2026-07-12T08-10-36-04-00`

## Plan ledger

**Goal:** require visible scene, narrative and interlude projection to cite the same admitted timer, scene and transition generations.

- [x] Trace scene replacement and interlude projection.
- [x] Identify the callback-to-visible-state mismatch.
- [x] Define required frame provenance.
- [ ] Implement browser proof.

## Current mismatch

```txt
timer A scheduled while scene A is current
scene B transition commits
StageKit loads B resources
RAF renders B
route and persistence cite B
timer A fires and reads currentScene as B
B interlude opens without B completion
```

The rendered stage can be internally consistent with scene B while the visible modal was authorized by scene A's delayed completion. No current diagnostic or frame receipt exposes that mismatch.

## Missing render provenance

```txt
visibleFrameId
runtimeSessionId
sceneId
sceneGeneration
transitionRevision
completionProofId
timerId
timerGeneration
modalGeneration
narrativeProjectionRevision
stageResourceGeneration
```

## Terminal variant

`nextScene()` writes `Prototype complete` copy when no successor exists. A pending completion callback can later call `showInterlude(currentScene)`, replace that copy with the final scene's normal interlude text and open the overlay. Terminal projection has no durable state or frame acknowledgement to reject the rewrite.

## Required visible-frame contract

```txt
InterludeOpenIntent admitted
  -> commit modal generation
  -> commit narrative projection revision
  -> render stage and DOM
  -> capture VisibleInterludeFrameAck
  -> require matching scene, transition, proof, timer and modal identities
```

## Proof rows

```txt
scene A timer cannot produce scene B visible interlude
cancelled timer produces no visible projection
stale timer produces explicit rejected result
terminal copy remains visible after all predecessor due times
first visible interlude frame cites admitted timer generation
stage resource generation equals narrative scene generation
```

No render or modal correctness claim is made until those rows execute in a browser.