# Gameplay audit: Inspection and transition save-failure loop

Timestamp: `2026-07-11T00-00-26-04-00`

## Player loop

```txt
inspect hotspot
  -> receive clue and notebook row
  -> complete scene
  -> see interlude
  -> Continue
  -> enter next scene
```

The player assumes every visible step is saved. The runtime does not prove that assumption.

## Inspection failure path

```txt
final hotspot selected
  -> inspected flag and clue mutate in memory
  -> completion becomes true
  -> interlude timer is scheduled
  -> UI shows completed hotspot and clue
  -> localStorage write throws
  -> timer still opens interlude
  -> reload loses the inspection and completion
```

This creates an impossible player history: the player was allowed to continue from an event that storage never committed.

## Continue failure path

```txt
Continue selected
  -> currentScene advances in memory
  -> route advances in memory
  -> previous interlude closes
  -> next StageKit scene becomes visible
  -> localStorage write throws
  -> reload returns to the previous durable scene
```

The route can visually advance and then rewind after reload without a gameplay-level result explaining why.

## Reset failure path

`KeyR` calls `localStorage.removeItem()` without a result boundary. If clear fails, reload is not reached and the player receives no reset outcome.

## Required gameplay results

```txt
InspectHotspotResult
  accepted
  already-inspected
  rejected
  persistence-failed

ContinueStoryResult
  accepted
  wrong-phase
  stale-scene
  duplicate
  stage-failed
  persistence-failed
  recovery-pending

ResetStoryResult
  cleared
  already-empty
  clear-failed
```

Each accepted result must identify the durable save revision. A visible interlude or next scene must be attributable to that revision.

## Required recovery behavior

```txt
failed inspection write:
  do not grant durable clue
  do not schedule interlude
  keep prior committed projection

failed Continue persistence preparation:
  keep prior scene and interlude

interrupted pending transition:
  resume or roll back deterministically from the save envelope

failed reset clear:
  remain in the current committed state
  expose a typed failure instead of silently reloading
```

## Fixture rows

```txt
inspect-success-returns-save-revision
inspect-quota-failure-grants-no-visible-durable-clue
final-inspection-failure-opens-no-interlude
continue-denied-write-keeps-current-scene
continue-finalize-failure-enters-recoverable-state
reload-pending-transition-resolves-once
reset-clear-failure-keeps-current-save
```

## Product scope

No new rooms, clues, inventory, audio or visual content is required for this gate.