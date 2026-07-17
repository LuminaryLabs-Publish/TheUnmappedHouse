# Pointer presence audit: hover and parallax retirement contract

**Timestamp:** `2026-07-17T05-03-18-04-00`

## Contract

One pointer generation is active only while its stage, scene and viewport generations remain accepted and the pointer remains present.

```txt
active
  -> enter or move samples may update hover and parallax
  -> click may consume the accepted pick result

retiring
  -> leave, cancel, blur, hidden document or scene replacement wins once
  -> new samples from the predecessor are rejected
  -> hover target becomes null
  -> hover label becomes hidden
  -> parallax target becomes neutral

retired
  -> no predecessor sample may reactivate the projection
  -> a new active generation requires explicit admission
```

## Required identities

```txt
PointerSessionId
PointerGeneration
PointerSampleId
SceneGeneration
ViewportRevision
HoverTargetGeneration
ParallaxTargetGeneration
PointerRetirementId
PointerProjectionDigest
```

## Retirement reasons

```txt
canvas-leave
pointer-cancel
window-blur
document-hidden
scene-replacement
runtime-retirement
```

## Invariants

1. A visible hover label always names a hotspot in the active scene generation.
2. A retired pointer generation cannot change hover or parallax state.
3. Scene replacement retires predecessor hover and parallax before the successor frame commits.
4. The neutral camera target is deterministic.
5. Duplicate retirement is idempotent.
6. `FirstNeutralPointerFrameAck` binds the hidden label and neutral camera to one rendered frame.

## Smallest implementation ledge

Add one `retirePointerPresence(reason)` path inside `StageKit`, call it from canvas leave/cancel, window blur, document visibility loss and before `loadScene()` replaces scene content. Keep click dispatch and story mutation unchanged.