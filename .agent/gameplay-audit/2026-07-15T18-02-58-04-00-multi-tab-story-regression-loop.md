# Gameplay audit: multi-tab story regression and reset resurrection

**Timestamp:** `2026-07-15T18-02-58-04-00`  
**Status:** `audited`

## Summary

The story loop is deterministic within one document, but durable progress is shared through one last-writer-wins localStorage key. An older open document can later replace the durable route, clues, inspected flags and Notebook log, or recreate progressed state after another document resets.

## Plan ledger

**Goal:** prevent valid local actions in a stale tab from regressing or resurrecting durable story progress.

- [x] Trace progress fields and all save call sites.
- [x] Trace the KeyR reset path.
- [x] Construct source-permitted multi-tab interleavings.
- [x] Define acceptance and rejection outcomes.
- [ ] Execute the interleavings in a browser fixture.

## Progress fields at risk

```txt
sceneId
clues
flags
inspected
route
log
```

Every save writes all fields together from the current document's mutable object.

## Regression loop

```txt
1. tab A and tab B load scene 1 state R1
2. A completes scene 1
3. A continues into scene 2
4. A writes sceneId scene-2, expanded clues, route and log
5. B still holds scene 1 R1 in memory
6. B re-reads or inspects a hotspot
7. B writes its whole state object
8. the shared slot loses A's scene 2 route and later clues
9. a future reload restores the regressed state
```

The stale write can be syntactically valid and internally coherent. The defect is ordering, not JSON validity.

## Reset resurrection loop

```txt
1. tab A and tab B load progressed state R5
2. A presses R
3. A removes the shared key and reloads
4. A writes a fresh initial state
5. B still holds R5 in memory
6. B performs an inspection or route action
7. B writes R5-derived state back into the slot
8. the accepted reset is no longer durable
```

## Gameplay impact

```txt
completed scenes can re-lock
clues can disappear
inspected checkmarks can revert
route history can regress
Notebook entries can be lost or reordered
an intentional reset can be undone
active tabs can disagree indefinitely
```

## Required gameplay policy

- One durable head has a monotonic revision.
- A candidate save declares the revision it was based on.
- A stale base cannot silently replace the head.
- Reset advances a reset epoch rather than only deleting the key.
- Documents based on an older reset epoch become read-only or must reconcile.
- Conflicts never mutate accepted gameplay state automatically.
- The player receives an explicit recover, reload or keep-local choice when policy permits.

## Required outcomes

```txt
accepted newer save
accepted no-change save
rejected stale save
rejected expired writer
reset accepted
reset rejected stale
conflict requires reconcile
writer retired
recovery predecessor restored
```

## Validation boundary

These loops are derived from source behavior. No live multi-tab gameplay regression or reset resurrection was executed.