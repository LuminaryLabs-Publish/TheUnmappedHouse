# Deploy audit: render-resolution browser fixture gate

**Timestamp:** `2026-07-17T22-39-01-04-00`  
**Status:** `audited`

## Current delivery

The project is a static browser artifact and imports Three.js from unpkg. The package exposes only a syntax check and local static server. No browser automation captures drawing-buffer dimensions, target dimensions, sample policy or frame cost.

## Required fixture matrix

```txt
source origin
  -> 1280x720 DPR1
  -> 1920x1080 DPR1
  -> 1920x1080 DPR2
  -> large-window capped budget
  -> rapid resize sequence
  -> simulated allocation fallback

production artifact
  -> repeat accepted-dimension and frame-digest checks

Pages origin
  -> repeat accepted-dimension and frame-digest checks
```

## Gate evidence

Each fixture must record viewport CSS dimensions, browser DPR, admitted DPR, render scale, drawing-buffer dimensions, offscreen-target dimensions, samples, frame timing observation, quality result and first matching frame acknowledgement.

## Boundary

No workflow, artifact, browser or Pages test was run. Deployment configuration was not changed.