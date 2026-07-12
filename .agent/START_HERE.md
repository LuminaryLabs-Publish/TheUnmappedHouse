# START HERE: The Unmapped House

Last updated: `2026-07-12T03-21-27-04-00`

## Summary

`TheUnmappedHouse` is a fixed-camera anime-horror point-and-click prototype with three authored scenes, nine hotspots, browser persistence, a fixed 16:9 shell, side-panel inspection buttons and a descriptor-driven Three.js stage.

The current audit isolates Committed Frame Diagnostics Authority. Story and notebook state are projected synchronously after inspection and scene changes, while the canvas is updated later by an independent recursive RAF. The renderer returns no frame id, input snapshot, stage-pass result, post-pass result or visible-frame acknowledgement, so the DOM/debug state cannot prove which story, scene, resource, surface or context revision produced the visible canvas.

## Plan ledger

**Goal:** make every visible canvas frame a typed, correlated result that can be compared with story, narrative, runtime, resource, surface and context state.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger entries and root `.agent` state.
- [x] Select only `TheUnmappedHouse` as the oldest eligible repository.
- [x] Trace inspection, Continue, DOM projection, debug projection, scene loading, RAF, stage rendering and post rendering.
- [x] Identify all active domains, all 24 implemented kits and their services.
- [x] Define frame sequencing, immutable frame input, pass results, visible acknowledgement, diagnostics and fixture boundaries.
- [x] Add timestamped architecture, render, gameplay, interaction, committed-frame and deploy audits.
- [x] Push only to `main`; create no branch or pull request.
- [x] Synchronize the central ledger and internal change log.
- [ ] Implement the authority and execute the documented fixtures.

## Read this first

```txt
.agent/trackers/2026-07-12T03-21-27-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

## Current audit set

```txt
.agent/architecture-audit/2026-07-12T03-21-27-04-00-committed-frame-diagnostics-dsk-map.md
.agent/render-audit/2026-07-12T03-21-27-04-00-story-state-visible-frame-correlation-gap.md
.agent/gameplay-audit/2026-07-12T03-21-27-04-00-inspection-transition-frame-proof-loop.md
.agent/interaction-audit/2026-07-12T03-21-27-04-00-command-result-frame-admission-map.md
.agent/committed-frame-audit/2026-07-12T03-21-27-04-00-frame-input-pass-result-visible-ack-contract.md
.agent/deploy-audit/2026-07-12T03-21-27-04-00-committed-frame-fixture-gate.md
```

## Main finding

```txt
inspection or Continue
  -> mutate story/scene state
  -> update DOM and debug JSON immediately
  -> persist state immediately

independent RAF callback
  -> read live camera, materials, scene and wall-clock time
  -> render stage to target
  -> render post scene to canvas
  -> return no frame receipt
```

`renderUi()` can report a successor scene or newly completed inspection before any canvas frame has acknowledged that state. `StageKit.animate()` has no frame counter, no immutable frame input, no pass result and no public observation surface.

## Required parent domain

```txt
the-unmapped-house-committed-frame-diagnostics-authority-domain
```

Required composition:

```txt
frame-sequence-kit
story-revision-kit
narrative-revision-kit
frame-input-snapshot-kit
render-command-kit
render-admission-kit
stage-pass-result-kit
post-pass-result-kit
frame-commit-result-kit
visible-frame-acknowledgement-kit
canvas-present-observation-kit
frame-correlation-kit
frame-debug-projection-kit
public-frame-readback-kit
stale-frame-rejection-kit
frame-journal-kit
first-frame-fixture-kit
scene-transition-frame-fixture-kit
inspection-frame-parity-fixture-kit
browser-screenshot-correlation-smoke-kit
```

## Required invariant

```txt
Every visible frame cites one immutable input snapshot.

That snapshot cites:
manifest
story snapshot and story revision
narrative revision
runtime session and generation
scene resource generation
surface revision
context generation
camera revision
hotspot-set revision

The stage and post passes return typed results.
A frame is public only after the final canvas acknowledgement.
DOM/debug projection and screenshots cite the same committed frame.
Stale or failed frames cannot advance public readback.
```

## Dependency order

```txt
1. StoryManifest Authority
2. StorySnapshot startup admission and typed persistence
3. Pointer Observation and Hotspot Pick Authority
4. Inspection and scene-completion proof
5. Atomic Continue transition
6. Narrative Projection Authority
7. Runtime Session Lifecycle and Scene Resource Retirement Authority
8. Render Surface Resolution Authority
9. WebGL Context Recovery Authority
10. Committed Frame Diagnostics Authority
```

## Validation status

```txt
runtime source changed: no
rendering changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check: not run
browser smoke: not run
committed-frame fixtures: unavailable
screenshot correlation fixtures: unavailable
```

Do not claim that notebook/debug state matches the visible canvas until a committed frame receipt and browser evidence cite the same revisions.
