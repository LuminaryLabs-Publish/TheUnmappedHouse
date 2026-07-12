# Reset authority audit: refresh exclusion and confirmed reset contract

**Timestamp:** `2026-07-12T10-30-00-04-00`

## Summary

Defines the product-specific reset contract required to safely clear the only story snapshot.

## Plan ledger

**Goal:** make destructive reset intentional, durable, idempotent and observable.

- [x] Define reset intent inputs.
- [x] Define confirmation and revision gates.
- [x] Define tombstone and stale-writer behavior.
- [x] Define retirement and effect order.
- [x] Define typed outcomes and proof.
- [ ] Implement.

## Admission policy

```txt
Ctrl+R: reject as browser refresh
Meta+R: reject as browser refresh
Alt+R: reject unless explicitly assigned in a future manifest
Shift+R: reject unless explicitly assigned in a future manifest
plain R: require confirmation, never immediate delete
repeat: reject
untrusted event: reject
hidden document: reject
invalid focus context: reject
stale revision: reject
```

## Commit order

```txt
admit reset generation
  -> commit reset tombstone
  -> block stale storage writers
  -> cancel completion timers
  -> retire story/runtime callbacks
  -> execute storage reset effect
  -> publish committed reset result
  -> request reload
  -> acknowledge clean boot and frame
```

## Failure policy

```txt
storage deletion failure -> no success status, no reload unless explicit volatile-reset policy
timer retirement failure -> typed degraded/failure result
runtime retirement failure -> typed degraded/failure result
reload request failure -> retain committed reset result for retry
duplicate command -> return prior result
stale command -> zero mutation
```
