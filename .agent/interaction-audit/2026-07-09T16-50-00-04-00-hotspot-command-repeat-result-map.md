# Interaction Audit: Hotspot Command Repeat Result Map

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T16-50-00-04-00`

## Summary

Interaction is simple and usable, but it is not result-rich. Side-panel clicks and StageKit raycast clicks both call `inspectHotspot(hotspot)`, which directly mutates story state and browser UI without a typed command/result boundary.

## Current input surfaces

```txt
hotspot side-panel button click
StageKit raycast hotspot click
continue interlude button click
keyboard KeyR reset
pointer movement hover/parallax
resize event
```

## Current interaction flow

```txt
button click or raycast click
  -> inspectHotspot(hotspot)
  -> if already seen: text/log/render/save/return
  -> if new: mark inspected, grant clues, write text/log, maybe schedule interlude, render, save
```

## Current interaction domains

```txt
hotspot descriptor source
hotspot button DOM projection
hotspot raycast picking
hover label projection
inspect command dispatch
repeat inspect branch
clue grant branch
scene completion branch
interlude open branch
continue command branch
reset command branch
save-on-interaction branch
```

## Services in use

```txt
side-panel hotspot button creation
button listener registration
raycast hotspot hit lookup
hover label text/position update
new hotspot inspection
repeat hotspot inspection
clue grant
notebook log write
scene-completion check
interlude scheduling
scene continuation
localStorage save
reset/reload
```

## Interaction kits identified

```txt
hotspot-button-projection-kit
hotspot-volume-kit
hotspot-picking-kit
hover-label-kit
inspect-hotspot-command-kit
repeat-hotspot-result-kit
clue-grant-kit
scene-completion-kit
interlude-trigger-kit
continue-scene-command-kit
reset-command-kit
save-intent-kit
```

## Result gaps

```txt
repeat inspections are accepted but untyped no-mutation paths
invalid hotspots cannot be represented as rejected results in current browser path
scene-complete interlude scheduling is an implicit timer side effect
continue terminal state writes DOM directly but emits no terminal result
reset clears storage and reloads without a command result
hover/pick state is not represented in diagnostics
```

## Required reason codes

```txt
accepted.inspect_new_hotspot
accepted.inspect_repeat_hotspot
accepted.scene_complete
accepted.continue_next_scene
accepted.continue_terminal
accepted.reset_requested
rejected.scene_not_found
rejected.hotspot_not_found
rejected.hotspot_not_in_current_scene
rejected.malformed_state
rejected.malformed_command
no_mutation.repeat_hotspot
no_mutation.terminal_already_complete
```

## Required fixture rows

```txt
inspect_new_hotspot_from_button
inspect_new_hotspot_from_stagekit_pick
inspect_repeat_hotspot
inspect_invalid_hotspot
inspect_hotspot_from_wrong_scene
complete_scene_after_required_clues
continue_next_scene
continue_terminal_route
reset_command
```

## Main finding

The next interaction upgrade should not add more controls. It should make current controls emit source-owned command envelopes and result rows that the browser adapter can consume and read back.
