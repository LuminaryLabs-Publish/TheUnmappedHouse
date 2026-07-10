# Interaction audit: Hotspot Command Adapter Result Map

Timestamp: `2026-07-10T13-01-11-04-00`

## Current interaction path

```txt
side-panel button click
  -> inspectHotspot(hotspot)

StageKit raycast click
  -> clickHotspot()
  -> onHotspot(hotspot)
  -> inspectHotspot(hotspot)
```

## Current accepted path

```txt
sceneSeen[hotspot.id] = true
grantClues(hotspot.grants)
text.textContent = hotspot.text
writeLog(...)
if sceneComplete(currentScene) setTimeout(showInterlude, 450)
renderUi()
saveState()
```

## Current repeat path

```txt
if sceneSeen[hotspot.id]
  -> text.textContent = hotspot.text
  -> writeLog("Re-read")
  -> renderUi()
  -> saveState()
  -> return
```

The repeat path is useful, but it is not represented as a typed `no_mutation` result.

## Missing command result rows

```txt
inspect.accepted
inspect.no_mutation.already_inspected
inspect.rejected.unknown_hotspot
inspect.rejected.scene_mismatch
complete.accepted
continue.next_scene
continue.terminal
reset.accepted
save.intent
projection.record
adapter.readback
```

## Main finding

The interaction bug is not a missing click path. It is missing command/result identity through the browser adapter.
