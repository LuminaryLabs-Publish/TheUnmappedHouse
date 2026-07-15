# Next steps: The Unmapped House motion preference and visual-effect admission

**Timestamp:** `2026-07-15T02-59-31-04-00`  
**Status:** `audited`

## Summary

The smallest safe change is one motion-profile resolver that controls shader animation, post-process motion, camera parallax and interlude transitions without changing story progression.

## Plan ledger

**Goal:** provide a coherent reduced-motion projection while retaining the authored scene composition and interaction loop.

- [ ] Define `MotionPreferenceProfile` with `FullMotion` and `ReducedMotion`.
- [ ] Resolve an explicit user override before falling back to `prefers-reduced-motion`.
- [ ] Persist only the explicit override, not the system-derived value.
- [ ] Listen for system-preference changes when no explicit override is active.
- [ ] Define `MotionProfileRevision` and command identity.
- [ ] Register stage materials, post material, camera parallax and CSS transition as motion participants.
- [ ] In reduced motion, freeze or remove time-driven stage drift.
- [ ] In reduced motion, remove animated warp, grain and scan-line movement.
- [ ] In reduced motion, disable pointer-driven camera displacement.
- [ ] In reduced motion, remove or substantially shorten interlude transition motion.
- [ ] Preserve static vignette, color grading and scene readability where safe.
- [ ] Reject stale and superseded profile work.
- [ ] Publish `MotionPreferenceAdmissionResult`.
- [ ] Publish `FirstMotionMatchedFrameAck`.
- [ ] Add browser, artifact and Pages parity fixtures.

## Ordered implementation

### 1. Resolve preference

Create one resolver that combines explicit product preference and `matchMedia("(prefers-reduced-motion: reduce)")`.

### 2. Describe participants

Give each time-driven or transition-driven surface a stable identity and a full/reduced policy.

### 3. Adopt atomically

Prepare all values first, then commit shader, post, parallax and transition policy together. Preserve the prior profile if any participant cannot adopt.

### 4. Observe changes safely

Use one media-query listener generation. Remove or supersede it during lifecycle retirement and explicit-setting changes.

### 5. Prove behavior

Test initial full motion, initial reduced motion, live system changes, explicit override, scene transition, page restore and deployed Pages output.

## Do not combine yet

Keep story announcements, focus/route admission, page lifecycle, save schema, WebGL recovery, viewport, hotspot picking and resource lifecycle as retained independent authorities.
