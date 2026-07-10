# Gameplay audit: story route terminal result loop

Timestamp: `2026-07-09T23-28-35-04-00`

## Current story route loop

```txt
scene starts
  -> inspect required hotspots
  -> grants clues
  -> scene completion test checks requiresToComplete
  -> completion schedules interlude
  -> continue advances to next scene
  -> final continue enters prototype-complete terminal route
```

## Gameplay domains

- Scene progression.
- Clue collection.
- Hotspot inspection and repeat inspection.
- Notebook/log accrual.
- Interlude timing and acknowledgment.
- Terminal prototype-complete route.
- Save/restore continuity.

## Current blocker

The story loop is deterministic and small, but all gameplay facts are browser-owned. `src/game.js` should become a consumer of source-owned gameplay results rather than the owner of story mutation and route truth.

## Needed source-owned records

- Initial story snapshot.
- Per-command before/after snapshots.
- Granted clue rows.
- Scene completion rows.
- Interlude intent rows.
- Save intent rows.
- Stage load intent rows.
- Terminal route row.
- Replay ledger rows for each command.

## Do not do first

- More scenes.
- More clues.
- Inventory system.
- Audio triggers.
- Extra render effects.

## Safe gameplay target

A DOM-free story route fixture should replay the existing three-scene route and assert accepted, repeat, completion, continue, and terminal rows before the browser adapter is changed.
