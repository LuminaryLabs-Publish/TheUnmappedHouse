# Render audit: stale previous-scene copy visible-frame gap

**Timestamp:** `2026-07-16T16-58-39-04-00`

## Summary

The successor Three.js stage can be rendered with the successor title and hotspot list while the story paragraph still contains the predecessor scene's last hotspot text. The mismatch is created before the RAF frame because scene entry does not deliberately assign narrative copy.

## Plan ledger

**Goal:** require one scene-entry generation across stage and story-panel presentation.

- [x] Trace stage loading, UI projection and RAF ordering.
- [x] Identify the predecessor-copy retention condition.
- [x] Define matching scene and narrative revisions.
- [x] Define first-frame acknowledgement.
- [ ] Add executable visual fixtures.

## Current path

```txt
nextScene()
  -> currentScene = successor
  -> stage.loadScene(successor)
  -> renderUi()
       -> title = successor.title
       -> hotspot list = successor.hotspots
       -> scene-text unchanged when non-empty
  -> next RAF renders successor stage
```

## Visible mismatch

```txt
stage scene ID: successor
title scene ID: successor
hotspot list scene ID: successor
saved scene ID: successor
story paragraph semantic source: predecessor hotspot
```

## Missing proof

```txt
SceneEntryGeneration: absent
StoryTextProjectionRevision: absent
StageSceneBindingResult: absent
SceneEntryProjectionResult: absent
FirstSceneEntryFrameAck: absent
previous-scene-copy leak fixture: absent
source/artifact/Pages frame parity: absent
```

## Required frame contract

A frame may acknowledge scene entry only when the stage, title, story paragraph and interaction list all reference the same accepted scene-entry generation. Inspection copy may replace opening copy afterward, but it must be bound to that same scene generation.