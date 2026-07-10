# Known gaps: The Unmapped House

Timestamp: `2026-07-10T10-11-35-04-00`

## Source authority gaps

- `src/story-data.js` is the descriptor source, but has no source manifest or fingerprint layer.
- `src/game.js` owns command dispatch, mutation, save intent, route transitions, terminal copy, StageKit loading, DOM projection, reset, and debug output together.
- Repeat hotspot inspection has no typed `no_mutation` result.
- Unknown, stale, or scene-mismatched hotspot commands do not have stable rejection rows.
- Completion, interlude scheduling, continue, terminal route, and save intent are browser side effects rather than source-owned records.
- Replay is not available outside the browser.

## Projection and adapter gaps

- No command envelope/result id ties a click to a state transition.
- DOM projection is not represented as a serializable `StoryProjectionRecord`.
- Save writes, interlude opening, terminal copy, and StageKit scene loads are not adapter-intent rows.
- The browser adapter is not separate from story authority.
- Debug JSON is not linked to command ids, result ids, projection ids, adapter ledger rows, or stage readback rows.
- No stable additive `GameHost` story diagnostics exist yet.

## Render/readback gaps

- `StageKit` consumes descriptors but does not expose fixture-readable stage-load rows.
- Hotspot picking is callback-only and has no click/hover readback row.
- Browser smoke would not prove story result to stage-load parity.

## Validation gaps

- `npm run check` syntax-checks current files only.
- No DOM-free story authority fixture exists.
- No adapter ledger/readback fixture exists.
- No result rows exist for accepted, rejected, repeated/no-mutation, completed, continue, terminal, save, interlude, projection, or stage-load cases.

## Deferred work

```txt
new story rooms
more story content
inventory
audio
renderer extraction
StageKit rewrite
visual polish
```
