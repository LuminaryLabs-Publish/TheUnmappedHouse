# Interaction audit: motion preference command and result map

**Timestamp:** `2026-07-15T02-59-31-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Status:** `audited`

## Summary

There is no user-facing motion command and no system-preference event enters an application-owned result flow.

## Plan ledger

**Goal:** admit explicit and system motion preferences through one deterministic command path.

- [x] Map existing input and settings surfaces.
- [x] Define preference precedence.
- [x] Define stale and duplicate rejection.
- [x] Define visible-frame acknowledgement.
- [ ] Implement the adapter and fixtures.

## Command sources

```txt
explicit user setting
  -> highest precedence
  -> persisted as override

system prefers-reduced-motion
  -> used when no explicit override exists
  -> observed for live changes

default
  -> FullMotion when neither source requests reduced motion
```

## Command/result flow

```txt
MotionPreferenceSourceEvent
  -> MotionPreferenceAdmissionCommand
  -> resolve source precedence and expected revision
  -> prepare participant candidates
  -> reject invalid, stale, duplicate or superseded work
  -> atomically adopt profile
  -> MotionPreferenceAdmissionResult
  -> render
  -> FirstMotionMatchedFrameAck
```

## Required result fields

```txt
commandId
profileRevision
sourceKind
sourceRevision
resolvedProfile
participantReceipts
predecessorProfileRevision
adoptionStatus
renderedFrameId
acknowledgedAt
```
