# Known gaps: The Unmapped House

**Timestamp:** `2026-07-12T04-44-36-04-00`

## Summary

The newest documented gap is browser-storage commit and cross-tab convergence. The runtime writes one full mutable story aggregate without a durable revision, writer identity, compare-and-swap admission, typed result, error containment or remote-tab reconciliation.

## Plan ledger

**Goal:** keep durable-state, conflict, reset and existing story/render dependencies explicit.

- [x] Trace every storage read, write and reset path.
- [x] Confirm full-state writes follow live mutation and DOM projection.
- [x] Confirm no revision, writer identity or conflict policy exists.
- [x] Confirm no `storage` event listener exists.
- [x] Confirm write/reset exceptions are not contained.
- [x] Define fixture and browser proof gaps.
- [ ] Implement and execute the storage convergence authority.

## Storage capability and effect gaps

```txt
storage capability observation: absent
volatile-session status: absent
write failure classification: absent
quota/security classification: absent
serialization result: absent
write verification/readback: absent
reset result: absent
storage effect journal: absent
```

## Revision and conflict gaps

```txt
writer session id: absent
snapshot revision: absent
expected predecessor revision: absent
compare-and-swap admission: absent
stale writer rejection: absent
manifest-aware merge policy: absent
conflict result: absent
reset barrier/tombstone: absent
```

## Cross-tab gaps

```txt
storage event listener: absent
remote writer identity: absent
remote revision validation: absent
cross-tab reconcile result: absent
reset propagation: absent
stale-tab retirement: absent
convergence fixture: absent
```

## Concrete risks

```txt
Tab B can overwrite Tab A's newer clues, inspections, route and log
startup save can throw after StageKit and UI initialization
inspection save can throw after visible progress has changed
reset in one tab can be undone by a stale write from another tab
UI/debug state can claim progress without durable success status
```

## Retained upstream and downstream gaps

```txt
StoryManifest and StorySnapshot authorities remain unimplemented
canvas and side-panel input parity remains unimplemented
inspection/completion and Continue transactions remain unimplemented
narrative projection remains unrevisioned
runtime callback and scene-resource lifecycle remains unimplemented
render-surface and WebGL context generations remain unimplemented
committed-frame diagnostics remain unimplemented
```

## Validation gaps

- `npm run check` is syntax-only.
- No fake-storage fixture injects write or reset failure.
- No two-tab fixture proves stale-writer rejection or convergence.
- No reset-barrier fixture prevents snapshot resurrection.
- No browser smoke proves volatile mode when storage is unavailable.
- No narrative or frame observation cites a durable snapshot revision.

## Completion boundary

Do not claim persistence correctness because one tab survives reload. Completion requires typed effects, revision admission, explicit conflict policy, reset propagation and multi-tab browser proof.
