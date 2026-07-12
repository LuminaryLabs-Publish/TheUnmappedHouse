# Validation: The Unmapped House

**Timestamp:** `2026-07-12T13-08-15-04-00`

## Summary

This run changed documentation only. Source inspection proves that `StageKit` performs a fixed-design renderer and multisampled-target allocation before the first live resize, then reallocates both surfaces from CSS viewport dimensions and capped DPR without a product pixel budget, WebGL capability admission, allocation readback, commit/rollback result or visible-frame receipt.

## Plan ledger

**Goal:** distinguish source-backed render-surface findings from runtime safety claims that require executable browser proof.

- [x] Inspect renderer and target construction.
- [x] Inspect aspect-frame and resize calculations.
- [x] Confirm DPR is capped at two.
- [x] Confirm total pixels and samples are not budgeted.
- [x] Confirm WebGL texture, renderbuffer and sample limits are not admitted.
- [x] Confirm actual allocation dimensions and framebuffer status are not read back.
- [x] Confirm resize has no revision, rollback or frame acknowledgement.
- [x] Document pure and browser fixture requirements.
- [ ] Execute fixtures after implementation.

## Proven from source

```txt
design width is 1920
design height is 1080
renderer antialias is enabled
requested DPR is capped at 2
renderer is initially sized to design dimensions
offscreen target is initially sized to design dimensions multiplied by DPR
offscreen target requests two samples
constructor calls resize after initial allocation
resize uses innerWidth and innerHeight through fixed-aspect calculation
resize resizes both renderer and offscreen target
no product pixel or sample budget exists
no WebGL capability query exists
no allocation readback exists
no framebuffer-completeness result exists
no surface id or revision exists
no resize generation or stale rejection exists
no commit, rollback or retirement receipt exists
no visible-frame surface acknowledgement exists
```

## Quantified source-derived cases

```txt
1920 x 1080 CSS at DPR 2
  physical dimensions: 3840 x 2160
  pixels per surface: 8,294,400

3840 x 2160 CSS at DPR 2
  physical dimensions: 7680 x 4320
  pixels per surface: 33,177,600
  offscreen color sample positions at samples 2: 66,355,200
```

These counts exclude depth, resolve storage, the default framebuffer and implementation overhead.

## Existing checks prove

```txt
src/aspect-frame.js parses
src/game.js parses
src/stage-kit.js parses
src/story-data.js parses
```

## Existing checks do not prove

```txt
bounded surface planning
WebGL capability admission
mobile startup allocation behavior
DPR fallback policy
multisample fallback policy
actual drawing-buffer dimensions
actual target dimensions
framebuffer completeness
atomic renderer/target commit
allocation rollback
predecessor retirement
rapid resize coalescing
first visible frame provenance
```

## Change boundary

```txt
runtime source changed: no
story content changed: no
renderer behavior changed: no
surface allocation behavior changed: no
DPR policy changed: no
multisample policy changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check: not run
browser smoke: not run
Pages smoke: not run
```

## Required fixtures

```txt
fixture:boot-single-admitted-allocation
fixture:mobile-no-fixed-design-preallocation
fixture:pixel-budget-downscale
fixture:texture-limit-admission
fixture:renderbuffer-limit-admission
fixture:sample-limit-admission
fixture:invalid-dimensions-rejected
fixture:stale-resize-rejected
fixture:rapid-resize-coalescing
fixture:allocation-failure-rollback
fixture:framebuffer-incomplete-rollback
fixture:predecessor-target-retired-once
fixture:actual-dimensions-match-plan
fixture:first-visible-frame-surface-revision
smoke:browser-dpr-resize-matrix
smoke:pages-dpr-resize-matrix
```

## Current result

```txt
render-surface authority implemented: no
bounded pixel budget proven: no
capability admission proven: no
atomic commit and rollback proven: no
resource retirement proven: no
first visible surface frame proof: no
```

No high-DPR safety, allocation safety, resize correctness, framebuffer completeness or deployment-readiness claim is made.