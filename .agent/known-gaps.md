# Known gaps: The Unmapped House

**Timestamp:** `2026-07-12T13-08-15-04-00`

## Summary

The newest documented gap is render-surface resolution authority. The renderer and multisampled offscreen target are allocated first at the fixed design size and then again from the live aspect frame. DPR is capped at `2`, but total pixels, sample count and WebGL capabilities are not admitted through a product budget or atomic transaction.

## Plan ledger

**Goal:** prevent unsupported or excessive renderer and target allocations from producing mixed surfaces, allocation spikes, incomplete framebuffers or unproven visible output.

- [x] Trace constructor and resize allocation paths.
- [x] Confirm fixed-design allocation occurs before live viewport sizing.
- [x] Confirm DPR is capped but total pixels are unbounded.
- [x] Confirm multisampling is fixed at two samples without capability admission.
- [x] Confirm WebGL limits and framebuffer completeness are not queried.
- [x] Confirm resize has no generation, commit or rollback result.
- [x] Define browser and Pages proof requirements.
- [ ] Implement and execute the render-surface authority.

## Planning and admission gaps

```txt
surface id: absent
surface revision: absent
viewport observation id: absent
resize generation: absent
requested versus applied DPR: absent
render-scale policy: absent
product pixel budget: absent
multisample budget: absent
MAX_TEXTURE_SIZE admission: absent
MAX_RENDERBUFFER_SIZE admission: absent
MAX_SAMPLES admission: absent
fallback quality tiers: absent
stale resize rejection: absent
```

## Allocation and lifecycle gaps

```txt
fixed-design startup allocation before live viewport: present
immediate second allocation during constructor resize: present
atomic renderer/target prepare: absent
actual drawing-buffer readback: absent
actual target-dimension readback: absent
framebuffer-completeness result: absent
allocation failure classification: absent
predecessor preservation: absent
rollback result: absent
replaced-target retirement receipt: absent
resize coalescing: absent
```

## Frame and observation gaps

```txt
committed CSS dimensions: absent
committed physical dimensions: absent
committed DPR and sample count: absent
surface plan fingerprint: absent
frame-to-surface revision link: absent
first-visible-surface-frame acknowledgement: absent
detached surface observation: absent
bounded surface journal: absent
```

## Concrete risks

```txt
large 4K/high-DPR viewports can request tens of millions of pixels per surface
samples:2 multiplies offscreen color and depth work without a product budget
narrow mobile viewports can pay a large fixed-design allocation before shrinking
unsupported texture/renderbuffer/sample plans have no typed fallback
rapid resize events can repeatedly reallocate both surfaces
allocation failure can leave renderer and offscreen target on different revisions
visual output cannot prove which surface dimensions produced the frame
```

## Retained upstream and downstream gaps

```txt
StoryManifest and StorySnapshot authorities remain unimplemented
storage revision and cross-tab convergence remain unimplemented
destructive reset admission remains unimplemented
pointer/canvas/side-panel input parity remains unimplemented
inspection and completion proof remain unimplemented
completion timer generation remains unimplemented
modal focus and Continue admission remain unimplemented
atomic Continue transition remains unimplemented
narrative projection remains unrevisioned
runtime callback and scene-resource lifecycle remains unimplemented
WebGL context recovery remains unimplemented
committed-frame diagnostics remain unimplemented
```

## Validation gaps

- `npm run check` is syntax-only.
- No pure planner proves bounded dimensions across viewport and DPR matrices.
- No fixture checks texture, renderbuffer or sample limit rejection.
- No fixture proves constructor boot avoids unnecessary predecessor allocation.
- No fixture proves allocation failure preserves the previous surface.
- No browser smoke reads actual drawing-buffer and target dimensions.
- No Pages smoke correlates the first visible frame with a committed surface revision.

## Completion boundary

Do not claim render-surface safety because the scene appears at one desktop resolution. Completion requires capability-aware bounded planning, actual allocation readback, atomic commit/rollback, resource retirement and browser-visible proof.