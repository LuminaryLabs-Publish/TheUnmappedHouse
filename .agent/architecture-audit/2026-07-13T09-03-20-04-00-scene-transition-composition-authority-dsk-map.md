# Architecture audit: scene-transition composition authority DSK map

**Timestamp:** `2026-07-13T09-03-20-04-00`

## Summary

Scene progression crosses five bounded participants but has no coordinating domain. The correct architecture is a composition authority that validates and prepares participant candidates, then commits their revisions together without moving story, rendering, UI or persistence rules into one monolith.

## Plan ledger

**Goal:** define the smallest DSK boundary that closes the partial-transition gap.

- [x] Identify participant ownership.
- [x] Separate bounded domains from coordination.
- [x] Define command, receipts, result and frame acknowledgement.
- [x] Define candidate kits and proof gates.
- [ ] Implement after contract review.

## Existing bounded ownership

```txt
Story domain
  owns current scene, route, clues, inspection and log

Progression domain
  owns completion, interlude and terminal route rules

Stage domain
  owns camera, scene graph, materials, geometry, hotspots and post settings

UI domain
  owns title, story text, hotspot buttons, Notebook and modal projection

Persistence domain
  owns browser save bytes and reset behavior
```

## Missing coordinator

```txt
the-unmapped-house-scene-transition-composition-authority-domain
```

It coordinates participant results. It does not own authored story meaning, Three.js implementation, DOM layout or storage mechanics.

## DSK decomposition

```txt
Identity
  scene-transition-id-kit
  scene-transition-generation-kit
  story-revision-kit
  stage-generation-kit

Admission
  scene-transition-command-kit
  scene-transition-admission-kit
  scene-route-precondition-kit
  scene-descriptor-validation-kit

Preparation
  story-transition-candidate-kit
  stage-transition-candidate-kit
  stage-resource-receipt-kit
  interlude-transition-candidate-kit
  ui-transition-candidate-kit
  save-transition-candidate-kit
  transition-participant-prepare-kit
  transition-participant-receipt-kit

Commit and recovery
  scene-transition-commit-kit
  scene-transition-rollback-kit
  scene-transition-result-kit

Observation and proof
  scene-transition-journal-kit
  scene-transition-observation-kit
  first-scene-frame-ack-kit
  stage-preparation-failure-fixture-kit
  ui-save-failure-fixture-kit
  stale-duplicate-transition-fixture-kit
  browser-pages-scene-transition-smoke-kit
```

## Command contract

```txt
SceneTransitionCommand {
  transitionId
  sessionGeneration
  expectedStoryRevision
  expectedStageGeneration
  expectedUiRevision
  expectedSaveRevision
  fromSceneId
  requestedSuccessorSceneId
  completionEvidence
}
```

## Participant preparation receipt

```txt
SceneParticipantReceipt {
  transitionId
  participantId
  predecessorRevision
  candidateRevision
  candidateFingerprint
  status
  failureReason?
}
```

## Terminal result

```txt
SceneTransitionResult {
  transitionId
  status
  fromSceneId
  toSceneId?
  storyRevision
  stageGeneration
  uiRevision
  saveRevision
  participantReceipts
  rollbackReceipt?
}
```

## Commit ordering

```txt
validate route and descriptor
  -> prepare all detached participants
  -> verify receipts and fingerprints
  -> adopt one aggregate revision
  -> publish terminal result
  -> release predecessor stage resources
  -> render accepted generation
  -> publish FirstSceneFrameAck
```

## Invariants

```txt
no live participant mutates during prepare
rejection preserves every predecessor revision
accepted result references one coherent participant set
rollback is terminal and evidence-bearing
predecessor stage resources remain valid until successor adoption
save revision cannot advance independently of story and stage
visible frame cannot acknowledge an unaccepted transition
```

## Promotion boundary

Keep this product-specific until a second project demonstrates the same story-stage-UI-save aggregate. Reuse generic transaction, revision, receipt and visible-frame primitives from Nexus Engine where available.