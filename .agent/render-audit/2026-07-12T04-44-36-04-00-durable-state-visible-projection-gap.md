# Render Audit: Durable State and Visible Projection Gap

**Timestamp:** `2026-07-12T04-44-36-04-00`

## Current sequence

```txt
inspection or Continue
  -> mutate live story state
  -> mutate DOM/debug projection
  -> mutate or replace stage resources
  -> attempt localStorage write
  -> next RAF presents later
```

## Gap

The visible story panel and debug JSON can advance before persistence succeeds. `saveState()` returns no result and does not catch storage exceptions. The stage render loop also has no durable revision input, so a future frame cannot distinguish:

```txt
state accepted and durably committed
state accepted but storage unavailable
state accepted in this tab but rejected as stale
state overwritten by another tab
state reset in another tab
```

## Required render correlation

Every narrative and canvas claim that progress is durable should cite:

```txt
storyRevision
snapshotRevision
writerSessionId
storageCommitId
storageCommitStatus
manifestFingerprint
frameId
```

## Required projection policy

```txt
pending durable commit
  -> project pending state explicitly or hold durable-success copy

accepted commit
  -> allow durable-success projection and frame correlation

rejected/conflicted commit
  -> project recovery/conflict state without silently claiming success

storage unavailable
  -> preserve playable in-memory state under an explicit volatile-session status
```

No visual defect is claimed from source inspection alone. The source proves that durable-state status and visible-frame provenance are absent.
