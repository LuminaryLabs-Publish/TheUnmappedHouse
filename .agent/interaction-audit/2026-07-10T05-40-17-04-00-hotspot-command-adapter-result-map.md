# Interaction Audit: Hotspot Command Adapter Result Map

**Timestamp:** `2026-07-10T05-40-17-04-00`

## Current interaction paths

```txt
side-panel button
  -> inspectHotspot(hotspot)

StageKit raycast click
  -> onHotspot(hotspot)
  -> inspectHotspot(hotspot)

Continue button
  -> nextScene()

KeyR
  -> localStorage.removeItem(SAVE_KEY)
  -> location.reload()
```

## Current issue

`inspectHotspot()` mutates and projects directly.

Repeat inspection is treated as a side-effect path, not as a typed `no_mutation` result.

Unknown or stale hotspot commands do not have stable rejection rows.

## Required result map

```txt
inspect hotspot first time
  -> accepted
  -> grants clues
  -> writes log
  -> maybe completion/interlude intent
  -> save intent
  -> projection record

inspect already seen hotspot
  -> no_mutation
  -> reason: already_inspected
  -> log/projection intent
  -> save intent if preserved

inspect unknown hotspot
  -> rejected
  -> reason: unknown_hotspot
  -> no mutation

inspect scene-mismatched hotspot
  -> rejected
  -> reason: scene_mismatch
  -> no mutation

continue from completed scene
  -> accepted
  -> next scene state
  -> stage-load intent
  -> save intent

continue final scene
  -> terminal_route
  -> terminal projection intent
```

## Compatibility rule

Keep side-panel clicks, StageKit clicks, Continue, and KeyR behavior stable.

Add records and adapter readback around them.
