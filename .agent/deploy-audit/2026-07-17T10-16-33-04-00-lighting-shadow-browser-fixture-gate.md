# Deploy audit: lighting and shadow browser fixture gate

**Timestamp:** `2026-07-17T10-16-33-04-00`  
**Status:** `planned-proof-gate`

## Required source fixtures

```txt
custom material receives accepted directional-light transform
custom material receives accepted light color and intensity
custom material receives accepted ambient/hemisphere contribution
shadow-enabled material receives visible shadow evidence
fixed unshadowed mode disables shadow-map work
mixed-authority configuration is rejected
stale scene/light/material generations are rejected
VisibleLightingDigest is stable for identical inputs
```

## Required browser observations

```txt
capture frame with baseline light
capture frame after directional-light movement
capture frame after light intensity/color change
capture frame after hemisphere-light change
capture frame with shadow policy enabled
capture frame with fixed unshadowed policy
compare frame timing and renderer shadow statistics
observe FirstLightBoundFrameAck
```

## Required parity gate

```txt
source fixture
  -> production artifact fixture
  -> deployed Pages fixture
  -> same lighting policy
  -> same visible-lighting digest
  -> same first-frame acknowledgement semantics
```

## Current validation

```txt
npm run check: not run
browser lighting fixture: unavailable
shadow cost observation: unavailable
production artifact smoke: not run
Pages lighting smoke: not run
```

No source, artifact, deployed parity or production-readiness claim is made.