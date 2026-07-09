# Known Gaps

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Updated:** `2026-07-09T19-00-15-04-00`

## Repo-local and central documentation gaps

- There is no executable `RepoLocalLedgerReadback` fixture row proving root `.agent` pointers match actual timestamped files.
- There is no executable `CentralLedgerReadback` fixture row proving central ledger pointers match repo-local state.
- Ledger readback is still documentation-only instead of a source-owned fixture contract.

## Architecture gaps

- Story authority is embedded in `src/game.js` UI handlers.
- Module-level `state` and `currentScene` are mutated directly.
- There is no `StorySourceManifest` for product id, route id, save key, scene ids, command ids, source version, public entry route, and central readback expectations.
- There is no source-owned story command envelope for inspection, continuation, load, save, projection, readback, ledger readback, or reset.
- There is no explicit `StoryPreflight` validating source descriptors, loaded state, command shape, current scene, target hotspot, completion requirement, and target scene before mutation.
- There is no typed `StoryCommandResult` for accepted, rejected, repeated, terminal, completed, load_failed, save_failed, or no_mutation paths.
- Repeat hotspot inspections return early after DOM writes, log writes, render, and save without emitting a no-mutation result.
- Terminal `nextScene()` completion writes prototype text directly into DOM state and does not save or emit a terminal route result.

## Browser adapter gaps

- `inspectHotspot()` mixes command execution, DOM projection, save projection, and delayed interlude projection.
- `nextScene()` mixes route mutation, interlude DOM mutation, StageKit consumption, UI render, and save writes.
- `renderUi()` directly creates buttons and debug JSON from mutable module state.
- Browser adapter actions are not represented as a plan that can be inspected before DOM mutation.
- Browser adapter readback is missing; no fixture confirms title/text/buttons/debug/interlude/stage state after a command.
- There is no additive `globalThis.UnmappedHouseHost.getState()` source/readback surface yet.

## Render and StageKit gaps

- `StageKit.loadScene()` consumes descriptor data directly but does not return a `StageProjection` summary.
- Hotspot meshes are invisible runtime objects without a descriptor readback table.
- Post-process uniforms are consumed but not reflected in a stable renderer snapshot.
- Camera descriptor consumption is not fixture-readable.
- The visual layer is strong enough to keep stable, but it is not yet connected to source-owned readback proof.

## Gameplay and story gaps

- Completion is only `requiresToComplete.every(hasClue)` and has no reason code matrix.
- Scene routing assumes array order and has no source-owned route contract.
- `localStorage` shallow merge can produce malformed loaded state without source validation.
- Save intent is an immediate side effect rather than a projection emitted by the reducer.
- Interlude intent is delayed through `setTimeout()` rather than a deterministic projection.
- Reset uses `KeyR` as direct browser behavior without a command/result contract.

## Validation gaps

- `npm run check` is syntax-only.
- There is no DOM-free story fixture runner.
- There is no reducer fixture for first inspect, repeat inspect, invalid inspect, completion, continue, terminal continue, load fallback, malformed save, reset, or projection/readback parity.
- There is no Pages build gate that requires story fixture proof before static artifact copy.

## Current priority

Add the story adapter ledger and fixture/readback layer first.

Do not add rooms, audio, inventory, renderer extraction, or browser-only smoke work before source-owned command/result fixture rows exist.
