# Deploy audit: Save-admission fixture gate

**Timestamp:** `2026-07-13T19-58-19-04-00`

## Summary

The package currently proves syntax only. Deployment readiness needs executable save-admission fixtures against source, served browser, built artifact and GitHub Pages behavior.

## Plan ledger

**Goal:** prevent publication when malformed, stale or incompatible saves can enter live story state or produce a mismatched visible scene.

- [x] Inventory current validation.
- [x] Define fixture classes and deployment gates.
- [ ] Add automated fixtures.
- [ ] Execute source, browser, build and Pages matrices.

## Current validation

```txt
npm run check
  -> node --check src/aspect-frame.js
  -> node --check src/game.js
  -> node --check src/stage-kit.js
  -> node --check src/story-data.js
```

No persistence behavior is executed.

## Required fixture matrix

```txt
empty key
malformed JSON
null, string, number and array top-level values
wrong-type clues, flags, inspected, route and log
unknown scene ID
unknown clue ID
unknown inspected scene/hotspot ID
orphan route entry
duplicate and oversized collections
current valid envelope
known predecessor schema migration
known manifest remap
unknown schema
unknown manifest
migration failure
quarantine failure
canonical fallback
immediate canonical writeback
first admitted visible scene
reset after quarantine
reload after migration
```

## Gate levels

```txt
source gate
  pure parser, validator, fingerprint and migration tests

browser gate
  localStorage seeding, startup result, interaction readiness and visible-scene checks

built-output gate
  fresh static artifact with the same fixtures

Pages gate
  deployed origin accepts current saves and safely contains malformed/incompatible saves
```

## Release rule

A deployment is not save-admission-ready until every non-current document produces one typed terminal result, mutates no live predecessor state, and ends on a visible scene matching the canonical admitted state.