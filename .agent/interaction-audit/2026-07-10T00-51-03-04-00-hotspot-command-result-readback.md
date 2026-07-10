# Interaction audit: hotspot command result readback

Timestamp: `2026-07-10T00-51-03-04-00`

## Active interaction channels

```txt
side-panel button click
  -> inspectHotspot(hotspot)

StageKit canvas pointermove
  -> raycast pick
  -> hoverLabel projection

StageKit canvas click
  -> raycast pick
  -> inspectHotspot(hotspot)

continue button click
  -> nextScene()

KeyR
  -> localStorage.removeItem(SAVE_KEY)
  -> location.reload()
```

## Current command handling

`inspectHotspot(hotspot)` directly reads and mutates browser state.

First inspection:

```txt
sceneSeen[hotspot.id] = true
state.inspected[currentScene.id] = sceneSeen
grantClues(hotspot.grants)
text.textContent = hotspot.text
writeLog(...)
if sceneComplete(currentScene) setTimeout(showInterlude, 450)
renderUi()
saveState()
```

Repeat inspection:

```txt
text.textContent = hotspot.text
writeLog(Re-read)
renderUi()
saveState()
return
```

## Missing interaction proof

- No typed command envelope for hotspot click or side-panel click.
- No stable command id or source for click origin.
- No stale/unknown hotspot rejection row.
- Repeat inspection is behaviorally `no_mutation`, but it is not recorded as such.
- Completion is detected inside the browser command handler, not emitted as a source result.
- Interlude scheduling is a browser timer, not a serializable intent.
- Continue has no preflight, result, or terminal result row.
- Reset is browser-only and reloads immediately.

## Required command rows

```txt
inspect_hotspot.accepted
inspect_hotspot.no_mutation.already_inspected
inspect_hotspot.rejected.unknown_hotspot
inspect_hotspot.rejected.scene_mismatch
inspect_hotspot.accepted.scene_completed
continue_scene.accepted.next_scene
continue_scene.accepted.terminal_route
continue_scene.rejected.scene_not_complete
reset_requested.accepted
```

## Browser adapter readback needed

```txt
clickedFrom: side_panel | stage_raycast
sourceSceneId
hotspotId
commandId
resultId
projectedText
logEntry
saveWritten
interludeOpened
stageSceneLoaded
terminalProjected
```

## Main finding

The user interactions are simple and stable. The risk is that command acceptance, rejection, no-mutation, completion, and adapter effects are currently invisible to fixtures.
