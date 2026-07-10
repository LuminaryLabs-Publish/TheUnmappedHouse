# Known gaps: The Unmapped House

Timestamp: `2026-07-10T08-39-05-04-00`

## Source authority gaps

- `src/game.js` owns story command dispatch, mutation, save intent, route transitions, terminal copy, StageKit loading, DOM projection, reset, and debug output together.
- Repeat hotspot inspection has no typed `no_mutation` result, even though it behaves like a repeat read.
- Unknown, stale, or scene-mismatched hotspot commands do not have stable rejection rows.
- Completion, interlude scheduling, continue, terminal route, and save intent are browser side effects rather than source-owned records.
- Replay is not available outside the browser.
- `src/story-data.js` is the source descriptor file, but there is no manifest or fingerprint layer around it.

## Projection and adapter gaps

- There is no command envelope or result id that ties a click to a state transition.
- DOM projection is not represented as a serializable `StoryProjectionRecord`.
- Save writes, interlude opening, terminal copy, and StageKit scene loads are not represented as adapter-intent rows.
- The browser adapter is not separate from story authority.
- Debug JSON is ad hoc and not linked to command ids, result ids, projection ids, or adapter ledger rows.
- No additive stable `GameHost` story diagnostics exist yet.

## Render/readback gaps

- `StageKit` consumes descriptors but does not expose fixture-readable stage-load consumption rows.
- Hotspot picking is visible through callbacks, not through serializable click/hover readback.
- Browser smoke would not prove story result to stage-load parity.

## Validation gaps

- `npm run check` only syntax-checks files.
- No DOM-free story authority fixture exists.
- No adapter readback fixture exists.
- No result rows exist for accepted, rejected, repeated/no-mutation, completed, continue, terminal, save, interlude, projection, or stage-load cases.

## Deferred work

- New rooms.
- More story content.
- Inventory.
- Audio.
- Renderer extraction.
- StageKit rewrite.
- Visual polish.

These should wait until story command/result/projection/adapter-ledger proof exists.
