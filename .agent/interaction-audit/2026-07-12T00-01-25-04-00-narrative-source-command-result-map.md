# Interaction audit: Narrative source command and result map

Timestamp: `2026-07-12T00-01-25-04-00`

## Current command paths

```txt
canvas or side-panel hotspot activation
  -> inspectHotspot(hotspot descriptor)
  -> direct #scene-text write
  -> story mutation
  -> save

completion timeout
  -> showInterlude(scene descriptor)
  -> direct interlude DOM writes

Continue button
  -> nextScene()
  -> direct story mutation
  -> stage replacement
  -> partial UI projection
  -> save
```

No path returns a typed narrative result. Callers pass mutable descriptors and write DOM state directly.

## Proposed command envelopes

```txt
ProjectSceneOpeningCommand
  commandId
  sessionId
  sceneId
  storyRevision

ProjectHotspotCopyCommand
  commandId
  sessionId
  inspectionResultId
  sceneId
  hotspotId
  storyRevision

ProjectCompletionCopyCommand
  commandId
  sessionId
  completionProofId
  sceneId
  storyRevision

ProjectTerminalCopyCommand
  commandId
  sessionId
  terminalResultId
  sceneId
  storyRevision
```

## Proposed result

```txt
NarrativeProjectionResult
  commandId
  status
  reason
  projectionId
  projectionRevision
  sceneId
  sourceKind
  sourceId
  storyRevision
  persistenceDisposition
  frameAcknowledgementPending
```

Supported statuses:

```txt
accepted
rejected
stale
conflict
duplicate
failed
rolled-back
```

## Admission rules

```txt
scene id resolves through the admitted manifest
source id belongs to the scene
story revision matches the current authority
inspection or completion result is accepted and unconsumed
terminal source is valid only in terminal phase
predecessor-session commands are rejected
replayed command ids return cached results without duplicate projection
```

## Projection rules

```txt
prepare narrative state without DOM mutation
commit narrative state with owning story transaction
project committed state through one DOM adapter
acknowledge the first visible correlated frame
publish detached observation
```

## Parity requirement

Canvas hotspot activation and side-panel activation must produce the same canonical inspection result and therefore the same narrative projection shape. Neither path may pass a complete mutable hotspot descriptor into narrative authority.
