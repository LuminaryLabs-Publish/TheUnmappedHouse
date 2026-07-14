# Deploy audit: terminal outcome fixture gate

**Timestamp:** `2026-07-14T06-00-41-04-00`

## Summary

The current package check parses JavaScript only. It cannot prove final completion, durable settlement, reload resume, terminal controls or visible-frame convergence in source, built output or GitHub Pages.

## Plan ledger

**Goal:** define the executable gate required before terminal outcome behavior can be considered deployable.

- [x] Inspect current validation and deployment boundary.
- [x] Define source, browser, artifact and Pages fixtures.
- [x] Define failure injections.
- [ ] Implement and run the matrix.

## Required fixture matrix

```txt
source model
  final scene incomplete -> completion rejected
  final required clue -> one outcome settled
  duplicate completion -> same outcome returned
  stale completion command -> rejected

browser
  complete final scene through DOM controls
  complete final scene through canvas picking
  press Continue repeatedly
  reload before terminal frame
  reload after terminal frame
  reset from terminal route
  storage denied
  storage readback mismatch
  malformed terminal outcome

visible proof
  terminal interlude shows accepted outcome
  generic Continue is removed or disabled
  first terminal frame cites outcome and save generation
  reload restores same outcome and control manifest

origins
  local source server
  production artifact
  GitHub Pages
```

## Deployment gate

Do not mark terminal completion ready when only the copy is visible. The gate requires deterministic outcome identity, durable readback, resume parity, route-specific controls and matching visible-frame acknowledgements across all supported origins.

## Current status

```txt
npm run check: not run
browser terminal fixture: unavailable
storage failure fixture: unavailable
reload resume fixture: unavailable
production artifact smoke: not run
Pages terminal smoke: not run
```

No deployment behavior changed in this audit.