# Render audit: terminal outcome visible-frame gap

**Timestamp:** `2026-07-14T06-00-41-04-00`

## Summary

The terminal state is not part of the rendered story model. `nextScene()` changes only interlude DOM text when no successor exists, and no outcome revision is correlated with the interlude, stage, viewport or saved state.

## Plan ledger

**Goal:** make the first terminal presentation an acknowledged projection of durable outcome truth rather than an untracked DOM mutation.

- [x] Trace terminal DOM mutation.
- [x] Compare it with story state and persistence.
- [x] Identify missing visible-frame evidence.
- [ ] Add revision-bearing terminal projection and browser proof.

## Current path

```txt
Continue click
  -> nextScene()
  -> next is undefined
  -> set interludeTitle.textContent
  -> set interludeText.textContent
  -> return
```

The stage remains on the final scene. The interlude stays open only because it was already open. No terminal projection state is published and no durable write follows the copy change.

## Missing evidence

```txt
TerminalOutcomeRevision: absent
TerminalProjectionRevision: absent
SaveGeneration: absent
InterludeProjectionReceipt: absent
TerminalControlManifestRevision: absent
FirstTerminalOutcomeFrameAck: absent
ReloadedTerminalFrameAck: absent
```

## Required frame envelope

```txt
FirstTerminalOutcomeFrameAck {
  outcomeId
  outcomeRevision
  storyStateRevision
  finalSceneId
  saveGeneration
  interludeProjectionRevision
  viewportRevision
  frameSequence
  visibleAt
}
```

## Required behavior

- Build terminal copy and controls from accepted terminal outcome state.
- Keep terminal presentation reproducible after reload.
- Replace or disable generic Continue.
- Preserve the final stage as an intentional background, not an accidental leftover.
- Acknowledge one visible terminal frame before reporting presentation complete.

## Validation gap

No browser fixture checks terminal projection before or after reload. Syntax checking cannot prove visible outcome convergence.