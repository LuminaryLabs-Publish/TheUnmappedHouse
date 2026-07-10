# Interaction audit: hotspot command result map

Timestamp: `2026-07-10T11-30-28-04-00`

## Current interaction inputs

```txt
side-panel hotspot button click
StageKit raycast hotspot click
StageKit hover movement
Continue button click
KeyR reset
window resize
```

## Current input path

```txt
hotspot button click
  -> inspectHotspot(hotspot)

StageKit canvas click
  -> pick()
  -> hotspot = hit.object.userData.hotspot
  -> onHotspot(hotspot)
  -> inspectHotspot(hotspot)

Continue button click
  -> nextScene()

KeyR
  -> localStorage.removeItem(SAVE_KEY)
  -> location.reload()
```

## Interaction gaps

- Button and raycast clicks do not create a shared command envelope.
- Repeat inspection updates text/log/save but has no `no_mutation` result.
- Unknown hotspots and scene-mismatched hotspots have no stable rejection row.
- Click source is not retained as `side_panel` vs `stage_pick`.
- Stage pick readback is not attached to story command id.
- Continue has no result row for next scene vs terminal route.
- Reset is direct browser effect without typed intent.

## Required next records

```txt
StoryCommandEnvelope
StoryCommandSource
StoryCommandPreflight
StoryCommandResult
StoryCommandReason
StagePickReadback
HotspotProjectionRecord
BrowserAdapterReadback
```

## Safe interaction target

Both button clicks and StageKit clicks should route through the same source-owned story command API, while preserving visible behavior.
