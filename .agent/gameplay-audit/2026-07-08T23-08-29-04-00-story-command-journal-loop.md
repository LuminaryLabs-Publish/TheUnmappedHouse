# Gameplay Audit: Story Command Journal Loop

**Timestamp:** `2026-07-08T23-08-29-04-00`

## Current gameplay loop

```txt
scene opens
  -> player inspects hotspots
  -> clues are granted
  -> notebook log updates
  -> sceneComplete(currentScene) checks required clues
  -> when complete, interlude opens after a timer
  -> continue advances to the next scene
  -> final continue writes prototype-complete text
```

## Main gameplay finding

The loop is simple and useful, but it is not journaled.

The game cannot currently explain the difference between:

```txt
first hotspot inspection
repeat inspection
unknown hotspot
incomplete continue
valid scene transition
terminal prototype-complete continue
malformed save load
reset request
```

Those need typed records before adding inventory, new rooms, audio, branching choices, or richer horror pacing.

## Required event records

```txt
StoryEventRecord = {
  eventId,
  frame,
  commandId,
  sceneId,
  type,
  reason,
  payload
}
```

Required event types:

```txt
state_loaded
state_normalized
state_rejected
source_validated
command_rejected
hotspot_inspected
hotspot_repeated
clue_granted
scene_completed
scene_transitioned
prototype_completed
save_requested
reset_requested
projection_updated
stage_projection_requested
browser_adapter_plan_created
```

## Required journals

```txt
commandJournal:
  records every StoryCommandEnvelope and StoryCommandResult

routeJournal:
  records scene entry, continue attempts, terminal prototype-complete path

saveJournal:
  records save/write/clear/load normalization intent

projectionJournal:
  records story, save, interlude, stage, and adapter projections
```

## Required gameplay fixture sequence

```txt
1. initial_state
2. inspect library map
3. repeat library map
4. inspect window reflection
5. attempt incomplete continue
6. inspect shelf gap
7. complete library
8. continue to hallway
9. complete hallway
10. continue to closet
11. complete closet
12. terminal prototype complete
13. save/load parity
14. reset-save intent
```

## Acceptance criteria

```txt
Every command result has a stable reason.
Every mutation has an event record.
Every accepted transition appends route facts.
Every rejected/no_mutation path proves no unintended clue or route mutation.
Terminal prototype-complete is represented as a command result, not only DOM text mutation.
```
