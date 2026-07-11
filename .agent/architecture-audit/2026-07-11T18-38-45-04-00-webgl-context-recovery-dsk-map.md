# Architecture Audit: WebGL Context Recovery DSK Map

**Timestamp:** `2026-07-11T18-38-45-04-00`

## Summary

`StageKit` owns a WebGL renderer graph but does not expose context lifecycle as a domain. Renderer/browser behavior is implicit, while story state, scene state, render-surface state, pointer input, resize work, and frame submission have no shared context generation.

## Plan ledger

**Goal:** define the smallest composable DSK that can suspend rendering on context loss, rebuild all context-bound resources under a new generation, reject stale work, and prove one recovered visible frame.

- [x] Identify current resource owners.
- [x] Separate browser event adaptation from context state authority.
- [x] Separate resource inventory, rebuild preparation, commit, rollback, and retirement.
- [x] Define dependencies on runtime lifecycle, render-surface authority, scene transition authority, inspection authority, and committed-frame diagnostics.
- [x] Define candidate kits and service contracts.
- [ ] Implement the DSK.

## Existing ownership graph

```txt
browser document
  -> src/game.js
       -> mutable story state
       -> inspection and Continue callbacks
       -> StageKit
            -> WebGLRenderer
            -> canvas and implicit WebGL context
            -> WebGLRenderTarget
            -> post ShaderMaterial + target.texture
            -> scene, camera and lights
            -> stage geometries and ShaderMaterials
            -> hotspot geometries and MeshBasicMaterials
            -> resize, mousemove and click listeners
            -> recursive RAF
```

## Missing parent domain

```txt
the-unmapped-house-webgl-context-recovery-authority-domain
```

## DSK composition

| Kit | Owned service |
|---|---|
| `webgl-context-state-kit` | Canonical `READY`, `LOST`, `RESTORING`, `FAILED`, and `DISPOSED` states. |
| `webgl-context-generation-kit` | Monotonic identity for each usable context generation. |
| `webgl-context-event-adapter-kit` | Convert DOM context events into typed commands without direct mutation. |
| `context-loss-admission-kit` | Deduplicate loss, validate session/generation, and publish accepted loss results. |
| `render-suspension-kit` | Stop ready-frame commits while preserving the session and story snapshot. |
| `render-dependent-input-fence-kit` | Reject or defer raycast-dependent input when no committed render generation exists. |
| `context-loss-result-kit` | Report loss classification, predecessor generations, suspended capabilities, and preserved state. |
| `context-resource-registry-kit` | Canonical inventory of renderer, target, post, geometry, material, hotspot, and binding resources. |
| `context-resource-generation-kit` | Bind every context-dependent resource to one context generation. |
| `context-resource-rebuild-plan-kit` | Derive the complete ordered rebuild plan from current story, stage, surface, and policy state. |
| `renderer-state-reinitialization-kit` | Restore renderer state and drawing-buffer policy for the candidate generation. |
| `render-target-rebuild-kit` | Recreate target storage and target-texture binding for the candidate surface revision. |
| `material-program-rebind-kit` | Reestablish shader program/uniform readiness for stage and post materials. |
| `scene-resource-reupload-kit` | Reestablish geometry/material/hotspot GPU readiness from canonical scene descriptors. |
| `context-restore-transaction-kit` | Prepare and atomically install one complete candidate resource registry. |
| `context-restore-rollback-kit` | Dispose partial candidate resources and keep the session suspended on failure. |
| `stale-context-result-rejection-kit` | Reject work from superseded session, surface, stage, or context generations. |
| `recovered-frame-ack-kit` | Admit the first visible frame that cites the active story, stage, surface, and context identities. |
| `context-observation-kit` | Publish detached clone-safe context and resource state. |
| `context-recovery-journal-kit` | Record bounded loss, rebuild, rollback, commit, frame, and retirement rows. |
| `webgl-context-recovery-fixture-kit` | Run deterministic pure/adapter recovery fixtures. |
| `browser-context-loss-restore-smoke-kit` | Exercise real browser loss/restore behavior and visible-frame convergence. |

## Required command/result model

```txt
ContextEventCommand
  commandId
  sessionId
  sessionGeneration
  observedContextGeneration
  type: lost | restored
  sourceEventTime
  surfaceRevision
  stageEpoch
  storyRevision

ContextRecoveryResult
  status: duplicate | rejected | suspended | restoring | committed |
          rolled_back | failed | recovered_frame_acknowledged
  commandId
  predecessorContextGeneration
  candidateContextGeneration?
  committedContextGeneration?
  resourceGeneration?
  surfaceRevision
  stageEpoch
  storyRevision
  suspendedCapabilities
  rebuildRows
  rollbackResult?
  firstRecoveredFrameId?
```

## Required dependency edges

```txt
runtime-session-lifecycle
  -> admits events and rejects disposed generations

render-surface-resolution-authority
  -> supplies the committed surface plan to rebuild

atomic-scene-transition-authority
  -> supplies canonical current scene/stage descriptors

inspection-command-authority
  -> rejects render-dependent commands without a current frame/context proof

committed-frame-diagnostics
  -> records the recovered frame and its context/resource generations
```

## Required invariants

```txt
one committed context generation at a time
one complete resource registry per committed generation
no partial resource registry is externally visible
no ready frame while context state is not READY
no raycast commit from a frame older than the active context generation
no restore success before first recovered frame acknowledgement
all partial candidate resources retire on rollback
late events after disposal are rejected
```
