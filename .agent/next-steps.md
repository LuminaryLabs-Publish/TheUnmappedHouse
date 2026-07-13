# Next steps: The Unmapped House scene-transition composition

**Timestamp:** `2026-07-13T09-03-20-04-00`  
**Status:** `audited`

## Summary

Build a detached preparation path before changing live story or stage ownership. The first implementation slice should validate the successor descriptor, prepare a successor stage generation off the live stage, prepare the story/UI/save candidates, then atomically adopt or reject the complete set.

## Plan ledger

**Goal:** eliminate cross-participant partial scene transitions without changing authored story semantics.

- [ ] Add `TransitionId`, `StoryRevision` and `StageGeneration`.
- [ ] Add `SceneTransitionCommand` with expected predecessor revisions.
- [ ] Validate completion phase and authored successor before mutation.
- [ ] Validate scene descriptors before allocating live resources.
- [ ] Build detached story, stage, interlude, UI and save candidates.
- [ ] Collect explicit participant preparation receipts.
- [ ] Commit all participants together or retain all predecessors.
- [ ] Add rollback for adoption-time failures.
- [ ] Release predecessor stage resources only after accepted adoption.
- [ ] Reject stale and duplicate commands with zero mutation.
- [ ] Publish terminal `SceneTransitionResult` statuses.
- [ ] Correlate the first visible successor frame with the accepted result.
- [ ] Add source, browser, built-output and Pages fixture matrices.

## Ordered implementation

### 1. Define identities

```txt
TransitionId
TransitionGeneration
StoryRevision
StageGeneration
UiRevision
SaveRevision
FrameSequence
```

### 2. Validate route and descriptor

The command must identify the expected predecessor scene and successor. Reject missing completion evidence, invalid authored order, absent descriptors and terminal-route misuse before any participant changes.

### 3. Prepare detached participants

```txt
StoryTransitionCandidate
StageTransitionCandidate
InterludeTransitionCandidate
UiTransitionCandidate
SaveTransitionCandidate
```

Stage preparation must not clear or mutate the live predecessor stage.

### 4. Commit or reject

Only a fully prepared participant set may adopt. A failed participant must preserve the complete predecessor set and return one terminal result.

### 5. Retire safely

Dispose predecessor geometry, materials, hotspot volumes and render resources only after the successor stage generation is adopted and visible eligibility is established.

### 6. Prove the visible frame

`FirstSceneFrameAck` must carry transition ID, scene ID, story revision, stage generation, UI revision and frame sequence.

### 7. Execute fixtures

```txt
normal scene one to scene two
normal scene two to scene three
terminal completion
invalid successor
incomplete-scene Continue
malformed camera descriptor
geometry allocation failure
shader/material failure
DOM projection failure
localStorage rejection
stale predecessor revision
duplicate Continue
rollback after partial adoption
first visible successor frame
fresh built-output navigation
GitHub Pages navigation
```

## Do not combine yet

Keep renderer-provider admission, hotspot picking, input focus, persistence convergence, interlude timing and stage-resource lifetime as bounded authorities. Scene-transition composition coordinates their accepted results; it does not absorb their internal rules.