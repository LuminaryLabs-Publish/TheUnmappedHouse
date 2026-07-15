# Gameplay audit: inspection live-region mutation loop

**Timestamp:** `2026-07-14T22-01-31-04-00`  
**Status:** `audited`

## Plan ledger

**Goal:** keep the clue-inspection loop understandable without announcing unrelated controls and diagnostics.

- [x] Trace first inspection, repeated inspection, completion and route transitions.
- [x] Identify every `renderUi()` call in the loop.
- [x] Define one concise message per accepted story result.
- [ ] Implement and validate the message policy.

## Loop

```txt
boot
  -> load browser state and resolve the current scene
  -> construct the Three.js stage and recursive RAF
  -> render title, narrative text, hotspot buttons and Notebook JSON
  -> expose the complete story panel as aria-live="polite"

inspection
  -> canvas raycast or DOM button calls inspectHotspot
  -> mutate inspected, clues and log
  -> call renderUi
  -> clear and rebuild every hotspot button
  -> replace the complete debug JSON projection
  -> keep all mutations inside the polite live region
  -> save browser state

completion and route
  -> schedule or open the interlude
  -> continue to the next scene
  -> rebuild title, controls and debug projection again
  -> no dedicated semantic announcement result or acknowledgement exists
```

## Required message classes

```txt
SceneArrived
InspectionObserved
InspectionReRead
ClueAcquired
SceneCompleted
InterludeOpened
SceneAdvanced
PrototypeCompleted
ResetCompleted
```

Each message must bind the accepted story revision and be deduplicated independently from visual control rebuilding.
