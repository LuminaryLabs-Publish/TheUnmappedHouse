# Gameplay audit: Multi-tab Lost Update and Reset Resurrection Loop

**Timestamp:** `2026-07-12T23-20-51-04-00`

## Summary

The gameplay aggregate is copied independently into each tab. Whole-snapshot last-writer-wins persistence can remove valid clues or inspections, and reset can be undone by a stale live tab.

## Plan ledger

**Goal:** document the reachable gameplay failures and the exact convergence rules required to prevent them.

- [x] Trace two-tab inspection writes.
- [x] Trace two-tab route and log writes.
- [x] Trace reset while another tab remains open.
- [x] Define commit and reset admission outcomes.
- [ ] Execute focused browser fixtures after implementation.

## Lost-update loop

```txt
Tab A loads revision R
Tab B loads revision R

Tab A inspects hotspot A
  -> clues = [A]
  -> inspected = {A}
  -> writes complete snapshot A

Tab B inspects hotspot B
  -> clues = [B]
  -> inspected = {B}
  -> writes complete snapshot B

result
  -> durable state contains only the last writer's branch
  -> route/log/inspection facts from the other branch disappear
```

The same failure applies to a stale tab advancing scenes after a newer tab has progressed.

## Reset-resurrection loop

```txt
Tab A and Tab B hold the same story state
Tab A presses R
  -> removeItem(saveKey)
  -> reload Tab A into defaults

Tab B receives no admitted reset command
  -> keeps predecessor state in memory
  -> next inspection or Continue calls saveState
  -> predecessor snapshot is recreated under the same key
```

## Save-failure loop

```txt
mutation and visible projection succeed
localStorage.setItem throws
no rollback or typed failure result exists
player sees a state that reload cannot reproduce
```

## Required gameplay outcomes

```txt
COMMITTED
CONFLICT_REJECTED
STALE_WRITER_REJECTED
DUPLICATE_RESULT
STORAGE_WRITE_FAILED
READBACK_MISMATCH
RESET_COMMITTED
RESET_ALREADY_COMMITTED
RESET_GENERATION_REJECTED
RESET_RESURRECTION_REJECTED
```

Gameplay reducers may prepare candidate changes, but only an accepted durable commit may become the canonical cross-tab story state.