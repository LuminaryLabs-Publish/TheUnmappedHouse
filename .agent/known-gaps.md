# Known gaps: The Unmapped House

**Timestamp:** `2026-07-13T01-49-49-04-00`

## Summary

The newest documented gap is hotspot input and picking authority. Canvas activation borrows mutable hover coordinates and an unversioned camera pose instead of capturing one event-bound, source-identified inspection command.

## Plan ledger

**Goal:** eliminate wrong-target inspection, stale pick evidence, touch mismatch, persistent hover and source-divergent gameplay commands.

- [x] Trace mousemove, canvas click, touch-compatible click, camera parallax and exact-button paths.
- [x] Identify missing identities, revisions and typed results.
- [x] Define candidate authority kits and fixture rows.
- [ ] Implement and execute the authority.

## Input identity gaps

```txt
input session ID: absent
command ID: absent
event sequence: absent
pointer ID: absent
pointer type: absent
input source identity: absent
activation-event coordinates: not captured
```

## Spatial admission gaps

```txt
scene revision: absent
hotspot-set revision: absent
viewport revision: absent
canvas-rect revision: absent
camera pose revision: absent
rendered-frame revision: absent
outside-canvas rejection: absent
stale sample rejection: absent
stale camera rejection: absent
```

## Pick result gaps

```txt
immutable pick command: absent
candidate list: absent
candidate distances: absent
deterministic tie policy: absent
accepted miss result: absent
selected hotspot result ID: absent
pick fingerprint: absent
bounded pick journal: absent
```

## Source and gameplay gaps

```txt
canvas and side-panel source equivalence: absent
shared HotspotInspectionCommand: absent
shared HotspotInspectionResult: absent
unknown/stale hotspot rejection: absent
duplicate inspection rejection: absent
exactly-once story side effects: absent
inspection-result visible feedback: absent
```

## Hover lifecycle gaps

```txt
pointerenter state: implicit
pointerleave retirement: absent
pointercancel retirement: absent
scene-change hover invalidation: absent
runtime-stop hover invalidation: absent
hover result identity: absent
hover-frame correlation: absent
```

## Presentation and proof gaps

```txt
pointer/camera revision in Notebook: absent
pick result in diagnostics: absent
first visible inspection-frame acknowledgement: absent
first-click browser fixture: absent
touch/stylus fixture: absent
parallax-click correlation fixture: absent
pointer-leave fixture: absent
Pages hotspot-input smoke: absent
```

## Retained independent gaps

```txt
browser save commit/reset convergence
story manifest and snapshot admission
scene-progression and interlude authority
stage resource disposal and runtime stop
Notebook channel separation
render-surface budgeting and WebGL context recovery
committed-frame diagnostics
```

## Completion boundary

Do not claim canvas hotspot reliability because a raycaster returns an intersection. Completion requires event-bound coordinates, source identity, revisioned viewport/camera/hotspot evidence, deterministic hit selection, shared gameplay results, hover retirement and visible-frame proof across mouse, touch, stylus and deployed Pages fixtures.