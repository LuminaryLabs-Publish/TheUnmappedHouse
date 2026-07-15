# START HERE: The Unmapped House motion preference and visual-effect admission

**Last updated:** `2026-07-15T02-59-31-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`  
**Status:** `motion-preference-visual-effect-admission-authority-audited`

## Summary

`TheUnmappedHouse` is a fixed-camera anime-horror point-and-click prototype with three scenes, nine required hotspots, clue-led progression, browser persistence, a fixed 16:9 shell, a visible Notebook and a descriptor-driven Three.js stage.

The active audit isolates motion-preference ownership. The stage starts a recursive RAF, advances animated material and post-process time every frame, applies pointer-driven camera parallax and uses a 550 ms interlude fade. The source contains no `prefers-reduced-motion` query, explicit motion setting, replacement policy or first preference-matched frame acknowledgement.

## Plan ledger

**Goal:** preserve the authored horror presentation while admitting one coherent full-motion or reduced-motion profile before animated effects are projected.

- [x] Compare the complete Publish inventory and central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheUnmappedHouse` by the oldest synchronized timestamp.
- [x] Trace RAF, shader time, post effects, camera parallax and CSS transitions.
- [x] Identify the full interaction loop, domains, kits and services.
- [x] Preserve all 24 implemented kits and services.
- [x] Define 21 motion-preference authority surfaces.
- [x] Add the timestamped audit family.
- [x] Keep runtime, HTML, CSS, story and deployment unchanged.
- [ ] Implement and execute reduced-motion browser and Pages fixtures.

## Active loop

```txt
boot
  -> restore story state
  -> construct StageKit and THREE.Clock
  -> start one recursive requestAnimationFrame loop
  -> load scene camera, materials, hotspots and post descriptors

every frame
  -> read elapsed clock time
  -> animate stage material noise
  -> animate post warp, grain and scan lines
  -> apply pointer-derived camera parallax
  -> render the scene into the offscreen target
  -> render the animated post-process pass to the canvas

scene completion
  -> open the interlude
  -> animate opacity for 550 ms
  -> continue into the next scene

motion preference
  -> no explicit setting exists
  -> no prefers-reduced-motion query exists
  -> no system-preference change listener exists
  -> full shader, parallax and transition motion remains active
```

## Required authority

```txt
the-unmapped-house-motion-preference-visual-effect-admission-authority-domain
```

```txt
MotionPreferenceAdmissionCommand
  -> bind document, story, scene, renderer and preference revisions
  -> resolve an explicit user setting or the current system preference
  -> classify FullMotion or ReducedMotion
  -> prepare shader-time, post-process, parallax and transition candidates
  -> preserve all story, hotspot and route semantics
  -> reject stale, duplicate and superseded profile work
  -> atomically adopt one coherent motion profile
  -> publish MotionPreferenceAdmissionResult
  -> render the accepted profile
  -> publish FirstMotionMatchedFrameAck

system preference changes
  -> issue a new command generation
  -> retire the predecessor profile
  -> adopt the replacement without duplicating RAF or listeners
  -> preserve the current story and scene revisions
```

## Read this run first

1. `current-audit.md`
2. `known-gaps.md`
3. `trackers/2026-07-15T02-59-31-04-00/project-breakdown.md`
4. `architecture-audit/2026-07-15T02-59-31-04-00-motion-preference-visual-effect-dsk-map.md`
5. `motion-preference-audit/2026-07-15T02-59-31-04-00-shader-parallax-transition-contract.md`
6. `interaction-audit/2026-07-15T02-59-31-04-00-motion-preference-command-result-map.md`
7. `gameplay-audit/2026-07-15T02-59-31-04-00-motion-sensitive-story-loop.md`
8. `render-audit/2026-07-15T02-59-31-04-00-unbounded-motion-effect-frame-gap.md`
9. `deploy-audit/2026-07-15T02-59-31-04-00-reduced-motion-browser-fixture-gate.md`
10. `central-sync-audit/2026-07-15T02-59-31-04-00-repo-ledger-motion-preference-reconciliation.md`
11. `next-steps.md`
12. `validation.md`

## Retained audits

Story announcements, interlude focus/route admission, page lifecycle, terminal completion, WebGL recovery, save admission, viewport, scene transition, provider admission, hotspot picking, save/reset, ordinary interlude timing and stage-resource lifecycle remain retained in `kit-registry.json`.

## Next safe ledge

Add one motion-profile resolver that combines an explicit setting with `matchMedia("(prefers-reduced-motion: reduce)")`, then bind shader time, post effects, camera parallax and transition duration to the accepted profile before adding browser proof.
