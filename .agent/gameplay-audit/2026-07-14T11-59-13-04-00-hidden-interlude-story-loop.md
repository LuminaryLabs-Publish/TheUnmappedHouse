# Gameplay audit: hidden-page interlude and story loop

**Timestamp:** `2026-07-14T11-59-13-04-00`

## Summary

Story truth is saved immediately after a hotspot completes a scene, while interlude presentation is delayed by 450 ms. Browser suspension can split those participants without an explicit policy.

## Plan ledger

**Goal:** preserve deterministic story progression while classifying whether pending interludes pause, settle or reconstruct across browser lifecycle transitions.

- [x] Trace hotspot settlement, ordinary save and delayed interlude scheduling.
- [x] Trace hidden and restored-page behavior.
- [x] Identify timer, scene and interaction correlation gaps.
- [ ] Add lifecycle-aware timer and story checkpoint fixtures.

## Current loop

```txt
required hotspot accepted
  -> inspected state mutates
  -> clue state mutates
  -> Notebook mutates
  -> sceneComplete becomes true
  -> raw 450 ms timeout is scheduled
  -> DOM and save are updated immediately

page becomes hidden or frozen
  -> timer has no identity or lifecycle policy
  -> accepted story state remains complete
  -> interlude may fire late, fire while hidden or await restored execution

page becomes visible
  -> no result states whether interlude was paused, fired or reconstructed
  -> no first matching story-and-stage frame is acknowledged
```

## Gameplay invariants

```txt
lifecycle events must not grant clues
lifecycle events must not inspect hotspots
lifecycle events must not advance scenes
one completed scene must produce at most one pending interlude identity
restoration must project the interlude from accepted story evidence
stale timers must not open an interlude for a superseded scene
interaction resumes only after the accepted stage frame
```

## Required results

```txt
InterludeTimerCheckpointed
InterludeTimerPaused
InterludeTimerCarried
InterludeProjectionReconstructed
StaleInterludeDiscarded
StoryCheckpointPreserved
InteractionResumeAccepted
```

## Proof gap

There is no model or browser test covering suspension before the 450 ms delay, suspension after completion but before save readback, restoration into a completed scene, stale timer delivery after scene advancement or repeated lifecycle transitions.