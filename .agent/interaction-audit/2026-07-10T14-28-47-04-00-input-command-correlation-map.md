# Interaction audit: Input Command Correlation Map

Timestamp: `2026-07-10T14-28-47-04-00`

## Input surfaces

```txt
side-panel inspect button
StageKit raycast click
StageKit raycast hover
continue button
KeyR reset
window resize
pointer movement for camera parallax
```

Only inspect, continue, and reset are gameplay commands. Hover, pointer movement, and resize are presentation inputs but still need bounded diagnostics where useful.

## Current command behavior

| Input | Current target | Current behavior | Missing result |
|---|---|---|---|
| Side-panel inspect | `inspectHotspot(hotspot)` | Passes the live descriptor object directly. | No input id, command id, preflight, status, reason, or transition row. |
| Stage click | `StageKit.clickHotspot()` | Raycasts, extracts `userData.hotspot`, then calls the callback. | No pick row and no link between hit and story result. |
| Repeat inspect | `inspectHotspot()` early return | Rewrites text, appends log, rerenders, and saves. | No typed `no_mutation/already_inspected` result; it still performs effects. |
| Continue | `nextScene()` | Advances route or writes terminal copy. | No rejected/incomplete case, result row, stage-load intent, or terminal intent. |
| Reset | Keydown handler | Clears localStorage and reloads. | No command/result/readback row. |

## Required commands

```txt
inspect_hotspot
continue_scene
reset_story
```

## Stable reason codes

```txt
accepted
already_inspected
unknown_scene
unknown_hotspot
scene_mismatch
scene_incomplete
next_scene_available
terminal_route
save_unavailable
invalid_source_fingerprint
```

## Preflight rules

### inspect_hotspot

1. Source fingerprint matches the loaded story source.
2. Scene id exists.
3. Scene id equals current state scene id.
4. Hotspot id exists in that scene.
5. If already inspected, return `no_mutation/already_inspected`.
6. Otherwise accept and produce clue/log/inspection transitions.

### continue_scene

1. Current scene exists.
2. Required clues are complete.
3. If a next scene exists, accept with route and stage-load intents.
4. If no next scene exists, accept with terminal-route intent.
5. If incomplete, reject with `scene_incomplete` and no browser effects.

### reset_story

1. Accept from any valid state.
2. Return the initial state snapshot and clear-save/reload intents.
3. Preserve a reset result in diagnostics before reload where possible.

## Input-origin invariant

Both side-panel and StageKit raycast inspection must produce equivalent story results for the same `sceneId` and `hotspotId`. The only allowed difference is the input-origin field.

```txt
side_panel -> inspect command -> result
stage_raycast -> pick observation -> inspect command -> equivalent result
```

## Readback target

The browser should retain a bounded command journal containing the last input, command, preflight, result, transition ids, projection id, save observation id, and StageKit observation ids. This journal should be serializable and visible through additive diagnostics rather than inferred from DOM state.
