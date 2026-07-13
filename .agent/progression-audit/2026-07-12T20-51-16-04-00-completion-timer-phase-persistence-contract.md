# Progression audit: Completion Timer, Phase and Persistence Contract

**Timestamp:** `2026-07-12T20-51-16-04-00`

## Summary

Completion facts are persisted, but the transition phase and timer ownership are not. This permits stale callback behavior and reload divergence.

## Plan ledger

**Goal:** define one canonical phase machine whose state can be persisted, reconciled and replayed independently of DOM timing.

- [x] Define the current implicit phases.
- [x] Identify impossible and ambiguous saved states.
- [x] Define timer and persistence contracts.
- [ ] Implement phase migration and recovery.

## Canonical phase machine

```txt
INSPECTING
  -> newly complete
COMPLETION_PENDING
  -> valid timer delivery or deterministic startup reconciliation
INTERLUDE_OPEN
  -> admitted Continue
TRANSITIONING
  -> successor commit
INSPECTING | TERMINAL
```

## Timer lease

```txt
CompletionTimerLease {
  leaseId,
  storyRunGeneration,
  sceneId,
  expectedSceneRevision,
  expectedRouteRevision,
  dueAtMonotonic,
  status
}
```

The timer callback may only open the interlude when every predecessor field still matches and the phase remains `COMPLETION_PENDING`.

## Persisted progression

```txt
ProgressionSnapshot {
  schemaVersion,
  manifestFingerprint,
  storyRunGeneration,
  sceneId,
  sceneRevision,
  route,
  routeRevision,
  phase,
  completionRevision,
  terminalOutcome?
}
```

Timer handles are browser-local and are not persisted. On startup, a valid `COMPLETION_PENDING` snapshot must allocate a replacement lease or deterministically promote to `INTERLUDE_OPEN` under a documented policy.

## Reconciliation rules

```txt
complete facts + INSPECTING
  -> repair to COMPLETION_PENDING or INTERLUDE_OPEN

incomplete facts + INTERLUDE_OPEN
  -> reject/quarantine snapshot

unknown scene + any phase
  -> reject/quarantine snapshot

TERMINAL + nonfinal scene
  -> reject/quarantine snapshot

route does not end at sceneId
  -> reject/quarantine snapshot
```

## Exactly-once rules

```txt
one completion revision creates at most one open-interlude result
one scene revision accepts at most one Continue result
one terminal predecessor creates at most one terminal outcome
replayed callbacks and commands return the original or a duplicate result
```
