# Next steps: The Unmapped House hotspot availability and discovery projection

**Timestamp:** `2026-07-16T09-58-49-04-00`  
**Status:** `audited`

## Summary

The smallest safe implementation is a pure availability resolver that consumes accepted scene content and current story/modal state, then emits one immutable hotspot set for both DOM and canvas projections.

## Plan ledger

**Goal:** add hotspot availability without changing current story outcomes or forcing occlusion rules before content needs them.

- [ ] Define `HotspotAvailabilityPolicyVersion` and `HotspotAvailabilityRevision`.
- [ ] Build a scene-local hotspot identity index from accepted story content.
- [ ] Add optional authored visibility, clue-gate and interaction-mode descriptors.
- [ ] Represent discovered, visible, occluded, enabled, inspected and modal-suspended state explicitly.
- [ ] Resolve one immutable `HotspotAvailabilityResult` per scene/state revision.
- [ ] Derive the DOM button list from accepted availability entries.
- [ ] Derive the canvas raycast candidate set from the same entries.
- [ ] Decide and document the default occlusion policy; do not infer it accidentally from hotspot-only raycasting.
- [ ] Clear hover identity and hide the hover label on scene, modal and availability-generation changes.
- [ ] Reject stale DOM or canvas interaction evidence.
- [ ] Publish `HotspotProjectionResult`, `HotspotParityResult` and `HotspotInteractionResult`.
- [ ] Publish `FirstAvailableHotspotFrameAck` and `FirstHotspotInteractionAck`.
- [ ] Add source, built-artifact and Pages browser fixtures.

## Ordered implementation

### 1. Pure resolver

Accept an immutable scene index, story snapshot, modal snapshot, policy and optional camera evidence. Return immutable entries plus exact rejection reasons. Do not mutate authored hotspot descriptors.

### 2. Projection adapters

Replace direct iteration of `currentScene.hotspots` in the DOM path and direct use of all hotspot meshes in the canvas path with projections derived from the accepted result.

### 3. Occlusion policy

Support an explicit policy such as `ignore`, `visible-geometry`, or `authored`. The current content can remain `ignore`; future content must not depend on an unstated default.

### 4. Retirement

On scene, interlude, terminal or policy transitions, retire previous candidate sets and hover evidence before presenting the next frame.

### 5. Admission

Require expected scene and availability revisions on every interaction. Only accepted interactions may invoke the existing inspection mutation.

### 6. Proof

Exercise current parity, hidden, clue-gated, occluded, list-only, canvas-only, modal-suspended, stale-hover and stale-revision rows at source, artifact and Pages origins.

## Do not combine yet

Keep story-content validation, raw pointer normalization/picking, inspection outcomes, focus restoration, scene transitions, interlude progression and renderer recovery as independent retained authorities.