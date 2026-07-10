# Known gaps: The Unmapped House

Timestamp: `2026-07-10T14-28-47-04-00`

## Source authority gaps

- `src/story-data.js` has no manifest, schema version, fingerprint, or detached source snapshot.
- `src/game.js` owns source interpretation, mutation, route policy, browser effects, persistence, projection, reset, and diagnostics together.
- Commands accept live descriptor objects rather than stable source ids.
- No deterministic preflight validates source fingerprint, scene id, hotspot id, current route, or completion state.
- Accepted, rejected, and no-mutation outcomes are not typed.
- Completion is not represented as a single transition from incomplete to complete.
- Terminal progression is direct DOM copy rather than a source-owned result.
- Replay is unavailable outside the browser.

## Command-correlation gaps

- No input id, command id, preflight id, result id, state id, transition id, projection id, or correlation id exists.
- Side-panel and StageKit raycast inputs cannot be compared for result parity.
- Repeat inspection performs reread/log/save effects without an explicit `no_mutation/already_inspected` result.
- Continue does not expose `scene_incomplete`, `next_scene_available`, or `terminal_route` reason codes.
- Reset clears persistence and reloads without a retained result/readback.

## Browser-effect gaps

- DOM projection is not represented as serializable data.
- Interlude opening is timer-driven and not tied to a command/result.
- Multiple completion calls could schedule duplicate interlude timers.
- Terminal copy is not an effect intent/readback.
- Browser effects are not acknowledged through success/failure rows.
- Aggregate debug JSON cannot prove causal order or effect parity.

## Render and StageKit gaps

- `StageKit.loadScene()` does not emit a JSON-safe load observation.
- Layer, prop, hotspot, material, camera, fog, and post consumption counts are not readable by fixtures.
- Hover and click picks are callback-only.
- Pick rows do not preserve scene id, hotspot id, pointer coordinates, input origin, command id, or result id.
- Render diagnostics would require access to live objects instead of detached summaries.

## Save-system gaps

- Save payloads have no internal schema version, source id, or source fingerprint.
- State is shallow-merged without nested validation.
- Saved scene, clue, and hotspot ids are not checked against the current source.
- No migration or invalidation policy exists for source changes.
- Save writes and clears are not linked to commands/results.
- Load, write, clear, and failure observations do not exist.

## Validation gaps

- `npm run check` performs syntax checks only.
- No DOM-free source/command/transition fixture exists.
- No side-panel versus StageKit input parity fixture exists.
- No browser-effect intent/readback fixture exists.
- No save round-trip or injected storage failure fixture exists.
- No stage-load or stage-pick observation fixture exists.
- No replay equality or JSON-safe diagnostics fixture exists.

## Deferred work

```txt
new story rooms
additional story branches
inventory
audio
renderer extraction
StageKit rewrite
new shader work
visual polish
```
