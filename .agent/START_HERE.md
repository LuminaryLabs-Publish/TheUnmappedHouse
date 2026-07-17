# START HERE: The Unmapped House custom-material lighting and shadows

**Last updated:** `2026-07-17T10-16-33-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`  
**Reviewed pre-audit repository head:** `fda2d01603b023b23a71f3d2ac2e574547aeab9c`  
**Status:** `custom-material-shadow-lighting-projection-authority-audited`

## Summary

TheUnmappedHouse is a fixed-camera anime-horror point-and-click prototype with three scenes, nine authored hotspots, clue-led completion, localStorage persistence, DOM inspection controls and a descriptor-driven Three.js stage.

The active audit isolates a render-authority split. StageKit enables shadows and creates directional/hemisphere lights, but every visible authored surface uses a custom shader driven by a fixed `lightDir` uniform. The custom material consumes neither scene-light state nor shadow maps, so declared light/shadow configuration can diverge from visible shading and admitted render cost.

## Checklist

- [x] Compare all 11 Publish repositories and exclude TheCavalryOfRome.
- [x] Confirm ten eligible ledgers, root `.agent` states and synchronized heads.
- [x] Select only TheUnmappedHouse by the oldest synchronized timestamp.
- [x] Identify the complete interaction loop, all domains, 24 implemented kits and their services.
- [x] Trace scene lights, shadow flags, custom material uniforms and frame projection.
- [x] Define 19 lighting-shadow authority surfaces.
- [x] Add the timestamped audit family.
- [x] Keep runtime, shaders, lighting, shadows, story, persistence, tests and deployment unchanged.
- [ ] Implement one coherent lighting policy and execute browser, cost, artifact and Pages fixtures.

## Active gap

```txt
scene and renderer
  -> DirectionalLight + HemisphereLight
  -> shadow map enabled
  -> props cast/receive shadows

visible custom material
  -> fixed lightDir uniform
  -> no scene-light binding
  -> no shadow-map sampling

result
  -> lighting intent, render cost and visible frame are not reconciled
```

No measured performance regression or production-visible incident is claimed.

## Required authority

`the-unmapped-house-custom-material-shadow-lighting-projection-authority-domain`

```txt
StageLightingAdmissionCommand
  -> StageLightingAdmissionResult

ShadowWorkAdmissionCommand
  -> ShadowWorkAdmissionResult

LightingProjectionCommitCommand
  -> LightingProjectionCommitResult
  -> VisibleLightingDigest
  -> FirstLightBoundFrameAck
```

## Read this run first

1. `current-audit.md`
2. `trackers/2026-07-17T10-16-33-04-00/project-breakdown.md`
3. `architecture-audit/2026-07-17T10-16-33-04-00-custom-material-shadow-lighting-dsk-map.md`
4. `lighting-shadow-audit/2026-07-17T10-16-33-04-00-custom-shader-light-shadow-contract.md`
5. `render-audit/2026-07-17T10-16-33-04-00-shadow-work-without-visible-shadow-gap.md`
6. `gameplay-audit/2026-07-17T10-16-33-04-00-inspect-scene-lighting-projection-loop.md`
7. `interaction-audit/2026-07-17T10-16-33-04-00-lighting-command-result-map.md`
8. `deploy-audit/2026-07-17T10-16-33-04-00-lighting-shadow-browser-fixture-gate.md`
9. `turn-ledger/2026-07-17T10-16-33-04-00.md`
10. `next-steps.md`
11. `known-gaps.md`
12. `validation.md`

## Retained audits

The `2026-07-17T05-03-18-04-00` pointer-presence audit and all earlier runtime-fault, narrative, hotspot, story, save, audio, focus, lifecycle, rendering, progression and deployment findings remain retained in `kit-registry.json`.

## Next safe ledge

Choose the intended visual model before editing shaders: either bind scene lights and compatible shadows into the custom material, or explicitly disable unused scene-light/shadow work and retain fixed anime lighting. Prove the accepted policy with frame and cost evidence.