# Runtime fault audit: frame retry, retirement and recovery contract

**Timestamp:** `2026-07-16T23-40-57-04-00`  
**Status:** `audited`

## Goal

Prevent a persistent camera, material, scene-render or post-render failure from executing once per display refresh without bounded settlement.

## Required state

```txt
RuntimeFrameAuthorityState
  runtimeGeneration
  activeFrameGeneration?
  lastCompletedFrameGeneration?
  faultGeneration?
  faultFingerprint?
  consecutiveFaultCount
  retryBudget
  nextRetryAt?
  lifecycle: running | retry-wait | retired | recovering
  rendererGeneration
  targetGeneration
  lastSafeSceneGeneration?
```

## Failure classification

```txt
camera-update-failure
material-update-failure
scene-render-failure
post-render-failure
renderer-context-failure
render-target-failure
unknown-frame-failure
```

Every class must state whether it is retryable, requires resource replacement, or requires terminal retirement.

## Retry contract

- Retry count is bounded per fault fingerprint and runtime generation.
- Identical repeated failures are deduplicated.
- Backoff prevents retries at raw display-refresh cadence.
- Hidden or retired documents do not consume retry budget.
- A successful frame resets only the accepted fault generation.
- Exhausted retries retire the runtime exactly once.

## Retirement contract

```txt
retire successor callback lease
reject stale frame callbacks
suspend stage interactions
settle renderer and target ownership
preserve accepted story/save state
project one safe failure result
```

## Recovery contract

```txt
explicit restart request
  -> validate retired generation
  -> choose resume/reload/reset policy
  -> replace or reinitialize renderer resources
  -> bind accepted scene generation
  -> admit one recovery frame
  -> publish FirstRecoveredFrameAck
```

## Required fixtures

```txt
single transient camera failure
persistent material failure
persistent scene-render failure
persistent post-render failure
retry-budget exhaustion
backoff timing
fault deduplication
stale callback after retirement
restart idempotency
recovered frame acknowledgement
```

This contract is proposed documentation. No runtime implementation exists.