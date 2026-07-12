# Render audit: Scene copy and visible-stage correlation gap

Timestamp: `2026-07-12T00-01-25-04-00`

## Finding

The Three.js stage and story panel can present different scenes after Continue.

`nextScene()` commits the successor scene, route, stage and hotspot list. `renderUi()` updates the title and buttons, but it only writes `currentScene.openingText` when `#scene-text` is empty or exactly `Loading`. Since an inspection writes hotspot text into that element, the predecessor copy normally survives the transition.

## Current visible-frame sequence

```txt
scene A final inspection
  -> story panel body = scene A hotspot text
  -> stage = scene A

Continue
  -> story panel title = scene B
  -> story panel body = scene A hotspot text
  -> hotspot buttons = scene B
  -> Three.js stage = scene B
  -> debug scene = scene B
```

The browser can therefore submit a visually self-contradictory frame.

## Missing render evidence

```txt
narrative projection revision
story revision
stage revision
scene-plan fingerprint
hotspot-set revision
DOM projection receipt
aria-live receipt
visible frame id
frame acknowledgement
```

## Required render contract

```txt
PreparedVisibleStoryFrame
  sceneId
  storyRevision
  narrativeRevision
  narrativeSourceKind
  narrativeSourceId
  stageRevision
  hotspotSetRevision
  titleText
  bodyText
  interludeState
  frameId
```

## Required commit rule

A successor scene cannot be marked visible or ready until:

```txt
successor story state prepared
successor narrative opening prepared
successor stage resources prepared
successor hotspot list prepared
DOM projection committed
one correlated WebGL frame submitted
frame acknowledgement published
```

## Required fixtures

```txt
final-hotspot-then-continue-shows-successor-opening
predecessor-copy-never-survives-successor-frame
title-body-stage-scene-id-match
hotspot-list-scene-id-match
interlude-close-and-opening-copy-commit-are-atomic
aria-live-announces-one-committed-successor-projection
```

## Deferred render work

This audit does not redesign the shaders, camera, geometry, post-process effects or fixed 16:9 composition. It only defines the identity and commit boundary needed to keep the existing presentation coherent.
