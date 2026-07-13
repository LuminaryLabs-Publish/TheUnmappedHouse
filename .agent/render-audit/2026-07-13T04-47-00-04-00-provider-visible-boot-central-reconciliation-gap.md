# Render audit: provider-backed visible boot reconciliation gap

**Timestamp:** `2026-07-13T04-47-00-04-00`

## Summary

The static shell can display `Loading` before the remote Three.js module resolves. If provider evaluation fails, no application-owned render state, failure frame, provider identity or recovery projection is committed.

## Plan ledger

**Goal:** require every visible boot outcome to cite a terminal provider result and stage generation.

- [x] Trace the first static shell frame.
- [x] Trace accepted provider construction to the first WebGL frame.
- [x] Trace provider rejection before `game.js` evaluation.
- [x] Identify missing visible-frame receipts.
- [ ] Add executable accepted, rejected, timeout and fallback frame fixtures.

## Current visible paths

```txt
accepted
  -> remote module evaluates
  -> StageKit allocates renderer and target
  -> recursive RAF renders stage and post pass

rejected
  -> module graph rejects
  -> game.js body never runs
  -> no canvas or failure renderer is created
  -> Loading can remain without a typed reason
```

## Missing evidence

```txt
provider ID and generation
provider version and content fingerprint
RenderProviderResult status
stage-construction result and generation
render-frame sequence
first provider-backed visible-frame acknowledgement
first provider-failure visible-frame acknowledgement
retry generation and predecessor retirement
```

## Completion boundary

A successful network request is insufficient. Completion requires one visible accepted or failure frame whose immutable evidence cites the provider attempt, terminal result, stage generation and presentation sequence.