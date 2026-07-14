# START HERE: The Unmapped House terminal completion settlement and resume

**Last updated:** `2026-07-14T06-00-41-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`  
**Status:** `terminal-completion-settlement-resume-authority-audited`

## Summary

`TheUnmappedHouse` is a fixed-camera anime-horror point-and-click prototype with three scenes, nine hotspots, clue-led progression, browser persistence, a fixed 16:9 shell, a visible Notebook and a descriptor-driven Three.js stage.

The active audit isolates the terminal completion loop. Final-scene completion is currently transient interlude text, not durable story truth. Reload can restore a fully completed final scene while leaving the terminal interlude hidden and unrecoverable.

## Plan ledger

**Goal:** settle final completion once, commit it durably, restore it after reload and prove the first matching terminal frame.

- [x] Compare the full Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheUnmappedHouse` by the oldest eligible timestamp.
- [x] Trace final clue, interlude, Continue, terminal copy, save and reload.
- [x] Preserve all 24 implemented kits and offered services.
- [x] Define terminal outcome settlement, durable commit, resume and visible proof.
- [x] Add the timestamped tracker and audit family.
- [ ] Implement and execute the authority.

## Active loop

```txt
final clue
  -> scene complete
  -> delayed interlude
  -> Continue
  -> no successor
  -> terminal DOM copy only
  -> no outcome state or terminal save

reload
  -> completed final scene restores
  -> interlude remains hidden
  -> inspected-hotspot re-read returns early
  -> terminal route is not reconstructed
```

## Required authority

```txt
the-unmapped-house-terminal-completion-settlement-resume-authority-domain
```

It coordinates completion admission, idempotent outcome identity, atomic settlement, durable save verification, terminal route and controls, reload admission and `FirstTerminalOutcomeFrameAck`.

## Read this run first

1. `current-audit.md`
2. `known-gaps.md`
3. `trackers/2026-07-14T06-00-41-04-00/project-breakdown.md`
4. `architecture-audit/2026-07-14T06-00-41-04-00-terminal-completion-settlement-resume-dsk-map.md`
5. `terminal-outcome-audit/2026-07-14T06-00-41-04-00-durable-settlement-resume-contract.md`
6. `interaction-audit/2026-07-14T06-00-41-04-00-terminal-command-outcome-result-map.md`
7. `gameplay-audit/2026-07-14T06-00-41-04-00-final-scene-completion-reload-loop.md`
8. `render-audit/2026-07-14T06-00-41-04-00-terminal-outcome-visible-frame-gap.md`
9. `deploy-audit/2026-07-14T06-00-41-04-00-terminal-outcome-fixture-gate.md`
10. `central-sync-audit/2026-07-14T06-00-41-04-00-repo-ledger-terminal-outcome-reconciliation.md`
11. `next-steps.md`
12. `validation.md`

## Retained audits

Save admission, viewport, scene transition, renderer-provider admission, hotspot picking, save commit/reset, interlude progression, stage lifecycle and WebGL recovery remain bounded retained authorities in `kit-registry.json`.

## Next safe ledge

Add a terminal outcome field and pure final-completion reducer before changing presentation. Then make the interlude a projection of that accepted state and prove reload parity.