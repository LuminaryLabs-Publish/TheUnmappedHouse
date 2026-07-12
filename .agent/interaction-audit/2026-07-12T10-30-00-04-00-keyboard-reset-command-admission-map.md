# Interaction audit: keyboard reset command admission map

**Timestamp:** `2026-07-12T10-30-00-04-00`

## Summary

The keyboard adapter currently converts `KeyR` directly into destructive effects. It needs event classification and command admission before any mutation.

## Plan ledger

**Goal:** normalize keyboard events into explicit reset intent and reject ambiguous or browser-owned chords.

- [x] Inspect keyboard event fields currently consumed.
- [x] Identify missing modality and focus evidence.
- [x] Define event classification results.
- [x] Define reset command/result flow.
- [ ] Implement adapter and fixtures.

## Current map

```txt
KeyboardEvent
  -> code only
  -> storage delete
  -> reload
```

## Required map

```txt
KeyboardEventEnvelope
  -> trusted/repeat/focus/visibility classification
  -> modifier and browser-shortcut classification
  -> ResetIntentResult
  -> confirmation capability
  -> ResetStoryCommand
  -> reset authority admission
  -> typed ResetStoryResult
```

## Event classifications

```txt
IgnoredNonResetKey
RejectedBrowserRefreshChord
RejectedUnsupportedModifier
RejectedRepeatedEvent
RejectedUntrustedEvent
RejectedHiddenDocument
RejectedInvalidFocus
ResetConfirmationRequired
ResetIntentAdmitted
```

Keyboard adapters must not own storage, timer, lifecycle or navigation effects.
