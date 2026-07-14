# Terminal outcome audit: durable settlement and resume contract

**Timestamp:** `2026-07-14T06-00-41-04-00`

## Summary

Terminal completion needs a versioned outcome document and an idempotent settlement transaction. Final-scene completion, durable storage, terminal projection and reload admission must cite the same outcome generation.

## Plan ledger

**Goal:** define the smallest durable contract that prevents transient completion, duplicate settlement and reload dead ends.

- [x] Define outcome identity and schema.
- [x] Define settlement and resume commands.
- [x] Define commit, projection and frame receipts.
- [x] Define rejection and recovery statuses.
- [ ] Implement the contract.

## Outcome document

```txt
TerminalOutcomeDocument {
  schemaVersion
  outcomeId
  storyManifestRevision
  finalSceneId
  finalStoryStateRevision
  completionClueIds
  routeSnapshot
  settledAt
  settlementCommandId
}
```

## Settlement transaction

```txt
TerminalCompletionCommand
  -> validate final scene and completion evidence
  -> reject stale, premature or incompatible requests
  -> return existing outcome for a duplicate command
  -> prepare outcome, route, Notebook and terminal control state
  -> serialize one canonical save candidate
  -> write staged generation
  -> read back and fingerprint
  -> promote durable generation
  -> atomically adopt terminal state
  -> publish TerminalOutcomeSettlementResult
  -> project terminal interlude
  -> publish FirstTerminalOutcomeFrameAck
```

## Resume transaction

```txt
boot
  -> read save candidate
  -> admit schema and manifest revision
  -> validate terminal outcome against final story state
  -> reconstruct terminal route and controls
  -> project terminal interlude
  -> publish TerminalResumeResult
  -> publish FirstTerminalOutcomeFrameAck
```

## Required invariants

1. One accepted final-story state maps to one outcome ID.
2. A duplicate completion command cannot create a second outcome.
3. `DurableCommitted` requires successful readback verification.
4. Terminal UI cannot be the only holder of completion truth.
5. Reload cannot demote a valid terminal outcome to an ordinary scene.
6. Invalid outcome documents are rejected or quarantined through the existing save-admission boundary.
7. Terminal controls are authored and route-specific.
8. Visible completion cites the accepted outcome and save generation.

## Failure policy

```txt
storage unavailable -> show degraded completion, retain retry capability
readback mismatch   -> do not report durable completion
manifest mismatch   -> reject or migrate before projection
projection failure  -> retain accepted outcome and expose DOM fallback
stale command       -> preserve current outcome and return StaleRejected
```

## Bounded relationship

This contract extends the existing save-admission and scene-transition audits with terminal outcome semantics. It does not redefine renderer, viewport or WebGL recovery policy.