# Render-surface audit: Resolution budget and recovery contract

Timestamp: `2026-07-11T17-10-50-04-00`

## Goal

Define a bounded and recoverable render-surface contract for the fixed 16:9 stage.

## Policy separation

```txt
composition policy
  fixed design aspect: 16:9
  CSS frame: largest contained frame

resolution policy
  internal scale independent from CSS size
  admitted DPR capped by explicit pixel budget
  renderer and post target share one revision

recovery policy
  predecessor remains committed during preparation
  allocation failure steps down through declared tiers
  failure after all tiers leaves predecessor active
```

## Candidate quality tiers

Exact values remain implementation policy, but every tier must declare:

```txt
tierId
maxDpr
maxLongEdge
maxPixelCount
samples
postEnabled
fallbackTierId?
```

## Commit protocol

```txt
1. Capture display observation.
2. Reserve resize generation and candidate surface revision.
3. Derive CSS frame.
4. Select the highest admissible resolution tier.
5. Prepare candidate renderer/target storage without releasing predecessor authority.
6. Verify actual dimensions and target texture binding.
7. Commit frame, camera, renderer and target as one revision.
8. Render and acknowledge one visible frame.
9. Retire superseded storage.
10. Publish detached observation and bounded journal row.
```

## Failure protocol

```txt
candidate allocation failure
  -> classify capability | memory | context | unknown
  -> retire partial candidate resources
  -> attempt declared fallback tier
  -> commit only a fully prepared tier
  -> otherwise preserve predecessor surface
  -> publish typed failure without changing story state
```

## Required invariant

No diagnostics, UI, or gameplay system may claim a new render size from requested values. Only read-back actual dimensions from a committed surface revision are authoritative.