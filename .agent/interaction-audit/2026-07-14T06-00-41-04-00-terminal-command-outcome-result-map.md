# Interaction audit: terminal command, outcome and result map

**Timestamp:** `2026-07-14T06-00-41-04-00`

## Summary

The same Continue button is used for ordinary scene advancement and terminal completion, but the terminal branch returns no command result, changes no state and leaves the button active.

## Plan ledger

**Goal:** give every completion and terminal control one route-aware command with a terminal result.

- [x] Map current input routes.
- [x] Identify missing command identity and admission.
- [x] Define terminal results and control policy.
- [ ] Implement and test interaction admission.

## Current routes

```txt
DOM hotspot button -> inspectHotspot(hotspot)
canvas hotspot     -> inspectHotspot(hotspot)
Continue button    -> nextScene()
KeyR               -> delete save + reload
```

## Divergence

```txt
Continue in non-final scene
  -> advances scene, updates route, closes interlude, loads stage, renders UI, saves

Continue in final scene
  -> changes two text nodes and returns
  -> no state revision
  -> no persistence
  -> no result
  -> button remains reusable
```

## Required command map

| Command | Admission | Terminal result |
|---|---|---|
| `CompleteStory` | Final scene, all required clues, current revision | `TerminalOutcomeSettlementResult` |
| `ResumeTerminalOutcome` | Valid admitted outcome generation | `TerminalResumeResult` |
| `RestartStory` | Authored terminal control and explicit intent | `StoryResetResult` |
| `ExitPrototype` | Host capability available | `TerminalExitResult` |
| Duplicate `CompleteStory` | Existing outcome matches | `AlreadySettled` |
| Stale completion | Expected revision mismatch | `StaleRejected` |

## Interaction policy

- The interlude control manifest must be route-specific.
- Generic Continue is valid only when an authored successor scene exists.
- Terminal controls must be derived from accepted outcome state.
- Repeated commands must be idempotent or explicitly rejected.
- Input is restored after reload only after terminal outcome admission and projection.

## Required proof

A browser fixture must complete the final scene, press terminal controls repeatedly, reload, and verify that the same outcome generation and control manifest are restored.