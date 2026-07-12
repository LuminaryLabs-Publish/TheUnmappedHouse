# Gameplay Audit: Cross-Tab Lost Progress Loop

**Timestamp:** `2026-07-12T04-44-36-04-00`

## Reproduction model

```txt
Tab A and Tab B load the same snapshot revision R0

Tab A
  -> inspects map
  -> creates in-memory state A from R0
  -> writes full snapshot A

Tab B
  -> still owns stale in-memory R0
  -> inspects window
  -> creates in-memory state B from R0
  -> writes full snapshot B

result
  -> snapshot B replaces snapshot A
  -> Tab A's clue, inspection and log row are lost durably
  -> neither tab receives a conflict result
```

## Affected gameplay state

```txt
sceneId
clues
flags
inspected
route
log
```

Because each mutation writes the entire aggregate, stale writers can replace unrelated progress rather than only the field they changed.

## Additional failure loops

```txt
storage unavailable at startup
  -> stage and UI initialize
  -> unconditional startup save throws
  -> module completion is interrupted

storage quota/security failure after inspection
  -> story and DOM mutate
  -> durable write throws
  -> user receives no volatile-state or retry result

reset in one tab
  -> key removed and that tab reloads
  -> other tab remains live with stale state
  -> later write can recreate the supposedly reset snapshot
```

## Required gameplay policy

```txt
single-writer lease, compare-and-swap, or explicit merge policy
revisioned snapshots
writer/session identity
conflict classification
field-safe reconciliation for clues, inspection, route and log
reset tombstone or revision barrier
volatile-session fallback when storage is unavailable
```

No observed player data loss is claimed. The source proves the lost-update path is admissible and unreported.
