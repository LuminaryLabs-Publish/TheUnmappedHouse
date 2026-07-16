# Interaction audit: scene-entry command and result map

**Timestamp:** `2026-07-16T16-58-39-04-00`

## Summary

Continue currently invokes a sequence of direct mutations. No command identity or result states which narrative copy belongs to the accepted successor scene.

## Plan ledger

**Goal:** define one typed entry transaction from Continue through the first matching story-panel frame.

- [x] Map current callbacks and mutations.
- [x] Define command identity and expected revisions.
- [x] Define narrative and projection results.
- [x] Define rejection and acknowledgement states.
- [ ] Implement the command path.

## Current map

```txt
continue button click
  -> nextScene()
  -> direct story mutation
  -> direct modal mutation
  -> direct stage mutation
  -> direct UI mutation
  -> direct save write
```

## Required map

```txt
Continue intent
  -> SceneEntryCommand
  -> route admission
  -> scene-entry copy policy
  -> SceneEntryNarrativeResult
  -> stage and UI projection
  -> SceneEntryProjectionResult
  -> save settlement
  -> FirstSceneEntryFrameAck
```

## Result statuses

```txt
SceneEntryAccepted
SceneEntryRejectedNoSuccessor
SceneEntryRejectedIncomplete
SceneEntryRejectedStaleRoute
SceneEntryRejectedStaleStory
SceneEntryNarrativePrepared
SceneEntryNarrativeRejectedMissingCopy
SceneEntryProjected
SceneEntryProjectionRejectedMismatch
SceneEntryProjectionRejectedStale
FirstSceneEntryFrameAcknowledged
SceneEntryArtifactParityConfirmed
```

## Input provenance

The result should retain whether entry was caused by boot, Continue, reload, BFCache resume or explicit re-entry. Copy selection must be policy-driven rather than inferred from the current DOM paragraph contents.