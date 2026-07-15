# Gameplay audit: keyboard inspection focus-reset loop

**Timestamp:** `2026-07-15T08-28-25-04-00`

## Summary

The keyboard player can activate a hotspot, but the accepted action deletes the active button and rebuilds the entire list. Repeated exploration therefore requires reacquiring the control sequence after every inspection.

## Plan ledger

**Goal:** keep keyboard exploration continuous without changing clue rules, authored hotspot order or scene completion.

- [x] Trace first-time and repeated inspection paths.
- [x] Confirm both paths rebuild the complete list.
- [x] Confirm scene transitions also rebuild the list.
- [x] Define stable-focus behavior for accepted, repeated and retired controls.
- [ ] Implement and test complete keyboard-only scene traversal.

## Current loop

```txt
Tab to hotspot
  -> activate with Enter or Space
  -> hotspot grants clue or re-reads text
  -> complete button list is removed
  -> replacement list is appended
  -> browser focus continuity is unspecified
  -> player must rediscover position in the control sequence
```

## Expected loop

```txt
focus hotspot control H
  -> accept inspection command for H
  -> update H label and inspected state in place
  -> keep focus on H when H remains eligible
  -> move to authored fallback only when H is retired
  -> acknowledge the matching focus-stable UI frame
```

## Gameplay risks

- Keyboard-only inspection becomes needlessly repetitive.
- Focus loss can obscure which hotspot was just accepted.
- Repeated activation and clue review may restart navigation from the document beginning.
- Scene completion can overlap with delayed interlude opening while focus ownership is already lost.
- DOM and canvas inputs produce the same story mutation but no shared activation-origin result.

No story or gameplay behavior changed in this audit.