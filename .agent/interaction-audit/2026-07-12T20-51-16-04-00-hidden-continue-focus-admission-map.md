# Interaction audit: Hidden Continue and Focus Admission Map

**Timestamp:** `2026-07-12T20-51-16-04-00`

## Summary

Visual opacity and pointer blocking are currently treated as if they were command admission. They are not sufficient for keyboard, assistive-technology or programmatic activation.

## Plan ledger

**Goal:** make one explicit interaction context determine which controls can receive focus and submit progression commands.

- [x] Trace DOM order, CSS visibility and event listeners.
- [x] Trace focus behavior when opening and closing the interlude.
- [x] Define fail-closed admission.
- [ ] Execute keyboard and accessibility fixtures.

## Current map

```txt
closed interlude
  opacity: 0
  pointer-events: none
  aria-hidden: true
  Continue.disabled: false
  Continue.tabIndex: default
  ancestor inert: false

open interlude
  opacity: 1
  pointer-events: auto
  aria-hidden: false
  focus transfer: none
  story panel inert: false
  focus trap: none
```

## Command path

```txt
Continue click
  -> nextScene()
  -> no command ID
  -> no expected scene or route revision
  -> no completion check
  -> no phase check
  -> no duplicate check
```

## Required admission

```txt
closed
  -> Continue disabled and removed from tab order
  -> overlay hidden/inert
  -> command submission rejects

open
  -> dialog owns focus
  -> underlying story controls inert
  -> Continue submits exact expected revisions
  -> duplicate/stale commands reject

transition
  -> all predecessor input rejected
  -> focus restoration waits for accepted successor frame
```

## Fixture rows

```txt
Tab never reaches closed Continue
programmatic click while closed rejects
Enter/Space on stale Continue rejects
open interlude moves focus to Continue
Tab cannot enter story controls behind interlude
duplicate activation advances once
focus lands on the successor's admitted control after transition
```
