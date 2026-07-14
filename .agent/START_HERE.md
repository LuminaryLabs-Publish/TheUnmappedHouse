# START HERE: The Unmapped House WebGL context and stage recovery

**Last updated:** `2026-07-14T01-00-28-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`  
**Status:** `webgl-context-stage-recovery-authority-audited`  
**Retained statuses:** `story-save-schema-manifest-admission-authority-central-reconciled`, `render-surface-viewport-authority-central-reconciled`, `scene-transition-composition-authority-central-reconciled`, `render-provider-admission-authority-central-reconciled`, `hotspot-input-picking-authority-central-reconciled`, `browser-save-commit-reset-convergence-authority-audited`, `interlude-progression-admission-authority-audited`, `stage-resource-lifecycle-authority-audited`

## Summary

`TheUnmappedHouse` is a fixed-camera anime-horror point-and-click prototype with three scenes, nine hotspots, clue-led progression, browser persistence, a fixed 16:9 shell, a visible Notebook and a descriptor-driven Three.js stage.

The active audit isolates WebGL context and stage recovery. `StageKit` owns one application-lifetime renderer, render target, post graph, scene resource graph and recursive RAF, but the application has no context-loss/restoration handlers, readiness downgrade, fallback, interaction suspension, recovery manifest, atomic adoption or first recovered visible-frame acknowledgement.

## Plan ledger

**Goal:** preserve story truth during presentation failure, suspend stage-dependent commands, rebuild one complete WebGL stage generation and prove the first recovered frame before normal interaction resumes.

- [x] Compare the full Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories are tracked, root-documented and synchronized.
- [x] Select only `TheUnmappedHouse` by the oldest eligible timestamp.
- [x] Trace WebGL construction, resource ownership, frame submission, context-event gaps and interaction liveness.
- [x] Preserve all 24 implemented kits and offered services.
- [x] Define context identity, fallback, recovery preparation, probe, adoption, rollback and visible-proof boundaries.
- [x] Add the timestamped tracker and audit family.
- [ ] Implement and execute the authority.

## Active loop

```txt
StageKit construction
  -> WebGLRenderer, Scene, Camera and lights
  -> WebGLRenderTarget and post graph
  -> scene geometry, shader materials and hotspot volumes
  -> pointer listeners and recursive RAF

context loss
  -> no application event route
  -> no readiness or interaction transition
  -> no fallback or submission retirement

context restoration
  -> no application recovery transaction
  -> no resource-generation adoption
  -> no first recovered visible-frame proof
```

## Required authority

```txt
the-unmapped-house-webgl-context-stage-recovery-authority-domain
```

It coordinates context identity, render-submission retirement, presentation readiness, fallback, stage-dependent interaction admission, complete resource reconstruction, probe, atomic adoption or rollback and first recovered-frame proof. Story truth, save admission, scene authoring, viewport policy and renderer implementation remain bounded services.

## Read this run first

1. `current-audit.md`
2. `known-gaps.md`
3. `trackers/2026-07-14T01-00-28-04-00/project-breakdown.md`
4. `architecture-audit/2026-07-14T01-00-28-04-00-webgl-context-stage-recovery-dsk-map.md`
5. `webgl-lifecycle-audit/2026-07-14T01-00-28-04-00-context-generation-resource-recovery-contract.md`
6. `interaction-audit/2026-07-14T01-00-28-04-00-context-event-recovery-result-map.md`
7. `gameplay-audit/2026-07-14T01-00-28-04-00-presentation-loss-interaction-liveness-loop.md`
8. `render-audit/2026-07-14T01-00-28-04-00-context-loss-visible-stage-recovery-gap.md`
9. `deploy-audit/2026-07-14T01-00-28-04-00-webgl-context-recovery-fixture-gate.md`
10. `central-sync-audit/2026-07-14T01-00-28-04-00-repo-ledger-webgl-recovery-reconciliation.md`
11. `next-steps.md`
12. `validation.md`

## Retained audits

The prior save admission, viewport, scene-transition, provider, hotspot-picking, durable-save, progression and normal stage-lifecycle audits remain valid bounded authorities and are preserved in `kit-registry.json`.

## Next safe ledge

Add a small application-owned context-lifecycle adapter around `StageKit` that publishes readiness and fallback state before attempting any reconstruction. Then prove loss and restoration in a real browser before expanding recovery behavior.