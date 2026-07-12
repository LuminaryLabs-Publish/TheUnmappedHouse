# Story state and visible frame correlation gap

Timestamp: `2026-07-12T03-21-27-04-00`

## Summary

The story panel and notebook can advance before the visible canvas has rendered the same accepted state.

## Plan ledger

**Goal:** require every public visual claim to cite one committed two-pass frame.

- [x] Trace DOM/debug projection.
- [x] Trace stage-target and post/default-framebuffer passes.
- [x] Confirm no shared frame receipt exists.
- [ ] Implement correlation and browser evidence.

## Current split

```txt
game.js
  -> renderUi()
  -> DOM and debug JSON update synchronously

stage-kit.js
  -> requestAnimationFrame
  -> stage pass to WebGLRenderTarget
  -> post pass to default framebuffer
  -> no receipt
```

## Concrete consequence

After `nextScene()`, the title, hotspot buttons, route and debug JSON can identify the successor scene before a successor canvas frame is submitted. After inspection, completion can be true in the notebook without a frame that cites the accepted inspection result.

## Missing render evidence

```txt
frame id
input snapshot id
stage-pass result
post-pass result
target identity
canvas acknowledgement
scene-resource generation
surface revision
context generation
camera revision
visible story revision
```

## Required proof

A browser screenshot, notebook/debug observation and story result must all cite the same committed frame id and revisions.
