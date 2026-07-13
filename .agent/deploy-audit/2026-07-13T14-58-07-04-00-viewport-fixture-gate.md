# Deploy audit: viewport fixture gate

**Timestamp:** `2026-07-13T14-58-07-04-00`

## Summary

GitHub Pages uploads the repository root after pushes to `main`, but no source, browser, built-output or deployed-origin fixture proves viewport behavior. Deployment success alone does not prove bounded allocation or coherent resize adoption.

## Plan ledger

**Goal:** block viewport reliability claims until local and deployed fixtures pass.

- [x] Inspect package checks and Pages workflow.
- [x] Identify missing fixture layers.
- [x] Define promotion gates.
- [ ] Implement and run fixtures.

## Existing proof

```txt
npm run check
  -> node --check over four local JavaScript modules

Pages
  -> checkout
  -> configure Pages
  -> upload repository root
  -> deploy
```

Neither path opens the game or inspects viewport state.

## Required fixture matrix

```txt
pure aspect-fit unit cases
zero-size and hidden-host unit cases
DPR and pixel-budget policy cases
GPU maximum-dimension cases
participant preparation failure cases
atomic adoption and rollback cases
rapid-resize stale and superseded cases
pointer-pick viewport correlation
first visible frame acknowledgement
local static-server smoke
fresh deployed Pages smoke
```

## Promotion gate

```txt
source checks pass
  AND browser viewport matrix passes
  AND allocation remains within policy
  AND rollback preserves predecessor
  AND pointer receipts cite committed viewport
  AND first visible frame cites accepted revision
  AND fresh Pages smoke passes
```

## Current status

```txt
npm run check: not run in this documentation pass
browser viewport fixtures: unavailable
built-output viewport smoke: unavailable
Pages viewport smoke: unavailable
production readiness: not claimed
```
