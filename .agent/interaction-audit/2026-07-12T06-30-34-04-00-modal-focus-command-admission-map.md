# Interaction audit: modal focus command admission map

**Timestamp:** `2026-07-12T06-30-34-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

## Summary

Current interaction adapters dispatch native button clicks directly into story mutation. This audit maps the required normalization and admission boundary for keyboard, pointer and assistive activation.

## Plan ledger

**Goal:** route every Continue activation through one idempotent command contract bound to current modal and completion state.

- [x] Identify pointer, keyboard and native click sources.
- [x] Identify direct mutation destination.
- [x] Define command identity, capability and generation fields.
- [x] Define zero-mutation rejection rules.
- [ ] Implement the interaction gateway.

## Current map

```txt
side-panel hotspot button
  -> click
  -> inspectHotspot(hotspot object)

canvas hotspot
  -> raycast click
  -> inspectHotspot(hotspot object)

Continue button
  -> native click
  -> nextScene()
```

No interaction gateway normalizes commands or checks current capability.

## Required map

```txt
keyboard / pointer / assistive activation
  -> ContinueCommand adapter
  -> command id and sequence
  -> modal generation validation
  -> focus lease validation
  -> scene completion proof validation
  -> duplicate/stale rejection
  -> accepted transition handoff
  -> typed result
```

## Zero-mutation rejection cases

```txt
modal closed
Continue capability disabled
wrong scene id
stale modal generation
missing completion proof
consumed completion proof
duplicate command id
retired runtime session
background control while modal open
```

## Required observations

```txt
lastCommandId
lastCommandSource
lastAdmissionStatus
modalGeneration
focusLeaseId
completionProofId
transitionCommandId
rejectionReason
```

## Validation boundary

No event listener or gameplay source changed. No interaction command fixture was executed.
