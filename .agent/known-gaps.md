# Known Gaps

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Updated:** `2026-07-08T11-28-38-04-00`

## Architecture gaps

- Story authority is embedded in `src/game.js` UI handlers.
- Module-level `state` and `currentScene` are mutated directly.
- There is no command envelope for inspection, continuation, load, save, or reset.
- There are no stable accepted/rejected result records.
- There are no stable reason codes for invalid, duplicate, repeat, premature, malformed, prototype-complete, descriptor-invalid, or reset commands.
- Repeat hotspot inspection is a direct UI branch, not a typed repeated-inspection result.
- The clue ledger mutates directly through `grantClues`.
- Scene completion is calculated directly in the host runtime without a result contract.
- Interlude progression mutates route state directly through `nextScene`.
- Save writes happen directly from the same code path as UI projection.
- Reset deletes localStorage and reloads instead of returning a reset/save result.
- The debug notebook is a live projection, not a stable diagnostics API.
- `window.GameHost.getState()` is not yet exposed as an additive diagnostics seam.

## Fixture and validation gaps

- No DOM-free story fixture replay exists.
- No fixture matrix exists for hotspot inspection.
- No fixture matrix exists for scene completion and transition.
- No fixture matrix exists for repeat inspection.
- No fixture matrix exists for unknown hotspot rejection.
- No fixture matrix exists for continue-before-complete rejection.
- No fixture matrix exists for prototype-complete terminal state.
- No fixture matrix exists for save/load/reset parity.
- No validation exists for malformed or missing scene descriptors.
- No validation exists for duplicate scene ids.
- No validation exists for duplicate hotspot ids.
- No validation exists for `requiresToComplete` values that are never granted.
- No validation exists for unavailable next scenes.
- No fixture summary exists for a future CI or Pages deployment note.
- No static smoke script is present beyond `npm run check` syntax validation.
- No Pages deploy proof has been recorded in `.agent/` after the current docs pass.

## Renderer and stage gaps

- StageKit owns renderer, camera, raycaster, scene loading, post pass, animation, hotspot volumes, and pointer input in one module.
- StageKit is reusable in intent, but not yet split into descriptor, renderer-host, material, postprocess, camera, and picking kits.
- Stage props are limited to box, cylinder, and plane primitives.
- There is no stage descriptor validation before rendering.
- Hotspot meshes are invisible boxes, but the system does not separately expose hotspot descriptor validation.
- Post-process settings are applied directly as uniform updates, not as a renderer handoff contract.
- StageKit render facts are not yet projected into stable diagnostics.
- StageKit must not be extracted before the story authority fixtures prove the existing live behavior.

## Product gaps

- The story has only three rooms.
- The player can inspect and progress, but there is no inventory or memory relationship layer.
- There is no route graph for branching rooms.
- The game has no audio stings, controller navigation, save slots, or accessibility pass beyond basic HTML structure.
- The anime horror art direction is present, but not yet supported by a broader reusable stage prop vocabulary.

## Central tracking gaps

- `TheUnmappedHouse` has repo-local `.agent` state and central `repo-ledger` state.
- The previous central status-summary rollup gap is closed by `LuminaryLabs-Dev/LuminaryLabs:repo-checks/reports/status-summary.json` schema `1.18.0`.
- Future repo-breakdown selection should not repeatedly select this repo solely because of old status-summary rollup language.
- Current selection is valid only as fallback story-authority follow-up work.

## Documentation gaps fixed by prior passes

- Root `.agent/START_HERE.md` was missing.
- Root `.agent/current-audit.md` was missing.
- Root `.agent/next-steps.md` was missing.
- Root `.agent/known-gaps.md` was missing.
- Root `.agent/validation.md` was missing.
- Root `.agent/turn-ledger/` did not have a timestamped entry.
- Root `.agent/architecture-audit/` did not have a domain breakdown.
- Root `.agent/render-audit/` did not have a StageKit render audit.
- Root `.agent/interaction-audit/` did not have a hotspot loop audit.
- Root `.agent/trackers/` did not have a scheduled breakdown entry.
- A central-ledger readback pass added `.agent/central-ledger-audit/publish-ledger-comparison.md`.
- A later central report pass added `TheUnmappedHouse` into `status-summary.json` publish-game rollup state.
- A story command/result acceptance pass added exact command names, reason codes, result names, and fixture cases.
- A story authority source wire map pass named helper files and reducer/projection boundaries.

## Documentation gaps fixed by this pass

- Refreshed `.agent/START_HERE.md`.
- Refreshed `.agent/current-audit.md`.
- Refreshed `.agent/known-gaps.md`.
- Refreshed `.agent/next-steps.md`.
- Refreshed `.agent/validation.md`.
- Refreshed `.agent/kit-registry.json`.
- Added `.agent/architecture-audit/2026-07-08T11-28-38-04-00-story-fixture-replay-dsk-breakdown.md`.
- Added `.agent/render-audit/2026-07-08T11-28-38-04-00-stage-gamehost-readback.md`.
- Added `.agent/interaction-audit/2026-07-08T11-28-38-04-00-story-fixture-replay-contract.md`.
- Added `.agent/trackers/2026-07-08T11-28-38-04-00/project-breakdown.md`.
- Added `.agent/turn-ledger/2026-07-08T11-28-38-04-00.md`.
- Updated central ledger/change-log state for this follow-up.

## Primary unresolved ledge

```txt
TheUnmappedHouse Story Fixture Replay Contract + GameHost Projection Gate
```

The next source change should add pure command/result authority, fixture replay, and additive diagnostics without changing story copy, route shape, StageKit visuals, localStorage key, or Pages workflow.
