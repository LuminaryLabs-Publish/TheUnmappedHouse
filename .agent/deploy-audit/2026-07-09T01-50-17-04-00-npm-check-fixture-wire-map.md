# NPM Check Fixture Wire Map

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T01-50-17-04-00`

## Current package scripts

```txt
npm run serve -> python3 -m http.server 8080
npm run check -> node --check src/aspect-frame.js && node --check src/game.js && node --check src/stage-kit.js && node --check src/story-data.js
```

## Current deploy/readiness state

```txt
static route exists
package has syntax check
no dependency install required for current check
no story fixture script exists
no browser automation exists
no current implementation change in this pass
```

## Next fixture wire

Add this only after source authority files exist:

```txt
scripts/validate-story-authority.mjs
```

Then add a package script:

```txt
"check:story": "node scripts/validate-story-authority.mjs"
```

After the fixture is stable, either:

```txt
npm run check && npm run check:story
```

or wire `check:story` under `check`.

## Fixture must not require

```txt
DOM
Three.js renderer
browser input
localStorage
setTimeout
StageKit raycasting
static server
GitHub Pages
```

## Deployment guard

Do not alter the Pages workflow, public route, or static shell until source/preflight/result/projection/readback fixtures are in place.
