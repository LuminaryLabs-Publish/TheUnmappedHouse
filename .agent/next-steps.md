# Next steps: The Unmapped House scene-entry narrative projection

**Timestamp:** `2026-07-16T16-58-39-04-00`  
**Status:** `audited`

## Summary

The smallest safe implementation is to make scene entry select and project narrative copy explicitly. Do not infer entry semantics from the current text inside the DOM paragraph.

## Plan ledger

**Goal:** fix scene-entry copy convergence without changing authored prose, clue outcomes, hotspot behavior or stage composition.

- [ ] Add `SceneEntryGeneration` and `StoryTextProjectionRevision`.
- [ ] Define entry reasons: boot, transition, resume and re-entry.
- [ ] Add a pure `resolveSceneEntryNarrative(scene, reason, priorNarrative)` function.
- [ ] Make ordinary scene transitions select `currentScene.openingText` unconditionally.
- [ ] Preserve inspection copy only for same-scene UI refreshes.
- [ ] Return immutable `SceneEntryNarrativeResult` and `SceneEntryProjectionResult` values.
- [ ] Bind title, opening text, stage and hotspot list to one scene-entry generation.
- [ ] Reject predecessor narrative results after route revision changes.
- [ ] Publish `FirstSceneEntryFrameAck` after one matching frame is visible.
- [ ] Add uninterrupted scene-one-to-two and scene-two-to-three fixtures.
- [ ] Add reload/resume policy fixtures.
- [ ] Add source, artifact and Pages parity proof.

## Ordered implementation

### 1. Pure copy policy

Accept the target scene, entry reason, expected scene revision and optional same-scene narrative snapshot. Return the exact narrative source and copy. Do not inspect DOM contents.

### 2. Scene-entry result

Create the accepted scene-entry generation before mutating the story panel. Include scene ID, title, opening text, entry reason and expected projection revisions.

### 3. Projection binding

Project title, text and hotspot list from the accepted result. Bind the stage generation to the same scene ID before acknowledging readiness.

### 4. Same-scene refresh

Allow inspection and re-read copy to persist across `renderUi()` only while the route and scene-entry generation remain unchanged.

### 5. Stale rejection

Reject any narrative projection carrying the predecessor scene ID or predecessor entry generation after Continue is accepted.

### 6. Proof

Run all three scenes without reload and assert that each successor opening copy is visible before any successor hotspot inspection. Repeat at source, staged artifact and Pages origins.

## Do not combine yet

Keep hotspot availability, raw pointer picking, focus restoration, scene-transition atomicity, interlude progression, save settlement, renderer recovery and stage-resource lifecycle as independent retained authorities.