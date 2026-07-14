# Deploy audit: focus and route browser fixture gate

**Timestamp:** `2026-07-14T17-00-55-04-00`  
**Status:** `audited`

## Summary

Syntax checks and static delivery cannot detect focus-order route bypass, modal background interaction or screen-reader semantics. Release evidence needs a real browser matrix.

## Plan ledger

**Goal:** prevent source, built artifact or Pages deployment from shipping an interaction state that visually hides controls while leaving them executable.

- [x] Identify the current syntax-only proof boundary.
- [x] Define source, artifact and deployed-origin fixtures.
- [ ] Implement fixtures and gate deployment.

## Required fixtures

```txt
source origin
  initial tab order excludes hidden Continue
  premature Continue activation rejected
  completed interlude receives focus
  background controls inert while open
  successor focus restored

production artifact
  same command and focus results
  same semantic dialog state
  matching route and frame revisions

GitHub Pages origin
  keyboard-only route completion
  screen-reader dialog naming
  no background inspection during interlude
  terminal route focus policy
```

## Required evidence

```txt
fixture source revision
artifact hash
origin URL
browser and accessibility-engine versions
command result log
focus trace
route trace
first focus-stable frame capture
```

No workflow or deployment behavior changed.