# Known gaps: The Unmapped House render resolution and framebuffer budget

**Timestamp:** `2026-07-17T22-39-01-04-00`  
**Status:** `audited`

## Summary

Viewport dimensions and device pixel ratio directly authorize both the default drawing buffer and a multisampled offscreen target. No explicit quality, capacity or fallback contract reconciles that workload with the presented frame.

## Authority gaps

```txt
render-quality manifest: absent
DPR admission result: absent
render scale policy: absent
drawing-buffer pixel budget: absent
offscreen sample budget: absent
resize generation: absent
allocation fallback result: absent
RenderResolutionDigest: absent
FirstResolutionBoundFrameAck: absent
```

## Render gaps

```txt
maximum physical dimension: absent
maximum physical pixel area: absent
maximum target sample area: absent
rapid-resize coalescing: absent
stale-resize rejection: absent
scene-pass timing observation: absent
post-pass timing observation: absent
quality degradation/recovery evidence: absent
```

## Semantic gaps

- CSS layout scale and physical render scale are not independently declared.
- A browser DPR sample can change physical work without a typed admission result.
- Offscreen sample count is fixed rather than budget-admitted.
- A resize is not complete through a matching presented-frame acknowledgement.
- Allocation failure has no deterministic quality fallback contract.

## Proof gaps

```txt
DPR1 fixture: unavailable
DPR2 fixture: unavailable
large-window capped-area fixture: unavailable
rapid-resize fixture: unavailable
allocation-failure fixture: unavailable
quality recovery fixture: unavailable
frame-cost observation: unavailable
artifact parity: not run
Pages parity: not run
```

## Retained gaps

The prior custom-material lighting/shadow gap and all earlier pointer, runtime-fault, narrative, hotspot, story, save, audio, focus, lifecycle, progression, WebGL recovery and deployment gaps remain retained in `kit-registry.json`.