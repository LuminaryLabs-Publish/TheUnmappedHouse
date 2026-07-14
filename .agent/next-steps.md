# Next steps: The Unmapped House page lifecycle suspension and resume

**Timestamp:** `2026-07-14T11-59-13-04-00`  
**Status:** `audited`

## Summary

The smallest safe implementation is to place RAF, lifecycle listeners, visual time and pending interlude timers behind one controller. Do not change story progression first.

## Plan ledger

**Goal:** add deterministic suspension and restoration through targeted ownership changes rather than a broad renderer or story rewrite.

- [ ] Add `DocumentGeneration` and `LifecycleAttemptId`.
- [ ] Normalize `visibilitychange`, `pagehide`, `pageshow`, `freeze` and `resume` into `PageLifecycleEvent`.
- [ ] Retain the active RAF request ID and issue one `RenderLeaseId`.
- [ ] Add idempotent `suspend()` and `resume()` methods to the stage host.
- [ ] Choose and implement `PauseVisualTime` as the default clock policy.
- [ ] Give every pending completion interlude one timer identity and remaining-delay checkpoint.
- [ ] Suspend stage-dependent canvas and DOM inspection admission.
- [ ] Checkpoint accepted story truth without granting clues or advancing scenes.
- [ ] Revalidate renderer, context, target, scene and viewport on restore.
- [ ] Prevent duplicate listener installation and duplicate RAF loops.
- [ ] Rebuild only invalid rendering participants.
- [ ] Publish `PageLifecycleResult` and participant receipts.
- [ ] Render one guarded resumed frame.
- [ ] Publish `FirstResumedStageFrameAck` before interaction resumes.
- [ ] Add source, browser, production-artifact and Pages fixtures.

## Ordered implementation

### 1. Own the frame loop

Change `animate()` into a start/stop loop with a retained request ID and generation token. Stale callbacks must exit without scheduling another frame.

### 2. Normalize browser lifecycle

Install one listener group that turns platform events into typed lifecycle inputs. Track `pagehide/pageshow` persistence and event ordering.

### 3. Make time explicit

Pause visual elapsed time while suspended. Resume from the same shader-time position unless a later authored policy selects wall-time carry.

### 4. Checkpoint pending interludes

Replace anonymous completion timeouts with identified timers. Store scene ID, story revision, due time and remaining delay. Ignore callbacks from superseded scene or document generations.

### 5. Revalidate before reuse

On restoration, verify the WebGL context, renderer, render target, current scene graph, viewport and listener ownership. Rebuild only failed participants.

### 6. Admit interaction after proof

Keep stage-dependent interactions disabled until one frame cites the accepted document, stage, context, scene, story, viewport, clock and render-lease revisions.

## Required fixtures

```txt
hide before first frame
hide during normal play
hide before and after interlude scheduling
freeze/resume
pagehide persisted false
BFCache pagehide/pageshow persisted true
repeated hide/show cycles
context survives restore
context fails restore
viewport changes while hidden
stale timer after scene change
duplicate lifecycle events
superseded restore attempt
first-frame timeout
source, production artifact and Pages origins
```

## Do not combine yet

Keep terminal outcome settlement, WebGL context recovery, save admission, scene transition, viewport, provider admission, hotspot picking and stage resource lifecycle as retained authorities. Lifecycle coordination consumes their identities and receipts.