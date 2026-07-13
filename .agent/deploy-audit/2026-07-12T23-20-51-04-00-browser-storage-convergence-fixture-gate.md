# Deploy audit: Browser Storage Convergence Fixture Gate

**Timestamp:** `2026-07-12T23-20-51-04-00`

## Summary

The existing package check is syntax-only. Deployment currently proves neither multi-tab convergence nor durable reset behavior.

## Plan ledger

**Goal:** block save-authority claims until browser and deployed Pages fixtures prove conflict handling, reset invalidation and visible-frame parity.

- [x] Identify the current validation boundary.
- [x] Define local browser fixture rows.
- [x] Define deployed Pages fixture rows.
- [ ] Implement the fixture harness.
- [ ] Add the gate to CI only after it is deterministic.

## Current proof

```txt
npm run check
  -> Node syntax checks over JavaScript sources

Pages workflow
  -> publishes static repository content from main
```

Neither path opens two tabs, injects storage failures, observes `storage` delivery or verifies save-to-frame provenance.

## Required fixture matrix

```txt
two tabs write from the same predecessor
  -> at most one successor commits without explicit merge
  -> the other receives a conflict result

duplicate storage delivery
  -> one state effect

reordered old/new storage delivery
  -> no revision regression

storage setItem throws
  -> typed failure
  -> no durability claim

readback differs from proposed envelope
  -> readback mismatch result

reset with another tab open
  -> both tabs converge on one reset generation

stale tab writes after reset
  -> reset-resurrection rejection

reload after accepted save/reset
  -> exact canonical snapshot restored

visible frame
  -> cites the accepted save revision or reset generation
```

## Gate policy

Do not label the save path conflict-safe, reset-safe, convergent or production-ready until the local browser matrix and the deployed Pages smoke both pass against the same commit. Syntax checks remain necessary but are not persistence proof.