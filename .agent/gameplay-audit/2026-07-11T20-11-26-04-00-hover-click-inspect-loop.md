# Gameplay audit: Hover, click and inspect loop

Timestamp: `2026-07-11T20-11-26-04-00`

## Summary

The visible gameplay promise is simple: point at an authored object, see its label, activate it, and receive the matching clue. The runtime does not prove that the activation coordinates match the object shown under the pointer.

## Plan ledger

**Goal:** preserve the three-scene clue loop while making canvas and side-panel activations deterministic, stale-safe, and equivalent.

- [x] Trace hover, click, side-panel, clue grant, completion, interlude, save, and scene transition paths.
- [x] Identify the stale-pointer gameplay failure modes.
- [x] Define required activation outcomes and parity rows.
- [ ] Implement the authority and browser proof.

## Intended loop

```txt
observe authored hotspot
  -> hover the visible object
  -> see the matching label
  -> activate that object
  -> inspect the same canonical hotspot
  -> grant its canonical clue once
  -> update completion and notebook
```

## Actual canvas loop

```txt
mousemove may update a shared pointer
  -> hover uses that sample
  -> click coordinates are ignored
  -> click raycasts the shared pointer
  -> current hit descriptor enters inspection
```

## Failure cases

```txt
first click without mousemove
  -> center-screen pick rather than click-location pick

activation after resize
  -> old normalized sample reused without surface provenance

activation after Continue
  -> old sample reinterpreted through a new camera and hotspot set

activation from a touch-oriented browser
  -> no pointer-event authority or modality proof

pointer exits canvas
  -> hover label and parallax are not explicitly cancelled
```

## Required gameplay result

```txt
ActivationResult
  status: accepted | miss | duplicate | stale | rejected | failed
  source: canvas | side-panel
  modality
  hotspotId?
  sampleId?
  pickResultId?
  inspectionCommandId?
  storyRevisionBefore
  storyRevisionAfter?
  clueReceiptIds[]
  completionProofId?
```

## Required parity rows

```txt
canvas-map-equals-side-panel-map
canvas-window-equals-side-panel-window
canvas-shelf-gap-equals-side-panel-shelf-gap
all-nine-hotspots-have-dual-ingress-parity
canvas-miss-does-not-grant-clue
stale-canvas-pick-does-not-grant-clue
duplicate-canvas-activation-is-idempotent
modality-does-not-change-hotspot-semantics
```

The story loop is not fully proven until the selected visible hotspot, canonical inspection receipt, clue receipt, completion state, persisted snapshot, and next visible frame share the same authority chain.
