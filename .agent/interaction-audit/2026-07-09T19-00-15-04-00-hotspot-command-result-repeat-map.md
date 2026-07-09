# Interaction Audit: Hotspot Command Result Repeat Map

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T19-00-15-04-00`

## Current interaction path

```txt
side-panel button click
  -> inspectHotspot(hotspot)

StageKit raycast click
  -> this.onHotspot(hotspot)
  -> inspectHotspot(hotspot)
```

## Current command behavior

```txt
first inspect:
  mutate inspected[currentScene.id][hotspot.id]
  grant clues
  write text
  write log
  check completion
  maybe setTimeout(showInterlude)
  render UI
  save localStorage

repeat inspect:
  write text
  write Re-read log
  render UI
  save localStorage
  return with no typed no_mutation result

invalid inspect:
  not reachable from current UI path, but no source-owned command contract exists

reset:
  KeyR directly removes localStorage and reloads page
```

## Interaction domains

```txt
side-panel hotspot button domain
StageKit raycast hotspot domain
story command dispatch domain
hotspot preflight domain
repeat inspection domain
clue grant domain
completion check domain
interlude intent domain
save intent domain
UI projection domain
reset command domain
readback domain next
```

## Interaction services

```txt
StageKit click service: raycast hotspot mesh and invoke onHotspot callback
browser button service: create inspect buttons and route click to inspectHotspot
legacy inspect service: mutate state and save directly
legacy repeat service: log and save without stable reason code
legacy reset service: remove save and reload directly
planned preflight service: confirm command shape, current scene, hotspot existence, repeat state, completion requirements
planned result service: accepted/rejected/no_mutation/terminal rows with stable reasons
planned adapter readback service: compare DOM, save, interlude, stage, and debug state against projection
```

## Required command result rows

```txt
inspect_new_hotspot -> accepted / clue_granted / save_intent / ui_projection
inspect_repeat_hotspot -> accepted / repeated_no_mutation / log_projection / save_intent
inspect_missing_hotspot -> rejected / hotspot_not_found / no_save
inspect_wrong_scene_hotspot -> rejected / hotspot_not_in_current_scene / no_save
inspect_after_scene_complete -> accepted / scene_already_complete_or_repeated / no_route_change
reset_key -> accepted / clear_save_intent / reload_intent
adapter_readback_after_inspect -> accepted / dom_matches_projection
```

## Main finding

The interaction loop is simple and stable, but it has no source-owned `StoryCommandResult`. The next pass should make repeat inspections and invalid commands first-class result rows before any visual, room, audio, or inventory expansion.
