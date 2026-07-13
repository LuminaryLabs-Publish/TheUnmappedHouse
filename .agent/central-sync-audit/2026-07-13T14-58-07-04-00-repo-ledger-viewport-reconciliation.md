# Central sync audit: render-surface viewport reconciliation

**Timestamp:** `2026-07-13T14-58-07-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

## Summary

This run selected `TheUnmappedHouse` by the oldest eligible central timestamp, completed the repo-local viewport authority audit, and synchronized the central ledger and paired internal change log. No other Publish repository was modified.

## Plan ledger

**Goal:** keep repo-local evidence and `LuminaryLabs-Dev/LuminaryLabs` tracking aligned.

- [x] Compare ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm nine eligible central ledger entries.
- [x] Confirm the selected repository has root `.agent` state.
- [x] Add the `2026-07-13T14-58-07-04-00` tracker and audit family.
- [x] Refresh required root `.agent` files.
- [x] Record the final repo-local documentation head in the central ledger.
- [x] Add the paired internal change-log entry.

## Selection evidence

```txt
TheUnmappedHouse   2026-07-13T09-03-20-04-00 selected
AetherVale         2026-07-13T10-05-15-04-00
IntoTheMeadow      2026-07-13T10-59-22-04-00
PhantomCommand     2026-07-13T11-41-10-04-00
HorrorCorridor     2026-07-13T11-58-45-04-00
ZombieOrchard      2026-07-13T13-01-03-04-00
TheOpenAbove       2026-07-13T13-39-10-04-00
PrehistoricRush    2026-07-13T13-58-35-04-00
MyCozyIsland       2026-07-13T14-39-40-04-00
TheCavalryOfRome  excluded
```

## Central changes completed

```txt
updated repo-ledger/LuminaryLabs-Publish/TheUnmappedHouse.md
added internal-change-log/2026-07-13T14-58-07-04-00-the-unmapped-house-render-surface-viewport-authority.md
```

## Published findings

```txt
CSS and JavaScript both own the fixed-aspect frame
global window size is used instead of the actual host box
zero size is clamped to one pixel
DPR is capped but total pixel and GPU dimension policies are absent
DOM renderer target camera and pointer participants mutate without atomicity
no committed viewport readback or first viewport frame acknowledgement exists
```
