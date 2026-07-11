# Interaction audit: Continue command admission map

Timestamp: `2026-07-10T22-21-17-04-00`

## Current input paths

```txt
canvas click
  -> StageKit.pick()
  -> hotspot descriptor object
  -> inspectHotspot(hotspot)

side-panel button
  -> captured hotspot descriptor object
  -> inspectHotspot(hotspot)

Continue button
  -> nextScene()

KeyR
  -> remove save key
  -> reload page
```

## Current admission behavior

Inspection and Continue are function calls, not typed commands. They contain no request id, expected story phase, expected scene, source fingerprint or state revision.

Continue has no explicit checks for:

```txt
scene completion
interlude readiness
interlude visibility
current source identity
current scene identity
expected state revision
duplicate request id
transition already in flight
terminal state
stage commit availability
```

The UI normally hides Continue behind the interlude overlay, but DOM visibility is presentation, not command authorization.

## Canonical commands

```txt
InspectHotspot
  requestId
  sceneId
  hotspotId
  sourceFingerprint
  expectedPhase
  expectedStateRevision
  inputKind: raycast | side_panel

ContinueStory
  requestId
  sceneId
  sourceFingerprint
  expectedPhase
  expectedStateRevision
```

## Admission results

```txt
accepted
rejected: unknown_scene
rejected: unknown_hotspot
rejected: source_mismatch
rejected: stale_state
rejected: wrong_phase
rejected: incomplete_scene
rejected: interlude_not_ready
rejected: transition_in_flight
no_op: already_inspected
no_op: duplicate_request
no_op: already_terminal
failed: stage_transition_failed
```

## Input normalization rule

Raycast and side-panel inputs should resolve to the same canonical `{sceneId, hotspotId}` source reference before mutation. Raw descriptor objects and Three.js meshes should not cross into the story reducer.

## Journal requirement

Retain bounded JSON-safe rows for:

```txt
command admitted/rejected
story reducer result
completion proof
interlude phase transition
stage transition child result
save write result
terminal result
```

## Required fixtures

```txt
raycast-and-button-produce-equivalent-inspect-commands
unknown-hotspot-rejected
stale-scene-inspection-rejected
repeat-inspection-no-op
continue-before-completion-rejected
continue-before-readiness-rejected
continue-from-open-accepted
second-continue-no-op
stage-failure-returned-to-parent-result
```
