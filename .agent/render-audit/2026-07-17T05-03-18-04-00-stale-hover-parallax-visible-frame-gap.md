# Render audit: stale hover and parallax visible-frame gap

**Timestamp:** `2026-07-17T05-03-18-04-00`

## Finding

`handlePointer()` is the only path that changes `hovered`, hides or shows `#hover-label`, positions its text and updates the `mouse` vector used by camera parallax. The canvas has no leave/cancel listener, and `loadScene()` does not clear those fields.

```txt
hover hotspot
  -> label becomes visible
  -> mouse x/y becomes non-zero
  -> pointer leaves canvas or scene changes
  -> no pointer projection retirement
  -> label and parallax remain eligible for later frames
```

## Visible risks

- A hotspot label can remain visible after the pointer is outside the stage.
- A predecessor-scene hotspot label can survive scene replacement.
- The fixed camera can remain offset toward the last pointer position after the pointer is no longer present.
- DOM hover projection and the rendered camera frame can represent stale evidence from different scene or pointer generations.

## Required frame contract

```txt
accepted pointer sample
  -> hover/parallax generation
  -> matching frame commit

pointer retirement
  -> hide hover label
  -> clear hover target
  -> neutralize parallax target
  -> render matching neutral frame
  -> FirstNeutralPointerFrameAck
```

## Proof gate

The audit is complete when browser fixtures prove label visibility and camera offset converge after mouseleave, pointercancel, window blur, document hidden and scene transition, with the same result from source, built artifact and Pages.