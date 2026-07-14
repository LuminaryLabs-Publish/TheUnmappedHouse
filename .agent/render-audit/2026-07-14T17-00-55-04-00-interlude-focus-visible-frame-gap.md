# Render audit: interlude focus and visible-frame gap

**Timestamp:** `2026-07-14T17-00-55-04-00`  
**Status:** `audited`

## Summary

The overlay can be visually hidden while its Continue control remains keyboard-active, or visually open while focus remains on background controls. A screenshot alone cannot prove that the accepted visual state and interaction state agree.

## Plan ledger

**Goal:** bind visible interlude and successor frames to the same modal, route and focus revisions used for command admission.

- [x] Inspect interlude CSS, DOM semantics and frame ownership.
- [x] Confirm opacity and pointer events do not remove descendants from keyboard focus.
- [x] Confirm no focus or visible-frame acknowledgement exists.
- [ ] Add executable first-frame and focus proofs.

## Current gap

```txt
closed interlude
  opacity: 0
  pointer-events: none
  aria-hidden: true
  Continue focusability: retained

open interlude
  opacity: 1
  pointer-events: auto
  aria-hidden: false
  modal semantics: absent
  background focusability: retained
  active focus transfer: absent
```

## Required frame evidence

```txt
FirstInterludeModalFrameAck
  interlude generation
  completed scene revision
  aria/modal revision
  background inert revision
  active focus owner
  rendered frame ID

FirstFocusStableSceneFrameAck
  successor route revision
  successor scene revision
  closed interlude revision
  restored focus owner
  rendered frame ID
```

A pixel-correct overlay is insufficient when hidden controls can still execute route commands. No renderer or CSS behavior changed.