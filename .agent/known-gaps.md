# Known gaps: The Unmapped House

Timestamp: `2026-07-11T17-10-50-04-00`

## Plan ledger

**Goal:** keep story, lifecycle, rendering, resolution, recovery, and validation gaps explicit while promoting render-surface resolution into an implementation-ready contract.

- [x] Preserve StoryManifest, StorySnapshot, inspection, Continue, and lifecycle authority as prerequisites.
- [x] Trace design-frame sizing, live viewport sizing, DPR admission, renderer allocation, target allocation, resize callbacks, and frame submission.
- [x] Define pixel budget, resize generation, surface revision, fallback, rollback, retirement, frame acknowledgement, and fixture gaps.
- [x] Preserve committed-frame diagnostics as the downstream proof gate.

## Story and persistence gaps

- No canonical StoryManifest id, schema, indexes, deep freeze, or fingerprint exists.
- The `.v1` save remains an unversioned raw object with broad-catch parsing and shallow merge.
- No semantic admission, migration, reconciliation, quarantine, typed persistence result, bootstrap rollback, or first-bootstrap-frame result exists.
- Inspections, clues, route, current scene, completion, and terminal state can disagree.

## Inspection and transition gaps

- Side-panel and raycast paths submit full mutable hotspot descriptors.
- No command identity, sequence, canonical lookup, immutable receipt, clue provenance, or typed result exists.
- Completion is derived from global clue strings rather than accepted current-scene receipts.
- Continue mutates live story state before replacement stage and persistence success.
- No transition lock, rollback, stage epoch, first-successor-frame, retirement result, or durable terminal phase exists.

## Runtime lifecycle gaps

- RAF, resize, pointer, click, keyboard, button closures, and timeouts are not revocable.
- `stageGroup.clear()` detaches resources without disposing geometries or materials.
- Renderer, target, post resources, canvas, and WebGL context have no explicit teardown result.
- No `sessionId`, session generation, callback fence, or idempotent stop/dispose contract exists.

## Render composition and resolution gaps

- CSS aspect-frame geometry and internal GPU resolution are conflated inside `StageKit.resize()`.
- DPR is sampled directly and capped only at `2`; no pixel or capability budget exists.
- The constructor allocates design-sized renderer and target storage, then immediately resizes both.
- A 4K viewport at DPR 2 requests a 7680×4320 target with two samples and depth overhead.
- Renderer and target dimensions are derived independently without one canonical plan or read-back result.
- Fractional CSS dimensions have no explicit canonicalization policy across CSS, renderer, target, camera, and picking.
- No immutable quality tiers, maximum long edge, maximum pixel count, sample policy, or fallback chain exists.
- Maximum texture/renderbuffer dimensions and sample support are not admitted before allocation.

## Resize admission gaps

- Every browser resize event executes a full resize synchronously.
- Duplicate and superseded resize observations are not coalesced.
- No resize command id, session generation, resize generation, or surface revision exists.
- Old asynchronous or deferred candidate work could not be rejected because no generation identity is available.
- Boot sizing, later resize, DPR change, retry, and quality fallback do not share a typed command path.

## Allocation and recovery gaps

- Renderer and target mutations occur directly in committed ownership.
- No detached candidate preparation or predecessor checkpoint exists.
- No failure classification distinguishes capability, memory, context, or unknown allocation failures.
- No lower-resolution fallback is attempted through a declared policy.
- No rollback result proves the predecessor surface stayed visible.
- Partial candidate resources have no explicit disposal result.
- Superseded allocations have no retirement receipt.

## Input and visible-frame gaps

- No barrier proves CSS frame geometry, raycast coordinates, camera projection, renderer buffer, post target, and visible output share one surface revision.
- Hotspot hover and click parity after a resize is not tested.
- No first-visible-frame surface acknowledgement exists.
- Story and stage frame provenance does not include render-surface identity.

## Diagnostics gaps

- The debug panel exposes story state but no render-surface state.
- Observed and admitted DPR are not distinguished.
- CSS frame, renderer drawing-buffer, post-target dimensions, samples, pixel count, quality tier, generation, revision, fallback, and allocation results are absent.
- Requested values could be mistaken for actual applied values because no read-back observation exists.
- No bounded render-surface journal exists.

## Validation gaps

- `npm run check` performs syntax checks only.
- No render-resolution policy, pixel-budget, resize-generation, allocation-failure, fallback, rollback, picking-parity, or visible-frame fixture exists.
- No high-DPI or 4K browser matrix exists.
- No rapid-resize or DPR-transition smoke exists.
- No context-loss or exhausted-fallback smoke exists.
- Existing validation does not execute StoryManifest, persistence, interaction, transition, lifecycle, resource retirement, or committed-frame behavior.

## Deferred work

```txt
new story rooms or branches
inventory
audio
renderer replacement
new shader work
camera retuning
visual polish
```
