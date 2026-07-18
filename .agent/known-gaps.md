# Known gaps: The Unmapped House render-loop frame allocation and scratch ownership

**Timestamp:** `2026-07-18T09-40-39-04-00`  
**Status:** `audited`

## Summary

The permanent RAF loop creates a new scheduling callback every invocation and a new camera-position vector every loaded-scene frame. No explicit frame scratch, callback lease, source-allocation observation or presented-frame work digest reconciles that recurring work.

## Authority gaps

```txt
render-frame-work manifest: absent
retained RAF callback lease: absent
camera scratch lease: absent
source-owned allocation observation: absent
allocation budget result: absent
stale frame-work rejection: absent
RenderFrameWorkDigest: absent
FirstFrameWorkBoundPresentationAck: absent
```

## Render gaps

```txt
per-frame RAF closure construction: present
per-frame camera Vector3 clone: present
reused camera scratch: absent
callback identity readback: absent
scratch identity readback: absent
heap/GC observation: absent
camera-parallax equivalence fixture: unavailable
```

## Semantic gaps

- Persistent stage resources and transient frame scratch are not separately owned.
- Callback and scratch identity are not bound to the StageKit generation.
- Source-owned allocations are not distinguished from Three.js/browser allocations.
- An accepted frame has no typed work-settlement result.
- A presented frame does not acknowledge the work and scratch generation used to create it.

## Proof gaps

```txt
steady-state allocation fixture: unavailable
camera-parallax scratch fixture: unavailable
scene-transition scratch retirement fixture: unavailable
hidden/resume fixture: unavailable
terminal-state fixture: unavailable
browser heap observation: unavailable
artifact parity: not run
Pages parity: not run
```

## Retained gaps

The prior render-resolution and all earlier lighting, pointer, runtime-fault, narrative, hotspot, story, save, audio, focus, lifecycle, WebGL recovery, progression and deployment gaps remain retained in `kit-registry.json`.