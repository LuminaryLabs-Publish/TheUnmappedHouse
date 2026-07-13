# Known gaps: The Unmapped House scene-transition composition

**Timestamp:** `2026-07-13T09-03-20-04-00`  
**Status:** `audited`

## Summary

Scene advancement currently has no shared identity, preparation barrier, atomic commit, rollback result or visible-frame receipt. The story aggregate can advance before the stage, UI and save participants are known to be valid.

## Plan ledger

**Goal:** make every cross-participant divergence explicit and testable.

- [x] Trace the scene transition order.
- [x] Identify participant mutation boundaries.
- [x] Identify failure windows and missing proof.
- [x] Define the authority and result contract.
- [ ] Implement and execute it.

## Identity gaps

```txt
TransitionId: absent
TransitionGeneration: absent
StoryRevision: absent
StageGeneration: absent
UiRevision: absent
SaveRevision: absent
expected predecessor revisions: absent
```

## Preparation gaps

```txt
authored successor validation result: absent
scene descriptor validation result: absent
detached story candidate: absent
detached stage candidate: absent
interlude candidate: absent
UI candidate: absent
save candidate: absent
participant preparation receipts: absent
```

## Commit and recovery gaps

```txt
atomic participant adoption: absent
zero-mutation rejection: absent
rollback result: absent
stale transition rejection: absent
duplicate Continue rejection: absent
predecessor resource retirement receipt: absent
terminal SceneTransitionResult: absent
```

## Reachable divergence windows

```txt
stage construction failure
  -> story and route already advanced
  -> interlude already closed
  -> predecessor stage already cleared or partially replaced
  -> UI and save may still cite predecessor

DOM projection failure
  -> story and stage can cite successor
  -> visible controls can cite predecessor
  -> save can remain predecessor

localStorage rejection
  -> story, stage and UI can cite successor
  -> durable save remains predecessor
  -> reload returns to older scene
```

## Presentation gaps

```txt
scene transition provenance in frame: absent
story/stage/UI coherent frame envelope: absent
first successor frame acknowledgement: absent
last complete scene-frame recovery: absent
visible diagnostics parity: absent
```

## Validation gaps

```txt
scene transition unit fixtures: absent
stage preparation failure fixture: absent
DOM projection failure fixture: absent
storage rejection fixture: absent
stale and duplicate command fixtures: absent
rollback fixture: absent
browser visible-frame fixture: absent
built-output smoke: absent
Pages transition smoke: absent
```

## Retained independent gaps

```txt
renderer-provider admission
hotspot input and raycast picking
browser save commit and reset convergence
interlude progression and modal focus
stage resource lifecycle and runtime stop
Notebook channel classification
committed-frame diagnostics
```

## Completion boundary

Do not claim scene-transition reliability because the three authored scenes advance in a normal browser run. Completion requires detached participant preparation, explicit receipts, atomic adoption or rollback, stale and duplicate rejection, safe predecessor retirement, durable save parity and a first visible frame tied to the accepted transition.