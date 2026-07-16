# Architecture audit: scene-entry narrative projection DSK map

**Timestamp:** `2026-07-16T16-58-39-04-00`

## Summary

Story routing, stage loading, DOM projection and persistence already have bounded responsibilities. The missing boundary is a scene-entry narrative coordinator that decides which copy belongs to the accepted scene revision and binds that copy to the same visible generation as the title, stage and interaction list.

## Plan ledger

**Goal:** define the smallest semantic domain that prevents predecessor story copy from leaking into a successor scene.

- [x] Preserve existing story, stage, UI and persistence ownership.
- [x] Separate route acceptance from narrative-copy selection.
- [x] Define scene-entry identities, results and visible-frame proof.
- [x] Define product-specific DSK surfaces.
- [ ] Implement after contract review.

## Existing ownership

```txt
Story content
  owns scene title, openingText, hotspot text and interlude copy

Story runtime
  owns currentScene, clues, inspection, route and log

Stage
  owns camera, scene graph, materials, hotspots and post settings

UI
  owns scene title, scene paragraph, hotspot buttons, Notebook and modal

Persistence
  owns browser save bytes
```

## Missing parent domain

```txt
the-unmapped-house-scene-entry-narrative-projection-authority-domain
```

The domain coordinates accepted revisions. It does not own authored prose, route meaning, Three.js construction, DOM layout or storage mechanics.

## DSK decomposition

```txt
Identity
  scene-entry-command-kit
  scene-entry-generation-kit
  story-panel-revision-kit

Policy
  scene-entry-copy-policy-kit
  scene-opening-copy-selector-kit

Projection
  scene-title-projection-kit
  scene-opening-text-projection-kit
  hotspot-list-scene-binding-kit
  notebook-scene-entry-projection-kit
  stage-scene-generation-binding-kit

Lifecycle
  interlude-retirement-receipt-kit
  stale-narrative-revision-rejection-kit

Results and proof
  scene-entry-narrative-result-kit
  scene-entry-projection-result-kit
  first-scene-entry-frame-ack-kit
  previous-scene-copy-leak-fixture-kit
  source-artifact-pages-scene-entry-parity-fixture-kit
```

## Command contract

```txt
SceneEntryCommand {
  commandId
  sessionGeneration
  contentRevision
  expectedRouteRevision
  expectedStoryRevision
  expectedStageGeneration
  expectedUiRevision
  fromSceneId?
  toSceneId
  entryReason: boot | transition | resume | reentry
}
```

## Narrative result

```txt
SceneEntryNarrativeResult {
  commandId
  status
  sceneEntryGeneration
  sceneId
  title
  openingText
  notebookEntry?
  copyPolicy
  storyRevision
  uiRevision
}
```

## Projection result

```txt
SceneEntryProjectionResult {
  sceneEntryGeneration
  sceneId
  stageGeneration
  titleProjectionRevision
  textProjectionRevision
  hotspotProjectionRevision
  notebookProjectionRevision
  status
}
```

## Invariants

```txt
accepted scene entry always assigns scene-text deliberately
successor title and predecessor story paragraph may never share an accepted frame
boot, transition, resume and re-entry policies are explicit
inspection copy may persist only within the same scene generation
stale predecessor copy is rejected before projection
FirstSceneEntryFrameAck references one scene-entry generation
```

## Promotion boundary

Keep the scene-copy policy product-specific. Reuse generic revision, projection-result and first-visible-frame primitives from Nexus Engine where available.