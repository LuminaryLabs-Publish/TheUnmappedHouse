# Gameplay audit: browser refresh progress-loss loop

**Timestamp:** `2026-07-12T10-30-00-04-00`

## Summary

The product maps plain physical `KeyR` to destructive reset. Standard browser refresh shortcuts use the same physical key and are not excluded.

## Plan ledger

**Goal:** preserve player progress unless an explicit confirmed reset command commits.

- [x] Identify the browser shortcut collision.
- [x] Trace storage deletion before reload.
- [x] Identify reachable player impact.
- [x] Define gameplay-safe reset rules.
- [ ] Implement and test.

## Reachable loop

```txt
player completes or partially completes scenes
  -> save exists in localStorage
  -> player presses Ctrl+R or Meta+R to refresh
  -> game receives KeyR keydown
  -> game deletes the save
  -> browser reload proceeds
  -> player returns to initial state
```

## Gameplay requirements

```txt
refresh preserves current progress
plain R does nothing without explicit confirmation
confirmed reset clears all story progress exactly once
reset cannot be triggered while hidden or unfocused
reset result is visible and durable
stale tabs cannot restore pre-reset progress
```
