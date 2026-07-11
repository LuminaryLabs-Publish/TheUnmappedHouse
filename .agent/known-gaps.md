# Known gaps: The Unmapped House

Timestamp: `2026-07-11T18-38-45-04-00`

## Plan ledger

**Goal:** keep story, lifecycle, rendering, resolution, WebGL recovery, input, and validation gaps explicit while promoting context recovery into an implementation-ready contract.

- [x] Preserve StoryManifest, StorySnapshot, inspection, Continue, lifecycle, and render-surface authority as prerequisites.
- [x] Trace renderer, target, post binding, materials, geometries, hotspots, input, resize, scene loading, and RAF ownership.
- [x] Define context state, generation, resource registry, suspension, rebuild, rollback, stale-result, recovered-frame, observation, and fixture gaps.
- [x] Preserve committed-frame diagnostics as the downstream proof gate.

## Story and persistence gaps

- No canonical StoryManifest id, schema, indexes, deep freeze, or fingerprint exists.
- The `.v1` save remains an unversioned raw object with broad-catch parsing and shallow merge.
- No semantic admission, migration, reconciliation, quarantine, typed persistence result, bootstrap rollback, or first-bootstrap-frame result exists.
- Inspections, clues, route, current scene, completion, and terminal state can disagree.

## Inspection and transition gaps

- Side-panel and raycast paths submit full mutable hotspot descriptors.
- No command identity, sequence, canonical lookup, immutable receipt, clue provenance, or typed result exists.
- Completion is derived from global clue strings rather than accepted current-scene receipts.
- Continue mutates live story state before replacement stage and persistence success.
- No transition lock, rollback, stage epoch, first-successor-frame, retirement result, or durable terminal phase exists.

## Runtime lifecycle and resource gaps

- RAF, resize, pointer, click, keyboard, button closures, context events, and timeouts are not managed through revocable leases.
- `stageGroup.clear()` detaches resources without disposing geometries or materials.
- Renderer, target, post resources, canvas, and WebGL context have no explicit teardown result.
- No `sessionId`, session generation, callback fence, resource inventory, or idempotent stop/dispose contract exists.

## Render composition and resolution gaps

- CSS aspect-frame geometry and internal GPU resolution are conflated inside `StageKit.resize()`.
- DPR is sampled directly and capped only at `2`; no pixel or capability budget exists.
- The constructor allocates design-sized renderer and target storage, then immediately resizes both.
- Renderer and target dimensions are derived independently without one canonical plan or read-back result.
- No immutable quality tiers, maximum long edge, maximum pixel count, sample policy, or fallback chain exists.
- No resize generation, surface revision, detached preparation, atomic commit, rollback, stale-result rejection, or first-visible-frame surface acknowledgement exists.

## WebGL context lifecycle gaps

- The application installs no `webglcontextlost` listener.
- The application installs no `webglcontextrestored` listener.
- No canonical context state distinguishes ready, lost, restoring, failed, or disposed rendering.
- No `contextGeneration` or `resourceGeneration` exists.
- No typed loss command/result records predecessor story, stage, surface, and frame identities.
- No render-suspension result prevents ready-frame commits during loss.
- No capability fence rejects raycast-dependent input while no valid frame exists.
- No canonical context-bound resource inventory exists.
- No complete rebuild plan covers renderer state, target storage, post binding, materials, geometries, hotspot resources, and picking state.
- No restore transaction stages candidate resources before authority transfer.
- No rollback result proves partial candidate resources were disposed.
- No stale context/session/stage/surface result rejection exists.
- No first recovered frame acknowledgement exists.
- No context observation or bounded recovery journal exists.

## Story/render divergence gaps during loss

- Side-panel inspection can mutate clues without any visible-frame requirement.
- Canvas click remains wired even when render availability is unknown.
- Completion timers can fire while the renderer is unavailable or restoring.
- Continue can replace the story/stage while no recovered frame exists.
- Persistence can commit story state that has never been proven visible.
- Reset/reload has no context-aware result or cleanup acknowledgement.

## Context recovery resource gaps

- Renderer-internal recovery behavior is not surfaced as application evidence.
- The post material has no proof that `tDiffuse` references storage rebuilt for the active context generation.
- Stage and hotspot geometries/materials have no generation identity or readiness receipt.
- Render target, target texture, depth/multisample storage, shader programs, and picking state have no rebuild rows.
- Repeated loss/restore cycles have no live-resource-count or listener-count bound.
- Late restoration events after disposal have no rejection path.

## Input and visible-frame gaps

- No barrier proves pointer observations, camera projection, hotspot set, renderer surface, context generation, and visible output share one committed frame.
- A click uses the stored pointer rather than sampling the click event directly; no frame/context identity proves the stored pointer remains current.
- No first-post-recovery input admission exists.
- No recovered-frame story/stage/surface/context parity record exists.

## Diagnostics gaps

- The debug panel exposes story state but no context or resource state.
- Context state, context generation, resource generation, suspended capabilities, rebuild rows, rollback rows, last ready frame, and last recovered frame are absent.
- No detached clone-safe context observation exists.
- No bounded context recovery journal exists.

## Validation gaps

- `npm run check` performs syntax checks only.
- No WebGL context is created during validation.
- No context-loss or restoration event is exercised.
- No resource-generation, rebuild, rollback, stale-result, input-fence, repeated-cycle, or recovered-frame fixture exists.
- No browser matrix covers context loss during resize, interlude, transition preparation, visibility changes, or disposal.
- Existing validation does not execute StoryManifest, persistence, interaction, transition, lifecycle, render-surface, resource retirement, context recovery, or committed-frame behavior.

## Deferred work

```txt
new story rooms or branches
inventory
audio
renderer replacement
new shader work
camera retuning
visual polish
```
