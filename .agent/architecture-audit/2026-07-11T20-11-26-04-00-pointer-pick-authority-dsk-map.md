# Architecture audit: Pointer observation and hotspot pick authority

Timestamp: `2026-07-11T20-11-26-04-00`

## Summary

The hotspot path currently combines browser event observation, mutable pointer state, camera parallax, raycasting, descriptor dispatch, story mutation, persistence, and UI projection. A canvas activation is not tied to its own coordinates or to the stage, surface, camera, hotspot set, and visible frame shown to the player.

## Plan ledger

**Goal:** separate browser event observation from canonical pick planning and inspection admission so stale or unsupported input cannot mutate story state.

- [x] Map current source ownership.
- [x] Separate observation, normalization, pick planning, activation, inspection, and projection.
- [x] Identify missing identities and results.
- [x] Define a parent domain and atomic kits.
- [ ] Implement and validate the architecture.

## Current architecture

```txt
mousemove event
  -> normalize coordinates
  -> mutate shared pointer and parallax vectors
  -> raycast current hotspot meshes
  -> project hover label

click event
  -> click coordinates are discarded
  -> raycast with the shared pointer
  -> dispatch a full hotspot descriptor
  -> mutate story state

side-panel button
  -> dispatch a full hotspot descriptor
  -> mutate story state
```

## Current ownership gaps

| Concern | Current owner | Missing authority |
|---|---|---|
| Event observation | `StageKit` listeners | Immutable event envelope and modality. |
| Coordinate normalization | `handlePointer()` | Sample id, surface revision and typed result. |
| Hover state | Mutable fields and DOM | Leave, cancel and lifecycle reset. |
| Canvas activation | Click callback | Event-local coordinates. |
| Pick execution | `pick()` | Immutable plan and revision checks. |
| Hit identity | `mesh.userData.hotspot` | Canonical hotspot id and revision. |
| Story admission | `inspectHotspot()` | Pick proof, stale rejection and typed result. |
| Side-panel parity | Button closures | Shared activation command and result. |
| Diagnostics | None | Observation and bounded journal. |

## Required parent domain

```txt
the-unmapped-house-pointer-pick-authority-domain
```

## Candidate kits

```txt
pointer-event-adapter-kit
pointer-sample-id-kit
pointer-modality-kit
pointer-coordinate-observation-kit
pointer-coordinate-normalization-kit
pointer-surface-revision-kit
pointer-stage-epoch-kit
pointer-camera-revision-kit
hotspot-set-revision-kit
hotspot-pick-plan-kit
hotspot-pick-result-kit
stale-pointer-observation-rejection-kit
stale-hotspot-pick-rejection-kit
hover-state-kit
pointer-leave-cancel-kit
canvas-activation-command-kit
side-panel-activation-command-kit
activation-parity-result-kit
pointer-pick-observation-kit
pointer-pick-journal-kit
pointer-pick-fixture-kit
browser-input-modality-smoke-kit
```

## Required result identities

```txt
PointerSample
  sampleId
  sessionId
  sessionGeneration
  stageEpoch
  surfaceRevision
  cameraRevision
  hotspotSetRevision
  contextGeneration
  visibleFrameId
  modality
  eventType
  clientX
  clientY
  ndcX
  ndcY

HotspotPickResult
  status: hit | miss | rejected | stale | unsupported | failed
  sampleId
  stageEpoch
  surfaceRevision
  cameraRevision
  hotspotSetRevision
  visibleFrameId
  hotspotId?
  rejectionReason?
```

## Required flow

```txt
browser activation
  -> capture its coordinates immediately
  -> bind current session, stage, surface, camera, context, hotspot and frame identities
  -> normalize against the admitted canvas rect
  -> build one immutable pick plan
  -> raycast once
  -> reject stale results
  -> return a canonical hotspot id or miss
  -> submit an id-only inspection command
  -> publish a detached result and bounded journal row
```

## Invariants

```txt
A click never uses coordinates from another event.
A non-mouse activation never depends on a prior mousemove.
A sample from a retired stage, surface, camera, context or frame cannot commit.
A hit returns a canonical hotspot id rather than mutable descriptor authority.
Canvas and side-panel activation share one semantic command/result contract.
Hover and parallax clear on leave, cancel, blur, suspension and disposal.
```

## Dependency order

```txt
StoryManifest and canonical hotspot index
  -> Pointer Observation and Hotspot Pick Authority
  -> Inspection Command Authority and completion proof
  -> Atomic Continue transition
  -> Runtime lifecycle and resource retirement
  -> Render Surface Resolution Authority
  -> WebGL Context Recovery Authority
  -> Committed-frame diagnostics
```
