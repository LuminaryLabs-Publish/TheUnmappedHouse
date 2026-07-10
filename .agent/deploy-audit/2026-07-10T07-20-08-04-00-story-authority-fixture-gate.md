# Deploy audit — Story authority fixture gate

Timestamp: `2026-07-10T07-20-08-04-00`

## Current scripts

```txt
npm run serve
npm run check
```

`npm run check` currently runs syntax checks for:

```txt
src/aspect-frame.js
src/game.js
src/stage-kit.js
src/story-data.js
```

## Current validation coverage

The current check catches syntax issues only. It does not prove story command authority, browser adapter readback, StageKit descriptor consumption, or route replay.

## Required next gate

```txt
node scripts/validate-story-authority.mjs
npm run check
```

After the source-owned story authority files exist, wire the fixture into `npm run check`.

## Deploy blockers

```txt
No story authority fixture exists.
No command/result modules exist.
No browser adapter readback ledger exists.
No GameHost story diagnostics exist.
No stage-load readback rows exist.
```

## Safe deploy rule

Do not treat new story content, render extraction, or browser smoke as sufficient until DOM-free story authority rows exist and pass.
