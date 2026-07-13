# Known gaps: The Unmapped House

**Timestamp:** `2026-07-12T23-20-51-04-00`

## Summary

The newest documented gap is browser save commit and reset convergence. Tab-local story state, durable storage, cross-tab delivery, reset invalidation and visible projection can diverge.

## Plan ledger

**Goal:** eliminate lost updates, stale-tab overwrite, reset resurrection and false durability claims while preserving the authored story aggregate.

- [x] Trace whole-snapshot save ordering.
- [x] Trace ignored storage delivery.
- [x] Trace reset and stale-tab resurrection.
- [x] Define candidate authority kits and fixture rows.
- [ ] Implement and execute the authority.

## Save identity and admission gaps

```txt
save session ID: absent
writer ID: absent
command ID: absent
save revision: absent
reset generation: absent
expected predecessor revision: absent
expected predecessor fingerprint: absent
snapshot fingerprint: absent
conflict admission: absent
duplicate command result: absent
```

## Durability gaps

```txt
canonical save envelope: absent
immutable candidate snapshot: absent
durable readback verification: absent
write-failure result: absent
readback-mismatch result: absent
rollback/non-durable projection policy: absent
bounded save journal: absent
```

## Cross-tab gaps

```txt
storage event listener: absent
storage payload validation: absent
delivery envelope: absent
deduplication: absent
monotonic revision admission: absent
reordered event rejection: absent
cross-tab reconciliation result: absent
stale writer rejection: absent
```

## Reset gaps

```txt
reset command identity: absent
reset predecessor admission: absent
durable reset tombstone: absent
reset generation increment: absent
pending save invalidation: absent
other-tab convergence: absent
reset-resurrection rejection: absent
reset result: absent
```

## Presentation gaps

```txt
save revision in Notebook: absent
snapshot fingerprint in Notebook: absent
save/reset result projection: absent
first visible durable-save frame acknowledgement: absent
first visible reset frame acknowledgement: absent
```

## Retained independent gaps

```txt
story manifest/snapshot admission implementation
scene-progression and interlude authority implementation
stage resource disposal and runtime stop
Notebook channel separation
render-surface budgeting and WebGL context recovery
committed-frame diagnostics
```

## Completion boundary

Do not claim save safety because localStorage writes one key atomically. The missing boundary is compare-and-admit across independently mutable tabs. Completion requires exact predecessor checks, typed durability results, monotonic storage delivery, reset tombstones, stale-writer rejection and visible-frame evidence.