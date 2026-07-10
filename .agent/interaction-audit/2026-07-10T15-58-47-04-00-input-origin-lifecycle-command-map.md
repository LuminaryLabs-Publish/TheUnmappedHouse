# Interaction audit: input origin and lifecycle command map

Timestamp: `2026-07-10T15-58-47-04-00`

## Current input surfaces

| Origin | Browser path | Current authority call | Current retained evidence |
|---|---|---|---|
| Side-panel inspect | Generated button click | `inspectHotspot(hotspot)` | Aggregate state after mutation |
| Stage raycast inspect | Canvas click -> `StageKit.clickHotspot()` | `onHotspot(hotspot)` -> `inspectHotspot(hotspot)` | None for pointer/pick origin |
| Continue | Interlude button click | `nextScene()` | Aggregate state after route advance; terminal path has no state write |
| Reset | `KeyR` | remove save + reload | No retained command/result/readback |
| Hover | Canvas mousemove | raycast + direct label DOM writes | No hover observation |

## Current parity

Side-panel and raycast inspection converge on the same mutation function, which is useful. However, the convergence happens after origin and pick context are discarded. Fixtures cannot prove that both origins selected the same source hotspot or produced the same command/result.

## Missing command envelope

```txt
StoryInputRecord
  inputId
  origin: side_panel | stage_raycast | continue_button | keyboard_reset
  browserEventType
  sceneId
  hotspotId?
  pointerNdc?
  capturedAtFrame?

StoryCommandEnvelope
  commandId
  inputId
  sourceFingerprint
  expectedStateId
  kind: inspect | continue | reset
  sceneId
  hotspotId?
```

## Required preflight reasons

```txt
accepted
unknown_scene
scene_mismatch
unknown_hotspot
already_inspected
scene_incomplete
interlude_not_open
already_terminal
stale_state
source_mismatch
reset_requested
```

## Required result classes

```txt
accepted_mutation
accepted_no_mutation
rejected
accepted_effect_only
```

## Interaction invariants

- Live hotspot objects must not be the command payload; use stable scene/hotspot ids.
- A raycast miss must produce a pick observation, not silently vanish.
- Side-panel and raycast commands for the same scene/hotspot must produce equivalent story results.
- Repeat inspection must be explicit `accepted_no_mutation/already_inspected`, while reread copy/log/save effects remain declared.
- Continue must be rejected unless lifecycle state is `interlude_open`.
- Reset must produce a retained result and storage-clear readback before reload where possible.
- Every browser effect must refer to the originating command/result.

## Required fixture rows

```txt
side-panel-inspect-accepted
raycast-inspect-accepted
inspect-origin-result-parity
raycast-miss-observed
inspect-repeat-no-mutation
inspect-scene-mismatch-rejected
continue-before-interlude-rejected
continue-next-scene-accepted
continue-terminal-accepted
reset-clear-readback
```

## Next safe interaction cut

Add input-origin records and source-id commands around existing handlers. Do not change hotspot positions, button copy, raycast geometry, or visible interaction timing.