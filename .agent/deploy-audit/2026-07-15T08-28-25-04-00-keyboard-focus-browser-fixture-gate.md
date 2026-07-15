# Deploy audit: keyboard focus browser fixture gate

**Timestamp:** `2026-07-15T08-28-25-04-00`

## Summary

The package check validates JavaScript syntax only. It does not launch a browser, activate hotspot buttons, inspect `document.activeElement`, compare source and built output or verify the deployed Pages route.

## Plan ledger

**Goal:** require keyboard-focus evidence from source, production artifact and deployed Pages before claiming inspection continuity.

- [x] Identify current syntax-only validation boundary.
- [x] Define required keyboard-only fixtures.
- [x] Define source/artifact/Pages parity evidence.
- [ ] Implement fixtures.
- [ ] Run them on `main` output.

## Required fixtures

```txt
boot focus order
  -> Tab reaches hotspot controls in authored order

first inspection
  -> activate focused hotspot with Enter
  -> accepted control remains connected and focused
  -> label changes to inspected state

repeat inspection
  -> activate the same focused hotspot again
  -> focus remains stable

neighbor traversal
  -> Tab advances from the retained control to the next authored hotspot

scene completion
  -> final required inspection settles
  -> interlude focus authority takes ownership

scene transition
  -> Continue enters successor scene
  -> focus lands on authored successor target

canvas inspection
  -> canvas click does not unexpectedly steal semantic focus

failure rollback
  -> simulated projection failure preserves predecessor controls and focus
```

## Parity gate

Run the same assertions against:

1. source served locally,
2. the production static artifact,
3. the published GitHub Pages URL.

Capture route, commit SHA, control IDs, active element, scene revision and screenshots for the first matching focus-stable frame.

No browser, artifact or Pages fixture was executed in this audit.