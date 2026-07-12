# Architecture audit: destructive reset admission DSK map

**Timestamp:** `2026-07-12T10-30-00-04-00`

## Summary

Reset is currently a browser-side effect, not a domain transaction. The proposed authority separates intent classification, admission, destructive effects, barriers and proof.

## Plan ledger

**Goal:** create one parent domain that is the sole authority allowed to clear durable progress and request a reset reload.

- [x] Identify current reset owner.
- [x] Identify missing admission gates.
- [x] Identify storage, timer, lifecycle and frame dependencies.
- [x] Define candidate kits and transaction order.
- [ ] Implement and register the domain.

## Current graph

```txt
window keydown
  -> raw KeyR predicate
  -> raw localStorage delete
  -> raw location reload
```

## Target graph

```txt
the-unmapped-house-destructive-reset-admission-authority-domain
  -> reset-intent-envelope-kit
  -> reset-command-id-kit
  -> reset-binding-policy-kit
  -> browser-reload-shortcut-exclusion-kit
  -> trusted-key-event-policy-kit
  -> input-focus-context-kit
  -> reset-confirmation-capability-kit
  -> reset-command-admission-kit
  -> expected-story-revision-kit
  -> expected-storage-revision-kit
  -> reset-operation-generation-kit
  -> reset-tombstone-kit
  -> pending-timer-reset-barrier-kit
  -> runtime-reset-retirement-kit
  -> storage-reset-effect-kit
  -> reset-effect-result-kit
  -> reload-admission-kit
  -> reset-observation-kit
  -> reset-journal-kit
  -> destructive-reset-fixture-kit
  -> browser-refresh-preserves-save-smoke-kit
  -> confirmed-reset-clears-save-smoke-kit
```

## Domain boundaries

```txt
story domain owns semantic progress
storage domain owns durable revisions and tombstones
timer domain owns delayed callback leases
runtime lifecycle owns RAF/listener/resource retirement
reset authority coordinates those owners
browser adapter owns keyboard and reload effects
committed-frame authority proves the clean result
```

## Invariants

```txt
browser refresh chords never clear story progress
rejected reset intent performs zero mutation
reset requires explicit confirmation
reset cites expected story and storage revisions
one reset generation commits at most once
reset tombstone prevents stale resurrection
timers and runtime ownership retire before reload
storage failure cannot be reported as successful reset
first clean frame cites the committed reset generation
```
