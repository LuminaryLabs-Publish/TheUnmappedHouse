# Next steps: The Unmapped House

**Timestamp:** `2026-07-12T20-51-16-04-00`

## Summary

The next implementation should establish progression phase and Continue admission before adding scenes or visual polish. The highest-risk defect is that hidden keyboard activation can bypass completion, while reload can lose the only visible continuation path.

## Plan ledger

**Goal:** replace implicit DOM/timer progression with one deterministic, persisted and testable scene-transition authority.

- [ ] Add a pure progression reducer with explicit phases.
- [ ] Make Continue a typed command that fails closed.
- [ ] Own and cancel the completion timer.
- [ ] Persist and reconcile progression phase.
- [ ] Add modal focus and inertness.
- [ ] Seal terminal state.
- [ ] Correlate interlude and successor frames.
- [ ] Add browser and Pages fixtures.

## Ordered implementation

### 1. Define canonical phases and revisions

```txt
INSPECTING
COMPLETION_PENDING
INTERLUDE_OPEN
TRANSITIONING
TERMINAL
```

Add `storyRunId`, `storyRunGeneration`, `sceneRevision`, `routeRevision` and a validated `phase`.

### 2. Make completion a reducer result

Move completion detection out of direct DOM mutation. Produce a `CompletionResult` containing the exact scene ID, expected scene revision and whether completion is newly committed.

### 3. Own the 450 ms delay

Retain a timer handle and lease ID. The callback must carry the predecessor scene/run generations and reject itself after scene change, reset, terminal commit or duplicate delivery.

### 4. Fail Continue closed

`ContinueCommand` must require:

```txt
phase == INTERLUDE_OPEN
current scene is complete
expected scene ID matches
expected scene revision matches
expected route revision matches
command has not already committed
```

The DOM click handler should only submit the command and project its typed result.

### 5. Make the interlude a real interaction context

While closed:

```txt
Continue disabled
Continue removed from tab order
overlay inert/hidden
```

While open:

```txt
dialog semantics
underlying story panel inert
focus moved to Continue
focus restoration policy recorded
Escape policy explicit
```

### 6. Reconcile reload

Persist the phase or derive it deterministically from validated facts. A complete nonterminal scene must reopen the interlude on boot without relying on a lost timer.

### 7. Seal terminal state

Commit a durable `TerminalOutcomeResult` and prevent further scene advancement. Reload must reproduce the same terminal route and copy.

### 8. Add visible-frame receipts

Record `FirstVisibleInterludeFrameAck` and `FirstVisibleSuccessorFrameAck` with scene, phase, route and render revisions.

### 9. Add fixture matrix

```txt
hidden Continue cannot receive focus or activate
incomplete scene Continue rejects
duplicate Continue advances once
stale completion timer rejects after transition
reload before timer restores continuation
reload with open interlude restores continuation
keyboard focus moves into and out of interlude
underlying controls are inert while open
final Continue commits one terminal result
reload after terminal restores terminal
```

## Do not combine yet

Keep stage-resource disposal, save-schema migration and render-context recovery as separate parent domains. Progression authority may depend on them, but it should not absorb their implementation details.
