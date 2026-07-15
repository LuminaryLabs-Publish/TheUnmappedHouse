# Known gaps: The Unmapped House inspection control focus continuity

**Timestamp:** `2026-07-15T08-28-25-04-00`  
**Status:** `audited`

## Summary

The story exposes semantic hotspot buttons, but every inspection replaces the whole button tree. Stable DOM identity, control-list revisions and focus settlement are absent.

## Plan ledger

**Goal:** make inspection projection identity, focus behavior and browser proof explicit.

- [x] Trace DOM and canvas inspection producers.
- [x] Trace destructive list reconstruction.
- [x] Define missing identities, policies and results.
- [ ] Implement and execute them.

## Identity gaps

```txt
InspectionCommandId: absent
HotspotControlId: absent from DOM projection
HotspotControlListRevision: absent
FocusAnchorId: absent
FocusRevision: absent
InspectionActivationOrigin: implicit
FirstFocusStableInspectionFrameAck: absent
```

## Projection gaps

```txt
keyed control map: absent
in-place label update: absent
surviving-node retention: absent
explicit removed-control retirement: absent
stale projection rejection: absent
duplicate projection rejection: absent
atomic story/control adoption: absent
projection rollback: absent
```

## Focus gaps

```txt
active control capture: absent
accepted-control focus retention: absent
removed-control fallback: absent
scene-heading transfer: absent
canvas-origin focus policy: absent
scene replacement focus policy: absent
interlude handoff receipt: absent
```

## Current path

```txt
focused button click
  -> inspectHotspot
  -> story mutation
  -> renderUi
  -> hotspotList.textContent = ""
  -> active node disconnected
  -> new buttons appended
  -> save state
```

## Proof gaps

```txt
keyboard-only scene traversal fixture: absent
first inspection focus fixture: absent
repeat inspection focus fixture: absent
neighbor Tab-order fixture: absent
final-hotspot/interlude fixture: absent
scene replacement focus fixture: absent
canvas no-focus-steal fixture: absent
projection rollback fixture: absent
first focus-stable frame acknowledgement: absent
source/artifact/Pages parity: absent
```

## Retained independent gaps

```txt
motion preference visual-effect admission
story announcement semantic projection
interlude focus and route admission
page lifecycle suspension and resume
terminal completion settlement
WebGL context recovery
story-save schema and manifest admission
viewport authority
scene-transition composition
renderer-provider admission
hotspot picking
save commit/reset convergence
interlude progression timing
stage resource lifecycle
```

## Completion boundary

Do not claim keyboard inspection continuity until surviving controls retain stable identity, every accepted projection settles focus through an explicit policy, and browser proof captures the first UI frame matching the accepted inspection and control-list revisions.