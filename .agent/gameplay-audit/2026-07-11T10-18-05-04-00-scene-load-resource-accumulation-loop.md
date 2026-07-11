# Gameplay audit: Scene-load resource accumulation loop

Timestamp: `2026-07-11T10-18-05-04-00`

## Goal

Keep the three-scene inspection loop behaviorally unchanged while ensuring that scene advancement, reset, and future restart flows cannot retain old callbacks or render resources.

## Current gameplay loop

```txt
inspect three hotspots
  -> grant three clue strings
  -> sceneComplete becomes true
  -> schedule 450 ms interlude
  -> Continue advances scene identity and route
  -> load replacement Three.js scene
  -> repeat
  -> final Continue changes only interlude copy
```

## Lifecycle-coupled gameplay risks

### Repeated completion schedules multiple interlude callbacks

Every first-time inspection that observes `sceneComplete(currentScene)` schedules a timeout. The final required inspection normally schedules one row, but no timeout handle, scene id, completion revision, or session generation is retained. A stale callback can still open copy after a reset, future recovery, or session replacement.

### Continue has no in-flight or duplicate guard

Repeated Continue clicks can invoke `nextScene()` again before any visible-frame acknowledgement. With the current three scenes this can skip rapidly or repeatedly project terminal copy. There is no typed `accepted`, `duplicate`, `busy`, `terminal`, or `rejected` result.

### Gameplay advancement and resource retirement are not correlated

The route and notebook advance before the replacement stage proves successful. Prior stage resources are detached immediately and never retired explicitly. The gameplay journal cannot answer which resource generation represented a specific route entry.

### Reset relies on full page reload

`KeyR` removes storage and calls `location.reload()`. The browser is expected to tear down callbacks and WebGL resources implicitly. There is no pre-reload stop/dispose receipt, so leaks and stale work cannot be tested independently of page destruction.

## Required gameplay lifecycle fields

```txt
sessionId
sessionGeneration
storyRevision
sceneId
storyPhase
completionProofId
interludeLeaseId
transitionId
stageEpoch
firstVisibleFrameId
retirementReceiptId
```

## Required behavior

- Completion creates at most one active interlude lease for a scene revision.
- Continue is admitted only once per completion proof.
- A successful route entry references a committed stage epoch.
- A failed stage preparation does not advance gameplay state.
- Reset first retires the active session and then creates a new generation.
- Old-generation timeouts, pointer events, clicks, and frame callbacks are ignored.
- Final Continue enters a durable terminal phase and returns typed no-op results on repeats.

## Fixture rows

```txt
one-interlude-lease-per-completion-proof
stale-interlude-callback-rejected-after-reset
duplicate-continue-rejected
failed-stage-preparation-does-not-advance-route
successful-route-entry-correlates-to-stage-epoch
scene-two-first-frame-correlates-to-transition
old-scene-resources-retired-after-visible-successor
reset-disposes-old-session-before-new-generation
old-generation-input-does-not-mutate-new-session
terminal-continue-is-idempotent
```