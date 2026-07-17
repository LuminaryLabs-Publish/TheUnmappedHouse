# Known gaps: The Unmapped House custom-material lighting and shadows

**Timestamp:** `2026-07-17T10-16-33-04-00`  
**Status:** `audited`

## Summary

The stage declares two lighting authorities: Three.js scene lights/shadows and a fixed-direction custom shader. No result reconciles them.

## Authority gaps

```txt
scene lighting model manifest: absent
light/material generation binding: absent
shadow consumer admission: absent
shadow work budget: absent
visible-lighting digest: absent
FirstLightBoundFrameAck: absent
```

## Render gaps

```txt
DirectionalLight transform binding to custom shader: absent
DirectionalLight color/intensity binding: absent
HemisphereLight contribution binding: absent
shadow-map sampling in custom material: absent
caster/receiver effectiveness proof: absent
shadow-map cost observation: absent
```

## Semantic gaps

- Scene authors can change lights without changing visible authored materials.
- `castShadow` and `receiveShadow` imply a capability the material does not consume.
- Fixed anime lighting is not declared as an intentional compatibility mode.
- The visible frame exposes no proof of which lighting policy it used.

## Proof gaps

```txt
light transform frame fixture: unavailable
light color/intensity frame fixture: unavailable
hemisphere frame fixture: unavailable
shadow receiver fixture: unavailable
fixed-unshadowed fixture: unavailable
frame/GPU cost comparison: unavailable
artifact parity: not run
Pages parity: not run
```

## Retained gaps

All earlier pointer, runtime-fault, narrative, hotspot, story, save, audio, focus, lifecycle, progression, WebGL recovery and deployment gaps remain retained in `kit-registry.json`.