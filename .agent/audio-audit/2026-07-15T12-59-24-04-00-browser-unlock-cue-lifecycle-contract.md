# Audio audit: browser unlock, cue and lifecycle contract

**Timestamp:** `2026-07-15T12-59-24-04-00`

## Summary

No browser audio owner exists. The required contract must handle capability, user-gesture unlock, semantic cue projection, preferences, deduplication, resource budgets and document lifecycle.

## Plan ledger

**Goal:** establish one browser-audio generation that can be admitted, suspended, resumed and retired without changing story truth.

- [x] Define capability and unlock boundaries.
- [x] Define cue, ambience and preference ownership.
- [x] Define lifecycle and deduplication requirements.
- [x] Define proof receipts.
- [ ] Implement and test.

## Admission contract

```txt
observe Web Audio capability
  -> create no audible node before accepted gesture admission
  -> accept unlock from an existing user gesture
  -> create or resume one AudioContext generation
  -> publish AudioUnlockResult
```

## Cue contract

```txt
semantic result
  -> stable SemanticAudioEventId
  -> CueDescriptor lookup
  -> mute volume bus and priority policy
  -> duplicate and stale rejection
  -> pooled node scheduling
  -> AudioProjectionResult
```

## Lifecycle contract

```txt
visibility hidden
  -> suspend or attenuate by policy
visibility restored
  -> resume accepted generation without replaying one-shots
pagehide or route retirement
  -> stop loops disconnect nodes clear pools and retire generation
new scene
  -> atomically replace scene ambience and spatial sources
```

## Required preferences

```txt
master volume
music or ambience volume
story-effects volume
UI volume
mute
preference revision
storage result
```

## Proof receipts

```txt
AudioUnlockAccepted
AudioUnlockRejectedUnsupported
AudioUnlockDeferred
CuePlayed
CueSuppressedDuplicate
CueSuppressedMuted
AmbienceAdopted
AudioGenerationSuspended
AudioGenerationResumed
AudioGenerationRetired
FirstAudibleCueAck
FirstAudioVisualConvergenceAck
```

## Boundary

The browser adapter may synthesize cues procedurally and use no external assets. Audio remains optional presentation; unsupported or muted operation must preserve complete story playability.