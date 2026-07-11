# Gameplay audit: Resize reallocation and visible story loop

Timestamp: `2026-07-11T17-10-50-04-00`

## Goal

Keep the story interaction loop available while display changes are admitted, prepared, committed, or rejected.

## Current loop

```txt
player inspects scene
  -> browser window resizes, zoom changes, or display DPR changes
  -> resize callback synchronously mutates CSS frame
  -> renderer drawing buffer reallocates
  -> multisampled post target reallocates
  -> RAF continues without a resize transaction barrier
  -> next frame may stall, fail, or render at an unreported resolution
  -> story state remains live but no projection result explains surface status
```

## Gameplay impact

The project is not a resolution benchmark, but its point-and-click loop depends on stable frame geometry and picking. Unbounded or failed reallocations can interrupt:

```txt
hotspot hover feedback
raycast click feedback
camera parallax
interlude projection
Continue presentation
story/debug panel correlation
```

A resize is therefore not merely visual configuration. It is a runtime command that affects the input surface and visible acknowledgement of story mutations.

## Required rule

```txt
During candidate preparation:
  predecessor surface remains interactive and visible

At commit:
  CSS frame, picking geometry, camera projection, renderer buffer and post target switch together

On failure:
  predecessor surface remains committed
  story state does not change
  a typed fallback or failure result is published
```

## Required fixture rows

```txt
resize-does-not-drop-hotspot-ingress
failed-resize-keeps-predecessor-frame
fallback-resolution-keeps-fixed-composition
click-after-resize-uses-committed-frame-geometry
interlude-remains-visible-across-resize
continue-after-resize-references-current-stage-epoch
story-state-unchanged-by-surface-failure
```
