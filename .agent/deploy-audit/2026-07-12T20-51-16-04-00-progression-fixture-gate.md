# Deploy audit: Progression Fixture Gate

**Timestamp:** `2026-07-12T20-51-16-04-00`

## Summary

The existing package check proves JavaScript syntax only, and the Pages workflow uploads the repository root without a progression-specific browser gate.

## Plan ledger

**Goal:** prevent deployment of keyboard-skippable, reload-stuck or stale-timer progression behavior.

- [x] Inspect package scripts.
- [x] Inspect the Pages workflow.
- [x] Define local, built-route and deployed fixture rows.
- [ ] Implement and wire the gate.

## Current delivery proof

```txt
npm run check
  -> node --check four JavaScript files

push to main
  -> checkout
  -> configure Pages
  -> upload repository root
  -> deploy
```

No browser is launched, no keyboard navigation is exercised and no timer/reload state is validated.

## Required gate

```txt
syntax
  -> existing node checks

browser progression
  -> closed Continue cannot focus/activate
  -> incomplete Continue rejects
  -> complete scene opens one interlude
  -> stale timer rejects
  -> duplicate Continue advances once
  -> reload after completion restores continuation
  -> modal background controls are inert
  -> terminal survives reload

deployed Pages
  -> repeat critical rows against the published URL
  -> record commit SHA, story manifest fingerprint and result
```

## Failure policy

Any hidden-control activation, incomplete advancement, lost continuation path, duplicate transition, focus leak or terminal-reload divergence must fail the deployment proof.
