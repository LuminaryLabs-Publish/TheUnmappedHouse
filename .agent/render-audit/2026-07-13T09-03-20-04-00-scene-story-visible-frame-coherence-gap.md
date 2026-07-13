# Render audit: scene and story visible-frame coherence gap

**Timestamp:** `2026-07-13T09-03-20-04-00`

## Summary

The visible canvas and story panel can be derived from different transition moments. Stage replacement occurs before UI projection and persistence, while RAF presentation has no scene generation or transition provenance.

## Plan ledger

**Goal:** ensure every visible successor frame proves that story, stage and UI adopted the same accepted transition.

- [x] Trace stage mutation and RAF ordering.
- [x] Trace DOM projection ordering.
- [x] Identify missing frame identity and recovery policy.
- [ ] Implement scene-frame envelopes and fixtures.

## Current projection order

```txt
story state advances
  -> interlude closes
  -> live stage is cleared and rebuilt
  -> UI title/buttons/Notebook update
  -> save bytes update
  -> later RAF renders current stage
```

## Gaps

```txt
TransitionId in render frame: absent
StageGeneration in frame: absent
StoryRevision in frame: absent
UiRevision in frame: absent
scene-frame envelope: absent
first successor frame acknowledgement: absent
last complete frame recovery: absent
partial scene-frame classification: absent
visible diagnostics readback: absent
```

## Required frame envelope

```txt
SceneFrameEnvelope {
  transitionId
  sceneId
  storyRevision
  stageGeneration
  uiRevision
  frameSequence
  viewportRevision
  providerGeneration
}
```

## Required presentation rule

The renderer may present only an accepted stage generation. The DOM may publish only the UI candidate associated with the same accepted transition. `FirstSceneFrameAck` must be emitted after both the canvas and story panel reflect that envelope.

## Failure handling

```txt
stage prepare fails
  -> keep predecessor canvas and UI

UI prepare fails
  -> do not adopt successor stage

post-adoption frame fails
  -> classify presentation failure
  -> retain accepted state result
  -> expose last complete frame and recovery evidence
```

## Proof gate

A screenshot alone is insufficient. The fixture must read back the accepted transition result, canvas scene generation, DOM scene ID and first-frame acknowledgement.