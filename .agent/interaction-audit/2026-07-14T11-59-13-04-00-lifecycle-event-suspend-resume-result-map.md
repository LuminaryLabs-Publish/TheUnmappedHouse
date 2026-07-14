# Interaction audit: lifecycle event, suspend and resume result map

**Timestamp:** `2026-07-14T11-59-13-04-00`

## Summary

The browser currently delivers lifecycle changes outside the application command/result model. Resize, pointer, click, RAF and interlude callbacks remain independently owned.

## Plan ledger

**Goal:** make every lifecycle transition produce one typed result and one coherent interaction admission state.

- [x] Identify lifecycle event sources and active callbacks.
- [x] Map missing commands, receipts and stale-work rules.
- [x] Define the interaction suspension boundary.
- [ ] Implement and test event admission.

## Event map

| Platform signal | Current behavior | Required result |
|---|---|---|
| `visibilitychange: hidden` | No application handling. | `SuspendAccepted` or `SuspendDuplicate`. |
| `pagehide` | No checkpoint or lease retirement. | `PageHideAccepted` with persisted classification. |
| `freeze` | No timer or clock checkpoint. | `FreezeAccepted`. |
| `pageshow` | No resource revalidation. | `RestoreValidationResult`. |
| `visibilitychange: visible` | Existing callbacks continue implicitly. | `ResumeAccepted` or `ResumeRejected`. |
| `resume` | No attempt identity or supersession. | `ResumeAttemptResult`. |
| restored pointer/click | Immediately active if listeners survived. | Admitted only after `FirstResumedStageFrameAck`. |

## Command/result flow

```txt
PageLifecycleEvent
  -> LifecycleAdmissionCommand
  -> validate DocumentGeneration and event sequence
  -> prepare suspension or restoration plan
  -> collect render, clock, timer, interaction, viewport and resource receipts
  -> reject stale, duplicate or superseded work
  -> publish PageLifecycleResult
  -> update LifecycleInteractionCapability
```

## Interaction states

```txt
Active
Suspending
Suspended
Restoring
AwaitingFirstFrame
ActiveResumed
DegradedFallback
Failed
```

## Admission rule

Canvas picking and DOM inspection controls must not settle stage-dependent commands while lifecycle state is `Suspending`, `Suspended`, `Restoring` or `AwaitingFirstFrame`. Safe reset or reload controls may remain available through a DOM-owned fallback.

## Diagnostics

Readback should expose document generation, lifecycle state, render lease, clock policy, pending timer identities, current scene, accepted story revision, context status, viewport revision and last resumed-frame acknowledgement.