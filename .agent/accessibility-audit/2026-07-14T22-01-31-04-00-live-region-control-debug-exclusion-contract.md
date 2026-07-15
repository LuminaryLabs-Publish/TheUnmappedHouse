# Accessibility audit: live-region control and debug exclusion contract

**Timestamp:** `2026-07-14T22-01-31-04-00`  
**Status:** `audited`

## Plan ledger

**Goal:** expose concise story status without turning the complete interactive panel into a live region.

- [x] Verify `aria-live="polite"` is on the containing `aside`.
- [x] Verify the region contains heading, narrative, controls and debug JSON.
- [x] Verify `renderUi()` rebuilds controls and debug content.
- [x] Define a dedicated announcement boundary.
- [ ] Run screen-reader fixtures.

## Current contract gap

```txt
live region owner: entire story panel
contains interactive controls: yes
contains debug JSON: yes
aria-atomic policy: absent
aria-relevant policy: absent
dedicated status element: absent
announcement queue: absent
deduplication: absent
screen-reader fixture: absent
```

## Required contract

```txt
story panel
  -> no live-region ownership
  -> stable heading and controls

dedicated semantic status element
  -> role=status or equivalent
  -> explicit aria-live policy
  -> explicit atomic/relevant policy
  -> concise authored message only
  -> revision and result metadata outside user-facing text

debug Notebook
  -> excluded from live announcements
  -> remains directly navigable when intentionally inspected
```
