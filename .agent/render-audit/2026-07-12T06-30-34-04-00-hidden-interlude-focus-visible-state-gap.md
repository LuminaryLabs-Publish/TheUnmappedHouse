# Render audit: hidden interlude focus and visible-state gap

**Timestamp:** `2026-07-12T06-30-34-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

## Summary

The interlude has a visual closed state but no equivalent keyboard state. The rendered frame can show only the stage and story panel while the browser focus system still exposes Continue.

## Plan ledger

**Goal:** make visible modal state, focus reachability and accepted input describe the same committed UI generation.

- [x] Trace interlude CSS and DOM state.
- [x] Trace native focus and Continue activation.
- [x] Identify visible/focus contradiction.
- [x] Define frame and modal observation requirements.
- [ ] Implement and prove the correlation.

## Current contradiction

```txt
visible frame:
  interlude opacity = 0
  Continue not visually present

pointer model:
  interlude pointer-events = none
  Continue not pointer-activatable

keyboard model:
  Continue remains a native enabled button
  sequential focus eligibility is unchanged

semantic model:
  ancestor aria-hidden = true
  descendant can still receive native focus
```

The canvas frame and overlay appearance therefore do not prove which controls are keyboard-admissible.

## Open-state contradiction

```txt
visible frame:
  full-screen interlude appears modal

pointer model:
  overlay blocks background pointer interaction

keyboard model:
  no focus entry
  no trap
  background inspection buttons remain reachable
```

## Required render/read-model fields

```txt
uiGeneration
modalGeneration
modalState
activeElementId
focusLeaseId
backgroundInert
continueCapability
sceneCompletionProofId
renderFrameId
```

## Required first-frame rule

The first frame that visually presents an open interlude must cite the same modal generation that:

```txt
made background controls inert
exposed dialog semantics
focused Continue
enabled one proof-admitted Continue capability
```

A closed frame must cite a generation where Continue is not focusable or activatable.

## Fixture gate

```txt
closed-frame-no-focusable-continue
open-frame-background-inert
open-frame-active-element-in-dialog
modal-generation-matches-visible-frame
transition-frame-cites-consumed-proof
```

## Validation boundary

No rendering code or DOM behavior changed. No screenshot, focus trace or committed UI-frame fixture was run.
