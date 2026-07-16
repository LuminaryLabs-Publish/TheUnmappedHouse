# Known gaps: The Unmapped House scene-entry narrative projection

**Timestamp:** `2026-07-16T16-58-39-04-00`  
**Status:** `audited`

## Summary

Scene entry has no explicit narrative generation, copy policy, projection result, stale-copy rejection or first matching frame acknowledgement. The current DOM-content heuristic can preserve predecessor hotspot copy after the successor scene is otherwise accepted.

## Plan ledger

**Goal:** make the story paragraph's semantic scene identity explicit and verifiable.

- [x] Trace predecessor inspection copy into successor entry.
- [x] Confirm title, stage, hotspot list and save can advance independently of opening copy.
- [x] Define missing identities, policy, results and proof.
- [ ] Implement and execute them.

## Identity and revision gaps

```txt
SceneEntryGeneration: absent
SceneEntryCommandId: absent
EntryReason: implicit
NarrativeSourceId: absent
StoryTextProjectionRevision: absent
SceneEntryProjectionRevision: absent
FirstSceneEntryFrameAck: absent
```

## Policy gaps

```txt
boot opening-copy policy: implicit
transition opening-copy policy: implicit and defective
resume/reload copy policy: implicit
same-scene inspection-copy preservation policy: implicit
cross-scene predecessor-copy rejection: absent
terminal copy policy result: absent
```

## Projection gaps

```txt
SceneEntryNarrativeResult: absent
SceneEntryProjectionResult: absent
title/text/stage/hotspot scene binding: absent
stale narrative revision rejection: absent
previous-scene copy retirement receipt: absent
matching story-panel/stage frame result: absent
```

## Current deterministic mismatch

```txt
scene N final hotspot text: visible
scene N+1 identity: accepted
scene N+1 stage: loaded
scene N+1 title: projected
scene N+1 hotspots: projected
scene N+1 openingText: skipped
scene N hotspot text: remains visible
```

## Proof gaps

```txt
scene 1 -> scene 2 uninterrupted fixture: absent
scene 2 -> scene 3 uninterrupted fixture: absent
same-scene refresh fixture: absent
reload/resume policy fixture: absent
stale predecessor narrative fixture: absent
FirstSceneEntryFrameAck fixture: absent
source/artifact/Pages parity: absent
```

## Retained independent gaps

```txt
hotspot availability and discovery projection
story content graph validation
browser startup readiness and retry
story save writer lease and revision
story audio event projection
inspection control focus continuity
motion preference visual-effect admission
story announcement semantic projection
interlude focus and route admission
page lifecycle suspension and resume
terminal completion settlement
WebGL context recovery
story-save schema and manifest admission
viewport authority
scene-transition composition and atomicity
renderer-provider admission
raw hotspot input picking
same-document save commit/reset convergence
interlude progression timing
stage resource lifecycle
```

## Completion boundary

Do not claim scene-entry narrative correctness until boot, uninterrupted transition, reload and resume policies are explicit; predecessor copy is rejected after route advancement; title, opening text, stage and hotspots share one accepted generation; and source, artifact and Pages fixtures pass.