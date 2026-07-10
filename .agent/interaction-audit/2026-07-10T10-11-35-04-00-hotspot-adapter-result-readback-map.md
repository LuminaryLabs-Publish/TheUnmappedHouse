# Interaction audit — Hotspot adapter result readback map

## Current input paths

```txt
side-panel button -> inspectHotspot(hotspot)
StageKit raycast click -> inspectHotspot(hotspot)
continue button -> nextScene()
KeyR -> clear save and reload
```

## Current problem

`inspectHotspot` has no typed command envelope or result row.

The repeat path returns early after text/log/render/save, but it does not emit a stable `no_mutation` result. Unknown or scene-mismatched hotspot commands are not represented as stable rejection rows.

## Required interaction result rows

```txt
inspect_accepted
inspect_repeat_no_mutation
inspect_unknown_rejected
inspect_scene_mismatch_rejected
continue_accepted
continue_terminal
reset_requested
save_written
projection_applied
stage_load_requested
stage_load_readback
```

## Adapter readback target

Each browser interaction should preserve:

```txt
commandId
sourceSceneId
inputSource
hotspotId
resultId
resultKind
reason
projectionId
adapterLedgerId
stageLoadIntentId
stageReadbackId
saveIntentId
```

## Fixture cases

- Button click and StageKit click produce equivalent command rows.
- Repeat inspect is explicit `no_mutation`.
- Continue is blocked or accepted by source-owned state, not ad hoc DOM state.
- Terminal route is a typed result, not just direct interlude copy.
