# Page lifecycle audit: document, RAF, clock and timer contract

**Timestamp:** `2026-07-14T11-59-13-04-00`

## Summary

This contract defines the minimal future authority for suspending and restoring `TheUnmappedHouse` without introducing new story effects, duplicate frame loops or unverified stage reuse.

## Plan ledger

**Goal:** create one deterministic lifecycle transaction covering render submission, time, timers, interaction, resources and the first resumed frame.

- [x] Define identities and participant receipts.
- [x] Define suspend and restore phases.
- [x] Define duplicate, stale and failure behavior.
- [x] Define visible proof.
- [ ] Implement the contract.

## Identities

```txt
DocumentGeneration
LifecycleAttemptId
LifecycleEventSequence
StageGeneration
RenderLeaseId
ClockRevision
InterludeTimerId
StoryStateRevision
SceneRevision
WebGLContextGeneration
ViewportRevision
FirstResumedFrameId
```

## Suspend phase

```txt
1. Admit the lifecycle event.
2. Reject duplicate or stale events.
3. Retire the active render-submission lease.
4. Disable stage-dependent interaction.
5. Capture clock policy and elapsed visual time.
6. Capture pending interlude timer identity and remaining delay.
7. Checkpoint accepted story state without applying gameplay effects.
8. Publish SuspendResult with participant receipts.
```

## Restore phase

```txt
1. Create one LifecycleAttemptId.
2. Verify current document and story generations.
3. Classify BFCache persistence and event ordering.
4. Revalidate renderer, context, target, scene and viewport.
5. Reinstall only missing listeners.
6. Reconstruct or carry pending interlude presentation.
7. Rebase visual time according to the accepted policy.
8. Prepare one render-submission lease.
9. Render an offscreen or guarded probe frame.
10. Atomically adopt the restored participant set.
11. Publish ResumeResult.
12. Publish FirstResumedStageFrameAck.
13. Re-enable admitted interaction.
```

## Failure and supersession

```txt
stale event -> StaleRejected
same event already settled -> DuplicateAccepted
newer restore attempt wins -> Superseded
resource probe fails -> DegradedFallback
candidate replacement fails -> RollbackPreserved
first frame times out -> ResumeFailed
```

## Clock policy

The application must explicitly choose one of:

```txt
PauseVisualTime
CarryWallTime
RebaseToResume
```

The current game is presentation-driven and should default to `PauseVisualTime`, preventing a hidden interval from advancing shader memory, scan lines and procedural animation.

## Timer policy

A pending scene-completion interlude must be identified and either paused with remaining delay or reconstructed from accepted scene-completion evidence. Raw callbacks from a superseded scene or document generation must be ignored.

## Completion boundary

Lifecycle recovery is complete only after one accepted visible frame cites the restored scene, story, viewport, renderer, context, clock and lease revisions.