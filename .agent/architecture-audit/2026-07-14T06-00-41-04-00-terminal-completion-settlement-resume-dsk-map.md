# Architecture audit: terminal completion settlement and resume DSK map

**Timestamp:** `2026-07-14T06-00-41-04-00`

## Summary

The existing architecture has scene completion, delayed interlude presentation, a terminal copy branch and localStorage, but no domain owns the durable transition from final-scene completion to a resumable terminal outcome.

## Plan ledger

**Goal:** define one bounded parent authority and the services it coordinates without restructuring the current renderer or story-data format.

- [x] Identify current owners.
- [x] Separate authored completion predicates from runtime settlement.
- [x] Define command, candidate, commit, resume and frame-proof boundaries.
- [x] Preserve current kit inventory.
- [ ] Implement the authority.

## Current ownership

| Domain | Current owner | Gap |
|---|---|---|
| Story manifest | `story-data-kit` | No terminal outcome descriptor or version. |
| Completion predicate | `sceneComplete()` | Boolean only; no accepted completion command. |
| Interlude scheduling | `interlude-timer-kit` | Presentation delay is not a durable transition. |
| Route progression | `scene-route-kit` | No terminal route identity. |
| Terminal copy | `terminal-route-kit` | Mutates DOM only. |
| Persistence | `localstorage-save-kit` | Stores no terminal outcome generation. |
| UI | `browser-story-runtime-kit` | Does not reconstruct terminal state on boot. |
| Rendering | `stage-render-kit` | Publishes no terminal frame acknowledgement. |

## Required parent domain

```txt
the-unmapped-house-terminal-completion-settlement-resume-authority-domain
```

## Service graph

```txt
story-outcome-manifest
  -> final-scene-completion-admission
  -> terminal-completion-command
  -> terminal-outcome-candidate
  -> terminal-outcome-settlement
  -> durable-outcome-commit
  -> outcome-readback-verification
  -> terminal-presentation-projection
  -> first-terminal-outcome-frame-ack

boot
  -> terminal-resume-admission
  -> terminal-presentation-projection
  -> first-terminal-outcome-frame-ack
```

## Required contracts

```txt
TerminalCompletionCommand {
  commandId
  expectedStoryStateRevision
  storyManifestRevision
  finalSceneId
  completionEvidence
}

TerminalOutcome {
  outcomeId
  schemaVersion
  manifestRevision
  finalSceneId
  settledStoryStateRevision
  completedAt
  routeStatus
}

TerminalOutcomeSettlementResult {
  status
  outcomeRevision
  saveGeneration
  participantReceipts
  diagnostics
}
```

## Admission rules

- Final scene must match the active manifest.
- Every required clue must be present.
- Duplicate commands must return the existing outcome, not create another.
- Save promotion must be verified before `Durable` is reported.
- Reload must classify and admit the saved outcome before terminal controls appear.
- Generic Continue must not remain active after terminal settlement.
- Visible completion is proven only by a frame acknowledgement tied to the accepted outcome revision.

## Scope boundary

This authority consumes accepted save-schema, scene-transition, viewport, renderer and interaction identities. It does not replace those bounded authorities.