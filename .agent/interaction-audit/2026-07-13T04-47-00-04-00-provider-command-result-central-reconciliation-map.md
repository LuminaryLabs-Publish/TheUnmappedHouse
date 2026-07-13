# Interaction audit: provider command and result reconciliation map

**Timestamp:** `2026-07-13T04-47-00-04-00`

## Summary

Renderer boot currently has no application command, attempt identity, timeout, cancellation, retry or terminal result. Browser module loading implicitly decides whether interaction can exist.

## Plan ledger

**Goal:** admit provider acquisition through explicit commands and terminal results before exposing story interaction.

- [x] Identify the implicit provider attempt.
- [x] Define command, attempt and generation identities.
- [x] Define terminal result statuses.
- [x] Define stale, duplicate and cancellation behavior.
- [ ] Implement the interaction boundary.

## Required map

```txt
RenderProviderBootCommand
  -> normalize provider policy and approved candidates
  -> allocate ProviderAttemptId and generation
  -> acquire under timeout and cancellation lease
  -> verify version, fingerprint and required API contract
  -> return one RenderProviderResult

Accepted | FallbackAccepted
  -> StageConstructionCommand
  -> StageConstructionResult
  -> story interaction enabled

Unavailable | TimedOut | IntegrityRejected | VersionRejected |
ContractRejected | Cancelled | Duplicate | Stale
  -> no stage or story generation
  -> provider-independent failure projection
  -> explicit RetryProviderCommand or terminal exit
```

Late results from a predecessor attempt must return `Stale` and perform zero mutation. Duplicate retry actions must not construct multiple StageKit instances.