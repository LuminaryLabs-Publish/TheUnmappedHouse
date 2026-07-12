# Architecture audit: Story Manifest and Snapshot Admission DSK Map

**Timestamp:** `2026-07-12T17-20-42-04-00`

## Summary

The missing authority is not one large game-specific kit. It is a coordinated domain composed from content, data, persistence, runtime and presentation boundaries.

## Plan ledger

**Goal:** place each responsibility in the narrowest reusable domain while keeping The Unmapped House composition explicit.

- [x] Separate authored content validation from persisted-state validation.
- [x] Separate persistence effects from startup admission.
- [x] Separate canonical story semantics from Three.js presentation.
- [x] Define result and observation boundaries.
- [ ] Implement the DSK composition.

## Domain map

```txt
Core Data
  schema ids and versions
  structural validation
  canonical indexes
  immutable freeze
  deterministic fingerprint

Story Content
  scene and hotspot semantics
  clue reference integrity
  route graph
  entry and terminal semantics
  render-descriptor constraints

Persistence
  byte read result
  JSON parse result
  snapshot schema version
  deterministic migration
  write barrier

Story Runtime
  manifest/snapshot compatibility
  stale-id reconciliation
  canonical snapshot
  startup command and result
  active manifest/snapshot revisions

Presentation
  scene/UI/render adapters
  first visible startup frame acknowledgement

Diagnostics
  detached observations
  bounded journal
  fixtures and deployment gates
```

## Parent composition

```txt
the-unmapped-house-story-manifest-snapshot-admission-authority-domain
  uses Core Data validation and fingerprint services
  uses Story Content semantic validation
  uses Persistence parse/migration services
  owns product reconciliation policy
  commits canonical startup state
  publishes renderer-neutral results
  waits for presentation acknowledgement
```

## Candidate kit ownership

```txt
Core Data:
  story-manifest-id-kit
  story-manifest-version-kit
  story-manifest-schema-kit
  story-manifest-validation-kit
  scene-index-kit
  hotspot-index-kit
  clue-index-kit
  story-manifest-freeze-kit
  story-manifest-fingerprint-kit

Story Content:
  story-route-graph-kit
  manifest-snapshot-compatibility-kit

Persistence:
  story-snapshot-schema-version-kit
  story-snapshot-parser-kit
  story-snapshot-shape-validation-kit
  story-snapshot-migration-kit
  unknown-snapshot-field-rejection-kit

Story Runtime:
  story-snapshot-reconciliation-kit
  story-snapshot-admission-kit
  canonical-story-snapshot-kit
  story-startup-result-kit

Diagnostics and proof:
  story-startup-observation-kit
  story-startup-journal-kit
  first-startup-frame-ack-kit
  story-manifest-fixture-kit
  story-snapshot-fixture-kit
  browser-startup-smoke-kit
  pages-startup-smoke-kit
```

## Invariants

```txt
no consumer receives an unvalidated manifest
no consumer receives an unadmitted snapshot
one scene id maps to exactly one scene
one hotspot id is unique within its scene and canonical index
all completion requirements resolve to known clue ids
startup state cites the accepted manifest fingerprint
future snapshot schemas fail closed
migration order is deterministic and journaled
storage is not rewritten before startup admission commits
visible startup frame cites manifest and snapshot revisions
```
