# Deploy Audit: npm Check Fixture Wire Freeze

**Timestamp:** `2026-07-09T02-11-07-04-00`

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

## Current commands

`package.json` currently exposes:

```txt
npm run serve
npm run check
```

`npm run check` is syntax-only:

```txt
node --check src/aspect-frame.js && node --check src/game.js && node --check src/stage-kit.js && node --check src/story-data.js
```

## Current deploy/readiness gap

The current check can catch syntax errors, but it cannot prove source manifest validity, command/reducer behavior, repeated-hotspot no-mutation, scene completion, save/load normalization, StageProjection creation, BrowserAdapterReadback, GameHost diagnostics, or central ledger readback.

## Required fixture script next

```txt
scripts/validate-story-authority.mjs
```

The fixture should run without DOM, Three.js, localStorage, timers, `requestAnimationFrame`, browser clicks, or a real static server.

## Required package integration next

After the fixture passes directly, either add a dedicated script or wire it into `npm run check`.

Suggested shape:

```json
{
  "scripts": {
    "check": "node --check src/aspect-frame.js && node --check src/game.js && node --check src/stage-kit.js && node --check src/story-data.js && node scripts/validate-story-authority.mjs"
  }
}
```

## Browser smoke after source pass

```txt
python3 -m http.server 8080
open index.html
verify first scene loads
verify hotspot hover label works
verify hotspot click grants clue
verify repeat hotspot does not duplicate clue
verify scene completion opens interlude
verify continue advances to next scene
verify KeyR reset still works
verify window.GameHost.getState().story is additive and read-only
```

## Deployment boundary

No deployment workflow changes are needed for this documentation pass.

The next implementation should not change the public route, Pages shape, scene copy, localStorage key, or StageKit visual behavior unless the fixture proves a blocker.
