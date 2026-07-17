# Central sync audit: oldest-selection runtime frame fault reconciliation

**Timestamp:** `2026-07-16T23-40-57-04-00`  
**Status:** `prepared-for-central-reconciliation`

## Selection

The full Publish inventory contained 11 repositories. Ten remained eligible after excluding `LuminaryLabs-Publish/TheCavalryOfRome`. All eligible repositories had central ledgers, root `.agent` state and synchronized documented heads. `TheUnmappedHouse` had the oldest central timestamp and was the only selected repository.

## Repo-local additions

```txt
.agent/trackers/2026-07-16T23-40-57-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-16T23-40-57-04-00.md
.agent/architecture-audit/2026-07-16T23-40-57-04-00-runtime-frame-fault-containment-dsk-map.md
.agent/render-audit/2026-07-16T23-40-57-04-00-repeating-frame-fault-visible-surface-gap.md
.agent/gameplay-audit/2026-07-16T23-40-57-04-00-frame-fault-story-mutation-divergence-loop.md
.agent/interaction-audit/2026-07-16T23-40-57-04-00-frame-fault-command-result-map.md
.agent/runtime-fault-audit/2026-07-16T23-40-57-04-00-frame-retry-retirement-recovery-contract.md
.agent/deploy-audit/2026-07-16T23-40-57-04-00-runtime-frame-fault-source-build-pages-fixture-gate.md
.agent/central-sync-audit/2026-07-16T23-40-57-04-00-oldest-selection-runtime-frame-fault-reconciliation.md
```

## Root indexes to refresh

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

## Central records

```txt
repo-ledger/LuminaryLabs-Publish/TheUnmappedHouse.md
internal-change-log/2026-07-16T23-40-57-04-00-the-unmapped-house-runtime-frame-fault-containment.md
```

## Finding

The recursive renderer schedules its successor before executing any frame phase. A repeated throw can continue receiving callbacks without typed failure settlement, bounded retry, backoff, retirement, safe projection or restart-frame proof.

## Boundary

Documentation only. No runtime or deployment readiness claim is made.