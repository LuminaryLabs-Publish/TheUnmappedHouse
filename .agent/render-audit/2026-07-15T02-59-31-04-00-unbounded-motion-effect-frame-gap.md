# Render audit: unbounded motion-effect frame gap

**Timestamp:** `2026-07-15T02-59-31-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Status:** `audited`

## Summary

Every visible frame advances animated stage and post effects regardless of user or system motion preference. No frame identity proves that a reduced-motion profile has been adopted.

## Plan ledger

**Goal:** bind each visible frame to one accepted motion-profile revision.

- [x] Trace clock and RAF.
- [x] Trace stage and post time uniforms.
- [x] Trace camera parallax.
- [x] Trace CSS transition motion.
- [x] Define first matching frame evidence.
- [ ] Implement and execute browser fixtures.

## Current frame path

```txt
requestAnimationFrame
  -> THREE.Clock.getElapsedTime
  -> material.uniforms.time = elapsed
  -> postMaterial.uniforms.time = elapsed
  -> pointer offsets camera
  -> render stage to target
  -> render post pass to canvas
```

## Frame-coherence gap

```txt
MotionProfileRevision: absent
StageShaderPolicyRevision: absent
PostProcessPolicyRevision: absent
CameraParallaxPolicyRevision: absent
TransitionPolicyRevision: absent
RenderedMotionProfileRevision: absent
FirstMotionMatchedFrameAck: absent
```

## Reduced-motion projection contract

A reduced-motion frame should preserve scene geometry, lighting, static color treatment, hotspot picking and narrative visibility while disabling or freezing motion-heavy time variation, parallax and transitions according to one accepted profile.

## Required proof

```txt
full-motion first frame
reduced-motion first frame
live system preference replacement
explicit override replacement
no mixed-profile frame
page restore with retained profile
built artifact parity
Pages parity
```
