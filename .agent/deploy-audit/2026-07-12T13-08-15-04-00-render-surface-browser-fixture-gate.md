# Deploy audit: render-surface browser fixture gate

**Timestamp:** `2026-07-12T13-08-15-04-00`

## Summary

Static syntax checks cannot prove drawing-buffer dimensions, target allocation, capability fallback, framebuffer completeness, rollback or visible-frame provenance. Browser and deployed Pages fixtures are required.

## Plan ledger

**Goal:** block render-surface safety claims until viewport, DPR, capability and failure matrices pass in real browser contexts.

- [x] Record current syntax-only validation.
- [x] Define local browser fixture matrix.
- [x] Define deployed Pages smoke requirements.
- [ ] Add executable fixtures.
- [ ] Run fixtures against deployed Pages.

## Required local matrix

```txt
390 x 844 at DPR 2
768 x 1024 at DPR 1 and 2
1366 x 768 at DPR 1 and 1.25
1920 x 1080 at DPR 1 and 2
2560 x 1440 at DPR 1 and 2
3840 x 2160 at requested DPR 2
rapid resize burst
portrait-landscape orientation cycle
zero and nonfinite synthetic planner inputs
forced texture-limit fallback
forced renderbuffer-limit fallback
forced sample-limit fallback
forced allocation failure
forced framebuffer-incomplete candidate
```

## Required assertions

```txt
boot uses one admitted allocation path
physical dimensions fit product budget
physical dimensions fit device limits
sample count fits product and device limits
actual dimensions equal committed plan
stale resize generations do not commit
failed candidate preserves predecessor
replaced target retires exactly once
scene remains interactive after resize
first visible frame cites surface revision
public observation is detached and JSON-safe
journal remains bounded
```

## Pages smoke

```txt
load deployed route
record CSS frame, DPR and actual drawing-buffer dimensions
resize through desktop matrix
exercise mobile emulation and orientation
inspect at least one hotspot after each committed resize
advance one scene and verify stage/post output
confirm no blank frame or WebGL error
capture first visible frame receipt for each surface revision
```

## Gate

Do not mark high-DPR support, resize safety, GPU-budget safety or render-surface correctness complete from `npm run check` or a screenshot. Release proof requires real WebGL capability queries, allocation results, rollback behavior and visible-frame correlation.