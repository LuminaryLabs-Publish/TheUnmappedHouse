# Next steps: The Unmapped House

Timestamp: `2026-07-09T23-28-35-04-00`

## Next safe ledge

```txt
TheUnmappedHouse Story Adapter Readback Catch-up + Browser Fixture Gate
```

## First implementation slice

Add source-owned story authority without changing visible behavior.

Suggested files:

```txt
src/story-authority/source-manifest.js
src/story-authority/state-snapshot.js
src/story-authority/commands.js
src/story-authority/reasons.js
src/story-authority/preflight.js
src/story-authority/results.js
src/story-authority/projections.js
src/story-authority/replay.js
src/story-authority/browser-adapter-plan.js
scripts/validate-story-authority.mjs
```

## Required records

- `StoryCommandEnvelope`
- `StoryReasonCode`
- `StoryCommandResult`
- `StoryStateSnapshot`
- `StoryProjectionRecord`
- `SaveIntentRecord`
- `InterludeIntentRecord`
- `StageLoadIntentRecord`
- `StoryReplayRow`
- `BrowserAdapterReadback`

## Fixture cases

- Initial state resolves the first scene.
- First hotspot inspect accepts and grants the expected clue.
- Repeat hotspot inspect returns `no_mutation` with `already_inspected` reason.
- Completing all required hotspots returns scene completion and interlude intent.
- Continue from a completed scene returns next scene and stage-load intent.
- Continue from the final scene returns terminal route.
- Save and projection intents are serializable.

## Then adapt the browser

After the DOM-free fixture passes:

- Keep `src/game.js` as the browser adapter.
- Route hotspot and continue events through the source-owned story authority.
- Consume returned projection, save, interlude, and stage-load records.
- Add stable readback diagnostics without removing useful existing debug fields.

## Validation target

```txt
npm run check
node scripts/validate-story-authority.mjs
```

Wire the fixture into `npm run check` after the new source files exist.
