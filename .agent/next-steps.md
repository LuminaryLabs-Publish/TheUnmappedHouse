# Next steps: The Unmapped House

Timestamp: `2026-07-12T03-21-27-04-00`

## Goal

Preserve the current three-scene story, 450 ms pacing, fixed 16:9 composition, side-panel accessibility path and Three.js presentation while making content, state, picking, transitions, narrative, lifecycle and visible-frame proof deterministic.

## Plan ledger

### 1. Canonical StoryManifest
- [ ] Add stable manifest identity, versions, indexes, validation, freeze and fingerprint.

### 2. Versioned StorySnapshot startup authority
- [ ] Replace the raw save with typed parse, migration, reconciliation and commit results.

### 3. Pointer observation and hotspot-pick authority
- [ ] Unify canvas and side-panel activation around canonical id-only commands.

### 4. Inspection and completion proof
- [ ] Record immutable inspection receipts and derive one scene-completion proof.

### 5. Atomic Continue transition
- [ ] Prepare successor story, stage, hotspot, narrative and persistence candidates before mutation.

### 6. Narrative Projection Authority
- [ ] Make DOM and aria-live output consume a typed, revisioned narrative projection.

### 7. Runtime Session Lifecycle and Scene Resource Retirement Authority
- [ ] Add session identity, callback leases, scene-resource generations and ordered disposal.
- [ ] Retain predecessor resources until the first accepted successor frame.

### 8. Render Surface Resolution Authority
- [ ] Separate CSS composition from internal GPU resolution and commit surface revisions.

### 9. WebGL Context Recovery Authority
- [ ] Coordinate context loss, restoration and replacement resource generations.

### 10. Committed Frame Diagnostics Authority
- [ ] Add a monotonic frame sequence.
- [ ] Freeze one immutable frame input per callback.
- [ ] Require runtime, scene-resource, surface, context, camera and story revisions.
- [ ] Return typed stage-pass and post-pass results.
- [ ] Commit public frame state only after final canvas acknowledgement.
- [ ] Reject stale or failed frame results.
- [ ] Publish detached JSON-safe frame readback and a bounded journal.
- [ ] Correlate notebook/debug projection, screenshots and interaction receipts with frame ids.

## Required committed-frame fixture rows

```txt
frame-sequence-monotonic
frame-input-frozen
frame-input-cites-story-revision
frame-input-cites-runtime-generation
frame-input-cites-scene-resource-generation
frame-input-cites-surface-revision
frame-input-cites-context-generation
stage-pass-result-required
post-pass-result-required
failed-stage-pass-not-public
failed-post-pass-not-public
visible-frame-ack-required
first-frame-after-start
first-frame-after-inspection
first-frame-after-scene-transition
debug-readback-cites-frame
notebook-and-canvas-revision-parity
stale-frame-rejected
frame-observation-detached-json-safe
frame-journal-bounded
screenshot-cites-frame-and-commit
```

## Browser committed-frame smoke

```txt
open deployed route
capture initial frame receipt and screenshot
inspect one hotspot through the side panel
wait for the first frame citing the inspection result
verify notebook, story state and canvas cite that frame
complete the scene and Continue
verify successor DOM is not claimed visible until successor-frame acknowledgement
capture successor frame receipt and screenshot
force one stale frame result and verify rejection
verify bounded detached frame journal
```

## Implementation order

```txt
1. StoryManifest Authority
2. StorySnapshot startup authority
3. Pointer and hotspot-pick authority
4. Inspection and completion authority
5. Atomic Continue transition
6. Narrative Projection Authority
7. Runtime Session Lifecycle and Scene Resource Retirement Authority
8. Render Surface Resolution Authority
9. WebGL Context Recovery Authority
10. Committed Frame Diagnostics Authority
```

## Next safe ledge

```txt
TheUnmappedHouse Committed Frame Diagnostics Authority
+ Immutable Input Snapshot
+ Stage/Post Pass Results
+ Visible Canvas Acknowledgement
```

## Do not do first

```txt
new story rooms or branches
inventory
audio or voice work
renderer replacement
shader redesign
camera retuning
visual polish
```
