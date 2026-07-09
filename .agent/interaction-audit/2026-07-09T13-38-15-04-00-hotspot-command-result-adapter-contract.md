# Hotspot Command Result Adapter Contract

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T13-38-15-04-00`

## Current interaction loop

```txt
side-panel button click
  -> inspectHotspot(hotspot)

StageKit raycast click
  -> StageKit.clickHotspot()
  -> onHotspot(hotspot)
  -> inspectHotspot(hotspot)
```

## Current interaction behavior

First inspection:

```txt
mark sceneSeen[hotspot.id] = true
store state.inspected[currentScene.id]
grant clues
write text
write log
if scene complete, schedule interlude
render UI
save state
```

Repeat inspection:

```txt
write hotspot text
write Re-read log
render UI
save state
return
```

## Missing interaction authority

```txt
No command envelope for inspect_hotspot.
No preflight for missing hotspot, wrong scene, already inspected, or invalid command.
No typed accepted/rejected/no_mutation command result.
No source-owned result reason catalog.
No story event record list.
No adapter plan that states expected DOM, save, interlude, stage, and debug writes.
No adapter readback.
```

## Required result cases

```txt
inspect_hotspot.accepted_first_time
inspect_hotspot.no_mutation_already_inspected
inspect_hotspot.rejected_unknown_hotspot
inspect_hotspot.rejected_wrong_scene
inspect_hotspot.accepted_scene_complete
continue_scene.accepted_next_scene
continue_scene.terminal_complete
reset_intent.accepted
load_state.corrupted_json_fallback
ledger_readback.repo_local_ok
ledger_readback.central_ok
```

## Fixture requirement

The next implementation must prove interaction rows without DOM, Three.js, localStorage, timers, or browser state before wiring `src/game.js`.
