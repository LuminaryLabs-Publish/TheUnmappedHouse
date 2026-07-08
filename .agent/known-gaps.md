# Known Gaps

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Updated:** `2026-07-08T02:40:00-04:00`

## Architecture gaps

- Story authority is embedded in `src/game.js` UI handlers.
- There is no command envelope for inspection, continuation, load, save, or reset.
- There are no stable accepted/rejected result records.
- There are no stable reason codes for invalid commands.
- The clue ledger mutates directly through `grantClues`.
- Scene completion is calculated directly in the host runtime without a result contract.
- Interlude progression mutates route state directly.
- Save writes happen directly from the same code path as UI projection.
- The debug notebook is a live projection, not a stable diagnostics API.

## Fixture and validation gaps

- No DOM-free story fixture replay exists.
- No fixture matrix exists for hotspot inspection.
- No fixture matrix exists for scene completion and transition.
- No validation exists for malformed or missing scene descriptors.
- No validation exists for duplicate hotspot ids.
- No validation exists for `requiresToComplete` values that are never granted.
- No validation exists for unavailable next scenes.
- No static smoke script is present.
- No Pages deploy proof has been recorded in `.agent/` yet.

## Renderer and stage gaps

- StageKit owns renderer, camera, raycaster, scene loading, post pass, animation, hotspot volumes, and pointer input in one module.
- StageKit is reusable in intent, but not yet split into descriptor, renderer-host, material, postprocess, camera, and picking kits.
- Stage props are limited to box, cylinder, and plane primitives.
- There is no stage descriptor validation before rendering.
- Hotspot meshes are invisible boxes, but the system does not separately expose hotspot descriptor validation.
- Post-process settings are applied directly as uniform updates, not as a renderer handoff contract.

## Product gaps

- The story has only three rooms.
- The player can inspect and progress, but there is no inventory or memory relationship layer.
- There is no route graph for branching rooms.
- The game has no audio stings, controller navigation, save slots, or accessibility pass beyond basic HTML structure.
- The anime horror art direction is present, but not yet supported by a broader reusable stage prop vocabulary.

## Central tracking gaps

- `TheUnmappedHouse` has repo-local `.agent` state and central `repo-ledger` state.
- The central latest summary still describes it as direct readback context rather than status-summary rollup inclusion.
- The next central status-summary refresh should include `TheUnmappedHouse` in the normal publish-game rollup if the central schema is meant to track all non-excluded `LuminaryLabs-Publish` repos.
- The breakdown selector should avoid repeatedly selecting this repo only because central summary rollup state lags repo-ledger state.

## Documentation gaps fixed by prior pass

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

## Documentation gaps fixed by this pass

- Added a follow-up timestamped turn ledger entry for central-ledger readback.
- Added a follow-up tracker entry for the repo-list versus central-ledger comparison.
- Added `.agent/central-ledger-audit/publish-ledger-comparison.md`.
- Refreshed `START_HERE.md`, `current-audit.md`, `next-steps.md`, `known-gaps.md`, and `validation.md` around the central rollup gap.