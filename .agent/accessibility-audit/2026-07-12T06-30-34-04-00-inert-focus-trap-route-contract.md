# Accessibility audit: inert, focus trap and route contract

**Timestamp:** `2026-07-12T06-30-34-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

## Summary

The interlude uses `aria-hidden` as a visibility marker but does not implement the native and semantic requirements of a modal dialog. This creates a mismatch between screen-reader visibility, keyboard focus reachability and story command admission.

## Plan ledger

**Goal:** define one accessibility contract where semantic visibility, keyboard focus and command capability change atomically.

- [x] Inspect current attributes and CSS.
- [x] Identify missing dialog semantics.
- [x] Identify missing focus lifecycle.
- [x] Identify missing background inertness.
- [x] Define fixture expectations.
- [ ] Implement and test with browser accessibility APIs.

## Closed-state contract

```txt
interlude state = closed
aria-hidden = true
inert = true
Continue disabled or removed from focus order
Continue capability = disabled
active focus cannot enter interlude
```

## Open-state contract

```txt
interlude state = open
role = dialog
aria-modal = true
aria-hidden = false
background roots inert = true
focus origin captured
focus moved to Continue or dialog heading
Tab and Shift+Tab remain inside dialog
Escape policy explicit
```

## Close/transition contract

```txt
modal generation retired
background inertness released
focus returned only if predecessor view remains current
successor transition receives its own focus policy
stale modal callbacks cannot restore predecessor focus
```

## Assistive-technology proof

```txt
closed interlude absent from accessibility tree
closed Continue absent from focus navigation
open dialog has accessible name
open dialog exposes modal semantics
background controls are not actionable
one Continue result maps to one transition result
```

## Validation boundary

No accessibility tree snapshot, keyboard trace or screen-reader test was run. The document defines the required contract only.
