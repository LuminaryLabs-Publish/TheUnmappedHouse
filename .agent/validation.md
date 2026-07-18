# Validation: The Unmapped House render-loop frame allocation audit

**Timestamp:** `2026-07-18T09-40-39-04-00`  
**Scope:** documentation-only architecture, render, gameplay, interaction, frame-work and deployment audit

## Summary

Source and retained audit state were inspected. The audit establishes that the recursive render loop creates a new RAF arrow callback every invocation and a new camera-position `THREE.Vector3` every loaded-scene frame. No runtime source changed and no executable heap, garbage-collection, browser or performance proof ran.

## Checklist

- [x] Compare all 11 accessible Publish repositories.
- [x] Exclude TheCavalryOfRome and account for ten eligible repositories.
- [x] Confirm all ten eligible repositories have central ledgers and root `.agent` state.
- [x] Compare all ten documented heads to `main`; all were identical.
- [x] Select only TheUnmappedHouse by oldest synchronized timestamp.
- [x] Read runtime, story, layout, package, deployment and current `.agent` records.
- [x] Identify the complete interaction loop, all domains, all 24 kits and their services.
- [x] Trace RAF callback construction, camera clone construction and two-pass frame submission.
- [x] Add the timestamped tracker and audit family.
- [x] Refresh all required root `.agent` files.
- [x] Change no runtime, render, story, persistence, package or deployment behavior.
- [x] Create no branch or pull request.

## Changed

```txt
documentation: yes
runtime JavaScript: no
HTML/CSS/story content: no
scheduler and frame scratch: no
renderer and target allocation: no
shaders, lights and shadows: no
interaction and gameplay: no
persistence: no
packages and dependencies: no
tests and workflows: no
deployment: no
```

## Source arithmetic

At 60 accepted frames per second after scene load:

```txt
60 RAF callback closures / second
60 camera Vector3 clones / second
120 source-visible transient objects / second
```

This excludes unknown allocations inside Three.js, WebGL, the browser and tooling.

## Not run

```txt
npm run check
steady-state allocation fixture
camera-parallax equivalence fixture
scene-transition scratch fixture
hidden/resume fixture
browser heap observation
GC trace
frame-time comparison
production artifact smoke
Pages smoke
```

## Claims not made

No current stutter, garbage-collection pause, heap growth, performance regression, performance improvement, artifact parity, Pages parity or production readiness is claimed.