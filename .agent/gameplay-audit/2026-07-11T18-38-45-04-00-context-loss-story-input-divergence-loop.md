# Gameplay Audit: Context Loss and Story/Input Divergence

**Timestamp:** `2026-07-11T18-38-45-04-00`

## Summary

Story progression is independent from render readiness. During a lost or restoring WebGL context, side-panel buttons, raycast clicks, clue grants, completion timers, Continue, reset, and persistence remain live because no context phase participates in command admission.

## Plan ledger

**Goal:** preserve story state through context loss while preventing render-dependent interaction from committing against an unavailable or stale visual frame.

- [x] Trace both hotspot ingress paths.
- [x] Trace clue grants, completion, interlude scheduling, Continue, reset, and persistence.
- [x] Identify which commands depend on current rendered geometry.
- [x] Define suspension, rejection, deferred-command, and recovery evidence.
- [ ] Implement and run gameplay/context fixtures.

## Current divergence loop

```txt
context becomes unavailable
  -> application publishes no context phase
  -> recursive RAF continues
  -> side-panel inspection remains enabled
  -> canvas click remains enabled
  -> click path can raycast from stale pointer and stale visual assumptions
  -> accepted inspection mutates inspected/clues/log
  -> completion can schedule a 450 ms interlude
  -> Continue can replace the live scene
  -> saveState persists the newer story state
  -> no frame proves that the player saw the accepted state
```

## Command classes

### Render-dependent

```txt
canvas hover
canvas click / raycast inspection
pointer-driven camera parallax
visual hotspot selection
first-frame transition acknowledgement
```

These require a committed frame and active context/resource generation.

### Render-independent but presentation-sensitive

```txt
side-panel inspection
Continue
reset
persistence
interlude timer completion
```

These may be admitted only under an explicit policy. If allowed while rendering is suspended, the result must be journaled and the first recovered frame must prove the resulting story/stage state. The safer initial policy is to suspend all story-mutating commands except reset/dispose until recovery commits.

## Missing gameplay evidence

```txt
context phase in command admission
active frame/context generation on inspection commands
story snapshot checkpoint at loss
command retirement or deferral result
completion timer policy during loss
Continue policy during loss
scene replacement policy during restore
persistence result tied to visible frame
first recovered frame story parity
```

## Required gameplay policy

```txt
READY
  -> admit commands under normal story/inspection/transition authority

LOST or RESTORING
  -> reject render-dependent commands
  -> suspend story-mutating commands by default
  -> retain reset/dispose policy explicitly
  -> keep current StorySnapshot immutable
  -> preserve pending interlude state without firing unobserved transitions

FAILED
  -> show stable recovery/failure projection
  -> admit retry/reset/dispose only

READY after recovery
  -> resume under new context generation
  -> require first recovered frame before new render-dependent commands
```

## Required fixture rows

```txt
raycast-inspection-rejected-while-lost
side-panel-inspection-policy-explicit-while-lost
clues-do-not-change-from-rejected-context-command
completion-timer-does-not-advance-unobserved
continue-does-not-replace-stage-during-restore
reset-remains-idempotent-under-loss
story-snapshot-preserved-through-recovery
recovered-frame-matches-preserved-scene-and-clues
first-post-recovery-inspection-cites-recovered-frame
```
