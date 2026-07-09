# Known Gaps

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Updated:** `2026-07-09T13-38-15-04-00`

## Repo-local and central documentation gaps

- Central tracking was behind repo-local `.agent` state before this pass.
- There is no source-owned `RepoLocalLedgerReadback` fixture row proving root `.agent` pointers match actual timestamped files.
- There is no source-owned `CentralLedgerReadback` fixture row proving central ledger pointers match repo-local state.
- Ledger readback is still documentation-only instead of an executable fixture contract.

## Architecture gaps

- Story authority is embedded in `src/game.js` UI handlers.
- Module-level `state` and `currentScene` are mutated directly.
- There is no `StorySourceManifest` that defines product id, route id, save key, scene ids, command ids, source version, public entry route, and central readback expectations.
- There is no source-owned story command envelope for inspection, continuation, load, save, projection, readback, ledger readback, or reset.
- There is no explicit `StoryPreflight` that validates source descriptors, loaded state, command shape, current scene, target hotspot, completion requirement, and target scene before mutation.
- Repeat hotspot inspection mutates log/text/save state without a typed `no_mutation` or `already_inspected` result.
- Terminal completion writes copy directly into DOM state instead of returning a typed story result.
- Reset is hardwired to `localStorage.removeItem()` and reload.

## Render and adapter gaps

- StageKit consumes scene descriptors, but there is no StageKit readback contract proving layers, props, hotspots, camera, post settings, viewport, hover state, and animation state.
- There is no `StageProjection` that maps story state to the StageKit calls that should occur.
- There is no `StoryBrowserAdapterPlan` that states the DOM, save, interlude, StageKit, and debug writes expected after each command.
- There is no `BrowserAdapterReadback` comparing expected adapter operations to what the browser route actually performed.

## Gameplay and fixture gaps

- There are no DOM-free story fixture rows for first inspection, repeat inspection, scene completion, continue, terminal continue, corrupted save fallback, and reset intent.
- Completion depends on clue membership but is not recorded as a typed result reason.
- Save/load behavior has no fixture row proving corrupted JSON fallback, route preservation, clue preservation, and inspected hotspot preservation.
- No `GameHost` diagnostics exist for external automation to inspect story source, current state, last command result, adapter plan, adapter readback, and ledger sync.

## Deferred work

- New rooms.
- Inventory.
- Audio.
- StageKit extraction.
- Animation polish.
- Browser-only smoke tests without DOM-free command fixtures.
