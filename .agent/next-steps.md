# Next steps: The Unmapped House interlude focus and route admission

**Timestamp:** `2026-07-14T17-00-55-04-00`  
**Status:** `audited`

## Summary

The smallest safe implementation is to guard route advancement first, then make interlude semantics, background inertness and focus ownership explicit.

## Plan ledger

**Goal:** close the keyboard route bypass without restructuring story or rendering.

- [ ] Reject Continue unless the current scene is complete and the matching interlude generation is active.
- [ ] Remove hidden Continue from sequential focus and command admission.
- [ ] Add `InterludeGeneration`, `StoryRevision`, `SceneRevision`, `RouteRevision` and `FocusOwnerRevision`.
- [ ] Add semantic dialog naming and `aria-modal` state.
- [ ] Make stage, story panel and hotspot controls inert while the interlude is active.
- [ ] Capture prior focus and move focus to Continue only after modal admission.
- [ ] Reject canvas and DOM inspection commands while modal state is active.
- [ ] Define the global reset policy during modal state.
- [ ] Validate active scene and expected route revision on Continue.
- [ ] Restore focus to the successor scene heading or first authored hotspot.
- [ ] Publish `InterludeOpenResult`, `InterludeContinueResult` and rejection receipts.
- [ ] Publish `FirstFocusStableSceneFrameAck`.
- [ ] Add keyboard-only, screen-reader, source, artifact and Pages fixtures.

## Ordered implementation

### 1. Guard the route boundary

Add a completion and active-interlude assertion inside the route command itself. Presentation state must not be trusted as proof.

### 2. Make hidden controls non-interactive

Use an explicit hidden/inert/disabled policy so the closed interlude and its Continue control are absent from focus order and command admission.

### 3. Admit modal state atomically

Open the overlay, apply semantic dialog state, inert the background, capture prior focus and focus Continue as one accepted transition.

### 4. Gate all background commands

Canvas clicks, hotspot buttons and reset shortcuts must consult the active modal generation and return typed rejection results when disallowed.

### 5. Restore focus with the successor scene

Scene advancement, stage loading, UI projection, modal retirement and focus restoration must settle against one route revision.

### 6. Prove the result

Run keyboard and screen-reader fixtures and acknowledge the first frame where the successor scene, closed modal and focus owner all match.

## Required fixtures

```txt
hidden Continue absent from tab order
premature synthetic click rejected
premature keyboard activation rejected
completed scene opens one semantic modal
focus moves to Continue
Tab and Shift+Tab remain in modal
background hotspot button rejected
canvas hotspot rejected
reset shortcut follows modal policy
Continue advances only matching completed scene
stale and duplicate Continue rejected
focus restored after successor scene
terminal scene focus policy
source, production artifact and Pages parity
```

## Do not combine yet

Keep page lifecycle, terminal completion, WebGL recovery, persistence, viewport, provider admission, hotspot picking and stage-resource lifecycle as retained authorities. The new parent consumes their identities and receipts.