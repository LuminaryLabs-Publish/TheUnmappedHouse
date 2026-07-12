# Known gaps: The Unmapped House

**Timestamp:** `2026-07-12T19-11-01-04-00`

## Summary

The newest documented gap is stage resource lifecycle authority. Scene replacement detaches previous Three.js objects but does not explicitly dispose their geometries or materials, and the stage has no stop path for RAF, listeners, renderer or render targets.

## Plan ledger

**Goal:** eliminate unowned scene and callback lifetime while preserving rollback and visible-frame correctness.

- [x] Trace every StageKit allocation and retained callback.
- [x] Trace scene replacement and terminal lifetime.
- [x] Quantify normal-progression resource retirement.
- [x] Define candidate authority kits and fixture rows.
- [ ] Implement and execute the authority.

## Scene-resource gaps

```txt
stage session ID: absent
scene resource-set ID/revision: absent
detached candidate group: absent
atomic commit: absent
rollback: absent
geometry ownership: implicit
material ownership: partial
hotspot material tracking: absent
exact-once disposal result: absent
stale load rejection: absent
```

## Runtime-lifecycle gaps

```txt
RAF handle: not retained
RAF cancellation: absent
listener identities: not retained
listener removal: absent
stage stop state: absent
idempotent stop result: absent
render target disposal: absent
post geometry/material disposal: absent
renderer disposal: absent
```

## Presentation gaps

```txt
hovered descriptor reset on scene load: absent
hover label clear on scene load: absent
scene-resource revision in diagnostics: absent
first visible scene-frame acknowledgement: absent
candidate-frame failure rollback: absent
```

## Quantified source boundary

```txt
scene 1 retirement: 10 geometries + 10 materials
scene 2 retirement: 9 geometries + 9 materials
normal full progression: 19 geometries + 19 materials detached without explicit dispose
```

This is a source-level count, not a measured GPU-memory claim.

## Retained gaps

```txt
story manifest/snapshot admission
storage concurrency and destructive reset
completion timer generation
modal focus and Continue admission
Notebook channel separation
render-surface budgeting and context recovery
committed-frame diagnostics
```

## Completion boundary

Do not claim lifecycle safety because objects are removed from the scene graph or become garbage-collectable. Completion requires explicit ownership, exact-once disposal receipts, cancellable callbacks, idempotent stop behavior, rollback tests and visible-frame correlation.