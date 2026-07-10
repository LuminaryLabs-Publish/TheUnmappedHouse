# Interaction audit: hotspot repeat result readback

Timestamp: `2026-07-09T23-28-35-04-00`

## Active interaction routes

```txt
side-panel hotspot button
  -> click listener passes hotspot descriptor to inspectHotspot(hotspot)

StageKit raycast click
  -> pointerup/pick detects hotspot volume
  -> onHotspot callback passes hotspot descriptor to inspectHotspot(hotspot)

continue button
  -> nextScene()

keyboard reset
  -> KeyR clears localStorage and reloads
```

## Current behavior

- First hotspot inspection mutates `state.inspected`, grants clues, writes current text, appends a log row, checks completion, may schedule interlude, renders UI, and saves.
- Repeat hotspot inspection writes current text, appends a repeat log row, renders UI, and saves, but has no typed `no_mutation` result.
- Continue mutates current scene route, interlude DOM state, StageKit scene, UI, and save state.
- Reset is browser-only and has no command/result row.

## Gap

Interaction intent is observable only by DOM side effects and localStorage changes. Consumers cannot tell whether a click was accepted, rejected, repeated, completed, saved, or terminal without re-running browser state.

## Needed result rows

- `inspect_hotspot.accepted`
- `inspect_hotspot.repeat_no_mutation`
- `inspect_hotspot.unknown_hotspot`
- `scene.completed`
- `interlude.scheduled`
- `continue.next_scene`
- `continue.terminal`
- `reset.requested`
- `save.write_intent`
- `projection.requested`

## Next fixture row examples

```txt
scene=library-blank-map hotspot=map status=accepted grants=clue:blank-square completed=false
scene=library-blank-map hotspot=map status=no_mutation reason=already_inspected
scene=library-blank-map hotspot=shelf-gap status=accepted completed=true interlude=scheduled
continue from library-blank-map status=accepted next_scene=repeating-hallway stage_load=scheduled
continue from closet-weather status=terminal route=prototype_complete
```
