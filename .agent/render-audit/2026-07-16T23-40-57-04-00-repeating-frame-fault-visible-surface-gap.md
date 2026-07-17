# Render audit: repeating frame fault visible-surface gap

**Timestamp:** `2026-07-16T23-40-57-04-00`  
**Status:** `audited`

## Finding

`StageKit.animate()` requests the next frame before updating the camera, material uniforms, offscreen target or post pass. A failure after that request does not own the next visible state.

```txt
request successor RAF
  -> camera update
  -> material update
  -> render target pass
  -> post pass
```

If a render phase throws:

```txt
current visible canvas: last successful frame or browser-defined partial state
next callback: already scheduled
fault UI: absent
renderer health result: absent
safe frame acknowledgement: absent
```

## Visible risks

- The last successful scene can remain frozen while faults continue.
- Repeated callbacks can repeatedly throw without producing a stable fallback.
- A renderer or target generation can remain logically active after it is unusable.
- Input and story mutation can continue without a matching frame.
- No visible restart state is bound to the failed generation.

## Required render contract

```txt
FrameAttemptResult
  -> RenderFaultResult when a render phase fails
  -> retire or quarantine the renderer generation
  -> present one bounded safe fallback
  -> publish FirstSafeFaultFrameAck
```

## Proof rows

```txt
offscreen-target throw
post-pass throw
last-good-frame retention policy
fault-overlay projection
repeated-fault deduplication
restart-to-first-recovered-frame
source/build/Pages parity
```

No visual failure was reproduced and rendering code was not changed.