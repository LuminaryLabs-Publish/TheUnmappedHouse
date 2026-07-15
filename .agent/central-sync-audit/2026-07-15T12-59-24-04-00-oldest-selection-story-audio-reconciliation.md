# Central sync audit: oldest-selection story audio reconciliation

**Timestamp:** `2026-07-15T12-59-24-04-00`

## Summary

The full Publish comparison produced no new, ledger-missing, root-agent-missing, undocumented or runtime-ahead eligible repository. TheUnmappedHouse was therefore selected as the oldest synchronized eligible repository.

## Plan ledger

**Goal:** preserve deterministic one-repository selection and provide the exact central update required after repo-local documentation lands.

- [x] Enumerate 11 accessible Publish repositories.
- [x] Exclude TheCavalryOfRome.
- [x] Confirm ten eligible central ledgers and root `.agent` states.
- [x] Confirm current TheUnmappedHouse head matched its documented repo-local head before writing.
- [x] Select one repository only.
- [x] Add the story-audio audit family.
- [ ] Bind the final repo-local documentation head in the central ledger.
- [ ] Add the central internal change-log entry.

## Selection order

```txt
TheUnmappedHouse   2026-07-15T08-28-25-04-00  selected
PhantomCommand     2026-07-15T08-41-37-04-00
AetherVale         2026-07-15T09-00-08-04-00
TheLongHaul        2026-07-15T09-40-51-04-00
MyCozyIsland       2026-07-15T10-01-08-04-00
IntoTheMeadow      2026-07-15T10-40-17-04-00
PrehistoricRush    2026-07-15T10-58-45-04-00
HorrorCorridor     2026-07-15T11-39-04-04-00
TheOpenAbove       2026-07-15T12-02-38-04-00
ZombieOrchard      2026-07-15T12-39-01-04-00
```

## Central record contract

Update `repo-ledger/LuminaryLabs-Publish/TheUnmappedHouse.md` with the story-audio status, summary, interaction loop, domain and kit census, finding, required authority, repo-local paths, validation boundary and final repo-local documentation head.

Add `internal-change-log/2026-07-15T12-59-24-04-00-the-unmapped-house-story-audio-event-projection.md` describing the selection, files, findings and unchanged runtime boundary.