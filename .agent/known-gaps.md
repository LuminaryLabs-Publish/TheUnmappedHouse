# Known gaps: The Unmapped House pointer presence retirement

**Timestamp:** `2026-07-17T05-03-18-04-00`  
**Status:** `audited`

## Summary

Pointer-derived hover and parallax state has no explicit presence lifetime. It is accepted by `mousemove` and remains live until another in-canvas move overwrites it.

## Identity gaps

```txt
PointerSessionId: absent
PointerGeneration: absent
PointerSampleId: absent
SceneGeneration on pointer evidence: absent
ViewportRevision on pointer evidence: absent
HoverTargetGeneration: absent
ParallaxTargetGeneration: absent
PointerRetirementId: absent
PointerProjectionDigest: absent
FirstNeutralPointerFrameAck: absent
```

## Retirement gaps

```txt
canvas leave retirement: absent
pointer cancel retirement: absent
window blur retirement: absent
document hidden retirement: absent
scene replacement retirement: absent
runtime retirement integration: absent
stale sample rejection: absent
duplicate retirement settlement: absent
hover-label clear result: absent
parallax neutralization result: absent
```

## Current projection mismatch

```txt
hover target: latest in-canvas raycast
hover-label lifetime: until another mousemove
parallax target: latest in-canvas mouse coordinates
scene replacement: does not reset either target
pointer absence: not represented
neutral frame acknowledgement: unavailable
```

## Proof gaps

```txt
hover then leave fixture: absent
parallax then leave fixture: absent
pointercancel fixture: absent
window blur fixture: absent
document visibility fixture: absent
scene-transition stale-label fixture: absent
stale sample rejection fixture: absent
first neutral frame fixture: absent
source/artifact/Pages parity: absent
```

## Retained independent gaps

```txt
runtime frame fault containment and recovery
scene-entry narrative projection
hotspot availability and discovery projection
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
scene-transition composition and atomicity
renderer-provider admission
raw hotspot input picking
same-document save commit/reset convergence
interlude progression timing
stage resource lifecycle
```

## Completion boundary

Do not claim pointer-presence correctness until every retirement reason produces one terminal result; predecessor samples cannot reactivate stale state; scene replacement starts with no inherited hover target; parallax converges to the declared neutral policy; and source, artifact and Pages fixtures acknowledge the first neutral frame.