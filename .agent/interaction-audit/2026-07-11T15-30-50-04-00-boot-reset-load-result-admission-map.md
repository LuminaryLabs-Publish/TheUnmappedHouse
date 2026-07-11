# Interaction audit: boot, reset, and load-result admission map

Timestamp: `2026-07-11T15-30-50-04-00`

## Summary

Boot and reset are implicit side effects rather than typed commands. The document loads whatever the storage layer returns, starts the stage immediately, and later writes state without exposing accepted, migrated, reconciled, rejected, fallback, rollback, or reset results.

## Plan ledger

**Goal:** make boot, retry, quarantine recovery, reset, and clear explicit commands with immutable results and one session-generation fence.

- [x] Trace automatic module boot.
- [x] Trace localStorage read and write behavior.
- [x] Trace KeyR clear and page reload.
- [x] Identify missing command, result, and session identities.
- [x] Define interaction admission and recovery surfaces.
- [ ] Implement typed boot and reset commands.

## Current ingress map

```txt
document module evaluation
  -> implicit loadState()
  -> implicit stage allocation
  -> implicit scene load
  -> implicit UI projection
  -> implicit saveState()

KeyR
  -> localStorage.removeItem(SAVE_KEY)
  -> location.reload()
```

There is no user-visible or programmatic distinction between:

```txt
no save exists
save loaded successfully
legacy save migrated
save reconciled
malformed save rejected
semantically invalid save rejected
storage unavailable
fallback started
startup rolled back
reset clear failed
reload started
```

## Required commands

```txt
BootStoryCommand
  commandId
  source
  expectedSessionGeneration
  storageKey
  manifestId
  manifestFingerprint

RetryStoryBootCommand
  commandId
  predecessorLoadResultId
  expectedSessionGeneration
  recoveryMode

ResetStoryCommand
  commandId
  expectedSessionGeneration
  expectedSaveRevision?
  reason

ClearStorySaveCommand
  commandId
  expectedSaveId?
  expectedSaveRevision?
```

## Required result statuses

```txt
boot_committed
boot_defaulted
boot_migrated
boot_reconciled
boot_rejected
boot_rolled_back
retry_committed
retry_rejected
reset_committed
reset_rejected
clear_committed
clear_rejected
stale_generation
duplicate_command
storage_unavailable
```

## Recovery choices

Rejected raw input must remain recoverable. A host or UI should be able to choose:

```txt
retry unchanged
start temporary default without overwriting raw save
quarantine raw save and start default
run a supported migration
clear save explicitly
export diagnostic result
```

## Session fencing

Boot, retry, reset, clear, timeout, listener, RAF, and first-frame work must be bound to one `sessionGeneration`. A stale callback or prior failed boot must not write storage, project UI, or commit a stage into the current generation.

## Required interaction fixtures

```txt
boot-command-has-stable-id
boot-result-identifies-raw-read-and-manifest
malformed-save-produces-recoverable-rejection
fallback-does-not-overwrite-rejected-save
retry-consumes-one-predecessor-result
reset-advances-session-generation
clear-failure-does-not-reload
successful-clear-publishes-result-before-reload
stale-generation-callback-rejected
duplicate-reset-command-idempotent
results-detached-and-json-safe
```

## Validation status

The current browser exposes no typed boot, retry, reset, clear, or recovery result. KeyR performs an unverified clear followed by an unconditional reload.