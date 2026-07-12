# Deploy audit: destructive reset browser fixture gate

**Timestamp:** `2026-07-12T10-30-00-04-00`

## Summary

Static syntax checks cannot prove keyboard shortcut safety, storage durability or post-reset presentation. Browser and Pages fixtures are required.

## Plan ledger

**Goal:** block reset-related release claims until refresh and confirmed-reset behavior pass in a real browser.

- [x] Record current syntax-only validation.
- [x] Define local browser fixture matrix.
- [x] Define Pages smoke requirements.
- [ ] Add executable fixtures.
- [ ] Run fixtures against deployed Pages.

## Required matrix

```txt
Windows/Linux Chromium: Ctrl+R preserves save
macOS Chromium/WebKit: Meta+R preserves save
plain R without confirmation preserves save
repeat KeyR preserves save
hidden-page KeyR preserves save
confirmed reset clears save once
storage removal failure reports failure
stale second tab cannot restore reset save
pending timer cannot fire after committed reset
first clean frame cites reset generation
```

## Gate

Do not mark reset safety or persistence safety complete from `npm run check`. Release proof requires browser event semantics, real localStorage effects, navigation and visible-frame acknowledgement.
