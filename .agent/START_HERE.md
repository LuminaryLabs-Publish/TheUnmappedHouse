# START HERE: The Unmapped House

Last updated: `2026-07-11T17-10-50-04-00`

## Summary

`TheUnmappedHouse` is a fixed-camera anime-horror point-and-click prototype with three authored scenes, nine hotspots, browser persistence, a fixed 16:9 shell, and a descriptor-driven Three.js stage.

The current audit isolates render-surface resolution authority. The CSS aspect frame is deterministic, but `StageKit` directly multiplies the live viewport by device pixel ratio for both the renderer drawing buffer and a two-sample post target. Boot performs an initial design-sized allocation and then immediately resizes it. Later resize events synchronously reallocate surfaces with no pixel budget, quality fallback, resize generation, rollback, or visible-frame acknowledgement.

A `3840 x 2160` viewport at DPR `2` requests a `7680 x 4320` post target, more than 33 million pixels before multisample and depth overhead.

## Plan ledger

**Goal:** preserve the authored 16:9 composition while making internal renderer and post-target resolution bounded, revisioned, recoverable, observable, and frame-proven.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` state.
- [x] Select only `TheUnmappedHouse` under the oldest eligible fallback rule.
- [x] Trace aspect framing, DPR sampling, renderer sizing, target sizing, resize admission, post composition, and RAF submission.
- [x] Identify all active domains, 24 implemented kits, and offered services.
- [x] Define pixel budget, resolution policy, resize generation, preparation, commit, fallback, rollback, retirement, observation, and fixture boundaries.
- [x] Add timestamped architecture, render, gameplay, interaction, render-surface, deploy, tracker, and turn-ledger records.
- [x] Refresh all required root `.agent` state.
- [x] Change no runtime source.
- [x] Push only to `main` and create no branch or pull request.
- [ ] Implement the prerequisite story authorities, runtime lifecycle, and render-surface transaction.

## Read this first

```txt
.agent/trackers/2026-07-11T17-10-50-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

## Current audit set

```txt
.agent/architecture-audit/2026-07-11T17-10-50-04-00-render-surface-resolution-dsk-map.md
.agent/render-audit/2026-07-11T17-10-50-04-00-dpr-multisample-target-budget-gap.md
.agent/gameplay-audit/2026-07-11T17-10-50-04-00-resize-reallocation-visible-story-loop.md
.agent/interaction-audit/2026-07-11T17-10-50-04-00-resize-command-surface-result-map.md
.agent/render-surface-audit/2026-07-11T17-10-50-04-00-resolution-budget-recovery-contract.md
.agent/deploy-audit/2026-07-11T17-10-50-04-00-render-resolution-fixture-gate.md
```

## Main finding

```txt
browser dimensions and DPR
  -> compute CSS 16:9 frame
  -> set renderer pixel ratio
  -> resize renderer drawing buffer
  -> resize multisampled post target
  -> continue RAF
```

Missing evidence:

```txt
immutable resolution policy
pixel and capability budget
resize command and generation
surface revision
candidate preparation result
allocation failure classification
quality fallback receipt
atomic surface commit
rollback result
stale resize rejection
resource retirement receipt
actual renderer and target dimensions
first visible frame surface acknowledgement
bounded render-surface journal
```

## Required next parent domain

```txt
the-unmapped-house-render-surface-resolution-authority-domain
```

Required composition:

```txt
display-frame-observation-kit
device-pixel-ratio-admission-kit
render-resolution-policy-kit
render-pixel-budget-kit
resize-command-kit
resize-coalescing-kit
resize-generation-kit
render-surface-revision-kit
render-surface-plan-kit
renderer-buffer-preparation-kit
post-target-preparation-kit
allocation-failure-classification-kit
render-quality-fallback-kit
render-surface-commit-kit
render-surface-rollback-kit
stale-resize-result-rejection-kit
render-surface-resource-retirement-kit
visible-frame-surface-ack-kit
render-surface-observation-kit
render-surface-journal-kit
render-resolution-fixture-kit
browser-resize-dpr-smoke-kit
```

## Required invariant

```txt
No surface revision may become authoritative unless CSS frame, camera aspect,
renderer drawing buffer, post target, post texture binding, budget decision,
and first visible frame all reference the same admitted plan.

Failed or superseded preparation must leave the predecessor surface visible.
```

## Dependency order

```txt
1. Versioned StoryManifest and StorySnapshot startup authority
2. Inspection Command Authority and scene-completion proof
3. Atomic Continue transition and first-frame acknowledgement
4. Runtime session lifecycle and resource retirement
5. Render Surface Resolution Authority
6. Committed-frame diagnostics
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
render-resolution fixtures: unavailable
allocation-failure fixtures: unavailable
resize-generation fixtures: unavailable
visible-frame surface fixture: unavailable
```

Do not claim bounded high-DPI rendering, resize recovery, allocation fallback, or surface/frame correlation until the documented fixture gate passes.