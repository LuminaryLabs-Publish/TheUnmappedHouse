# Deploy audit: keyboard modal fixture gate

**Timestamp:** `2026-07-12T06-30-34-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

## Summary

The current package check parses JavaScript but does not load the deployed page or test focus navigation. Pages can deploy successfully while hidden Continue remains keyboard-admissible.

## Plan ledger

**Goal:** add a deployment gate that proves the static production route preserves modal semantics and blocks keyboard scene skipping.

- [x] Identify current syntax-only validation boundary.
- [x] Define local DOM fixtures.
- [x] Define browser keyboard and accessibility smoke rows.
- [x] Define Pages acceptance criteria.
- [ ] Implement fixtures and wire them into deployment.

## Required pre-deploy fixtures

```txt
closed interlude inert
hidden Continue absent from tab order
hidden Continue activation rejected
open interlude has dialog semantics
focus enters and remains in dialog
background controls inert
Continue requires current completion proof
duplicate Continue idempotent
```

## Required production smoke

```txt
open GitHub Pages route
start from cleared storage
Tab through full closed page
assert Continue never receives focus
complete scene through normal inspections
assert open interlude receives focus
assert background controls cannot activate
activate Continue once
assert exactly one successor scene
repeat across all three scenes
capture accessibility tree and focus trace
```

## Failure policy

Any of the following blocks a modal-correctness or gameplay-progression claim:

```txt
hidden Continue focusable
hidden Continue activatable
background controls focusable while open
missing dialog semantics
Continue accepted without current completion proof
more than one transition from one proof
production route differs from local behavior
```

## Validation boundary

Deployment configuration was not changed and no Pages smoke was run.
