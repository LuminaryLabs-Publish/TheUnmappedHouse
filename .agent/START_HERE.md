# START HERE: The Unmapped House

Last updated: `2026-07-11T20-11-26-04-00`

## Summary

`TheUnmappedHouse` is a fixed-camera anime-horror point-and-click prototype with three authored scenes, nine hotspots, browser persistence, a fixed 16:9 shell, and a descriptor-driven Three.js stage.

The current audit isolates pointer observation and hotspot-pick authority. `StageKit` updates a shared pointer only during `mousemove`, but the canvas `click` listener ignores the click event and raycasts with that shared value. A first click, touch-oriented activation, activation after resize, or activation after a scene/camera replacement can therefore use default or stale coordinates.

## Plan ledger

**Goal:** require every canvas activation to sample its own event coordinates and cite one current session, stage, surface, camera, hotspot-set, context, and visible-frame revision before story mutation is admitted.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` state.
- [x] Avoid active overlapping work in `ZombieOrchard` and `PrehistoricRush`.
- [x] Select only `TheUnmappedHouse` as the oldest stable eligible repository.
- [x] Trace mouse movement, canvas click, coordinate normalization, raycasting, hover, camera parallax, resize, scene replacement, side-panel ingress, inspection, persistence, and visible rendering.
- [x] Identify all active domains, all 24 implemented kits, and their services.
- [x] Define pointer samples, coordinate-space results, input modality, revision provenance, typed pick results, stale rejection, dual-ingress parity, observations, journals, and fixtures.
- [x] Add timestamped architecture, render, gameplay, interaction, pointer-picking, deploy, tracker, and turn-ledger records.
- [x] Refresh required root `.agent` state.
- [x] Change no runtime source.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement and execute the documented authority and fixture gate.

## Read this first

```txt
.agent/trackers/2026-07-11T20-11-26-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

## Current audit set

```txt
.agent/architecture-audit/2026-07-11T20-11-26-04-00-pointer-pick-authority-dsk-map.md
.agent/render-audit/2026-07-11T20-11-26-04-00-stale-pointer-visible-hotspot-gap.md
.agent/gameplay-audit/2026-07-11T20-11-26-04-00-hover-click-inspect-loop.md
.agent/interaction-audit/2026-07-11T20-11-26-04-00-pointer-event-pick-result-map.md
.agent/pointer-picking-audit/2026-07-11T20-11-26-04-00-coordinate-provenance-parity-contract.md
.agent/deploy-audit/2026-07-11T20-11-26-04-00-pointer-pick-fixture-gate.md
```

## Main finding

```txt
StageKit creates pointer = (0, 0)
  -> mousemove updates pointer from that event
  -> hover raycasts the updated pointer
  -> click receives its own coordinates
  -> click coordinates are discarded
  -> click raycasts the ambient pointer
  -> current hit descriptor mutates story state
```

The activation has no pointer sample id, modality, stage epoch, surface revision, camera revision, hotspot-set revision, context generation, visible frame id, typed pick result, or stale-result rejection.

## Concrete failure cases

```txt
click before first mousemove
  -> center-screen raycast

touch or pen activation without mousemove
  -> default or stale mouse coordinates

resize between hover and click
  -> predecessor sample has no surface provenance

Continue between hover and click
  -> predecessor sample is reinterpreted through a new camera and hotspot set

pointer leaves or page blurs
  -> hover label and parallax are not explicitly cancelled
```

## Required parent domain

```txt
the-unmapped-house-pointer-pick-authority-domain
```

Required composition:

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

## Required invariant

```txt
A canvas activation uses coordinates captured from that activation event.
A pick cannot commit after its session, stage, surface, camera, hotspot set,
context or visible frame has been retired.
A hit returns a canonical hotspot id rather than mutable descriptor authority.
Canvas and side-panel activation share one semantic command/result contract.
```

## Dependency order

```txt
1. Versioned StoryManifest and StorySnapshot startup authority
2. Pointer Observation and Hotspot Pick Authority
3. Inspection Command Authority and scene-completion proof
4. Atomic Continue transition and first-frame acknowledgement
5. Runtime session lifecycle and scene-resource retirement
6. Render Surface Resolution Authority
7. WebGL Context Recovery Authority
8. Committed-frame diagnostics
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
npm run check: not run because the execution container could not resolve github.com
browser smoke: not run
coordinate fixtures: unavailable
stale-pick fixtures: unavailable
input-modality fixtures: unavailable
canvas/side-panel parity fixture: unavailable
visible-frame pick fixture: unavailable
```

Do not claim canvas-pick correctness, touch or pen support, stale-pick rejection, dual-ingress parity, or visible-hotspot correlation until the documented gate passes.
