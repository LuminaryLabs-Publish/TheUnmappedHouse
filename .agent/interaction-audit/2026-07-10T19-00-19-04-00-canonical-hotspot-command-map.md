# Interaction audit: canonical hotspot command map

Timestamp: `2026-07-10T19-00-19-04-00`

## Current input paths

### Side panel

```txt
renderUi creates one button per currentScene.hotspots entry
  -> closure captures full hotspot descriptor
  -> click calls inspectHotspot(hotspot)
```

### Raycast

```txt
StageKit.createHotspot stores full descriptor in mesh.userData.hotspot
  -> click raycast retrieves descriptor
  -> onHotspot callback calls inspectHotspot(hotspot)
```

Both paths bypass an explicit command boundary and pass mutable source-owned objects into story mutation.

## Missing command fields

```txt
commandId
inputOrigin
manifestId
sourceFingerprint
requestedSceneId
requestedHotspotId
activeSceneId
storySequence
stageSceneEpochId
```

## Proposed request

```txt
InspectHotspotCommand {
  commandId,
  inputOrigin: "side_panel" | "raycast",
  sourceFingerprint,
  sceneId,
  hotspotId,
  stageSceneEpochId?,
  issuedAtSequence
}
```

## Proposed resolver sequence

```txt
validate command shape
  -> verify source fingerprint
  -> verify scene exists
  -> verify scene is active
  -> verify hotspot exists within scene
  -> verify optional stage epoch is current
  -> resolve immutable hotspot descriptor
  -> apply pure story transition
  -> emit typed result and effect intents
```

## Proposed result

```txt
InspectHotspotResult {
  commandId,
  inputOrigin,
  sourceFingerprint,
  sceneId,
  hotspotId,
  status,
  reason,
  repeated,
  grantedClueIds,
  logEntry,
  completionProofId?,
  beforeStateFingerprint,
  afterStateFingerprint
}
```

## Stable statuses

```txt
accepted
repeated
rejected
no_op
repaired
```

## Stable reasons

```txt
accepted_first_inspection
accepted_repeat_read
rejected_invalid_command
rejected_stale_source
rejected_unknown_scene
rejected_wrong_active_scene
rejected_unknown_hotspot
rejected_stale_stage_epoch
repaired_save_before_command
```

## Parity requirement

Side-panel and raycast commands must produce identical state transitions for the same canonical scene/hotspot pair. The only expected difference is `inputOrigin` and optional stage-epoch correlation.

## Required fixtures

```txt
side-panel first inspection accepted
raycast first inspection accepted
side-panel/raycast transition parity
repeat read result stable
wrong scene rejected
unknown hotspot rejected
stale source rejected
stale stage epoch rejected
input origin retained
live descriptor object not required
result JSON-safe and deterministic
```

## Constraint

Keep current button labels, hover behavior, click behavior, text copy and visual hotspot volumes unchanged.
