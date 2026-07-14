# Next steps: The Unmapped House terminal completion settlement and resume

**Timestamp:** `2026-07-14T06-00-41-04-00`  
**Status:** `audited`

## Summary

The smallest safe implementation is to add terminal outcome state and a pure settlement reducer before changing interlude rendering. Terminal presentation should then become a projection of accepted state and be restorable after reload.

## Plan ledger

**Goal:** make final completion durable, idempotent, resumable and visibly provable without broad runtime restructuring.

- [ ] Add `storyManifestRevision` and terminal outcome schema version.
- [ ] Add stable `TerminalOutcomeId`, `OutcomeRevision` and `SettlementCommandId`.
- [ ] Add `TerminalCompletionCommand` with expected story-state revision.
- [ ] Validate final scene and all required clue evidence.
- [ ] Return `AlreadySettled` for duplicate completion.
- [ ] Prepare outcome, route, Notebook and terminal controls as one candidate.
- [ ] Commit the candidate atomically to in-memory story state.
- [ ] Stage, read back and promote the durable save generation.
- [ ] Publish `TerminalOutcomeSettlementResult`.
- [ ] Derive interlude title, text and controls from accepted outcome state.
- [ ] Replace generic Continue with authored terminal commands.
- [ ] Admit and reconstruct the terminal route during boot.
- [ ] Publish `TerminalResumeResult`.
- [ ] Publish `FirstTerminalOutcomeFrameAck`.
- [ ] Add source, browser, production-artifact and Pages fixtures.

## Ordered implementation

### 1. Extend canonical state

Add a nullable terminal outcome document to the canonical story state. Keep the outcome small, versioned and derived only from accepted final-scene completion.

### 2. Make settlement pure

Implement a reducer that receives the current story state, manifest and command, then returns either a rejected result or a detached settlement candidate. Do not touch DOM or storage inside the reducer.

### 3. Commit once

Adopt the outcome, terminal route, Notebook entry and control manifest together. Duplicate commands must return the accepted outcome without another mutation.

### 4. Verify durability

Write a staged save document, read it back, compare its fingerprint and only then report `DurableCommitted`. Preserve a degraded but visible completion result when storage is unavailable.

### 5. Project from state

Render the terminal interlude from the outcome document on both live completion and boot resume. Generic scene Continue must not remain active when no successor exists.

### 6. Prove the first frame

The acknowledgement must cite:

```txt
outcome ID and revision
story state revision
story manifest revision
final scene ID
save generation and durability status
terminal projection revision
terminal control manifest revision
viewport revision
frame sequence
```

## Required fixtures

```txt
premature completion
valid final completion
duplicate completion
stale command
storage denied
readback mismatch
reload before first terminal frame
reload after durable completion
malformed and incompatible outcome documents
repeated terminal controls
reset from terminal route
source, production artifact and Pages origins
```

## Do not combine yet

Keep save admission, scene-transition composition, viewport, provider admission, hotspot picking, WebGL recovery and ordinary interlude timing as bounded authorities. Terminal settlement consumes their accepted identities and results.