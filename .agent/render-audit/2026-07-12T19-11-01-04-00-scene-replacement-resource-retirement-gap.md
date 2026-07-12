# Render audit: Scene Replacement Resource Retirement Gap

**Timestamp:** `2026-07-12T19-11-01-04-00`

## Summary

The render graph replaces scene children but does not retire their GPU-facing resources through explicit disposal or report which resource revision produced the visible frame.

## Plan ledger

**Goal:** prove each visible scene uses one committed resource set and every predecessor is retired exactly once.

- [x] Count per-scene meshes.
- [x] Trace clear, replacement and render order.
- [x] Trace persistent renderer/post resources.
- [ ] Add executable disposal and frame fixtures.

## Current path

```txt
Continue
  -> stageGroup.clear()
  -> hotspots = []
  -> materials = []
  -> allocate new layers, props and hotspots directly into stageGroup
  -> next RAF renders new group
```

## Gap

```txt
scene 1 detached: 10 geometries + 10 materials
scene 2 detached: 9 geometries + 9 materials
explicit dispose calls: 0
resource-set revision: absent
commit result: absent
rollback: absent
visible-frame receipt: absent
```

A stale hover label can also remain visible because `hovered` and `hoverLabel` are not cleared on load.

## Required proof

```txt
candidate construction leaves active scene unchanged
successful swap identifies predecessor and successor revisions
failed first frame restores predecessor or returns declared terminal policy
unique geometries/materials dispose once
hover label clears on commit
renderer frame cites successor revision
```
