# Interaction audit: provider boot-result admission map

**Timestamp:** `2026-07-13T04-29-43-04-00`

## Summary

The current page has no game-owned interaction before the external provider module resolves. This audit defines the command/result boundary needed for retry, fallback and cancellation without creating duplicate stages or story runtimes.

## Plan ledger

**Goal:** turn provider startup and user recovery into typed, generation-bound interactions with exactly-once stage construction.

- [x] Identify the absent pre-provider interaction surface.
- [x] Define boot, retry, cancel and fallback commands.
- [x] Define stale and duplicate rejection.
- [x] Bind stage construction to one accepted result.
- [ ] Implement and execute the interaction matrix.

## Command map

```txt
InitialBootCommand
  source: document bootstrap
  expectedProviderPolicyRevision
  expectedRuntimeGeneration

RetryProviderCommand
  source: visible recovery control
  predecessorAttemptId
  expectedProviderPolicyRevision

CancelProviderCommand
  source: page lifecycle or recovery control
  activeAttemptId

SelectApprovedFallbackCommand
  source: provider policy, not arbitrary user URL
  predecessorResultId
```

## Admission

```txt
command
  -> validate runtime and provider-policy generation
  -> reject duplicate/stale/revoked work
  -> allocate ProviderAttemptId
  -> resolve only approved candidates
  -> apply timeout and cancellation
  -> verify integrity, version and API contract
  -> publish one terminal RenderProviderResult
```

## Stage construction gate

```txt
Accepted/FallbackAccepted
  -> consume result exactly once
  -> allocate StageGeneration
  -> construct StageKit
  -> publish StageConstructionResult

all other results
  -> construct no stage
  -> expose typed recovery state
```

## Required result evidence

```txt
commandId
attemptId
providerPolicyRevision
providerId
providerGeneration
sourceClass
expectedVersion
observedVersion
expectedFingerprint
observedFingerprint or redacted digest
status
reasonCode
startedAt
completedAt
fallbackDepth
```

## Interaction fixtures

```txt
initial accepted provider
initial blocked provider
retry after unavailable
retry double-click deduplication
cancel during fetch
late predecessor success after retry
approved fallback success
unapproved source rejection
integrity mismatch
API contract mismatch
page retirement during attempt
```

## Validation boundary

No retry control, bootstrap adapter or provider command exists yet. No interaction fixture was executed.