# START HERE: The Unmapped House

Last updated: `2026-07-11T18-38-45-04-00`

## Summary

`TheUnmappedHouse` is a fixed-camera anime-horror point-and-click prototype with three authored scenes, nine hotspots, browser persistence, a fixed 16:9 shell, and a descriptor-driven Three.js stage.

The current audit isolates WebGL context recovery authority. `StageKit` owns a persistent renderer, multisampled target, post pass, scene geometries, shader materials, hotspot resources, resize/input listeners, and a recursive RAF, but the application has no context state, context generation, loss/restore event authority, render suspension, resource rebuild transaction, stale-generation fence, or first recovered frame acknowledgement.

## Plan ledger

**Goal:** preserve story and stage authority through WebGL context loss while rebuilding every required context-bound resource under one new generation and proving one recovered visible frame before input and rendering resume.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` state.
- [x] Select only `TheUnmappedHouse` under the oldest eligible fallback rule.
- [x] Trace renderer, target, post binding, materials, geometries, hotspots, listeners, input, resize, scene loading, persistence, and RAF ownership.
- [x] Identify all active domains, all 24 implemented kits, and their services.
- [x] Define context state, generation, suspension, rebuild, rollback, stale-result, recovered-frame, observation, and fixture boundaries.
- [x] Add timestamped architecture, render, gameplay, interaction, WebGL-context, deploy, tracker, and turn-ledger records.
- [x] Refresh required root `.agent` state.
- [x] Change no runtime source.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement and execute the documented authority and fixture gate.

## Read this first

```txt
.agent/trackers/2026-07-11T18-38-45-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

## Current audit set

```txt
.agent/architecture-audit/2026-07-11T18-38-45-04-00-webgl-context-recovery-dsk-map.md
.agent/render-audit/2026-07-11T18-38-45-04-00-context-generation-recovered-frame-gap.md
.agent/gameplay-audit/2026-07-11T18-38-45-04-00-context-loss-story-input-divergence-loop.md
.agent/interaction-audit/2026-07-11T18-38-45-04-00-context-state-input-admission-map.md
.agent/webgl-context-audit/2026-07-11T18-38-45-04-00-loss-restore-resource-generation-contract.md
.agent/deploy-audit/2026-07-11T18-38-45-04-00-webgl-context-recovery-fixture-gate.md
```

## Main finding

```txt
WebGL renderer graph exists
  -> renderer, target, post binding, materials, geometries and hotspots are context-bound
  -> no application `webglcontextlost` admission
  -> no application `webglcontextrestored` transaction
  -> no context/resource generation
  -> no render or input suspension result
  -> no complete resource-registry rebuild
  -> no first recovered visible-frame acknowledgement
```

Story inspection, clue grants, completion timers, Continue, reset, persistence, resize, pointer input, and RAF remain independent from context readiness. The application cannot prove that current story state, current scene resources, current surface revision, current context generation, and the visible canvas agree.

## Required parent domain

```txt
the-unmapped-house-webgl-context-recovery-authority-domain
```

Required composition:

```txt
webgl-context-state-kit
webgl-context-generation-kit
webgl-context-event-adapter-kit
context-loss-admission-kit
render-suspension-kit
render-dependent-input-fence-kit
context-loss-result-kit
context-resource-registry-kit
context-resource-generation-kit
context-resource-rebuild-plan-kit
renderer-state-reinitialization-kit
render-target-rebuild-kit
material-program-rebind-kit
scene-resource-reupload-kit
context-restore-transaction-kit
context-restore-rollback-kit
stale-context-result-rejection-kit
recovered-frame-ack-kit
context-observation-kit
context-recovery-journal-kit
webgl-context-recovery-fixture-kit
browser-context-loss-restore-smoke-kit
```

## Required invariant

```txt
No frame is ready while context state is LOST, RESTORING, FAILED or DISPOSED.
No render-dependent command commits without the active context generation and a matching frame.
No restored generation becomes authoritative until renderer, target, post binding,
scene resources, hotspot resources and one visible frame cite the same generation.
```

## Dependency order

```txt
1. Versioned StoryManifest and StorySnapshot startup authority
2. Inspection Command Authority and scene-completion proof
3. Atomic Continue transition and first-frame acknowledgement
4. Runtime session lifecycle and scene-resource retirement
5. Render Surface Resolution Authority
6. WebGL Context Recovery Authority
7. Committed-frame diagnostics
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
context-state fixtures: unavailable
resource-generation fixtures: unavailable
loss/restore browser smoke: unavailable
recovered-frame fixture: unavailable
```

Do not claim WebGL context-loss resilience, automatic resource recovery, restored interaction correctness, or recovered-frame parity until the documented gate passes.
