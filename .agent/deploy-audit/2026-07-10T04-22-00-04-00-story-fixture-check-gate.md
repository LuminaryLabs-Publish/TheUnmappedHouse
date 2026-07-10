# Deploy Audit: Story Fixture Check Gate

**Timestamp:** `2026-07-10T04-22-00-04-00`

## Current package scripts

```txt
npm run serve -> python3 -m http.server 8080
npm run check -> node --check src/aspect-frame.js && node --check src/game.js && node --check src/stage-kit.js && node --check src/story-data.js
```

## Current validation surface

`npm run check` only syntax-checks browser source files.

It does not prove story command behavior, route progression, stage-load parity, DOM projection, save intent, interlude intent, terminal route, or browser adapter readback.

## Required next validation gate

Add:

```txt
scripts/validate-story-authority.mjs
```

Then run:

```txt
node scripts/validate-story-authority.mjs
npm run check
```

Preferred future package wiring:

```txt
npm run check -> node scripts/validate-story-authority.mjs && node --check src/aspect-frame.js && node --check src/game.js && node --check src/stage-kit.js && node --check src/story-data.js
```

## Fixture must prove

```txt
accepted inspect rows
repeat no-mutation rows
unknown/stale hotspot rejection rows
completion rows
continue rows
terminal rows
save intent rows
interlude intent rows
stage-load intent rows
projection rows
adapter readback rows
```

## Deploy finding

No Pages or workflow change is needed for this docs pass.

The next deploy gate should stay focused on a DOM-free story authority fixture plus syntax check before any visual or content expansion.

## Current pass validation

```txt
runtime source changed: no
package scripts changed: no
branch created: no
pull request created: no
npm run check: not run
browser smoke: not run
DOM-free story fixture: not run because proof files do not exist yet
```
