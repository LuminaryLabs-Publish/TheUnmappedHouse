# Next steps: The Unmapped House custom-material lighting and shadows

**Timestamp:** `2026-07-17T10-16-33-04-00`  
**Status:** `audited`

## Summary

The smallest safe implementation is to select one explicit lighting model and reject shadow work that no visible material consumes.

## Checklist

- [ ] Add a scene-level lighting model manifest.
- [ ] Allocate `SceneGeneration`, `LightingGeneration`, `MaterialGeneration`, `ShadowPolicyRevision` and `FrameGeneration`.
- [ ] Add `StageLightingAdmissionCommand` and `StageLightingAdmissionResult`.
- [ ] Decide between scene-bound custom lighting and fixed unshadowed anime lighting.
- [ ] For scene-bound lighting, bind directional and ambient/hemisphere descriptors into the custom shader.
- [ ] Add compatible shadow receiver sampling before keeping shadow maps enabled.
- [ ] For fixed lighting, disable unused Three.js light/shadow work.
- [ ] Add caster, receiver, resolution and update budgets.
- [ ] Add `ShadowWorkAdmissionCommand` and typed disabled/rejected results.
- [ ] Publish `VisibleLightingDigest` and `LightingProjectionCommitResult`.
- [ ] Publish `FirstLightBoundFrameAck`.
- [ ] Add light transform, color, intensity and hemisphere frame fixtures.
- [ ] Add shadow-enabled and fixed-unshadowed comparison fixtures.
- [ ] Observe frame/GPU cost with shadow work enabled and disabled.
- [ ] Run `npm run check`.
- [ ] Run source, production artifact and Pages parity fixtures.

## Do not do

- Do not keep global shadow maps enabled by default without an accepted receiver.
- Do not treat scene light objects as visually authoritative while the custom shader ignores them.
- Do not claim a performance improvement until measured browser evidence exists.
- Do not restructure story, interaction or save domains for this targeted render fix.