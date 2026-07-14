# Gameplay audit: final-scene completion and reload loop

**Timestamp:** `2026-07-14T06-00-41-04-00`

## Summary

Final completion is reachable once, but it is not resumable. The last Continue click changes presentation copy without changing gameplay state, and reload reconstructs a completed final scene with no terminal route.

## Plan ledger

**Goal:** ensure the final clue, outcome settlement, save, reload and terminal controls form one deterministic gameplay loop.

- [x] Trace all final-scene commands.
- [x] Identify reload behavior.
- [x] Identify repeated-command behavior.
- [ ] Implement idempotent settlement and resume.

## Current gameplay loop

```txt
inspect third required final-scene hotspot
  -> grant final clue
  -> complete = true
  -> write Notebook entry
  -> schedule interlude
  -> save ordinary story state

press Continue
  -> no successor scene
  -> show prototype-complete copy
  -> no terminal flag
  -> no new Notebook entry
  -> no terminal save
  -> Continue remains enabled

reload
  -> final scene restores
  -> complete = true in debug projection
  -> interlude hidden
  -> all hotspot buttons marked inspected
  -> re-read returns before completion scheduling
  -> no completion UI can be recovered
```

## Gameplay risks

- Completion is not a durable game state.
- Repeated Continue has no typed duplicate result.
- Reload can strand the player after all required work is complete.
- Reset is the only reliable escape from the stranded state.
- Analytics, achievements, unlocks or future chapter handoff have no stable outcome identity.
- The Notebook does not record an accepted terminal settlement.

## Required statuses

```txt
PrematureRejected
CompletionAccepted
AlreadySettled
DurableCommitted
DurableCommitFailed
ResumeAccepted
ResumeRejected
TerminalProjected
TerminalFrameAcknowledged
ResetAccepted
```

## Completion criteria

A terminal outcome is complete only when it is settled once, durably verified, reconstructable after reload, presented with authored terminal controls and acknowledged in a matching visible frame.