# Next steps: The Unmapped House

Timestamp: `2026-07-10T13-01-11-04-00`

## Next safe ledge

```txt
TheUnmappedHouse Story Command Adapter Readback Ledger Refresh + DOM-Free Fixture Gate
```

## First implementation slice

Add source-owned story authority without changing visible behavior.

Suggested files:

```txt
src/story-authority/source-manifest.js
src/story-authority/source-fingerprint.js
src/story-authority/state-snapshot.js
src/story-authority/commands.js
src/story-authority/reasons.js
src/story-authority/preflight.js
src/story-authority/results.js
src/story-authority/projections.js
src/story-authority/replay.js
src/story-authority/browser-adapter-plan.js
src/story-authority/story-adapter-ledger.js
src/story-authority/browser-adapter-readback.js
src/story-authority/stage-readback.js
src/story-authority/gamehost-story-diagnostics.js
scripts/validate-story-authority.mjs
```

## Required records

```txt
StorySourceManifest
StorySourceFingerprint
StorySourceSnapshot
StoryCommandEnvelope
StoryReasonCode
StoryPreflight
StoryCommandResult
StoryStateSnapshot
StoryProjectionRecord
SaveIntentRecord
InterludeIntentRecord
TerminalRouteIntentRecord
StageLoadIntentRecord
StageLoadReadback
StagePickReadback
StoryReplayRow
StoryAdapterLedgerRow
BrowserAdapterReadback
GameHostStoryDiagnostics
```

## Fixture cases

- Initial state resolves the first scene.
- First hotspot inspect accepts and grants the expected clue.
- Repeat hotspot inspect returns `no_mutation` with `already_inspected` reason.
- Unknown hotspot returns `rejected` with stable reason.
- Scene-mismatched hotspot returns `rejected` with stable reason.
- Completing all required hotspots returns scene completion and interlude intent.
- Continue from a completed scene returns next scene and stage-load intent.
- Continue from the final scene returns terminal route intent.
- Save, projection, interlude, terminal, adapter ledger, and stage-load intents are serializable.
- Browser adapter readback preserves command id, result id, projection id, adapter ledger id, and stage-readback id.

## Then adapt the browser

- Keep `src/game.js` as the browser adapter.
- Route hotspot and continue events through source-owned story authority.
- Consume returned projection, save, interlude, terminal, and stage-load records.
- Add stable readback diagnostics without removing useful existing debug fields.
- Keep `StageKit` stable and add additive load/pick/readback rows around it.

## Validation target

```txt
node scripts/validate-story-authority.mjs
npm run check
```

## Do not do first

```txt
new story rooms
inventory
audio
renderer extraction
StageKit rewrite
visual polish
```
