# Current audit: The Unmapped House render resolution and framebuffer budget

**Timestamp:** `2026-07-17T22-39-01-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Status:** `render-resolution-framebuffer-budget-authority-audited`  
**Branch:** `main`

## Summary

`StageKit` derives physical render dimensions directly from the full aspect-fitted CSS viewport and admitted device pixel ratio up to `2`. It applies those dimensions to the renderer drawing buffer and a separate offscreen target with `samples: 2`, then executes both scene and post passes every RAF.

## Intent

Make viewport evidence, DPR, render scale, sample count, physical buffer limits, quality fallback and the visible frame belong to one accepted render generation.

## Source-backed finding

```txt
design surface: 1920x1080
CSS viewport: full browser-fit 16:9 area
pixel ratio: min(devicePixelRatio, 2)
renderer antialias: enabled
offscreen target samples: 2
offscreen size: viewport x pixelRatio
scene pass every RAF: present
post pass every RAF: present
render scale: absent
pixel/sample budget: absent
allocation fallback: absent
resolution digest: absent
first resolution-bound frame acknowledgement: absent
```

## Required authority

`the-unmapped-house-render-resolution-framebuffer-budget-authority-domain`

## Smallest safe implementation

1. Declare a render-quality manifest with DPR ceiling, render scale, target sample policy and explicit dimension/area budgets.
2. Separate CSS layout dimensions from physical renderer and target dimensions.
3. Add generation-bound resolution admission and resize results.
4. Coalesce rapid resize samples and reject stale allocations.
5. Add deterministic fallback for target allocation failure.
6. Publish `RenderResolutionDigest` and `FirstResolutionBoundFrameAck`.
7. Prove size, DPR, fallback, frame cost and deployment parity in browser fixtures.

## Boundary

Documentation only. No renderer, target, resize, shader, story, input, save, build or deployment behavior changed.