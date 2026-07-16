# Narrative projection audit: opening-copy scene-revision contract

**Timestamp:** `2026-07-16T16-58-39-04-00`

## Summary

The story paragraph is treated as mutable DOM state and as an implicit policy input. `renderUi()` decides whether to apply opening copy by inspecting the paragraph's current string rather than the accepted scene-entry reason and scene revision.

## Plan ledger

**Goal:** replace DOM-content inference with an explicit scene-entry copy policy and revision-bound result.

- [x] Identify current implicit policy.
- [x] Define entry reasons and copy sources.
- [x] Define revision and stale-copy rules.
- [x] Define first-frame convergence.
- [ ] Implement and test the contract.

## Current implicit policy

```txt
if scene-text is empty or Loading
  -> assign currentScene.openingText
else
  -> preserve current scene-text across any renderUi call
```

This policy cannot distinguish same-scene inspection updates from cross-scene entry.

## Required explicit policy

```txt
boot
  -> openingText for accepted scene

transition
  -> openingText for accepted successor

resume
  -> configured resume copy or accepted current-scene narrative snapshot

same-scene UI refresh
  -> preserve current-scene inspection copy

scene revision mismatch
  -> reject predecessor copy
```

## Required identities

```txt
SceneEntryGeneration
SceneId
EntryReason
NarrativeSourceId
NarrativeSourceKind
StoryTextProjectionRevision
ExpectedUiRevision
ExpectedStageGeneration
```

## Contract

`SceneEntryNarrativeResult` must be computed from story data and entry reason, not from existing DOM contents. A projection adapter may mutate `scene-text` only with a result matching the active scene-entry generation. The first scene-entry frame must acknowledge the exact narrative source used.