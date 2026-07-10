# Interaction Audit: Hotspot Command Result Proof

**Timestamp:** `2026-07-10T04-22-00-04-00`

## Current interaction paths

```txt
side-panel button
  -> button click listener calls inspectHotspot(hotspot)
```

```txt
stage raycast click
  -> StageKit.clickHotspot()
  -> onHotspot(hotspot)
  -> inspectHotspot(hotspot)
```

```txt
continue button
  -> nextScene()
```

```txt
KeyR
  -> localStorage.removeItem(SAVE_KEY)
  -> location.reload()
```

## Current result behavior

First inspection:

```txt
mutates state.inspected
adds clues
writes text
writes notebook log
checks completion
may schedule interlude
renders UI
saves localStorage
```

Repeat inspection:

```txt
writes text
writes Re-read log
renders UI
saves localStorage
no typed no_mutation result
```

Unknown or stale hotspot:

```txt
not represented as a command path
no stable rejection reason
```

## Missing interaction records

```txt
InspectHotspotCommand
ContinueStoryCommand
ResetStoryCommand
StoryCommandResult
no_mutation repeat result
rejected unknown hotspot result
rejected scene_mismatch result
completion result
interlude intent
save intent
stage-load intent
browser adapter readback
```

## Required fixture interaction rows

```txt
inspect first hotspot -> accepted / clue_granted
inspect same hotspot -> accepted / no_mutation / already_inspected
inspect unknown hotspot -> rejected / unknown_hotspot
inspect stale scene hotspot -> rejected / scene_mismatch
complete scene -> accepted / scene_complete / interlude_intent
continue -> accepted / next_scene / stage_load_intent
continue final scene -> accepted / terminal_route_intent
reset -> accepted / reset_intent
```

## Main interaction finding

The next cut should source-own interaction results before changing the UI.

Both side-panel clicks and StageKit raycast clicks can keep calling a browser adapter, but that adapter should call a pure story command runner and consume result records.
