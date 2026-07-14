# Known gaps: The Unmapped House page lifecycle suspension and resume

**Timestamp:** `2026-07-14T11-59-13-04-00`  
**Status:** `audited`

## Summary

The runtime has no explicit ownership or proof for browser suspension and restoration. Frame submission, elapsed visual time, pending interlude timers, interaction and rendering resources can cross lifecycle boundaries without typed results.

## Plan ledger

**Goal:** make every lifecycle identity, participant, result and resumed-frame dependency explicit and testable.

- [x] Trace rendering and story behavior across suspension.
- [x] Confirm lifecycle listeners and results are absent.
- [x] Confirm RAF, clock and raw timers lack lifecycle ownership.
- [x] Define the missing authority and proof.
- [ ] Implement and execute it.

## Identity gaps

```txt
DocumentGeneration: absent
LifecycleAttemptId: absent
LifecycleEventSequence: absent
StageGeneration: absent
RenderLeaseId: absent
ClockRevision: absent
InterludeTimerId: absent
WebGLContextGeneration: absent
ViewportRevision on restore: absent
FirstResumedFrameId: absent
```

## Suspension gaps

```txt
visibilitychange admission: absent
pagehide admission: absent
freeze admission: absent
RAF request retention and cancellation: absent
render lease retirement: absent
visual clock policy: absent
pending timer checkpoint: absent
interaction suspension state: absent
story checkpoint receipt: absent
```

## Restoration gaps

```txt
pageshow persisted classification: absent
resume attempt identity: absent
renderer and context probe: absent
render-target probe: absent
scene and material validation: absent
viewport revalidation result: absent
listener ownership check: absent
duplicate RAF prevention: absent
stale timer rejection: absent
atomic restored-participant adoption: absent
resume rollback result: absent
```

## Current split-brain path

```txt
scene becomes complete
  -> story state mutates
  -> localStorage write occurs
  -> raw interlude timeout is scheduled
  -> page hides or freezes
  -> browser decides callback and RAF behavior
  -> page restores
  -> existing stage and listeners continue implicitly
  -> interlude timing and shader time may have moved independently
  -> no result correlates story, presentation and first visible frame
```

## Interaction gaps

```txt
canvas picking lifecycle gate: absent
DOM inspection lifecycle gate: absent
safe fallback controls: absent
resume focus policy: absent
resume interaction admission result: absent
```

## Visible proof gaps

```txt
suspension receipt: absent
clock checkpoint receipt: absent
timer checkpoint receipt: absent
resource revalidation receipt: absent
restored viewport receipt: absent
first resumed source-frame acknowledgement: absent
first resumed post-process-frame acknowledgement: absent
fallback retirement acknowledgement: absent
```

## Validation gaps

```txt
hidden-page browser fixture: absent
freeze/resume fixture: absent
BFCache fixture: absent
duplicate RAF fixture: absent
clock rebase fixture: absent
pending timer fixture: absent
context-survival and context-loss restore fixtures: absent
production-artifact fixture: absent
Pages-origin fixture: absent
```

## Retained independent gaps

```txt
terminal completion settlement and resume
WebGL context recovery
story-save schema and manifest admission
viewport authority
scene-transition composition
renderer-provider admission
hotspot input and picking
save commit/reset convergence
ordinary interlude progression and focus
stage resource lifecycle
```

## Completion boundary

Do not claim lifecycle safety because the page appears to resume. Completion requires one accepted document and stage generation, explicit render and clock ownership, identified timer handling, validated resources and viewport, duplicate-loop prevention, admitted interaction and a first resumed frame tied to all accepted revisions.