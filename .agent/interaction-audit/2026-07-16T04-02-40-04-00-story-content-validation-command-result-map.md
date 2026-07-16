# Interaction audit: story content validation command/result map

**Timestamp:** `2026-07-16T04-02-40-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Status:** `story-content-graph-validation-authority-audited`

## Summary

Interactive buttons and canvas hotspots are currently created from unvalidated content. This map keeps interaction disabled until one content revision is accepted and binds controls to that revision.

## Plan ledger

**Goal:** ensure every interactive control resolves to one valid scene/hotspot identity from the accepted content graph.

- [x] Trace DOM button creation and canvas hotspot creation.
- [x] Trace inspection dispatch to authored hotspot objects.
- [x] Define content validation and adoption commands.
- [x] Define rejection, fallback, and frame acknowledgement results.
- [ ] Implement the command/result boundary.

## Command map

```txt
StoryContentValidationCommand
  input:
    ContentRevision
    StorySchemaVersion
    ValidationPolicyVersion
    raw scenes[]
  result:
    accepted normalized indexes
    or immutable issue list

StoryContentAdoptionCommand
  input:
    accepted validation result
    expected DocumentGeneration
    expected StoryRuntimeRevision
    expected RenderGeneration
  result:
    adopted
    rejected stale
    rejected invalid
    rejected duplicate

ValidatedControlProjectionCommand
  input:
    adopted ContentRevision
    current SceneId
    hotspot index
  result:
    DOM buttons and canvas volumes for the same identities

ValidatedStoryFrameCommand
  input:
    adopted ContentRevision
    projected control revision
    presented frame revision
  result:
    FirstValidatedStoryFrameAck
```

## Interaction invariants

- A DOM inspection button and its canvas volume share one validated `HotspotId`.
- Controls are not created for rejected or stale content.
- Duplicate hotspot IDs are rejected before state or focus ownership exists.
- Continue is enabled only for a reachable, nonterminal scene whose completion requirements are valid.
- Invalid-content fallback remains keyboard and screen-reader operable without WebGL.
- Late results from an older content revision cannot replace current controls.

## Result taxonomy

```txt
StoryContentAccepted
StoryContentRejected
StoryContentAdopted
StoryContentAdoptionRejectedStale
StoryContentAdoptionRejectedInvalid
ValidatedControlsProjected
ValidatedControlsProjectionRejected
FirstValidatedStoryFrameAcknowledged
```
