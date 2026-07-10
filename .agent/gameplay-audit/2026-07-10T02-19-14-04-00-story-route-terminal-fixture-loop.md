# Gameplay audit: story route terminal fixture loop

Timestamp: `2026-07-10T02-19-14-04-00`

## Gameplay loop

The player inspects scene hotspots, gathers clues, completes the scene requirement, receives an interlude, continues to the next scene, and eventually reaches terminal prototype-complete copy.

## Current source route

```txt
scenes[0] library-blank-map
  -> required clue: map-outline
  -> continue to repeating-hallway

scenes[1] repeating-hallway
  -> required clue: draft-under-door
  -> continue to closet-weather

scenes[2] closet-weather
  -> required clue: barometer-drop
  -> continue to terminal prototype-complete copy
```

## Current route authority

`src/game.js` owns route state and browser effects together:

```txt
currentScene
state.sceneId
sceneComplete(scene)
showInterlude(scene)
nextScene()
stage.loadScene(currentScene)
renderUi()
saveState()
```

## Missing fixture rows

```txt
initial scene resolution
inspect first hotspot
inspect repeat hotspot
inspect unknown hotspot
complete first scene
continue to next scene
complete final scene
continue to terminal route
save intent
stage-load intent
projection record
adapter readback
```

## Next gameplay-safe cut

Create a story authority replay that returns ordered rows for a deterministic route through all three scenes. The browser adapter can then be changed safely because the source gameplay path is already proven.

## Avoid next

- More story rooms.
- Inventory.
- Audio.
- Extra ending states.

These would multiply unproven branches before the route contract exists.
