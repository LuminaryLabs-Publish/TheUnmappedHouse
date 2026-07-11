# Architecture audit: story manifest and persistence DSK map

Timestamp: `2026-07-11T08-11-14-04-00`

## Goal

Define the smallest domain composition that gives story definitions, loaded state and written state a canonical versioned identity without changing current content or presentation.

## Current architecture

```txt
story-data.js mutable descriptor array
  -> game.js direct import
  -> raw initial-state factory
  -> localStorage JSON.parse
  -> shallow object merge
  -> currentScene fallback
  -> direct story mutations
  -> raw JSON.stringify write

story-data.js same descriptors
  -> StageKit.loadScene
  -> Three.js resources and hotspot payloads
```

## Current domains

```txt
story definition
scene order and identity
hotspot and clue identity
mutable story snapshot
route, inspection, clue and log ledgers
implicit phase and completion
localStorage effects
story projection
scene render consumption
```

## Missing parent domain

```txt
the-unmapped-house-story-manifest-persistence-domain
```

### Responsibilities

```txt
admit one canonical immutable StoryManifest
build scene/hotspot/clue ownership indexes
compute definition fingerprint
admit or reject persisted envelopes
migrate supported legacy saves
reconcile persisted identities against the manifest
produce one canonical StorySnapshot
compute state fingerprint
return typed load and save results
retain bounded persistence diagnostics
```

## Existing kits to update first

| Existing kit | Required update |
|---|---|
| `story-data-kit` | Export a manifest candidate, not an unqualified mutable authority object. |
| `browser-story-runtime-kit` | Start only from an admitted load result and canonical snapshot. |
| `scene-route-kit` | Resolve and correct scene identity through reconciliation. |
| `inspection-ledger-kit` | Store canonical receipts or reconciled ids only. |
| `clue-ledger-kit` | Derive grants from canonical inspection provenance. |
| `notebook-log-kit` | Validate and bound persisted rows. |
| `localstorage-save-kit` | Read/write a versioned envelope with typed outcomes. |
| `scene-descriptor-consumer-kit` | Consume immutable manifest projections with fingerprint provenance. |
| `debug-json-projection-kit` | Report manifest id, revisions, fingerprints and last persistence result. |
| `package-syntax-check-kit` | Execute manifest and persistence fixtures. |

## Candidate coordinating kits

| Candidate kit | Service |
|---|---|
| `story-manifest-schema-kit` | Validate normalized story-definition shape. |
| `story-manifest-index-kit` | Build canonical scene, hotspot and clue indexes. |
| `story-manifest-fingerprint-kit` | Canonically serialize and hash definition content. |
| `story-snapshot-schema-kit` | Define durable semantic story state. |
| `story-snapshot-normalizer-kit` | Sort, bound and normalize snapshot collections. |
| `versioned-save-envelope-kit` | Wrap snapshot with schema, manifest and revision metadata. |
| `save-admission-kit` | Parse, classify, validate and return typed load results. |
| `save-migration-kit` | Convert the current raw v1 object shape once. |
| `save-reconciliation-kit` | Correct or drop identities against the active manifest. |
| `story-load-result-kit` | Represent missing, accepted, migrated, reconciled, rejected and failed loads. |
| `story-save-result-kit` | Represent written, unchanged, conflict and storage failures. |
| `story-state-fingerprint-kit` | Identify the normalized semantic snapshot. |
| `story-persistence-journal-kit` | Retain bounded before/after revision and result rows. |
| `manifest-persistence-fixture-kit` | Prove schema, migration, reconciliation and write behavior. |

## Proposed data flow

```txt
raw story source
  -> normalize
  -> validate
  -> index
  -> fingerprint
  -> freeze StoryManifest

localStorage raw value
  -> parse classification
  -> envelope/schema admission
  -> optional v1 migration
  -> manifest compatibility policy
  -> identity reconciliation
  -> normalize StorySnapshot
  -> fingerprint
  -> typed StoryLoadResult
  -> runtime commit

runtime candidate state
  -> normalize StorySnapshot
  -> expected save-revision check
  -> envelope serialization
  -> localStorage write
  -> typed StorySaveResult
  -> persistence journal
```

## Authority rules

```txt
manifest data owns labels, copy, grants, requirements and render descriptors
persisted data may reference canonical ids but may not define them
clues are derived from admitted inspection receipts
completion is derived from canonical owned clue receipts
active scene id and persisted scene id must never diverge
unknown data is corrected or rejected explicitly, never silently retained
```

## Dependency order

```txt
manifest schema
  -> indexes
  -> definition fingerprint
  -> StorySnapshot schema
  -> load admission
  -> v1 migration
  -> reconciliation
  -> state fingerprint
  -> typed save transaction
  -> fixture gate
  -> inspection command authority
```
