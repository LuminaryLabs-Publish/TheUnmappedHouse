# Render audit: Admitted-state and visible-scene coherence gap

**Timestamp:** `2026-07-13T19-58-19-04-00`

## Summary

The visible scene is selected through a fallback that is independent from durable state repair. An unknown saved `sceneId` can therefore display the first authored scene while the in-memory and rewritten save document retains the unknown identifier.

## Plan ledger

**Goal:** require the first visible stage, story panel and Notebook to cite the exact canonical state admitted during startup.

- [x] Trace saved scene resolution into `StageKit.loadScene()`.
- [x] Trace Notebook projection and immediate save rewrite.
- [x] Identify missing state, manifest and frame provenance.
- [ ] Add a visible-state envelope and executable mismatch fixtures.

## Current path

```txt
parsed state.sceneId
  -> scenes.find(...)
  -> unknown ID falls back to scenes[0] for currentScene only
  -> StageKit loads scenes[0]
  -> UI reports currentScene.id
  -> saveState serializes the original invalid state.sceneId
```

## Missing provenance

```txt
StorySchemaVersion
StoryManifestFingerprint
StoryStateRevision
StoryStateFingerprint
AdmittedSceneId
StageSceneGeneration
UiProjectionRevision
NotebookProjectionRevision
FirstAdmittedStoryFrameAck
```

## Required visible envelope

```txt
AdmittedStoryFrameEnvelope
  startupGeneration
  schemaVersion
  manifestFingerprint
  storyStateRevision
  canonicalStateFingerprint
  sceneId
  stageGeneration
  uiRevision
  notebookRevision
  frameSequence
```

## Required proof

```txt
unknown saved scene ID never produces a mismatched durable/visible state
migrated state projects the migrated scene only
quarantined state projects the canonical initial scene
stage, UI and Notebook cite one admitted state revision
immediate persistence writes only the canonical admitted document
first visible acknowledgement matches the adopted scene generation
```

No render implementation changed during this audit.