# Interaction audit: Command to persistence result map

Timestamp: `2026-07-11T00-00-26-04-00`

## Current input paths

```txt
side-panel click
  -> inspectHotspot(hotspot descriptor)

raycast click
  -> StageKit mesh.userData.hotspot
  -> inspectHotspot(hotspot descriptor)

Continue button
  -> nextScene()

KeyR
  -> localStorage.removeItem
  -> location.reload
```

No input path carries request identity, origin, expected scene, expected save revision or a persistence outcome.

## Required normalized commands

```js
{
  type: "InspectHotspot",
  requestId,
  origin: "side-panel" | "raycast",
  sceneId,
  hotspotId,
  expectedSaveRevision,
  storySourceFingerprint
}
```

```js
{
  type: "ContinueStory",
  requestId,
  origin: "interlude-button",
  sceneId,
  expectedPhase,
  expectedSaveRevision,
  storySourceFingerprint
}
```

```js
{
  type: "ResetStory",
  requestId,
  origin: "keyboard",
  expectedSaveRevision,
  storySourceFingerprint
}
```

## Required composed result

```js
{
  requestId,
  commandType,
  accepted,
  reason,
  beforeStateFingerprint,
  afterStateFingerprint,
  beforeSaveRevision,
  afterSaveRevision,
  persistence: {
    attemptId,
    status,
    reason
  },
  stage: {
    requested,
    commitId,
    epoch,
    status
  },
  projection: {
    status
  }
}
```

## Admission rules

- Resolve `sceneId` and `hotspotId` from canonical source data, not live descriptor object identity.
- Reject stale `expectedSaveRevision` before mutation.
- Deduplicate `requestId` before effects.
- Reject Continue unless the committed phase is `interlude_open`.
- Do not report accepted until the required persistence operation succeeds or a named recoverable pending transaction is durably recorded.
- Do not schedule interlude or project the next scene from a failed result.
- Return reset failure without forcing reload.

## Result reasons

```txt
accepted
already-inspected
unknown-hotspot
stale-scene
stale-save-revision
wrong-phase
duplicate-request
storage-unavailable
storage-access-denied
serialization-failed
quota-exceeded
write-failed
clear-failed
stage-prepare-failed
stage-commit-failed
recovery-pending
```

## Required proof rows

```txt
button-and-raycast-produce-equivalent-command
input-origin-retained
stale-save-revision-rejected-before-mutation
duplicate-inspect-produces-one-write-attempt
duplicate-continue-produces-one-transition
failed-write-result-projects-no-success-state
reset-clear-failure-does-not-reload
result-is-json-safe
```