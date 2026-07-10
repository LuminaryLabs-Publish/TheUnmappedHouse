# Known gaps: The Unmapped House

Timestamp: `2026-07-10T00-51-03-04-00`

## Source authority gaps

- `src/game.js` owns story command dispatch, mutation, save intent, route transitions, terminal copy, StageKit loading, DOM projection, reset, and debug output together.
- Repeat hotspot inspection has no typed `no_mutation` result, even though it behaves like a repeat read.
- Unknown, stale, or scene-mismatched hotspot commands do not have stable rejection rows.
- Completion, interlude scheduling, continue, terminal route, and save intent are browser side effects rather than source-owned records.
- Replay is not available outside the browser.

## Browser adapter gaps

- The browser adapter is not separate from story authority.
- There is no adapter readback row for DOM projection, save writes, interlude state, terminal projection, or StageKit loads.
- Debug JSON is ad hoc and not linked to command ids or result ids.
- No additive stable `GameHost` story diagnostics exist yet.

## Render/readback gaps

- `StageKit` consumes descriptors but does not expose fixture-readable stage-load consumption rows.
- Hotspot picking is visible through callbacks, not through serializable click/hover readback.
- Browser smoke would not prove story result to stage-load parity.

## Validation gaps

- `npm run check` only syntax-checks files.
- No DOM-free story authority fixture exists.
- No fixture rows exist for accepted, rejected, repeated/no-mutation, completed, continue, terminal, save, interlude, or stage-load cases.

## Deferred work

- New rooms.
- More story content.
- Inventory.
- Audio.
- Renderer extraction.
- StageKit rewrite.
- Visual polish.

These should wait until command/result/readback proof exists.
