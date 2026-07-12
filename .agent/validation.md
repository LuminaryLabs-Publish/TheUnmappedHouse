# Validation: The Unmapped House

**Timestamp:** `2026-07-12T06-30-34-04-00`

## Summary

This run changed documentation only. Source inspection proves that the interlude remains mounted while closed, closed state uses opacity, pointer blocking and `aria-hidden`, Continue stays enabled, and its click handler calls `nextScene()` without a completion or modal-state predicate. No current code establishes keyboard inertness, dialog focus isolation or completion-proof consumption.

## Plan ledger

**Goal:** distinguish visual overlay state from keyboard-safe modal and Continue authority.

- [x] Inspect the interlude markup and native Continue control.
- [x] Inspect closed/open CSS.
- [x] Inspect interlude opening and Continue handling.
- [x] Confirm absence of `inert`, disabled and tabindex policies.
- [x] Confirm absence of dialog role, `aria-modal`, focus entry, trap and return.
- [x] Confirm absence of Continue admission and proof consumption.
- [x] Confirm current package validation is syntax-only.
- [x] Document required pure DOM and browser fixtures.
- [ ] Execute fixtures after implementation.

## Proven from source

```txt
interlude is always present in index.html
closed state starts aria-hidden=true
closed CSS uses opacity:0
closed CSS uses pointer-events:none
Continue is a native enabled button
Continue has no disabled attribute
interlude has no inert attribute
interlude has no role=dialog
interlude has no aria-modal=true
showInterlude does not move focus
nextScene does not check sceneComplete()
nextScene does not check interlude open state
nextScene does not consume a completion proof
background inspection buttons are not disabled or inert while open
```

## Existing checks prove

```txt
src/aspect-frame.js parses
src/game.js parses
src/stage-kit.js parses
src/story-data.js parses
```

## Existing checks do not prove

```txt
closed-control keyboard inertness
sequential focus order
hidden Continue activation rejection
dialog semantics
focus entry, trap or return
background command suspension
completion-gated Continue
stale or duplicate activation handling
modal-to-transition correlation
screen-reader behavior
```

## Change boundary

```txt
runtime source changed: no
story content changed: no
focus behavior changed: no
modal semantics changed: no
transition behavior changed: no
render behavior changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check: not run
browser smoke: not run
```

## Required fixtures

```txt
fixture:closed-modal-inertness
fixture:hidden-continue-not-focusable
fixture:hidden-continue-activation-rejected
fixture:open-modal-dialog-semantics
fixture:focus-origin-capture
fixture:focus-entry
fixture:focus-trap
fixture:background-controls-inert
fixture:focus-return
fixture:continue-requires-completion-proof
fixture:stale-modal-generation-rejected
fixture:duplicate-continue-idempotent
fixture:modal-observation-detached
fixture:modal-journal-bounded
smoke:keyboard-scene-skip-blocked
smoke:screen-reader-modal-contract
smoke:pages-modal-focus
```

## Current result

```txt
modal focus authority implemented: no
hidden Continue inertness proven: no
background interaction isolation proven: no
completion-gated Continue proven: no
assistive-technology semantics proven: no
```

No keyboard-modal safety, scene-skip prevention, focus isolation or completion-admission claim is made.
