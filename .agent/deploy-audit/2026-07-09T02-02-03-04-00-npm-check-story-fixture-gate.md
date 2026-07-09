# NPM Check Story Fixture Gate

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T02-02-03-04-00`

## Current validation surface

`package.json` currently exposes:

```txt
npm run serve -> python3 -m http.server 8080
npm run check -> node --check src/aspect-frame.js && node --check src/game.js && node --check src/stage-kit.js && node --check src/story-data.js
```

This is useful but insufficient. It proves syntax only.

## Required next validation surface

Add a DOM-free fixture script after story-authority modules exist:

```txt
scripts/validate-story-authority.mjs
```

Then wire one of these package scripts:

```txt
npm run check
npm run smoke:story
npm run validate:story
```

Recommended first cut:

```json
{
  "scripts": {
    "check": "node --check src/aspect-frame.js && node --check src/game.js && node --check src/stage-kit.js && node --check src/story-data.js && node --check scripts/validate-story-authority.mjs && node scripts/validate-story-authority.mjs"
  }
}
```

Only add the package-script wire after direct fixture execution is stable.

## Fixture must not require

```txt
browser DOM
Three.js
StageKit raycasting
localStorage
requestAnimationFrame
setTimeout
http server
GitHub Pages
```

## Fixture must prove

```txt
source manifest
source snapshot
initial state
loaded state normalization/rejection
source preflight
duplicate scene rejection
duplicate hotspot rejection
ungrantable required clue rejection
first inspection
repeat inspection
unknown hotspot rejection
incomplete continue rejection
complete scene
route transition
full route completion
prototype terminal result
save projection
load projection
reset projection
stage snapshot
story projection
interlude projection
stage projection
browser adapter plan
browser adapter readback
GameHost story diagnostics
central ledger readback
```

## Validation boundary for this pass

```txt
runtime source changed: no
package.json changed: no
fixture script created: no
fixture script run: no
npm run check run: no
static server run: no
browser smoke run: no
GitHub Pages route checked: no
branch created: no
pull request created: no
pushed to main: yes
```
