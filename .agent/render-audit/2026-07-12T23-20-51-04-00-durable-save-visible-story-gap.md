# Render audit: Durable Save and Visible Story Gap

**Timestamp:** `2026-07-12T23-20-51-04-00`

## Summary

The browser projects mutated story state before durable persistence is verified. A save exception, stale tab or reset race can therefore leave the stage and Notebook showing facts that do not match the durable snapshot.

## Plan ledger

**Goal:** require every visible story frame to identify the durable save or reset commit it represents.

- [x] Trace mutation, UI projection and save ordering.
- [x] Trace cross-tab and reset divergence paths.
- [x] Define frame acknowledgement requirements.
- [ ] Implement and execute render/save parity fixtures.

## Current ordering

```txt
inspect hotspot
  -> mutate inspected/clues/log
  -> update text and Notebook
  -> call localStorage.setItem

Continue
  -> mutate scene/route/log
  -> load successor stage
  -> render controls and Notebook
  -> call localStorage.setItem
```

The rendered frame has no save revision, commit ID, fingerprint or storage result.

## Visible divergence paths

```txt
setItem throws
  -> visible clue or successor scene remains
  -> durable snapshot remains older

remote tab commits a newer snapshot
  -> current tab receives no reconciliation
  -> current stage and Notebook remain stale

one tab resets
  -> another tab remains on predecessor state
  -> stale tab can render and repersist it
```

## Required presentation contract

```txt
StorySaveCommitResult
  -> exact save revision and fingerprint
  -> accepted canonical snapshot
  -> UI and StageKit projection
  -> renderer completes the matching frame
  -> FirstVisibleSaveFrameAck

StoryResetResult
  -> exact reset generation/tombstone
  -> reset snapshot projection
  -> FirstVisibleResetFrameAck
```

A frame acknowledgement should include story-run ID, scene ID, scene revision, save revision, reset generation, snapshot fingerprint and render-frame sequence. Failed or rejected saves must never be labeled durable.