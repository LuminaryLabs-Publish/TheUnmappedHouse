# Render audit: transient frame allocation and presentation gap

**Timestamp:** `2026-07-18T09-40-39-04-00`  
**Status:** `audited`

## Render loop observed

```txt
requestAnimationFrame(() => this.animate())
  -> elapsed time
  -> baseCamera.position.clone()
  -> parallax mutation
  -> camera copy/lookAt
  -> material time updates
  -> offscreen scene render
  -> post-process render
```

## Source-visible recurring construction

| Construction | Frequency |
|---|---|
| RAF arrow callback | every `animate()` invocation |
| camera-position `THREE.Vector3` clone | every frame after a scene establishes `baseCamera` |

At a hypothetical 60 accepted frames per second, these two expressions create at least 120 transient objects per second. This calculation does not include Three.js, WebGL, browser, shader, raycaster, developer-tool or garbage-collector internals.

## Missing render contract

```txt
retained RAF callback identity: absent
reusable camera scratch vector: absent
frame scratch lease: absent
source-owned allocation counter: absent
frame allocation budget: absent
heap/GC evidence: absent
stale frame-work rejection: absent
RenderFrameWorkDigest: absent
FirstFrameWorkBoundPresentationAck: absent
```

## Proposed correction

```txt
StageKit generation
  -> retain frameCallback once
  -> retain cameraPositionScratch once

frame
  -> request frameCallback
  -> cameraPositionScratch.copy(baseCamera.position)
  -> mutate scratch for parallax
  -> copy scratch into camera
  -> submit both passes
  -> publish frame-work digest and presentation acknowledgement
```

## Claims not made

No current stutter, garbage-collection pause, heap growth, frame-time regression, browser failure or production-visible defect was measured or reproduced.