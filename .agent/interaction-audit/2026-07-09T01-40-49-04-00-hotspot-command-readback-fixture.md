# Interaction Audit — Hotspot Command Readback Fixture

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Generated:** `2026-07-09T01-40-49-04-00`

## Current interaction authority

Hotspot interaction is split visually and semantically:

```txt
StageKit:
  owns pointer movement, raycast picking, hovered hotspot, hover label, click dispatch.

src/game.js:
  owns what a hotspot click means.
```

Current command path:

```txt
button click or StageKit click
  -> inspectHotspot(hotspot)
  -> check state.inspected[currentScene.id][hotspot.id]
  -> write text
  -> grant clues
  -> write notebook log
  -> check scene completion
  -> maybe schedule interlude
  -> render UI
  -> save state
```

## Interaction gaps

```txt
- There is no StoryCommandEnvelope for inspect hotspot.
- Repeat inspection is a branch inside inspectHotspot, not a no-mutation result.
- Unknown hotspot behavior is not represented in a rejected command row.
- Clue grants are not emitted as a delta record.
- Scene completion is not emitted as a result or event record.
- Interlude scheduling is not represented as a projection.
- Save intent is triggered directly after UI mutation.
- The host cannot read back what command it consumed.
```

## Required command results

```txt
story.inspect_hotspot / first unseen hotspot:
  status: accepted
  reason: hotspot_inspected
  mutation: true
  events: hotspot_inspected, clue_granted, maybe scene_completed

story.inspect_hotspot / repeat hotspot:
  status: no_mutation
  reason: hotspot_repeated
  mutation: false
  events: hotspot_repeated

story.inspect_hotspot / unknown hotspot:
  status: rejected
  reason: hotspot_unknown
  mutation: false
  events: rejected

story.continue_scene / incomplete scene:
  status: rejected
  reason: scene_incomplete
  mutation: false

story.continue_scene / complete scene:
  status: accepted
  reason: scene_transitioned
  mutation: true

story.continue_scene / no next scene:
  status: terminal
  reason: prototype_complete
  mutation: false
```

## Adapter readback target

```txt
StoryCommandResult
  -> StoryProjection.text
  -> StoryProjection.hotspotButtons
  -> StoryProjection.notebook
  -> SaveProjection
  -> InterludeProjection
  -> StageProjection
  -> StoryBrowserAdapterPlan
  -> BrowserAdapterReadback
```

## Fixture rows needed

```txt
inspect_first_hotspot
repeat_hotspot
unknown_hotspot
scene_incomplete_continue
complete_library_scene
continue_to_hallway
complete_full_route
prototype_complete_continue
save_state
reset_save
browser_adapter_readback
GameHost_projection
```

## Do not change yet

```txt
hotspot positions
hotspot sizes
StageKit raycast behavior
button layout
story text
hover labels
fixed frame behavior
```
