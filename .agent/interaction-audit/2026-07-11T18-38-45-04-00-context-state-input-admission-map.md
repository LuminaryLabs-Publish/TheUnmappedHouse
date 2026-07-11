# Interaction Audit: Context State and Input Admission Map

**Timestamp:** `2026-07-11T18-38-45-04-00`

## Summary

The current input adapters dispatch directly to mutable story and stage owners. None of the button, keyboard, pointer, hover, click, timeout, Continue, or resize paths consult a context state or frame/context generation.

## Plan ledger

**Goal:** route every render-dependent interaction through context-aware admission and preserve explicit policy for non-render-dependent controls during loss and restoration.

- [x] Inventory all input and callback ingress.
- [x] Classify render-dependent and render-independent commands.
- [x] Define required context/frame fields.
- [x] Define admission outcomes by context state.
- [ ] Implement and run parity fixtures.

## Current ingress map

| Ingress | Current path | Context/frame evidence |
|---|---|---|
| Side-panel hotspot button | Closure captures full hotspot descriptor and calls `inspectHotspot()` | None |
| Canvas mousemove | Updates pointer, hover, label, and camera-parallax state | None |
| Canvas click | Calls `clickHotspot()` using current stored pointer | None |
| Continue button | Calls `nextScene()` directly | None |
| `KeyR` | Clears storage and reloads the page | None |
| Completion timeout | Calls `showInterlude()` after 450 ms | None |
| Window resize | Mutates renderer and target dimensions synchronously | None |
| RAF | Mutates camera/materials and submits both render passes | None |

## Required command envelope

```txt
InteractionCommand
  commandId
  type
  sessionId
  sessionGeneration
  observedStoryRevision
  observedStageEpoch
  observedSurfaceRevision
  observedContextGeneration
  observedFrameId?
  canonicalTargetId?
  source
  sequence
```

## Admission matrix

| Context state | Raycast hover/click | Side-panel inspect | Continue | Reset | Resize | RAF ready-frame commit |
|---|---|---|---|---|---|---|
| `READY` | Admit with current frame/context proof | Admit under story authority | Admit under transition authority | Admit | Admit under surface authority | Admit |
| `LOST` | Reject | Suspend by default | Reject | Admit explicit reset policy | Observe only; do not commit resources | Reject |
| `RESTORING` | Reject | Suspend by default | Reject | Admit explicit reset policy | Queue latest observation | Reject |
| `FAILED` | Reject | Reject | Reject | Admit retry/reset/dispose only | Reject | Reject |
| `DISPOSED` | Reject | Reject | Reject | Reject | Reject | Reject |

## Required results

```txt
InteractionAdmissionResult
  status: admitted | duplicate | stale | suspended | rejected | disposed
  commandId
  contextState
  contextGeneration
  frameId?
  reason
  retryable
  deferredCommandId?
```

## Stale-observation cases

```txt
pointer moved before loss, click arrives during loss
pointer/frame from predecessor generation after restore
side-panel closure references predecessor scene after transition/recovery
resize result belongs to predecessor context generation
completion timeout fires during restore
Continue command predates recovered frame acknowledgement
late browser event arrives after disposal
```

## Required fixtures

```txt
all-input-ingress-uses-context-admission
raycast-command-requires-frame-and-context-generation
side-panel-and-raycast-policy-explicit-during-loss
stale-pre-loss-pointer-rejected-after-restore
continue-rejected-until-recovered-frame
latest-resize-observation-survives-recovery
completion-timeout-fenced-by-session-and-context
late-events-after-dispose-rejected
admission-observation-detached-json-safe
```
