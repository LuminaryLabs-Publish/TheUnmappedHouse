# Gameplay audit: Completion, Continue and Reload Loop

**Timestamp:** `2026-07-12T20-51-16-04-00`

## Summary

The authored clue loop is deterministic in normal pointer use, but scene advancement is not admitted by the completion state and the transition phase is not durable.

## Plan ledger

**Goal:** preserve the intended inspect-all-hotspots loop across keyboard input, delayed callbacks, reload and terminal completion.

- [x] Trace all nine hotspots and three completion requirements.
- [x] Trace completion scheduling and Continue.
- [x] Trace reload before and after interlude opening.
- [ ] Add executable gameplay fixtures.

## Intended loop

```txt
inspect all three scene hotspots
  -> earn all required clues
  -> complete current scene
  -> view interlude
  -> Continue once
  -> enter the next authored scene
```

## Current bypass loop

```txt
focus hidden Continue
  -> nextScene without completion check
  -> persist successor route
  -> repeat until terminal copy
```

## Current reload dead-end

```txt
inspect final required hotspot
  -> state saves complete facts
  -> 450 ms timer pending
  -> reload before callback
  -> boot restores complete scene
  -> no timer or interlude phase restored
  -> overlay remains visually closed
```

## Required gameplay result

```txt
SceneProgressionResult {
  accepted,
  reason,
  commandId,
  storyRunGeneration,
  predecessorSceneId,
  predecessorSceneRevision,
  successorSceneId?,
  successorSceneRevision?,
  routeRevision,
  phase,
  terminalOutcomeId?
}
```

## Invariants

```txt
incomplete scenes never advance
one predecessor scene revision advances at most once
scene order follows the admitted manifest
reload preserves or deterministically reconstructs the phase
terminal is an explicit state, not only copy
story facts and route cannot diverge through hidden controls
```
