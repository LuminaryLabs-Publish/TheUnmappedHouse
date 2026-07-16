# Known gaps: The Unmapped House hotspot availability and discovery projection

**Timestamp:** `2026-07-16T09-58-49-04-00`  
**Status:** `audited`

## Summary

Authored hotspot membership currently implies immediate listing and pickability. The product has no availability policy version, discovery state, visibility/occlusion result, interaction mode, modal suspension result, parity result, stale-generation rejection, hover retirement result or available-frame acknowledgement.

## Plan ledger

**Goal:** make listed, visible, hoverable, pickable, enabled and current-generation hotspot state explicit.

- [x] Trace the current list and canvas paths.
- [x] Confirm raw authored arrays drive both projections directly.
- [x] Define missing identities, policies, results and proof.
- [ ] Implement and execute them.

## Identity and revision gaps

```txt
HotspotAvailabilityPolicyVersion: absent
HotspotAvailabilityRevision: absent
SceneHotspotIndexRevision: absent
HotspotDiscoveryRevision: absent
HotspotProjectionRevision: absent
FirstAvailableHotspotFrameAck: absent
FirstHotspotInteractionAck: absent
```

## Policy gaps

```txt
discovered/undiscovered state: absent
clue-gated availability: absent
explicit visible state: absent
explicit occlusion policy: absent
list-only/canvas-only/both mode: absent
disabled reason: absent
interlude/terminal modal suspension result: absent
inspected re-read policy result: absent
```

## Projection gaps

```txt
shared DOM/canvas candidate set: absent
HotspotListProjectionResult: absent
HotspotCanvasPickProjectionResult: absent
HotspotParityResult: absent
stale scene-generation rejection: absent
stale availability-revision rejection: absent
scene-transition hover retirement: absent
modal-transition hover retirement: absent
```

## Interaction gaps

```txt
HotspotInteractionCommand: absent
HotspotInteractionResult: absent
unavailable rejection: absent
occluded rejection: absent
modal-suspended rejection: absent
stale interaction rejection: absent
input-surface provenance: absent
```

## Proof gaps

```txt
current all-hotspots parity fixture: absent
hidden hotspot fixture: absent
clue-gated hotspot fixture: absent
occluded hotspot fixture: absent
list-only/canvas-only fixture: absent
interlude suspension fixture: absent
scene-transition stale-hover fixture: absent
stale availability fixture: absent
source/artifact/Pages parity: absent
```

## Retained independent gaps

```txt
story content graph validation
browser startup readiness and retry
story save writer lease and revision
story audio event projection
inspection control focus continuity
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
raw hotspot input picking
same-document save commit/reset convergence
interlude progression timing
stage resource lifecycle
```

## Completion boundary

Do not claim hotspot discovery or interaction parity until one accepted availability generation drives both DOM and canvas projections, stale hover evidence is retired, every interaction is revision-checked, and matching source/artifact/Pages fixtures pass.