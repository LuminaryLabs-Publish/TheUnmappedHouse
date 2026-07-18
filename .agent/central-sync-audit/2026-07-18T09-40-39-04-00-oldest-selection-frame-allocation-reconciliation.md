# Central sync audit: oldest selection and frame-allocation reconciliation

**Timestamp:** `2026-07-18T09-40-39-04-00`  
**Status:** `repo-local-complete-central-sync-pending`

## Selection

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger missing: 0
root .agent missing: 0
new or undocumented: 0
runtime-ahead: 0
selected: LuminaryLabs-Publish/TheUnmappedHouse
selection rule: oldest synchronized documented timestamp
prior timestamp: 2026-07-17T22-39-01-04-00
next oldest: LuminaryLabs-Publish/PhantomCommand
```

## Repo-local reconciliation

The prior render-resolution audit remains retained. This run adds render-frame callback identity, camera scratch ownership, source-allocation observation, budget settlement and presented-frame proof.

## Central record required

Update:

```txt
LuminaryLabs-Dev/LuminaryLabs/repo-ledger/LuminaryLabs-Publish/TheUnmappedHouse.md
```

Add:

```txt
LuminaryLabs-Dev/LuminaryLabs/internal-change-log/2026-07-18T09-40-39-04-00-the-unmapped-house-render-loop-frame-allocation.md
```

The central ledger must record the final repo-local documentation head after the repo-local and central reconciliation commits settle.

## Boundary

No other Publish repository is modified. No branch or pull request is created.