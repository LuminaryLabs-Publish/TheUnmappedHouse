# Central sync audit: oldest selection and scene-entry narrative reconciliation

**Timestamp:** `2026-07-16T16-58-39-04-00`  
**Status:** `central-reconciled`

## Summary

The full accessible `LuminaryLabs-Publish` inventory contains 11 repositories. `TheCavalryOfRome` is excluded. All ten eligible repositories have central ledger records and root `.agent` state. No eligible repository was new, ledger-missing, root-agent-missing, undocumented or runtime-ahead. TheUnmappedHouse had the oldest synchronized central timestamp and was the only Publish repository changed.

## Plan ledger

**Goal:** preserve deterministic repository selection and reconcile one central record for the scene-entry narrative finding.

- [x] Compare the full Publish inventory.
- [x] Exclude TheCavalryOfRome.
- [x] Confirm ten eligible ledgers and root `.agent` states.
- [x] Select TheUnmappedHouse only.
- [x] Add timestamped repo-local documentation on `main`.
- [x] Bind the final repo-local documentation head in the central ledger and add the central change log.

## Selection snapshot

```txt
selected: LuminaryLabs-Publish/TheUnmappedHouse
reason: oldest synchronized eligible repository
prior timestamp: 2026-07-16T09-58-49-04-00
next oldest: LuminaryLabs-Publish/PhantomCommand
next timestamp: 2026-07-16T10-38-36-04-00
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Finding snapshot

```txt
successor route/stage/title/hotspots/save: adopted
successor openingText: not deliberately projected
predecessor hotspot text: may remain visible
SceneEntryNarrativeResult: absent
FirstSceneEntryFrameAck: absent
```

## Central result

Central status: `scene-entry-narrative-projection-authority-central-reconciled`.

Central outputs:

```txt
repo-ledger/LuminaryLabs-Publish/TheUnmappedHouse.md
internal-change-log/2026-07-16T16-58-39-04-00-the-unmapped-house-scene-entry-narrative-projection.md
```

Only `main` was used. No branch or pull request was created.