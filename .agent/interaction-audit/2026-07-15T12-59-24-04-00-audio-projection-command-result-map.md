# Interaction audit: audio projection command/result map

**Timestamp:** `2026-07-15T12-59-24-04-00`

## Summary

DOM and canvas input converge on semantic story mutation, but no accepted result is handed to an audio projection boundary.

## Plan ledger

**Goal:** prevent raw clicks, raycasts and Continue actions from playing success audio before the story runtime accepts the corresponding result.

- [x] Identify DOM and canvas producers.
- [x] Identify accepted story results.
- [x] Define audio admission, deduplication and acknowledgement.
- [ ] Implement the command/result path.

## Map

```txt
DOM click or canvas hotspot pick
  -> inspectHotspot
  -> InspectionAccepted or InspectionRepeated
  -> AudioProjectionAdmissionCommand
  -> cue policy and dedupe
  -> AudioProjectionResult
  -> FirstAudibleCueAck when audible

Continue click
  -> SceneAdvanced or PrototypeCompleted
  -> AudioProjectionAdmissionCommand
  -> transition or terminal cue policy
  -> AudioProjectionResult
```

## Rejection and suppression statuses

```txt
AudioProjectionAccepted
AudioProjectionAcceptedSilent
AudioProjectionDeferredForUnlock
AudioProjectionSuppressedDuplicate
AudioProjectionSuppressedMuted
AudioProjectionRejectedStale
AudioProjectionRejectedSuperseded
AudioProjectionFailed
AudioProjectionRetired
```

## Invariants

- Raw input never implies story success.
- One semantic event ID may create at most one one-shot cue per audio generation.
- Repeated inspection may use a distinct authored cue, but cannot replay the first-inspection cue by accident.
- Scene ambience is replaced atomically with scene adoption.
- Hidden, pagehide and route retirement stop or suspend owned nodes through explicit results.