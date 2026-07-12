# Deploy Audit: Browser Storage Convergence Fixture Gate

**Timestamp:** `2026-07-12T04-44-36-04-00`

## Current validation

`npm run check` performs JavaScript syntax checks only. It does not create browser storage, open multiple tabs, inject quota/security failures, dispatch storage events or inspect persistence results.

## Required pure fixtures

```txt
snapshot-envelope-parse
snapshot-revision-monotonic
stale-writer-rejected
manifest-mismatch-rejected
commutative-clue-merge-policy
ordered-route-conflict-rejected
reset-barrier-prevents-resurrection
storage-unavailable-returns-volatile-result
serialization-failure-classified
commit-observation-json-safe
journal-bounded
```

## Required browser fixtures

```txt
open two tabs at revision R0
Tab A commits clue A
Tab B attempts stale clue B commit
verify no silent lost update
verify one explicit conflict/reconcile result
verify both tabs converge on one accepted revision

block localStorage writes
verify startup enters explicit volatile mode
verify inspection remains coherent without claiming durability

reset from Tab A
verify Tab B observes reset barrier
verify stale Tab B cannot recreate predecessor progress
```

## Deployment matrix

```txt
Chromium normal storage
WebKit normal storage
private/restricted storage behavior
quota failure injection
multiple tabs
normal reload
bfcache restore
Pages deployment
```

Deployment is not storage-authority complete until stale writers, write failures, cross-tab events and reset propagation return typed results and the visible state cites the accepted durable or volatile revision.
