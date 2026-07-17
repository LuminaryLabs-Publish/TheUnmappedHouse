# Next steps: The Unmapped House pointer presence retirement

**Timestamp:** `2026-07-17T05-03-18-04-00`  
**Status:** `audited`

## Summary

The smallest safe implementation is one idempotent pointer-retirement path shared by canvas exit, cancellation, focus loss, document hiding and scene replacement.

## Checklist

- [ ] Allocate `PointerSessionId`, `PointerGeneration`, `SceneGeneration` and `PointerSampleId`.
- [ ] Replace direct mutable pointer writes with `PointerSampleAdmissionResult`.
- [ ] Add canvas `pointerleave` or `mouseleave` handling.
- [ ] Add `pointercancel`, window blur and document visibility retirement.
- [ ] Retire predecessor pointer state before `loadScene()` commits a successor scene.
- [ ] Clear `hovered` and hide the hover label exactly once.
- [ ] Choose immediate or bounded parallax neutralization.
- [ ] Reject stale predecessor samples and duplicate retirement.
- [ ] Bind hover and parallax projection to one generation and digest.
- [ ] Publish `FirstNeutralPointerFrameAck`.
- [ ] Add source, artifact and Pages fixture parity.

## Ordered implementation

### 1. Pointer identity

Create a small pointer-session record bound to scene and viewport generations. Every accepted move produces a terminal result.

### 2. Retirement path

Add one `retirePointerPresence(reason)` path. It must be idempotent and used by leave, cancel, blur, hidden document, scene replacement and runtime retirement.

### 3. Projection settlement

Clear the hover target, hide the label and set a deterministic neutral parallax target. Do not let stale events reactivate the retired generation.

### 4. Scene handoff

Retire predecessor pointer state before scene geometry and hotspot identity are replaced. The successor scene starts with no inherited hover target.

### 5. Proof

Exercise each retirement reason and acknowledge the first frame with hidden hover UI and neutral camera projection at source, artifact and Pages origins.

## Do not combine yet

Keep runtime frame-fault containment, scene-entry narrative, hotspot activation, save, interlude, focus, WebGL recovery and stage-resource lifecycle as retained independent authorities.