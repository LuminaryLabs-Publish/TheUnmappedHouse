# Interaction audit: pointer presence command/result map

**Timestamp:** `2026-07-17T05-03-18-04-00`

## Current path

```txt
mousemove
  -> mutate pointer vector
  -> mutate parallax mouse vector
  -> raycast
  -> mutate hovered
  -> mutate hover-label DOM

mouseleave / pointercancel / blur / hidden / scene replacement
  -> no command
  -> no result
  -> no projection settlement
```

## Required commands

### `PointerSampleAdmissionCommand`

Inputs:

```txt
PointerSessionId
PointerGeneration
SceneGeneration
ViewportRevision
client coordinates
sample timestamp
```

Results:

```txt
PointerSampleAccepted
PointerSampleRejectedStale
PointerSampleRejectedOutside
PointerSampleRejectedInvalidViewport
```

### `PointerPresenceRetirementCommand`

Inputs:

```txt
expected PointerGeneration
retirement reason
expected SceneGeneration
```

Results:

```txt
PointerPresenceRetired
PointerPresenceAlreadyRetired
PointerPresenceRejectedStale
PointerPresenceRetirementFailed
```

### `PointerProjectionCommitCommand`

Results:

```txt
PointerProjectionCommittedHover
PointerProjectionCommittedNeutral
PointerProjectionRejectedStale
FirstNeutralPointerFrameAcknowledged
```

## Arbitration

Scene replacement, canvas leave, pointer cancellation, window blur and document hiding all retire the same pointer generation. The first accepted retirement wins; duplicates are idempotent. New samples require a fresh active generation.