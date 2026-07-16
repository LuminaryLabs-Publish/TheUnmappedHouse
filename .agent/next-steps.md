# Next steps: The Unmapped House story content graph validation

**Timestamp:** `2026-07-16T04-02-40-04-00`  
**Status:** `audited`

## Summary

The smallest safe implementation is one pure validator that can run in Node and the browser, followed by a bootstrap admission gate that only exposes the validated story graph to the runtime and StageKit.

## Plan ledger

**Goal:** add deterministic content admission without changing the current three scenes or player-facing story loop.

- [ ] Add a versioned story manifest containing `schemaVersion` and `contentRevision`.
- [ ] Define stable scene, hotspot, clue, route, and validation-result identities.
- [ ] Require unique scene IDs across the story.
- [ ] Require unique hotspot IDs within each scene.
- [ ] Build a clue-grant index from all reachable hotspots.
- [ ] Reject unknown, duplicate, or ungrantable completion references.
- [ ] Prove every scene can complete before its authored transition.
- [ ] Validate route order, initial scene, and exactly one terminal boundary.
- [ ] Validate camera vectors, FOV, fog, stage layers, props, hotspots, materials, and post descriptors.
- [ ] Reject missing arrays, invalid tuple lengths, unsupported prop kinds, empty color lists, and non-finite numbers.
- [ ] Publish a typed `StoryContentValidationResult`.
- [ ] Gate `browser-story-runtime-kit` and `scene-descriptor-consumer-kit` on accepted content.
- [ ] Project a semantic invalid-content fallback without constructing StageKit.
- [ ] Publish `FirstValidatedStoryFrameAck`.
- [ ] Add source, built-artifact, and Pages fixtures for valid and invalid manifests.

## Ordered implementation

### 1. Pure schema and identity validator

Create a dependency-free module that accepts a story manifest and returns immutable issues plus normalized indexes. Do not mutate the authored objects while validating.

### 2. Reference and reachability analysis

Walk scenes in authored order. Track clues grantable before each transition and prove every `requiresToComplete` item is reachable. Report exact scene, hotspot, and clue paths for every failure.

### 3. Descriptor validation

Validate arrays, tuple lengths, finite values, supported geometry kinds, material color cardinality, camera ranges, hotspot bounds, and post-process ranges before Three.js receives a descriptor.

### 4. Runtime admission

Validate before restore adoption and StageKit construction. Expose only the accepted manifest and indexes. Reject stale results whose content revision no longer matches.

### 5. Failure projection

Keep the HTML shell usable when content is invalid. Show a semantic error result and disable inspection/Continue instead of partially constructing a scene.

### 6. Proof

Add deterministic fixtures for duplicate IDs, unknown clues, impossible completion, invalid route order, malformed camera/stage descriptors, non-finite values, stale content results, and valid source/artifact/Pages parity.

## Do not combine yet

Keep browser startup, save concurrency, audio, focus, motion preference, announcements, page lifecycle, terminal settlement, WebGL recovery, save schema, viewport, scene transitions, provider admission, hotspot picking, and resource lifecycle as independent retained authorities.
