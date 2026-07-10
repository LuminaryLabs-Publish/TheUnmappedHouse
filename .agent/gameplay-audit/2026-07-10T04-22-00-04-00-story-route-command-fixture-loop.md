# Gameplay Audit: Story Route Command Fixture Loop

**Timestamp:** `2026-07-10T04-22-00-04-00`

## Current story route

```txt
library-blank-map
  -> inspect map
  -> inspect window
  -> inspect shelf-gap
  -> completion grants interlude
  -> continue to repeating-hallway

repeating-hallway
  -> inspect wrong-door
  -> inspect class-number
  -> inspect unfinished-photo
  -> completion grants interlude
  -> continue to closet-weather

closet-weather
  -> inspect bucket-storm
  -> inspect wet-shadow
  -> inspect closet-map
  -> completion grants interlude
  -> continue to terminal prototype-complete copy
```

## Current gameplay state

```txt
sceneId
clues
flags
inspected
route
log
```

## Current gameplay effects

```txt
inspect hotspot
  -> clue grants
  -> notebook log
  -> current text
  -> completion check
  -> delayed interlude
  -> save

continue
  -> route mutation
  -> scene id mutation
  -> stage scene load
  -> UI render
  -> save

terminal
  -> interlude title/text mutation only
```

## Gameplay proof gap

The game has a complete three-scene prototype route, but the route cannot be replayed headlessly.

Missing proof rows:

```txt
initial state row
inspect accepted row
inspect repeat no-mutation row
inspect rejected unknown row
scene completion row
interlude intent row
continue next-scene row
stage-load intent row
terminal route row
save intent row
projection row
replay row
```

## Recommended fixture sequence

```txt
create initial state
assert first scene is library-blank-map
inspect all required hotspots
assert each clue grant row
repeat one hotspot
assert no mutation and already_inspected reason
continue
assert repeating-hallway stage-load intent
inspect all second scene hotspots
continue
assert closet-weather stage-load intent
inspect all final scene hotspots
continue
assert terminal route intent
assert replay log has deterministic row ids
```

## Main gameplay finding

The gameplay content is enough for the next proof slice.

Do not add a fourth room until the existing three-scene command route is fixture-proven.
