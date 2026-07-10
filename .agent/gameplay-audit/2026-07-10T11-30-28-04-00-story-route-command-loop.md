# Gameplay audit: story route command loop

Timestamp: `2026-07-10T11-30-28-04-00`

## Player loop

```txt
read current scene
inspect hotspot
collect clue
update notebook
complete required clue set
show interlude
continue to next scene
repeat through three scenes
final continue shows prototype-complete state
reset with R when needed
```

## Current gameplay authority

`src/game.js` owns gameplay authority directly:

```txt
createInitialState()
loadState()
saveState()
hasClue()
grantClues()
writeLog()
sceneComplete()
inspectHotspot()
showInterlude()
nextScene()
renderUi()
```

## Gameplay domains

```txt
scene-route-state
story-state
hotspot-inspection
clue-grant
inspected-ledger
notebook-log
completion-policy
interlude-policy
terminal-route-policy
save-policy
reset-policy
```

## Missing command rows

```txt
inspect_hotspot accepted
inspect_hotspot repeated/no_mutation
inspect_hotspot unknown/rejected
inspect_hotspot scene_mismatch/rejected
scene_completed
continue_next_scene
continue_terminal
save_state
reset_save
projection_written
stage_load_requested
```

## Main gameplay gap

The loop works for the browser, but it cannot be replayed or validated outside the DOM because command decisions are not represented as first-class rows.

The next useful gameplay cut is a DOM-free story command fixture that proves accepted, rejected, repeated, completed, continue, terminal, save, projection, and stage-load cases without adding new rooms.
