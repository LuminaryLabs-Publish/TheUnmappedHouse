# Architecture audit: Inspection and completion authority

Timestamp: `2026-07-11T12-08-47-04-00`

## Goal

Separate visual observation from story mutation and define one parent domain that owns inspection admission, canonical hotspot resolution, exactly-once state mutation, clue provenance, completion proof, persistence, and typed results.

## Current DSK map

```txt
browser-story-runtime-kit
  -> side-panel button closures
  -> StageKit onHotspot callback
  -> inspectHotspot(full descriptor)

inspection-ledger-kit
  -> scene-keyed hotspot-id booleans

clue-ledger-kit
  -> global clue strings

scene completion policy
  -> currentScene.requiresToComplete.every(global clue lookup)

interlude-timer-kit
  -> anonymous 450 ms timeout

localstorage-save-kit
  -> raw mutable object write
```

## Current ownership failure

```txt
observation payload owns story fields
currentScene owns scene association at callback time
caller descriptor owns clue grants and copy
boolean ledger owns duplicate detection
raw clue strings own completion
anonymous timeout owns interlude timing
localStorage call has no transaction result
```

No single authority can answer:

```txt
Which command was admitted?
Which scene and stage did it target?
Which canonical hotspot was resolved?
Did it mutate exactly once?
Which accepted receipt granted each clue?
Which receipts prove completion?
Was persistence committed?
Which result did the caller receive?
```

## Required parent domain

```txt
the-unmapped-house-inspection-completion-authority-domain
```

## Required kit composition

```txt
story-manifest-index-kit
  canonical scene, hotspot, clue, and requirement lookup

inspection-command-envelope-kit
  commandId, sequence, source, sceneId, hotspotId,
  expectedStoryRevision, expectedStageEpoch, observedFrameId

inspection-command-admission-kit
  session, scene, revision, stage, sequence, and phase checks

hotspot-pick-observation-kit
  id-only pick evidence separated from story mutation

canonical-hotspot-resolution-kit
  resolve admitted sceneId + hotspotId to immutable definition

scene-scoped-inspection-ledger-kit
  immutable receipts rather than booleans

scene-scoped-clue-grant-kit
  canonical clue grants with receipt provenance

scene-completion-proof-kit
  immutable proof from required accepted receipts

completion-proof-consumption-kit
  exactly-once interlude and Continue admission

inspection-transaction-kit
  candidate snapshot, persistence, live commit, projection, rollback

inspection-result-kit
  detached typed command receipt

inspection-journal-kit
  bounded command/result/fingerprint history

inspection-authority-fixture-kit
  deterministic Node proof

browser-dual-ingress-parity-smoke-kit
  side-panel and raycast parity proof
```

## Command boundary

```txt
InspectionCommand {
  commandId,
  inputSequence,
  source,
  sceneId,
  hotspotId,
  expectedStoryRevision,
  expectedStageEpoch,
  observedFrameId?
}
```

Commands must not contain:

```txt
clue grants
story copy
log copy
completion requirements
mutable hotspot descriptors
Three.js objects
DOM nodes
```

## Result boundary

```txt
InspectionResult {
  status,
  commandId,
  sceneId,
  hotspotId,
  storyRevisionBefore,
  storyRevisionAfter,
  inspectionReceiptId?,
  grantedClues[],
  completionProofId?,
  completionProduced,
  persistenceResult?,
  beforeFingerprint,
  afterFingerprint
}
```

## Transaction order

```txt
observe input
  -> construct id-only command
  -> admit identities and revisions
  -> resolve canonical hotspot
  -> detect duplicate or stale work
  -> build candidate receipt and clue grants
  -> derive candidate completion proof
  -> build candidate StorySnapshot
  -> persist candidate
  -> atomically commit story state
  -> project UI/debug/interlude lease
  -> append bounded journal
  -> return immutable result
```

## Dependency constraints

```txt
StoryManifest/index authority must exist before canonical resolution.
StorySnapshot/persistence authority must exist before atomic inspection commit.
Inspection completion proof must exist before Continue admission.
Stage epoch and session generation become required when transition and lifecycle authority land.
```

## Non-goals

```txt
no new story content
no visual redesign
no renderer replacement
no gameplay expansion
no runtime implementation in this pass
```
