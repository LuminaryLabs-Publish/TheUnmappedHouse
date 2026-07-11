# Interaction audit: Continue admission and stale timer map

Timestamp: `2026-07-11T01-38-28-04-00`

## Current input paths

```txt
side-panel button click
  -> inspectHotspot(live hotspot descriptor)

stage canvas click
  -> raycast live hotspot mesh
  -> inspectHotspot(live hotspot descriptor)

Continue button click
  -> nextScene()

KeyR
  -> localStorage.removeItem
  -> location.reload
```

## Missing canonical commands

```txt
InspectHotspot
ContinueStory
ResetStory
InterludeDeadlineReached
```

Current callbacks carry no request id, input origin, expected scene, expected phase, expected save revision or runtime epoch.

## Continue admission matrix

| Current phase | Continue result |
|---|---|
| `exploring` | reject `scene-not-complete` or `wrong-phase` |
| `interlude_pending` | reject `interlude-not-ready` |
| `interlude_open` | admit once when completion proof, scene and revision match |
| `transitioning` | reject or return duplicate in-flight result |
| `recovering` | reject until recovery resolves |
| `terminal` | return idempotent terminal no-op |

## Timer admission matrix

A deadline callback is accepted only when all match:

```txt
runtimeEpoch
expectedSaveRevision
targetSceneId
storyPhase == interlude_pending
completionProof.sceneId == targetSceneId
now >= interludeReadyAt
```

Any mismatch produces a typed stale/no-op result and no DOM mutation.

## Required command result

```txt
{
  commandId,
  type,
  origin,
  accepted,
  status,
  reason,
  previousSaveRevision,
  nextSaveRevision,
  previousPhase,
  nextPhase,
  sceneId,
  effects[]
}
```

## Required interaction proof

```txt
button-and-raycast-inspect-normalize-identically
already-inspected-command-idempotent
Continue-hidden-path-rejected
Continue-pending-path-rejected
Continue-open-path-accepted-once
duplicate-Continue-same-result
stale-Continue-scene-rejected
stale-Continue-revision-rejected
stale-timer-rejected-without-overlay
reset-cancels-timer-before-reload
```

## Projection rule

Buttons and overlays are projections of committed command/phase results. They must not be the authority that decides whether an action is valid.
