# Current audit: The Unmapped House render-loop frame allocation and scratch ownership

**Timestamp:** `2026-07-18T09-40-39-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Status:** `render-loop-frame-allocation-scratch-authority-audited`  
**Branch:** `main`

## Summary

`StageKit.animate()` creates a new arrow callback for every recursive `requestAnimationFrame` request. Once `baseCamera` exists, the same frame clones its position into a new `THREE.Vector3`, applies pointer parallax and copies the result into the active camera.

## Intent

Make callback identity, reusable frame scratch, source-owned allocation evidence, budget settlement and the matching presented frame belong to one accepted stage and frame-work generation.

## Source-backed finding

```txt
RAF scheduling: requestAnimationFrame(() => this.animate())
retained callback identity: absent
camera position work: this.baseCamera.position.clone()
reusable camera scratch: absent
source-owned allocations after scene load: at least 2 objects per animate invocation
allocation counters: absent
heap or GC evidence: absent
frame-work budget result: absent
RenderFrameWorkDigest: absent
FirstFrameWorkBoundPresentationAck: absent
```

Conditional arithmetic at 60 accepted frames per second:

```txt
callback closures: 60 / second
Vector3 clones: 60 / second
source-visible minimum: 120 objects / second
```

## Required authority

`the-unmapped-house-render-loop-frame-allocation-scratch-authority-domain`

## Smallest safe implementation

1. Retain a single RAF callback identity for each StageKit generation.
2. Allocate one `THREE.Vector3` camera scratch value for each StageKit generation.
3. Use `scratch.copy(baseCamera.position)` instead of `clone()`.
4. Retire callback and scratch leases through the existing stage lifecycle boundary.
5. Observe source-owned allocation counts separately from provider/browser heap behavior.
6. Bind the frame-work result and digest to stage, frame and presentation generations.
7. Prove camera/parallax equivalence and steady-state construction behavior in a browser fixture.

## Boundary

Documentation only. No scheduler, camera, renderer, shader, scene, story, input, save, build or deployment behavior changed. No performance improvement or regression is claimed.