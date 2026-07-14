# Accessibility audit: modal focus and background inertness contract

**Timestamp:** `2026-07-14T17-00-55-04-00`  
**Status:** `audited`

## Summary

`aria-hidden` and pointer-event suppression do not create a keyboard-safe modal. The interlude needs semantic state, focus ownership, background inertness and deterministic restoration.

## Plan ledger

**Goal:** align visual, semantic and keyboard-modal state without changing the authored story.

- [x] Inspect interlude markup and styles.
- [x] Confirm no dialog role, `aria-modal`, focus transfer, inert background or focus restoration exists.
- [x] Confirm hidden Continue remains an active route command.
- [ ] Implement and test the modal contract.

## Required closed state

```txt
interlude not visible
interlude excluded from accessibility tree
Continue excluded from sequential focus
Continue command rejected
story panel and hotspot controls active
```

## Required open state

```txt
interlude has dialog semantics and accessible name
background story panel, stage and hotspot controls are inert
prior focus owner is captured
Continue receives focus
Tab remains within the modal
canvas and background inspection commands are rejected
```

## Required close/advance state

```txt
active interlude generation is retired
successor scene is admitted
background inertness is removed
focus moves to an authored successor target
screen-reader announcement cites the successor scene
one focus-stable frame is acknowledged
```

## Required fixture matrix

```txt
keyboard-only boot and tab order
hidden Continue cannot activate
open modal receives focus
Shift+Tab and Tab remain contained
background hotspot activation rejected
canvas click rejected while modal active
screen-reader dialog naming
Continue advances only completed scene
focus restoration after route advance
terminal scene focus behavior
reset shortcut policy during modal
```

No HTML, CSS or runtime accessibility behavior changed.