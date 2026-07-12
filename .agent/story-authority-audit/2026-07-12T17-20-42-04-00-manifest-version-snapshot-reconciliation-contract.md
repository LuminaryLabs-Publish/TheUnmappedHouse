# Story authority audit: Manifest Version and Snapshot Reconciliation Contract

**Timestamp:** `2026-07-12T17-20-42-04-00`

## Summary

This contract defines the product-specific policy connecting reusable manifest validation and snapshot migration services.

## Plan ledger

**Goal:** make content updates and saved-state recovery deterministic, bounded and inspectable.

- [x] Define manifest identity.
- [x] Define snapshot identity.
- [x] Define migration and reconciliation order.
- [x] Define startup result.
- [ ] Implement.

## Manifest contract

```txt
manifestId: the-unmapped-house
semanticVersion: product content release
schemaVersion: descriptor schema
fingerprint: deterministic digest of canonical content
entrySceneId: library-blank-map
terminalSceneId: closet-weather
sceneOrder: explicit ids
indexes: scenes, hotspots, clues
routeGraph: explicit successor edges
```

## Snapshot contract

```txt
schemaVersion
snapshotRevision
manifestId
manifestFingerprint
sceneId
clues[]
flags
inspected
route[]
log[]
```

## Admission order

```txt
1. validate manifest structure
2. validate manifest semantics
3. build indexes and route graph
4. freeze and fingerprint manifest
5. read storage bytes
6. parse JSON into candidate
7. validate root and schema version
8. migrate old versions
9. reject future versions
10. verify manifest identity
11. reconcile stale ids under named policy
12. validate canonical invariants
13. commit immutable snapshot
14. install consumers
15. acknowledge visible frame
```

## Reconciliation policy requirements

```txt
never silently keep unknown fields
never silently coerce collection types
never invent clue acquisition
never mark unproven hotspots inspected
never keep route nodes absent from manifest
never continue from an unreachable scene
preserve raw rejected bytes for explicit recovery tooling
report every removed, reset or migrated field
```

## Typed result

```txt
StoryStartupResult
  resultId
  commandId
  status: committed | recovered | rejected
  manifestId
  manifestVersion
  manifestFingerprint
  sourceSnapshotVersion
  committedSnapshotRevision
  migrationsApplied[]
  reconciliationsApplied[]
  rejectedFields[]
  fallbackReason
  storageRewriteAllowed
  firstVisibleFrameId
```
