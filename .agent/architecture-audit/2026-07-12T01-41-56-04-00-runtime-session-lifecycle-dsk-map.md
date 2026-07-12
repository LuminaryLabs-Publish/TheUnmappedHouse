# Runtime Session Lifecycle Authority DSK map

Timestamp: `2026-07-12T01-41-56-04-00`

## Plan ledger

**Goal:** compose one parent domain that owns runtime identity, callbacks, scene-resource generations and ordered disposal.

- [x] Identify current ownership boundaries.
- [x] Separate session, callback, resource, retirement and observation responsibilities.
- [x] Define composition order and invariants.
- [ ] Implement and fixture-test the domain.

## Parent domain

```txt
the-unmapped-house-runtime-session-lifecycle-authority-domain
```

## Composition

```txt
identity
  runtime-session-id-kit
  runtime-session-generation-kit
  runtime-lifecycle-state-kit

commands and transactions
  runtime-start-command-kit
  runtime-stop-command-kit
  startup-rollback-kit
  runtime-dispose-plan-kit
  runtime-dispose-result-kit

callback ownership
  callback-generation-fence-kit
  animation-frame-lease-kit
  event-listener-lease-kit
  timeout-lease-kit

resource ownership
  scene-resource-generation-kit
  stage-resource-registry-kit
  renderer-resource-owner-kit
  render-target-resource-owner-kit
  hotspot-resource-owner-kit
  three-resource-disposer-kit

commit and retirement
  scene-resource-retirement-kit

observation and proof
  runtime-observation-kit
  runtime-lifecycle-journal-kit
  runtime-lifecycle-fixture-kit
  scene-transition-resource-leak-fixture-kit
  stale-callback-fixture-kit
  restart-idempotence-fixture-kit
```

## Ownership rules

```txt
one runtime session owns one RAF lease
one callback lease cites one session generation
one scene load creates one resource generation
one resource appears in exactly one active or retiring inventory
one retirement receipt is emitted per resource generation
one stop plan cancels callbacks before disposing GPU resources
one restart creates a new session generation
```

## Ordered stop

```txt
READY
  -> STOPPING
  -> reject new commands
  -> increment callback fence
  -> cancel RAF
  -> cancel timeouts
  -> remove listeners
  -> retire active scene generation
  -> dispose post resources
  -> dispose render target
  -> dispose renderer/context
  -> remove canvas
  -> DISPOSED
```

## Upstream and downstream

Upstream: StoryManifest, StorySnapshot, pointer, inspection, transition and narrative results.

Downstream: render-surface revisions, WebGL recovery and committed-frame diagnostics.

## Reuse boundary

Keep generic session, lease, cleanup-stack and Three.js disposal mechanics reusable. Keep story scene semantics and TheUnmappedHouse resource inventory in product adapters.
