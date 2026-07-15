# Known gaps: The Unmapped House story save writer revision authority

**Timestamp:** `2026-07-15T18-02-58-04-00`  
**Status:** `audited`

## Summary

One fixed localStorage slot is shared by every same-origin document, but save writers have no identity, ordering, lease, conflict handling or durable reset epoch. Whole-state last-writer-wins replacement can regress progress or resurrect state after reset.

## Plan ledger

**Goal:** make save-slot identity, writer ownership, monotonic revision, conflict settlement and proof explicit.

- [x] Trace save and reset call sites.
- [x] Confirm no cross-document ordering protocol exists.
- [x] Define missing identities, policies and results.
- [ ] Implement and execute them.

## Identity gaps

```txt
StorySaveSlotId: implicit string only
DocumentId: absent
SaveWriterId: absent
SaveWriterGeneration: absent
SaveWriterLeaseId: absent
StorySaveCommitId: absent
StorySaveRevision: absent
StorySaveBaseRevision: absent
StorySaveFingerprint: absent
ResetEpoch: absent
SaveConflictId: absent
FirstDurableStorySaveAck: absent
FirstDurableStorySaveFrameAck: absent
```

## Admission gaps

```txt
active writer admission: absent
read-only document mode: absent
writer lease acquisition: absent
lease heartbeat and expiry: absent
writer takeover policy: absent
base-revision comparison: absent
compare-and-swap serialization: absent
post-write read-back verification: absent
stale-base rejection: absent
reset-epoch rejection: absent
duplicate commit rejection: absent
retired writer rejection: absent
```

## Cross-document gaps

```txt
storage event listener: absent
BroadcastChannel: absent
external head observation: absent
pending stale commit cancellation: absent
same-origin head broadcast: absent
cross-tab conflict result: absent
cross-tab read-only projection: absent
cross-tab reset settlement: absent
```

## Envelope and recovery gaps

```txt
versioned durable envelope: absent
monotonic save revision: absent
base revision: absent
writer metadata: absent
payload fingerprint: absent
durable reset tombstone: absent
verified predecessor: absent
bounded recovery history: absent
corrupt-head recovery policy: absent
quota/storage failure result: absent
```

## Interaction and projection gaps

```txt
saveState return result: absent
save pending state: absent
save conflict state: absent
save read-only state: absent
durable-head debug projection: absent
visible/durable revision convergence: absent
explicit reload/recover/export conflict action: absent
```

## Proof gaps

```txt
two-tab stale writer fixture: absent
three-tab lease contention fixture: absent
writer crash/expiry fixture: absent
storage-event reconciliation fixture: absent
BroadcastChannel fallback fixture: absent
reset resurrection fixture: absent
corrupt-head predecessor fixture: absent
quota/storage failure fixture: absent
source/artifact/Pages parity: absent
```

## Retained independent gaps

```txt
story audio event projection
inspection control focus continuity
motion preference visual-effect admission
story announcement semantic projection
interlude focus and route admission
page lifecycle suspension and resume
terminal completion settlement
WebGL context recovery
story-save schema and manifest admission
viewport authority
scene-transition composition
renderer-provider admission
hotspot picking
same-document save commit/reset convergence
interlude progression timing
stage resource lifecycle
```

## Completion boundary

Do not claim durable story persistence until stale writers are rejected, reset advances a durable epoch, external heads reconcile before later writes, conflicts are explicit and browser proof captures matching visible and durable revisions across source, artifact and Pages.